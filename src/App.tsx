import React, { useState, useEffect } from 'react';
import { NavPage, Course } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { enrollmentService } from './services/enrollmentService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FreeCoursesPage } from './pages/FreeCoursesPage';
import { AllCoursesPage } from './pages/AllCoursesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { CourseDetailModal } from './components/CourseDetailModal';
import { LoginModal } from './components/LoginModal';
import { AIAdvisorModal } from './components/AIAdvisorModal';
import { Bot, ArrowUp, Loader2 } from 'lucide-react';
import { ProBuilderLogo } from './components/ProBuilderLogo';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [enrollmentNotification, setEnrollmentNotification] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Protected route guard for 'dashboard'
  useEffect(() => {
    if (!loading && !user && currentPage === 'dashboard') {
      setCurrentPage('login');
    }
  }, [user, loading, currentPage]);

  // If already logged in and visiting login or signup, redirect to dashboard
  useEffect(() => {
    if (!loading && user && (currentPage === 'login' || currentPage === 'signup')) {
      setCurrentPage('dashboard');
    }
  }, [user, loading, currentPage]);

  const handleNavigate = (page: NavPage, filterCategory?: string) => {
    setCurrentPage(page);
    setCategoryFilter(filterCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnrollCourse = async (course: Course) => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    try {
      await enrollmentService.enrollInCourse(user.id, course.id);
      setSelectedCourse(null);
      setEnrollmentNotification(`Successfully enrolled in "${course.title}"!`);
      setTimeout(() => setEnrollmentNotification(null), 4000);
      handleNavigate('dashboard');
    } catch (err: any) {
      console.error('Enrollment error:', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0C] text-[#F4F4F5] selection:bg-[#E50914]/30 selection:text-white relative">
      {/* Dynamic Global Toast / Notification */}
      {enrollmentNotification && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-white shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in slide-in-from-top-4">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold">{enrollmentNotification}</span>
        </div>
      )}

      {/* Top Main Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenLogin={() => {
          if (user) {
            handleNavigate('dashboard');
          } else {
            handleNavigate('login');
          }
        }}
        onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
      />

      {/* Page Content */}
      <main className="flex-1">
        {/* Loading State while determining session */}
        {loading && currentPage === 'dashboard' ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <ProBuilderLogo size="sm" />
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
              <Loader2 className="w-4 h-4 animate-spin text-[#D3151D]" />
              <span>Verifying student authentication session...</span>
            </div>
          </div>
        ) : (
          <>
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectCourse={setSelectedCourse}
                onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
              />
            )}

            {currentPage === 'free-courses' && (
              <FreeCoursesPage
                onSelectCourse={setSelectedCourse}
                onNavigate={handleNavigate}
                onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
              />
            )}

            {currentPage === 'courses' && (
              <AllCoursesPage
                initialCategoryFilter={categoryFilter}
                onSelectCourse={setSelectedCourse}
                onNavigate={handleNavigate}
                onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onNavigate={handleNavigate}
                onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                onNavigate={handleNavigate}
                onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
              />
            )}

            {/* Authentication Pages */}
            {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}

            {currentPage === 'signup' && <SignUpPage onNavigate={handleNavigate} />}

            {currentPage === 'forgot-password' && (
              <ForgotPasswordPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'reset-password' && (
              <ResetPasswordPage onNavigate={handleNavigate} />
            )}

            {/* Protected Learning Dashboard */}
            {currentPage === 'dashboard' && user && (
              <DashboardPage
                onNavigate={handleNavigate}
                onSelectCourse={setSelectedCourse}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLogin={() => {
          if (user) {
            handleNavigate('dashboard');
          } else {
            handleNavigate('login');
          }
        }}
      />

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={handleEnrollCourse}
      />

      {/* Student Login / Signup Quick Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* ProBuilder AI Advisor Modal */}
      <AIAdvisorModal
        isOpen={aiAdvisorOpen}
        onClose={() => setAiAdvisorOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Floating Action Button: AI Learning Advisor */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            id="scroll-to-top-btn"
            className="p-3 rounded-full bg-[#181820]/90 hover:bg-[#252530] text-[#A1A1AA] hover:text-white border border-[#2B2B38] shadow-lg backdrop-blur-md transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => setAiAdvisorOpen(true)}
          id="floating-ai-advisor-btn"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#111116]/95 hover:bg-[#181822] text-white border border-[#2A2A35] hover:border-[#E50914]/50 shadow-2xl backdrop-blur-md transition-all hover:scale-[1.03]"
          aria-label="Ask AI Advisor"
        >
          <div className="relative">
            <span className="animate-ping absolute -top-1 -right-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#E50914] opacity-75"></span>
            <div className="w-6 h-6 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-[#E50914]" />
            </div>
          </div>
          <span className="text-xs font-bold tracking-wide">
            Ask AI Advisor
          </span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
