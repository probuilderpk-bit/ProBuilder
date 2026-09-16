import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'ProBuilder', timestamp: new Date().toISOString() });
});

// 2. ProBuilder AI Learning Advisor API
app.post('/api/advisor', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getAIClient();

    // If no API key is set yet, provide an intelligent fallback response
    if (!ai) {
      return res.json({
        reply: `Thank you for your question about "${message}"! At ProBuilder, we provide comprehensive training in AI Agents, RAG Chatbots, Automation, Web Development, and Freelancing. You can start immediately with our 100% Free Foundation courses, or explore our flagship masterclasses.`,
        suggestedAction: {
          label: 'Explore Free Courses',
          page: 'free-courses'
        }
      });
    }

    // Call low-latency model gemini-3.1-flash-lite as requested
    const systemPrompt = `You are the ProBuilder AI Course & Learning Advisor.
ProBuilder is a premium AI education and digital skills platform with the tagline "DEVELOPMENT • TEACHING • GLOBAL REACH".
Our brand offers courses in:
- Free Starter Courses: Introduction to AI, AI Tools for Beginners, Prompt Engineering Basics, Create Content with AI, Introduction to Website Building with AI, AI Productivity Essentials.
- Flagship Masterclasses: AI Agents Development Masterclass (LangGraph, multi-agent swarms), AI Chatbot Development (Conversational RAG), AI Automation & No-Code Workflows (Make, n8n), Full-Stack Website Development with AI, AI Content Creation, AI Video Generation & Production, Canva Masterclass, Starting Your Own Business with AI, Freelancing with AI.

Your role:
- Provide clear, friendly, encouraging, and highly practical learning guidance.
- Recommend specific courses or learning paths from the ProBuilder catalog based on the user's goals.
- Keep responses concise, structured (under 140 words), and actionable.`;

    const conversationPrompt = `${systemPrompt}\n\nUser Question: ${message}\nProvide a concise recommendation for this learner:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: conversationPrompt
    });

    const replyText = response.text || "Here is the recommended ProBuilder learning pathway for your goals.";

    // Simple categorization helper for suggested actions
    let action = { label: 'Explore All Courses', page: 'courses' };
    const lower = message.toLowerCase();
    if (lower.includes('free') || lower.includes('beginner') || lower.includes('start')) {
      action = { label: 'Explore Free Courses', page: 'free-courses' };
    } else if (lower.includes('agent')) {
      action = { label: 'View AI Agents Track', page: 'courses' };
    } else if (lower.includes('freelance') || lower.includes('business')) {
      action = { label: 'View Freelancing Track', page: 'courses' };
    }

    res.json({
      reply: replyText,
      suggestedAction: action
    });
  } catch (error: any) {
    console.error('Advisor error:', error);
    res.status(500).json({
      reply: "We are happy to guide you! ProBuilder offers foundational tracks and advanced masterclasses. Check out our Free Courses to get started today.",
      suggestedAction: { label: 'Explore Free Courses', page: 'free-courses' }
    });
  }
});

// Setup Vite middleware for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ProBuilder server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
