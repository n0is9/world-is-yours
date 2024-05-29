import React from 'react';
import UserOrder from '../components/payment-page/UserOrder';
import PlacingAnOrder from '../components/payment-page/PlacingAnOrder';
import PreviousPage from '../components/common/PreviousPage';

import { motion as m } from 'framer-motion';

const PaymentPage = () => {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <PreviousPage link='/cart' text='Повернутись до кошика'></PreviousPage>
      <div className='flex flex-row flex-wrap justify-center gap-36 mt-14 mb-20'>
        <PlacingAnOrder />
        <UserOrder />
      </div>
    </m.div>
  );
};

export default PaymentPage;
