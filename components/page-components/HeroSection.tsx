import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Dumbbell } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className='pt-24 lg:pt-32  lg:pb-10 relative overflow-hidden '>
      <div className='container mx-auto px-4 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <Badge
                variant='secondary'
                className='w-fit bg-primary/5 text-primary border-primary/30'
              >
                🔥 Join our fitness community
              </Badge>
              <h1 className='text-4xl lg:text-6xl font-bold leading-tight text-balance text-gray-800'>
                Transform your fitness journey with our{' '}
                <span className='text-primary'>complete platform</span>
              </h1>
              <p className='text-xl text-gray-500 leading-relaxed'>
                Connect with a thriving fitness community, access diverse
                workout programs, and share your progress. Everything you need
                to achieve your fitness goals.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link href={'/login'}>
                <Button size='lg' className='text-lg px-8'>
                  Start Training
                  <ArrowRight className='w-5 h-5 ml-2' />
                </Button>
              </Link>

              <Link href={'/#features'} scroll={true}>
                <Button
                  variant='secondary'
                  size='lg'
                  className='text-lg px-8 bg-gray-200 hover:bg-gray-300 border border-gray-300'
                >
                  <Dumbbell className='w-5 h-5 mr-2' />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className='relative'>
            <div className='relative'>
              <Image
                src='/img/hero.png'
                alt='Fitness Workout'
                width={800}
                height={600}
                className='w-full h-auto lg:h-[400px] rounded-lg shadow-xl'
                priority
              />
              <div className='absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl' />
              <div className='absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-lg' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
