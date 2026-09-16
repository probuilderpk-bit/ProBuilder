import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  ArrowRight, 
  RefreshCw,
  Zap
} from 'lucide-react';
import { ChatMessage, NavPage } from '../types';

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavPage, categoryFilter?: string) => void;
}

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm your ProBuilder AI Learning Advisor. Whether you're brand new to AI or looking to build advanced autonomous agents, tell me your current background and goals—I'll generate a tailored learning track for you!",
      timestamp: 'Just now',
      suggestedAction: {
        label: 'Explore Free AI Basics',
        page: 'free-courses'
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "I'm a beginner. Where should I start?",
    "How can I build & monetize AI chatbots?",
    "What's the difference between AI Automation & AI Agents?",
    "Give me a 30-day AI Freelancing roadmap"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Attempt to query server Gemini endpoint
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply || "Here is the recommended path based on your goals.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: data.suggestedAction
        };
        setMessages((prev) => [...prev, botReply]);
        setLoading(false);
        return;
      }
    } catch {
      // Fallback gracefully below
    }

    // High-quality intelligent local fallback
    setTimeout(() => {
      let reply = "";
      let suggestedAction: ChatMessage['suggestedAction'] = undefined;

      const lower = userText.toLowerCase();
      if (lower.includes('beginner') || lower.includes('start') || lower.includes('new to ai')) {
        reply = "For absolute beginners, we strongly recommend our Free Track: **Introduction to Artificial Intelligence** followed by **Prompt Engineering Basics**. These cover the core mental models of LLMs, how to instruct models reliably, and how to use everyday AI tools without writing code.";
        suggestedAction = { label: 'Go to Free Courses', page: 'free-courses' };
      } else if (lower.includes('chatbot') || lower.includes('chat bot') || lower.includes('rag')) {
        reply = "To build and monetize AI Chatbots, take our **AI Chatbot Development: Conversational AI** masterclass! You will learn how to build enterprise RAG pipelines, ingest private PDFs, connect vector databases, and integrate bots directly into client websites or WhatsApp.";
        suggestedAction = { label: 'View Chatbot Masterclass', page: 'courses', filterCategory: 'AI Chatbots' };
      } else if (lower.includes('agent') || lower.includes('agents')) {
        reply = "AI Agents are autonomous systems that make decisions, call APIs, and execute multi-step goals. Our **AI Agents Development Masterclass** covers ReAct loops, LangGraph, tool-calling, and multi-agent coordination for production systems.";
        suggestedAction = { label: 'Explore AI Agents Track', page: 'courses', filterCategory: 'AI Agents' };
      } else if (lower.includes('freelanc') || lower.includes('business') || lower.includes('money') || lower.includes('income')) {
        reply = "Our **Freelancing with AI** and **Starting Your Own Business with AI** courses show the exact blueprints to packaging AI services (like automated customer service and content workflows) on Upwork and LinkedIn for $2k-$5k monthly client retainers.";
        suggestedAction = { label: 'View Business & Freelancing', page: 'courses', filterCategory: 'Digital Business & Freelancing' };
      } else {
        reply = `ProBuilder offers both Free Foundation Courses and Flagship Masterclasses across AI Agents, Chatbots, Automation, Web Development, and Digital Business. Tell me which direction interests you most, or explore our full catalog!`;
        suggestedAction = { label: 'Browse Full Catalog', page: 'courses' };
      }

      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction
      };
      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="ai-advisor-dialog"
        className="relative w-full max-w-2xl h-[90vh] max-h-[640px] bg-[#0B0B0F] border border-[#22222D] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#E4E4E7]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0F0F15] border-b border-[#1E1E26] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D3151D]/15 border border-[#D3151D]/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#D3151D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">ProBuilder AI Advisor</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#1A1A24] text-white border border-[#2A2A3A] flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-[#D3151D]" /> FAST GEMINI LITE
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1AA]">
                Ask for personalized course recommendations, skill roadmaps & career advice
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#161620] text-[#A1A1AA] hover:text-white hover:bg-[#20202C] transition-colors"
            aria-label="Close Advisor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#D3151D]/15 border border-[#D3151D]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-[#D3151D]" />
                </div>
              )}

              <div
                className={`max-w-[82%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#D3151D] text-white rounded-tr-none shadow-md shadow-[#D3151D]/20'
                    : 'bg-[#111117] text-[#E4E4E7] border border-[#1E1E26] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                {m.suggestedAction && (
                  <div className="mt-3 pt-2.5 border-t border-[#22222D]">
                    <button
                      onClick={() => {
                        onClose();
                        if (m.suggestedAction?.page) {
                          onNavigate(m.suggestedAction.page, m.suggestedAction.filterCategory);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D3151D] hover:bg-[#E50914] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <span>{m.suggestedAction.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div className={`text-[9px] mt-1.5 ${m.role === 'user' ? 'text-white/80' : 'text-[#71717A]'}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-lg bg-[#D3151D]/15 border border-[#D3151D]/30 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#D3151D]" />
              </div>
              <div className="p-3 rounded-2xl bg-[#111117] border border-[#1E1E26] text-xs text-[#A1A1AA] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#D3151D] animate-spin" />
                <span>ProBuilder AI is analyzing the curriculum...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-4 py-2 bg-[#0E0E12] border-t border-[#1C1C24] overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          <span className="text-[10px] text-[#71717A] uppercase font-bold flex-shrink-0 mr-1">
            Try:
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#14141C] hover:bg-[#1E1E28] text-[#D4D4D8] border border-[#242432] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0F0F15] border-t border-[#1E1E26]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI Agent courses, freelancing, or career roadmaps..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#14141C] border border-[#262634] text-xs sm:text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D3151D] focus:ring-1 focus:ring-[#D3151D]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-[#D3151D] hover:bg-[#E50914] disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
