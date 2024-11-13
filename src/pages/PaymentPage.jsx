import React from 'react';

import UserOrder from '../components/payment-page/UserOrder';
import PlacingAnOrder from '../components/payment-page/PlacingAnOrder';
import PreviousPage from '../components/common/PreviousPage';

import Container from '../components/common/container';

const PaymentPage = () => {
  return (
    <Container>
      <PreviousPage link='/cart' text='Повернутись до кошика'></PreviousPage>
      <div className='flex flex-row flex-wrap justify-center gap-36 mt-14 mb-20'>
        <PlacingAnOrder />

        <UserOrder />
      </div>
    </Container>
  );
};

export default PaymentPage;
