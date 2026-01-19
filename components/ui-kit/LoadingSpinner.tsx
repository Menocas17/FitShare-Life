import React from 'react';
import { Dumbbell } from 'lucide-react';

const LoadingSpinner = ({ text }: { text: string }) => {
  return (
    <div className='flex h-screen items-center justify-center bg-background'>
      <div className='flex flex-col items-center space-y-6'>
        {/* Spinning Dumbbell */}
        <div className='relative flex items-center justify-center'>
          <Dumbbell className='w-16 h-16 text-primary animate-spin' />
          {/* Glow effect */}
          <div className='absolute inset-0 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse' />
        </div>

        {/* Loading text */}
        <div className='text-center space-y-2'>
          <p className='text-xl font-semibold text-foreground'>{text}</p>
          {/* <p className="text-sm text-muted-foreground">
            Getting everything ready
          </p> */}
        </div>

        {/* Loading dots animation */}
        <div className='flex space-x-2'>
          <div
            className='w-3 h-3 bg-primary rounded-full animate-bounce'
            style={{ animationDelay: '0ms' }}
          />
          <div
            className='w-3 h-3 bg-primary rounded-full animate-bounce'
            style={{ animationDelay: '150ms' }}
          />
          <div
            className='w-3 h-3 bg-primary rounded-full animate-bounce'
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
