import React, { useState } from 'react';
import Button from '../common/Button';
import styles from '../registration-popup/signup.module.css';
import ColorPicker from './ColorPicker';
import ClothingSizePicker from './ClothingSizePicker';
import ShoeSizePicker from './ShoeSizePicker';
import AccordionText from './AccordionText';

const FilterList = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className='flex flex-col w-96 gap-5 grow'>
      <div className='flex flex-col w-96 gap-2'>
        <h1 className='font-raleway font-semibold text-2xl text-left text-grayDark'> Трекінгове взуття Salomon</h1>
        <p className='font-sans font-normal text-xl text-left text-grayDark mb-5'> 5400 грн </p>
        <p className='font-raleway font-light text-l text-left text-grayDark'> Оптимальний комфорт і відмінна підтримка навіть на найвимогливіших маршрутах.</p>
      </div>
      <div className=''>
        <p>Колір</p>
        <span>{selectedColor}</span>
        <div class='flex flex-row'>
          <ColorPicker />
        </div>
      </div>
      <hr className='text-gray border-1' />

      <div>
        <p>Розмір</p>
        {/* <ClothingSizePicker /> */}
        <ShoeSizePicker />
      </div>

      <Button classNameBtn={`bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold text-20px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black`}>Додати до корзини</Button>

      <AccordionText />
    </div>
  );
};

export default FilterList;
