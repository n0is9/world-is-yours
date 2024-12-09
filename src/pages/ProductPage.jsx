import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { $api } from '../api/api';

import Container from '../components/common/Container';
import PhotoGallery from '../components/product/PhotoGallery';
import FilterList from '../components/product/FilterList';
import PreviousPage from '../components/common/PreviousPage';
import MoveUp from '../components/common/MoveUp';
import Card from '../components/common/Card';

const ProductPage = () => {
  const { id } = useParams();
  const idNum = parseInt(id, 10);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await $api.get(`/api/products/${idNum}/`);
        const data = response.data;
        console.log(data, 'response');
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (idNum) {
      fetchProduct();
    }
  }, [idNum]);

  if (!product) {
    return null;
  }

  return (
    <Container>
      <PreviousPage text='Каталог' link='/categories' />
      <div className='flex justify-center items-center mt-20'>
        <div className='flex flex-row gap-20 basis-[1150px]'>
          <PhotoGallery data={product} />
          <FilterList data={product} />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        {product.related_products && (
          <>
            <h1 className='font-raleway font-semibold text-4xl text-left text-grayDark mt-20 mb-10'>
              Доповни комплект
            </h1>
            {product.related_products.map((item) => (
              <Card data={item} key={item.id} />
            ))}
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
      <MoveUp />
    </Container>
  );
};

export default ProductPage;
