import { Box, Typography, Grid, Paper, Divider, Chip } from '@mui/material';
import { useLocation } from 'react-router-dom';

const DietPlan = () => {
  const location = useLocation();
  const { age, height, weight, gender, fitnessLevel, fitnessGoals } = location.state || {};
  
  // Calculate BMR (Basal Metabolic Rate)
  const calculateBMR = () => {
    if (!age || !height || !weight) return null;
    
    // Mifflin-St Jeor Equation
    if (gender === 'Female') {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
    // Default to male calculation
    return 10 * weight + 6.25 * height - 5 * age + 5;
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = (bmr) => {
    const activityFactors = {
      'Beginner': 1.2,
      'Intermediate': 1.375,
      'Advanced': 1.55
    };
    return bmr * (activityFactors[fitnessLevel] || 1.2);
  };

  // Adjust calories based on goals
  const calculateGoalCalories = (tdee) => {
    const goalFactors = {
      'Lose Weight': 0.85,
      'Gain Muscle': 1.15,
      'Improve Endurance': 1.1,
      'Stay Healthy': 1.0
    };
    return Math.round(tdee * (goalFactors[fitnessGoals] || 1.0));
  };

  // Calculate macros (simplified)
  const calculateMacros = (calories) => {
    return {
      protein: Math.round((calories * 0.3) / 4), // 30% of calories, 4 cal/g
      carbs: Math.round((calories * 0.4) / 4),  // 40% of calories, 4 cal/g
      fats: Math.round((calories * 0.3) / 9)     // 30% of calories, 9 cal/g
    };
  };

  const bmr = calculateBMR();
  const tdee = bmr ? calculateTDEE(bmr) : null;
  const goalCalories = tdee ? calculateGoalCalories(tdee) : null;
  const macros = goalCalories ? calculateMacros(goalCalories) : null;

  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: '#121212',
      minHeight: '100vh',
      color: 'white'  // Ensures all text is white
    }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: 'white' }}>
        Your Personalized Diet Plan
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#1e1e1e' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>User Information</Typography>
            <Divider sx={{ my: 2, bgcolor: '#333' }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Age:</strong> {age || 'Not provided'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Gender:</strong> {gender || 'Not provided'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Height:</strong> {height ? `${height} cm` : 'Not provided'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Weight:</strong> {weight ? `${weight} kg` : 'Not provided'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Fitness Level:</strong> {fitnessLevel || 'Not provided'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Goal:</strong> {fitnessGoals || 'Not provided'}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#1e1e1e' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Calorie Calculation</Typography>
            <Divider sx={{ my: 2, bgcolor: '#333' }} />
            {bmr ? (
              <>
                <Typography sx={{ color: 'white' }}><strong>BMR (Basal Metabolic Rate):</strong> {Math.round(bmr)} kcal/day</Typography>
                <Typography sx={{ mt: 1, color: 'white' }}><strong>TDEE (Total Daily Energy Expenditure):</strong> {Math.round(tdee)} kcal/day</Typography>
                <Box sx={{ mt: 2, p: 2, backgroundColor: '#252525', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: 'white' }}>
                    <strong>Recommended Daily Intake:</strong>
                  </Typography>
                  <Chip 
                    label={`${goalCalories} kcal`} 
                    color="primary" 
                    sx={{ mt: 1, fontSize: '1.2rem', p: 2 }}
                  />
                </Box>
              </>
            ) : (
              <Typography color="error" sx={{ color: 'white' }}>Insufficient data to calculate calories</Typography>
            )}
          </Paper>
        </Grid>

        {macros && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, backgroundColor: '#1e1e1e' }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Macronutrient Distribution</Typography>
              <Divider sx={{ my: 2, bgcolor: '#333' }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ color: 'white' }}>Protein</Typography>
                    <Chip label={`${macros.protein}g`} color="secondary" sx={{ fontSize: '1.1rem' }} />
                    <Typography variant="caption" display="block" sx={{ color: 'white' }}>30% of calories</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ color: 'white' }}>Carbohydrates</Typography>
                    <Chip label={`${macros.carbs}g`} color="secondary" sx={{ fontSize: '1.1rem' }} />
                    <Typography variant="caption" display="block" sx={{ color: 'white' }}>40% of calories</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ color: 'white' }}>Fats</Typography>
                    <Chip label={`${macros.fats}g`} color="secondary" sx={{ fontSize: '1.1rem' }} />
                    <Typography variant="caption" display="block" sx={{ color: 'white' }}>30% of calories</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DietPlan;
