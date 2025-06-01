import React, { useState } from 'react';
import ChatInterface from '../src/components/ChatInterface';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f5f5f5'
    }}>
      <header style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Genkit AI Chat</h1>
      </header>
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <ChatInterface />
      </main>
    </div>
  );
}