import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './signup.module.css';
import Input from '../common/Input';
import Button from '../common/Button';
import Facebook from '../../assets/icons/media-icons/facebook-color.svg';
import Google from '../../assets/icons/media-icons/google-color.svg';
import Apple from '../../assets/icons/media-icons/apple-color.svg';
import { facebookProvider, googleProvider } from './firebase/provider';
import socialMediaAuth from './firebase/auth';
import closeIcon from '../../assets/icons/icon-close.svg';
import attentionIcon from '../../assets/icons/icon-attention.svg';
import openEye from '../../assets/icons/icon-openEye.svg';
import closeEye from '../../assets/icons/icon-Eye-off.svg';
import useTranslation from '../../locale/locales';
import { $api } from '../../api/api';
import { login, updateUser } from '../../redux/userSlice';

const SignUp = ({ onClose, openLogin, openRemindPass, openSuccess }) => {
  const dispatch = useDispatch();

  const t = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async (provider) => {
    setIsLoading(true);
    try {
      const user = await socialMediaAuth(provider);

      if (!user) {
        throw new Error('Користувач не підписався ');
      }

      const idToken = await user.getIdToken();

      if (!idToken) {
        throw new Error('Не вдалося отримати ID Token від користувача');
      }

      console.log('ID Token отримано:', idToken);

      const signInResult = await $api.post('/api/auth/social-login/', {
        token: idToken,
      });

      console.log('response.status', signInResult.status);
      console.log('response', signInResult);
      openSuccess();
      dispatch(updateUser(signInResult.data));
      setCookie('user', signInResult.data, 7);

      dispatch(login());
    } catch (error) {
      console.error('Помилка під час входу ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setCookie = (name, object, daysToExpire) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(object))};expires=${expires.toUTCString()};path=/`;
  };

  const [username, setUsername] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log(isAuthenticated);

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const isValidationOnRef = useRef(false);

  const nameValidation = (name) => {
    if (isValidationOnRef.current) {
      if (!name.trim()) {
        setNameError("Ім'я обов'язкове");
        return false;
      } else if (/^\s/.test(name)) {
        setNameError("Ім'я  не може починатися з пробілу");
      } else if (name.length < 2 || name.length > 32) {
        setNameError("Ім'я повинно бути від 2 до 32 символів");
        return false;
      } else if (!/^[a-zA-Z' -]+$/.test(name)) {
        setNameError("Ім'я містить не припустимі символи");
        return false;
      } else {
        setNameError(null);
        return true;
      }
    }
  };

  const surnameValidation = (surname) => {
    if (isValidationOnRef.current) {
      if (!surname.trim()) {
        setSurnameError("Прізвище обов'язкове");
        return false;
      } else if (/^\s/.test(surname)) {
        setSurnameError('Прізвище не може починатися з пробілу');
        return false;
      } else if (surname.length < 2 || surname.length > 32) {
        setSurnameError('Прізвище повинно бути від 2 до 32 символів');
        return false;
      } else if (!/^[a-zA-Z' -]+$/.test(surname)) {
        setSurnameError('Прізвище містить не припустимі символи');
        return false;
      } else {
        setSurnameError(null);
        return true;
      }
    }
  };

  const emailValidation = (email) => {
    if (isValidationOnRef.current) {
      if (!email.trim()) {
        setEmailError("Емейл обов'язковий");
        return false;
      } else if (/^\s/.test(email)) {
        setEmailError('Емейл не може починатися з пробілу');
        return false;
      } else if (email.length < 5 || email.length > 32) {
        setEmailError('Не вірно введений емейл');
        return false;
      } else if (!/@/.test(email) || !/\./.test(email)) {
        setEmailError('Не вірно введений емейл');
        return false;
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/.test(email)) {
        setEmailError('Не вірно введений емейл');
        return false;
      } else if (!/[a-zA-Z]{2,}$/.test(email.split('@')[1])) {
        setEmailError('Мінімум дві літери після крапки');
        return false;
      } else if (/@\./.test(email)) {
        setEmailError('Символ "." не може йти одразу після символу "@"');
        return false;
      } else {
        setEmailError(null);
        return true;
      }
    }
  };

  const passwordValidation = (password) => {
    if (isValidationOnRef.current) {
      if (!password.trim()) {
        setPasswordError("Пароль обов'язковий");
        return false;
      } else if (/^\s/.test(password)) {
        setPasswordError('Пароль не може починатися з пробілу');
        return false;
      } else if (password.length < 6 || password.length > 32) {
        setPasswordError('Пароль повиннен бути від 6 до 32 символів');
        return false;
      } else if (!/^[a-zA-Z0-9@#$%^&_+]+$/.test(password)) {
        setPasswordError('Пароль містить не припустимі символи');
        return false;
      } else {
        setPasswordError(null);
        return true;
      }
    }
  };

  const validateSignUpForm = () => {
    return (
      nameValidation(username) &&
      surnameValidation(userSurname) &&
      emailValidation(userEmail) &&
      passwordValidation(userPassword)
    );
  };

  const submit = (e) => {
    e.preventDefault();
    isValidationOnRef.current = true;
    if (validateSignUpForm()) {
      handleRegistration();
    }
  };

  const handleRegistrationStatus = (status, userData) => {
    const statusMessages = {
      201: 'Registration successful',
      400: 'User already exists',
    };

    if (statusMessages.hasOwnProperty(status)) {
      console.log(statusMessages[status]);

      switch (status) {
        case 201:
          handleSignIn(userData);

          break;
        case 400:
          break;

        default:
          break;
      }
    } else {
      console.log(`Unexpected response status: ${status}`);
    }
  };

  const handleRegistration = async () => {
    try {
      const userData = {
        first_name: username,
        last_name: userSurname,
        password: userPassword,
        email: userEmail,
      };

      const registrationResult = await $api.post(`/api/users/`, userData);

      handleRegistrationStatus(registrationResult.status, userData);
    } catch (error) {
      if (error.response && error.response.status) {
        console.log(
          `Error during registration in signUp. status: ${error.response.status}`,
        );
        handleRegistrationStatus(error.response.status);
      } else {
        console.error('No server response error in SignUp', error);
      }
    }
  };

  const handleSignInStatus = (status, signInResult = null) => {
    const statusMessages = {
      200: 'SignIn successful',
      400: 'status 400',
    };

    if (statusMessages.hasOwnProperty(status)) {
      console.log(statusMessages[status]);

      switch (status) {
        case 200:
          openSuccess();
          dispatch(updateUser(signInResult.data));

          dispatch(login());

          break;
        case 400:
          break;

        default:
          break;
      }
    } else {
      console.log(`Unexpected response status: ${status}`);
    }
  };

  const handleSignIn = async (userData) => {
    try {
      const signInResult = await $api.post(`/api/auth/`, {
        username: userData.email,
        password: userData.password,
      });

      handleSignInStatus(signInResult.status, signInResult);
      console.log('signIn successful:', signInResult);
    } catch (error) {
      if (error.response && error.response.status) {
        console.log(
          `Error during login in signIn. status: ${error.response.status}`,
        );
        handleSignInStatus(error.response.status);
      } else {
        console.error('No server response error in signIn', error);
      }
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={`${styles.popup} ${styles.open}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>{t('Registration')}</h2>
            <img
              className={styles.closeIcon}
              src={closeIcon}
              alt='close icon'
              onClick={onClose}
            />
          </div>
          <form noValidate className={styles.form} onSubmit={(e) => submit(e)}>
            <div className={styles.container}>
              <label className={styles.label} htmlFor='name'>
                {t('Name')}
              </label>
              <div className={styles.inputContainer}>
                {nameError && (
                  <img
                    className={styles.attention}
                    src={attentionIcon}
                    alt='attention'
                  />
                )}
                {nameError && <div className={styles.error}>{nameError}</div>}
                <Input
                  classNameInput={styles.input}
                  typeInput='text'
                  id='name'
                  nameInput='name'
                  valueInput={username}
                  placeholderInput={t('Enter your name')}
                  onChangeInput={(e) => {
                    setUsername(e.target.value);
                    nameValidation(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className={styles.container}>
              <label className={styles.label} htmlFor='surname'>
                {t('Surname')}
              </label>
              <div className={styles.inputContainer}>
                {surnameError && (
                  <img
                    className={styles.attention}
                    src={attentionIcon}
                    alt='attention'
                  />
                )}
                {surnameError && (
                  <div className={styles.error}>{surnameError}</div>
                )}
                <Input
                  classNameInput={styles.input}
                  typeInput='text'
                  id='surname'
                  nameInput='surname'
                  valueInput={userSurname}
                  placeholderInput={t('Enter your last name')}
                  onChangeInput={(e) => {
                    setUserSurname(e.target.value);
                    surnameValidation(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className={styles.container}>
              <label className={styles.label} htmlFor='email'>
                {t('Email')}
              </label>
              <div className={styles.inputContainer}>
                {emailError && (
                  <img
                    className={styles.attention}
                    src={attentionIcon}
                    alt='attention'
                  />
                )}
                {emailError && <div className={styles.error}>{emailError}</div>}
                <Input
                  classNameInput={styles.input}
                  typeInput='email'
                  id='email'
                  nameInput='email'
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

            <div className={styles.container}>
              <label className={styles.label} htmlFor='password'>
                {t('Password')}
              </label>
              <div className={styles.passwordContainer}>
                <div className={styles.inputContainer}>
                  {passwordError && (
                    <img
                      className={styles.attention}
                      src={attentionIcon}
                      alt='attention'
                    />
                  )}
                  {passwordError && (
                    <div className={styles.error}>{passwordError}</div>
                  )}
                  <Input
                    classNameInput={styles.input}
                    typeInput={isPasswordVisible ? 'text' : 'password'}
                    id='password'
                    nameInput='password'
                    value={userPassword}
                    placeholderInput={t('Create a password')}
                    onChangeInput={(e) => {
                      setUserPassword(e.target.value);
                      passwordValidation(e.target.value);
                    }}
                    required
                  />
                </div>

                <div
                  className={styles.eyesIcon}
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <img
                    className='w-24px h-24px'
                    src={isPasswordVisible ? openEye : closeEye}
                    alt={
                      isPasswordVisible ? 'Показати пароль' : 'Сховати пароль'
                    }
                    tabIndex='0'
                  />
                </div>
              </div>
            </div>

            <Button classNameBtn={styles.btn} type='submit'>
              Зареєструватися
            </Button>

            <div className={styles.alternative}>
              <hr className={styles.line} />
              <p className='text-center text-gray'>або за допомогою</p>
              <hr className={styles.line} />
            </div>
            <div className='flex flex-row gap-8 mt-8 mb-16 justify-center'>
              <img
                src={Facebook}
                className={styles.mediaIcons}
                alt='icon facebook'
                onClick={() => handleOnClick(facebookProvider)}
                disabled={isLoading}
              />
              <img
                src={Google}
                className={styles.mediaIcons}
                alt='icon google'
                onClick={() => handleOnClick(googleProvider)}
                disabled={isLoading}
              />
              <img src={Apple} className={styles.mediaIcons} alt='icon apple' />
            </div>

            <p style={{ color: '#202020' }} className='text-center'>
              Вже є акаунт?{' '}
              <span
                style={{
                  textDecoration: 'underline',
                  color: '#888888',
                  cursor: 'pointer',
                }}
                onClick={openLogin}
              >
                Увійдіть
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
