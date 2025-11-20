import React, { useState, useRef, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { TextArea } from './ui/Input';
import { Text } from './ui/Typography';
import { Terminal } from './ui/Terminal';
import { Tabs, TabsList, TabsTrigger } from './ui/Tabs';
import { useToast } from './ui/Toast';
import * as UIComponents from './ui/Card'; 
import * as ButtonComponents from './ui/Button';
import * as InputComponents from './ui/Input';
import * as TypographyComponents from './ui/Typography';
import { streamGeminiResponse, CodeType } from '../services/geminiService';
import { cn } from '../utils';

declare global {
  interface Window {
    Babel: any;
  }
}

type ViewMode = 'terminal' | 'preview' | 'split';

// Scope for React Live Runner
const SCOPE = {
  React,
  ...React,
  ...UIComponents,
  ...ButtonComponents,
  ...InputComponents,
  ...TypographyComponents,
  Terminal,
  Text,
};

export const GeminiPlayground: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [codeType, setCodeType] = useState<CodeType>('react');
  const [isCopied, setIsCopied] = useState(false);
  
  const { addToast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const previewRootRef = useRef<ReactDOM.Root | null>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (viewMode !== 'preview') {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [response, viewMode]);

  // Robust regex to extract code from markdown blocks
  const extractContent = (text: string) => {
    if (!text) return null;
    const completeMatch = text.match(/```(?:html|css|jsx|tsx|javascript|typescript)?([\s\S]*?)```/);
    if (completeMatch) return completeMatch[1].trim();
    const streamMatch = text.match(/```(?:html|css|jsx|tsx|javascript|typescript)?([\s\S]*)/);
    if (streamMatch) return streamMatch[1].trim();
    if ((codeType === 'html' || codeType === 'css') && text.trim().startsWith('<')) return text.trim();
    return text.trim();
  };

  const previewContent = extractContent(response);

  // Live React Renderer
  useEffect(() => {
    if (!previewContainerRef.current || !previewContent || codeType !== 'react') return;

    const renderReact = () => {
      try {
        // Clean up code: remove imports and exports for the runner
        const cleanCode = previewContent
          .replace(/import\s+.*?;/g, '')
          .replace(/export\s+default\s+/g, '')
          .replace(/export\s+/g, '');

        // Use Babel Standalone to transform JSX
        if (window.Babel) {
            const transformed = window.Babel.transform(cleanCode, {
              presets: ['react', 'env'],
              filename: 'main.tsx'
            }).code;
    
            // Create a component factory
            const funcBody = `
              const { ${Object.keys(SCOPE).join(', ')} } = scope;
              ${transformed}
              return typeof App !== 'undefined' ? App : (typeof Component !== 'undefined' ? Component : null);
            `;
    
            const componentFactory = new Function('scope', funcBody);
            const Component = componentFactory(SCOPE);
    
            if (Component) {
                if (!previewRootRef.current) {
                    previewRootRef.current = ReactDOM.createRoot(previewContainerRef.current);
                }
                previewRootRef.current.render(
                    <React.StrictMode>
                       <div className="p-6 w-full h-full overflow-auto"><Component /></div>
                    </React.StrictMode>
                );
            }
        }
      } catch (err) {
        // Silent fail on streaming incomplete code
      }
    };

    // Debounce rendering slightly during heavy streaming
    const timer = setTimeout(renderReact, 100);
    return () => clearTimeout(timer);

  }, [previewContent, codeType]);

  // Clean up root on unmount
  useEffect(() => {
      return () => {
          if (previewRootRef.current) {
              previewRootRef.current.unmount();
              previewRootRef.current = null;
          }
      }
  }, []);


  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsStreaming(true);
    setResponse('');
    
    try {
      await streamGeminiResponse(prompt, codeType, (chunk) => {
        setResponse((prev) => prev + chunk);
      });
    } catch (error: any) {
      addToast('error', 'Generation Failed', error.message);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCopy = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(response);
      setIsCopied(true);
      addToast('success', 'Copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      addToast('error', 'Failed to copy', 'Could not copy to clipboard');
    }
  };

  return (
    <div className="w-full h-full flex flex-col animate-fade-in overflow-hidden">
      {/* Header - Reduced vertical space */}
      <div className="flex flex-col space-y-1 shrink-0 mb-2 px-1">
        <div className="flex items-center justify-between">
            <div>
                <Text as="h2" variant="h2" weight="bold" className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-indigo-300">
                Nexus AI Architect
                </Text>
                <Text color="muted" className="hidden sm:block text-xs">
                Live generation environment with real-time preview.
                </Text>
            </div>
            {isStreaming && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/20 border border-primary-500/30 text-primary-400 text-xs font-medium animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-primary-400"></span>
                    Generating...
                </div>
            )}
        </div>
      </div>

      {/* Main Content Area: Flex Column on Mobile, Row on Desktop */}
      <div className="flex flex-col xl:flex-row gap-4 flex-1 min-h-0 overflow-hidden">
        
        {/* Input Area - Left Column */}
        {/* Reduced height from 50% to 35% on mobile/tablet to give more room to terminal */}
        <Card 
            className="w-full xl:w-[360px] flex flex-col h-[35%] min-h-[280px] xl:h-full border-surface-700/50 shrink-0 shadow-xl bg-surface-900/40 backdrop-blur-sm" 
            variant="default"
            padding="none" 
        >
          {/* Fixed Header Section */}
          <div className="p-4 border-b border-surface-700/50 shrink-0 bg-surface-800/20 space-y-3">
             <div className="flex items-center justify-between">
               <Text weight="semibold" className="tracking-tight text-surface-100 text-sm">Control Panel</Text>
               <span className="text-[10px] text-surface-500 uppercase tracking-wider font-mono">v1.0.2</span>
             </div>
             <Tabs defaultValue={codeType} onValueChange={(v) => setCodeType(v as CodeType)} className="w-full">
               <TabsList className="w-full grid grid-cols-3 bg-surface-900/80 h-8">
                 <TabsTrigger value="react" className="text-xs py-1">React</TabsTrigger>
                 <TabsTrigger value="html" className="text-xs py-1">HTML</TabsTrigger>
                 <TabsTrigger value="css" className="text-xs py-1">CSS</TabsTrigger>
               </TabsList>
            </Tabs>
          </div>

          {/* Scrollable Body Section */}
          <div className="flex-1 p-4 min-h-0 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
            <div className="flex-1 flex flex-col relative min-h-[100px]">
                <TextArea 
                    label="Prompt"
                    placeholder={
                        codeType === 'react' ? "e.g., Create a user profile card with TypeScript interfaces..." :
                        codeType === 'html' ? "e.g., A modern pricing table with 3 tiers and hover effects..." :
                        "e.g., A neon glowing button with a pulse animation..."
                    }
                    className="flex-1 min-h-[80px] resize-none font-mono text-sm leading-relaxed bg-surface-950/50 focus:bg-surface-950 transition-colors border-surface-700/50"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>
            
            <div className="bg-surface-950/30 rounded-lg p-2.5 border border-surface-800/50 space-y-1.5 shrink-0">
                <Text variant="caption" className="text-surface-500 text-[10px]">System Status</Text>
                <div className="flex items-center justify-between text-[11px] text-surface-400">
                    <span>Model</span>
                    <span className="font-mono text-primary-400">gemini-2.5-flash</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-surface-400">
                    <span>Latency</span>
                    <span className="font-mono text-green-400">Real-time</span>
                </div>
            </div>
          </div>

          {/* Fixed Footer Section */}
          <div className="p-4 border-t border-surface-700/50 shrink-0 bg-surface-800/20">
            <Button 
              variant="primary" 
              className="w-full h-10 shadow-lg shadow-primary-900/20" 
              onClick={handleGenerate}
              isLoading={isStreaming}
              disabled={!prompt}
              rightIcon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7 7 7"/><path d="M12 19V5"/></svg>
              }
            >
              Generate UI
            </Button>
          </div>
        </Card>

        {/* Output Area - Right Column */}
        <div className="flex-1 flex flex-col h-full gap-3 min-h-0 overflow-hidden">
            {/* View Toggles */}
            <div className="flex items-center justify-between bg-surface-900/50 p-1 rounded-lg border border-surface-800 shrink-0 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                    <button 
                        onClick={() => setViewMode('terminal')}
                        className={cn(
                            "px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2",
                            viewMode === 'terminal' 
                                ? "bg-surface-700 text-white shadow-sm" 
                                : "text-surface-400 hover:text-surface-200 hover:bg-surface-800"
                        )}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
                        Code
                    </button>
                    <button 
                        onClick={() => setViewMode('split')}
                        className={cn(
                            "px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2",
                            viewMode === 'split' 
                                ? "bg-surface-700 text-white shadow-sm" 
                                : "text-surface-400 hover:text-surface-200 hover:bg-surface-800"
                        )}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="12" x2="12" y1="3" y2="21"/></svg>
                        Split
                    </button>
                    <button 
                        onClick={() => setViewMode('preview')}
                        className={cn(
                            "px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2",
                            viewMode === 'preview' 
                                ? "bg-primary-600 text-white shadow-sm" 
                                : "text-surface-400 hover:text-surface-200 hover:bg-surface-800"
                        )}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        Live
                    </button>
                </div>
                <div className="flex items-center gap-2 px-2">
                     <span className={cn("w-2 h-2 rounded-full", isStreaming ? "bg-yellow-400 animate-pulse" : "bg-green-400")}></span>
                     <span className="text-[10px] uppercase tracking-wider text-surface-500 font-bold hidden sm:inline-block">{codeType} Environment</span>
                </div>
            </div>

            {/* Split Container */}
            <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0 overflow-hidden relative">
                
                {/* Terminal View */}
                <div className={cn(
                    "flex flex-col min-h-0 transition-all duration-300 ease-in-out border border-surface-800 rounded-xl overflow-hidden",
                     viewMode === 'terminal' ? "h-full w-full" : 
                     viewMode === 'split' ? "h-1/2 md:h-full w-full md:w-1/2" : 
                     "hidden"
                )}>
                    <Terminal 
                      className="h-full w-full border-none rounded-none"
                      title={`nexus-ai ~ ${codeType}-generator`} 
                      action={
                        <div className="flex items-center gap-2">
                            {/* Status Badge */}
                            <div className={cn(
                                "text-[10px] px-2 py-0.5 rounded border text-surface-400 uppercase tracking-wider bg-surface-900 hidden sm:block",
                                isStreaming ? "border-yellow-900/50 text-yellow-500" : "border-surface-700"
                            )}>
                                {isStreaming ? 'STREAMING' : 'IDLE'}
                            </div>
                            
                            {/* Copy Button */}
                            {response && (
                                <Button 
                                    variant="ghost" 
                                    onClick={handleCopy}
                                    className="h-6 px-2 text-surface-400 hover:text-white hover:bg-surface-700/50"
                                    title="Copy Code"
                                >
                                    {isCopied ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                    )}
                                </Button>
                            )}
                        </div>
                      }
                    >
                        {response ? (
                        <div className="whitespace-pre-wrap font-mono text-primary-100/90 pb-4">
                            {response}
                            {isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-primary-500 animate-pulse align-middle"></span>}
                        </div>
                        ) : (
                        <div className="h-full flex flex-col items-center justify-center text-surface-600 space-y-4 opacity-50">
                            <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
                            <Text variant="body-sm">Ready to assist...</Text>
                        </div>
                        )}
                        <div ref={messagesEndRef} />
                    </Terminal>
                </div>

                {/* Preview View */}
                <div className={cn(
                     "rounded-xl border border-surface-700/50 bg-[#0f1115] overflow-hidden relative group flex flex-col min-h-0 shadow-inner",
                     viewMode === 'preview' ? "h-full w-full" : 
                     viewMode === 'split' ? "h-1/2 md:h-full w-full md:w-1/2" : 
                     "hidden"
                 )}>
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                     
                     {/* Preview Toolbar */}
                     <div className="h-9 border-b border-white/5 bg-white/5 flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-surface-600"></div>
                                <div className="w-2 h-2 rounded-full bg-surface-600 opacity-50"></div>
                            </div>
                            <span className="text-[10px] font-medium text-surface-400 uppercase tracking-widest ml-2">Renderer Output</span>
                        </div>
                     </div>

                     <div className="flex-1 overflow-auto custom-scrollbar relative bg-surface-950/50">
                        {codeType === 'react' ? (
                            // React Mount Point
                            <div ref={previewContainerRef} className="w-full h-full animate-fade-in">
                                {!previewContent && (
                                    <div className="h-full flex flex-col items-center justify-center text-surface-500 gap-3">
                                        <div className="p-3 rounded-full bg-surface-800/50 border border-surface-700/50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                                        </div>
                                        <span className="text-sm">Waiting for render...</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // HTML/CSS Render
                            previewContent ? (
                                <div className="p-8 w-full animate-fade-in" dangerouslySetInnerHTML={{ __html: previewContent }} />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-surface-500 gap-3">
                                    <div className="p-3 rounded-full bg-surface-800/50 border border-surface-700/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                    </div>
                                    <span className="text-sm">Preview will appear here...</span>
                                </div>
                            )
                        )}
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};