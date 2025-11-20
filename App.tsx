import React, { useState } from 'react';
import { GeminiPlayground } from './components/GeminiPlayground';
import { Showcase } from './components/Showcase';
import { cn } from './utils';

const App: React.FC = () => {
  // Default to 'ai' so the user immediately sees the playground environment
  const [activeTab, setActiveTab] = useState<'ui' | 'ai'>('ai');

  return (
    <div className="flex h-screen w-screen bg-surface-950 text-surface-50 overflow-hidden relative">
      
      {/* Background Ambient Light */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar / Nav */}
      <aside className="w-16 lg:w-64 flex-shrink-0 border-r border-surface-800 bg-surface-950/80 backdrop-blur-md z-10 flex flex-col justify-between h-full transition-all duration-300">
        <div className="p-4 lg:p-6 flex flex-col items-center lg:items-start space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
            </div>
            <span className="hidden lg:block font-bold text-xl tracking-tight">Nexus</span>
          </div>

          {/* Navigation */}
          <nav className="w-full space-y-2">
            <button 
              onClick={() => setActiveTab('ui')}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                activeTab === 'ui' 
                  ? "bg-primary-600/10 text-primary-400" 
                  : "text-surface-400 hover:text-surface-100 hover:bg-surface-800/50"
              )}
              title="UI Components"
            >
              <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
              <span className="hidden lg:block font-medium text-sm">Components</span>
            </button>

            <button 
              onClick={() => setActiveTab('ai')}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                activeTab === 'ai' 
                  ? "bg-primary-600/10 text-primary-400" 
                  : "text-surface-400 hover:text-surface-100 hover:bg-surface-800/50"
              )}
              title="Gemini AI Architect"
            >
              <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/></svg>
              <span className="hidden lg:block font-medium text-sm">Gemini AI</span>
            </button>
          </nav>
        </div>

        <div className="p-4 lg:p-6 hidden lg:block">
            <div className="bg-surface-900 rounded-xl p-4 border border-surface-800">
                <h4 className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-2">Status</h4>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-surface-300">System Operational</span>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 relative flex flex-col min-w-0",
        activeTab === 'ui' ? "overflow-auto scroll-smooth" : "overflow-hidden h-full"
      )}>
        <div className={cn(
          "mx-auto w-full h-full",
          activeTab === 'ui' ? "max-w-6xl p-6 lg:p-12" : "p-4 lg:p-6 w-full flex flex-col"
        )}>
          {activeTab === 'ui' ? <Showcase /> : <GeminiPlayground />}
        </div>
      </main>

    </div>
  );
};

export default App;