import React, { useState, useEffect, useRef } from 'react';
import { NavPage } from '../types';
import { ProBuilderLogo } from './ProBuilderLogo';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  Sparkles, 
  User, 
  ArrowRight,
  GraduationCap,
  BookOpen,
  Mail,
  Home,
  Bot,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Settings
} from 'lucide-react';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage, categoryFilter?: string) => void;
  onOpenLogin: () => void;
  onOpenAIAdvisor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenLogin,
  onOpenAIAdvisor
}) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { label: string; page: NavPage; icon: React.ReactNode; badge?: string }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-4 h-4" /> },
    { label: 'Free Courses', page: 'free-courses', icon: <Sparkles className="w-4 h-4 text-[#D3151D]" />, badge: 'FREE' },
    { label: 'Courses', page: 'courses', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Why ProBuilder', page: 'about', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Contact', page: 'contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    onNavigate('home');
  };

  const userInitials = user?.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'PB';

  return (
    <header
      id="site-header-navbar"
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled 
          ? 'bg-[#060608]/95 backdrop-blur-md border-b border-[#1E1E24] shadow-xl shadow-black/50' 
          : 'bg-[#060608] border-b border-[#16161B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-22">
          {/* Top-Left: Official ProBuilder Logo in its horizontal rectangular format */}
          <div className="flex-shrink-0 flex items-center pr-3">
            {/* Desktop & Tablet Display */}
            <div className="hidden sm:block">
              <ProBuilderLogo
                size="md"
                onClick={() => handleNavClick('home')}
                className="hover:scale-[1.02] transition-transform"
              />
            </div>
            {/* Mobile Display: Crisp compact horizontal rectangle */}
            <div className="block sm:hidden">
              <ProBuilderLogo
                size="sm"
                onClick={() => handleNavClick('home')}
                className="active:scale-95 transition-transform"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'text-white bg-[#15151A] font-semibold'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-[#121216]'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#D3151D]/20 text-[#EF4444] border border-[#D3151D]/30">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D3151D] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop & Tablet Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 md:gap-3">
            {/* AI Advisor Trigger */}
            <button
              id="nav-ai-advisor-btn"
              onClick={onOpenAIAdvisor}
              className="relative group flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-[#111116] hover:bg-[#181820] text-white border border-[#24242C] hover:border-[#D3151D]/60 transition-all shadow-sm"
              title="AI Course & Roadmap Advisor"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D3151D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D3151D]"></span>
              </span>
              <Bot className="w-3.5 h-3.5 text-[#D3151D]" />
              <span className="hidden md:inline">AI Advisor</span>
            </button>

            {/* Authenticated User Menu vs Guest Login */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  id="nav-user-profile-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#14141C] hover:bg-[#1B1B26] border border-[#262634] hover:border-[#D3151D]/60 transition-all text-left"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.displayName}
                      className="w-7 h-7 rounded-lg object-cover border border-[#D3151D]/60"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#242432] to-[#14141C] border border-[#D3151D]/50 flex items-center justify-center text-xs font-bold text-white">
                      {userInitials}
                    </div>
                  )}
                  <div className="hidden xl:block">
                    <div className="text-xs font-bold text-white leading-none truncate max-w-[110px]">
                      {user.displayName}
                    </div>
                    <div className="text-[10px] text-[#A1A1AA] leading-none mt-1">Student</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#71717A] ml-0.5" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    id="user-account-dropdown"
                    className="absolute right-0 mt-2 w-56 bg-[#0E0E14] border border-[#262634] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="px-3 py-2.5 border-b border-[#1C1C26] mb-1">
                      <div className="text-xs font-bold text-white truncate">{user.displayName}</div>
                      <div className="text-[11px] text-[#71717A] truncate mt-0.5">{user.email}</div>
                    </div>

                    <button
                      id="dropdown-dashboard-btn"
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#E4E4E7] hover:text-white hover:bg-[#1C1C28] transition-colors text-left"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#D3151D]" />
                      <span>Learning Dashboard</span>
                    </button>

                    <button
                      id="dropdown-settings-btn"
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#E4E4E7] hover:text-white hover:bg-[#1C1C28] transition-colors text-left"
                    >
                      <Settings className="w-4 h-4 text-[#A1A1AA]" />
                      <span>Account Settings</span>
                    </button>

                    <div className="my-1 border-t border-[#1C1C26]" />

                    <button
                      id="dropdown-logout-btn"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#EF4444] hover:bg-[#2A0F12] transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-[#D4D4D8] hover:text-white hover:bg-[#15151A] rounded-lg transition-colors border border-transparent hover:border-[#222228]"
              >
                <User className="w-4 h-4 text-[#A1A1AA]" />
                <span>Login</span>
              </button>
            )}

            {/* Contact Now CTA Button */}
            <button
              id="nav-contact-btn"
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-[#D3151D] hover:bg-[#E50914] active:bg-[#B91C1C] rounded-lg transition-all shadow-md shadow-[#D3151D]/25 hover:shadow-[#D3151D]/40"
            >
              <span>Contact Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls (<640px) */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-ai-advisor-icon"
              onClick={onOpenAIAdvisor}
              className="p-2 rounded-lg bg-[#121217] border border-[#24242C] text-[#D3151D] active:bg-[#1E1E26]"
              aria-label="AI Advisor"
              title="AI Advisor"
            >
              <Bot className="w-4 h-4" />
            </button>

            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-white bg-[#121217] border border-[#24242C] active:bg-[#1E1E26] focus:outline-none focus:ring-1 focus:ring-[#D3151D]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#D3151D]" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Feature Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden border-b border-[#202026] bg-[#07070A]/98 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200"
        >
          {/* Brand Tagline Banner */}
          <div className="py-2.5 px-3 mb-3 rounded-lg bg-[#111116] border border-[#1E1E24] flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-widest text-[#A1A1AA] uppercase">
              DEVELOPMENT • TEACHING • GLOBAL REACH
            </span>
            <span className="w-2 h-2 rounded-full bg-[#D3151D] animate-pulse" />
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`mobile-nav-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#17171E] text-white border-l-4 border-[#D3151D]'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-[#121216]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D3151D]/20 text-[#EF4444] border border-[#D3151D]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Buttons */}
          <div className="mt-5 pt-4 border-t border-[#1C1C22] space-y-2.5">
            <button
              id="mobile-advisor-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIAdvisor();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#14141A] hover:bg-[#1A1A22] text-white border border-[#272733] text-sm font-bold shadow-sm"
            >
              <Bot className="w-4 h-4 text-[#D3151D]" />
              <span>Ask ProBuilder AI Advisor</span>
            </button>

            {user ? (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#14141C] border border-[#242432] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#242432] border border-[#D3151D]/50 flex items-center justify-center text-xs font-bold text-white">
                      {userInitials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{user.displayName}</div>
                      <div className="text-[10px] text-[#A1A1AA]">{user.email}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    Online
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="mobile-dashboard-btn"
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full py-3 px-3 rounded-xl bg-[#1C1C28] hover:bg-[#252536] text-white border border-[#2C2C3E] text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#D3151D]" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    id="mobile-logout-btn"
                    onClick={handleLogout}
                    className="w-full py-3 px-3 rounded-xl bg-[#201014] hover:bg-[#2B141A] text-[#EF4444] border border-[#3D1A20] text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>

                <button
                  id="mobile-contact-btn"
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3 px-3 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white text-sm font-bold flex items-center justify-center gap-1 shadow-md shadow-[#D3151D]/30"
                >
                  <span>Contact Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  id="mobile-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-3 px-3 rounded-xl bg-[#101014] hover:bg-[#16161C] text-white border border-[#22222A] text-sm font-semibold flex items-center justify-center gap-1.5"
                >
                  <User className="w-4 h-4 text-[#A1A1AA]" />
                  <span>Login</span>
                </button>

                <button
                  id="mobile-contact-btn"
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3 px-3 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white text-sm font-bold flex items-center justify-center gap-1 shadow-md shadow-[#D3151D]/30"
                >
                  <span>Contact Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
