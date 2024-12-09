import { useRef } from 'react';
import { motion as m } from 'framer-motion';

import CategoryFilters from './CategoryFilters';
import Button from '../common/Button';

import CloseIcon from '../../assets/icons/icon-close.svg';

import styles from '../main-page/main.module.css';

const FilterPopup = ({ onClose }) => {
  const popupRef = useRef(null);

  const handleOutsideClick = (e) => {
    console.log(popupRef);
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <m.div className='fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50' onClick={handleOutsideClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <m.div ref={popupRef} className='flex flex-col justify-between bg-white rounded-l-lg w-1/3 h-full pb-12' initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ duration: 0.4 }}>
        <div className='flex flex-col'>
          <div className='flex items-center mx-6 my-6'>
            <img src={CloseIcon} alt='close icon' className='cursor-pointer' onClick={onClose} />
            <h2 className='text-lg font-semibold mx-auto'>Фільтрувати</h2>
          </div>
          <hr className='mx-0 my-0 color-gray' />
          <CategoryFilters />
        </div>
        <Button classNameBtn={styles.btn} style={{ marginLeft: '6%', marginRight: '6%' }} type='submit'>
          Переглянути результати
        </Button>
      </m.div>
    </m.div>
  );
};

export default FilterPopup;
