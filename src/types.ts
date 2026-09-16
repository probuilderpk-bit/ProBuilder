export type NavPage =
  | 'home'
  | 'free-courses'
  | 'courses'
  | 'about'
  | 'contact'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'reset-password'
  | 'dashboard';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  emailVerified: boolean;
  role: UserRole;
  createdAt: string;
  lastLoginAt?: string;
}

export type EnrollmentStatus = 'in-progress' | 'completed';

export interface UserEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  status: EnrollmentStatus;
  progressPercent: number;
  completedLessons: string[]; // lesson titles or unique lesson IDs
  lastAccessedLesson?: string;
  lastAccessedAt: string;
  certificateIssued?: boolean;
  certificateId?: string;
  completedAt?: string;
}

export interface UserProfileStats {
  totalEnrolled: number;
  inProgress: number;
  completedCourses: number;
  certificatesEarned: number;
  hoursLearned: number;
}

export interface UserProfile extends AuthUser {
  stats: UserProfileStats;
  bio?: string;
  jobTitle?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface CourseModule {
  title: string;
  lessons: string[];
}

export interface Instructor {
  name: string;
  role: string;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  level: CourseLevel;
  isFree: boolean;
  price?: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  featured?: boolean;
  popular?: boolean;
  instructor: Instructor;
  syllabus: CourseModule[];
  keySkills: string[];
  prerequisites?: string[];
  toolsCovered: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    page?: NavPage;
    filterCategory?: string;
    courseId?: string;
  };
}
