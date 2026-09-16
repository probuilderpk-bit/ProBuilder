import { UserEnrollment, UserProfileStats } from '../types';
import { COURSES } from '../data/courses';

const STORAGE_KEY_PREFIX = 'probuilder_enrollments_v1_';

export class EnrollmentService {
  private getStorageKey(userId: string): string {
    return `${STORAGE_KEY_PREFIX}${userId}`;
  }

  // Retrieve user enrollments from persistent client state or seeded demo state
  async getUserEnrollments(userId: string): Promise<UserEnrollment[]> {
    const raw = localStorage.getItem(this.getStorageKey(userId));
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback
      }
    }

    // Default seeded state ONLY for the primary demo user ID
    if (userId === 'usr_student_demo_01') {
      const demoEnrollments: UserEnrollment[] = [
        {
          id: 'enr_demo_01',
          userId,
          courseId: 'ai-agents-development',
          enrolledAt: '2026-01-20T10:00:00.000Z',
          status: 'in-progress',
          progressPercent: 55,
          completedLessons: [
            'Agent Architecture & Autonomous Execution Patterns',
            'Tool Calling & Function Chaining in Modern LLMs',
            'State Management with LangGraph'
          ],
          lastAccessedLesson: 'Multi-Agent Collaboration & Supervisor Swarms',
          lastAccessedAt: new Date().toISOString(),
          certificateIssued: false
        },
        {
          id: 'enr_demo_02',
          userId,
          courseId: 'intro-to-ai',
          enrolledAt: '2026-01-16T14:30:00.000Z',
          status: 'completed',
          progressPercent: 100,
          completedLessons: [
            'What is Generative AI vs Traditional Computing',
            'How LLMs Process Language',
            'Key Terms: Tokens, Weights, Inference',
            'Text, Image, Code, and Speech Models Overview',
            'Open Source vs Proprietary Architectures',
            'Choosing the Right Model for Your Goal',
            'Your First Real-World AI Workflow',
            'Privacy, Security & Data Safety',
            'Where to Go Next'
          ],
          lastAccessedLesson: 'Where to Go Next',
          lastAccessedAt: '2026-02-01T12:00:00.000Z',
          certificateIssued: true,
          certificateId: 'PB-CERT-2026-04829',
          completedAt: '2026-02-01T12:00:00.000Z'
        },
        {
          id: 'enr_demo_03',
          userId,
          courseId: 'ai-chatbots-rag',
          enrolledAt: '2026-02-05T09:15:00.000Z',
          status: 'in-progress',
          progressPercent: 30,
          completedLessons: [
            'Modern Retrieval-Augmented Generation Architecture',
            'Vector Embeddings & Semantic Search'
          ],
          lastAccessedLesson: 'Chunking Strategies & Context Window Optimization',
          lastAccessedAt: new Date().toISOString(),
          certificateIssued: false
        }
      ];

      localStorage.setItem(this.getStorageKey(userId), JSON.stringify(demoEnrollments));
      return demoEnrollments;
    }

    // Newly registered users start with zero enrollments until they explicitly enroll
    return [];
  }

  // Enroll in a new course
  async enrollInCourse(userId: string, courseId: string): Promise<UserEnrollment> {
    const course = COURSES.find((c) => c.id === courseId);
    if (!course) {
      throw new Error(`Course ${courseId} does not exist`);
    }

    const currentEnrollments = await this.getUserEnrollments(userId);
    const existing = currentEnrollments.find((e) => e.courseId === courseId);
    if (existing) {
      return existing;
    }

    const newEnrollment: UserEnrollment = {
      id: `enr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      status: 'in-progress',
      progressPercent: 0,
      completedLessons: [],
      lastAccessedLesson: course.syllabus[0]?.lessons[0] || 'Orientation',
      lastAccessedAt: new Date().toISOString(),
      certificateIssued: false
    };

    const updated = [newEnrollment, ...currentEnrollments];
    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(updated));
    return newEnrollment;
  }

  // Toggle or mark a lesson as completed
  async toggleLessonProgress(
    userId: string,
    courseId: string,
    lessonTitle: string,
    totalCourseLessons: number
  ): Promise<UserEnrollment> {
    const enrollments = await this.getUserEnrollments(userId);
    const index = enrollments.findIndex((e) => e.courseId === courseId);
    if (index === -1) {
      throw new Error('User is not enrolled in this course');
    }

    const enrollment = { ...enrollments[index] };
    const isCompleted = enrollment.completedLessons.includes(lessonTitle);

    let nextCompletedLessons: string[];
    if (isCompleted) {
      nextCompletedLessons = enrollment.completedLessons.filter((l) => l !== lessonTitle);
    } else {
      nextCompletedLessons = [...enrollment.completedLessons, lessonTitle];
    }

    const percent = Math.min(
      100,
      Math.round((nextCompletedLessons.length / Math.max(1, totalCourseLessons)) * 100)
    );

    enrollment.completedLessons = nextCompletedLessons;
    enrollment.progressPercent = percent;
    enrollment.lastAccessedLesson = lessonTitle;
    enrollment.lastAccessedAt = new Date().toISOString();

    if (percent === 100) {
      enrollment.status = 'completed';
      enrollment.completedAt = enrollment.completedAt || new Date().toISOString();
      enrollment.certificateIssued = true;
      if (!enrollment.certificateId) {
        enrollment.certificateId = `PB-CERT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      }
    } else {
      enrollment.status = 'in-progress';
    }

    enrollments[index] = enrollment;
    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(enrollments));
    return enrollment;
  }

  // Check if user is enrolled
  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    const enrollments = await this.getUserEnrollments(userId);
    return enrollments.some((e) => e.courseId === courseId);
  }

  // Calculate learning metrics
  async getUserStats(userId: string): Promise<UserProfileStats> {
    const enrollments = await this.getUserEnrollments(userId);
    const totalEnrolled = enrollments.length;
    const completedCourses = enrollments.filter((e) => e.status === 'completed').length;
    const inProgress = totalEnrolled - completedCourses;
    const certificatesEarned = enrollments.filter((e) => e.certificateIssued).length;

    // Approximate hours learned based on completed lesson proportions
    let hoursLearned = 0;
    for (const e of enrollments) {
      const course = COURSES.find((c) => c.id === e.courseId);
      if (course) {
        const parsedHours = parseFloat(course.duration) || 3.0;
        hoursLearned += (parsedHours * (e.progressPercent / 100));
      }
    }

    return {
      totalEnrolled,
      inProgress,
      completedCourses,
      certificatesEarned,
      hoursLearned: Math.round(hoursLearned * 10) / 10
    };
  }
}

export const enrollmentService = new EnrollmentService();
