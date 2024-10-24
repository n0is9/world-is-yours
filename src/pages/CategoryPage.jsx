import React, { useEffect, useState } from 'react';
import { $api } from '../api/api';
import { useSelector } from 'react-redux';

import Container from '../components/common/container.jsx';
import CategoryList from '../components/category-page/CategoryList';
import FilterPopup from '../components/category-page/FilterPopup';
import Card from '../components/common/Card';
import MoveUp from '../components/common/MoveUp';
import Button from '../components/common/Button';
import arrowUp from '../assets/icons/arrow-up.svg';
import Pagination from '../components/category-page/Pagination.jsx';
import { useSearchParams } from 'react-router-dom';

const categoryList = [
  { categoryId: 0, name: 'all' },
  { categoryId: 1, name: 'foryou' },
  { categoryId: 2, name: 'forthemotorhome' },
  { categoryId: 3, name: 'additional' },
  { categoryId: 4, name: 'specialdeals' },
];

const CategoryPage = () => {
  // const [categoryId, setCategoryId] = useState(null);
  const filters = useSelector((state) => state.categryFilter);
  const [arrivals, setArrivals] = useState([]);
  // const [next, setNext] = useState('true');
  const [totalItems, setTotalItems] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  let categoryName = searchParams.get('category') || 'all';
  const { categoryId } =
    categoryList.find((obj) => obj.name === categoryName) || 0;
  let page = Number(searchParams.get('page')) || 1;

  const perPage = 8;
  let query = {};

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // fetch product
  const fetchData = async (page_size, page, categoryId) => {
    try {
      // if (filters.category) {
      //   query.category = '&category=' + filters.category;
      // }

      if (categoryId) {
        query.subcategory = '&subcategory=' + categoryId;
      }
      // if (id) {
      //   query.subcategory = '&category=' + id;
      // }
      // if (query.subcategory) {
      //   delete query.category;
      // }

      let queryString = Object.values(query).join('');
      // console.log(queryString);

      const response = await $api.get(
        `/api/products/?page_size=${page_size}&page=${page}${queryString}`,
      );
      console.log(response.data.results);

      setArrivals(response.data.results);
      setTotalItems(response.data.count);
      // setNext(response.data.next);

      // setArrivals((currentArrivals) => [...currentArrivals, ...response.data.results]);
      console.log(arrivals, 'arrivals');
      console.log(response.data, 'data');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(perPage, page, categoryId);
  }, [page, filters, categoryId, searchParams]);

  // Pagination
  const pages = [];
  const totalPages = Math.ceil(totalItems / perPage);

  const setNewPage = (direction) => {
    if (page !== 1 && direction === -1) {
      searchParams.set('page', Number(page) + direction);
      setSearchParams(searchParams);
    } else if (page !== pages.length && direction === +1) {
      searchParams.set('page', Number(page) + direction);
      setSearchParams(searchParams);
    } else if (direction === 1) {
      searchParams.set('page', 1);
      setSearchParams(searchParams);
    }
  };

  return (
    <Container>
      <CategoryList setPage={setNewPage} />
      {isPopupOpen && <FilterPopup onClose={handleTogglePopup} />}
      <div className='grid grid-flow-row-dense gap-4 mx-10 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center'>
        {arrivals.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
      {arrivals.length > 0 ? (
        <>
          <div className='pagination flex justify-center items-center py-10 my-12'>
            <Button
              onClickBtn={() => setNewPage(-1)}
              disabled={page === 1 ? true : false}
            >
              <img
                src={arrowUp}
                alt='previous page button'
                className={`rotate-[270deg] ${page === 1 ? 'invert cursor-default' : ''}`}
              />
            </Button>

            <Pagination totalPages={totalPages} page={page} />

            <Button
              onClickBtn={() => setNewPage(+1)}
              className='bg-black '
              disabled={page === totalPages ? true : false}
            >
              <img
                src={arrowUp}
                alt='next page button'
                className={`rotate-90 ${page === totalPages ? 'invert cursor-default' : ''}`}
              />
            </Button>
          </div>

          <hr className='text-gray w-[95%] mx-auto' />

          <MoveUp />
        </>
      ) : (
        <p>No DATA</p>
      )}
    </Container>
  );
};

export default CategoryPage;
