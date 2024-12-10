import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion as m } from 'framer-motion';

import { $api } from '@api/api';

import { setCategory, setSubcategory } from '@redux/categoryParamsSlice';

import globalStyle from './globalStyles.module.css';

function Categories({ onClose }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await $api.get('/api/products/category/');

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async () => {
    const response = await $api.get('/api/products/subcategory/');
    const filteredProducts = response.data;

    setSubCategories(filteredProducts);
  };

  console.log(subCategories);
  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, [categories]);

  const memoCategories = useMemo(() => {
    return categories;
  }, [categories]);
  const memoSubCategories = useMemo(() => {
    return subCategories;
  }, [subCategories]);

  const handleSubCategoryClick = (id) => {
    dispatch(setSubcategory(id));
    navigate('/categories');
    onClose();
  };

  const handleDocumentClick = (e) => {
    if (!e.target.closest('.Catalog') && !e.target.closest('.catalogue')) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });

  return (
    <m.div
      className={globalStyle.categories}
      initial={{ x: '-50%', y: -10, opacity: 0 }}
      animate={{ x: '-50%', y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className='Catalog bg-white pt-8 px-12 pb-12 text-xl text-custom-black font-semibold rounded-b-2xl'>
        <div className='mb-10'>
          <p className='text-base font-medium pb-2'>
            {memoCategories[0]?.name}
          </p>
          <ul className='flex gap-10'>
            {memoSubCategories
              .filter((item) => item.category == 1)
              .map((item) => (
                <li
                  key={item.id}
                  className='cursor-pointer hover:underline focus:underline focus:outline-0'
                  onClick={() => handleSubCategoryClick(item.id)}
                  tabIndex='0'
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div className='flex justify-between items-baseline mb-8 gap-4'>
          <div>
            <p className='text-base font-medium pb-2'>
              {memoCategories[1]?.name}
            </p>
            <ul
              className={`flex flex-col gap-5 separated-list ${globalStyle.separatedList}`}
            >
              {memoSubCategories
                .filter((item) => item.category == 2)
                .map((item) => (
                  <li
                    key={item.id}
                    className='cursor-pointer hover:underline focus:underline focus:outline-0'
                    onClick={() => handleSubCategoryClick(item.id)}
                    tabIndex='0'
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className='text-base font-medium pb-2'>
              {memoCategories[2]?.name}
            </p>
            <ul className='flex flex-col gap-5'>
              {memoSubCategories
                .filter((item) => item.category == 3)
                .map((item) => (
                  <li
                    key={item.id}
                    className='cursor-pointer hover:underline focus:underline focus:outline-0'
                    onClick={() => handleSubCategoryClick(item.id)}
                    tabIndex='0'
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </m.div>
  );
}

export default Categories;
