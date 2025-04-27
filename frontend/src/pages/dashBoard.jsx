import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  LinearProgress,
  Button,
  Grow,
  Badge,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const [waterProgress, setWaterProgress] = useState(0);
  const [waterTarget, setWaterTarget] = useState('4');
  const [sleepHours, setSleepHours] = useState('');
  const [sleepTarget, setSleepTarget] = useState('8');
  const [exerciseGoals, setExerciseGoals] = useState({
    pushups: false,
    running: false,
    squats: false,
    jumpRope: false,
  });
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);

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

  const handleAddWater = () => {
    const newProgress = waterProgress + 1;
    setWaterProgress(newProgress);

    if (newProgress >= parseInt(waterTarget)) {
      setTaskCompleted(true);
    }
  };

  const calculateProgress = () => {
    const target = parseInt(waterTarget);
    if (target === 0) return 0;
    return (waterProgress / target) * 100;
  };

  const isTargetReached = waterProgress >= parseInt(waterTarget);

  return (
    <Box
      sx={{
        width: '100%',
        height: '88vh',
        backgroundColor: '#f172a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Dashboard Header */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
          textAlign: 'center',
          mb: 3,
          borderBottom: '2px solid #4ade80',
          pb: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4ade80' }}>
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, fontSize: 18, color: '#f1f5f9' }}>
          {currentDateTime}
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} justifyContent="center">
            {/* Water Tracker */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  bgcolor: '#1e293f',
                  borderRadius: 6,
                  p: 4,
                  color: '#f1f5f9',
                  border: '2px solid #22c55e',
                  boxShadow: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="#4ade80" gutterBottom>
                  💧 Water Intake
                </Typography>

                <TextField
                  fullWidth
                  variant="outlined"
                  label="Target (Glasses)"
                  value={waterTarget}
                  onChange={(e) => {
                    setWaterTarget(e.target.value);
                    setTaskCompleted(false);
                    setWaterProgress(0);
                  }}
                  InputLabelProps={{ sx: { color: '#4ade80' } }}
                  InputProps={{
                    sx: {
                      color: '#f1f5f9',
                      '& fieldset': { borderColor: '#4ade80' },
                    },
                  }}
                  sx={{ mb: 3 }}
                />

                <Badge badgeContent={waterProgress} color="success">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddWater}
                    disabled={isTargetReached}
                    sx={{
                      backgroundColor: isTargetReached ? '#64748b' : '#4ade80',
                      '&:hover': { backgroundColor: isTargetReached ? '#64748b' : '#22c55e' },
                      px: 4,
                      py: 1,
                      fontWeight: 'bold',
                    }}
                  >
                    {isTargetReached ? 'Completed' : 'Add Water'}
                  </Button>
                </Badge>

                <Box sx={{ mt: 3, width: '100%' }}>
                  <Typography variant="body2" sx={{ color: '#f1f5f9', mb: 1, textAlign: 'center' }}>
                    {Math.min(waterProgress, waterTarget)} / {waterTarget} Glasses
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress()}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#334155',
                      '& .MuiLinearProgress-bar': { backgroundColor: '#4ade80' },
                    }}
                  />
                </Box>

                {taskCompleted && (
                  <Grow in={taskCompleted}>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 3,
                        color: '#22c55e',
                        fontWeight: 'bold',
                        animation: 'pulse 1.5s infinite alternate',
                      }}
                    >
                      🎉 Task Completed!
                    </Typography>
                  </Grow>
                )}
              </Box>
            </Grid>

            {/* Sleep Tracker */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  bgcolor: '#1e293b',
                  borderRadius: 6,
                  p: 4,
                  color: '#f1f5f9',
                  border: '2px solid #22c55e',
                  boxShadow: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="#4ade80" gutterBottom>
                  💤 Sleep Tracker
                </Typography>

                <TextField
                  fullWidth
                  variant="outlined"
                  label="Target (Hours)"
                  value={sleepTarget}
                  onChange={(e) => setSleepTarget(e.target.value)}
                  InputLabelProps={{ sx: { color: '#4ade80' } }}
                  InputProps={{
                    sx: {
                      color: '#f1f5f9',
                      '& fieldset': { borderColor: '#4ade80' },
                    },
                  }}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  label="Hours Slept"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(e.target.value)}
                  InputLabelProps={{ sx: { color: '#4ade80' } }}
                  InputProps={{
                    sx: {
                      color: '#f1f5f9',
                      '& fieldset': { borderColor: '#4ade80' },
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Exercise Goals */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  bgcolor: '#1e293b',
                  borderRadius: 6,
                  p: 4,
                  color: '#f1f5f9',
                  border: '2px solid #22c55e',
                  boxShadow: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="#4ade80" gutterBottom>
                  🏋️ Exercise Goals
                </Typography>

                <FormGroup sx={{ alignItems: 'flex-start', mt: 2 }}>
                  {['pushups', 'running', 'squats', 'jumpRope'].map((key) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={exerciseGoals[key]}
                          onChange={handleExerciseChange}
                          name={key}
                          sx={{
                            color: '#4ade80',
                            '&.Mui-checked': { color: '#4ade80' },
                          }}
                        />
                      }
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      sx={{ color: '#f1f5f9' }}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
