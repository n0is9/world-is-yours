import { useState } from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';

import ClothingSizePicker from '@components/product/ClothingSizePicker.jsx';

import CloseIcon from '@assets/icons/icon-close.svg';
import { resetFilters } from '@redux/categoryParamsSlice.js';
import { useDispatch } from 'react-redux';

const CategoryFilters = ({ activeFilters, setActiveFilters }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();

  const data = [
    {
      id: 1,
      title: 'Впорядкувати за',
      btn: [
        { name: 'Акції', value: 'is_on_sale', exclusive: false },
        { name: 'Новинки', value: 'created_at', exclusive: true },
        { name: 'Ціна за зростанням', value: 'price', exclusive: true },
        { name: 'Ціна за спаданням', value: '-price', exclusive: true },
      ],
    },
    {
      id: 2,
      title: 'Для кого',
      btn: [
        { name: 'Чоловіки', value: 'male', exclusive: false },
        { name: 'Жінки', value: 'female', exclusive: false },
      ],
    },
    {
      id: 3,
      title: 'Розмір',
      btn: [
        { name: 'XS', value: 'XS', exclusive: true },
        { name: 'S', value: 'Small', exclusive: true },
        { name: 'M', value: 'Medium', exclusive: true },
        { name: 'L', value: 'Large', exclusive: true },
        { name: 'XL', value: 'XL', exclusive: true },
        { name: 'XXL', value: 'XXL', exclusive: true },
      ],
    },

    {
      id: 4,
      title: 'Ціна',
      btn: [
        { name: 'До 500 грн', value: '12', exclusive: true },
        { name: 'До 1000 грн', value: '25', exclusive: true },
        { name: 'До 2000 грн', value: '50', exclusive: true },
        // { name: 'Від 2000 грн', value: '200', exclusive: true },
      ],
    },
  ];

  const toggleAccordion = (id) => {
    setOpenIndex((prevId) => (prevId === id ? null : id));
  };

  const toggleButton = (buttonValue, itemId, exclusive) => {
    setActiveFilters((prev) => {
      const currentFilters = prev[itemId]?.active || [];
      const isActive = currentFilters.includes(buttonValue);

      const updatedFilters = { ...prev };

      if (exclusive) {
        const updateActive = isActive
          ? currentFilters.filter((value) => value !== buttonValue)
          : [
              ...currentFilters.filter((value) => {
                const isExclusiveFilter = data
                  .find((section) => section.id === itemId)
                  .btn.find((btn) => btn.value === value)?.exclusive;

                return !isExclusiveFilter;
              }),
              buttonValue,
            ];

        updatedFilters[itemId] = {
          active: updateActive,
          count: updateActive.length,
        };
      } else {
        const updatedActive = isActive
          ? currentFilters.filter((value) => value !== buttonValue)
          : [...currentFilters, buttonValue];

        updatedFilters[itemId] = {
          active: updatedActive,
          count: updatedActive.length,
        };
      }

      const totalCount = Object.values(updatedFilters).reduce(
        (acc, section) => acc + (section.count || 0),
        0,
      );

      totalCount === 0 && dispatch(resetFilters());

      return { ...updatedFilters, totalCount };
    });
  };

  return (
    <div className="flex flex-col py-2 px-8">
      {data.map((item) => (
        <div key={item.id} className="border-b border-gray py-1">
          <div
            className="flex justify-between items-center py-4 cursor-pointer
            transition-colors duration-300 ease-in-out"
            onClick={() => toggleAccordion(item.id)}
          >
            <div className="relative ">
              <p className="text-base">{item.title}</p>
              {activeFilters[item.id].count > 0 && (
                // eslint-disable-next-line max-len
                <p className="absolute top-1/2 right-[-35px] -translate-y-1/2 w-[24px] rounded-full bg-blue text-white text-center text-[14px] p-[4px] leading-4">
                  {activeFilters[item.id].count}
                </p>
              )}
            </div>

            <img
              src={CloseIcon}
              alt="close icon"
              className={`cursor-pointer rotate-45 scale-[0.6] duration-300 ${openIndex === item.id ? 'rotate-[0]' : ''}`}
            />
          </div>
          <AnimatePresence>
            {openIndex === item.id && item.title === 'Розмір' && (
              <m.div
                className="flex flex-wrap overflow-hidden"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: 'auto' },
                  collapsed: { height: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <ClothingSizePicker
                  clothingSizes={item.btn}
                  activeFilters={activeFilters}
                  toggleButton={toggleButton}
                />
              </m.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {openIndex === item.id && item.btn && item.title !== 'Розмір' && (
              <m.div
                className="flex flex-wrap overflow-hidden"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: 'auto' },
                  collapsed: { height: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                {item.btn.map((btn, value) => (
                  <button
                    key={btn.value}
                    className={`px-4 py-1 font-medium font-Raleway text-base border border-gray rounded-lg mr-2 mb-2 duration-300
                  ${activeFilters[item.id].active.includes(btn.value) ? 'bg-grayDark text-white border-grayDark ' : ''}`}
                    onClick={() => toggleButton(btn.value, item.id, btn.exclusive)}
                  >
                    {btn.name}
                  </button>
                ))}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilters;
