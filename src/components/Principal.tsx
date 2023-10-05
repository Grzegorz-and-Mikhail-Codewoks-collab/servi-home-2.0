import Link from 'next/link';
import style from '../styles/Cleaner.module.css';

export default function Principal(): JSX.Element {
  return (
    <div className='font-serif'>
      <div className='bg-gradient-to-r from-zinc-500 to-zinc-600 flex-row p-12 justify-around items-center h-screen text-white flex'>
        <div className='flex flex-col justify-center space-y-8'>
          <p className='text-5xl leading-tight'>
            Transform your space <br />
            into a haven of cleanliness <br />
            and freshness.
          </p>
          <p className='text-3xl'>Your comfort, our priority.</p>
          <button className='bg-yellow-500 text-2xl flex items-center justify-center text-black px-8 py-3 rounded-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative'>
            <Link className='hover:underline' href='/signup'>
              Schedule your cleaner
            </Link>
          </button>
        </div>
        <div className='rounded-full shadow-2xl hover:scale-105 transform transition-transform duration-300 border-4 border-yellow-500 p-1'>
          <img
            className={`${style.image} ${style.customcursor}`}
            src='/cleaning.png'
            alt='Cleaning'
          />
          <img
            className={`${style.upperimage} h-full`}
            src='/cleanerhand.png'
            alt='Cleaninghand'
          />
        </div>
      </div>

      <div className='bg-zinc-400 p-12 flex justify-center text-white'>
        <div className='text-4xl max-w-2xl text-center leading-relaxed font-medium relative'>
          Don't miss the opportunity to elevate your living space to a new level
          of cleanliness and comfort. Try our services today and experience the
          difference for yourself!
          <div className='absolute left-0 right-0 bottom-0 mx-auto h-0.5 bg-white w-3/4'></div>
        </div>
      </div>
    </div>
  );
}
