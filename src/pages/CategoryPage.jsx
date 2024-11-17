import React, { useEffect, useState } from 'react';
import { $api } from '../api/api';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../components/common/container.jsx';
import CategoryList from '../components/category-page/CategoryList';
import FilterPopup from '../components/category-page/FilterPopup';
import Card from '../components/common/Card';
import MoveUp from '../components/common/MoveUp';
import Button from '../components/common/Button';
import arrowUp from '../assets/icons/arrow-up.svg';
import Pagination from '../components/category-page/Pagination.jsx';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from '../redux/products/productsSelectors.js';
import { fetchProducts } from '../redux/products/productsOperations.js';

const categoryList = [
  { categoryId: 0, name: 'all' },
  { categoryId: 1, name: 'foryou' },
  { categoryId: 2, name: 'forthemotorhome' },
  { categoryId: 3, name: 'additional' },
  { categoryId: 4, name: 'specialdeals' },
];

const CategoryPage = ({ setPreviousURL }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  useEffect(() => {
    const currentURL = location.pathname + location.search;
    setPreviousURL(currentURL); // Зберігає поточний URL перед зміною
  }, [location]);

  const dispatch = useDispatch();

  const { products, productsCount } = useSelector(getProducts);
  const filters = useSelector((state) => state.categryFilter);

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
      if (categoryId) {
        query.subcategory = `&subcategory=${categoryId}`;
      }

      let queryString = Object.values(query).join('');
      dispatch(fetchProducts({ page_size, page, queryString }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(perPage, page, categoryId);
  }, [page, filters, categoryId, searchParams]);

  // Pagination
  const pages = [];
  const totalPages = Math.ceil(productsCount / perPage);

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
        {products?.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
      {products?.length > 0 ? (
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
