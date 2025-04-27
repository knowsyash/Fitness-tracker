import HealthProfile from "../models/HealthData.js";
import User from "../models/userModel.js";

/**
 * Controller function to save user health data
 * @param {Object} healthData - The health data object containing all necessary fields
 * @returns {Object} Response object with success status and data or error message
 */
export const saveData = async (healthData) => {
    try {
        const { 
            email, 
            age, 
            height, 
            weight, 
            healthConditions, 
            allergies, 
            fitnessLevel, 
            fitnessGoals, 
            dietaryPreference 
        } = healthData;

        // Validate that user exists
        const userExists = await User.findOne({ email });
        const userId = userExists ? userExists._id : null;
        if (!userExists) {
            return { 
                success: false, 
                message: "User not found" 
            };
        }

        // Check if health profile already exists for this user
        let healthProfile = await HealthProfile.findOne({ user: userId });

        if (healthProfile) {
            // Update existing profile
            healthProfile.age = age;
            healthProfile.height = height;
            healthProfile.weight = weight;
            healthProfile.healthConditions = healthConditions;
            healthProfile.allergies = allergies;
            healthProfile.fitnessLevel = fitnessLevel;
            healthProfile.fitnessGoals = fitnessGoals;
            healthProfile.dietaryPreference = dietaryPreference;

            const updatedProfile = await healthProfile.save();
            
            return {
                success: true,
                message: "Health data updated successfully",
                data: updatedProfile
            };
        } else {
            // Create new health profile
            const newHealthProfile = new HealthProfile({
                user: userId,
                age,
                height,
                weight,
                healthConditions,
                allergies,
                fitnessLevel,
                fitnessGoals,
                dietaryPreference
            });

            const savedProfile = await newHealthProfile.save();
            
            return {
                success: true,
                message: "Health data saved successfully",
                data: savedProfile
            };
        }
    } catch (error) {
        console.error("Error saving health data:", error);
        
        // Return appropriate error based on type
        if (error.name === 'ValidationError') {
            return {
                success: false,
                message: "Validation error",
                errors: Object.values(error.errors).map(err => err.message)
            };
        }
        
        return {
            success: false,
            message: "Error saving health data",
            error: error.message
        };
    }
};