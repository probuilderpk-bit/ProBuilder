import React from 'react';
import { NavPage } from '../types';
import { ProBuilderLogo } from '../components/ProBuilderLogo';
import { 
  GraduationCap, 
  Globe, 
  Cpu, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenAIAdvisor: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenAIAdvisor }) => {
  return (
    <div className="w-full bg-[#060608] text-[#F4F4F5] min-h-screen pb-24">
      {/* Header with Official Logo Showcase */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 bg-[#0B0B0F] border-b border-[#181820] overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D3151D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-5">
          {/* Centered Horizontal Rectangular Logo Badge */}
          <div className="flex justify-center">
            <ProBuilderLogo size="lg" className="hover:scale-105 transition-transform" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111116] text-white border border-[#22222B] text-xs font-extrabold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#D3151D] animate-pulse" />
            <span>Our Identity & Mission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Why ProBuilder?
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
            A career-oriented educational technology platform engineering practical mastery in artificial intelligence, software automation, and high-income digital capabilities.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Core Mission Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0B0B0F] border border-[#1E1E26] relative overflow-hidden mb-16">
          <div className="max-w-3xl space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Empowering Anyone to Build the Future with AI
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              ProBuilder was created to address a critical disconnect in technology education. While generative AI is transforming every industry, traditional education remains slow, theoretical, and detached from market reality.
            </p>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              We teach modern builders how to combine AI intelligence with practical execution: building autonomous agents, engineering robust chatbots, automating complex workflows, creating high-converting media, and turning these abilities into profitable careers.
            </p>
          </div>
        </div>

        {/* 3 Pillars corresponding strictly to the tagline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <div className="p-7 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] space-y-3 hover:border-[#D3151D]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#D3151D]/15 text-[#D3151D] border border-[#D3151D]/30 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">DEVELOPMENT</h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              We don't just teach conceptual AI; we write code, wire up webhooks, build agent loops, and ship live software that users and clients can rely on.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] space-y-3 hover:border-white/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">TEACHING</h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Our instructors are active practitioners. We distill complex architectures into clear, modular lessons that respect your time and accelerate your skill curve.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0B0B0F] border border-[#1E1E26] space-y-3 hover:border-[#D3151D]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#D3151D]/15 text-[#D3151D] border border-[#D3151D]/30 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">GLOBAL REACH</h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Education should have no borders. We offer free foundation tracks and affordable masterclasses accessible to learners from 65+ nations.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 border-t border-[#181820] space-y-4">
          <h3 className="text-2xl font-bold text-white">Start Building With Us Today</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('free-courses')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#D3151D] hover:bg-[#E50914] text-white font-bold text-sm shadow-md shadow-[#D3151D]/25"
            >
              Start Free Courses
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#111116] hover:bg-[#1A1A22] text-white border border-[#22222D] font-semibold text-sm"
            >
              Explore All Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
