import React from 'react';
// import order from '../../assets/temporary-img/tent.png';
import ArrowDown from '../../assets/icons/arrow-up.svg';
import { useEffect, useState } from 'react';
import DeleteIcon from '../../assets/icons/icon-trash.svg';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemCart, updateQuantityCart } from '../../redux/cartSlice.js';
import { $api } from '../../api/api.js';

const UserOrder = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  const [total, setTotal] = useState(0);
  const [upd, setUpd] = useState(0);
  const [basket, setBasket] = useState(0);

  const fetchBasket = async () => {
    try {
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
    if (!product) return;

    const newQuantity =
      action === 'increment' ? product.quantity + 1 : product.quantity - 1;

    if (newQuantity > 0) {
      updBasket(productId, newQuantity);
    }
    console.log('product', product);
    dispatch(updateQuantityCart({ product: productId, quantity: newQuantity }));
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
  const calculateTotalPrice = () => {
    const subtotal = cart
      .reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0)
      .toFixed(2);

    //const discount = subtotal * 0.05; // 5% знижка
    const discount = 0;
    const delivery = 0; // Доставка

    const totalPrice = subtotal - discount + delivery;
    return totalPrice;
  };

  return (
    <div className='border text-blue rounded-xl p-7 max-h-[90vh]'>
      <div className='mt-2'>
        <div className='flex flex-row justify-between text-custom-black'>
          <h1 className='font-raleway font-semibold text-20px'>
            Ваше замовлення
          </h1>
          <p className='font-raleway font-semibold text-20px text-blue'>
            {calculateTotalPrice()} грн
          </p>
        </div>
        <hr className='mt-6 mb-6 text-blue' />
        <div className='scrolnan overflow-auto max-h-80 pr-4'>
          {cart.length === 0 ? (
            <p className='text-custom-black text-lg mx-8 my-10 '>
              Нажаль, ви ще нічого не замовили :(
            </p>
          ) : (
            <>
              {cart.map((product) => (
                <React.Fragment key={product.id}>
                  <div className='flex flex-row justify-between text-custom-black'>
                    <div className='flex flex-row mr-20'>
                      <img
                        src={product.image_1}
                        alt={product.name}
                        className='w-32 h-32 rounded-lg'
                      />
                      <div className='flex flex-col ml-4 justify-center gap-8'>
                        <p className='font-medium text-lg'>{product.name}</p>
                        <div className='text-gray gap-2'>
                          <p className='text-grey font-light text-base'>
                            Розмір:
                            {product.size}
                          </p>
                          <p className='text-grey font-light text-base'>
                            Колір: {product.color}
                          </p>
                          <p className='flex flex-row text-gray font-light text-base'>
                            Кількість:
                            <img
                              className='w-3 mr-2 rotate-180 ml-4 mr-4 cursor-pointer'
                              src={ArrowDown}
                              alt='arrow down'
                              onClick={() =>
                                handleQuantityChange(
                                  product.basketId,
                                  'decrement',
                                )
                              }
                            />
                            {product.quantity}
                            <img
                              className='w-3 mr-2 rotate-0 ml-4 cursor-pointer'
                              src={ArrowDown}
                              alt='arrow up'
                              onClick={() =>
                                handleQuantityChange(
                                  product.basketId,
                                  'increment',
                                )
                              }
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-between items-end'>
                      <p className='text-gray text-lg'>
                        {product.price * product.quantity}{' '}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(product.basketId)}
                      >
                        <img
                          className='w-5 h-5 cursor-pointer'
                          src={DeleteIcon}
                          alt='delete'
                        />
                      </button>
                    </div>
                  </div>
                  <hr className='text-gray mt-3 mb-3' />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
        <hr className='mt-3 mb-6 text-blue' />
        <div className='flex flex-row justify-between  text-custom-black'>
          <div className='flex flex-col gap-2 text-lg'>
            <p className='text-gray'>Підсумок:</p>
            <p className='text-gray'>Знижка:</p>
            <p className='text-gray'>Доставка:</p>
          </div>
          <div className='flex flex-col text-right'>
            <p className='text-gray mb-3'>{calculateTotalPrice()} грн</p>
            <p className='text-gray mb-3'>0 грн</p>
            <p className='text-gray mb-3'>0 грн</p>
          </div>
        </div>
        <hr className='mt-4 mb-4' />
        <div className='flex flex-row justify-between'>
          <p className='font-semibold text-xl text-custom-black font-raleway'>
            Всього:
          </p>
          <p className='font-semibold text-xl text-custom-black'>
            {calculateTotalPrice()} грн
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
