import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/store';

function SignUp(): JSX.Element {
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<null | any>(null);
  const [success, setSuccess] = useState<boolean>(false);

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
      const response: Response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: any = await response.json();

      if (response.status === 201) {
        setSuccess(true);
        setError(null);

        localStorage.setItem('token', JSON.stringify(data.token));

        localStorage.setItem('auth', JSON.stringify(data.user));
        useAuth.getState().setAuth(data.user);

        router.push('/logedin');
      } else {
        setError(data.error || 'An error occurred during registration.');
        setSuccess(false);
      }
    } catch (error) {
      setError('An error occurred during registration.');
      setSuccess(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200'>
      <div className='bg-white p-10 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-96'>
        <h2 className='text-3xl font-extrabold text-gray-900 mb-6'>
          Servi Home Sign Up
        </h2>

        {success && (
          <p className='text-green-600 mb-4 border-l-4 border-green-500 pl-3'>
            Registration successful.
          </p>
        )}
        {error && (
          <p className='text-red-600 mb-4 border-l-4 border-red-500 pl-3'>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label className='block text-gray-700 mb-2'>Username:</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent'
              required
            />
          </div>
          <div className='mb-5'>
            <label className='block text-gray-700 mb-2'>Email:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent'
              required
            />
          </div>
          <div className='mb-5'>
            <label className='block text-gray-700 mb-2'>Password:</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          >
            Sign Up
          </button>
          <p className='mt-5 text-gray-600'>
            <Link href='/login' className='text-blue-600 hover:underline'>
              Already have an account? Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
