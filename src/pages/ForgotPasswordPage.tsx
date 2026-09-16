import React, { useState, useEffect } from 'react';
import { NavPage } from '../types';
import { useAuth } from '../context/AuthContext';
import { ProBuilderLogo } from '../components/ProBuilderLogo';
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  KeyRound
} from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (page: NavPage) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { sendPasswordReset, authError, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (authError) clearError();
    if (validationError) setValidationError(null);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendPasswordReset(email.trim());
      setIsSuccess(true);
    } catch {
      // Handled in authError
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#B81118]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0D0D12] border border-[#22222D] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4 cursor-pointer" onClick={() => onNavigate('home')}>
              <ProBuilderLogo size="sm" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#181822] border border-[#2B2B38] flex items-center justify-center mx-auto mb-3 text-[#D3151D]">
              <KeyRound className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-1.5 leading-relaxed">
              Enter your student email and we will send you secure password reset instructions.
            </p>
          </div>

          {/* Error Notice */}
          {(authError || validationError) && (
            <div className="mb-5 p-3 rounded-xl bg-[#2A0D10] border border-[#B81118]/40 text-[#FCA5A5] text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#EF4444]" />
              <div className="leading-snug">{authError || validationError}</div>
            </div>
          )}

          {isSuccess ? (
            <div className="py-4 space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-[#0D2818] border border-emerald-500/40 text-emerald-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Reset Link Dispatched</span>
                </div>
                <p className="leading-relaxed">
                  We've sent password reset instructions to{' '}
                  <span className="font-semibold text-white">{email}</span>. Please check your inbox and follow the link to establish your new password.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  id="navigate-to-reset-password-sim-btn"
                  onClick={() => onNavigate('reset-password')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#171720] hover:bg-[#20202C] text-white text-xs font-bold border border-[#2B2B3A] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Already have reset code? Enter New Password</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D3151D]" />
                </button>

                <button
                  type="button"
                  id="back-to-login-btn"
                  onClick={() => onNavigate('login')}
                  className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-[#14141A] text-[#A1A1AA] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                  Account Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    id="forgot-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@probuilder.pk"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="submit-forgot-password-btn"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#D3151D] hover:bg-[#E50914] active:bg-[#B91C1C] text-white text-sm font-bold transition-all shadow-md shadow-[#D3151D]/25 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-3 text-center">
                <button
                  type="button"
                  id="cancel-forgot-btn"
                  onClick={() => onNavigate('login')}
                  className="text-xs text-[#A1A1AA] hover:text-white flex items-center justify-center gap-1.5 mx-auto font-medium transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
