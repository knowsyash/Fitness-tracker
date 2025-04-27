
import { auth, provider } from '../firebase.config.js'; // Adjust the path as necessary
import { signInWithPopup } from "firebase/auth";

const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('User Info:', user);
        // You can save user data in your database here
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

export default handleGoogleLogin;