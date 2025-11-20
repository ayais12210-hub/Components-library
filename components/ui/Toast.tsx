import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn, generateId } from '../../utils';
import { Text } from './Typography';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
}

interface ToastContextType {
  addToast: (type: ToastType, message: string, description?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string, description?: string) => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, type, message, description }]);
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-6 space-y-4 z-50 max-w-md w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto w-full rounded-lg border p-4 shadow-lg backdrop-blur-md animate-slide-up transition-all",
              toast.type === 'success' && "bg-green-900/20 border-green-500/30",
              toast.type === 'error' && "bg-red-900/20 border-red-500/30",
              toast.type === 'info' && "bg-blue-900/20 border-blue-500/30",
              toast.type === 'warning' && "bg-yellow-900/20 border-yellow-500/30"
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Text weight="semibold" className={cn(
                   toast.type === 'success' && "text-green-400",
                   toast.type === 'error' && "text-red-400",
                   toast.type === 'info' && "text-blue-400",
                   toast.type === 'warning' && "text-yellow-400",
                )}>
                  {toast.message}
                </Text>
                {toast.description && <Text variant="body-sm" color="muted" className="mt-1">{toast.description}</Text>}
              </div>
              <button onClick={() => removeToast(toast.id)} className="text-surface-400 hover:text-surface-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};