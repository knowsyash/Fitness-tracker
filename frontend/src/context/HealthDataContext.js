import { createContext, useState, useContext } from 'react';

// Create the context
export const HealthDataContext = createContext();

// Create a provider component
export const HealthDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    healthConditions: '',
    allergies: '',
    fitnessLevel: '',
    fitnessGoals: '',
    dietaryPreferences: '',
  });

  // Update a single field in the form data
  const updateFormField = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Reset the form data
  const resetFormData = () => {
    setFormData({
      age: '',
      gender: '',
      height: '',
      weight: '',
      healthConditions: '',
      allergies: '',
      fitnessLevel: '',
      fitnessGoals: '',
      dietaryPreferences: '',
    });
  };

  return (
    <HealthDataContext.Provider value={{ 
      formData, 
      setFormData, 
      updateFormField,
      resetFormData 
    }}>
      {children}
    </HealthDataContext.Provider>
  );
};

// Custom hook to use the context
export const useHealthData = () => useContext(HealthDataContext);