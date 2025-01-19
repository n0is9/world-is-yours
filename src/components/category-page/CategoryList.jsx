import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSubcategory } from '@redux/categoryParamsSlice';

import { $api } from '@api/api';

import FilterPopup from './FilterPopup';

import Filter from '@assets/icons/icon-filters.svg';

const CategoryList = ({ setPage }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryName = searchParams.get('category') || 'all';

  const fetchCategories = async () => {
    try {
      const response = await $api.get('/api/products/category/');

      setCategories(response.data);
      setSelectedFilter(response.data[0].id);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async () => {
    const response = await $api.get('/api/products/subcategory/');
    const filteredProducts = response.data.filter((item) => item.category === selectedFilter);

    setSubCategories(filteredProducts);
    // console.log(response.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, [categories, selectedFilter]);
  // set category
  // const handleCategoryClick = (id) => {
  //   dispatch(setCategory(id));
  //   dispatch(setSubcategory(null));
  //   setSelectedFilter(id);
  //   setSelectedSubCategory(null);
  // };

  // set sub category
  const handleSubCategoryClick = (id) => {
    dispatch(setSubcategory(id));
    setSelectedSubCategory(id);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // console.log(categories);
  const changeCategory = (category) => {
    navigate(`?category=${category}&page=1`);
    // setPage(1);
  };

  return (
    <div className="flex flex-col m-10">
      <h1 className="text-blue text-2xl mb-4 font-semibold">Категорії</h1>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-row gap-6 font-medium items-center">
          {/* categories */}
          <p
            className="text-xl cursor-pointer duration-300 hover:text-neutral-600 focus:underline"
            onClick={() => changeCategory('all')}
            tabIndex="0"
            aria-label="Clickable filter disable"
          >
            Всі
          </p>
          {categories.map((item) => (
            <NavLink
              to={`?category=${item.name.toLowerCase().replace(/ /g, '')}&page=1`}
              key={item.id}
              onClick={() => setPage(1)}
              className={({ isActive }) =>
                isActive || categoryName === item.name.toLowerCase()
                  ? 'text-xl text-custom-black cursor-pointer duration-300 hover:text-neutral-500 focus:underline '
                  : 'hover:text-gray focus:text-gray no-underline'
              }
              tabIndex="0"
              aria-label={`${item.name} tab`}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <img
          src={Filter}
          alt="filter icon"
          className="cursor-pointer p-1 rounded-sm outline-slate-400 focus:outline focus:outline-1"
          onClick={togglePopup}
          tabIndex="0"
        />
      </div>
      <hr className="text-blue my-2" />
      <div className="flex flex-row gap-6">
        {/* sub categories */}
        {subCategories.map((item) => (
          <p
            key={item.id}
            className={`text-base text-gray font-medium cursor-pointer duration-300 hover:text-neutral-600 focus:underline ${selectedSubCategory === item.id ? 'underline text-custom-black' : ''}`}
            onClick={() => handleSubCategoryClick(item.id)}
            tabIndex="0"
          >
            {item.name}
          </p>
        ))}
      </div>
      {isPopupOpen && <FilterPopup onClose={togglePopup} />}
    </div>
  );
};

export default CategoryList;
