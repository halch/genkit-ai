# Genkit AI Chat Application

A Next.js chat application that integrates with Google's Genkit AI for conversational AI capabilities.

## Features

- Real-time chat interface
- Integration with Google's Gemini 2.0 Flash model
- Clean and responsive UI
- API-based architecture

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your Google AI API key:
   - Make sure you have `GOOGLE_GENAI_API_KEY` environment variable set
   - Or create a `.env.local` file with:
     ```
     GOOGLE_GENAI_API_KEY=your_api_key_here
     ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server

## Project Structure

- `/pages` - Next.js pages and API routes
  - `/api/chat.ts` - Chat API endpoint that integrates with Genkit
  - `/index.tsx` - Main chat page
- `/src/components` - React components
  - `ChatInterface.tsx` - Main chat UI component