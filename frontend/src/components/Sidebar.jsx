
import React from 'react';
import { Box, Typography, Button, Divider, Avatar, CircularProgress } from "@mui/material";

const Sidebar = ({ formData }) => {
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMIColor = (bmi) => {
    if (!bmi) return "#757575"; // grey for no data
    if (bmi < 25) return "#43a047"; // green
    if (bmi < 30) return "#fb8c00"; // orange
    return "#e53935"; // red
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
        overflowY: "auto",
      }}
    >
      <Box>
        {/* User Profile Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            src={formData?.profilePictureUrl || ""}
            alt={formData?.name || "User"}
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, textAlign: "center" }}>
            {formData?.name || "User Name"}
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "grey.800", mb: 2 }} />

        {/* User Data Section */}
        {formData ? (
          <>
            {/* BMI Progress Ring */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={bmi ? Math.min(bmi, 40) * 2.5 : 0} // scaled fill
                  size={120}
                  thickness={5}
                  sx={{
                    color: bmiColor,
                    animationDuration: '1.5s',
                  }}
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
                  <Typography variant="h6" component="div" color="white">
                    BMI
                  </Typography>
                  <Typography variant="subtitle1" component="div" color="white">
                    {bmi || "--"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* User Info */}
            <Typography variant="body1" mb={1}>
              <strong>Age:</strong> {formData.age}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Height:</strong> {formData.height} cm
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Weight:</strong> {formData.weight} kg
            </Typography>

            <Typography variant="h6" mb={1} mt={3}>
              Health
            </Typography>
            <Typography variant="body2" mb={1}>
              Conditions: {formData.healthConditions}
            </Typography>
            <Typography variant="body2" mb={3}>
              Allergies: {formData.allergies}
            </Typography>

            <Typography variant="h6" mb={1}>
              Fitness & Diet
            </Typography>
            <Typography variant="body2" mb={1}>
              Level: {formData.fitnessLevel}
            </Typography>
            <Typography variant="body2" mb={1}>
              Goal: {formData.fitnessGoals}
            </Typography>
            <Typography variant="body2" mb={3}>
              Diet: {formData.dietaryPreferences}
            </Typography>
          </>
        ) : (
          <Typography>No user data available.</Typography>
        )}
      </Box>

      {/* Buttons at Bottom */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            bgcolor: "#1e88e5",
            "&:hover": { bgcolor: "#1565c0" },
            borderRadius: 2,
            py: 1.5,
            fontWeight: "bold",
          }}
        >
          BUTTON 1
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            bgcolor: "#43a047",
            "&:hover": { bgcolor: "#2e7d32" },
            borderRadius: 2,
            py: 1.5,
            fontWeight: "bold",
          }}
        >
          BUTTON 2
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;

