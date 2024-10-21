import React, { useState } from 'react';
import ContactInfo from './ContactInfo';
import DeliveryInfo from './DeliveryInfo';
import PayInfo from './PayInfo';

const PlacingAnOrder = () => {
  const [step, setStep] = useState(1);

  const handleDeliveryClick = () => {
    setStep(2);
  };

  const handleContactInfoClick = () => {
    setStep(1);
  };

  const handlePayClick = () => {
    setStep(3);
  };

  return (
    <div>
      <h1 className='font-raleway font-semibold text-35px mb-4'>Оформлення замовлення</h1>
      <div className='flex flex-row mb-2 gap-6'>
        <p className='cursor-pointer'>Новий покупець</p>
        <p className='cursor-pointer'>Я постійний клієнт</p>
      </div>
      <div className='flex flex-row justify-between mb-10'>
        <p className='text-gray font-raleway font-semibold text-20px cursor-pointer' onClick={handleContactInfoClick}>
          Контактна інформація
        </p>
        <p className='font-raleway font-semibold text-20px text-gray cursor-pointer' onClick={handleDeliveryClick}>
          Доставка
        </p>
        <p className='font-raleway font-semibold text-20px cursor-pointer text-blue' onClick={handlePayClick}>
          Оплата
        </p>
      </div>
      {step === 1 && <ContactInfo />}
      {step === 2 && <DeliveryInfo />}
      {step === 3 && <PayInfo />}
    </div>
  );
};

export default PlacingAnOrder;
