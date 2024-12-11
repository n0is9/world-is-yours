import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faTiktok,
  faYoutube,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';

import styles from '../main-page/main.module.css';

const MediaIcons = () => {
  return (
    <div className='flex flex-col gap-5 flex-[0_1_22rem]'>
      <h1 className={styles.title}>Доєднуйтесь до наших соцмереж!</h1>

      <div className='flex flex-row mb-1'>
        <a
          href='https://www.instagram.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray flex items-center text-lg
          duration-200 hover:text-blue focus:text-blue'
        >
          <FontAwesomeIcon
            icon={faInstagram}
            size='2x'
            href='https://www.instagram.com/'
          />
          <p className='ml-5'>Instagram</p>
        </a>
      </div>

      <div className='flex flex-row mb-1'>
        <a
          href='https://www.facebook.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray flex items-center text-lg
          duration-200  hover:text-blue focus:text-blue'
        >
          <FontAwesomeIcon icon={faFacebook} size='2x' />
          <p className='ml-5'>Facebook</p>
        </a>
      </div>

      <div className='flex flex-row mb-1'>
        <a
          href='https://www.tiktok.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray flex items-center text-lg
          duration-200  hover:text-blue focus:text-blue'
        >
          <FontAwesomeIcon icon={faTiktok} size='2x' />
          <p className='ml-5'>TikTok</p>
        </a>
      </div>

      <div className='flex flex-row mb-1'>
        <a
          href='https://www.youtube.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray flex items-center text-lg
          duration-200  hover:text-blue focus:text-blue'
        >
          <FontAwesomeIcon icon={faYoutube} size='2x' />
          <p className='ml-5'>YouTube</p>
        </a>
      </div>

      <div className='flex flex-row mb-1'>
        <a
          href='https://t.me/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray flex items-center text-lg
          duration-200 hover:text-blue focus:text-blue'
        >
          <FontAwesomeIcon icon={faTelegram} size='2x' />
          <p className='ml-5'>Telegram</p>
        </a>
      </div>
    </div>
  );
};

export default MediaIcons;
