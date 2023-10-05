import React from 'react';

export default function Service(): JSX.Element {
  return (
    <div className='bg-zinc-400 p-12 flex flex-col text-white h-screen items-center space-y-16'>
      <h2 className='text-5xl mb-6 text-center font-bold font-serif tracking-wider'>
        Our Services
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl w-full'>
        <div className='bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-2'>
          <h3 className='text-2xl mb-4 text-black text-center font-semibold'>
            Revitalize Your Rugs
          </h3>
          <img
            src='/rugs.jpeg'
            alt='Rugs'
            width={250}
            height={250}
            className='rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 border-2 border-yellow-500 p-1 mb-4'
          />
          <p className='text-sm text-gray-700 text-center '>
            Our skilled team brings life back to your beloved rugs, removing
            dirt, stains, and odors with precision. Using advanced techniques
            and eco-friendly solutions, we restore the beauty and freshness of
            your rugs, ensuring they stand the test of time.
          </p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between'>
          <h3 className='text-2xl mb-4 text-black text-center font-semibold'>
            Renew Your Furniture
          </h3>
          <img
            src='/mueble.webp'
            alt='Furniture'
            width={250}
            height={250}
            className='rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 border-2 border-yellow-500 p-1 mb-4'
          />
          <p className='text-sm text-gray-700 text-center'>
            Our dedicated experts breathe new life into your furniture, erasing
            years of wear and tear. We go beyond surface cleaning, tackling
            deep-seated stains and allergens, ensuring your furniture not only
            looks fantastic but also feels fresh and inviting.
          </p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-2'>
          <h3 className='text-2xl mb-4 text-black text-center font-semibold'>
            Elevate Your Tabletops
          </h3>
          <img
            src='/table.webp'
            alt='Tabletops'
            width={250}
            height={250}
            className='rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 border-2 border-yellow-500 p-1 mb-4'
          />
          <p className='text-sm text-gray-700 text-center '>
            We specialize in enhancing the natural beauty of your tables,
            transforming them into stunning focal points of your space. Our
            skilled artisans bring out the richness of wood, creating a lustrous
            finish that exudes elegance.
          </p>
        </div>
      </div>
    </div>
  );
}
