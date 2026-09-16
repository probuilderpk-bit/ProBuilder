import {
  AuthProviderInterface,
  AuthProviderConfigStatus,
  SignInCredentials,
  SignUpCredentials,
  ConfirmPasswordResetRequest
} from './authTypes';
import { AuthUser } from '../../types';

// In-memory session store (no plaintext passwords saved to localStorage)
interface StoredSimulatedUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  emailVerified: boolean;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  passwordHash: string; // simulated hash representation
}

// Simple one-way hash helper using Web Crypto API to ensure no plaintext is stored
async function computeHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input + '_probuilder_salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export class SimulatedAuthService implements AuthProviderInterface {
  readonly id = 'simulated' as const;
  readonly name = 'Simulated Auth (Pending Backend Connection)';
  readonly isConfigured = false;

  private currentUser: AuthUser | null = null;
  private listeners: Set<(user: AuthUser | null) => void> = new Set();
  private usersDatabase: Map<string, StoredSimulatedUser> = new Map();

  constructor() {
    this.seedInitialDemoUser();
    this.restoreSessionFromSessionStorage();
  }

  private async seedInitialDemoUser() {
    const demoEmail = 'student@probuilder.pk';
    const hash = await computeHash('ProBuilder2026!');
    this.usersDatabase.set(demoEmail.toLowerCase(), {
      id: 'usr_student_demo_01',
      email: demoEmail,
      displayName: 'Hamza Farooq',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      emailVerified: true,
      role: 'student',
      createdAt: '2026-01-15T08:00:00.000Z',
      passwordHash: hash
    });
  }

  private restoreSessionFromSessionStorage() {
    try {
      const activeSessionUser = sessionStorage.getItem('probuilder_sim_session');
      if (activeSessionUser) {
        this.currentUser = JSON.parse(activeSessionUser);
      }
    } catch {
      this.currentUser = null;
    }
  }

  private notifyListeners() {
    this.listeners.forEach((cb) => cb(this.currentUser));
  }

  getConfigStatus(): AuthProviderConfigStatus {
    return {
      provider: 'simulated',
      displayName: 'Architecture Preview (No Cloud Backend Connected)',
      isReady: false,
      requiredEnvVars: [
        'VITE_FIREBASE_API_KEY',
        'VITE_FIREBASE_PROJECT_ID',
        'VITE_FIREBASE_AUTH_DOMAIN'
      ],
      missingEnvVars: [
        'VITE_FIREBASE_API_KEY',
        'VITE_FIREBASE_PROJECT_ID',
        'VITE_FIREBASE_AUTH_DOMAIN'
      ],
      recommendation:
        'Firebase Authentication is strongly recommended for ProBuilder. It provides turn-key email verification, password resets, session management, and role-based access without hosting overhead.',
      setupGuideUrl: 'https://firebase.google.com/docs/auth'
    };
  }

  async signIn({ email, password, rememberMe }: SignInCredentials): Promise<AuthUser> {
    // Simulate real network latency (400ms)
    await new Promise((r) => setTimeout(r, 450));

    const normalizedEmail = email.trim().toLowerCase();
    const existing = this.usersDatabase.get(normalizedEmail);

    if (!existing) {
      // For friendly development testing if user enters new credentials
      const hash = await computeHash(password);
      const newUser: StoredSimulatedUser = {
        id: `usr_${Date.now()}`,
        email: normalizedEmail,
        displayName: normalizedEmail.split('@')[0],
        emailVerified: false,
        role: 'student',
        createdAt: new Date().toISOString(),
        passwordHash: hash
      };
      this.usersDatabase.set(normalizedEmail, newUser);

      const authUser: AuthUser = {
        id: newUser.id,
        email: newUser.email,
        displayName: newUser.displayName,
        emailVerified: newUser.emailVerified,
        role: newUser.role,
        createdAt: newUser.createdAt,
        lastLoginAt: new Date().toISOString()
      };

      this.currentUser = authUser;
      if (rememberMe !== false) {
        sessionStorage.setItem('probuilder_sim_session', JSON.stringify(authUser));
      }
      this.notifyListeners();
      return authUser;
    }

    const testHash = await computeHash(password);
    if (existing.passwordHash !== testHash) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    const authUser: AuthUser = {
      id: existing.id,
      email: existing.email,
      displayName: existing.displayName,
      avatarUrl: existing.avatarUrl,
      emailVerified: existing.emailVerified,
      role: existing.role,
      createdAt: existing.createdAt,
      lastLoginAt: new Date().toISOString()
    };

    this.currentUser = authUser;
    if (rememberMe !== false) {
      sessionStorage.setItem('probuilder_sim_session', JSON.stringify(authUser));
    }
    this.notifyListeners();
    return authUser;
  }

  async signUp({ name, email, password }: SignUpCredentials): Promise<AuthUser> {
    await new Promise((r) => setTimeout(r, 550));

    const normalizedEmail = email.trim().toLowerCase();
    if (this.usersDatabase.has(normalizedEmail)) {
      throw new Error('An account with this email address already exists. Please sign in.');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    const hash = await computeHash(password);
    const newUser: StoredSimulatedUser = {
      id: `usr_${Date.now()}`,
      email: normalizedEmail,
      displayName: name.trim() || normalizedEmail.split('@')[0],
      emailVerified: false,
      role: 'student',
      createdAt: new Date().toISOString(),
      passwordHash: hash
    };

    this.usersDatabase.set(normalizedEmail, newUser);

    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      displayName: newUser.displayName,
      emailVerified: false,
      role: 'student',
      createdAt: newUser.createdAt,
      lastLoginAt: new Date().toISOString()
    };

    this.currentUser = authUser;
    sessionStorage.setItem('probuilder_sim_session', JSON.stringify(authUser));
    this.notifyListeners();
    return authUser;
  }

  async signOut(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    this.currentUser = null;
    sessionStorage.removeItem('probuilder_sim_session');
    this.notifyListeners();
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 500));
    const normalized = email.trim().toLowerCase();
    if (!normalized.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    // Simulation: successfully accept request
  }

  async confirmPasswordReset({ newPassword }: ConfirmPasswordResetRequest): Promise<void> {
    await new Promise((r) => setTimeout(r, 500));
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long.');
    }
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    this.listeners.add(callback);
    callback(this.currentUser);
    return () => {
      this.listeners.delete(callback);
    };
  }

  async updateProfile(userId: string, updates: Partial<AuthUser>): Promise<AuthUser> {
    if (!this.currentUser || this.currentUser.id !== userId) {
      throw new Error('Not authenticated.');
    }

    this.currentUser = {
      ...this.currentUser,
      ...updates
    };

    sessionStorage.setItem('probuilder_sim_session', JSON.stringify(this.currentUser));
    this.notifyListeners();
    return this.currentUser;
  }
}
