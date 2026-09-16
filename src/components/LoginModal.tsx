import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { ProBuilderLogo } from './ProBuilderLogo';
import { useAuth } from '../context/AuthContext';
import { NavPage } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavPage) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { login, signup, authError, clearError } = useAuth();

  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (authError) clearError();
    if (localError) setLocalError(null);
  }, [email, password, name, tab]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setLocalError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters.');
      return;
    }
    if (tab === 'signup' && !name.trim()) {
      setLocalError('Please provide your full name.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (tab === 'signin') {
        await login({ email: email.trim(), password });
      } else {
        await signup({ name: name.trim(), email: email.trim(), password });
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        onNavigate('dashboard');
      }, 700);
    } catch {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('student@probuilder.pk');
    setPassword('ProBuilder2026!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="login-modal-dialog"
        className="relative w-full max-w-md bg-[#0D0D12] border border-[#22222D] rounded-2xl shadow-2xl p-6 sm:p-8 text-[#E4E4E7] overflow-hidden"
      >
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#D3151D]/15 rounded-full blur-3xl pointer-events-none" />

        <button
          id="close-login-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#161620] text-[#A1A1AA] hover:text-white hover:bg-[#20202C] transition-colors"
          aria-label="Close login dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <ProBuilderLogo size="sm" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {tab === 'signin' ? 'Welcome Back to ProBuilder' : 'Join ProBuilder Academy'}
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-1">
            {tab === 'signin'
              ? 'Access your enrolled courses, lesson progress, and certificates'
              : 'Start learning practical AI and digital building skills today'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-[#111117] p-1 border border-[#1E1E26] mb-5">
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'signin' ? 'bg-[#1E1E28] text-white shadow-sm font-bold' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'signup' ? 'bg-[#1E1E28] text-white shadow-sm font-bold' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error */}
        {(authError || localError) && (
          <div className="mb-4 p-3 rounded-xl bg-[#2A0D10] border border-[#B81118]/40 text-[#FCA5A5] text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#EF4444]" />
            <div className="leading-snug">{authError || localError}</div>
          </div>
        )}

        {submitted ? (
          <div className="py-8 text-center space-y-3 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              {tab === 'signin' ? 'Logged In Successfully!' : 'Account Created!'}
            </h3>
            <p className="text-xs text-[#A1A1AA]">Redirecting to your student dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@probuilder.pk"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#D4D4D8]">
                  Password
                </label>
                {tab === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate('forgot-password');
                    }}
                    className="text-[11px] text-[#D3151D] hover:underline font-bold"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#71717A] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="submit-auth-btn"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#D3151D] hover:bg-[#E50914] active:bg-[#B91C1C] text-white text-sm font-bold transition-all shadow-md shadow-[#D3151D]/25 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{tab === 'signin' ? 'Sign In to Account' : 'Create Free Student Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Credentials hint */}
            <div className="text-center pt-2 flex items-center justify-between text-[11px]">
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[#A1A1AA] hover:text-white underline underline-offset-2"
              >
                Autofill demo student
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate(tab === 'signin' ? 'login' : 'signup');
                }}
                className="text-[#D3151D] hover:underline font-semibold"
              >
                Open full page
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
