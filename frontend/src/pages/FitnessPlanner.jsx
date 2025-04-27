import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, Button, FormControl, InputLabel, Select, MenuItem, Divider, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import { useHealthData } from '../context/HealthDataContext';

const FitnessPlanner = () => {
  const { formData } = useHealthData();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterLevel, setFilterLevel] = useState('');
  const [filterGoal, setFilterGoal] = useState('');
  
  function generateMockFitnessPlans(count) {
    const fitnessLevels = ['beginner', 'intermediate', 'advanced'];
    const fitnessGoals = ['weight loss', 'muscle gain', 'endurance', 'flexibility', 'general fitness'];
    const workoutTypes = ['cardio', 'strength training', 'HIIT', 'yoga', 'pilates', 'cycling', 'swimming', 'running'];
    const equipmentOptions = ['none', 'dumbbells', 'resistance bands', 'kettlebells', 'gym machines', 'bodyweight'];
  
    const plans = [];
  
    for (let i = 0; i < count; i++) {
      const planId = 2000 + i;
      const title = `Fitness Plan ${i + 1}`;
      const fitnessLevel = fitnessLevels[Math.floor(Math.random() * fitnessLevels.length)];
      const fitnessGoal = fitnessGoals[Math.floor(Math.random() * fitnessGoals.length)];
      const durationWeeks = Math.floor(Math.random() * 8) + 4; // 4 to 11 weeks
      const sessionsPerWeek = Math.floor(Math.random() * 3) + 3; // 3 to 5 sessions
      const equipmentNeeded = [];
  
      // Randomly select 1-2 equipment options
      const equipmentCount = Math.floor(Math.random() * 2) + 1;
      while (equipmentNeeded.length < equipmentCount) {
        const equipment = equipmentOptions[Math.floor(Math.random() * equipmentOptions.length)];
        if (!equipmentNeeded.includes(equipment)) {
          equipmentNeeded.push(equipment);
        }
      }
  
      const workouts = [];
  
      for (let j = 0; j < sessionsPerWeek * durationWeeks; j++) {
        const workout = {
          day: `Day ${j + 1}`,
          type: workoutTypes[Math.floor(Math.random() * workoutTypes.length)],
          durationMinutes: Math.floor(Math.random() * 31) + 30, // 30 to 60 minutes
          description: `A ${fitnessGoal} focused ${fitnessLevel} level ${workoutTypes[Math.floor(Math.random() * workoutTypes.length)]} workout.`
        };
        workouts.push(workout);
      }
  
      plans.push({
        id: planId,
        title,
        fitnessLevel,
        fitnessGoal,
        durationWeeks,
        sessionsPerWeek,
        equipmentNeeded,
        workouts
      });
    }
  
    return { plans };
  }
  
  // Generate 20 mock fitness plans
  const mockFitnessPlans = generateMockFitnessPlans(20);
  const fitnessPlans = mockFitnessPlans.plans;
  
  // Filter plans based on user selections
  const filteredPlans = fitnessPlans.filter(plan => {
    if (filterLevel && plan.fitnessLevel !== filterLevel.toLowerCase()) {
      return false;
    }
    if (filterGoal && plan.fitnessGoal !== filterGoal.toLowerCase()) {
      return false;
    }
    return true;
  });
  
  // Open dialog with plan details
  const handleOpenDialog = (plan) => {
    setSelectedPlan(plan);
    setOpenDialog(true);
  };
  
  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  useEffect(() => {
    // Set initial filters based on user profile if available
    if (formData && formData.fitnessLevel) {
      // Convert to lowercase and handle case properly
      const level = formData.fitnessLevel.toLowerCase();
      console.log("Setting fitness level filter to:", level);
      setFilterLevel(level);
    }
    
    if (formData && formData.fitnessGoals) {
      // Map user's fitness goals to the format used in the fitness plans
      const goalMapping = {
        'Lose Weight': 'weight loss',
        'Gain Muscle': 'muscle gain',
        'Improve Endurance': 'endurance',
        'Stay Healthy': 'general fitness'
      };
      
      const mappedGoal = goalMapping[formData.fitnessGoals] || '';
      console.log("Setting fitness goal filter to:", mappedGoal, "from:", formData.fitnessGoals);
      setFilterGoal(mappedGoal);
    }
    
    // Debug: Log what data we have from the context
    console.log("Current health data in FitnessPlanner:", formData);
  }, [formData]);
  
  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: '#121212', 
      minHeight: '100vh',
      color: 'white'
    }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: 'white' }}>
        Fitness Planner
      </Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl variant="outlined" sx={{ minWidth: 200, bgcolor: 'rgba(255,255,255,0.05)' }}>
          <InputLabel sx={{ color: 'white' }}>Fitness Level</InputLabel>
          <Select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            label="Fitness Level"
            sx={{ color: 'white' }}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl variant="outlined" sx={{ minWidth: 200, bgcolor: 'rgba(255,255,255,0.05)' }}>
          <InputLabel sx={{ color: 'white' }}>Fitness Goal</InputLabel>
          <Select
            value={filterGoal}
            onChange={(e) => setFilterGoal(e.target.value)}
            label="Fitness Goal"
            sx={{ color: 'white' }}
          >
            <MenuItem value="">All Goals</MenuItem>
            <MenuItem value="weight loss">Weight Loss</MenuItem>
            <MenuItem value="muscle gain">Muscle Gain</MenuItem>
            <MenuItem value="endurance">Endurance</MenuItem>
            <MenuItem value="flexibility">Flexibility</MenuItem>
            <MenuItem value="general fitness">General Fitness</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Display filters applied */}
      {(filterLevel || filterGoal) && (
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#aaa' }}>Filters applied:</Typography>
          {filterLevel && (
            <Chip 
              label={`Level: ${filterLevel}`} 
              onDelete={() => setFilterLevel('')} 
              size="small"
              color="primary"
            />
          )}
          {filterGoal && (
            <Chip 
              label={`Goal: ${filterGoal}`} 
              onDelete={() => setFilterGoal('')} 
              size="small"
              color="primary"
            />
          )}
        </Box>
      )}
      
      {/* Fitness Plans Grid */}
      <Grid container spacing={3}>
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: '#2a2a2a',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ color: 'white' }}>
                    {plan.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={plan.fitnessLevel} 
                      size="small" 
                      sx={{ mr: 1, mb: 1, bgcolor: '#444', color: 'white' }} 
                    />
                    <Chip 
                      label={plan.fitnessGoal} 
                      size="small" 
                      sx={{ mr: 1, mb: 1, bgcolor: '#444', color: 'white' }} 
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#ddd', mb: 2 }}>
                    {plan.durationWeeks} weeks • {plan.sessionsPerWeek} sessions/week
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#aaa', mb: 2 }}>
                    <strong>Equipment:</strong> {plan.equipmentNeeded.join(', ')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#aaa', mb: 2 }}>
                    <strong>Total workouts:</strong> {plan.workouts.length}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 'auto' }}
                    onClick={() => handleOpenDialog(plan)}
                  >
                    View Plan Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography sx={{ color: 'white', textAlign: 'center', py: 4 }}>
              No fitness plans match your current filters. Try adjusting your filters to see more plans.
            </Typography>
          </Grid>
        )}
      </Grid>
      
      {/* Plan Details Dialog */}
      {selectedPlan && (
        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: '#1e1e1e',
              color: 'white'
            }
          }}
        >
          <DialogTitle sx={{ borderBottom: '1px solid #333' }}>
            {selectedPlan.title}
          </DialogTitle>
          <DialogContent dividers sx={{ borderColor: '#333' }}>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" sx={{ color: '#aaa' }}>Fitness Level</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{selectedPlan.fitnessLevel}</Typography>
                  
                  <Typography variant="subtitle1" sx={{ color: '#aaa', mt: 2 }}>Goal</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{selectedPlan.fitnessGoal}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" sx={{ color: '#aaa' }}>Duration</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{selectedPlan.durationWeeks} weeks</Typography>
                  
                  <Typography variant="subtitle1" sx={{ color: '#aaa', mt: 2 }}>Equipment Needed</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {selectedPlan.equipmentNeeded.join(', ')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            
            <Typography variant="h6" sx={{ mb: 2 }}>Workout Schedule</Typography>
            <Divider sx={{ mb: 2, bgcolor: '#333' }} />
            
            <List sx={{ bgcolor: '#252525', borderRadius: 1 }}>
              {selectedPlan.workouts.slice(0, 12).map((workout, index) => (
                <React.Fragment key={workout.day}>
                  <ListItem>
                    <ListItemText
                      primary={workout.day}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" sx={{ color: '#aaa' }}>
                            {workout.type} • {workout.durationMinutes} minutes
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#ddd', mt: 0.5 }}>
                            {workout.description}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < selectedPlan.workouts.slice(0, 12).length - 1 && (
                    <Divider component="li" sx={{ bgcolor: '#333' }} />
                  )}
                </React.Fragment>
              ))}
            </List>
            
            {selectedPlan.workouts.length > 12 && (
              <Typography variant="body2" sx={{ color: '#aaa', mt: 2, textAlign: 'center' }}>
                Showing first 12 workouts of {selectedPlan.workouts.length} total workouts
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ borderTop: '1px solid #333' }}>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
            <Button variant="contained" color="primary">
              Start This Plan
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default FitnessPlanner;