import React, { useEffect, useState } from 'react';
import { $api } from '../api/api';

import Container from '../components/common/container';
import PhotoGallery from '../components/product/PhotoGallery';
import FilterList from '../components/product/FilterList';
import PreviousPage from '../components/common/PreviousPage';
import MoveUp from '../components/common/MoveUp';
import Card from '../components/common/Card';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/products/productsSelectors';
import Loader from '../components/common/Loader';
import { fetchOneProduct } from '../redux/products/productsOperations';

const ProductPage = () => {
  const dispatch = useDispatch();
  // =========== видалити після оновлення данних в бекенді !!!!
  const colors = [
    { name: 'red', color: '#f01111' },
    { name: 'green', color: '#3df011' },
    { name: 'blue', color: '#1a24eb' },
    { name: 'yellow', color: '#ecf011' },
    { name: 'gray', color: '#b5b5b1' },
    { name: 'black', color: '#000' },
    { name: 'white', color: '#fff' },
  ];
  const sizes = [
    { name: 36, quantity: 5 },
    { name: 37, quantity: 0 },
    { name: 38, quantity: 4 },
    { name: 39, quantity: 1 },
    { name: 40, quantity: 0 },
    { name: 41, quantity: 6 },
  ];
  const related_products = ['3', '5', '8'];
  // ===================================================

  const { id } = useParams();
  const idNum = parseInt(id, 10);

  const { products, isLoading } = useSelector(getProducts);
  console.log('isLoading: ', isLoading);

  if (!products.length) {
    dispatch(fetchOneProduct(idNum));
  }

  const data = products?.find((item) => item.id === idNum);

  if (!products.length || !data) {
    dispatch(fetchOneProduct(idNum));
  }
  const product = { ...data };

  // =========== видалити після оновлення данних в бекенді !!!!
  product.colors = colors;
  product.sizes = sizes;
  product.related_products = related_products;
  // ===================================================

  const getRelatedList = (arr) => {
    const relatedList = [];

    arr.forEach((element) => {
      const relatedProduct = products.find(
        (item) => item.id.toString() === element.toString(),
      );
      if (relatedProduct) {
        relatedList.push(relatedProduct);
      }
    });
    return relatedList;
  };

  const relatedList = getRelatedList(product.related_products);
  console.log('relatedList: ', relatedList);

  return (
    <Container>
      {((isLoading || !products) && <Loader />) || (
        <>
          <PreviousPage text='Каталог' link='/categories' />
          <div className='flex justify-center items-center mt-20'>
            <div className='flex flex-row gap-20 basis-[1150px]'>
              <PhotoGallery data={product} />
              <FilterList data={product} />
            </div>
          </div>
          <div className='flex flex-col justify-center items-center'>
            {product.related_products.length && (
              <>
                <h1 className='font-raleway font-semibold text-4xl text-left text-grayDark mt-20 mb-10'>
                  Доповни комплект
                </h1>
                <div className='grid grid-flow-row-dense gap-4 mx-10 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center'>
                  {relatedList.map((item) => (
                    <Card data={item} key={item.id} />
                  ))}
                </div>
              </>
            )}
            {product.seen_products && (
              <>
                <h1 className='font-raleway font-semibold text-4xl text-left text-grayDark mt-20 mb-10'>
                  Вже переглянуте
                </h1>
                {product.seen_products.map((item) => (
                  <Card data={item} key={item.id} />
                ))}
              </>
            )}
          </div>
        </>
      )}
      <MoveUp />
    </Container>
  );
};

export default ProductPage;
