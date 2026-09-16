import { AuthProviderInterface, AuthProviderConfigStatus } from './authTypes';
import { FirebaseAuthService } from './firebaseAuthService';
import { SimulatedAuthService } from './simulatedAuthService';

class AuthServiceFacade {
  private activeProvider: AuthProviderInterface;

  constructor() {
    // Check if Firebase environment variables are provided
    const hasFirebase = Boolean(
      import.meta.env.VITE_FIREBASE_API_KEY &&
      import.meta.env.VITE_FIREBASE_PROJECT_ID
    );

    if (hasFirebase) {
      this.activeProvider = new FirebaseAuthService();
    } else {
      this.activeProvider = new SimulatedAuthService();
    }
  }

  get provider(): AuthProviderInterface {
    return this.activeProvider;
  }

  get isConfigured(): boolean {
    return this.activeProvider.isConfigured;
  }

  getConfigStatus(): AuthProviderConfigStatus {
    return this.activeProvider.getConfigStatus();
  }
}

export const authService = new AuthServiceFacade().provider;
export const authConfigStatus = new AuthServiceFacade().getConfigStatus();
