import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail as fbSendPasswordReset,
  confirmPasswordReset as fbConfirmPasswordReset,
  onAuthStateChanged as fbOnAuthStateChanged,
  updateProfile as fbUpdateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import {
  AuthProviderInterface,
  AuthProviderConfigStatus,
  SignInCredentials,
  SignUpCredentials,
  ConfirmPasswordResetRequest
} from './authTypes';
import { AuthUser } from '../../types';

export class FirebaseAuthService implements AuthProviderInterface {
  readonly id = 'firebase' as const;
  readonly name = 'Firebase Authentication';

  private app: FirebaseApp | null = null;
  private auth: Auth | null = null;

  constructor() {
    this.initIfConfigured();
  }

  get isConfigured(): boolean {
    return Boolean(
      import.meta.env.VITE_FIREBASE_API_KEY &&
      import.meta.env.VITE_FIREBASE_PROJECT_ID
    );
  }

  private initIfConfigured(): boolean {
    if (!this.isConfigured) return false;
    try {
      if (!getApps().length) {
        this.app = initializeApp({
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID
        });
      } else {
        this.app = getApp();
      }
      this.auth = getAuth(this.app);
      return true;
    } catch (err) {
      console.warn('Firebase initialization failed with provided config:', err);
      return false;
    }
  }

  private ensureAuth(): Auth {
    if (!this.auth) {
      const success = this.initIfConfigured();
      if (!success || !this.auth) {
        throw new Error(
          'Firebase Authentication is not configured yet. Please set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in your environment variables.'
        );
      }
    }
    return this.auth;
  }

  private mapFirebaseUser(user: FirebaseUser): AuthUser {
    return {
      id: user.uid,
      email: user.email || '',
      displayName: user.displayName || user.email?.split('@')[0] || 'ProBuilder Student',
      avatarUrl: user.photoURL || undefined,
      emailVerified: user.emailVerified,
      role: 'student',
      createdAt: user.metadata.creationTime || new Date().toISOString(),
      lastLoginAt: user.metadata.lastSignInTime || new Date().toISOString()
    };
  }

  getConfigStatus(): AuthProviderConfigStatus {
    const required = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_AUTH_DOMAIN'
    ];
    const envRecord = import.meta.env as Record<string, string | undefined>;
    const missing = required.filter((v) => !envRecord[v]);

    return {
      provider: 'firebase',
      displayName: 'Firebase Authentication (Recommended)',
      isReady: this.isConfigured,
      requiredEnvVars: required,
      missingEnvVars: missing,
      recommendation:
        'Firebase Authentication provides managed email/password sessions, OAuth, zero-maintenance password reset emails, and deep integration with Google Cloud & AI Studio.',
      setupGuideUrl: 'https://firebase.google.com/docs/auth/web/start'
    };
  }

  async signIn({ email, password }: SignInCredentials): Promise<AuthUser> {
    const auth = this.ensureAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return this.mapFirebaseUser(userCredential.user);
    } catch (error: any) {
      throw new Error(this.formatErrorMessage(error));
    }
  }

  async signUp({ name, email, password }: SignUpCredentials): Promise<AuthUser> {
    const auth = this.ensureAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (name && userCredential.user) {
        await fbUpdateProfile(userCredential.user, { displayName: name });
      }
      return this.mapFirebaseUser(userCredential.user);
    } catch (error: any) {
      throw new Error(this.formatErrorMessage(error));
    }
  }

  async signOut(): Promise<void> {
    const auth = this.ensureAuth();
    await fbSignOut(auth);
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const auth = this.ensureAuth();
    try {
      await fbSendPasswordReset(auth, email);
    } catch (error: any) {
      throw new Error(this.formatErrorMessage(error));
    }
  }

  async confirmPasswordReset({ code, newPassword }: ConfirmPasswordResetRequest): Promise<void> {
    const auth = this.ensureAuth();
    try {
      await fbConfirmPasswordReset(auth, code, newPassword);
    } catch (error: any) {
      throw new Error(this.formatErrorMessage(error));
    }
  }

  getCurrentUser(): AuthUser | null {
    if (!this.isConfigured || !this.auth) return null;
    const current = this.auth.currentUser;
    return current ? this.mapFirebaseUser(current) : null;
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    if (!this.isConfigured) {
      callback(null);
      return () => {};
    }
    const auth = this.ensureAuth();
    return fbOnAuthStateChanged(auth, (user) => {
      callback(user ? this.mapFirebaseUser(user) : null);
    });
  }

  async updateProfile(userId: string, updates: Partial<AuthUser>): Promise<AuthUser> {
    const auth = this.ensureAuth();
    const current = auth.currentUser;
    if (!current) throw new Error('No user currently signed in');

    if (updates.displayName || updates.avatarUrl) {
      await fbUpdateProfile(current, {
        displayName: updates.displayName || current.displayName,
        photoURL: updates.avatarUrl || current.photoURL
      });
    }

    return this.mapFirebaseUser(current);
  }

  private formatErrorMessage(error: any): string {
    const code = error?.code || '';
    switch (code) {
      case 'auth/invalid-email':
        return 'The email address is invalid.';
      case 'auth/user-disabled':
        return 'This student account has been disabled.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password. Please verify your credentials.';
      case 'auth/email-already-in-use':
        return 'An account already exists with this email address. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/network-request-failed':
        return 'Network connection failed. Please check your internet connection.';
      default:
        return error?.message || 'Authentication operation failed.';
    }
  }
}
