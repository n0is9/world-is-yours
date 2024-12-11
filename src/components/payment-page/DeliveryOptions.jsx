const DeliveryOptions = ({ handleOptionChange, deliveryOptionError }) => {
  return (
    <div className='flex flex-col ml-2'>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className='text-textLight font-medium font-raleway text-sm mb-2 '>
        Тип доставки
      </label>
      <form className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            id='opt1'
            name='opt1'
            value='opt1'
            className='h-4 w-4'
            onChange={() => handleOptionChange('opt1')}
          />
          <label htmlFor='opt1' className='text-base'>
            Самовивіз з магазину
          </label>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            id='opt2'
            name='opt1'
            value='opt2'
            className='h-4 w-4'
            onChange={() => handleOptionChange('opt2')}
          />
          <label htmlFor='opt2' className='text-base'>
            Кур’єром (адресна)
          </label>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            id='opt3'
            name='opt1'
            value='opt3'
            className='h-4 w-4'
            onChange={() => handleOptionChange('opt3')}
          />
          <label htmlFor='opt3' className='text-base'>
            У відділення Нової Пошти
          </label>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            id='opt4'
            name='opt1'
            value='opt4'
            className='h-4 w-4'
            onChange={() => handleOptionChange('opt4')}
          />
          <label htmlFor='opt4' className='text-base'>
            У відділення Укрпошти
          </label>
        </div>
      </form>
      {deliveryOptionError && (
        <p className='text-red-500 text-xs mb-3 ml-2'>{deliveryOptionError}</p>
      )}
    </div>
  );
};

export default DeliveryOptions;
