import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import styles from '../components/registration-popup/signup.module.css';
import openEye from '../assets/icons/icon-openEye.svg';
import closeEye from '../assets/icons/icon-Eye-off.svg';
import { $api } from '../api/api.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordRecovery = () => {
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { email, token } = useParams();
  const navigate = useNavigate();
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setUserPassword(newPassword);

    // Валідація пароля
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/.test(newPassword)) {
      setPasswordError('8-16  символів ');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);

    // Валідація підтвердження пароля
    if (newPassword !== userPassword) {
      setConfirmPasswordError('Паролі не співпадають');
    } else {
      setConfirmPasswordError('');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Перевірка наявності помилок перед відправкою
    if (passwordError || confirmPasswordError) {
      console.log('Будь ласка, виправте помилки в формі.');
      return;
    }

    try {
      const response = await $api.post('/api/reset-password/', {
        email,
        token,
        userPassword,
      });
      console.log(response.data);

      toast.info('Password successfully updated', {
        position: 'top-center',
        autoClose: 3000,
      });
      navigate('/');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error resetting password';
      toast.info(message, {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Відновлення пароля</h1>
      <div className={styles.container}>
        <label className={styles.label} htmlFor='password'>
          Пароль
        </label>
        <div className={styles.passwordContainer}>
          <div className={styles.inputContainer}>
            <Input
              classNameInput={styles.input}
              typeInput={isPasswordVisible ? 'text' : 'password'}
              id='password'
              nameInput='password'
              value={userPassword}
              placeholderInput='Придумайте пароль'
              onChangeInput={handlePasswordChange}
              required
            />
            {passwordError && (
              <div className={styles.error}>{passwordError}</div>
            )}
          </div>
          <div className={styles.eyesIcon} onClick={togglePasswordVisibility}>
            <img
              className='w-24px h-24px'
              src={isPasswordVisible ? openEye : closeEye}
              alt={isPasswordVisible ? 'Сховати пароль' : 'Показати пароль'}
              tabIndex='0'
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <label className={styles.label} htmlFor='confirmPassword'>
          Підтвердження пароля
        </label>
        <div className={styles.passwordContainer}>
          <div className={styles.inputContainer}>
            <Input
              classNameInput={styles.input}
              typeInput={isConfirmPasswordVisible ? 'text' : 'password'}
              id='confirmPassword'
              nameInput='confirmPassword'
              value={confirmPassword}
              placeholderInput='Введіть пароль ще раз'
              onChangeInput={handleConfirmPasswordChange}
              required
            />
            {confirmPasswordError && (
              <div className={styles.error}>{confirmPasswordError}</div>
            )}
          </div>
          <div
            className={styles.eyesIcon}
            onClick={toggleConfirmPasswordVisibility}
          >
            <img
              className='w-24px h-24px'
              src={isConfirmPasswordVisible ? openEye : closeEye}
              alt={
                isConfirmPasswordVisible ? 'Сховати пароль' : 'Показати пароль'
              }
              tabIndex='0'
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <Button classNameBtn={styles.btn} type='button' onClick={handleSubmit}>
          Змінити пароль
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordRecovery;
