import React from 'react';
import { Course } from '../types';
import { 
  Clock, 
  BookOpen, 
  Star, 
  ArrowRight, 
  Bot, 
  Workflow, 
  Globe, 
  Video, 
  Palette, 
  Briefcase,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectCourse
}) => {
  // Category-specific iconography and black-red-white styled badge
  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'AI Agents':
        return { icon: <Bot className="w-5 h-5 text-[#D3151D]" />, tag: 'AI Agents' };
      case 'AI Chatbots':
        return { icon: <Sparkles className="w-5 h-5 text-[#EF4444]" />, tag: 'AI Chatbots' };
      case 'AI Automation':
        return { icon: <Workflow className="w-5 h-5 text-[#D3151D]" />, tag: 'Automation' };
      case 'Website Development':
        return { icon: <Globe className="w-5 h-5 text-white" />, tag: 'Web Dev' };
      case 'AI Video Generation':
        return { icon: <Video className="w-5 h-5 text-[#D3151D]" />, tag: 'AI Video' };
      case 'Graphic Design & Canva':
        return { icon: <Palette className="w-5 h-5 text-[#EF4444]" />, tag: 'Design' };
      case 'Digital Business & Freelancing':
        return { icon: <Briefcase className="w-5 h-5 text-white" />, tag: 'Freelance' };
      default:
        return { icon: <Layers className="w-5 h-5 text-[#D4D4D8]" />, tag: cat };
    }
  };

  const meta = getCategoryMeta(course.category);

  return (
    <div
      id={`course-card-${course.id}`}
      onClick={() => onSelectCourse(course)}
      className="group relative flex flex-col justify-between bg-[#0C0C10] hover:bg-[#111116] rounded-2xl border border-[#202026] hover:border-[#D3151D]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D3151D]/10 overflow-hidden cursor-pointer"
    >
      {/* Top Banner / Visual Header */}
      <div className="relative h-44 w-full bg-[#070709] border-b border-[#1A1A22] overflow-hidden p-5 flex flex-col justify-between">
        {/* Abstract Tech Grid & Ambient Crimson Glow */}
        <div className="absolute inset-0 bg-tech-grid opacity-25 group-hover:opacity-40 transition-opacity" />
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#D3151D]/10 rounded-full blur-2xl group-hover:bg-[#D3151D]/20 transition-all" />

        {/* Top Header Row: Category Badge & Pricing */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#262630] bg-[#121217] text-white tracking-wide uppercase">
            {meta.tag}
          </span>

          <div className="flex items-center gap-1.5">
            {course.isFree ? (
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-white text-black tracking-wide shadow-sm">
                100% FREE
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#D3151D]/20 text-[#EF4444] border border-[#D3151D]/40">
                {course.price}
              </span>
            )}
          </div>
        </div>

        {/* Category Emblem, Level, Duration & Lessons */}
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#14141A] border border-[#262630] group-hover:border-[#D3151D]/50 transition-colors shadow-inner">
              {meta.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#A1A1AA]">
                <span>Level:</span>
                <span className="text-white font-bold">{course.level}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#71717A] mt-0.5">
                <Clock className="w-3 h-3 text-[#A1A1AA]" />
                <span>{course.duration}</span>
                <span>•</span>
                <BookOpen className="w-3 h-3 text-[#A1A1AA]" />
                <span>{course.lessonsCount} lessons</span>
              </div>
            </div>
          </div>

          {/* Star Rating Badge */}
          <div className="flex items-center gap-1 text-xs font-bold bg-[#14141A] border border-[#262630] px-2 py-1 rounded-md text-white">
            <Star className="w-3.5 h-3.5 fill-[#D3151D] text-[#D3151D]" />
            <span>{course.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors leading-snug mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#A1A1AA] line-clamp-2 leading-relaxed mb-4">
            {course.description}
          </p>

          {/* Key Skills Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {course.keySkills.slice(0, 3).map((skill, idx) => (
              <span 
                key={idx} 
                className="text-[11px] px-2 py-0.5 rounded-md bg-[#14141A] text-[#D4D4D8] border border-[#22222A]"
              >
                {skill}
              </span>
            ))}
            {course.keySkills.length > 3 && (
              <span className="text-[11px] px-1.5 py-0.5 text-[#71717A]">
                +{course.keySkills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Instructor & CTA Button */}
        <div className="pt-4 border-t border-[#1A1A22] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img 
              src={course.instructor.avatar} 
              alt={course.instructor.name}
              className="w-7 h-7 rounded-full object-cover border border-[#282832]"
              referrerPolicy="no-referrer"
            />
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">
                {course.instructor.name}
              </p>
              <p className="text-[10px] text-[#71717A] truncate">
                {course.studentsCount.toLocaleString()} learners
              </p>
            </div>
          </div>

          <button
            id={`view-course-btn-${course.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectCourse(course);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
              course.isFree
                ? 'bg-white hover:bg-zinc-200 text-black shadow-sm'
                : 'bg-[#D3151D] hover:bg-[#E50914] text-white shadow-sm shadow-[#D3151D]/25'
            }`}
          >
            <span>{course.isFree ? 'Start Free' : 'View Course'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
