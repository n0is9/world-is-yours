import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { $api } from '@api/api';

import {
  removeItemCart,
  clearCart,
  updateQuantityCart,
} from '@redux/cartSlice';

import CartItem from '@components/cart/CartItem';
import Button from '@components/common/Button';
import Container from '@components/common/container';
import SkeletonCart from '@components/common/SkeletonCart.jsx';

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    console.log('cartItems', cartItems);
  }, [cartItems]);

  console.log('cartItems', cartItems);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [upd, setUpd] = useState(0);
  const [basket, setBasket] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBasket = async () => {
    try {
      setLoading(true);
      const basketResponse = await $api.get(`/api/baskets/`);
      const basketItems = basketResponse.data;

      setBasket(basketItems);

      let newTotal = 0;

      const productRequests = basketItems.map((item) =>
        $api.get(`/api/products/${item.product.id}/`).then((response) => {
          const productData = {
            ...response.data,
            quantity: item.quantity,
            basketId: item.id,
          };

          newTotal += productData.price * item.quantity;

          return productData;
        }),
      );

      const products = await Promise.all(productRequests);

      setCart(products);
      setTotal(newTotal.toFixed(2));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, [upd]);

  const updBasket = async (productId, newQuantity) => {
    try {
      await $api.put(`/api/baskets/${productId}/`, { quantity: newQuantity });
      setUpd((prev) => prev + 1); // Trigger re-fetch
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (productId, action) => {
    const product = cart.find((item) => item.basketId === productId);

    if (!product) {
      return;
    }

    const newQuantity =
      action === 'increment' ? product.quantity + 1 : product.quantity - 1;

    if (newQuantity > 0) {
      updBasket(productId, newQuantity);
    }

    console.log('product', product);
    dispatch(updateQuantityCart({ product: productId, quantity: newQuantity }));
  };

  const handleRemoveAllItems = async () => {
    try {
      console.log(basket);
      // Створюємо масив промісів для кожного запиту на видалення
      const deleteRequests = basket.map((item) => {
        console.log(item);
        if (basket.length) {
          console.log(basket.length);
          $api.delete(`/api/baskets/${item.id}/`);
          // .then(() => { });
        }
      });

      // Чекаємо на завершення всіх запитів
      await Promise.all(deleteRequests);
      dispatch(clearCart());
      console.log('All items removed');
      setUpd(Math.floor(Math.random() * 100) + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await $api.delete(`/api/baskets/${id}/`);
      dispatch(removeItemCart(id)); // Видаляємо елемент із Redux
      setUpd((prev) => prev + 1); // Оновлюємо стан для перерендеру
      console.log('cartItems', cartItems);
      setUpd(Math.floor(Math.random() * 100) + 1);
    } catch (error) {
      console.log(error);
      setUpd(Math.floor(Math.random() * 100) + 1);
    }
  };

  useEffect(() => {
    console.log('Loading state:', loading);
  }, [loading]);

  if (loading && cartItems.length > 0) {
    return (
      <Container>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          <div className='w-8/12 mt-12 mb-14 ml-4'>
            <div className='flex justify-center mb-8'>
              <p className='font-raleway font-semibold text-40px'>Кошик</p>
            </div>
            <div className='flex flex-col gap-4'>
              {Array.from({ length: cartItems.length }).map((_, idx) => (
                <SkeletonCart key={idx} />
              ))}
            </div>
          </div>
          <div className='w-10/12'>
            <hr className='text-gray' />

            <div className='flex flex-row text-center items-center justify-end my-10'>
              <p className='w-full items-center font-semibold text-xl font-sans'>
                Всього:
              </p>

              <Button classNameBtn='w-22 bg-grayLight p-4 border rounded-xl font-bold text-18px text-white duration-300 '>
                Оформити замовлення
              </Button>
            </div>

            <hr className='mb-10 text-gray' />
          </div>
        </motion.div>
      </Container>
    );
  }

  if (!loading && cart.length === 0) {
    return (
      <div className='w-full flex justify-center items-center flex-col mt-12 mb-60'>
        <p className='font-raleway font-semibold text-40px mb-20'>Кошик</p>
        <p className='font-raleway text-18px font-semibold text-center text-gray mt-10'>
          Список порожній. <br /> Додайте товари, які вас цікавлять!
        </p>
        <Link to='/'>
          <Button
            classNameBtn='w-22 bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold
            text-20px text-white duration-300 hover:bg-transparent hover:text-black
            focus:bg-transparent focus:text-black'
            nameBtn='submitForm'
            valueBtn='submit'
            type='submit'
          >
            На головну сторінку
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Container>
      <div className='w-8/12 mt-12 mb-14'>
        <div className='flex justify-between items-center relative mb-12'>
          <p className='font-raleway font-semibold text-40px mx-auto'>Кошик</p>{' '}
          <span className='hidden'>{upd}</span>
          <p
            className='absolute end-0 font-raleway font-normal text-lg
            cursor-pointer hover:underline focus:underline'
            onClick={handleRemoveAllItems}
            tabIndex='0'
          >
            Видалити все
          </p>
        </div>

        <div className='cart-container max-h-52 overflow-y-auto'>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              handleQuantityChange={handleQuantityChange}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
      </div>
      <div className='w-10/12'>
        <hr className='text-gray' />

        <div className='flex flex-row text-center items-center justify-end my-10'>
          {/* <Button classNameBtn='w-9/12 bg-transparent border-blue border-dashed text-blue duration-300 p-4 border rounded-xl font-normal text-18px hover:text-white hover:bg-blue focus:text-white focus:bg-blue' nameBtn='submitForm' valueBtn='submit' type='submit'>
            Промокод для знижки
          </Button> */}
          <p className='w-full items-center font-semibold text-xl font-sans'>
            Всього: {total} грн
          </p>
          <Link to='/payment'>
            <Button
              classNameBtn='w-22 bg-gray-dark p-4 border rounded-xl font-bold text-18px text-white
              duration-300 hover:bg-transparent hover:text-black focus:bg-transparent
              focus:text-black'
            >
              Оформити замовлення
            </Button>
          </Link>
        </div>

        <hr className='mb-10 text-gray' />
      </div>
    </Container>
  );
};

export default Cart;
