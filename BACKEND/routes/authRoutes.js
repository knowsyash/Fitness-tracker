import express from 'express';
import {auth} from '../firebaseAdmin.js';
import { setUser } from '../controllers/Login.js';



 const router = express.Router();

// Register new user
router.post('/login', async (req, res) => {

    const {idToken} = req.body;
    console.log('ID Token:', idToken);

    try{

        const decodedToken = await auth.verifyIdToken(idToken);
        console.log('Decoded User:', decodedToken);
    
        const {uid, email, name, picture} = decodedToken;

        const user = {
            uid,
            email,
            name,
            picture
        };

        const response = await setUser(user);
        if(response.success){

            res.cookie('session', idToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'development', 
                maxAge: 3600 * 1000, // 1 hour
              });

            res.status(200).json({ message: 'User logged in successfully', user });
        }

        else
        {
            res.status(500).json({ message: 'Error logging in user'});
        }
    


    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({ message: 'Error logging in user'});
    }







})

export default router;