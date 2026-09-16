import React, { useState } from 'react';
import { NavPage, Course } from '../types';
import { COURSES } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { ProBuilderLogo } from '../components/ProBuilderLogo';
import { 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Workflow, 
  Globe, 
  Video, 
  Palette, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  Cpu,
  Layers,
  Code2,
  Terminal,
  Play,
  Star,
  Users,
  Compass,
  Check
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: NavPage, categoryFilter?: string) => void;
  onSelectCourse: (course: Course) => void;
  onOpenAIAdvisor: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCourse,
  onOpenAIAdvisor
}) => {
  // Course filter state on homepage
  const [courseFilter, setCourseFilter] = useState<'all' | 'free' | 'agents' | 'automation'>('all');
  // Terminal preview interactive tab
  const [activeTab, setActiveTab] = useState<'agents' | 'chatbots' | 'automation'>('agents');

  // Filtered courses for display
  const displayedCourses = COURSES.filter((c) => {
    if (courseFilter === 'free') return c.isFree;
    if (courseFilter === 'agents') return c.category === 'AI Agents';
    if (courseFilter === 'automation') return c.category === 'AI Automation';
    return c.featured || c.isFree;
  }).slice(0, 6);

  const categories = [
    { name: 'AI Agents Development', filter: 'AI Agents', icon: <Bot className="w-5 h-5 text-[#D3151D]" />, desc: 'Autonomous swarms, LangGraph & tool calling' },
    { name: 'AI Chatbot Engineering', filter: 'AI Chatbots', icon: <Sparkles className="w-5 h-5 text-[#EF4444]" />, desc: 'Conversational RAG, vector DBs & streaming UI' },
    { name: 'AI Workflow Automation', filter: 'AI Automation', icon: <Workflow className="w-5 h-5 text-[#D3151D]" />, desc: 'End-to-end automations with Make, n8n & APIs' },
    { name: 'Website Dev with AI', filter: 'Website Development', icon: <Globe className="w-5 h-5 text-white" />, desc: 'Modern high-performance web apps built with AI' },
    { name: 'AI Video & Media Creation', filter: 'AI Video Generation', icon: <Video className="w-5 h-5 text-[#D3151D]" />, desc: 'Cinematic AI video, avatars & commercial production' },
    { name: 'Graphic Design & Canva', filter: 'Graphic Design & Canva', icon: <Palette className="w-5 h-5 text-[#EF4444]" />, desc: 'Canva Magic Studio, brand kits & high-ticket assets' },
    { name: 'Freelancing & Digital Business', filter: 'Digital Business & Freelancing', icon: <Briefcase className="w-5 h-5 text-white" />, desc: 'Monetize AI skills, win clients & scale retainers' },
    { name: 'Productivity & AI Tools', filter: 'Productivity Tools', icon: <Zap className="w-5 h-5 text-[#D3151D]" />, desc: 'Second brain systems, automated workflows & research' },
  ];

  return (
    <div className="w-full bg-[#060608] text-[#F4F4F5]">
      {/* 1. HERO SECTION - Tailored for Mobile, Tablet, & Desktop */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-[#181820]">
        {/* Abstract Tech Grid & Ambient Red Glow */}
        <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-radial-red-glow pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-[#D3151D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Official ProBuilder Brand Logo - Prominent & Exact */}
              <div className="inline-block transition-transform duration-300 hover:scale-[1.01]">
                <ProBuilderLogo 
                  size="xl" 
                  showTagline={true}
                  className="shadow-2xl shadow-black/90" 
                />
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Build Your Future with <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#D3151D]">
                  AI & Digital Skills.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base md:text-lg text-[#A1A1AA] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Learn practical AI, master autonomous agents, and turn modern digital tools into high-income career opportunities with ProBuilder.
              </p>

              {/* Action Buttons: Responsive Stack on Mobile, Row on Desktop */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
                <button
                  id="hero-free-courses-cta"
                  onClick={() => onNavigate('free-courses')}
                  className="px-7 py-4 rounded-xl bg-[#D3151D] hover:bg-[#E50914] active:bg-[#B91C1C] text-white font-bold text-base transition-all shadow-xl shadow-[#D3151D]/25 flex items-center justify-center gap-2.5 group"
                >
                  <span>Explore Free Courses</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-all-courses-cta"
                  onClick={() => onNavigate('courses')}
                  className="px-6 py-4 rounded-xl bg-[#111116] hover:bg-[#181822] text-white font-semibold text-base border border-[#262632] hover:border-[#383848] transition-all flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4 text-[#A1A1AA]" />
                  <span>View All Courses</span>
                </button>

                <button
                  id="hero-advisor-cta"
                  onClick={onOpenAIAdvisor}
                  className="px-5 py-4 rounded-xl bg-[#14141C] hover:bg-[#1C1C28] text-white font-semibold text-sm border border-[#272736] hover:border-[#D3151D]/60 transition-all flex items-center justify-center gap-2"
                >
                  <Bot className="w-4 h-4 text-[#D3151D]" />
                  <span>AI Advisor</span>
                </button>
              </div>

              {/* Social Proof Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#A1A1AA]">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#060608]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student" referrerPolicy="no-referrer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#060608]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student" referrerPolicy="no-referrer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#060608]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Student" referrerPolicy="no-referrer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#060608]" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Student" referrerPolicy="no-referrer" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-[#D3151D]">
                    <Star className="w-3.5 h-3.5 fill-[#D3151D]" />
                    <Star className="w-3.5 h-3.5 fill-[#D3151D]" />
                    <Star className="w-3.5 h-3.5 fill-[#D3151D]" />
                    <Star className="w-3.5 h-3.5 fill-[#D3151D]" />
                    <Star className="w-3.5 h-3.5 fill-[#D3151D]" />
                    <span className="text-white font-bold ml-1">4.9 / 5.0</span>
                  </div>
                  <p className="text-[11px] text-[#71717A] mt-0.5">
                    Trusted by 45,000+ engineers, creators, and freelancers worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive AI Studio Terminal Preview (Desktop & Tablet) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-[#0C0C10] border border-[#22222C] shadow-2xl shadow-black/80 overflow-hidden">
                {/* Terminal Header */}
                <div className="px-4 py-3 bg-[#111116] border-b border-[#1E1E28] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#D3151D]" />
                    <span className="w-3 h-3 rounded-full bg-[#2A2A35]" />
                    <span className="w-3 h-3 rounded-full bg-[#2A2A35]" />
                    <span className="text-xs font-mono font-semibold text-[#A1A1AA] ml-2">
                      probuilder-ai-runtime
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A1A24] text-white border border-[#2B2B3A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D3151D] animate-ping" />
                    <span>SYSTEM LIVE</span>
                  </div>
                </div>

                {/* Interactive Mode Switcher Tabs */}
                <div className="flex border-b border-[#1A1A24] bg-[#0A0A0E] text-xs font-mono">
                  <button
                    onClick={() => setActiveTab('agents')}
                    className={`flex-1 py-2.5 px-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
                      activeTab === 'agents'
                        ? 'bg-[#121218] text-white border-b-2 border-[#D3151D] font-bold'
                        : 'text-[#71717A] hover:text-white'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5 text-[#D3151D]" />
                    <span>AI Agents</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('chatbots')}
                    className={`flex-1 py-2.5 px-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
                      activeTab === 'chatbots'
                        ? 'bg-[#121218] text-white border-b-2 border-[#D3151D] font-bold'
                        : 'text-[#71717A] hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D3151D]" />
                    <span>Chatbots RAG</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('automation')}
                    className={`flex-1 py-2.5 px-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
                      activeTab === 'automation'
                        ? 'bg-[#121218] text-white border-b-2 border-[#D3151D] font-bold'
                        : 'text-[#71717A] hover:text-white'
                    }`}
                  >
                    <Workflow className="w-3.5 h-3.5 text-[#D3151D]" />
                    <span>Automation</span>
                  </button>
                </div>

                {/* Terminal Content Body */}
                <div className="p-4 sm:p-5 font-mono text-xs text-[#D4D4D8] space-y-3 bg-[#08080C] min-h-[260px]">
                  {activeTab === 'agents' && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center gap-2 text-[#71717A]">
                        <span>$</span>
                        <span className="text-white">run probuilder --module=autonomous-swarm</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#111117] border border-[#1F1F2A] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#A1A1AA]">Agent 01: Planner (LangGraph)</span>
                          <span className="text-[#D3151D] font-bold">READY</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#A1A1AA]">Agent 02: Tool Calling & Search</span>
                          <span className="text-white font-bold">EXECUTING</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#A1A1AA]">Agent 03: Evaluator & Validator</span>
                          <span className="text-white font-bold">STANDBY</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#A1A1AA] pt-1">
                        &gt; Multi-agent memory synchronized across vector store. 0 bugs detected.
                      </p>
                    </div>
                  )}

                  {activeTab === 'chatbots' && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center gap-2 text-[#71717A]">
                        <span>$</span>
                        <span className="text-white">curl -X POST /api/chat/streaming-rag</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#111117] border border-[#1F1F2A] space-y-1.5">
                        <p className="text-[11px] text-[#A1A1AA]">
                          [Vector DB]: Retrieved 4 chunk contexts with cosine similarity 0.94
                        </p>
                        <p className="text-[11px] text-white">
                          [Token Stream]: "ProBuilder framework enables instant zero-latency AI deployment..."
                        </p>
                      </div>
                      <p className="text-[11px] text-[#D3151D] font-semibold">
                        Latency: 42ms • Context Window: 1M Tokens • Model: Gemini 2.5 Flash
                      </p>
                    </div>
                  )}

                  {activeTab === 'automation' && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center gap-2 text-[#71717A]">
                        <span>$</span>
                        <span className="text-white">trigger-workflow --sync=stripe_to_crm</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#111117] border border-[#1F1F2A] space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px]">
                          <Check className="w-3.5 h-3.5 text-[#D3151D]" />
                          <span>Webhook received from payment gateway</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <Check className="w-3.5 h-3.5 text-[#D3151D]" />
                          <span>Generated AI invoice & customer onboarding flow</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <Check className="w-3.5 h-3.5 text-[#D3151D]" />
                          <span>Slack alert dispatched to founder channel</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-emerald-400">
                        Workflow executed in 0.8s without writing complex backend boilerplate.
                      </p>
                    </div>
                  )}
                </div>

                {/* Terminal Footer CTA */}
                <div className="p-3 bg-[#111116] border-t border-[#1C1C26] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#A1A1AA]">
                    Ready to build production systems?
                  </span>
                  <button
                    onClick={() => onNavigate('courses', 'AI Agents')}
                    className="text-xs font-bold text-[#D3151D] hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>View Track</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. IMPACT COUNTERS - Desktop 4-Col, Tablet/Mobile 2x2 Grid */}
      <section className="py-10 bg-[#08080C] border-b border-[#181820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="p-4 rounded-xl bg-[#0F0F14] border border-[#1E1E26]">
              <div className="text-2xl sm:text-4xl font-black text-white">45,000+</div>
              <div className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mt-1">Learners Enrolled</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0F0F14] border border-[#1E1E26]">
              <div className="text-2xl sm:text-4xl font-black text-[#D3151D]">100%</div>
              <div className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mt-1">Hands-On Projects</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0F0F14] border border-[#1E1E26]">
              <div className="text-2xl sm:text-4xl font-black text-white">65+</div>
              <div className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mt-1">Countries Reached</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0F0F14] border border-[#1E1E26]">
              <div className="text-2xl sm:text-4xl font-black text-white">4.9 / 5.0</div>
              <div className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mt-1">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TARGETED LEARNING TRACKS (Bento Matrix) */}
      <section className="py-16 sm:py-20 bg-[#060608] border-b border-[#181820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D3151D]">
                Specialized Curriculums
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                Explore ProBuilder Specializations
              </h2>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D3151D] hover:text-white transition-colors"
            >
              <span>View all 8 specialized tracks</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('courses', cat.filter)}
                className="group p-5 rounded-2xl bg-[#0B0B0F] hover:bg-[#111117] border border-[#1E1E26] hover:border-[#D3151D]/60 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[#D3151D]/5 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-[#14141B] border border-[#242430] w-fit mb-4 group-hover:border-[#D3151D]/50 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-white transition-colors mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#D3151D] group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                  Explore Track <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CURATED COURSES SHOWCASE (With Filter Tabs) */}
      <section className="py-16 sm:py-20 bg-[#0A0A0E] border-b border-[#181820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D3151D]">
                Interactive Course Catalog
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                Featured Masterclasses & Free Courses
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-xl">
                Choose between completely free starter tracks or advanced career masterclasses with live capstones.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCourseFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  courseFilter === 'all'
                    ? 'bg-[#D3151D] text-white shadow-md shadow-[#D3151D]/20'
                    : 'bg-[#121218] text-[#A1A1AA] hover:text-white border border-[#202028]'
                }`}
              >
                All Featured
              </button>
              <button
                onClick={() => setCourseFilter('free')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  courseFilter === 'free'
                    ? 'bg-white text-black shadow-md'
                    : 'bg-[#121218] text-[#A1A1AA] hover:text-white border border-[#202028]'
                }`}
              >
                100% Free
              </button>
              <button
                onClick={() => setCourseFilter('agents')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  courseFilter === 'agents'
                    ? 'bg-[#D3151D] text-white shadow-md'
                    : 'bg-[#121218] text-[#A1A1AA] hover:text-white border border-[#202028]'
                }`}
              >
                AI Agents
              </button>
              <button
                onClick={() => setCourseFilter('automation')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  courseFilter === 'automation'
                    ? 'bg-[#D3151D] text-white shadow-md'
                    : 'bg-[#121218] text-[#A1A1AA] hover:text-white border border-[#202028]'
                }`}
              >
                Automation
              </button>
            </div>
          </div>

          {/* Courses Grid: Mobile 1-Col, Tablet 2-Col, Desktop 3-Col */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelectCourse={onSelectCourse}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('courses')}
              className="px-8 py-3.5 rounded-xl bg-[#14141B] hover:bg-[#1E1E26] text-white border border-[#262634] text-sm font-bold transition-all inline-flex items-center gap-2"
            >
              <span>Explore All {COURSES.length} Courses in Catalog</span>
              <ArrowRight className="w-4 h-4 text-[#D3151D]" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY PROBUILDER? (Startup Philosophy & Distinction) */}
      <section className="py-16 sm:py-20 bg-[#060608] border-b border-[#181820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D3151D]">
              Engineered for Immediate Career Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Why Learn with ProBuilder?
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-2 leading-relaxed">
              We reject shallow tutorials and outdated university theory. ProBuilder provides direct, battle-tested workflows used by modern builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-7 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] space-y-4 hover:border-[#D3151D]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#D3151D]/15 border border-[#D3151D]/30 flex items-center justify-center text-[#D3151D]">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">1. Real Deployable Code & Artifacts</h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                You never just sit and watch slides. In every lesson, you build real software: an autonomous multi-agent swarm, an automated lead engine, or a full-stack web app.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] space-y-4 hover:border-white/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">2. High-Ticket Freelance & Agency Skills</h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                Learn how businesses actually pay for AI implementations. We teach service packaging, client acquisition, contract pricing, and scalable deliverables.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] space-y-4 hover:border-[#D3151D]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#D3151D]/15 border border-[#D3151D]/30 flex items-center justify-center text-[#D3151D]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">3. Continuous Lifetime Curriculum Updates</h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                When new foundation models or tools launch (Gemini 2.5, Claude 3.7, LangGraph 2.0), our course materials are updated immediately. No recurring subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW LEARNING WORKS (The ProBuilder 4-Step Progression) */}
      <section className="py-16 sm:py-20 bg-[#08080C] border-b border-[#181820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D3151D]">
              The ProBuilder Progression
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
              How Learning Works
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-2">
              A systematic 4-step framework engineered to take you from foundational understanding to autonomous digital builder.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] relative">
              <div className="w-9 h-9 rounded-full bg-[#D3151D] text-white flex items-center justify-center font-black text-sm mb-4 shadow-md shadow-[#D3151D]/30">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2">Select Your Track</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Choose a specialized track aligned with your goals: AI Agents, Automation, Coding, Media, or Digital Business.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] relative">
              <div className="w-9 h-9 rounded-full bg-[#181820] text-white border border-[#2C2C38] flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2">Build Real Projects</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Follow hands-on walkthroughs to construct working code, custom APIs, automated workflows, and commercial designs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] relative">
              <div className="w-9 h-9 rounded-full bg-[#181820] text-white border border-[#2C2C38] flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2">Master Modern Tools</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Gain hands-on fluency with industry standards: Gemini, Claude, LangGraph, Make, ElevenLabs, Runway, and Canva.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] relative">
              <div className="w-9 h-9 rounded-full bg-white text-black font-black text-sm mb-4 flex items-center justify-center shadow-md">
                4
              </div>
              <h3 className="text-base font-bold text-white mb-2">Launch & Monetize</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Package your assets, deploy to cloud infrastructure, win freelance clients, or launch your own digital company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL-TO-ACTION - Centering Official ProBuilder Logo */}
      <section className="py-20 sm:py-24 bg-[#050507] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-red-glow opacity-70 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Centered Official Logo in Horizontal Rectangular Format */}
          <div className="flex justify-center mb-4">
            <ProBuilderLogo size="lg" className="hover:scale-105 transition-transform" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Build Your AI Advantage?
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals, developers, and creators mastering practical AI skills. Start with our free starter courses today.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('free-courses')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white font-bold text-base transition-all shadow-xl shadow-[#D3151D]/30 flex items-center justify-center gap-2"
            >
              <span>Explore Free Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#111116] hover:bg-[#181820] text-white font-semibold text-base border border-[#24242E] transition-all"
            >
              <span>Have Questions? Contact Us</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
