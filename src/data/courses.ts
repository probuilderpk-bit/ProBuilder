import { Course } from '../types';

export const COURSE_CATEGORIES = [
  'All',
  'Artificial Intelligence',
  'AI Agents',
  'AI Chatbots',
  'AI Automation',
  'Website Development',
  'AI Content Creation',
  'AI Video Generation',
  'Graphic Design & Canva',
  'Digital Business & Freelancing',
  'Productivity Tools'
] as const;

export const COURSES: Course[] = [
  // Free Starter Courses
  {
    id: 'intro-to-ai',
    title: 'Introduction to Artificial Intelligence',
    description: 'Understand the foundations of modern generative AI, neural models, LLMs, and real-world practical use cases.',
    longDescription: 'Get a clear, hype-free understanding of Artificial Intelligence. This course breaks down how Large Language Models work, the landscape of AI tools in 2026, ethics, core terminology, and how anyone can immediately leverage AI in their work and daily life.',
    category: 'Artificial Intelligence',
    level: 'Beginner',
    isFree: true,
    rating: 4.9,
    reviewsCount: 1420,
    studentsCount: 18450,
    duration: '3.5 Hours',
    lessonsCount: 14,
    featured: true,
    popular: true,
    instructor: {
      name: 'Dr. Sarah Vance',
      role: 'Head of AI Curriculum, ProBuilder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Core Foundations of AI',
        lessons: ['What is Generative AI vs Traditional Computing', 'How LLMs Process Language', 'Key Terms: Tokens, Weights, Inference']
      },
      {
        title: 'The Modern AI Ecosystem',
        lessons: ['Text, Image, Code, and Speech Models Overview', 'Open Source vs Proprietary Architectures', 'Choosing the Right Model for Your Goal']
      },
      {
        title: 'Hands-on Foundations',
        lessons: ['Your First Real-World AI Workflow', 'Privacy, Security & Data Safety', 'Where to Go Next']
      }
    ],
    keySkills: ['AI Literacy', 'Model Selection', 'Prompt Thinking', 'Ethical AI Implementation'],
    toolsCovered: ['Gemini', 'Claude', 'OpenAI', 'Hugging Face']
  },
  {
    id: 'ai-tools-beginners',
    title: 'AI Tools for Beginners',
    description: 'Master the top 15 essential AI tools for writing, research, visual creation, data synthesis, and workflow organization.',
    longDescription: 'A practical, zero-coding crash course on the modern toolkit every professional needs. Learn how to configure, automate, and chain everyday AI tools to produce 5x better output in half the time.',
    category: 'Productivity Tools',
    level: 'Beginner',
    isFree: true,
    rating: 4.8,
    reviewsCount: 980,
    studentsCount: 12200,
    duration: '4 Hours',
    lessonsCount: 16,
    instructor: {
      name: 'Michael Chen',
      role: 'Digital Workflows Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Productivity & Research Accelerators',
        lessons: ['Deep Web AI Research Assistants', 'Document Summarization & PDF Intelligence', 'Voice-to-Text & Meeting Assistants']
      },
      {
        title: 'Visual & Media Generation for Non-Designers',
        lessons: ['Fast Image Synthesis for Presentations', 'AI Audio & Background Cleaners', 'Slide Deck Auto-Generators']
      }
    ],
    keySkills: ['Tool Chaining', 'Workflow Optimization', 'Automated Summaries', 'Time Management'],
    toolsCovered: ['Perplexity', 'Notion AI', 'NotebookLM', 'Otter.ai']
  },
  {
    id: 'prompt-engineering-basics',
    title: 'Prompt Engineering Basics',
    description: 'Write high-precision structured prompts that get consistent, error-free, and high-impact results from any AI model.',
    longDescription: 'Prompting is the core language of the AI era. Move beyond basic one-line queries. Learn Few-Shot Prompting, Role Framing, Chain-of-Thought reasoning, system prompts, output constraining, and markdown template architecture.',
    category: 'Artificial Intelligence',
    level: 'Beginner',
    isFree: true,
    rating: 4.9,
    reviewsCount: 2150,
    studentsCount: 24900,
    duration: '3 Hours',
    lessonsCount: 12,
    featured: true,
    popular: true,
    instructor: {
      name: 'Alex Rivera',
      role: 'Prompt Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Prompt Architecture Foundations',
        lessons: ['The 5 Pillars of a Flawless Prompt', 'Role & Context Priming', 'Zero-Shot vs Few-Shot Prompting']
      },
      {
        title: 'Advanced Control Strategies',
        lessons: ['Chain-of-Thought & Reasoning Guides', 'JSON & Tabular Output Schemas', 'Fixing Hallucinations & Error Loops']
      }
    ],
    keySkills: ['Few-Shot Prompting', 'Chain-of-Thought', 'Output Formatting', 'System Prompt Design'],
    toolsCovered: ['Gemini Studio', 'ChatGPT', 'Claude Workbench']
  },
  {
    id: 'create-content-with-ai',
    title: 'Create Content with AI',
    description: 'Produce high-converting blog posts, social hooks, newsletters, video scripts, and marketing copy that sounds human.',
    longDescription: 'Eliminate writer’s block and build an authentic editorial pipeline. Learn how to train models on your unique tone of voice, generate compelling story hooks, structure long-form essays, and repurpose one idea into 10 multi-channel assets.',
    category: 'AI Content Creation',
    level: 'Beginner',
    isFree: true,
    rating: 4.8,
    reviewsCount: 840,
    studentsCount: 10400,
    duration: '4.5 Hours',
    lessonsCount: 18,
    instructor: {
      name: 'Elena Rostova',
      role: 'Content Strategist & Author',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Voice Profiling & Tone Alignment',
        lessons: ['Injecting Personal Voice & Style Guides', 'Avoiding Generic AI Buzzwords', 'Emotional Hook Crafting']
      },
      {
        title: 'Multi-Channel Repurposing Engine',
        lessons: ['From 1 Idea to 10 Platform Posts', 'Writing Viral LinkedIn & Twitter Threads', 'SEO Articles with Structured Headers']
      }
    ],
    keySkills: ['Tone of Voice Matching', 'Editorial Outlines', 'SEO Content', 'Multi-Platform Repurposing'],
    toolsCovered: ['ChatGPT', 'Claude', 'Jasper', 'Grammarly']
  },
  {
    id: 'intro-website-building-ai',
    title: 'Introduction to Website Building with AI',
    description: 'Design and deploy modern, responsive landing pages and web apps without complex coding using modern AI builders.',
    longDescription: 'Build live websites in record time. Discover how prompt-to-code platforms, modern design frameworks, and AI dev assistants enable non-engineers to construct responsive, accessible, interactive web pages in hours instead of months.',
    category: 'Website Development',
    level: 'Beginner',
    isFree: true,
    rating: 4.9,
    reviewsCount: 1720,
    studentsCount: 19800,
    duration: '5 Hours',
    lessonsCount: 20,
    featured: true,
    popular: true,
    instructor: {
      name: 'Kofi Mensah',
      role: 'Full-Stack Developer & Educator',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Modern Web Design Principles',
        lessons: ['Layout Hierarchy & Mobile Responsiveness', 'Color Theory & Dark/Light Theming', 'Prompting Modern UI Interfaces']
      },
      {
        title: 'From Prompt to Production',
        lessons: ['Vite, HTML & Tailwind Building Blocks', 'Connecting Forms and Dynamic States', 'Deploying to Free Cloud Platforms']
      }
    ],
    keySkills: ['Responsive Layouts', 'Prompt-to-Code', 'Component Thinking', 'Cloud Deployment'],
    toolsCovered: ['Vite', 'Tailwind CSS', 'Vercel', 'AI Studio']
  },
  {
    id: 'ai-productivity-essentials',
    title: 'AI Productivity Essentials',
    description: 'Automate repetitive tasks, organize daily information, streamline emails, and build your digital second brain with AI.',
    longDescription: 'Work smarter, not harder. Master automated calendar intelligence, inbox triage, automated knowledge indexing, and personal meeting summaries to save 10+ hours every single week.',
    category: 'Productivity Tools',
    level: 'Beginner',
    isFree: true,
    rating: 4.7,
    reviewsCount: 650,
    studentsCount: 8900,
    duration: '3.5 Hours',
    lessonsCount: 14,
    instructor: {
      name: 'Marcus Bell',
      role: 'Executive Productivity Consultant',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Inbox & Communication Triage',
        lessons: ['AI Email Filtering & Smart Replies', 'Meeting Agendas & Instant Action Items', 'Voice Memo Transcription Workflows']
      },
      {
        title: 'Personal Knowledge Architecture',
        lessons: ['Building a Personal Knowledge Graph', 'Vector Search for Personal Notes', 'Weekly Review Automation']
      }
    ],
    keySkills: ['Time Auditing', 'Automated Triage', 'Second Brain Setup', 'Executive Workflows'],
    toolsCovered: ['Notion AI', 'Superhuman', 'Otter', 'Zapier']
  },

  // Premium Flagship Masterclasses
  {
    id: 'ai-agents-development',
    title: 'AI Agents Development Masterclass',
    description: 'Architect, code, and deploy autonomous multi-agent systems that perform complex multi-step reasoning, tool use, and tasks.',
    longDescription: 'The future of software is agentic. Learn how to build autonomous agents equipped with memory, custom tool-calling, reflection loops, and multi-agent coordination. Build real-world customer support swarms, automated researchers, and self-debugging agents.',
    category: 'AI Agents',
    level: 'Advanced',
    isFree: false,
    price: '$149',
    rating: 4.96,
    reviewsCount: 890,
    studentsCount: 6240,
    duration: '18 Hours',
    lessonsCount: 68,
    featured: true,
    popular: true,
    instructor: {
      name: 'Dr. Sarah Vance',
      role: 'Head of AI Curriculum, ProBuilder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Agentic Architectures & Reasoning Loops',
        lessons: ['ReAct, Plan-and-Solve, and Reflexion Loops', 'Memory Architectures: Working, Episodic, and Vector', 'Structuring Tool Definitions & Safe Execution']
      },
      {
        title: 'Multi-Agent Orchestration',
        lessons: ['Hierarchical vs Peer-to-Peer Agent Swarms', 'State Management & Concurrency', 'Human-in-the-Loop Interventions & Verification']
      },
      {
        title: 'Production Deployment & Observability',
        lessons: ['Tracing Agent Decisions & Token Economics', 'Handling Edge Cases & Fallback Chains', 'Deploying Enterprise Agents on Cloud Infrastructure']
      }
    ],
    keySkills: ['Agentic Workflows', 'Function Calling', 'Multi-Agent Protocols', 'LangGraph / Autogen', 'System Evaluation'],
    toolsCovered: ['LangGraph', 'Gemini Interactions API', 'Python', 'FastAPI', 'Docker']
  },
  {
    id: 'ai-chatbot-development',
    title: 'AI Chatbot Development: Conversational AI',
    description: 'Build enterprise-grade RAG chatbots with custom document ingestion, session memory, streaming tokens, and CRM integrations.',
    longDescription: 'Create AI chatbots that understand context, pull from private knowledge bases, and seamlessly interact with business APIs. Master Retrieval-Augmented Generation (RAG), vector databases, guardrails, and real-time streaming interfaces.',
    category: 'AI Chatbots',
    level: 'Intermediate',
    isFree: false,
    price: '$119',
    rating: 4.92,
    reviewsCount: 740,
    studentsCount: 5120,
    duration: '14 Hours',
    lessonsCount: 52,
    featured: true,
    instructor: {
      name: 'Kofi Mensah',
      role: 'Full-Stack Developer & Educator',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Conversational UI & Streaming Architectures',
        lessons: ['Server-Sent Events & Token Streaming', 'Context Preservation & Token Windows', 'Role Framing & Persona Engineering']
      },
      {
        title: 'RAG Pipeline Construction',
        lessons: ['Document Chunking & Embedding Strategies', 'Vector Similarity Search with Pinecone/Qdrant', 'Reranking & Grounding for 0% Hallucination']
      },
      {
        title: 'Deployment & Channel Integration',
        lessons: ['Integrating with WhatsApp, Slack, and Web Widgets', 'Security Guardrails & Content Moderation', 'Analytics & Conversation Telemetry']
      }
    ],
    keySkills: ['RAG Architectures', 'Vector Embeddings', 'Streaming UI', 'API Integration', 'Security Guardrails'],
    toolsCovered: ['Vector Databases', 'Express.js', 'React', 'Gemini API', 'Tailwind']
  },
  {
    id: 'ai-automation-mastery',
    title: 'AI Automation & No-Code Workflows',
    description: 'Automate entire business operations using Make, n8n, Zapier, and AI APIs without writing thousands of lines of code.',
    longDescription: 'Scale your business or freelance agency by building end-to-end autonomous business workflows. Learn how to ingest leads, process documents, generate customized proposals, send personalized emails, and sync CRM data completely hands-free.',
    category: 'AI Automation',
    level: 'Intermediate',
    isFree: false,
    price: '$129',
    rating: 4.88,
    reviewsCount: 610,
    studentsCount: 4850,
    duration: '12 Hours',
    lessonsCount: 46,
    instructor: {
      name: 'Alex Rivera',
      role: 'Prompt Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Core Automation Building Blocks',
        lessons: ['Webhooks, APIs, and Data Transformers', 'Integrating AI Nodes in Make and n8n', 'Error Handling & Retry Policies']
      },
      {
        title: 'High-Value Business Workflows',
        lessons: ['Automated Inbound Lead Qualifier & Calendar Booking', 'Auto-Invoice Extraction & Accounting Sync', 'Social Media Cross-Posting Engine']
      }
    ],
    keySkills: ['Make.com', 'n8n Self-Hosting', 'Webhook Routing', 'API Chaining', 'Business Process Design'],
    toolsCovered: ['Make', 'n8n', 'Zapier', 'Airtable', 'Google Workspace']
  },
  {
    id: 'build-websites-with-ai',
    title: 'Full-Stack Website Development with AI',
    description: 'Accelerate modern web development 10x using AI-assisted coding, modern React, Tailwind CSS, and cloud deployment.',
    longDescription: 'Combine modern software engineering standards with state-of-the-art AI pair programming tools. Build real full-stack web applications with authentication, responsive design, performant components, and production deployment in a fraction of standard timelines.',
    category: 'Website Development',
    level: 'Intermediate',
    isFree: false,
    price: '$139',
    rating: 4.95,
    reviewsCount: 1120,
    studentsCount: 7890,
    duration: '16 Hours',
    lessonsCount: 60,
    featured: true,
    popular: true,
    instructor: {
      name: 'Kofi Mensah',
      role: 'Full-Stack Developer & Educator',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'AI-Assisted Architecture & Scaffolding',
        lessons: ['Prompting Full-Stack Architectures', 'Modular Clean Code Conventions', 'Tailwind CSS Modern Styling']
      },
      {
        title: 'State, Logic & APIs',
        lessons: ['Dynamic React Hooks & Context', 'Connecting REST & Cloud Services', 'Handling Async Operations Smoothly']
      }
    ],
    keySkills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloud Run / Vercel'],
    toolsCovered: ['Cursor', 'VS Code', 'GitHub Copilot', 'Vite', 'React']
  },
  {
    id: 'ai-content-creation-masterclass',
    title: 'AI Content Creation Masterclass',
    description: 'Build a multi-channel content engine that generates viral hooks, newsletters, ebooks, and long-form thought leadership.',
    longDescription: 'Turn ideas into high-performing content across every digital channel. Learn the strategic frameworks top creators and modern media companies use to produce quality articles, social media campaigns, and newsletters with AI as their primary creative director.',
    category: 'AI Content Creation',
    level: 'Intermediate',
    isFree: false,
    price: '$99',
    rating: 4.87,
    reviewsCount: 820,
    studentsCount: 6420,
    duration: '10 Hours',
    lessonsCount: 38,
    instructor: {
      name: 'Elena Rostova',
      role: 'Content Strategist & Author',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Strategic Content Systems',
        lessons: ['Audience Persona Mapping', 'Generating 100 High-Intent Topics in 15 Minutes', 'Structure & Formatting for Maximum Dwell Time']
      },
      {
        title: 'Distribution & Monetization',
        lessons: ['Building High-Converting Lead Magnets', 'Writing Newsletter Editions That Sell', 'Repurposing Across 5 Social Networks']
      }
    ],
    keySkills: ['Copywriting', 'Newsletter Growth', 'SEO Strategy', 'Content Systematization'],
    toolsCovered: ['ChatGPT', 'Claude 3.7', 'Substack', 'Buffer']
  },
  {
    id: 'ai-video-generation-masterclass',
    title: 'AI Video Generation & Production Masterclass',
    description: 'Create cinematic AI videos, digital avatars, automated shorts, B-roll, voiceovers, and promotional reels.',
    longDescription: 'Video is the dominant medium on the internet. Master modern generative video tools like Runway, Kling, Sora-class models, and Midjourney. Learn camera prompt directions, motion consistency, audio synthesis, and professional video editing workflows.',
    category: 'AI Video Generation',
    level: 'Intermediate',
    isFree: false,
    price: '$139',
    rating: 4.91,
    reviewsCount: 950,
    studentsCount: 7100,
    duration: '14 Hours',
    lessonsCount: 48,
    featured: true,
    instructor: {
      name: 'David Zhao',
      role: 'Cinematic AI Director',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Visual Generation & Motion Control',
        lessons: ['Camera Prompts: Pan, Tilt, Zoom, Tracking', 'Keyframing & Style Consistency', 'Character Consistency Across Cuts']
      },
      {
        title: 'Voice, Soundscapes & Assembly',
        lessons: ['Ultra-Realistic AI Voice Cloning & Emotion', 'Sound Effects & Ambient Foley Generation', 'Editing & Color Grading in CapCut/Premiere']
      }
    ],
    keySkills: ['Video Prompting', 'Camera Angles', 'Voice Synthesis', 'CapCut / Premiere Editing', 'TikTok/Reels Optimization'],
    toolsCovered: ['Runway Gen-3', 'Kling', 'ElevenLabs', 'Midjourney', 'CapCut']
  },
  {
    id: 'canva-masterclass',
    title: 'Canva Masterclass: AI-Powered Graphic Design',
    description: 'Design brand kits, social assets, pitch decks, infographics, and marketing collateral with Canva Magic Studio.',
    longDescription: 'Transform from a beginner into a skilled visual designer. Master Canva’s modern AI Magic Studio tools: Magic Switch, Magic Expand, Magic Grab, Bulk Create, and brand consistency rules that produce professional-grade marketing assets.',
    category: 'Graphic Design & Canva',
    level: 'Beginner',
    duration: '6.5 Hours',
    lessonsCount: 22,
    isFree: false,
    price: '$79',
    rating: 4.89,
    reviewsCount: 1350,
    studentsCount: 11400,
    popular: true,
    instructor: {
      name: 'Maya Patel',
      role: 'Lead Brand Designer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Branding & Visual Hierarchy',
        lessons: ['Building an Unshakable Brand Kit', 'Typography Pairing & Contrast Math', 'Grid Layouts & Balance']
      },
      {
        title: 'Canva AI Magic Tools',
        lessons: ['Bulk Creating 50 Social Graphics in 5 Minutes', 'Magic Expand, Erase, and Motion Animations', 'Creating High-Ticket Client Presentations']
      }
    ],
    keySkills: ['Brand Kit Setup', 'Presentation Design', 'Social Graphics', 'Bulk Automation', 'Visual Hierarchy'],
    toolsCovered: ['Canva Pro', 'Magic Studio', 'Figma Basics']
  },
  {
    id: 'start-your-business-with-ai',
    title: 'Starting Your Own Business with AI',
    description: 'Validate, build, launch, and scale a profitable modern digital business leveraging AI for marketing, operations, and sales.',
    longDescription: 'Turn your AI expertise into financial freedom. Step-by-step blueprint to finding high-demand business ideas, validating with zero capital, setting up automated landing pages, executing automated outreach, and closing your first paying customers.',
    category: 'Digital Business & Freelancing',
    level: 'All Levels',
    duration: '10 Hours',
    lessonsCount: 30,
    isFree: false,
    price: '$169',
    rating: 4.94,
    reviewsCount: 880,
    studentsCount: 6540,
    featured: true,
    instructor: {
      name: 'Tariq Al-Mansoor',
      role: 'Startup Founder & Venture Mentor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Idea Validation & Market Sizing',
        lessons: ['Finding Pain Points People Pay to Solve', 'AI-Assisted Competitive Research', 'Crafting an Irresistible Offer']
      },
      {
        title: 'Lean Operations & Customer Acquisition',
        lessons: ['Automated Lead Generation Workflows', 'Cold Email Systems with AI Personalization', 'Closing High-Value Retainers & Contracts']
      }
    ],
    keySkills: ['Business Modeling', 'Offer Design', 'Automated Lead Gen', 'Client Onboarding', 'Sales Strategies'],
    toolsCovered: ['Stripe', 'Airtable', 'Make', 'Claude', 'Apollo.io']
  },
  {
    id: 'freelancing-with-ai',
    title: 'Freelancing with AI: Build a 6-Figure Income',
    description: 'Offer high-income digital services (AI chatbots, content systems, workflow automation) on Upwork, Fiverr, and LinkedIn.',
    longDescription: 'Discover the exact service packages clients are urgently hiring for in 2026. Learn how to optimize your freelance profile, write winning proposals that get 40%+ reply rates, price based on value, and deliver projects 5x faster using AI.',
    category: 'Digital Business & Freelancing',
    level: 'Intermediate',
    duration: '8.5 Hours',
    lessonsCount: 26,
    isFree: false,
    price: '$119',
    rating: 4.91,
    reviewsCount: 710,
    studentsCount: 5800,
    instructor: {
      name: 'Tariq Al-Mansoor',
      role: 'Startup Founder & Venture Mentor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    syllabus: [
      {
        title: 'Positioning & High-Ticket Niches',
        lessons: ['Top 5 AI Services in High Demand', 'Positioning Yourself as an AI Solutions Architect', 'Setting Up a High-Converting Portfolio']
      },
      {
        title: 'Winning Proposals & Client Retainers',
        lessons: ['Writing Non-Generic Proposals with AI', 'Contract Negotiation & Up-Selling Monthly Retainers', 'Standard Operating Procedures for Delivery']
      }
    ],
    keySkills: ['Proposal Writing', 'Client Management', 'Service Packaging', 'Upwork / LinkedIn Inbound', 'Value-Based Pricing'],
    toolsCovered: ['Upwork', 'LinkedIn Sales Navigator', 'Notion', 'ChatGPT']
  }
];
