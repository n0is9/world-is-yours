import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SideLinks from '../components/info-help/SideLinks';
import Payment from '../components/info-help/Payment';
import Return from '../components/info-help/Return';
import Delivery from '../components/info-help/Delivery';
import Container from './Container';

const InfoHelp = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramComponent = searchParams.get('component');

  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('component', component);
    window.history.replaceState(null, '', `?${urlSearchParams.toString()}`);
  };

  useEffect(() => {
    if (paramComponent) {
      setSelectedComponent(paramComponent);
    } else {
      setSelectedComponent('payment');
    }
  }, [paramComponent]);

  return (
    <Container maxW='1480px'>
      <div className='flex flex-col'>
        <div className='text-custom-black text-35px font-semibold mt-12' id='dovidka'>
          Довідка
        </div>
        <div className='flex flex-row mb-20 mt-12'>
          <SideLinks onLinkClick={handleComponentClick} />

          <div className='flex flex-col gap-8'>
            {selectedComponent === 'payment' && <Payment />}
            {selectedComponent === 'delivery' && <Delivery />}
            {selectedComponent === 'return' && <Return />}
            <p className='text-18px font-semibold'>Якщо у вас виникнуть питання або потреба у додатковій допомозі, будь ласка, не соромтеся звертатися до нашої служби підтримки. Ми готові вам допомогти та зробити ваше перебування в нашому автодомі щасливим та комфортним.</p>
            <p className='text-18px font-semibold'>З повагою, WORLD IS YOURS!</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default InfoHelp;
