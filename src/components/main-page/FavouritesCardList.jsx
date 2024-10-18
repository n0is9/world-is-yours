import React, { useEffect, useState } from 'react';

import { $api } from '../../api/api';
import useTranslation from '../../locale/locales';

import Container from '../common/container';
import Card from '../common/Card';
const FavoritesCardList = () => {
  const t = useTranslation();
  const [products, setProducts] = useState([]);

  const fetchData = async (page_size, page) => {
    try {
      const response = await $api.get(`/api/products/?page_size=${page_size}&page=${page}`);
      // #devnote add favorite fiter
      setProducts((currentProduct) => [...currentProduct, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(8, 1);
  }, []);

  return (
    <Container className='justify-center text-grayLight' id='sectionFav'>
      <h1 className='flex items-center justify-center mt-20 mb-10 font-raleway text-custom-black text-30px'>{t('Our favourites')}</h1>
      <div className='grid grid-flow-row-dense gap-x-5 gap-y-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center'>
        {products.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesCardList;
