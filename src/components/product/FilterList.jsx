import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import styles from '../registration-popup/signup.module.css';
import ColorPicker from './ColorPicker';
// import ClothingSizePicker from './ClothingSizePicker';
import SizePicker from './SizePicker';
import AccordionText from './AccordionText';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { $api } from '../../api/api';

import { useDispatch, useSelector } from 'react-redux';
import { addItemCart, removeItemCart } from '../../redux/cartSlice';

const FilterList = ({ data }) => {
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isCart, setCart] = useState('');
  const [btnText, setBtnText] = useState('');

  const { name, price, description } = data;
  const cart = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    setCart(cart.find((item) => item.product && item.product === data.id));
  }, [cart]);

  const toggleCart = async () => {
    if (!isAuthenticated) {
      toast.info('This action is available to registered users only', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      if (!isCart) {
        const response = await $api.post(`/api/baskets/`, { product: data.id });
        dispatch(addItemCart(response.data));
        setBtnText('Товар успішно додано');
      } else {
        const response = await $api.delete(`/api/baskets/${isCart.id}/`);
        dispatch(removeItemCart(data.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isCart) {
      setBtnText('Товар додано в корзину');
    } else {
      setBtnText('Додати товар до корзини');
    }
  });

  return (
    <div className='flex flex-col w-96 gap-5 grow'>
      <div className='flex flex-col w-96 gap-2'>
        <h1 className='font-raleway font-semibold text-2xl text-left text-grayDark'>
          {name}
        </h1>
        <p className='font-sans font-normal text-xl text-left text-grayDark mb-5'>
          {price} грн{' '}
        </p>
        <p className='font-raleway font-light text-l text-left text-grayDark'>
          {description}
        </p>
      </div>
      <div className=''>
        <p>
          <span>Колір</span>{' '}
          <span
            className='text-gray underline'
            style={{ color: selectedColor }}
          >
            {selectedColor}
          </span>
        </p>

        <div className='flex flex-row'>
          <ColorPicker
            colors={data.colors}
            setColor={setSelectedColor}
            selectedColor={selectedColor}
          />
        </div>
      </div>
      <hr className='text-gray border-1' />
      <ToastContainer />
      <div>
        <p>Розмір</p>
        <SizePicker
          sizes={data.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>

      <Button
        classNameBtn={`bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold text-20px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black`}
        onClickBtn={() => toggleCart()}
      >
        {btnText}
      </Button>

      <AccordionText />
    </div>
  );
};

export default FilterList;
