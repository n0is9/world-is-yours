import LogoWorldIsYoursDark from '@assets/icons/dark/logo-dark.svg';

const Loader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-zinc-950 bg-opacity-50'>
      {/* Затемнюючий та блюрений фон */}
      <div className='fixed inset-0  backdrop-filter backdrop-blur-md'></div>

      <div
        className='relative bg-white p-4 w-500px w-3/5 max-w-screen-sm
      h-1/3 rounded-xl flex items-center justify-center'
      >
        <img src={LogoWorldIsYoursDark} alt='logo word is your' />
      </div>
    </div>
  );
};

export default Loader;
