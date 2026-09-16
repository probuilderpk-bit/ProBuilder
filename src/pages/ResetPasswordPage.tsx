import React, { useState, useEffect } from 'react';
import { NavPage } from '../types';
import { useAuth } from '../context/AuthContext';
import { ProBuilderLogo } from '../components/ProBuilderLogo';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Check,
  X,
  Key
} from 'lucide-react';

interface ResetPasswordPageProps {
  onNavigate: (page: NavPage) => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const { confirmPasswordReset, authError, clearError } = useAuth();

  const [code, setCode] = useState('VERIFY-TOKEN-DEMO');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (authError) clearError();
    if (validationError) setValidationError(null);
  }, [code, newPassword, confirmPassword]);

  const hasMinLength = newPassword.length >= 8;
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setValidationError('Please enter your reset code or token.');
      return;
    }
    if (!hasMinLength) {
      setValidationError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await confirmPasswordReset({
        code: code.trim(),
        newPassword,
        confirmPassword
      });
      setIsSuccess(true);
      setTimeout(() => {
        onNavigate('login');
      }, 1500);
    } catch {
      // Handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#B81118]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0D0D12] border border-[#22222D] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4 cursor-pointer" onClick={() => onNavigate('home')}>
              <ProBuilderLogo size="sm" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#181822] border border-[#2B2B38] flex items-center justify-center mx-auto mb-3 text-[#D3151D]">
              <Key className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Create New Password
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-1.5 leading-relaxed">
              Choose a strong, unique password to secure your ProBuilder student profile.
            </p>
          </div>

          {/* Error */}
          {(authError || validationError) && (
            <div className="mb-5 p-3 rounded-xl bg-[#2A0D10] border border-[#B81118]/40 text-[#FCA5A5] text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#EF4444]" />
              <div className="leading-snug">{authError || validationError}</div>
            </div>
          )}

          {isSuccess ? (
            <div className="py-6 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Password Updated Successfully!</h2>
              <p className="text-xs text-[#A1A1AA]">
                Your password has been changed securely. Redirecting to sign in...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                  Reset Token / Verification Code
                </label>
                <input
                  type="text"
                  id="reset-code-input"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Verification code from email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="new-password-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] transition-colors"
                  />
                  <button
                    type="button"
                    id="toggle-new-password-btn"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-3 text-[#71717A] hover:text-white p-0.5 rounded transition-colors"
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirm-new-password-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    autoComplete="new-password"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#121218] border border-[#262633] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D] transition-colors"
                  />
                  <button
                    type="button"
                    id="toggle-confirm-new-password-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3 text-[#71717A] hover:text-white p-0.5 rounded transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password checks */}
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

              <button
                type="submit"
                id="submit-reset-password-btn"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#D3151D] hover:bg-[#E50914] active:bg-[#B91C1C] text-white text-sm font-bold transition-all shadow-md shadow-[#D3151D]/25 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating Password...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
