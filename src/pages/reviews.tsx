import React, { useState, useEffect } from 'react';
import { Reviews } from '../types';
import { useAuth } from '../lib/store';

function ReviewForm(): JSX.Element {
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const user = useAuth((state) => state.auth);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response: Response = await fetch('/api/reviews');
        const data = await response.json();

        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error('Received non-array data:', data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, name, content }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setReviews([...reviews, data.review]);
        setTitle('');
        setName('');
        setContent('');
      } else {
        console.error('Failed to create review');
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <div className='bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='flex flex-col gap-4 mt-8 w-full max-w-2xl'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className='bg-white p-4 rounded shadow-md border border-gray-200 transform transition-transform duration-300 hover:scale-102'
          >
            <h3 className='text-xl text-black font-semibold mb-2'>
              {review.title}
            </h3>
            <p className='text-gray-800 font-medium'>{review.name}</p>
            <p className='text-gray-700 mt-2'>{review.content}</p>
          </div>
        ))}
      </div>
      {user && <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg m-4 shadow-md max-w-md w-full transform transition-transform duration-300 hover:scale-105'
      >
        <h2 className='text-2xl text-black font-semibold mb-6 border-b pb-2'>
          Submit Your Review
        </h2>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-1'>*Title:</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='block w-full p-2 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-400'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-1'>*Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='block w-full p-2 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-400'
            required
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 mb-1'>*Review Content:</label>
          <textarea
            name='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='block w-full p-2 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-400 h-32 resize-none'
            required
          ></textarea>
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700 transition-colors duration-300'
        >
          Submit Review
        </button>
      </form>}
      
    </div>
  );
}

export default ReviewForm;
