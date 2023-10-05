import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth, useCleaner } from '../lib/store';

interface FormData {
  email: string;
  password: string;
}

interface LoginData {
  error?: string;
}

function Login(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/cleanerlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      localStorage.setItem('cleaner', JSON.stringify(data));
      localStorage.setItem('token', JSON.stringify(data.token));

      useCleaner.getState().setCleaner(data.cleaner);

      if (response.status === 200) {
        router.push('/cleanerlogedin');
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100'>
      <div className='bg-white p-10 rounded-lg shadow-2xl transform transition-transform hover:scale-105 w-96'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 tracking-tighter'>
          Cleaner Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label className='block text-gray-700 mb-2'>Email:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-3 border text-black border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 mb-2'>Password:</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full p-3 border text-black border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'
              required
            />
          </div>
          {error && (
            <p className='text-red-600 mb-4 border-l-4 border-red-500 pl-3'>
              {error}
            </p>
          )}
          <button
            type='submit'
            className='w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          >
            Login
          </button>
          <p className='mt-6 text-gray-600'>
            Don't have an account?{' '}
            <Link
              href='/cleanersignup'
              className='text-green-600 hover:underline'
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
