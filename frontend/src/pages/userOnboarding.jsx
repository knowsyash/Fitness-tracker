import { Box, Button, Container, Typography, TextField, Grid, MenuItem } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const UserOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only submit the data when Step 4 is reached (final confirmation)
    if (step === 4) {
      console.log(formData);

      // Show an alert for form submission
      const isConfirmed = window.confirm("Are you sure you want to submit the form?");

      if (isConfirmed) {
        // Proceed to navigate if the user confirms
        navigate('/dashboard');
      } else {
        // Optionally, you can handle the cancellation here
        console.log("Submission canceled");
      }
    }
  };

  const genderOptions = ["Male", "Female", "Other"];
  const healthConditionOptions = ["None", "Diabetes", "Heart Disease", "Asthma"];
  const allergyOptions = ["None", "Peanuts", "Dairy", "Gluten"];
  const fitnessLevelOptions = ["Beginner", "Intermediate", "Advanced"];
  const fitnessGoalOptions = ["Lose Weight", "Gain Muscle", "Improve Endurance", "Stay Healthy"];
  const dietaryPreferenceOptions = ["No Preference", "Vegetarian", "Vegan", "Keto", "Paleo"];

  // Common SelectProps for all dropdowns
  const selectProps = {
    MenuProps: {
      PaperProps: {
        sx: {
          bgcolor: 'black', // Dropdown background color
          color: 'white',   // Dropdown text color
          '& .MuiMenuItem-root': {
            color: 'white',
          },
          '& .Mui-selected': {
            backgroundColor: '#333333 !important', // Selected item background
            color: 'white',
          },
        },
      },
    },
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>Basic Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                  SelectProps={selectProps}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>Health Information</Typography>
            <TextField
              select
              fullWidth
              label="Health Conditions"
              name="healthConditions"
              value={formData.healthConditions}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
              SelectProps={selectProps}
            >
              {healthConditionOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
              SelectProps={selectProps}
            >
              {allergyOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>Fitness & Diet</Typography>
            <TextField
              select
              fullWidth
              label="Fitness Level"
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
              SelectProps={selectProps}
            >
              {fitnessLevelOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Fitness Goals"
              name="fitnessGoals"
              value={formData.fitnessGoals}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
              SelectProps={selectProps}
            >
              {fitnessGoalOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Dietary Preferences"
              name="dietaryPreferences"
              value={formData.dietaryPreferences}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
              SelectProps={selectProps}
            >
              {dietaryPreferenceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </>
        );
      case 4:
        return (
          <>
            <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>Confirm Submission</Typography>
            <Typography sx={{ color: 'white' }}>
              Are you ready to submit the information? Please review all the details carefully.
            </Typography>
          </>
        );
      default:
        return <Typography sx={{ color: 'white' }}>Unknown Step</Typography>;
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #000000 0%, #0f0f0f 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 3,
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 3,
            p: 4,
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)"
          }}
        >
          <form onSubmit={handleSubmit}>
            {renderStep()}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              {step > 1 && (
                <Button variant="contained" color="secondary" onClick={prevStep}>
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button variant="contained" color="primary" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </Container>
      </motion.div>
    </Box>
  );
};

export default UserOnboarding;
