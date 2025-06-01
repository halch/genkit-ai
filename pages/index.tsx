import React from 'react';
import ChatInterface from '../src/components/ChatInterface';
import { MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Genkit AI Chat</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <ChatInterface />
      </main>
    </div>
  );
}