import React, { useState, useMemo } from 'react';
import { Course, NavPage } from '../types';
import { COURSES } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { 
  Search, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  BookOpen,
  ArrowRight,
  Bot
} from 'lucide-react';

interface FreeCoursesPageProps {
  onSelectCourse: (course) => void;
  onNavigate: (page: NavPage) => void;
  onOpenAIAdvisor: () => void;
}

export const FreeCoursesPage: React.FC<FreeCoursesPageProps> = ({
  onSelectCourse,
  onNavigate,
  onOpenAIAdvisor
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const freeCourses = useMemo(() => {
    return COURSES.filter((c) => {
      if (!c.isFree) return false;
      const matchesSearch = 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.keySkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'All' || c.category.toLowerCase().includes(selectedCategory.toLowerCase());
      
      const matchesLevel = 
        selectedLevel === 'All' || c.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  return (
    <div className="w-full bg-[#060608] text-[#F4F4F5] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="relative pt-12 pb-16 bg-[#0B0B0F] border-b border-[#181820] overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D3151D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D3151D]" />
              <span>100% Free Starter Academy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Free AI & Digital Skills Courses
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#A1A1AA] leading-relaxed mb-6">
              Kickstart your AI education with zero upfront cost. Master Prompt Engineering, modern AI tools, content generation, and website development with our free foundational tracks.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#D4D4D8]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D3151D]" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D3151D]" />
                <span>Full Access to Hands-on Exercises</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D3151D]" />
                <span>Verified Certificate on Completion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Search & Filters Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-[#0B0B0F] border border-[#1E1E26] rounded-2xl p-4 sm:p-6 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5" />
              <input
                type="text"
                id="search-free-courses-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search free courses by title, tool, or skill (e.g., Prompt, ChatGPT, Web)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
              />
            </div>

            {/* Level Filter Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#71717A]" />
              <select
                id="filter-level-select"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-xs font-semibold text-white focus:outline-none focus:border-[#D3151D]"
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
              </select>

              <button
                onClick={onOpenAIAdvisor}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#161620] hover:bg-[#1E1E2C] text-white border border-[#262634] text-xs font-semibold transition-colors"
                title="Ask AI to match courses"
              >
                <Bot className="w-3.5 h-3.5 text-[#D3151D]" />
                <span>AI Advisor</span>
              </button>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            <span className="text-xs font-bold text-[#71717A] uppercase mr-1 flex-shrink-0">
              Categories:
            </span>
            {['All', 'Artificial Intelligence', 'Productivity Tools', 'AI Content Creation', 'Website Development'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#D3151D] text-white font-bold'
                    : 'bg-[#121218] hover:bg-[#1A1A22] text-[#A1A1AA] hover:text-white border border-[#20202A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#A1A1AA]">
            Showing <strong className="text-white">{freeCourses.length}</strong> free courses
          </p>
          {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="text-xs text-[#D3151D] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Course Grid */}
        {freeCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelectCourse={onSelectCourse}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#0B0B0F] rounded-2xl border border-[#1E1E26] p-8 max-w-md mx-auto space-y-4">
            <BookOpen className="w-10 h-10 text-[#71717A] mx-auto" />
            <h3 className="text-lg font-bold text-white">No courses match your criteria</h3>
            <p className="text-xs text-[#A1A1AA]">
              Try adjusting your search terms or clearing the selected category filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="px-4 py-2 rounded-lg bg-[#D3151D] text-white text-xs font-bold"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Next Step Banner: Upgrade to Masterclasses */}
        <div className="mt-20 p-8 sm:p-10 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D3151D]">
              Advanced Mastery
            </span>
            <h3 className="text-2xl font-black text-white">
              Ready to Advance Beyond Fundamentals?
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Explore our full flagship masterclasses in autonomous AI Agents, custom RAG Chatbots, zero-code Automation, and Freelancing businesses.
            </p>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="px-6 py-3.5 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white font-bold text-sm transition-all shadow-md shadow-[#D3151D]/20 flex items-center gap-2 whitespace-nowrap"
          >
            <span>Explore All Masterclasses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
