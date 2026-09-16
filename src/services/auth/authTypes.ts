import { AuthUser } from '../../types';

export interface SignInCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ConfirmPasswordResetRequest {
  code: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface AuthProviderConfigStatus {
  provider: 'firebase' | 'supabase' | 'simulated';
  displayName: string;
  isReady: boolean;
  requiredEnvVars: string[];
  missingEnvVars: string[];
  recommendation: string;
  setupGuideUrl?: string;
}

export interface AuthProviderInterface {
  readonly id: 'firebase' | 'supabase' | 'simulated';
  readonly name: string;
  readonly isConfigured: boolean;
  getConfigStatus(): AuthProviderConfigStatus;
  
  signIn(credentials: SignInCredentials): Promise<AuthUser>;
  signUp(credentials: SignUpCredentials): Promise<AuthUser>;
  signOut(): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<void>;
  confirmPasswordReset(request: ConfirmPasswordResetRequest): Promise<void>;
  
  getCurrentUser(): AuthUser | null;
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;
  updateProfile(userId: string, updates: Partial<AuthUser>): Promise<AuthUser>;
}
