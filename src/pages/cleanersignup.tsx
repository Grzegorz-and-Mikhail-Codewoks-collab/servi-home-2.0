import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

function CleanerSignUp(): JSX.Element {
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      const response: Response = await fetch('/api/cleanersignup', {
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

        router.push('/cleanerlogedin');
      } else {
        setError(data.error || 'An error occurred during registration.');
        setSuccess(false);
      }
    } catch (error: any) {
      setError(error || 'An error occurred during registration.');
      setSuccess(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-200 to-gray-100'>
      <div className='bg-white p-10 rounded-xl shadow-2xl transform transition-transform hover:scale-105 w-96'>
        <h2 className='text-3xl font-extrabold text-gray-900 mb-6'>
          Cleaner Sign Up
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
              className='w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent'
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
              className='w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent'
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
              className='w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          >
            Sign Up
          </button>
          <p className='mt-5 text-gray-600'>
            <Link
              href='/cleanerlogin'
              className='text-green-600 hover:underline'
            >
              Already have an account? Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CleanerSignUp;
