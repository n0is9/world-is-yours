import React, { useState } from 'react';
import CloseIcon from '../../assets/icons/icon-close.svg';

import { AnimatePresence, motion as m } from 'framer-motion';

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    { id: 1, title: 'Особливості', subtitle: 'Технології обтічного дизайну', content: 'Трекінгове взуття Salomon відзначається ергономічним та обтічним дизайном, що надає винятковий комфорт та підтримку під час активних пригод.' },
    { id: 2, title: 'Матеріал', subtitle: 'Тут має бути підзаголовок', content: 'Тут текст про матеріал' },
    { id: 3, title: 'Догляд', subtitle: 'Тут має бути підзаголовок', content: 'Тут текст про догляд' },
  ];

  const toggleAccordion = (id) => {
    setOpenIndex((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className='flex flex-col space-y-2'>
      {data.map((item) => (
        <div key={item.id} className='border-b border-1 py-4'>
          <div className='flex justify-between items-center my-2 cursor-pointer transition-colors duration-300 ease-in-out' onClick={() => toggleAccordion(item.id)}>
            <p className='text-lg font-medium'>{item.title}</p>
            <img src={CloseIcon} alt='close icon' className={`cursor-pointer rotate-45 scale-[0.6] duration-300 ${openIndex === item.id ? 'rotate-[0]' : ''}`} />
          </div>
          <AnimatePresence>
            {openIndex === item.id && (
              <m.ul
                className='flex flex-col gap-4'
                initial='collapsed'
                animate='open'
                exit='collapsed'
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3 }}>
                <li>
                  <p className='mb-1 font-semibold font-Raleway text-base text-grayDark'>{item.subtitle}</p>
                  <p className='font-light'>{item.content}</p>
                </li>
              </m.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
