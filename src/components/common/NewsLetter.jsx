import { useState } from "react";

import Button from "../common/Button";

import styles from "../registration-popup/signup.module.css";

const NewsLetter = () => {
  const [isOpen, setIsOpen] = useState(true); 

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className={styles.overlay} onClick={handleClose}>
        <div
          className={`${styles.popupNewsLetter} ${styles.open}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.titleWrapNews}>
            <h2 className={styles.titleNews}>
              Дякуємо за підписку на нашу розсилку!{" "}
            </h2>
          </div>
          <div className={styles.btnWrapNews}>
            <p className={styles.textNews}>
              Тепер ви будете отримувати свіжі новини, акції та оновлення.{" "}
              <br /> Залишайтеся з нами!
            </p>
            <Button classNameBtn={styles.btnNews} onClickBtn={handleClose}>
              Повернутися до покупок
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default NewsLetter;


