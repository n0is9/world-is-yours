import { useState } from 'react';
import { motion as m } from 'framer-motion';

import CountryDropdown from '../payment-page/CountryDropDown';
import CityDropdown from '../payment-page/CityDropDown';
import Button from '@common/Button';

import TrashIcon from '@assets/icons/icon-trash.svg';
import LocationIcon from '@assets/icons/icon-location.svg';

const Address = () => {
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [addressError, setAddressError] = useState('');
  const [apartmentError, setApartmentError] = useState('');
  const [deliveryOptionError, setDeliveryOptionError] = useState('');
  //  const [selectedCountryError, setSelectedCountryError] = useState("");

  const handleAddressChange = (event) => {
    const inputValue = event.target.value;

    if (
      /^[a-zA-Zа-яА-Я0-9\s.,]*$/.test(inputValue) &&
      inputValue.length <= 60
    ) {
      setAddress(inputValue);
      setAddressError('');
    } else {
      setAddressError('Up to 60 characters');
    }
  };

  const handleApartmentChange = (event) => {
    const inputValue = event.target.value;

    setApartment(inputValue);

    if (inputValue.trim() === '') {
      setApartmentError('Required');
    } else if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setApartmentError('');
    } else {
      setApartmentError('Invalid');
    }
  };

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryError, setSelectedCountryError] = useState('');

  const handleCountrySelect = (selectedCountry) => {
    if (selectedCountry) {
      setSelectedCountry(selectedCountry);
      setSelectedCountryError('');
    } else {
      setSelectedCountryError('Select country');
    }
  };

  const handleCitySelect = (selectedCity) => {
    console.log('Selected City:', selectedCity);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className=" text-blue text-2xl font-semibold font-['Raleway'] mb-10">
        Адресна книга
      </h1>
      <div className='flex justify-between gap-8'>
        <div className='w-1/2 max-w-md'>
          <h3
            className=" text-black/100 text-opacity-20 text-xl
          font-medium font-['Raleway'] mb-8 "
          >
            Додати нову адресу
          </h3>

          <CountryDropdown onSelectCountry={handleCountrySelect} />
          {selectedCountryError && (
            <p className='text-red-500 text-xs mb-3 ml-2'>
              {selectedCountryError}
            </p>
          )}
          <CityDropdown
            onSelectCity={handleCitySelect}
            selectedCountry={selectedCountry}
          />

          <div className='flex flex-row gap-4 w-full justify-between'>
            <div className='flex flex-col w-5/7 mb-4'>
              <label
                htmlFor='text'
                className='mb-1 ml-1 text-textLight font-medium font-raleway text-sm'
              >
                Адреса
              </label>

              <input
                className='font-light border rounded-xl p-3 border-black mb-1 w-full'
                placeholder='Введіть свою адресу'
                onChange={handleAddressChange}
                value={address}
              ></input>

              {addressError && (
                <p className='text-red-500 text-xs mb-3 ml-2'>{addressError}</p>
              )}
            </div>
            <div className='flex flex-col w-44'>
              <label
                htmlFor='text'
                className='mb-1 text-textLight font-medium font-raleway text-sm'
              >
                Поштовий індекc
              </label>

              <input
                className='font-light border rounded-xl w-full p-3 pl-4 border-black mb-1'
                placeholder='00000'
                onChange={handleApartmentChange}
                value={apartment}
              ></input>
              {apartmentError && (
                <p className='text-red-500 text-xs mb-3 ml-2'>
                  {apartmentError}
                </p>
              )}
            </div>
          </div>
          <Button
            classNameBtn='w-full mt-4 bg-gray-dark p-4 border rounded-xl font-bold
          text-18px text-white duration-300 hover:bg-transparent hover:text-black
          focus:bg-transparent focus:text-black'
          >
            Додати нову адресу
          </Button>
        </div>

        <div className='w-1/2'>
          <div
            className='w-[261px] h-[109px] flex-col justify-start items-start
          gap-[30px] inline-flex'
          >
            <div className="text-black text-lg font-medium font-['Raleway']">
              Додані адреси
            </div>
            <div className='justify-start items-start gap-5 inline-flex'>
              <img src={LocationIcon} alt='LocationIcon' />
              <div
                className='self-stretch flex-col justify-start items-start
              gap-[5px] inline-flex'
              >
                <div className='w-[145px] flex-col justify-between items-end flex'>
                  <div className="w-[145px] text-black text-lg font-medium font-['Raleway']">
                    Україна, Київ
                  </div>
                  <div className="w-[145px] text-black  text-sm font-light font-['Raleway']">
                    вул. Ярославская, 10
                  </div>
                </div>
                <div className="text-zinc-500 text-sm font-light font-['Raleway'] cursor-pointer">
                  Змінити
                </div>
              </div>
              <div
                className='Trash w-10 h-10 p-2 rounded-[10px] justify-center
              items-center flex cursor-pointer border border-transparent rounded-lg
              duration-100 hover:border-slate-400 focus:border-slate-400'
              >
                <img src={TrashIcon} alt='TrashIcon' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default Address;
