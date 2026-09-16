import React from 'react';
import { NavPage } from '../types';
import { ProBuilderLogo } from './ProBuilderLogo';
import { 
  Mail, 
  Globe, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Github, 
  Twitter, 
  Linkedin, 
  Youtube,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavPage, categoryFilter?: string) => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLogin }) => {
  return (
    <footer className="w-full bg-[#070709] border-t border-[#1C1C22] text-[#A1A1AA] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#18181F]">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <ProBuilderLogo size="lg" onClick={() => onNavigate('home')} />
            
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm mt-3">
              ProBuilder is an AI-focused digital learning and technology platform teaching practical, career-oriented skills. We empower individuals and teams worldwide to build, create, automate, and grow with artificial intelligence.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141419] border border-[#22222B] text-xs text-[#E4E4E7]">
                <span className="w-2 h-2 rounded-full bg-[#D3151D] animate-pulse" />
                <span>Global Students Active in 65+ Countries</span>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-[#141419] hover:bg-[#1E1E26] hover:text-white border border-[#22222B] flex items-center justify-center transition-colors text-[#A1A1AA]"
                aria-label="ProBuilder on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-[#141419] hover:bg-[#1E1E26] hover:text-white border border-[#22222B] flex items-center justify-center transition-colors text-[#A1A1AA]"
                aria-label="ProBuilder on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-[#141419] hover:bg-[#1E1E26] hover:text-white border border-[#22222B] flex items-center justify-center transition-colors text-[#A1A1AA]"
                aria-label="ProBuilder on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-[#141419] hover:bg-[#1E1E26] hover:text-white border border-[#22222B] flex items-center justify-center transition-colors text-[#A1A1AA]"
                aria-label="ProBuilder on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('free-courses')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-white font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                  <span>Free Courses</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('courses')} 
                  className="hover:text-white transition-colors"
                >
                  All Courses Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-white transition-colors"
                >
                  Why ProBuilder
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-white transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenLogin} 
                  className="hover:text-white transition-colors"
                >
                  Student Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Learning Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Learning Tracks
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('courses', 'AI Agents')} 
                  className="hover:text-white transition-colors text-left"
                >
                  AI Agents Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('courses', 'AI Chatbots')} 
                  className="hover:text-white transition-colors text-left"
                >
                  AI Chatbot Engineering
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('courses', 'AI Automation')} 
                  className="hover:text-white transition-colors text-left"
                >
                  AI Workflow Automation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('courses', 'Website Development')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Website Dev with AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('courses', 'AI Video Generation')} 
                  className="hover:text-white transition-colors text-left"
                >
                  AI Video & Media Creation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('courses', 'Digital Business & Freelancing')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Freelancing with AI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Reach Out */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Official Reach Out
            </h4>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Have questions regarding our enterprise training or student support?
            </p>
            <div className="pt-1">
              <a 
                href="mailto:probuilder.pk@gmail.com" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#15151A] hover:bg-[#1E1E24] px-3 py-2 rounded-lg border border-[#272733] hover:border-[#E50914]/50 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#E50914]" />
                <span className="truncate">probuilder.pk@gmail.com</span>
              </a>
            </div>
            <div className="pt-2 text-[11px] text-[#71717A] space-y-1">
              <p>Tagline:</p>
              <p className="text-[#D4D4D8] font-bold tracking-wider text-[10px]">
                DEVELOPMENT • TEACHING • GLOBAL REACH
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© 2026 ProBuilder. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
