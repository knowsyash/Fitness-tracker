// models/HealthProfile.js

import mongoose from 'mongoose';

const healthProfileSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true, 
  },
  
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number, // in centimeters
    required: true,
  },
  weight: {
    type: Number, // in kilograms
    required: true,
  },

  // Health Conditions
  healthConditions: {
    type: [String],
    enum: ['Diabetes', 'Asthma', 'Heart Disease'], 
    default: [],
  },

  // Allergies
  allergies: {
    type: [String],
    enum: ['Peanuts', 'Dairy', 'Gluten'],
    default: [],
  },

  // Fitness Level
  fitnessLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },

  // Fitness Goals
  fitnessGoals: {
    type: [String],
    enum: ['Lose Weight', 'Gain Muscle', 'Improve Endurance', 'Stay Healthy'],
    required: true,
  },

  // Dietary Preference
  dietaryPreference: {
    type: String,
    enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan'],
    required: true,
  },

}, { timestamps: true });

export default mongoose.model('HealthProfile', healthProfileSchema);
