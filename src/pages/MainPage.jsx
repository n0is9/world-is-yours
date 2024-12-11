import { useState } from 'react';

import { motion as m } from 'framer-motion';

import WhyUs from '@components/main-page/WhyUs';
import FavouritesCardList from '@components/main-page/FavouritesCardList';
import NewArrivalsCardList from '@components/main-page/NewArrivalsCardList';
import ScrollingText from '@components/scrolling-effect/ScrollingText';
import ChatPopup from '@components/main-page/ChatPopup';
import Slider from '@components/main-page/Slider';
import useTranslation from '@locale/locales';
import MoveUp from '@common/MoveUp';

import ArrowIcon from '@assets/icons/icon-arrow.svg';
import ChatIcon from '@assets/icons/button_chat.svg';

const MainPage = () => {
  const t = useTranslation();

  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false);

  const toggleChatPopup = () => {
    setIsChatPopupOpen(!isChatPopupOpen);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className='bg-header bg-cover bg-no-repeat bg-bottom text-white'
        style={{ height: 'calc(100svh - 100px)' }}
      >
        {/* minus header and DonnateBanner height*/}

        {/* main page nav text */}
        <div
          className={`flex flex-col h-4/5 justify-center items-center px-10 `}
        >
          <p className='text-center text-5xl mb-10'>
            {t('Your adventure starts here')}
          </p>
          <a href='#sectionFav' className='duration-300 focus:scale-125'>
            <img className='cursor-pointer' src={ArrowIcon} alt='Arrow Down' />
          </a>
        </div>

        {/* chat icon */}
        <div className={`flex flex-row-reverse h-1/5 items-center px-10 `}>
          <img
            className='scale-75 cursor-pointer'
            src={ChatIcon}
            alt='Arrow Down'
            onClick={toggleChatPopup}
          />

          {isChatPopupOpen && (
            <ChatPopup onClose={() => setIsChatPopupOpen(false)} />
          )}
        </div>
      </div>
      <Slider />
      {/* <SeasonSelect /> */}
      <FavouritesCardList />
      <ScrollingText />
      <NewArrivalsCardList />
      <WhyUs />
      <MoveUp />
    </m.div>
  );
};

export default MainPage;
