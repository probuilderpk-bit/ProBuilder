import React, { useState, useMemo, useEffect } from 'react';
import { Course, NavPage } from '../types';
import { COURSES, COURSE_CATEGORIES } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { 
  Search, 
  Layers, 
  Star, 
  Clock, 
  BookOpen, 
  ArrowRight,
  Bot,
  CheckCircle2
} from 'lucide-react';

interface AllCoursesPageProps {
  initialCategoryFilter?: string;
  onSelectCourse: (course: Course) => void;
  onNavigate: (page: NavPage) => void;
  onOpenAIAdvisor: () => void;
}

export const AllCoursesPage: React.FC<AllCoursesPageProps> = ({
  initialCategoryFilter,
  onSelectCourse,
  onNavigate,
  onOpenAIAdvisor
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || 'All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<'All' | 'Free' | 'Paid'>('All');

  useEffect(() => {
    if (initialCategoryFilter) {
      setSelectedCategory(initialCategoryFilter);
    }
  }, [initialCategoryFilter]);

  const filteredCourses = useMemo(() => {
    return COURSES.filter((c) => {
      const matchesSearch = 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.keySkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        c.toolsCovered.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'All' || c.category.toLowerCase().includes(selectedCategory.toLowerCase());
      
      const matchesLevel = 
        selectedLevel === 'All' || c.level === selectedLevel;

      const matchesPrice = 
        priceFilter === 'All' ? true : priceFilter === 'Free' ? c.isFree : !c.isFree;

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedLevel, priceFilter]);

  // Featured Spotlight Course
  const spotlightCourse = COURSES.find((c) => c.id === 'ai-agents-development') || COURSES[0];

  return (
    <div className="w-full bg-[#060608] text-[#F4F4F5] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="relative pt-12 pb-16 bg-[#0B0B0F] border-b border-[#181820] overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D3151D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141C] text-white border border-[#242432] text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5 text-[#D3151D]" />
              <span>Full Curriculum Catalog</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Explore All Courses
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#A1A1AA] leading-relaxed">
              Step into the future of digital work. Whether you are automating workflows, building autonomous AI agents, coding modern websites, or monetizing freelance skills—find the exact masterclass you need.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-2xl bg-[#0B0B0F] border border-[#1E1E28] p-6 sm:p-8 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D3151D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-1 rounded bg-[#D3151D] text-white uppercase tracking-wider">
                  FLAGSHIP SPOTLIGHT
                </span>
                <span className="text-xs text-[#A1A1AA] font-semibold">
                  Most Popular for Engineers & Tech Leads
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {spotlightCourse.title}
              </h2>

              <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-2xl">
                {spotlightCourse.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#D4D4D8]">
                <div className="flex items-center gap-1 text-white font-bold">
                  <Star className="w-4 h-4 fill-[#D3151D] text-[#D3151D]" />
                  <span>{spotlightCourse.rating.toFixed(2)} Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#D3151D]" />
                  <span>{spotlightCourse.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-[#D3151D]" />
                  <span>{spotlightCourse.lessonsCount} Modules</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="spotlight-view-course-btn"
                  onClick={() => onSelectCourse(spotlightCourse)}
                  className="px-6 py-3 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white text-xs font-bold transition-all shadow-md shadow-[#D3151D]/20 flex items-center gap-2"
                >
                  <span>View Masterclass Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#08080C] border border-[#1C1C24] rounded-xl p-5 space-y-3">
              <h4 className="text-xs uppercase font-bold text-[#A1A1AA] tracking-wider">
                What You'll Master:
              </h4>
              <ul className="space-y-2">
                {spotlightCourse.keySkills.slice(0, 4).map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#E4E4E7]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D3151D] flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-[#181820] text-xs text-[#71717A] flex items-center justify-between">
                <span>Instructor: {spotlightCourse.instructor.name}</span>
                <span className="font-bold text-white">{spotlightCourse.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-[#0B0B0F] border border-[#1E1E26] rounded-2xl p-5 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3.5" />
              <input
                type="text"
                id="search-all-courses-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by keyword, topic, tool (e.g. Chatbot, Python, Make, Canva, Upwork)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
              />
            </div>

            {/* Level Select */}
            <div className="flex items-center gap-2">
              <select
                id="filter-all-level-select"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-xs font-semibold text-white focus:outline-none focus:border-[#D3151D]"
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              {/* Pricing Filter Toggle */}
              <div className="flex rounded-xl bg-[#111117] p-1 border border-[#22222D]">
                <button
                  onClick={() => setPriceFilter('All')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    priceFilter === 'All' ? 'bg-[#22222C] text-white' : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setPriceFilter('Free')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    priceFilter === 'Free' ? 'bg-white text-black font-bold' : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  Free
                </button>
                <button
                  onClick={() => setPriceFilter('Paid')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    priceFilter === 'Paid' ? 'bg-[#D3151D] text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  Paid
                </button>
              </div>

              <button
                onClick={onOpenAIAdvisor}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#14141C] hover:bg-[#1C1C28] text-white border border-[#242432] text-xs font-semibold transition-colors"
              >
                <Bot className="w-3.5 h-3.5 text-[#D3151D]" />
                <span>AI Advisor</span>
              </button>
            </div>
          </div>

          {/* Category Pills List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            <span className="text-xs font-bold text-[#71717A] uppercase mr-1 flex-shrink-0">
              Track:
            </span>
            {COURSE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
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

        {/* Results Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#A1A1AA]">
            Showing <strong className="text-white">{filteredCourses.length}</strong> of {COURSES.length} courses
          </p>
          {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All' || priceFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
                setPriceFilter('All');
              }}
              className="text-xs text-[#D3151D] hover:underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
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
            <h3 className="text-lg font-bold text-white">No courses match your filter</h3>
            <p className="text-xs text-[#A1A1AA]">
              We couldn't find any courses matching your current search or category selections.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
                setPriceFilter('All');
              }}
              className="px-4 py-2 rounded-lg bg-[#D3151D] text-white text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
