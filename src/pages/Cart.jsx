import React, { useState, useEffect } from 'react';
import CartItem from '../components/cart/CartItem';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

import { motion as m } from 'framer-motion';
import { $api } from '../api/api';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [upd, setUpd] = useState(0);
  const [basket, setBasket] = useState(0);

  const fetchBasket = async () => {
    try {
      const basketResponse = await $api.get(`/api/baskets/`);
      const basketItems = basketResponse.data;
      setBasket(basketItems);
      console.log(basketResponse.data);

      let newTotal = 0; // Змінна для зберігання загальної вартості корзини

      const productRequests = basketItems.map((item) =>
        $api.get(`/api/products/${item.product}/`).then((response) => {
          const productData = {
            ...response.data,
            quantity: item.quantity,
            basketId: item.id,
          };
          newTotal += productData.price * item.quantity; // Додавання вартості цього продукту в загальну суму
          return productData;
        }),
      );

      const products = await Promise.all(productRequests);
      setCart(products);
      setTotal(newTotal.toFixed(2)); // Оновлення стану загальної суми
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, [upd]);

  const updBasket = async (id) => {
    const quantity = 2;
    try {
      const basketUpdReq = await $api.put(`/api/products/${id}/`, quantity);
      basketUpdReq.then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveAllItems = async () => {
    try {
      console.log(basket);
      // Створюємо масив промісів для кожного запиту на видалення
      const deleteRequests = basket.map((item) => {
        console.log(item);
        $api.delete(`/api/baskets/${item.id}/`);
      });

      // Чекаємо на завершення всіх запитів
      await Promise.all(deleteRequests);

      console.log('All items removed');
      setUpd(Math.floor(Math.random() * 100) + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await $api.delete(`/api/baskets/${id}/`).then((response) => {
        setUpd(Math.floor(Math.random() * 100) + 1);
      });
    } catch (error) {
      console.log(error);
      setUpd(Math.floor(Math.random() * 100) + 1);
    }
  };

  const handleQuantityChange = (productId, action) => {
    if (action === 'increment') {
      console.log('increment', productId);
      updBasket(productId);
    } else if (action === 'decrement') {
      console.log('decrement', productId);
    }
  };

  if (cart.length === 0) {
    return (
      <div className='w-full flex justify-center items-center flex-col mt-20 mb-60'>
        <p className='font-raleway font-semibold text-4xl mb-20'>Кошик</p>
        <p className='font-raleway text-18px font-semibold text-center text-gray mt-10'>
          Кошик порожній. <br /> Додайте товари, які вас цікавлять!
        </p>
        <Link to='/'>
          <Button classNameBtn='w-22 bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold text-20px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black' nameBtn='submitForm' valueBtn='submit' type='submit'>
            На головну сторінку
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className='w-8/12 mx-auto mt-16 mb-10'>
        <div className='flex justify-between items-center relative'>
          <p className='font-raleway font-semibold text-40px mx-auto'>Кошик</p> <span className='hidden'>{upd}</span>
          <p className='absolute end-0 font-raleway font-normal text-lg cursor-pointer hover:underline focus:underline' onClick={handleRemoveAllItems} tabIndex='0'>
            Видалити все
          </p>
        </div>

        <div className='cart-container max-h-52 overflow-y-auto'>
          {cart.map((product) => (
            <CartItem key={product.id} product={product} handleQuantityChange={handleQuantityChange} handleRemoveItem={handleRemoveItem} />
          ))}
        </div>
      </div>
      <div className='w-10/12 mx-auto'>
        <hr className='text-gray' />

        <div className='flex flex-row text-center items-center my-10'>
          <Button classNameBtn='w-9/12 bg-transparent border-blue border-dashed text-blue duration-300 p-4 border rounded-xl font-normal text-18px hover:text-white hover:bg-blue focus:text-white focus:bg-blue' nameBtn='submitForm' valueBtn='submit' type='submit'>
            Промокод для знижки
          </Button>
          <p className='w-full items-center font-semibold text-xl font-sans'>Всього: {total} грн</p>
          <Button classNameBtn='w-9/12 bg-gray-dark p-4 border rounded-xl font-bold text-18px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black' nameBtn='submitForm' valueBtn='submit' type='submit'>
            Оплатити
          </Button>
        </div>

        <hr className='mb-10 text-gray' />
      </div>
    </m.div>
  );
};

export default Cart;
