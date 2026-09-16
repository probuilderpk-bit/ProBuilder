import React, { useState, useEffect } from 'react';
import { NavPage } from '../types';
import { useAuth } from '../context/AuthContext';
import { ProBuilderLogo } from '../components/ProBuilderLogo';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: NavPage) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { user, login, loading, authError, clearError, isConfigured, providerName } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (user && !isSubmitting) {
      onNavigate('dashboard');
    }
  }, [user, onNavigate, isSubmitting]);

  // Clear errors when typing
  useEffect(() => {
    if (authError) clearError();
    if (validationError) setValidationError(null);
  }, [email, password]);

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setValidationError('Please enter your email address.');
      return false;
    }
    if (!emailRegex.test(email.trim())) {
      setValidationError('Please enter a valid email address.');
      return false;
    }
    if (!password) {
      setValidationError('Please enter your password.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login({
        email: email.trim(),
        password,
        rememberMe
      });
      setLoginSuccess(true);
      setTimeout(() => {
        onNavigate('dashboard');
      }, 700);
    } catch {
      // Error handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('student@probuilder.pk');
    setPassword('ProBuilder2026!');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B81118]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Card Container */}
        <div className="bg-[#0D0D12] border border-[#22222D] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Logo & Header */}
          <div className="text-center mb-7">
            <div className="flex justify-center mb-4 cursor-pointer" onClick={() => onNavigate('home')}>
              <ProBuilderLogo size="sm" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Sign In to ProBuilder
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-1.5 leading-relaxed">
              Access your enrolled courses, lesson progress, and verified certificates.
            </p>
          </div>

          {/* Backend Status Notice */}
          <div className="mb-5 p-2.5 rounded-lg bg-[#14141C] border border-[#22222E] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#A1A1AA] shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#A1A1AA] leading-relaxed">
              <span className="font-semibold text-white">Auth Architecture: </span>
              {isConfigured ? (
                <span className="text-emerald-400 font-medium">Live {providerName} Connected</span>
              ) : (
                <span>
                  Ready for Firebase Auth. Pre-configured demo student available below.
                </span>
              )}
            </div>
          </div>

          {/* Error Notice */}
          {(authError || validationError) && (
            <div className="mb-5 p-3 rounded-xl bg-[#2A0D10] border border-[#B81118]/40 text-[#FCA5A5] text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#EF4444]" />
              <div className="leading-snug">{authError || validationError}</div>
            </div>
          )}

          {/* Success Notice */}
          {loginSuccess && (
            <div className="mb-5 p-3 rounded-xl bg-[#0D2818] border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Authentication verified! Loading your learning dashboard...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  id="login-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@probuilder.pk"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#D4D4D8]">
                  Password
                </label>
                <button
                  type="button"
                  id="forgot-password-link"
                  onClick={() => onNavigate('forgot-password')}
                  className="text-xs font-semibold text-[#D3151D] hover:text-[#EF4444] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] transition-colors"
                />
                <button
                  type="button"
                  id="toggle-password-visibility-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#71717A] hover:text-white p-0.5 rounded transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="remember-me-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#121218] border-[#2B2B38] text-[#D3151D] focus:ring-[#D3151D] focus:ring-offset-0 focus:ring-1"
                />
                <span className="text-xs text-[#A1A1AA]">Remember session</span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                id="fill-demo-credentials-btn"
                className="text-[11px] font-medium text-[#A1A1AA] hover:text-white underline underline-offset-2"
              >
                Autofill Demo Student
              </button>
            </div>

            <button
              type="submit"
              id="submit-login-btn"
              disabled={isSubmitting || loading}
              className="w-full py-3 px-4 rounded-xl bg-[#D3151D] hover:bg-[#E50914] active:bg-[#B91C1C] text-white text-sm font-bold transition-all shadow-md shadow-[#D3151D]/25 hover:shadow-[#D3151D]/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Sign Up link */}
          <div className="mt-6 pt-5 border-t border-[#1C1C26] text-center">
            <p className="text-xs text-[#A1A1AA]">
              Don't have a ProBuilder account?{' '}
              <button
                type="button"
                id="navigate-to-signup-btn"
                onClick={() => onNavigate('signup')}
                className="font-bold text-[#D3151D] hover:text-[#EF4444] transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="mt-5 text-center flex items-center justify-center gap-2 text-[11px] text-[#71717A]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#A1A1AA]" />
          <span>Enterprise-grade authentication architecture • 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};
