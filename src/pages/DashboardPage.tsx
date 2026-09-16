import React, { useState, useEffect } from 'react';
import { NavPage, UserEnrollment, UserProfileStats, Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { enrollmentService } from '../services/enrollmentService';
import { COURSES } from '../data/courses';
import {
  BookOpen,
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  ChevronRight,
  LogOut,
  Play,
  Settings,
  User,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Flame,
  AlertCircle,
  Key,
  Bell,
  Code,
  Check
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: NavPage) => void;
  onSelectCourse: (course: Course) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectCourse }) => {
  const { user, logout, isConfigured, providerName, configStatus, updateUserProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'in-progress' | 'completed' | 'explore' | 'settings'>('in-progress');
  const [enrollments, setEnrollments] = useState<UserEnrollment[]>([]);
  const [stats, setStats] = useState<UserProfileStats>({
    totalEnrolled: 0,
    inProgress: 0,
    completedCourses: 0,
    certificatesEarned: 0,
    hoursLearned: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Active Lesson Player / Syllabus modal
  const [activeLearningCourse, setActiveLearningCourse] = useState<{
    course: Course;
    enrollment: UserEnrollment;
  } | null>(null);

  // Certificate modal
  const [viewingCertificate, setViewingCertificate] = useState<{
    course: Course;
    enrollment: UserEnrollment;
  } | null>(null);

  // Settings form state
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Load user data
  useEffect(() => {
    if (!user) {
      onNavigate('login');
      return;
    }

    setDisplayName(user.displayName);
    loadEnrollments();
  }, [user]);

  const loadEnrollments = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userEnr = await enrollmentService.getUserEnrollments(user.id);
      const userStats = await enrollmentService.getUserStats(user.id);
      setEnrollments(userEnr);
      setStats(userStats);
    } catch (err) {
      console.error('Failed to load enrollments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle lesson checkoff
  const handleToggleLesson = async (courseId: string, lessonTitle: string, totalLessons: number) => {
    if (!user) return;
    try {
      const updated = await enrollmentService.toggleLessonProgress(
        user.id,
        courseId,
        lessonTitle,
        totalLessons
      );

      // Refresh enrollments & stats
      const userEnr = await enrollmentService.getUserEnrollments(user.id);
      const userStats = await enrollmentService.getUserStats(user.id);
      setEnrollments(userEnr);
      setStats(userStats);

      if (activeLearningCourse && activeLearningCourse.course.id === courseId) {
        setActiveLearningCourse({
          ...activeLearningCourse,
          enrollment: updated
        });
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  // Handle new enrollment
  const handleEnrollFromCatalog = async (courseId: string) => {
    if (!user) return;
    try {
      await enrollmentService.enrollInCourse(user.id, courseId);
      await loadEnrollments();
      setActiveTab('in-progress');
    } catch (err) {
      console.error('Enrollment failed:', err);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    try {
      await updateUserProfile({ displayName: displayName.trim() });
      setProfileUpdated(true);
      setTimeout(() => setProfileUpdated(false), 2500);
    } catch (err) {
      console.error('Update profile error:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
    onNavigate('home');
  };

  // Separate active and completed
  const inProgressEnrollments = enrollments.filter((e) => e.status === 'in-progress');
  const completedEnrollments = enrollments.filter((e) => e.status === 'completed');

  // Enrolled course IDs
  const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));
  const recommendedCourses = COURSES.filter((c) => !enrolledCourseIds.has(c.id)).slice(0, 6);

  if (!user) {
    return null;
  }

  // Get user initials
  const initials = user.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'PB';

  return (
    <div className="min-h-screen pb-20 bg-[#0A0A0E] text-[#F4F4F5] relative">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D3151D]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero / Student Banner */}
      <section className="relative border-b border-[#1E1E28] bg-gradient-to-b from-[#111118] via-[#0E0E14] to-[#0A0A0E] pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: User details & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Avatar placeholder with initials or photo */}
              <div className="relative">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.displayName}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#D3151D]/60 shadow-xl"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#1C1C26] to-[#121218] border-2 border-[#D3151D]/50 flex items-center justify-center text-xl sm:text-2xl font-black text-white shadow-xl shadow-[#D3151D]/10">
                    {initials}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0E0E14] flex items-center justify-center" title="Active student session">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {user.displayName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#D3151D]/20 text-[#EF4444] border border-[#D3151D]/40">
                    ProBuilder Student
                  </span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-1 font-mono">{user.email}</p>
                <div className="flex items-center gap-3 text-[11px] text-[#71717A] mt-2">
                  <span>Student ID: <span className="text-[#A1A1AA] font-mono">{user.id.slice(0, 14)}</span></span>
                  <span>•</span>
                  <span>Member since: {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Quick Action controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                id="backend-config-status-btn"
                onClick={() => setShowConfigModal(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isConfigured
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-[#151520] border-[#2A2A3A] hover:border-[#D3151D]/50 text-[#D4D4D8]'
                }`}
                title="View Auth Backend Status & Instructions"
              >
                <ShieldCheck className={`w-4 h-4 ${isConfigured ? 'text-emerald-400' : 'text-[#D3151D]'}`} />
                <span>{isConfigured ? 'Firebase Auth Live' : 'Backend Status: Architecture Mode'}</span>
              </button>

              <button
                type="button"
                id="dashboard-logout-btn"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14141C] hover:bg-[#1C1C28] text-xs font-semibold text-[#A1A1AA] hover:text-white border border-[#242432] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
            <div className="p-4 rounded-xl bg-[#12121A] border border-[#1F1F2C] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#D3151D]/15 border border-[#D3151D]/30 flex items-center justify-center text-[#D3151D] shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">{stats.totalEnrolled}</div>
                <div className="text-[11px] text-[#A1A1AA] uppercase font-bold tracking-wider">Enrolled Courses</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#12121A] border border-[#1F1F2C] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">{stats.inProgress}</div>
                <div className="text-[11px] text-[#A1A1AA] uppercase font-bold tracking-wider">In Progress</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#12121A] border border-[#1F1F2C] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">{stats.completedCourses}</div>
                <div className="text-[11px] text-[#A1A1AA] uppercase font-bold tracking-wider">Completed</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#12121A] border border-[#1F1F2C] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">{stats.certificatesEarned}</div>
                <div className="text-[11px] text-[#A1A1AA] uppercase font-bold tracking-wider">Certificates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Learning Hub Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#1E1E28] pb-3 overflow-x-auto no-scrollbar">
          <button
            type="button"
            id="tab-in-progress-btn"
            onClick={() => setActiveTab('in-progress')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'in-progress'
                ? 'bg-[#1C1C28] text-white border border-[#2F2F40] shadow-sm'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#14141C]'
            }`}
          >
            <Clock className="w-4 h-4 text-[#D3151D]" />
            <span>Enrolled Courses</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-[#121218] border border-[#2B2B38] text-white">
              {inProgressEnrollments.length}
            </span>
          </button>

          <button
            type="button"
            id="tab-completed-btn"
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-[#1C1C28] text-white border border-[#2F2F40] shadow-sm'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#14141C]'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Completed & Certificates</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-[#121218] border border-[#2B2B38] text-white">
              {completedEnrollments.length}
            </span>
          </button>

          <button
            type="button"
            id="tab-explore-btn"
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'explore'
                ? 'bg-[#1C1C28] text-white border border-[#2F2F40] shadow-sm'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#14141C]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Explore Catalog</span>
          </button>

          <button
            type="button"
            id="tab-settings-btn"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#1C1C28] text-white border border-[#2F2F40] shadow-sm'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#14141C]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#A1A1AA]" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Tab 1: In Progress Enrolled Courses */}
        {activeTab === 'in-progress' && (
          <div className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Active Learning Tracks
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Pick up right where you left off. Every completed lesson advances your mastery.
                </p>
              </div>

              {inProgressEnrollments.length > 0 && (
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-bold text-[#D3151D] hover:underline flex items-center gap-1"
                >
                  <span>Browse More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {inProgressEnrollments.length === 0 ? (
              <div className="p-12 rounded-2xl bg-[#0E0E14] border border-[#1F1F2A] text-center space-y-4 max-w-xl mx-auto my-6">
                <div className="w-14 h-14 rounded-2xl bg-[#181824] border border-[#282836] flex items-center justify-center mx-auto text-[#D3151D]">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">No active course enrollments yet</h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 max-w-md mx-auto leading-relaxed">
                    Start learning right away! Enroll in our free foundational masterclasses or advanced AI Agent tracks.
                  </p>
                </div>
                <button
                  type="button"
                  id="enroll-first-course-btn"
                  onClick={() => setActiveTab('explore')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white text-xs font-bold transition-all shadow-md shadow-[#D3151D]/25"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Browse Course Catalog</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressEnrollments.map((enrollment) => {
                  const course = COURSES.find((c) => c.id === enrollment.courseId);
                  if (!course) return null;

                  const totalLessons = course.syllabus.reduce((acc, m) => acc + m.lessons.length, 0);

                  return (
                    <div
                      key={enrollment.id}
                      id={`enrolled-course-${course.id}`}
                      className="group bg-[#0F0F16] border border-[#22222E] hover:border-[#D3151D]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
                    >
                      <div>
                        {/* Course Header with Category */}
                        <div className="p-5 pb-3">
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#1B1B26] text-[#A1A1AA] border border-[#272736]">
                              {course.category}
                            </span>
                            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                              <Flame className="w-3.5 h-3.5 text-amber-400" />
                              <span>{enrollment.progressPercent}% complete</span>
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-white group-hover:text-white transition-colors line-clamp-1">
                            {course.title}
                          </h3>

                          <p className="text-xs text-[#A1A1AA] mt-1.5 line-clamp-2 leading-relaxed">
                            {course.description}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="px-5 py-2">
                          <div className="w-full h-2 rounded-full bg-[#1A1A24] overflow-hidden border border-[#262636]">
                            <div
                              className="h-full bg-gradient-to-r from-[#B81118] to-[#EF4444] rounded-full transition-all duration-500"
                              style={{ width: `${enrollment.progressPercent}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-[#71717A] mt-2">
                            <span>
                              {enrollment.completedLessons.length} of {totalLessons} lessons
                            </span>
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        {/* Recent Lesson Info */}
                        {enrollment.lastAccessedLesson && (
                          <div className="px-5 py-2">
                            <div className="p-2.5 rounded-xl bg-[#14141E] border border-[#1E1E2C] text-xs">
                              <div className="text-[10px] uppercase font-bold text-[#71717A] tracking-wider">
                                Current Lesson
                              </div>
                              <div className="text-white font-medium truncate mt-0.5">
                                {enrollment.lastAccessedLesson}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Footer with Continue Learning Button */}
                      <div className="p-5 pt-3 border-t border-[#1C1C28] flex items-center justify-between gap-3 bg-[#0B0B10]">
                        <button
                          type="button"
                          id={`view-details-${course.id}`}
                          onClick={() => onSelectCourse(course)}
                          className="text-xs font-semibold text-[#A1A1AA] hover:text-white transition-colors"
                        >
                          Course Overview
                        </button>

                        <button
                          type="button"
                          id={`continue-learning-${course.id}`}
                          onClick={() => setActiveLearningCourse({ course, enrollment })}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white text-xs font-bold shadow-md shadow-[#D3151D]/20 transition-all hover:scale-[1.02]"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Continue Learning</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Completed Courses & Certificates */}
        {activeTab === 'completed' && (
          <div className="pt-6">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Completed Masterclasses & Certificates
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Verified digital achievements issued by ProBuilder Academy.
              </p>
            </div>

            {completedEnrollments.length === 0 ? (
              <div className="p-12 rounded-2xl bg-[#0E0E14] border border-[#1F1F2A] text-center space-y-4 max-w-xl mx-auto my-6">
                <div className="w-14 h-14 rounded-2xl bg-[#181824] border border-[#282836] flex items-center justify-center mx-auto text-emerald-400">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">No completed courses yet</h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 max-w-md mx-auto leading-relaxed">
                    Complete 100% of syllabus modules in any enrolled course to unlock your official verified certificate!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('in-progress')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#181822] hover:bg-[#222230] text-white text-xs font-bold border border-[#2F2F40] transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume Current Tracks</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedEnrollments.map((enrollment) => {
                  const course = COURSES.find((c) => c.id === enrollment.courseId);
                  if (!course) return null;

                  return (
                    <div
                      key={enrollment.id}
                      className="bg-[#0F0F16] border border-emerald-500/30 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl shadow-emerald-950/10"
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>100% Completed</span>
                          </span>
                          <span className="text-[11px] text-[#71717A] font-mono">
                            {enrollment.completedAt
                              ? new Date(enrollment.completedAt).toLocaleDateString()
                              : 'Graduated'}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white">{course.title}</h3>
                        <p className="text-xs text-[#A1A1AA] mt-1 line-clamp-2">{course.description}</p>

                        {/* Certificate details */}
                        <div className="mt-4 p-3 rounded-xl bg-[#121815] border border-emerald-500/20 space-y-1.5">
                          <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5" />
                            <span>Verified Certificate</span>
                          </div>
                          <div className="text-xs text-white font-mono">{enrollment.certificateId}</div>
                          <div className="text-[11px] text-[#A1A1AA]">Issued to: {user.displayName}</div>
                        </div>
                      </div>

                      <div className="p-5 pt-3 border-t border-[#1C1C28] flex items-center justify-between gap-3 bg-[#0B0B10]">
                        <button
                          type="button"
                          onClick={() => setActiveLearningCourse({ course, enrollment })}
                          className="text-xs font-semibold text-[#A1A1AA] hover:text-white"
                        >
                          Review Syllabus
                        </button>

                        <button
                          type="button"
                          onClick={() => setViewingCertificate({ course, enrollment })}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/25"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Explore Catalog & Instant Enroll */}
        {activeTab === 'explore' && (
          <div className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Explore More ProBuilder Courses
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Expand your skills across AI Agents, Web Development, Automation, and Freelancing.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('courses')}
                className="text-xs font-bold text-[#D3151D] hover:underline flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-[#0F0F16] border border-[#22222E] hover:border-[#D3151D]/50 rounded-2xl overflow-hidden flex flex-col justify-between p-5 transition-all shadow-xl group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#1B1B26] text-[#A1A1AA] border border-[#272736]">
                        {course.category}
                      </span>
                      {course.isFree ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          100% Free
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-white">{course.price}</span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-white line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] mt-1.5 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#71717A] mt-3">
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>{course.level}</span>
                      <span>•</span>
                      <span>★ {course.rating}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#1C1C28] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectCourse(course)}
                      className="text-xs font-semibold text-[#A1A1AA] hover:text-white"
                    >
                      Details
                    </button>

                    <button
                      type="button"
                      id={`enroll-btn-${course.id}`}
                      onClick={() => handleEnrollFromCatalog(course.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white text-xs font-bold shadow-md shadow-[#D3151D]/20 transition-all hover:scale-[1.02]"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Enroll in Track</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Account Settings */}
        {activeTab === 'settings' && (
          <div className="pt-6 max-w-3xl">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Account & Security Settings
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Manage your student identity, authentication preferences, and session controls.
              </p>
            </div>

            <div className="space-y-6">
              {/* Profile Details Card */}
              <div className="p-6 rounded-2xl bg-[#0F0F16] border border-[#22222E]">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D3151D]" />
                  <span>Student Profile</span>
                </h3>

                {profileUpdated && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Profile display name updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                      Full Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141C] border border-[#262634] text-sm text-white focus:outline-none focus:border-[#D3151D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                      Email Address (Primary Identity)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#111116] border border-[#22222D] text-sm text-[#71717A] cursor-not-allowed font-mono"
                    />
                    <span className="text-[11px] text-[#71717A] mt-1 block">
                      Email address changes must be requested through student support.
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="save-profile-btn"
                      className="px-5 py-2.5 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white text-xs font-bold transition-all shadow-md shadow-[#D3151D]/20"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Password & Security Card */}
              <div className="p-6 rounded-2xl bg-[#0F0F16] border border-[#22222E]">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#D3151D]" />
                  <span>Password & Security</span>
                </h3>

                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                  To update your password, use the official password reset protocol. An authentication token or email confirmation is dispatched securely.
                </p>

                <button
                  type="button"
                  onClick={() => onNavigate('forgot-password')}
                  className="px-4 py-2.5 rounded-xl bg-[#161622] hover:bg-[#20202E] text-white text-xs font-bold border border-[#2B2B3C] transition-colors inline-flex items-center gap-2"
                >
                  <Key className="w-3.5 h-3.5 text-[#D3151D]" />
                  <span>Request Password Reset Link</span>
                </button>
              </div>

              {/* Backend Architecture & Environment Setup */}
              <div className="p-6 rounded-2xl bg-[#0F0F16] border border-[#22222E]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#D3151D]" />
                    <span>Cloud Backend Integration Guide</span>
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isConfigured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {isConfigured ? 'Firebase Active' : 'Setup Instructions Ready'}
                  </span>
                </div>

                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">
                  This application is architected with a decoupled provider interface. Once Firebase Authentication is connected, your student accounts, passwords, and sessions are automatically persisted in production.
                </p>

                <button
                  type="button"
                  onClick={() => setShowConfigModal(true)}
                  className="text-xs font-bold text-[#D3151D] hover:underline flex items-center gap-1"
                >
                  <span>View Environment Variables & Setup Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Danger Zone */}
              <div className="p-6 rounded-2xl bg-[#180D10] border border-[#B81118]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Sign Out of All Sessions</h4>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Terminates the current student authentication session.
                  </p>
                </div>
                <button
                  type="button"
                  id="settings-logout-btn"
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-xl bg-[#B81118] hover:bg-[#D3151D] text-white text-xs font-bold transition-colors shrink-0 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout Now</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Active Learning Player & Syllabus Checkoff */}
      {activeLearningCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#0E0E14] border border-[#272736] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#1F1F2C] bg-[#12121A] flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D3151D]">
                  Interactive Learning Hub
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeLearningCourse.course.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#A1A1AA] mt-1">
                  <span>Instructor: {activeLearningCourse.course.instructor.name}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">
                    {activeLearningCourse.enrollment.progressPercent}% Completed
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveLearningCourse(null)}
                className="p-2 rounded-lg bg-[#1A1A24] text-[#A1A1AA] hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Syllabus checklist */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="p-3.5 rounded-xl bg-[#151522] border border-[#242436] flex items-center justify-between gap-3">
                <div className="text-xs text-[#D4D4D8]">
                  <span className="font-semibold text-white">Interactive Progress: </span>
                  Click any lesson below to mark it completed or uncompleted. Progress and certificates update instantly!
                </div>
              </div>

              {activeLearningCourse.course.syllabus.map((module, mIdx) => (
                <div key={mIdx} className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1A1A26] border border-[#2C2C3E] text-[10px] text-white flex items-center justify-center font-bold">
                      {mIdx + 1}
                    </span>
                    <span>{module.title}</span>
                  </div>

                  <div className="space-y-1.5 pl-7">
                    {module.lessons.map((lesson, lIdx) => {
                      const isDone = activeLearningCourse.enrollment.completedLessons.includes(lesson);
                      const totalLessons = activeLearningCourse.course.syllabus.reduce(
                        (acc, m) => acc + m.lessons.length,
                        0
                      );

                      return (
                        <div
                          key={lIdx}
                          onClick={() => handleToggleLesson(activeLearningCourse.course.id, lesson, totalLessons)}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer select-none transition-all ${
                            isDone
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
                              : 'bg-[#121218] border-[#22222E] hover:border-[#38384A] text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-400 text-black'
                                  : 'border-[#3E3E50] bg-[#161620]'
                              }`}
                            >
                              {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-medium">{lesson}</span>
                          </div>

                          <span className="text-[11px] text-[#71717A] shrink-0 font-mono">
                            {isDone ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#1F1F2C] bg-[#12121A] flex items-center justify-between">
              <span className="text-xs text-[#A1A1AA]">
                Completed {activeLearningCourse.enrollment.completedLessons.length} lessons
              </span>
              <button
                type="button"
                onClick={() => setActiveLearningCourse(null)}
                className="px-5 py-2 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white text-xs font-bold"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ProBuilder Certificate Viewer */}
      {viewingCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#0C0C12] border-2 border-emerald-500/50 rounded-2xl shadow-2xl p-6 sm:p-8 text-center overflow-hidden">
            <button
              type="button"
              onClick={() => setViewingCertificate(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#181822] text-[#A1A1AA] hover:text-white"
            >
              ✕
            </button>

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              ProBuilder Academy Verified Credential
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
              Certificate of Completion
            </h3>

            <p className="text-xs text-[#A1A1AA] mt-1">This certifies that</p>
            <h4 className="text-lg font-bold text-white mt-1 underline decoration-[#D3151D] underline-offset-4">
              {user.displayName}
            </h4>
            <p className="text-xs text-[#A1A1AA] mt-1">has successfully mastered all curriculum requirements for</p>

            <div className="my-4 p-4 rounded-xl bg-[#141420] border border-[#272738]">
              <div className="text-base font-black text-white">{viewingCertificate.course.title}</div>
              <div className="text-xs text-[#A1A1AA] mt-1">
                Instruction by {viewingCertificate.course.instructor.name} ({viewingCertificate.course.instructor.role})
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left text-xs bg-[#111118] p-3 rounded-xl border border-[#1E1E28]">
              <div>
                <span className="text-[#71717A] text-[10px] uppercase font-bold block">Certificate ID</span>
                <span className="font-mono text-emerald-300">{viewingCertificate.enrollment.certificateId}</span>
              </div>
              <div>
                <span className="text-[#71717A] text-[10px] uppercase font-bold block">Date Issued</span>
                <span className="text-white">
                  {new Date(viewingCertificate.enrollment.completedAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setViewingCertificate(null)}
                className="px-5 py-2.5 rounded-xl bg-[#161622] hover:bg-[#202030] text-white text-xs font-bold border border-[#2B2B3C]"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Backend Configuration & Production Connection Guide */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#0E0E14] border border-[#272736] rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowConfigModal(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#181822] text-[#A1A1AA] hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#D3151D]/15 border border-[#D3151D]/30 flex items-center justify-center text-[#D3151D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Authentication Architecture Status</h3>
                <p className="text-xs text-[#A1A1AA]">Current Provider: {providerName}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#D4D4D8]">
              <div className="p-4 rounded-xl bg-[#141420] border border-[#222234]">
                <span className="font-bold text-white block mb-1 text-sm">
                  Recommended Provider: Firebase Authentication
                </span>
                <p className="text-[#A1A1AA] leading-relaxed">
                  ProBuilder is pre-wired to switch to live Firebase Authentication automatically whenever environment variables are supplied.
                </p>
              </div>

              <div>
                <span className="font-bold text-white block mb-2">Required Environment Variables:</span>
                <div className="space-y-1.5 font-mono text-[11px] bg-[#0A0A0F] p-3 rounded-xl border border-[#22222E]">
                  <div>VITE_FIREBASE_API_KEY="AIzaSy..."</div>
                  <div>VITE_FIREBASE_PROJECT_ID="probuilder-app"</div>
                  <div>VITE_FIREBASE_AUTH_DOMAIN="probuilder-app.firebaseapp.com"</div>
                  <div className="text-[#71717A]"># Optional Storage & Messaging:</div>
                  <div>VITE_FIREBASE_STORAGE_BUCKET="probuilder-app.appspot.com"</div>
                  <div>VITE_FIREBASE_APP_ID="1:123456:web:abcd"</div>
                </div>
              </div>

              <div>
                <span className="font-bold text-white block mb-2">Step-by-Step Production Activation:</span>
                <ol className="list-decimal pl-5 space-y-1.5 text-[#A1A1AA] leading-relaxed">
                  <li>Create a project in the Firebase Console (or use AI Studio Firebase integration).</li>
                  <li>Enable <span className="text-white font-semibold">Email/Password</span> under Authentication &gt; Sign-in method.</li>
                  <li>Add the variables above to your project settings or <span className="font-mono text-white">.env</span> file.</li>
                  <li>The application detects the variables on boot and transitions to live cloud authentication with zero code changes!</li>
                </ol>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F1F2C] flex justify-end">
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white text-xs font-bold"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
