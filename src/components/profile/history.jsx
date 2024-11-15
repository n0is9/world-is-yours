import React, { useEffect, useState } from 'react';
import { $api } from '../../api/api.js';

import { motion as m } from 'framer-motion';

const History = () => {
  const [orders, setOrders] = useState([]);

  // const [orders, setOrders] = useState([
  //   {
  //     id: 1,
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     address: {
  //       id: 6,
  //       address_line: 'Main St, 24',
  //       city: 'Kharkiv',
  //       country: 'Ukraine',
  //       zip_code: '221003',
  //     },
  //     basket_history: {
  //       purchased_items: [
  //         {
  //           quantity: 1,
  //           price: 10.0,
  //           sum: 10.0,
  //           product_name: 'T-shirt 2',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/basin.jpg',
  //         },

  //         {
  //           quantity: 1,
  //           price: 10.0,
  //           sum: 10.0,
  //           product_name: 'T-shirt 2',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/t-shirt2.jpg',
  //         },
  //         {
  //           quantity: 1,
  //           price: 10.0,
  //           sum: 10.0,
  //           product_name: 'T-shirt 2',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/t-shirt1.jpg',
  //         },
  //         {
  //           quantity: 1,
  //           price: 10.0,
  //           sum: 10.0,
  //           product_name: 'T-shirt 2',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/t-shirt2.jpg',
  //         },
  //       ],
  //       total_sum: 10.0,
  //     },
  //     created: '2023-01-01T12:00:00Z',
  //     status: 1,
  //     initiator: 1,
  //   },
  //   {
  //     id: 2,
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     address: {
  //       id: 6,
  //       address_line: 'Main St, 24',
  //       city: 'Kharkiv',
  //       country: 'Ukraine',
  //       zip_code: '221003',
  //     },
  //     basket_history: {
  //       purchased_items: [
  //         {
  //           quantity: 2,
  //           price: 15.0,
  //           sum: 30.0,
  //           product_name: 'T-shirt 2',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/basin.jpg',
  //         },
  //         {
  //           quantity: 2,
  //           price: 15.0,
  //           sum: 30.0,
  //           product_name: 'T-shirt 2',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/t-shirt1.jpg',
  //         },

  //         {
  //           quantity: 1,
  //           price: 270.0,
  //           sum: 270.0,
  //           product_name: 'T-shirt 2',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/t-shirt2.jpg',
  //         },
  //       ],
  //       total_sum: 300.0,
  //     },
  //     created: '2023-02-01T12:00:00Z',
  //     status: 3,
  //     initiator: 1,
  //   },
  //   {
  //     id: 4,
  //     address: {
  //       id: 6,
  //       address_line: 'Main St, 24',
  //       city: 'Kharkiv',
  //       country: 'Ukraine',
  //       zip_code: '221003',
  //     },
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     basket_history: {
  //       total_sum: 65.97,
  //       purchased_items: [
  //         {
  //           sum: 19.99,
  //           price: 19.99,
  //           quantity: 1,
  //           product_name: 'T-shirt 1',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/t-shirt1.jpg',
  //         },
  //         {
  //           sum: 45.98,
  //           price: 22.99,
  //           quantity: 2,
  //           product_name: 'T-shirt 2',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/t-shirt2.jpg',
  //         },
  //         {
  //           quantity: 2,
  //           price: 15.0,
  //           sum: 30.0,
  //           product_name: 'T-shirt 2',
  //           product_image:
  //             'https://backet-for-world-is-yours.s3.amazonaws.com/products_images/basin.jpg',
  //         },
  //       ],
  //     },
  //     created: '2024-11-06T12:50:13.742845Z',
  //     status: 2,
  //     initiator: 11,
  //   },
  // ]);

  const getOrder = async () => {
    try {
      const response = await $api.get('/api/orders/');
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const [visibleImages, setVisibleImages] = useState(() =>
    orders.length > 0
      ? orders.reduce((acc, order) => {
          acc[order.id] = 2; // Спочатку для кожного замовлення показується 2 зображення
          return acc;
        }, {})
      : {},
  );

  const showMoreImages = (orderId) => {
    setVisibleImages((prev) => ({
      ...prev,
      [orderId]: prev[orderId] + 2, // Додаємо 2 зображення для поточного замовлення
    }));
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-12 text-blue text-[25px] font-semibold font-['Raleway']">
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
        <div className='max-h-[420px] overflow-y-auto'>
          {orders.map((order) => {
            // Перевіряємо, чи basket_history не є порожнім об'єктом і чи містить purchased_items
            const hasPurchasedItems =
              order.basket_history &&
              Object.keys(order.basket_history).length > 0 &&
              Array.isArray(order.basket_history.purchased_items) &&
              order.basket_history.purchased_items.length > 0;

            return (
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
                          ? '#1D4ED8'
                          : order.status === 2
                            ? '#EF4444'
                            : order.status === 3
                              ? '#10B981'
                              : '#6B7280',
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

                  <div className="flex flex-col justify-start items-start text-zinc-500 text-lg font-medium font-['Raleway']">
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
                    {order.basket_history?.total_sum || 0} грн.
                  </div>
                </div>

                {hasPurchasedItems && (
                  <div className='ImageContainer h-[100px] w-[320px] justify-start items-start gap-2.5 flex'>
                    {/* Оновлений код для відображення лише наступних 2 зображень */}
                    {order.basket_history.purchased_items
                      .slice(
                        visibleImages[order.id] - 2, // Показуємо тільки 2 нових зображення
                        visibleImages[order.id], // Оновлені зображення
                      )
                      .map((item, index) => (
                        <img
                          key={index}
                          className='TrekkingShoes w-[100px] h-[100px] bg-stone-300 rounded-lg'
                          src={item.product_image}
                          alt={`product-${index}`}
                        />
                      ))}

                    {/* Кнопка для додавання ще 2 зображень */}
                    {order.basket_history.purchased_items.length >
                      visibleImages[order.id] && (
                      <button
                        onClick={() => showMoreImages(order.id)}
                        className='show-more-button text-grey font-bold w-[100px] h-[100px] border-2 border-grey rounded-md cursor-pointer'
                      >
                        +2
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </m.div>
  );
};

export default History;
