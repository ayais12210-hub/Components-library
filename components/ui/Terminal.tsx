import React from 'react';
import { cn } from '../../utils';

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  action?: React.ReactNode;
}

export const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  ({ className, title = "nexus-ai ~ node", children, action, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(
          "flex flex-col rounded-xl overflow-hidden bg-[#0d1117] shadow-2xl font-mono text-sm md:text-[15px]",
          className
        )} 
        {...props}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-surface-800 select-none shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50 hover:bg-red-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 hover:bg-green-500 transition-colors cursor-pointer" />
          </div>
          <div className="text-xs text-surface-500 font-medium tracking-wide flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
            {title}
          </div>
          <div className="flex items-center">
            {action || <div className="w-12" />} 
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto custom-scrollbar text-surface-300 leading-normal bg-[#0d1117]">
          {children}
        </div>
      </div>
    );
  }
);

Terminal.displayName = 'Terminal';