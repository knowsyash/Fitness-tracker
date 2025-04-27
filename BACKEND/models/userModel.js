import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
 
  // profile: {
  //   name: String,
  //   gender: String,
  //   dateOfBirth: Date,
  //   weight: Number,
  //   height: Number,
  //   fitnessGoal: String
  // },
  picture:{
    type: String,
   
    default: 'https://example.com/default-profile-pic.jpg' // Default profile picture URL
  }

  

},{timestamps: true});

export default mongoose.model('User', UserSchema);