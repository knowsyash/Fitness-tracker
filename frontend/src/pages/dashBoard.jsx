import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField
} from '@mui/material';
import { FaApple } from 'react-icons/fa';

const Dashboard = () => {
  const [waterIntake, setWaterIntake] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [exerciseGoals, setExerciseGoals] = useState({
    pushups: false,
    running: false,
    squats: false,
    jumpRope: false,
  });
  const [waterTarget, setWaterTarget] = useState('4');
  const [sleepTarget, setSleepTarget] = useState('8');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(
        now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        })
      );
    };
    updateDateTime();
    const id = setInterval(updateDateTime, 1000);
    return () => clearInterval(id);
  }, []);

  const handleExerciseChange = (e) => {
    setExerciseGoals((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#212121',
        pt: '80px',       // space for navbar
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
      }}
    >
      {/* Date & Time */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          bgcolor: '#333',
          color: '#fff',
          py: 1,
          mb: 4,
          textAlign: 'center',
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6">Current Date & Time</Typography>
        <Typography variant="body1">{currentDateTime}</Typography>
      </Box>

      <Container maxWidth="xxl" sx={{ px: 0 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
          {/* Left Column (Water & Sleep) */}
          <Grid item xs={12} sm={6} md={2}>
            <Box
              sx={{
                bgcolor: '#3a3a3a',
                borderRadius: 2,
                p: 2,
                color: '#fff',
                mb: 2,
                border: '2px solid #64b5f6',
                boxShadow: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>💧 Water Intake</Typography>
              <TextField
                fullWidth
                variant="outlined"
                label="Target (Glasses)"
                value={waterTarget}
                onChange={(e) => setWaterTarget(e.target.value)}
                InputLabelProps={{ sx: { color: '#90caf9' } }}
                InputProps={{ sx: { color: '#fff' } }}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Liters Drank"
                value={waterIntake}
                onChange={(e) => setWaterIntake(e.target.value)}
                InputLabelProps={{ sx: { color: '#90caf9' } }}
                InputProps={{ sx: { color: '#fff' } }}
                sx={{ mb: 1 }}
              />
              <Typography variant="caption" color="secondary">
                Target: {waterTarget} Glasses
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: '#3a3a3a',
                borderRadius: 2,
                p: 2,
                color: '#fff',
                border: '2px solid #64b5f6',
                boxShadow: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>😴 Sleep Tracker</Typography>
              <TextField
                fullWidth
                variant="outlined"
                label="Target (Hours)"
                value={sleepTarget}
                onChange={(e) => setSleepTarget(e.target.value)}
                InputLabelProps={{ sx: { color: '#90caf9' } }}
                InputProps={{ sx: { color: '#fff' } }}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Hours Slept"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                InputLabelProps={{ sx: { color: '#90caf9' } }}
                InputProps={{ sx: { color: '#fff' } }}
                sx={{ mb: 1 }}
              />
              <Typography variant="caption" color="secondary">
                Target: {sleepTarget} Hours
              </Typography>
            </Box>
          </Grid>

          {/* Center Column (Diet Plan + Notes) */}
          <Grid item xs={12} sm={6} md={6}>
            {/* Diet Plan */}
            <Box
              sx={{
                bgcolor: '#3a3a3a',
                borderRadius: 3,
                p: 3,
                color: '#fff',
                border: '2px solid #64b5f6',
                boxShadow: 4,
                textAlign: 'center',
                mb: 1,
              }}
            >
              <FaApple size={60} color="#4caf50" style={{ marginBottom: 12 }} />
              <Typography variant="h5" gutterBottom>🥗 Diet Plan</Typography>
              <Typography variant="body1" gutterBottom><strong>Calories:</strong> 2500 kcal</Typography>
              <Typography variant="body1" gutterBottom><strong>Protein:</strong> 150 g</Typography>
              <Typography variant="body1"><strong>Foods:</strong> Rice, Chicken, Veggies, Fruit</Typography>
            </Box>

            {/* Today's Notes */}
            <Box
              sx={{
                bgcolor: '#3a3a3a',
                borderRadius: 3,
                p: 3,
                color: '#fff',
                border: '2px solid #64b5f6',
                boxShadow: 4,
                textAlign: 'left',
              }}
            >
              <Typography variant="h6" gutterBottom>📝 Today’s Notes</Typography>
              <TextField
                multiline
                rows={4}
                placeholder="Write your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                InputProps={{ sx: { color: 'white' } }}
                InputLabelProps={{ sx: { color: '#90caf9' } }}
              />
            </Box>
          </Grid>

          {/* Right Column (Exercise & Motivation) */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: '#3a3a3a',
                borderRadius: 2,
                p: 2,
                color: '#fff',
                mb: 2,
                border: '2px solid #64b5f6',
                boxShadow: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>🏋️ Exercise Goals</Typography>
              <FormGroup sx={{ alignItems: 'flex-start' }}>
                {['pushups','running','squats','jumpRope'].map((key) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={exerciseGoals[key]}
                        onChange={handleExerciseChange}
                        name={key}
                        sx={{ color: '#64b5f6' }}
                      />
                    }
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                  />
                ))}
              </FormGroup>
            </Box>
            <Box
              sx={{
                bgcolor: '#3a3a3a',
                borderRadius: 2,
                p: 2,
                color: '#fff',
                border: '2px solid #64b5f6',
                boxShadow: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>✨ Motivation</Typography>
              <Typography variant="body2">
                "The pain you feel today will be the strength you feel tomorrow."
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
