import React, { useEffect } from 'react';
import order from '../../assets/temporary-img/tent.png';
import trash from '../../assets/icons/icon-trash.svg';
import ArrowDown from '../../assets/icons/arrow-up.svg';

const CartItem = ({ product, handleQuantityChange, handleRemoveItem }) => {
  console.log('product: ', product);
  const calculateProductTotal = () => {
    // if (typeof product.discount === "number") {
    //   const discountedPrice = product.price * (1 - product.discount / 100);
    //   return discountedPrice * product.quantity;
    // } else {
    //   return product.price * product.quantity;
    // }
    return null;
  };

  // price
  function calculateDiscountPercentage(oldPrice, price) {
    if (oldPrice <= 0) {
      return 'Немає';
    }
    if (oldPrice <= price) {
      return 'Немає';
    }
    const discount = ((oldPrice - price) / oldPrice) * 100;

    if (discount < 0) {
      return 'Немає';
    }

    return Math.round(discount) + '%';
  }

  useEffect(() => console.log('current product', product), []);

  return (
    <div className='flex flex-row justify-between items-end [&:not(:last-child)]:border-b border-gray p-4'>
      <div className='flex flex-row items-center'>
        <img
          src={product.image_1}
          alt={product.name}
          className='w-36 h-36 rounded-lg mr-4 object-cover'
        />
        <div className='flex flex-col gap-2'>
          <p className='font-medium text-xl'>{product.name}</p>
          <div className='text-gray gap-2'>
            <p className='mt-3 text-grey font-normal text-xl'>
              Розмір: {product.size}
            </p>
            <p className='mt-3 text-grey font-normal text-xl'>
              Колір: {product.color}
            </p>
            <p className='mt-3 flex flex-row items-center text-gray font-normal text-xl'>
              Кількість:
              <img
                className={`w-3 mr-2 duration-300 rotate-180 ml-4 mr-4 cursor-pointer focus:scale-150 ${product.quantity === 1 ? 'invert hover:cursor-default' : 'invert-0'}`}
                src={ArrowDown}
                alt='arrow down(remove one item)'
                onClick={() =>
                  handleQuantityChange(product.basketId, 'decrement')
                }
                tabIndex='0'
              />
              <span className='text-black font-sans'>{product.quantity}</span>
              <img
                className='w-3 mr-2 duration-300 rotate-0 ml-4 cursor-pointer focus:scale-150'
                src={ArrowDown}
                alt='arrow up(add one new item)'
                onClick={() =>
                  handleQuantityChange(product.basketId, 'increment')
                }
                tabIndex='0'
              />{' '}
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <p className=''></p>
        <div className=''>
          <p className='text-gray mt-3 font-normal text-xl'>
            Ціна:{' '}
            <span className='text-black font-sans'>{product.price} грн</span>
          </p>
          <p className='text-gray mt-3 font-normal text-xl'>
            Знижка:{' '}
            <span className='text-black fonst-sans'>
              {/* {product.discount === "Немає" ? product.discount : product.discount + "%"} */}
              {calculateDiscountPercentage(product.old_price, product.price)}
            </span>
          </p>
          <p className='text-gray mt-3 font-semibold text-grayDark text-xl font-sans'>
            Всього: {product.price} грн
          </p>
        </div>
      </div>
      <div>
        <img
          src={trash}
          alt='delete icon'
          className='cursor-pointer w-10 h-10 mb-9 p-2 border border-transparent rounded-lg duration-100 hover:border-slate-400 focus:border-slate-400'
          onClick={() => handleRemoveItem(product.basketId)}
          tabIndex='0'
        />
      </div>
    </div>
  );
};

export default CartItem;
