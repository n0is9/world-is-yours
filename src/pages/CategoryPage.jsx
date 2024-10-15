import React, { useEffect, useState } from 'react';
import CategoryList from '../components/category-page/CategoryList';
import FilterPopup from '../components/category-page/FilterPopup';
import Card from '../components/common/Card';
import { $api } from '../api/api';
import { useSelector } from 'react-redux';

import { motion as m } from 'framer-motion';

import MoveUp from '../components/common/MoveUp';
import Button from '../components/common/Button';

import arrowUp from '../assets/icons/arrow-up.svg';

const CategoryPage = () => {
  const [categoryId, setCategoryId] = useState(null);
  const filters = useSelector((state) => state.categryFilter);

  let query = {};

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const [arrivals, setArrivals] = useState([]);

  const [page, setPage] = useState(1);
  const [next, setNext] = useState('true');

  // fetch product
  const fetchData = async (page_size, page) => {
    try {
      if (filters.category) {
        query.category = '&category=' + filters.category;
      }

      if (filters.subcategory) {
        query.subcategory = '&subcategory=' + filters.subcategory;
      }
      if (query.subcategory) {
        delete query.category;
      }

      let queryString = Object.values(query).join('');
      console.log(queryString);
      const response = await $api.get(`/api/products/?page_size=${page_size}&page=${page}${queryString}`);
      setNext(response.data.next);
      // setArrivals((currentArrivals) => [...currentArrivals, ...response.data.results]);
      setArrivals(response.data.results);
      console.log(arrivals, 'arrivals');
      console.log(response.data, 'data');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(8, page);
  }, [page, filters]);

  // Pagination
  const pages = [1, 2, 3, 4, 5];

  const setNewPage = (direction) => {
    if (page !== 1 && direction === -1) {
      setPage(page + direction);
    } else if (page !== pages.length && direction === +1) {
      setPage(page + direction);
    }
  };

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <CategoryList />
      {isPopupOpen && <FilterPopup onClose={handleTogglePopup} />}
      <div className='grid grid-flow-row-dense gap-4 mx-10 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center'>
        {arrivals.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
      {arrivals.length > 0 ? (
        <>
          <div className='pagination flex justify-center items-center py-10 my-12'>
            <Button onClickBtn={() => setNewPage(-1)}>
              <img src={arrowUp} alt='previous page button' className={`rotate-[270deg] ${page === 1 ? 'invert cursor-default' : ''}`} />
            </Button>
            <ul className='flex gap-5 mx-[100px]'>
              {pages.map((pageBtn) => {
                return (
                  <li>
                    <Button key={pageBtn.id} classNameBtn={`text-xl font-sans ${pageBtn === page ? 'text-black' : 'text-gray'}`} onClickBtn={() => setPage(pageBtn)}>
                      {pageBtn}
                    </Button>
                  </li>
                );
              })}
            </ul>
            <Button onClickBtn={() => setNewPage(+1)}>
              <img src={arrowUp} alt='next page button' className={`rotate-90 ${page === pages.length ? 'invert cursor-default' : ''}`} />
            </Button>
          </div>

          <hr className='text-gray w-[95%] mx-auto' />

          <MoveUp />
        </>
      ) : (
        <p>No DATA</p>
      )}
    </m.div>
  );
};

export default CategoryPage;
