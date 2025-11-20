import { GoogleGenAI, GenerateContentStreamResult } from "@google/genai";

// IMPORTANT: The API key must be obtained exclusively from process.env.API_KEY
const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export type CodeType = 'react' | 'html' | 'css';

const SYSTEM_INSTRUCTIONS = {
  react: "You are Nexus AI, a senior React Engineer. \n\nSTRICT OUTPUT RULES:\n1. Generate a SINGLE functional React component.\n2. DO NOT use import statements. Assume 'React', 'useState', 'useEffect' and UI components ('Button', 'Card', 'Input', 'Terminal', 'Text') are already available in the global scope.\n3. Use Tailwind CSS for styling.\n4. Output pure code wrapped in ```tsx blocks immediately.\n5. Define the component as `const App = () => { ... }` or `function App() { ... }` and ensure it is the only export or the last defined function.\n6. NO conversational text.",
  
  html: "You are Nexus AI, a UI Specialist. \n\nSTRICT OUTPUT RULES:\n1. Generate ONLY the raw HTML code for the requested component.\n2. Start the response IMMEDIATELY with ```html.\n3. Use Tailwind CSS for all styling.\n4. DESIGN FOR DARK MODE: The application background is dark (bg-slate-950). Ensure your component is visible (use light text, glass effects, or appropriate backgrounds).\n5. Output standard HTML5 (use 'class' attribute).\n6. Do not include <html>, <head>, or <body> tags; just the component structure.",
  
  css: "You are Nexus AI, a CSS Architect. \n\nSTRICT OUTPUT RULES:\n1. Generate an HTML structure with a scoped <style> block containing standard CSS.\n2. Start the response IMMEDIATELY with ```html.\n3. Do not use Tailwind for this request, use semantic class names and raw CSS.\n4. DESIGN FOR DARK MODE: Ensure visibility on a dark background.\n5. NO conversational text."
};

export async function streamGeminiResponse(
  prompt: string,
  codeType: CodeType = 'html',
  onChunk: (text: string) => void
) {
  try {
    const ai = getClient();
    
    // Using gemini-2.5-flash for high speed execution
    const response: GenerateContentStreamResult = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // Select instruction based on user preference
        systemInstruction: SYSTEM_INSTRUCTIONS[codeType],
        temperature: 0.2, 
      }
    });

    for await (const chunk of response) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate content");
  }
}

export async function analyzeCode(code: string): Promise<string> {
    const ai = getClient();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze this code for accessibility, performance, and best practices. Return a brief summary. \n\n ${code}`,
    });
    return response.text || "No analysis generated.";
}