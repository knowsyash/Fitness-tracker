
import User from "../models/userModel.js";

export const setUser = async(user) => {
    try{
        const { uid, email, name, picture } = user;
        
        // Check if user already exists
        let existingUser = await User.findOne({ email });
        
        if (existingUser) {

            return {
                success: true,
                message: "User already exists",
                user: existingUser
           
            };
        }

            // Create new user
            const newUser = new User({
                username:name,
                email: email,
                picture: picture
            });
            
            const savedUser = await newUser.save();
            return {
                success: true,
                message: "User created successfully",
                user: savedUser
            };
        
    }
    catch(e) {
        console.log(e);
        return {
            success: false,
            message: "Error setting user",
            error: e.message
        };
    }
}