import { useState } from 'react';

import Input from '@common/Input';
import Button from '@common/Button';

import attentionIcon from '@assets/icons/icon-attention.svg';

import styles from '../main-page/main.module.css';

const ChatPopupContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [theme, setTheme] = useState('');
  const [themeError, setThemeError] = useState('');
  const [textArea, setTextArea] = useState('');
  const [textAreaError, setTextAreaError] = useState('');

  const resetErrors = () => {
    setNameError('');
    setEmailError('');
    setThemeError('');
    setTextAreaError('');
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
  };

  const nameSurnameRegex = /^[^\d\s]{3,16}$/;
  const themeRegex = /^[^\d\s]{6,20}$/;

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError('Name and surname cannot be empty');
    } else if (!nameSurnameRegex.test(value)) {
      setNameError(
        'Name and surname should be 3-16 characters long and should not contain numbers',
      );
    } else {
      setNameError('');
    }
  };

  const validateTheme = (value) => {
    if (!value.trim()) {
      setThemeError('Theme cannot be empty');
    } else if (!themeRegex.test(value)) {
      setThemeError('Theme should be 6-20 characters long and should not contain numbers');
    } else {
      setThemeError('');
    }
  };

  const validateEmailOnChange = (value) => {
    if (!value.trim()) {
      setEmailError('Email cannot be empty');
    } else if (!validateEmail(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validateTextArea = (value) => {
    if (!value.trim()) {
      setTextAreaError('Text cannot be empty');
    } else if (value.length < 10) {
      setTextAreaError('Text should be at least 10 characters long');
    } else {
      setTextAreaError('');
    }
  };

  const validateSignUpForm = (e) => {
    e.preventDefault();
    resetErrors();

    if (!nameSurnameRegex.test(name)) {
      setNameError(
        'Name and surname should be 3-16 characters long and should not contain numbers',
      );

      return false;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');

      return false;
    }

    if (!themeRegex.test(theme)) {
      setThemeError('Theme should be 6-20 characters long and should not contain numbers');

      return false;
    }

    if (textArea.length < 10) {
      setTextAreaError('Text should be at least 10 characters long');

      return false;
    }
  };

  return (
    <div className="flex-[0_1_30rem]">
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>Зв’яжіться з нами!</h2>
      </div>
      <form className={styles.form} onSubmit={validateSignUpForm}>
        <label htmlFor="name" className="mb-2 ml-1 text-textLight font-medium font-raleway text-sm">
          Ім&#39;я та прізвище
        </label>
        <div className={styles.inputContainer}>
          {nameError && <img className={styles.attention} src={attentionIcon} alt="attention" />}
          {nameError && <div className={styles.error}>{nameError}</div>}
          <Input
            classNameInput={styles.input}
            typeInput="text"
            id="name"
            nameInput="name"
            valueInput={name}
            placeholderInput="Введіть свої ім'я та прізвище"
            onChangeInput={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            required
          />
        </div>
        <label
          htmlFor="email"
          className="mb-2 ml-1 text-textLight font-medium font-raleway text-sm"
        >
          Електронна пошта
        </label>
        <div className={styles.inputContainer}>
          {emailError && <img className={styles.attention} src={attentionIcon} alt="attention" />}
          {emailError && <div className={styles.error}>{emailError}</div>}
          <Input
            classNameInput={styles.input}
            typeInput="email"
            id="email"
            nameInput="email"
            value={email}
            placeholderInput="Введіть свою електронну пошту"
            onChangeInput={(e) => {
              setEmail(e.target.value);
              validateEmailOnChange(e.target.value);
            }}
            required
          />
        </div>
        <label
          htmlFor="theme"
          className="mb-2 ml-1 text-textLight font-medium font-raleway text-sm"
        >
          Тема повідомлення
        </label>
        <div className={styles.inputContainer}>
          {themeError && <img className={styles.attention} src={attentionIcon} alt="attention" />}
          {themeError && <div className={styles.error}>{themeError}</div>}
          <Input
            classNameInput={styles.input}
            typeInput="text"
            id="theme"
            nameInput="theme"
            valueInput={theme}
            placeholderInput="Введіть тему повідомлення"
            onChangeInput={(e) => {
              setTheme(e.target.value);
              validateTheme(e.target.value);
            }}
            required
          />
        </div>
        <label
          htmlFor="textArea"
          className="mb-2 ml-1 text-textLight font-medium font-raleway text-sm"
        >
          Текст повідомлення
        </label>
        <div className={styles.inputContainer}>
          {textAreaError && (
            <img className={styles.attention} src={attentionIcon} alt="attention" />
          )}
          {textAreaError && <div className={styles.error}>{textAreaError}</div>}
          <textarea
            className={styles.textarea}
            maxLength={120}
            placeholder="Опишіть проблему, з якою звертаєтесь"
            value={textArea}
            onChange={(e) => {
              setTextArea(e.target.value);
              validateTextArea(e.target.value);
            }}
            required
          ></textarea>
        </div>
        <Button classNameBtn={styles.btn} type="submit">
          Відправити
        </Button>
      </form>
    </div>
  );
};

export default ChatPopupContact;
