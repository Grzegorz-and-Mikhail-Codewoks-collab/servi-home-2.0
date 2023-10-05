import Link from 'next/link';
import { useAuth, useCleaner } from '../lib/store';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Layout = ({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);

  const user = useAuth((state) => state.auth);
  const cleaner = useCleaner((state) => state.cleaner);
  const router = useRouter();

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken ?? null);

      //Redirect logic
      if (!storedToken && router.pathname.endsWith('/cleanerlogedin')) {
        router.push('/cleanerlogin');
      }

      if (!storedToken && router.pathname.endsWith('/logedin')) {
        router.push('/login');
      }
    }
  }, [token, router.pathname]);

  const onLogout = (e: React.MouseEvent): void => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('cleaner');
    useAuth.getState().removeAuth();
    useCleaner.getState().removeCleaner();
    router.push('/');
  };

  return (
    <div className='bg-gray-900 font-sans text-gray-200'>
      <header className='p-6 flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <img
            src='/home.png'
            alt='Logo'
            width={50}
            height={50}
            className='rounded shadow-lg transform hover:scale-105 transition-transform duration-200'
          />
          <h1 className='text-4xl font-semibold text-yellow-500'>Servi Home</h1>
        </div>

        {/* Navigation */}
        <nav className='flex items-center space-x-6'>
          <Link
            href='/'
            className='hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200'
          >
            Home
          </Link>
          <Link
            href='/reviews'
            className='hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200'
          >
            Reviews
          </Link>

          <Link
            href='/services'
            className='hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200'
          >
            Services
          </Link>

          {!!cleaner ? (
            <>
              <button
                onClick={(e) => onLogout(e)}
                className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors duration-200'
              >
                Log Out
              </button>

              <Link
                href='/cleanerlogedin'
                className='hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200'
              >
                Cleaner Dashboard
              </Link>
            </>
          ) : user ? (
            <>
              <button
                onClick={(e) => onLogout(e)}
                className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors duration-200'
              >
                Log Out
              </button>

              <Link
                href='/logedin'
                className='hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200'
              >
                Orders Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href='/cleanerlogin'
                className='hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200'
              >
                Cleaner Log In
              </Link>

              <Link
                href='/login'
                className='hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200'
              >
                User Log In
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className='mt-8'>{children}</main>
    </div>
  );
};

export default Layout;
