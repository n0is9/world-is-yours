import React from 'react';
import PhotoGallery from '../components/product/PhotoGallery';
import FilterList from '../components/product/FilterList';
import PreviousPage from '../components/common/PreviousPage';
import MoveUp from '../components/common/MoveUp';

import { motion as m } from 'framer-motion';

const ProductPage = () => {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <PreviousPage text='Каталог' link='/categories' />
      <div className='flex justify-center items-center mt-20'>
        <div className='flex flex-row gap-20 basis-[1150px]'>
          <PhotoGallery />
          <FilterList />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center '>
        <h1 className='font-raleway font-semibold text-4xl text-left text-grayDark mt-20 mb-10'>Доповни комплект</h1>
        {/*  map of cards, + 4 товари на вибір до основного  */}
        <h1 className='font-raleway font-semibold text-4xl text-left text-grayDark mt-20 mb-10'>Вже переглянуте</h1>
        {/*  map of cards, + 4 товари, які юзер вже переглянув  */}
      </div>
      <MoveUp />
    </m.div>
  );
};

export default ProductPage;
