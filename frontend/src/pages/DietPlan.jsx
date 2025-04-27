import { Box, Typography, Grid, Paper, Divider, Chip, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHealthData } from '../context/HealthDataContext';
import api from '../axios.config';

// Array of reliable food images to use as fallbacks
const foodImages = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
  'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a',
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
  'https://images.unsplash.com/photo-1515942400420-2b98fed1f515',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55',
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
  'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0',
  'https://images.unsplash.com/photo-1484980972926-edee96e0960d',
  'https://images.unsplash.com/photo-1505576399279-565b52d4ac71',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd'
];

const meals=[
  {
    "id": 1001,
    "title": "Quinoa & Black Bean Salad",
    "imageType": "jpg",
    "readyInMinutes": 30,
    "servings": 2,
    "sourceUrl": "https://example.com/recipes/quinoa-black-bean-salad",
    "ingredients": ["quinoa", "black beans", "bell peppers", "corn", "lime juice"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1002,
    "title": "Vegetable Stir Fry with Tofu",
    "imageType": "jpg",
    "readyInMinutes": 25,
    "servings": 2,
    "sourceUrl": "https://example.com/recipes/vegetable-stir-fry-tofu",
    "ingredients": ["tofu", "broccoli", "carrots", "bell peppers", "tamari sauce"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1003,
    "title": "Chickpea Curry",
    "imageType": "jpg",
    "readyInMinutes": 40,
    "servings": 4,
    "sourceUrl": "https://example.com/recipes/chickpea-curry",
    "ingredients": ["chickpeas", "tomatoes", "onions", "garlic", "spices"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1004,
    "title": "Grilled Vegetable Skewers",
    "imageType": "jpg",
    "readyInMinutes": 35,
    "servings": 3,
    "sourceUrl": "https://example.com/recipes/grilled-vegetable-skewers",
    "ingredients": ["zucchini", "bell peppers", "mushrooms", "olive oil", "herbs"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1005,
    "title": "Lentil Soup",
    "imageType": "jpg",
    "readyInMinutes": 50,
    "servings": 4,
    "sourceUrl": "https://example.com/recipes/lentil-soup",
    "ingredients": ["lentils", "carrots", "celery", "onions", "vegetable broth"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1006,
    "title": "Stuffed Bell Peppers",
    "imageType": "jpg",
    "readyInMinutes": 60,
    "servings": 4,
    "sourceUrl": "https://example.com/recipes/stuffed-bell-peppers",
    "ingredients": ["bell peppers", "quinoa", "black beans", "corn", "tomato sauce"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1007,
    "title": "Zucchini Noodles with Pesto",
    "imageType": "jpg",
    "readyInMinutes": 20,
    "servings": 2,
    "sourceUrl": "https://example.com/recipes/zucchini-noodles-pesto",
    "ingredients": ["zucchini", "basil", "garlic", "olive oil", "pine nuts"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1008,
    "title": "Sweet Potato & Black Bean Tacos",
    "imageType": "jpg",
    "readyInMinutes": 30,
    "servings": 4,
    "sourceUrl": "https://example.com/recipes/sweet-potato-black-bean-tacos",
    "ingredients": ["sweet potatoes", "black beans", "corn tortillas", "avocado", "lime"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1009,
    "title": "Mushroom Risotto",
    "imageType": "jpg",
    "readyInMinutes": 45,
    "servings": 4,
    "sourceUrl": "https://example.com/recipes/mushroom-risotto",
    "ingredients": ["arborio rice", "mushrooms", "vegetable broth", "onions", "parmesan cheese"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1010,
    "title": "Eggplant Parmesan",
    "imageType": "jpg",
    "readyInMinutes": 60,
    "servings": 4,
    "sourceUrl": "https://example.com/recipes/eggplant-parmesan",
    "ingredients": ["eggplant", "tomato sauce", "mozzarella cheese", "parmesan cheese", "gluten-free breadcrumbs"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1011,
    "title": "Spinach & Feta Stuffed Portobello Mushrooms",
    "imageType": "jpg",
    "readyInMinutes": 35,
    "servings": 2,
    "sourceUrl": "https://example.com/recipes/spinach-feta-stuffed-portobello",
    "ingredients": ["portobello mushrooms", "spinach", "feta cheese", "garlic", "olive oil"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1012,
    "title": "Butternut Squash Soup",
    "imageType": "jpg",
    "readyInMinutes": 50,
    "servings": 4,
    "sourceUrl": "https://example.com/recipes/butternut-squash-soup",
    "ingredients": ["butternut squash", "onions", "garlic", "vegetable broth", "coconut milk"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1013,
    "title": "Cauliflower Fried Rice",
    "imageType": "jpg",
    "readyInMinutes": 25,
    "servings": 2,
    "sourceUrl": "https://example.com/recipes/cauliflower-fried-rice",
    "ingredients": ["cauliflower", "carrots", "peas", "eggs", "tamari sauce"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1014,
    "title": "Greek Salad",
    "imageType": "jpg",
    "readyInMinutes": 15,
    "servings": 2,
    "sourceUrl": "https://example.com/recipes/greek-salad",
    "ingredients": ["cucumbers", "tomatoes", "red onions", "feta cheese", "olives"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1015,
    "title": "Vegetable Paella",
    "imageType": "jpg",
    "readyInMinutes": 50,
    "servings": 4,
    "sourceUrl": "https://example.com/recipes/vegetable-paella",
    "ingredients": ["rice", "bell peppers", "peas", "artichokes", "saffron"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1016,
    "title": "Tomato Basil Soup",
    "imageType": "jpg",
    "readyInMinutes": 40,
    "servings": 4,
    "sourceUrl": "https://example.com/recipes/tomato-basil-soup",
    "ingredients": ["tomatoes", "basil", "garlic", "onions", "vegetable broth"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1017,
    "title": "Roasted Brussels Sprouts with Balsamic Glaze",
    "imageType": "jpg",
    "readyInMinutes": 35,
    "servings": 3,
    "sourceUrl": "https://example.com/recipes/roasted-brussels-sprouts-balsamic",
    "ingredients": ["brussels sprouts", "olive oil", "balsamic vinegar", "garlic", "salt"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  },
  {
    "id": 1018,
    "title": "Spaghetti Squash with Marinara Sauce",
    "imageType": "jpg",
    "readyInMinutes": 45,
    "servings": 2,
    "sourceUrl": "https://example.com/recipes/spaghetti-squash-marinara",
    "ingredients": ["spaghetti squash", "tomato sauce", "garlic", "basil", "parmesan cheese"],
    "tags": ["vegetarian", "gluten-free"],
    "excludedAllergens": ["peanuts", "shellfish"]
  }
]



const DietPlan = () => {
  const [Calories, setCalories] = useState(0);

  const data= useHealthData().formData

  useEffect(() => {
    fetchMeals();
  },[])

  const fetchMeals = async () => {
    try
    {
      const response = await api.get('/nutrition/dietPlan')
    
  } 
  catch (error) {
      console.error('Error fetching meals:', error);
    }
  };
  

  // Calculate BMR (Basal Metabolic Rate)
  const calculateBMR = () => {
    if (!data.age || !data.height || !data.weight) return null;
    
    // Convert string values to numbers
    const age = parseInt(data.age, 10);
    const height = parseFloat(data.height);
    const weight = parseFloat(data.weight);
    
    // Validate the parsed values
    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
      console.error('Invalid numeric values for BMR calculation', { age, height, weight });
      return null;
    }
    
    // Mifflin-St Jeor Equation
    if (data.gender === 'Female') {
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
    return bmr * (activityFactors[data.fitnessLevel] || 1.2);
  };

  // Adjust calories based on goals
  const calculateGoalCalories = (tdee) => {
    const goalFactors = {
      'Lose Weight': 0.85,
      'Gain Muscle': 1.15,
      'Improve Endurance': 1.1,
      'Stay Healthy': 1.0
    };
    
    // Calculate the calorie value without setting state
    return Math.round(tdee * (goalFactors[data.fitnessGoals] || 1.0));
  };

  const calories = () => {
    if (!data.age || !data.height || !data.weight || !data.gender || !data.fitnessLevel) {
      return null;
    }
    
    // Convert string values to numbers for calculation
    const age = parseInt(data.age, 10);
    const height = parseFloat(data.height);
    const weight = parseFloat(data.weight);
    
    // Validate the parsed values
    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
      console.error('Invalid numeric values for calculation', { age, height, weight });
      return null;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (data.gender === 'Female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    
    // Apply activity factor based on fitness level
    const activityFactors = {
      'Beginner': 1.2,      // Sedentary or light activity
      'Intermediate': 1.375, // Moderate activity
      'Advanced': 1.55      // Active individuals
    };
    
    const tdee = bmr * (activityFactors[data.fitnessLevel] || 1.2);
    
    // Adjust calories based on fitness goals
    
    return calculateGoalCalories(tdee);
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
                <Typography sx={{ color: 'white' }}><strong>Age:{data.age}</strong> </Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Height:{data.height}cm</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Weight:{data.weight}kg</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Fitness Level:{data.fitnessLevel}</strong> </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: 'white' }}><strong>Goal:{data.fitnessGoals}</strong></Typography>
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

        {/* Meal Grid Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Recommended Meals
            </Typography>
            <Divider sx={{ my: 2, bgcolor: '#333' }} />
            
            <Grid container spacing={3}>
              {meals.map((meal, index) => (
                <Grid item xs={12} sm={6} md={4} key={meal.id}>
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
                    <CardMedia
                      component="img"
                      height="120"
                      image={meal.image ? meal.image : foodImages[index % foodImages.length]}
                      alt={meal.title}
                      sx={{ 
                        objectFit: 'cover',
                        maxHeight: '120px',
                        width: '100%'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'white' }}>
                        {meal.title}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ color: '#aaa' }}>
                          Prep time: {meal.readyInMinutes} min
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ color: '#aaa' }}>
                          Servings: {meal.servings}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#ddd', mb: 2 }}>
                        Ingredients: {meal.ingredients.slice(0, 3).join(', ')}
                        {meal.ingredients.length > 3 ? '...' : ''}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                        {meal.tags.map((tag, index) => (
                          <Chip 
                            key={index}
                            label={tag}
                            size="small"
                            sx={{ 
                              backgroundColor: '#444', 
                              color: 'white',
                              fontSize: '0.7rem'
                            }}
                          />
                        ))}
                      </Box>
                      <Button 
                        variant="contained" 
                        size="small" 
                        color="primary"
                        sx={{ mt: 1 }}
                        href={meal.sourceUrl}
                        target="_blank"
                      >
                        View Recipe
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>




    </Box>
  );
};


export default DietPlan;
