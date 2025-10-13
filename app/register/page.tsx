'use client';

<<<<<<< HEAD
import React, { useState } from "react";
import { redirect } from "next/navigation";
import Header from "@/components/page-components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
=======
import React, { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Header from '@/components/page-components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
>>>>>>> a237486153cdf4c235eedbe5c2d18b4508dd1558

interface RegisterResponse {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
  error?: string;
}

const RegisterPage = () => {
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<
    'green' | 'red' | 'text-text-light'
  >('red');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingRegister(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

<<<<<<< HEAD
      const data: RegisterResponse = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Registration failed.");
        setMessageColor("red");
=======
      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        setMessage('Invalid server response.');
        setMessageColor('red');
        setLoadingRegister(false);
        return;
      }

      if (!res.ok) {
        setMessage(data.error || 'Registration failed.');
        setMessageColor('red');
        setLoadingRegister(false);
>>>>>>> a237486153cdf4c235eedbe5c2d18b4508dd1558
        return;
      }

      setMessage('Registration successful!');
      setMessageColor('green');

      setTimeout(() => redirect('/login'), 1200);
    } catch (err) {
      console.error('Register error:', err);
      setMessage('Internal server error.');
      setMessageColor('red');
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleGoogleRegister = () => {
    signIn('google');
  };

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <Header />
      <main className='flex flex-grow items-center justify-center'>
        <div className='bg-card p-8 rounded-lg shadow-lg w-full max-w-md mt-20 mb-10'>
          <h2 className='text-2xl font-bold mb-6 text-center text-foreground'>
            Create an Account
          </h2>

          <form className='space-y-4' onSubmit={handleSubmit}>
            <input
              name='name'
              type='text'
              placeholder='Full Name'
              required
              className='w-full px-4 py-2 rounded-lg border border-border'
            />
            <input
              name='email'
              type='email'
              placeholder='Email'
              required
              className='w-full px-4 py-2 rounded-lg border border-border'
            />
            <input
              name='password'
              type='password'
              placeholder='Password'
              required
              className='w-full px-4 py-2 rounded-lg border border-border'
            />
            <Button type='submit' className='w-full' disabled={loadingRegister}>
              {loadingRegister ? 'Registering...' : 'Register'}
            </Button>
          </form>

          <div className='flex items-center my-6'>
            <hr className='flex-1 border-border' />
            <span className='px-2 text-text-light'>OR</span>
            <hr className='flex-1 border-border' />
          </div>

          <Button
            type='button'
            variant='outline'
            onClick={handleGoogleRegister}
            className='flex items-center justify-center w-full gap-2'
          >
            <svg className='w-5 h-5' viewBox='0 0 533.5 544.3'>
              <path
                d='M533.5 278.4c0-17.9-1.6-35.1-4.7-51.9H272.1v98.1h147c-6.4 34.7-25.1 64.1-53.5 83.9v69.8h86.2c50.5-46.6 79.7-115 79.7-199.9z'
                fill='#4285f4'
              />
              <path
                d='M272.1 544.3c72.9 0 134.1-24.2 178.8-65.8l-86.2-69.8c-23.9 16-54.6 25.3-92.6 25.3-71 0-131-47.8-152.3-112.2H31.1v70.8c44.6 88.2 135.3 151.7 241 151.7z'
                fill='#34a853'
              />
              <path
                d='M119.9 321.6c-10.1-30.5-10.1-63.3 0-93.8V157h-88.8C9.6 203.6 0 236.8 0 272s9.6 68.4 31.1 99.1l88.8-49.5z'
                fill='#fbbc04'
              />
              <path
                d='M272.1 107.5c39.7-.6 77.1 14.1 105.6 40.5l79.5-79.5C406.1 25.6 345 0 272.1 0 166.4 0 75.7 63.5 31.1 151.7l88.8 49.5c21.3-64.4 81.3-112.2 152.2-93.7z'
                fill='#ea4335'
              />
            </svg>
            Continue with Google
          </Button>

          <p className='mt-6 text-center text-text-light'>
            Already have an account?{' '}
            <Link href='/login' className='text-primary hover:underline'>
              Login
            </Link>
          </p>

          {message && (
            <p
              className={`mt-4 text-center ${
                messageColor === 'green'
                  ? 'text-green-600'
                  : messageColor === 'red'
                  ? 'text-red-600'
                  : 'text-text-light'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
