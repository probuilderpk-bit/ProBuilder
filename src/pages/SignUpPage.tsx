import React, { useState, useEffect } from 'react';
import { NavPage } from '../types';
import { useAuth } from '../context/AuthContext';
import { ProBuilderLogo } from '../components/ProBuilderLogo';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Check,
  X
} from 'lucide-react';

interface SignUpPageProps {
  onNavigate: (page: NavPage) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const { user, signup, loading, authError, clearError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (user && !isSubmitting) {
      onNavigate('dashboard');
    }
  }, [user, onNavigate, isSubmitting]);

  // Clear errors on typing
  useEffect(() => {
    if (authError) clearError();
    if (validationError) setValidationError(null);
  }, [name, email, password, confirmPassword]);

  // Password rules checks
  const hasMinLength = password.length >= 8;
  const hasNumberOrSpecial = /[0-9!@#$%^&*]/.test(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setValidationError('Please enter your full name.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setValidationError('Please provide a valid email address.');
      return false;
    }
    if (!hasMinLength) {
      setValidationError('Password must be at least 8 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return false;
    }
    if (!agreeTerms) {
      setValidationError('Please accept the Terms of Service to create an account.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword
      });
      setSignupSuccess(true);
      setTimeout(() => {
        onNavigate('dashboard');
      }, 700);
    } catch {
      // Handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#B81118]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0D0D12] border border-[#22222D] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4 cursor-pointer" onClick={() => onNavigate('home')}>
              <ProBuilderLogo size="sm" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Create Your Student Account
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-1.5 leading-relaxed">
              Enroll in world-class AI tracks, earn verifiable certificates, and build real-world systems.
            </p>
          </div>

          {/* Error Notice */}
          {(authError || validationError) && (
            <div className="mb-5 p-3 rounded-xl bg-[#2A0D10] border border-[#B81118]/40 text-[#FCA5A5] text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#EF4444]" />
              <div className="leading-snug">{authError || validationError}</div>
            </div>
          )}

          {/* Success Notice */}
          {signupSuccess && (
            <div className="mb-5 p-3 rounded-xl bg-[#0D2818] border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Account successfully registered! Directing you to your Learning Dashboard...</span>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  id="signup-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bilal Ahmed"
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  id="signup-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] transition-colors"
                />
                <button
                  type="button"
                  id="toggle-signup-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#71717A] hover:text-white p-0.5 rounded transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="signup-confirm-password-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] transition-colors"
                />
                <button
                  type="button"
                  id="toggle-signup-confirm-password-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3 text-[#71717A] hover:text-white p-0.5 rounded transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Visual Password Guidelines */}
            <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
              <div className="flex items-center gap-1.5 text-[11px]">
                {hasMinLength ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#71717A] shrink-0" />
                )}
                <span className={hasMinLength ? 'text-emerald-300' : 'text-[#71717A]'}>
                  8+ characters
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                {passwordsMatch ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#71717A] shrink-0" />
                )}
                <span className={passwordsMatch ? 'text-emerald-300' : 'text-[#71717A]'}>
                  Passwords match
                </span>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="signup-terms-checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded bg-[#121218] border-[#2B2B38] text-[#D3151D] focus:ring-[#D3151D] focus:ring-offset-0 focus:ring-1"
                />
                <span className="text-xs text-[#A1A1AA] leading-relaxed">
                  I agree to the ProBuilder{' '}
                  <span className="text-white hover:underline">Terms of Service</span> and{' '}
                  <span className="text-white hover:underline">Student Honor Code</span>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-signup-btn"
              disabled={isSubmitting || loading}
              className="w-full py-3 px-4 rounded-xl bg-[#D3151D] hover:bg-[#E50914] active:bg-[#B91C1C] text-white text-sm font-bold transition-all shadow-md shadow-[#D3151D]/25 hover:shadow-[#D3151D]/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Registering Account...</span>
                </div>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Already have account */}
          <div className="mt-6 pt-5 border-t border-[#1C1C26] text-center">
            <p className="text-xs text-[#A1A1AA]">
              Already registered with ProBuilder?{' '}
              <button
                type="button"
                id="navigate-to-login-btn"
                onClick={() => onNavigate('login')}
                className="font-bold text-[#D3151D] hover:text-[#EF4444] transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        <div className="mt-5 text-center flex items-center justify-center gap-2 text-[11px] text-[#71717A]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#A1A1AA]" />
          <span>No credit card required for starter courses • Instant enrollment</span>
        </div>
      </div>
    </div>
  );
};
