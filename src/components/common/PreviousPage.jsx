import React from 'react';
import ArrowLeft from '../../assets/icons/arrow-up.svg';
import { useNavigate } from 'react-router-dom';

const PreviousPage = (props) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className='flex w-full'>
      <div className='flex justify-self-start flex-row mt-10 ml-10 gap-4'>
        <img
          src={ArrowLeft}
          alt='arrow left'
          className='transform rotate-[-95deg] w-6'
        />
        <p className='raleway-500 text-18x'>{props.text}</p>
      </div>
    </button>
  );
};

export default PreviousPage;
