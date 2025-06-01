import { googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";
import * as fs from "fs";
import * as path from "path";
import * as readlineSync from "readline-sync";
const pdf = require("pdf-parse");

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model("gemini-2.0-flash"),
});

async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error reading PDF:", error);
    throw error;
  }
}

async function main() {
  try {
    const pdfPath = process.argv[2];
    if (!pdfPath) {
      console.error("Please provide a PDF file path as a command line argument.");
      console.error("Usage: npm run dev <pdf-file-path>");
      process.exit(1);
    }

    if (!fs.existsSync(pdfPath)) {
      console.error(`PDF file not found: ${pdfPath}`);
      process.exit(1);
    }

    console.log(`Loading PDF: ${path.basename(pdfPath)}...`);
    const pdfContent = await extractTextFromPDF(pdfPath);
    console.log("PDF loaded successfully!");
    console.log(`Total characters: ${pdfContent.length}\n`);

    console.log("You can now ask questions about the PDF. Type 'exit' to quit.\n");

    while (true) {
      const question = readlineSync.question("Your question: ");
      
      if (question.toLowerCase() === "exit") {
        console.log("Goodbye!");
        break;
      }

      if (!question.trim()) {
        console.log("Please enter a question.\n");
        continue;
      }

      console.log("\nThinking...\n");

      const { text } = await ai.generate({
        prompt: `You are a helpful assistant that answers questions about a PDF document. 
        
Here is the PDF content:
${pdfContent}

User question: ${question}

Please provide a clear and concise answer based on the PDF content. If the information is not in the PDF, say so.`,
      });

      console.log("Answer:", text);
      console.log("\n" + "=".repeat(50) + "\n");
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();