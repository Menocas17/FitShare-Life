import React from 'react';
import { Dumbbell } from 'lucide-react';

const LoadingSpinnerSm = ({ text }: { text: string }) => {
  return (
    <div className='flex flex-col items-center space-y-6'>
      {/* Spinning Dumbbell */}
      <div className='relative flex items-center justify-center'>
        <Dumbbell className='w-8 h-8 text-primary animate-spin' />
        {/* Glow effect */}
        <div className='absolute inset-0 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse' />
      </div>

      {/* Loading text */}
      <div className='text-center space-y-2'>
        <p className='text-base font-semibold text-foreground'>{text}</p>
      </div>

      {/* Loading dots animation */}
      <div className='flex space-x-2'>
        <div
          className='w-2 h-2 bg-primary rounded-full animate-bounce'
          style={{ animationDelay: '0ms' }}
        />
        <div
          className='w-2 h-2 bg-primary rounded-full animate-bounce'
          style={{ animationDelay: '150ms' }}
        />
        <div
          className='w-2 h-2 bg-primary rounded-full animate-bounce'
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinnerSm;
