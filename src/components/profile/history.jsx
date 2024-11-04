import React, { useEffect, useState } from 'react';
import { $api } from '../../api/api.js';

import { motion as m } from 'framer-motion';

const History = () => {
  // const [orders, setOrders] = useState([]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      address: '123 Main St, City',
      basket_history: {
        purchased_items: [
          {
            quantity: 1,
            price: 10.0,
            sum: 10.0,
          },
        ],
        total_sum: 10.0,
      },
      created: '2023-01-01T12:00:00Z',
      status: 1,
      initiator: 1,
    },
    {
      id: 2,
      first_name: 'John',
      last_name: 'Doe',
      address: '456 Oak St, Town',
      basket_history: {
        purchased_items: [
          {
            quantity: 2,
            price: 15.0,
            sum: 30.0,
          },
          {
            quantity: 1,
            price: 270.0,
            sum: 270.0,
          },
        ],
        total_sum: 300.0,
      },
      created: '2023-02-01T12:00:00Z',
      status: 3,
      initiator: 1,
    },
  ]);
  // const getOrder = async () => {
  //   try {
  //     const response = await $api.get('/api/orders/');
  //     setOrders(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getOrder();
  // }, [orders]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className=" mb-12 text-blue text-[25px] font-semibold font-['Raleway']">
        Історія замовлень
      </div>
      {orders.length === 0 ? (
        <div className='Order1 w-[1027px] h-[140px] p-5 rounded-[15px] border border-blue flex justify-center items-center'>
          <p className='font-raleway text-[18px] font-semibold text-center text-gray'>
            Замовлень ще немає <br />
            Будь ласка зробіть замовлення!
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className='Order1 w-[1027px] h-[140px] p-5 rounded-[15px] mb-4 justify-between items-start inline-flex'
            style={{
              border: `2px solid ${
                order.status === 1
                  ? '#1D4ED8' // Синій
                  : order.status === 2
                    ? '#EF4444' // Червоний
                    : order.status === 3
                      ? '#10B981' // Зелений
                      : '#6B7280' // Сірий
              }`,
            }}
          >
            <div
              className='InfoContainer w-[454px] self-stretch justify-between items-start gap-5 flex flex-col'
              style={{
                borderLeft: `3px solid ${
                  order.status === 1
                    ? '#1D4ED8' // Синій
                    : order.status === 2
                      ? '#EF4444' // Червоний
                      : order.status === 3
                        ? '#10B981' // Зелений
                        : '#6B7280' // Сірий
                }`,
                paddingLeft: '16px',
              }}
            >
              <div
                className="text-xl font-medium font-['Raleway']"
                style={{
                  color:
                    order.status === 1
                      ? '#1D4ED8' // Синій
                      : order.status === 2
                        ? '#EF4444' // Червоний
                        : order.status === 3
                          ? '#10B981' // Зелений
                          : '#6B7280', // Сірий
                }}
              >
                {order.status === 1
                  ? 'В процесі'
                  : order.status === 2
                    ? 'Відмінено'
                    : order.status === 3
                      ? 'Доставлено'
                      : 'Невідомий статус'}
              </div>

              <div className='flex flex-col justify-start items-start  text-zinc-500 text-lg font-medium font-["Raleway"]'>
                <div>Замовлення № {order.id}</div>
                <div>
                  {new Date(order.created).toLocaleDateString('uk-UA', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>

            <div className='PriceContainer w-[100px] flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className="text-black text-lg font-medium font-['Raleway']">
                Всього
              </div>
              <div className="text-black text-lg font-medium font-['Raleway']">
                {order.basket_history.total_sum} грн.
              </div>
            </div>
            <div className='ImageContainer h-[100px] justify-start items-start gap-2.5 flex'>
              <img
                className='TrekkingShoes w-[100px] h-[100px] bg-stone-300 rounded-lg justify-center items-center flex'
                src='https://via.placeholder.com/113x170'
                alt='img'
              />
            </div>
          </div>
        ))
      )}
    </m.div>
  );
};

export default History;
