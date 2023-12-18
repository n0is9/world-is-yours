import React, { useEffect } from "react";
import styles from "./signup.module.css";
import Button from "../common/Button";
import closeIcon from "../../assets/icons/icon-close.svg";

const SuccessMes = ({ isOpen, onClose, openLogin }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClickOpenLogin = () => {
    onClose(); 
    openLogin();
  };

  return (
    <>
      {isOpen &&  (
        <div className={styles.overlay} onClick={onClose}>
          <div
            className={`${styles.popup} ${isOpen ? styles.open : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.titleWrap}>
              <h2 className={styles.title}>Дякуємо!</h2>
              <img
                className={styles.closeIcon}
                src={closeIcon}
                alt="close icon"
                onClick={onClose}
              />
            </div>
            <div className={styles.btnWrap}>
            <p style={{ color: "#202020" }}>Лист з інструкціями відновлення пароля вже надіслано на вашу пошту.</p>
            <Button classNameBtn={styles.btn} onClickBtn={handleClickOpenLogin}>
              Увійти в акаунт
            </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessMes;