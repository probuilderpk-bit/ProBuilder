import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  Clock, 
  BookOpen, 
  Star, 
  Users, 
  CheckCircle2, 
  Award, 
  PlayCircle,
  ArrowRight
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onEnroll
}) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'skills' | 'instructor'>('syllabus');
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  if (!course) return null;

  const handleEnrollClick = () => {
    setEnrolledSuccess(true);
    onEnroll(course);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="course-detail-dialog"
        className="relative w-full max-w-3xl bg-[#0B0B0F] border border-[#22222D] rounded-2xl shadow-2xl overflow-hidden text-[#E4E4E7] my-8"
      >
        {/* Header Bar */}
        <div className="relative p-6 sm:p-8 bg-[#0F0F15] border-b border-[#1E1E26]">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D3151D]/10 rounded-full blur-3xl pointer-events-none" />

          <button
            id="close-course-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg bg-[#181822] text-[#A1A1AA] hover:text-white hover:bg-[#222230] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#D3151D]/15 text-[#D3151D] border border-[#D3151D]/30">
              {course.category}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded bg-[#161620] text-[#A1A1AA] border border-[#262634]">
              {course.level}
            </span>
            {course.isFree ? (
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-white text-black">
                100% FREE ACCESS
              </span>
            ) : (
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#D3151D] text-white">
                {course.price} ONE-TIME
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            {course.title}
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
            {course.longDescription}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 pt-5 border-t border-[#1E1E26] flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#D4D4D8]">
            <div className="flex items-center gap-1.5 text-white font-semibold">
              <Star className="w-4 h-4 fill-[#D3151D] text-[#D3151D]" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-[#71717A]">({course.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#A1A1AA]">
              <Users className="w-4 h-4 text-[#D3151D]" />
              <span>{course.studentsCount.toLocaleString()} Enrolled</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#A1A1AA]">
              <Clock className="w-4 h-4 text-[#D3151D]" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#A1A1AA]">
              <BookOpen className="w-4 h-4 text-[#D3151D]" />
              <span>{course.lessonsCount} Modules</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 sm:px-8 border-b border-[#1A1A24] bg-[#0A0A0E]">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`py-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'syllabus'
                ? 'border-[#D3151D] text-white font-bold'
                : 'border-transparent text-[#71717A] hover:text-[#D4D4D8]'
            }`}
          >
            Curriculum ({course.syllabus.length} Modules)
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'skills'
                ? 'border-[#D3151D] text-white font-bold'
                : 'border-transparent text-[#71717A] hover:text-[#D4D4D8]'
            }`}
          >
            Key Skills & Tools
          </button>
          <button
            onClick={() => setActiveTab('instructor')}
            className={`py-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'instructor'
                ? 'border-[#D3151D] text-white font-bold'
                : 'border-transparent text-[#71717A] hover:text-[#D4D4D8]'
            }`}
          >
            Instructor
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[420px] overflow-y-auto space-y-4">
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <p className="text-xs uppercase font-bold tracking-wider text-[#A1A1AA]">
                Step-by-Step Learning Path
              </p>
              {course.syllabus.map((mod, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-[#111116] border border-[#1E1E26]"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#D3151D]/20 text-[#D3151D] text-[11px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {mod.title}
                    </h4>
                    <span className="text-xs text-[#71717A]">{mod.lessons.length} lessons</span>
                  </div>
                  <ul className="space-y-2">
                    {mod.lessons.map((lesson, lIdx) => (
                      <li key={lIdx} className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                        <PlayCircle className="w-3.5 h-3.5 text-[#D3151D] flex-shrink-0" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#A1A1AA] mb-3">
                  Key Skills You Will Master
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.keySkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-[#111116] border border-[#1E1E26] text-xs font-medium text-[#E4E4E7]">
                      <CheckCircle2 className="w-4 h-4 text-[#D3151D] flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#A1A1AA] mb-3">
                  Technologies & AI Platforms Covered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.toolsCovered.map((tool, idx) => (
                    <span key={idx} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#14141C] text-[#FAFAFA] border border-[#242432]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111116] border border-[#1E1E26] flex items-start gap-3">
                <Award className="w-5 h-5 text-[#D3151D] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">Verified Certificate of Completion</h5>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Upon completing all modules and capstone projects, earn a verifiable ProBuilder credential to share on LinkedIn and your digital portfolio.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="p-4 rounded-xl bg-[#111116] border border-[#1E1E26] flex items-start gap-4">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name}
                className="w-16 h-16 rounded-xl object-cover border border-[#262634]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-base font-bold text-white">{course.instructor.name}</h4>
                <p className="text-xs text-[#D3151D] font-bold">{course.instructor.role}</p>
                <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                  Veteran educator and practitioner at ProBuilder, dedicated to demystifying modern artificial intelligence and equipping students worldwide with real-world, monetizable digital skills.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="p-5 sm:p-6 bg-[#0E0E12] border-t border-[#1E1E26] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-[#71717A]">
              {course.isFree ? 'Free Forever Access' : 'Full Lifetime Access & Updates'}
            </div>
            <div className="text-xl font-black text-white flex items-center gap-2">
              {course.isFree ? (
                <span className="text-white font-black">$0.00 FREE</span>
              ) : (
                <>
                  <span>{course.price}</span>
                  <span className="text-xs font-normal text-[#71717A] line-through">$249</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {enrolledSuccess ? (
              <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#D3151D]" />
                <span>Enrolled Successfully! Access Granted</span>
              </div>
            ) : (
              <button
                id="modal-enroll-now-btn"
                onClick={handleEnrollClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#D3151D] hover:bg-[#E50914] active:bg-[#B91C1C] text-white font-bold text-sm transition-all shadow-lg shadow-[#D3151D]/25"
              >
                <span>{course.isFree ? 'Start Free Learning Now' : 'Enroll in Masterclass'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
