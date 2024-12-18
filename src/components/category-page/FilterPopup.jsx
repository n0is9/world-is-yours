import { useRef, useState } from 'react';
import CategoryFilters from './CategoryFilters';
import Button from '@common/Button';
import { motion as m } from 'framer-motion';
import CloseIcon from '@assets/icons/icon-close.svg';

import styles from '../main-page/main.module.css';
import { useDispatch } from 'react-redux';
import {
  resetFilters,
  setOrdering,
  setIsOnSale,
  setPrice,
  setSpec,
} from '@redux/categoryParamsSlice.js';

const FilterPopup = ({ onClose }) => {
  const popupRef = useRef(null);

  const activeFiltersDefaultState = {
    1: {
      active: [],
      count: 0,
    },
    2: {
      active: [],
      count: 0,
    },
    3: {
      active: [],
      count: 0,
    },
    4: {
      active: [],
      count: 0,
    },
    totalCount: 0,
  };
  const [activeFilters, setActiveFilters] = useState(activeFiltersDefaultState);

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  const dispatch = useDispatch();

  const resetLocalFilters = () => {
    dispatch(resetFilters());
    setActiveFilters(activeFiltersDefaultState);
  };

  const handleSubmit = () => {
    console.log(activeFiltersDefaultState.totalCount);

    const { 1: filter1, 2: filter2, 3: filter3, 4: filter4 } = activeFilters;

    if (filter1.active.length > 0) {
      filter1.active.includes('is_on_sale')
        ? dispatch(setIsOnSale(true))
        : dispatch(setIsOnSale(false));

      filter1.active.includes('created_at') && dispatch(setOrdering('-created_at'));
      filter1.active.includes('price') && dispatch(setOrdering('price'));
      filter1.active.includes('-price') && dispatch(setOrdering('-price'));
    }

    if (filter2.active.length > 0) {
      const gender =
        filter2.active.includes('male') && filter2.active.includes('female')
          ? 'Unisex'
          : filter2.active.includes('male')
            ? 'Male'
            : 'Female';

      dispatch(setSpec({ Gender: gender }));
    }

    if (filter3.active.length > 0) {
      const lastSize = filter3.active[filter3.active.length - 1];

      dispatch(setSpec({ Size: lastSize }));
    }

    if (filter4.active.length > 0) {
      const lastChose = filter4.active[filter4.active.length - 1];

      dispatch(setPrice(lastChose));
    }
  };

  return (
    <m.div
      className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <m.div
        ref={popupRef}
        className="flex flex-col justify-between bg-white rounded-l-lg w-1/3 h-full pb-12"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col">
          <div className="flex items-center mx-6 my-6">
            <img src={CloseIcon} alt="close icon" className="cursor-pointer" onClick={onClose} />
            <div className="relative">
              <h2 className="text-2xl font-semibold mx-auto w-80 items-center text-center">
                Фільтри
              </h2>
              {activeFilters.totalCount > 0 && (
                // eslint-disable-next-line max-len
                <p className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[24px] rounded-full bg-blue text-white text-center text-[14px] p-[4px] leading-4">
                  {activeFilters.totalCount}
                </p>
              )}
            </div>
          </div>
          <hr className="mx-0 my-0 color-gray" />
          <CategoryFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
        </div>
        <div className="w-full">
          {activeFilters.totalCount === 0 ? (
            // eslint-disable-next-line max-len
            <div className="bg-grayDark rounded-md text-white py-[10px] text-center w-4/5 mx-auto text-20px font-bold">
              Оберіть фільтрацію
            </div>
          ) : (
            <div className="grid grid-cols-2 px-8 gap-5">
              <Button
                classNameBtn={styles.btnUnfill}
                style={{ padding: '16px 32px' }}
                type="button"
                onClickBtn={resetLocalFilters}
              >
                Очистити
              </Button>
              <Button
                classNameBtn={styles.btn}
                style={{ lineHeight: '1.1', padding: '16px 20px' }}
                type="submit"
                onClickBtn={handleSubmit}
                disabled={activeFilters.totalCount === 0 ? true : false}
              >
                Переглянути результати
              </Button>
            </div>
          )}
        </div>
      </m.div>
    </m.div>
  );
};

export default FilterPopup;
