import React from 'react';
import { useState } from 'react';
import Button from '../common/Button';

const PayInfo = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      {/* ДЛЯ НОВОГО ПОКУПЦЯ */}

      <div className='flex flex-col'>
        <label className='text-textLight font-medium font-raleway text-sm mb-2'>Варіант оплати</label>
        <form className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <input type='radio' id='opt1' name='opt1' value='opt1' className='h-4 w-4' onChange={() => handleOptionChange('opt1')} />
            <label for='opt1' className='text-base'>
              {' '}
              Готівка
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='radio' id='opt2' name='opt1' value='opt2' className='h-4 w-4' onChange={() => handleOptionChange('opt1')} />
            <label for='opt2' className='text-base'>
              {' '}
              Оплата банківською картою
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='radio' id='opt3' name='opt1' value='opt3' className='h-4 w-4' onChange={() => handleOptionChange('opt1')} />
            <label for='opt3' className='text-base'>
              {' '}
              Google Pay
            </label>
          </div>
        </form>
        <Button classNameBtn='max-w-md bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold text-20px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black' nameBtn='submitForm' valueBtn='submit'>
          Оплатити
        </Button>
      </div>

      {/* ДЛЯ ПОСТІЙНОГО ПОКУПЦЯ */}

      {/* <div className="flex flex-col">
        <label className="text-textLight font-medium font-raleway text-sm mb-2">
          Варіант оплати
        </label>
        <form className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="opt1"
              name="opt1"
              value="opt1"
              className="h-4 w-4"
              onChange={() => handleOptionChange("opt1")}
            />
            <label for="opt1" className="text-base">
              {" "}
              Банківська карта (Visa, Mastercard)
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="opt2"
              name="opt1"
              value="opt2"
              className="h-4 w-4"
              onChange={() => handleOptionChange("opt1")}
            />
            <label for="opt2" className="text-base">
              {" "}
              Кур’єром (адресна)
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="opt3"
              name="opt1"
              value="opt3"
              className="h-4 w-4"
              onChange={() => handleOptionChange("opt1")}
            />
            <label for="opt3" className="text-base">
              {" "}
              У відділення Нової Пошти
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="opt4"
              name="opt1"
              value="opt4"
              className="h-4 w-4"
              onChange={() => handleOptionChange("opt1")}
            />
            <label for="opt4" className="text-base">
              {" "}
              У відділення Укрпошти
            </label>
          </div>
        </form>
        <Button
        classNameBtn="max-w-md bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold text-20px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black"
        nameBtn="submitForm"
        valueBtn="submit"
      >
        Оплатити
      </Button>
      </div> */}
    </>
  );
};

export default PayInfo;
