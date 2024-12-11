import React from 'react';
import { motion as m } from 'framer-motion';
import HeartIconRed from '../../assets/icons/icon-heart-red.svg';
import Cart from '../../assets/icons/dark/icon-cart-dark.svg';

const SkeletonCard = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
      className='relative border border-gray rounded-2xl overflow-hidden h-full '
    >
      {/* Скелетон сердечка */}
      <div className='absolute top-3 right-3 m-2 z-[9]'>
        <img src={HeartIconRed} alt='heart icon' width='36' />
      </div>
      {/* Скелетон зображення */}
      <div className='w-full h-96 bg-grayLight'></div>
      {/* Скелетон тексту */}
      <div className='p-5'>
        <div className='w-1/3 h-5 bg-grayLight mb-2 rounded-md'></div>
        <div className='w-1/3 h-5 bg-grayLight rounded-md'></div>
      </div>
      {/* Скелетон кошика */}
      <div
        className={`absolute bottom-3 right-3 z-10 flex border rounded-md py-3 px-3 duration-300 `}
      >
        <img src={Cart} alt='cart' />
      </div>
    </m.div>
  );
};

export default SkeletonCard;
