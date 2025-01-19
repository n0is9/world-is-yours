import { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { $api } from '@api/api';
import useTranslation from '@locale/locales';

import Input from '@common/Input';
import Button from '@common/Button';
import LogIn from '../registration-popup/LogIn.jsx';

import attentionIcon from '@assets/icons/icon-attention.svg';
import closeIcon from '@assets/icons/icon-close.svg';

import styles from './signup.module.css';

const RemindPas = ({ onClose, openLogin, openSuccess }) => {
  const t = useTranslation();

  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState('');

  const isValidationOnRef = useRef(false);

  const [isLogInVisible, setIsLogInVisible] = useState(false);

  const openLogIn = () => {
    setIsLogInVisible(true);
  };

  const closeLogIn = () => {
    setIsLogInVisible(false);
  };

  const emailValidation = (email) => {
    if (isValidationOnRef.current) {
      if (!email.trim()) {
        setEmailError("Емейл обов'язковий");
      } else if (/^\s/.test(email)) {
        setEmailError('Пароль не може починатися з пробілу');
      } else if (email.length < 5 || email.length > 32) {
        setEmailError('Не вірно введений емейл');
      } else if (!/@/.test(email) || !/\./.test(email)) {
        setEmailError('Не вірно введений емейл');
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/.test(email)) {
        setEmailError('Не вірно введений емейл');
      } else if (!/[a-zA-Z]{2,}$/.test(email.split('@')[1])) {
        setEmailError('Мінімум дві літери після крапки');
      } else if (/@\./.test(email)) {
        setEmailError('Символ "." не може йти одразу після символу "@"');
      } else {
        setEmailError(null);

        return true;
      }
    }
  };

  const validateResetPasswordForm = () => {
    return emailValidation(userEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isValidationOnRef.current = true;
    if (!emailValidation(userEmail)) {
      return;
    }

    setIsLoading(true);

    try {
      if (validateResetPasswordForm()) {
        const response = await $api.post('/api/password_reset/', {
          email: userEmail,
        });

        console.log('response.status', response.status);
        console.log('response.data', response.data);

        if (response.status === 200) {
          toast.info('Лист для відновлення пароля відправлено на вашу пошту', {
            position: 'top-center',
            autoClose: 1000,
          });
        }
      } else {
        toast.error('Сталася помилка, спробуйте ще раз', {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error('Не вдалося відправити лист для відновлення пароля', {
        position: 'top-center',
        autoClose: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={`${styles.popup} ${styles.open}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>Відновлення паролю</h2>
            <img className={styles.closeIcon} src={closeIcon} alt="close icon" onClick={onClose} />
          </div>
          <form noValidate className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.container}>
              <label className={styles.label} htmlFor="email">
                {t('Email')}
              </label>
              <div className={styles.inputContainer}>
                {emailError && (
                  <img className={styles.attention} src={attentionIcon} alt="attention" />
                )}
                {emailError && <div className={styles.error}>{emailError}</div>}
                <Input
                  classNameInput={styles.input}
                  typeInput="email"
                  id="email"
                  nameInput="email"
                  value={userEmail}
                  placeholderInput={t('Enter your email address')}
                  onChangeInput={(e) => {
                    setUserEmail(e.target.value);
                    emailValidation(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <Button classNameBtn={styles.remind} type="submit">
              Відправити лист на пошту
            </Button>
            <span
              style={{
                textDecoration: 'underline',
                color: '#888888',
                cursor: 'pointer',
              }}
              onClick={openLogIn}
            >
              Увійдіть
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
      {isLogInVisible && <LogIn onClose={closeLogIn} />};
    </>
  );
};

export default RemindPas;
