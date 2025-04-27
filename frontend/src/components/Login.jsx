
import { auth, provider } from '../firebase.config.js'; // Adjust the path as necessary
import { signInWithPopup } from "firebase/auth";
import api from '../axios.config.js'; 


const handleGoogleLogin =() => {
    signInWithPopup(auth, provider)
      .then(async(result) => {
        const user = result.user;
        console.log('User Info:', user);
        // You can save user data in your database here

        const idToken = await user.getIdToken(true);
        console.log('ID Token:', idToken.substring(0, 10) + '...');

        const response = await api.post('/auth/login', { idToken });
       if(response.status===200)
       {
        console.log('Login successful:', response.data);
        const userData = response.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
       }

       else{
        console.error('Login failed');
       }



      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

export default handleGoogleLogin;