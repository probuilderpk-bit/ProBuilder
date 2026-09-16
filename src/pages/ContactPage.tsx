import React, { useState } from 'react';
import { ContactFormData, NavPage } from '../types';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Bot 
} from 'lucide-react';
import { ProBuilderLogo } from '../components/ProBuilderLogo';

interface ContactPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenAIAdvisor: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenAIAdvisor
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    category: 'Course Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending form
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const faqs = [
    {
      question: "Are the free courses truly 100% free?",
      answer: "Yes, our starter courses (Introduction to AI, Prompt Engineering Basics, AI Tools for Beginners, etc.) are 100% free with no credit card required. You get full access to all lessons, quizzes, and a completion certificate."
    },
    {
      question: "Do I need coding experience to learn at ProBuilder?",
      answer: "No! We offer distinct tracks: zero-code AI tools, automation (Make, n8n), content & design tracks (Canva), and beginner-friendly prompt engineering. For students who want to build custom agents or full-stack software, our technical tracks teach you step-by-step from the ground up."
    },
    {
      question: "How do I receive my verified completion certificate?",
      answer: "Upon finishing all modules and the hands-on capstone project in any course, a verifiable ProBuilder digital credential is automatically generated. You can link it to LinkedIn, your resume, or client proposals."
    },
    {
      question: "Can I get enterprise or team training for my company?",
      answer: "Yes. We provide tailored AI upskilling bootcamps for design agencies, software teams, and corporate organizations. Use this contact form or reach out directly to probuilder.pk@gmail.com with your team size and requirements."
    },
    {
      question: "What is your refund policy on premium masterclasses?",
      answer: "All paid ProBuilder masterclasses come with a 14-day, 100% money-back guarantee. If you complete the first two modules and feel it isn't the best practical AI training you have taken, we will issue a full refund immediately."
    }
  ];

  return (
    <div className="w-full bg-[#060608] text-[#F4F4F5] min-h-screen pb-24">
      {/* Header */}
      <section className="relative pt-12 pb-16 bg-[#0B0B0F] border-b border-[#181820] overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D3151D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111117] text-white border border-[#22222D] text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-[#D3151D]" />
            <span>Direct Reach Out</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Let's Connect
          </h1>

          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            Have a question, course suggestion, or collaboration idea? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-[#0B0B0F] border border-[#1E1E26] rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2">
              Send us a Message
            </h2>
            <p className="text-xs text-[#A1A1AA] mb-6">
              Fill out the form below and a ProBuilder curriculum specialist will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#D3151D]/15 text-[#D3151D] border border-[#D3151D]/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received!</h3>
                <p className="text-sm text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong className="text-white">{formData.name}</strong>. Our team has received your message regarding <strong className="text-white">"{formData.subject || formData.category}"</strong> and will get back to you at <strong className="text-white">{formData.email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        category: 'Course Inquiry',
                        message: ''
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#171720] hover:bg-[#20202C] text-white text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                      Your Name <span className="text-[#D3151D]">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name-input"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                      Email Address <span className="text-[#D3151D]">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email-input"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-category-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-xs font-semibold text-white focus:outline-none focus:border-[#D3151D]"
                    >
                      <option value="Course Inquiry">Course & Curriculum Inquiry</option>
                      <option value="Enterprise Training">Enterprise / Team Training</option>
                      <option value="Partnership & Teaching">Partnership or Teaching Idea</option>
                      <option value="Technical Support">Student / Technical Support</option>
                      <option value="General Feedback">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="contact-subject-input"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Question about AI Agents Masterclass"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                    Your Message <span className="text-[#D3151D]">*</span>
                  </label>
                  <textarea
                    id="contact-message-textarea"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you would like to know, courses you want to see, or how we can help..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111117] border border-[#22222D] text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
                  />
                </div>

                <button
                  type="submit"
                  id="submit-contact-btn"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D3151D] hover:bg-[#E50914] active:bg-[#B91C1C] text-white text-sm font-bold transition-all shadow-md shadow-[#D3151D]/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Official Contact Info & Brand Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B0B0F] border border-[#1E1E26] rounded-2xl p-6 sm:p-7 space-y-6">
              <div>
                <ProBuilderLogo size="sm" />
                <h3 className="text-base font-bold text-white mt-3">ProBuilder Headquarters</h3>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                  Dedicated to delivering world-class digital skills education across the globe.
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#181820]">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#121218] border border-[#22222C] text-[#D3151D] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider block">
                      Direct Email Support
                    </span>
                    <a 
                      href="mailto:probuilder.pk@gmail.com" 
                      className="text-sm font-bold text-white hover:text-[#D3151D] transition-colors"
                    >
                      probuilder.pk@gmail.com
                    </a>
                    <p className="text-[11px] text-[#A1A1AA] mt-0.5">Average reply time: under 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#121218] border border-[#22222C] text-[#D3151D] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider block">
                      Support Desk Hours
                    </span>
                    <p className="text-sm font-bold text-white">Monday – Saturday: 9:00 AM – 8:00 PM</p>
                    <p className="text-[11px] text-[#A1A1AA] mt-0.5">Online student tickets monitored 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#121218] border border-[#22222C] text-[#D3151D] flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider block">
                      Global Credibility
                    </span>
                    <p className="text-sm font-bold text-white">Verified AI Industry Curriculum</p>
                    <p className="text-[11px] text-[#A1A1AA] mt-0.5">DEVELOPMENT • TEACHING • GLOBAL REACH</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#181820]">
                <button
                  onClick={onOpenAIAdvisor}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#121218] hover:bg-[#1A1A24] text-white border border-[#262634] hover:border-[#D3151D]/60 text-xs font-bold transition-all"
                >
                  <Bot className="w-4 h-4 text-[#D3151D]" />
                  <span>Need Immediate Help? Chat with AI Advisor</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 pt-12 border-t border-[#181820] max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D3151D]">
              Common Inquiries
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl bg-[#0B0B0F] border border-[#1E1E26] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#D3151D] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#71717A] flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed border-t border-[#181820] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
