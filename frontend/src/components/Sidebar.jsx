import React from 'react';
import { Box, Typography, Button, Divider, Avatar, CircularProgress } from "@mui/material";
import { useHealthData } from '../context/HealthDataContext';

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const formData = useHealthData().formData;

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMIColor = (bmi) => {
    if (!bmi) return "#757575";
    if (bmi < 25) return "#43a047";  // green
    if (bmi < 30) return "#fb8c00";  // orange
    return "#e53935";                // red
  };

  const bmi = formData ? calculateBMI(formData.weight, formData.height) : null;
  const bmiColor = getBMIColor(bmi);

  return (
    <Box
      sx={{
        width: "320px",
        position: "fixed",
        top: "64px",
        left: 0,
        bottom: 0,
        background: "#0f0f0f",
        color: "white",
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1100,
        overflowY: "hidden",
        '@media (max-width: 600px)': {
          width: '100%',
          position: 'relative',
          top: 0
        }
      }}
    >
      <Box>
        {/* User Profile */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Avatar
            src={user?.picture || ""}
            alt={formData?.name || "User"}
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, textAlign: "center" }}>
            {user?.name || "User Name"}
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "grey.800", mb: 2 }} />

        {/* User Data */}
        {formData ? (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={bmi ? Math.min(bmi, 40) * 2.5 : 0}
                  size={120}
                  thickness={5}
                  sx={{ color: bmiColor }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5" component="div" color="white">
                    BMI
                  </Typography>
                  <Typography variant="subtitle1" component="div" color="white">
                    {bmi || "--"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="body1" mb={1}><strong>Age: </strong>{formData.age}</Typography>
            <Typography variant="body1" mb={1}><strong>Height: </strong>{formData.height} cm</Typography>
            <Typography variant="body1" mb={1}><strong>Weight: </strong>{formData.weight} kg</Typography>

            <Typography variant="h6" mb={1} mt={3}><strong>Health</strong></Typography>
            <Typography variant="body2" mb={1}><big>Conditions: </big>{formData.healthConditions}</Typography>
            <Typography variant="body2" mb={3}><big>Allergies: </big>{formData.allergies}</Typography>

            <Typography variant="h6" mb={1}><strong>Fitness & Diet</strong></Typography>
            <Typography variant="body2" mb={1}><big>Level: </big>{formData.fitnessLevel}</Typography>
            <Typography variant="body2" mb={1}><big>Goal: </big>{formData.fitnessGoals}</Typography>
            <Typography variant="body2" mb={3}><big>Diet: </big>{formData.dietaryPreferences}</Typography>
          </>
        ) : (
          <Typography>No user data available.</Typography>
        )}
      </Box>

      {/* Buttons at Bottom */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#2196f3", color: "white", fontWeight: 600, flex: 1, mr: 1 }}
        >
          SETTINGS
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#4caf50", color: "white", fontWeight: 600, flex: 1 }}
        >
          PROFILE
        </Button>
      </Box> */}
    </Box>
  );
};

export default Sidebar;
