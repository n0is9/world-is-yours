import { Link } from 'react-router-dom';

import { motion as m } from 'framer-motion';

import Button from '../components/common/Button';

const NotFound404 = () => {
  return (
    <m.div className='bg-page404 h-screen bg-cover flex justify-center items-center ' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className='text-center bg-white p-[40px] rounded-2xl'>
        <p className='text-[100px] font-semibold text-raleway mb-2'>404</p>
        <p className='font-semibold text-2xl'>Упс! Здається виникла помилка </p>
        <Link to='/' className='block w-96 text-white bg-gray-dark mt-8 p-4 border border-slate-950 rounded-xl duration-300 hover:bg-transparent hover:text-custom-black focus:bg-black/[0.95]'>
          <Button classNameBtn='font-bold text-20px'>На головну сторінку</Button>
        </Link>
      </div>
    </m.div>
  );
};

export default NotFound404;
