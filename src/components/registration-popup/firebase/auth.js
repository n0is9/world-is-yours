import { getAuth, signInWithPopup } from 'firebase/auth';
import { app } from './config';

const socialMediaAuth = (provider) => {
  const auth = getAuth(app);

  return signInWithPopup(auth, provider)
    .then((res) => {
      return res.user;
    })
    .catch((er) => {
      return er;
    });
};

export default socialMediaAuth;
