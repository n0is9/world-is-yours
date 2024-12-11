import { useState, useEffect, useMemo } from 'react';
import { $api } from '@api/api';
import { useSelector } from 'react-redux';

import { motion as m } from 'framer-motion';

import Card from '@components/common/Card';
import SkeletonCard from '@components/common/SkeletonCard.jsx';
import Container from '@components/common/container';

import NotFound404 from './NotFound404';

const Favorites = () => {
  const wishlist = useSelector((state) => state.wishlist.items);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const newProducts = [];

      for (const id of wishlist) {
        try {
          const response = await $api.get(`/api/products/${id}/`);

          console.log(response);
          const productExists = newProducts.some(
            (product) => product.id === response.data.id,
          );

          console.log(productExists, 'productExists');
          if (!productExists) {
            newProducts.push(response.data);
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }

      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.filter((product) =>
          wishlist.includes(product.id),
        );

        return [
          ...updatedProducts,
          ...newProducts.filter(
            (newProduct) =>
              !updatedProducts.some((product) => product.id === newProduct.id),
          ),
        ];
      });
      setLoading(false);
    };

    if (wishlist.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [wishlist]);

  const memoProducts = useMemo(() => {
    return products;
  }, [products]);

  if (!user.email) {
    console.log('user in store==' + JSON.stringify(user, null, 2));

    return <NotFound404 />;
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Container
        className='justify-center text-grayLight my-12'
        id='sectionFav'
      >
        <div className='flex justify-center gap-2.5 mb-[50px]'>
          <h1 className="text-40px font-semibold text-neutral-800 font-['Raleway']">
            Обрані
          </h1>
        </div>


        <div className='grid grid-flow-row-dense gap-x-5 gap-y-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center'>
          {/* Показуємо скелетони під час завантаження */}
          {loading
            ? wishlist.map((_, index) => <SkeletonCard key={index} />)
            : memoProducts.map((product) => (
                <Card key={product.id} data={product} />
              ))}

        </div>
      </Container>
    </m.div>
  );
};

export default Favorites;
