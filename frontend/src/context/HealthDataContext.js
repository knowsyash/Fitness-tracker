import { createContext, useState, useContext, useEffect } from 'react';

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

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('healthFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved health data:', error);
      }
    }
  }, []);

  // Update a single field in the form data
  const updateFormField = (field, value) => {
    setFormData(prevData => {
      const newData = {
        ...prevData,
        [field]: value
      };
      // Save to localStorage whenever data changes
      localStorage.setItem('healthFormData', JSON.stringify(newData));
      return newData;
    });
  };

  // Update the entire form data object
  const saveFormData = (data) => {
    // Save to localStorage
    localStorage.setItem('healthFormData', JSON.stringify(data));
    setFormData(data);
  };

  // Reset the form data
  const resetFormData = () => {
    const emptyData = {
      age:'',
      gender: '',
      height: '',
      weight: '',
      healthConditions: '',
      allergies: '',
      fitnessLevel: '',
      fitnessGoals: '',
      dietaryPreferences: '',
    };
    localStorage.removeItem('healthFormData');
    setFormData(emptyData);
  };

  return (
    <HealthDataContext.Provider value={{ 
      formData, 
      setFormData: saveFormData, 
      updateFormField,
      resetFormData 
    }}>
      {children}
    </HealthDataContext.Provider>
  );
};

// Custom hook to use the context
export const useHealthData = () => useContext(HealthDataContext);