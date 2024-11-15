import React, { useState } from 'react';
import { useSelector, useDispatch, useEffect } from 'react-redux';
import { updateUser } from '../../redux/userSlice';
import { $api } from '../../api/api.js';
import CountryDropdown from '../payment-page/CountryDropDown';
import CityDropdown from '../payment-page/CityDropDown';
import Button from '../common/Button';
import DeliveryOptions from './DeliveryOptions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeliveryInfo = ({ onPayClick }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log('userState', user);

  React.useEffect(() => {
    console.log('User state after dispatch:', user);
    const updateUserOnBackend = async () => {
      try {
        const response = await $api.patch(`/api/users/${user.user_id}/`, {
          address: {
            country: user.address.country,
            city: user.address.city,
            address_line: user.address.address_line,
            zip_code: user.address.zip_code,
          },
        });
        console.log('Backend response:', response.data);
        toast.info('Your data has been updated successfully', {
          position: 'top-center',
          autoClose: 3000,
        });
      } catch (error) {
        console.error('Error updating user on backend:', error);
      }
    };
    if (user) {
      updateUserOnBackend();
    }
  }, [user]);

  // Локальний стан для адреси, країни та міста
  const [address, setAddress] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Стан для помилок
  const [addressError, setAddressError] = useState('');
  const [deliveryOptionError, setDeliveryOptionError] = useState('');
  const [selectedCountryError, setSelectedCountryError] = useState('');
  const [selectedCityError, setSelectedCityError] = useState('');

  const handleAddressChange = (event) => {
    // Отримуємо значення з поля вводу
    let inputValue = event.target.value;

    if (
      /^[a-zA-Zа-яА-Яїєіґ'0-9\s.,/-]*$/.test(inputValue) &&
      inputValue.length <= 60
    ) {
      setAddress(inputValue); // Оновлюємо значення адреси
      setAddressError(''); // Очищаємо помилку
    } else {
      setAddressError(
        'Up to 60 characters, allowed: letters, numbers, spaces, ".", ",", "-", "/"',
      ); // Виводимо помилку, якщо введено недозволені символи
    }
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setDeliveryOptionError('');
  };

  const handleCountrySelect = (selectedCountry) => {
    if (selectedCountry) {
      setSelectedCountry(selectedCountry);
      setSelectedCountryError('');
    } else {
      setSelectedCountryError('Select country');
    }
  };

  const handleCitySelect = (selectedCity) => {
    setSelectedCity(selectedCity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Перевірка на порожнечу полів
    let hasError = false;

    if (!selectedCountry) {
      setSelectedCountryError('Please select a country');
      hasError = true;
    }

    if (!selectedCity) {
      setSelectedCityError('Please select a city');
      hasError = true;
    }

    if (!address) {
      setAddressError('Please enter your address');
      hasError = true;
    }

    // Якщо є помилка, не відправляємо форму
    if (hasError) {
      toast.info(
        'Sorry, the country, city and address fields must be filled in.',
        {
          position: 'top-center',
          autoClose: 3000,
        },
      );
      return;
    }

    // Оновлення даних користувача
    const updatedUserData = {
      ...user,
      address: {
        country: selectedCountry.trim(),
        city: selectedCity.trim(),
        address_line: address.trim(),
      },
    };

    // Оновлюємо стан користувача в Redux
    dispatch(updateUser(updatedUserData));

    // Викликаємо функцію для переходу до оплати та запиту на замовлення
    onPayClick();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          {/* Вибір країни */}
          <CountryDropdown onSelectCountry={handleCountrySelect} />
          {selectedCountryError && (
            <p className='text-red-500 text-xs mb-3 ml-2'>
              {selectedCountryError}
            </p>
          )}

          {/* Вибір міста */}
          <CityDropdown
            onSelectCity={handleCitySelect}
            selectedCountry={selectedCountry}
          />
          {selectedCityError && (
            <p className='text-red-500 text-xs mb-3 ml-2'>
              {selectedCityError}
            </p>
          )}

          {/* Вибір варіантів доставки */}
          <DeliveryOptions
            handleOptionChange={handleOptionChange}
            deliveryOptionError={deliveryOptionError}
          />

          {/* Поле для вводу адреси */}
          <div className='flex flex-row gap-4 mt-4'>
            <div className='flex flex-col w-full'>
              <label
                htmlFor='text'
                className='mb-1 ml-1 text-textLight font-medium font-raleway text-sm'
              >
                Адреса
              </label>
              <input
                className='font-light border rounded-xl w-full p-3 border-black mb-1'
                placeholder={
                  user.address.address_line
                    ? user.address.address_line
                    : 'Введіть свою адресу'
                }
                onChange={handleAddressChange}
                value={address}
              />
              {addressError && (
                <p className='text-red-500 text-xs mb-3 ml-2'>{addressError}</p>
              )}
            </div>
          </div>

          {/* Поле для додаткової інформації */}
          <div className='flex flex-col mt-4'>
            <label
              htmlFor='additionalInfo'
              className='text-textLight font-medium font-raleway text-sm'
            >
              Додаткова інформація до замовлення
            </label>
            <textarea
              id='additionalInfo'
              className='max-w-md px-3 py-2 border rounded-md resize-none mt-4'
              style={{ height: '110px' }}
              placeholder='Чи є додаткові умови для доставки?'
            ></textarea>
          </div>

          {/* Кнопка підтвердження */}
          <Button
            classNameBtn='max-w-md bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold text-20px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black'
            nameBtn='submitForm'
            valueBtn='submit'
          >
            Варіанти оплати
          </Button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default DeliveryInfo;

// import React, { useState } from 'react';
// import CountryDropdown from '../payment-page/CountryDropDown';
// import CityDropdown from '../payment-page/CityDropDown';
// import Button from '../common/Button';
// import DeliveryOptions from './DeliveryOptions';

// const DeliveryInfo = ({ onPayClick }) => {
//   const [address, setAddress] = useState('');

//   const [addressError, setAddressError] = useState('');

//   const [deliveryOptionError, setDeliveryOptionError] = useState('');
//   const [selectedCountryError, setSelectedCountryError] = useState('');

//   const handleAddressChange = (event) => {
//     const inputValue = event.target.value;
//     if (
//       /^[a-zA-Zа-яА-Я0-9\s.,]*$/.test(inputValue) &&
//       inputValue.length <= 60
//     ) {
//       setAddress(inputValue);
//       setAddressError('');
//     } else {
//       setAddressError('Up to 60 characters');
//     }
//   };

//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionChange = (value) => {
//     setSelectedOption(value);
//     setDeliveryOptionError('');
//   };

//   const [selectedCountry, setSelectedCountry] = useState('');

//   const handleCountrySelect = (selectedCountry) => {
//     if (selectedCountry) {
//       setSelectedCountry(selectedCountry);
//       setSelectedCountryError('');
//     } else {
//       setSelectedCountryError('Select country');
//     }
//   };

//   const handleCitySelect = (selectedCity) => {
//     console.log('Selected City:', selectedCity);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onPayClick();
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className='flex flex-col'>
//           <CountryDropdown onSelectCountry={handleCountrySelect} />
//           {selectedCountryError && (
//             <p className='text-red-500 text-xs mb-3 ml-2'>
//               {selectedCountryError}
//             </p>
//           )}
//           <CityDropdown
//             onSelectCity={handleCitySelect}
//             selectedCountry={selectedCountry}
//           />

//           <DeliveryOptions
//             handleOptionChange={handleOptionChange}
//             deliveryOptionError={deliveryOptionError}
//           />

//           <div className='flex flex-row gap-4 mt-4'>
//             <div className='flex flex-col w-full'>
//               <label
//                 htmlFor='text'
//                 className='mb-1 ml-1 text-textLight font-medium font-raleway text-sm'
//               >
//                 Адреса
//               </label>
//               <input
//                 className='font-light border rounded-xl w-full p-3 border-black mb-1'
//                 placeholder='Введіть свою адресу'
//                 onChange={handleAddressChange}
//                 value={address}
//               ></input>
//               {addressError && (
//                 <p className='text-red-500 text-xs mb-3 ml-2'>{addressError}</p>
//               )}
//             </div>
//           </div>

//           <div className='flex flex-col mt-4'>
//             <label
//               htmlFor='additionalInfo'
//               className='text-textLight font-medium font-raleway text-sm '
//             >
//               Додаткова інформація до замовлення
//             </label>
//             <textarea
//               id='additionalInfo'
//               className='max-w-md px-3 py-2 border rounded-md resize-none mt-4 '
//               style={{ height: '110px' }}
//               placeholder='Чи є додаткові умови для доставки?'
//             ></textarea>
//           </div>
//           <Button
//             classNameBtn='max-w-md bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold text-20px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black'
//             nameBtn='submitForm'
//             valueBtn='submit'
//           >
//             Варіанти оплати
//           </Button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default DeliveryInfo;
