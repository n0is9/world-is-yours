import ArrowUp from '../../assets/icons/arrow-up.svg';

const MoveUp = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex flex-col items-center gap-4 mb-12 mt-16'>
      <div className='flex flex-col items-center group' onClick={handleScrollToTop} style={{ cursor: 'pointer' }}>
        <img className='text-custom-black w-6 mb-5 duration-300 group-hover:translate-y-[-12px]' src={ArrowUp} alt='arrow up' />
        <p className='text-custom-black font-raleway font-600 text-20px'>Вгору</p>
      </div>
    </div>
  );
};

export default MoveUp;
