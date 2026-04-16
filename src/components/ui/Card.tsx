import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-white rounded-[24px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/5",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: CardProps) {
  return (
    <h3 
      className={cn("text-lg font-medium tracking-tight text-gray-900 mb-4", className)}
      {...props}
    >
      {children}
    </h3>
  );
}
