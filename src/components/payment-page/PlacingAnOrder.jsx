import { useState } from 'react';

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
      <h1 className="font-raleway font-semibold text-35px mb-4">Оформлення замовлення</h1>

      <div className="flex flex-row justify-between mb-10">
        <p
          className={`font-raleway font-semibold text-20px cursor-pointer ${
            step === 1 ? 'text-blue' : 'text-gray'
          } hover:text-blue `}
          onClick={handleContactInfoClick}
        >
          Контактна інформація
        </p>
        <p
          className={`font-raleway font-semibold text-20px cursor-pointer ${
            step === 2 ? 'text-blue' : 'text-gray'
          } hover:text-blue `}
          onClick={handleDeliveryClick}
        >
          Доставка
        </p>
        <p
          className={`font-raleway font-semibold text-20px cursor-pointer ${
            step === 3 ? 'text-blue' : 'text-gray'
          } hover:text-blue `}
          onClick={handlePayClick}
        >
          Оплата
        </p>
      </div>
      {step === 1 && <ContactInfo onDeliveryClick={handleDeliveryClick} />}
      {step === 2 && <DeliveryInfo onPayClick={handlePayClick} />}
      {step === 3 && <PayInfo />}
    </div>
  );
};

export default PlacingAnOrder;
