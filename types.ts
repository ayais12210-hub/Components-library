import React from 'react';

export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'glass';
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface IconProps extends BaseProps {
  size?: number;
  strokeWidth?: number;
}