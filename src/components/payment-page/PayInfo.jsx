import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import { $api } from '../../api/api';

import Button from '../common/Button';

import 'react-toastify/dist/ReactToastify.css';

const PayInfo = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Отримуємо дані користувача зі стору
  const user = useSelector((state) => state.user.user);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
    try {
      // Формуємо дані для запиту
      const orderData = {
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        address: {
          address_line: user?.address?.address_line || '',
          city: user?.address?.city || '',
          country: user?.address?.country || '',
          zip_code: user?.address?.zip_code || '80109',
        },
        // payment_method: selectedOption,
      };

      console.log('orderData', orderData);
      // Надсилаємо POST-запит до API
      const response = await $api.post('/api/payment/', {
        first_name: orderData.first_name,
        last_name: orderData.last_name,
        address: {
          country: orderData.address.country,
          city: orderData.address.city,
          address_line: orderData.address.address_line,
          zip_code: orderData.address.zip_code,
        },
      });

      if (response.status === 201) {
        toast.info('Order created successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Помилка при створенні замовлення:', error);

      toast.info('The order could not be created. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {/* ДЛЯ НОВОГО ПОКУПЦЯ */}

      <div className='flex flex-col'>
        <label className='text-textLight font-medium font-raleway text-sm mb-2'>
          Варіант оплати
        </label>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              id='opt1'
              name='opt1'
              value='opt1'
              className='h-4 w-4'
              onChange={() => handleOptionChange('opt1')}
            />
            <label for='opt1' className='text-base'>
              Готівка
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              id='opt2'
              name='opt1'
              value='opt2'
              className='h-4 w-4'
              onChange={() => handleOptionChange('opt1')}
            />
            <label for='opt2' className='text-base'>
              Оплата банківською картою
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              id='opt3'
              name='opt1'
              value='opt3'
              className='h-4 w-4'
              onChange={() => handleOptionChange('opt1')}
            />
            <label for='opt3' className='text-base'>
              Google Pay
            </label>
          </div>
          <Button
            type='submit' // Додано type='submit'
            classNameBtn='max-w-md bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold text-20px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black'
          >
            Оформити замовлення
          </Button>
          <ToastContainer />
        </form>
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
