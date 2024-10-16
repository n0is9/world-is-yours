import React, { useState } from 'react';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import styles from '../components/registration-popup/signup.module.css';
import openEye from '../assets/icons/icon-openEye.svg';
import closeEye from '../assets/icons/icon-Eye-off.svg';

const PasswordRecovery = () => {
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setUserPassword(newPassword);

    // Валідація пароля
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/.test(newPassword)) {
      setPasswordError('8-16, [a-z], [A-Z]');
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

  const handleSubmit = () => {
    // Перевірка наявності помилок перед відправкою
    if (passwordError || confirmPasswordError) {
      console.log('Будь ласка, виправте помилки в формі.');
      return;
    }

    // дії при успішній відправці форми
    console.log('Пароль успішно змінено');
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
            <Input classNameInput={styles.input} typeInput={isPasswordVisible ? 'text' : 'password'} id='password' nameInput='password' value={userPassword} placeholderInput='Придумайте пароль' onChangeInput={handlePasswordChange} required />
            {passwordError && <div className={styles.error}>{passwordError}</div>}
          </div>
          <div className={styles.eyesIcon} onClick={togglePasswordVisibility}>
            <img className='w-24px h-24px' src={isPasswordVisible ? closeEye : openEye} alt='eyeIcon' />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <label className={styles.label} htmlFor='confirmPassword'>
          Підтвердження пароля
        </label>
        <div className={styles.passwordContainer}>
          <div className={styles.inputContainer}>
            <Input classNameInput={styles.input} typeInput={isConfirmPasswordVisible ? 'text' : 'password'} id='confirmPassword' nameInput='confirmPassword' value={confirmPassword} placeholderInput='Введіть пароль ще раз' onChangeInput={handleConfirmPasswordChange} required />
            {confirmPasswordError && <div className={styles.error}>{confirmPasswordError}</div>}
          </div>
          <div className={styles.eyesIcon} onClick={toggleConfirmPasswordVisibility}>
            <img className='w-24px h-24px' src={isConfirmPasswordVisible ? closeEye : openEye} alt='eyeIcon' />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <Button classNameBtn={styles.btn} type='button' onClick={handleSubmit}>
          Змінити пароль
        </Button>
      </div>
    </div>
  );
};

export default PasswordRecovery;
