import { getAuth, signInWithPopup } from 'firebase/auth';
import { app } from './config'; // Предположим, что у вас есть файл config.js с инициализацией Firebase

const socialMediaAuth = (provider) => {
  const auth = getAuth(app); // Получение объекта auth из вашего приложения Firebase

  return signInWithPopup(auth, provider)
    .then((res) => {
      return res.user;
    })
    .catch((er) => {
      return er;
    });
};

export default socialMediaAuth;





