import React from 'react';

const SkeletonCart = ({ className }) => {
  return (
    <>
      <div className='flex flex-row justify-between items-end border-b border-gray p-4 '>
        <div className='flex flex-row items-center'>
          <div className=' w-36 h-36  mr-4 rounded-lg bg-grayLight '></div>
          <div className='flex flex-col gap-2'>
            <div className='text-gray gap-2'>
              <p className='mt-3 text-grey font-normal text-xl'>Розмір:</p>
              <p className='mt-3 text-grey font-normal text-xl'>Колір:</p>
              <p className='mt-3 flex flex-row items-center text-gray font-normal text-xl'>
                Кількість:
                <div
                  className={`w-3 mr-2 duration-300 rotate-180 ml-4 mr-4  `}
                ></div>
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <div className=''>
            <p className='text-gray mt-3 font-normal text-xl'>Ціна: гр.</p>
            <p className='text-gray mt-3 font-normal text-xl'>Знижка:</p>
            <p className='text-gray mt-3 font-semibold text-grayDark text-xl font-sans'>
              Всього: гр.
            </p>
          </div>
        </div>
        <div className=' w-10 h-10 mb-9 p-2     rounded-lg bg-grayLight '></div>
      </div>
    </>
  );
};

export default SkeletonCart;
