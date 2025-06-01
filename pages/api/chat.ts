import { NextApiRequest, NextApiResponse } from 'next';
import { googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";
import { Message } from "genkit";

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model("gemini-2.0-flash"),
});

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    // Convert chat history to Genkit message format
    const messages: Message[] = [];
    
    // Add system message to set the AI's behavior
    messages.push({
      role: 'system',
      content: [{ 
        text: `You are a helpful AI assistant. You provide clear, accurate, and concise responses. 
You maintain context throughout the conversation and refer back to previous messages when relevant.
You're friendly and professional in your communication style.` 
      }],
    });
    
    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'model',
          content: [{ text: msg.content }],
        });
      }
    }
    
    // Add the current user message
    messages.push({
      role: 'user',
      content: [{ text: message }],
    });

    // Generate response with full conversation context
    const { text } = await ai.generate({
      messages,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    res.status(200).json({ response: text });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}