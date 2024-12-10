import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import NewsLetter from './NewsLetter';
import ChatPopup from '../main-page/ChatPopup';

import LogoWorldIsYours from '@assets/icons/light/logo-light.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faTiktok,
  faYoutube,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import IconCopyright from '@assets/icons/icon-copyright.svg';
import IconChat from '@assets/icons/icon-chat.svg';
import IconArrowRight from '@assets/icons/arrow-up.svg';

import './media-queries.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(validateEmail(event.target.value));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail) {
      setIsEmailSubmitted(true);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (isValidEmail) {
        setIsEmailSubmitted(true);
        setEmail(''); // Clear the input field
      }
    }
  };

  return (
    <footer className='bg-gray-dark'>
      <div
        className='container grid grid-cols-1 md:grid-cols-3 gap-10 justify-between pt-16 pb-5
      mx-auto place-content-center place-items-center items-start'
      >
        <div className='social-media-block ml-10 '>
          <h1 className='text-white mb-5 font-inter text-20px'>
            Ваша пригода починається тут
          </h1>
          <NavLink to='/' onClick={() => window.scrollTo(0, 0)}>
            <img src={LogoWorldIsYours} alt='logo' />
          </NavLink>

          <div className='social-media-icons mt-6 mb-10 flex flex-row gap-4'>
            <a
              href='https://web.telegram.org/'
              className='text-gray flex items-center text-lg duration-500
              p-1 hover:text-blue focus:text-blue'
            >
              <FontAwesomeIcon icon={faTelegram} size='2x' />
            </a>
            <a
              href='https://www.instagram.com/'
              className='text-gray flex items-center text-lg duration-500
              p-1 hover:text-blue focus:text-blue'
            >
              <FontAwesomeIcon icon={faInstagram} size='2x' />
            </a>
            <a
              href='https://www.facebook.com/'
              className='text-gray flex items-center text-lg duration-500
              p-1 hover:text-blue focus:text-blue'
            >
              <FontAwesomeIcon icon={faFacebook} size='2x' />
            </a>
            <a
              href='https://www.tiktok.com/explore'
              className='text-gray flex items-center text-lg duration-500
              p-1 hover:text-blue focus:text-blue'
            >
              <FontAwesomeIcon icon={faTiktok} size='2x' />
            </a>
            <a
              href='https://www.youtube.com/'
              className='text-gray flex items-center text-lg duration-500
              p-1 hover:text-blue focus:text-blue'
            >
              <FontAwesomeIcon icon={faYoutube} size='2x' />
            </a>
          </div>
          <p className='flex flex-row text-white text-opacity-30 gap-1'>
            <img src={IconCopyright} alt='icon copyright' />
            WORLD IS YOURS. Всі права захищені
          </p>
        </div>
        <div className='reference-and-payments'>
          <h2 className='text-white mb-4 font-raleway text-20px'>
            Потрібна допомога?
          </h2>
          <div className='flex flex-row gap-8 mb-4'>
            <a
              href='#'
              onClick={() => setIsChatPopupOpen(true)}
              className='text-white hover:underline focus:underline'
            >
              <p className='flex flex-row text-white gap-2 text-16px'>
                <img src={IconChat} alt='icon chat' />
                Зв’яжись з нами
              </p>
            </a>
          </div>
          <hr className='mb-4 text-white' />
          <p className='text-white font-raleway font-600 text-20px'>Довідка</p>
          <ul className='reference flex flex-col gap-3 mt-4'>
            <li>
              <NavLink
                to='/info-help?component=payment'
                className='text-white font-raleway font-400 text-16px 
               hover:underline focus:underline'
              >
                Оплата
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/info-help?component=delivery'
                className='text-white font-raleway font-400 text-16px
                hover:underline focus:underline'
              >
                Доставка
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/info-help?component=return'
                className='text-white font-raleway font-400 text-16px
                hover:underline focus:underline'
              >
                Повернення та обмін
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='mailing-list mr-10 '>
          <h2 className='text-white mb-4 font-raleway mb-0 text-20px'>
            Підпишиться на розсилку
          </h2>
          <p className='text-white text-opacity-30 font-raleway mt-1 mb-10 text-16px'>
            Щоб першим дізнаватися про новинки та знижки
          </p>
          <form className='relative' onSubmit={handleFormSubmit}>
            <input
              type='text'
              className={`bg-gray-dark p-3 text-white-500 border-2 border-${isValidEmail ? 'white' : 'red'}-500 rounded-lg w-full text-16px text-white `}
              placeholder='Введіть електронну пошту'
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleEnterKeyPress}
            />
            {!isValidEmail && (
              <div className='text-red-500 absolute inset-x-0 top-14 mb-2 ml-3 text-sm'>
                Неправильний формат email
              </div>
            )}
            {isEmailSubmitted && isValidEmail && <NewsLetter />}
            <div
              className='absolute inset-y-auto right-0 flex
            items-center pr-3 pointer-events-none'
            >
              <img
                src={IconArrowRight}
                alt='arrow right'
                className='text-red bg-red'
              />
            </div>
          </form>
        </div>
        {isChatPopupOpen && (
          <ChatPopup onClose={() => setIsChatPopupOpen(false)} />
        )}
      </div>
    </footer>
  );
};

export default Footer;
