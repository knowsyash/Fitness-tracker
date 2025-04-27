import express from 'express';
import { getDietPlan } from '../controllers/dietplan.js';

const router = express.Router();

// GET all nutrition entries

  router.post('/save', async (req, res) => {
    const { healthData } = req.body;
  
    try {
      const response = await saveData(healthData);
      if (response.success) {
        res.status(200).json({ message: 'Data saved successfully', data: response.data });
      } else {
        res.status(500).json({ message: 'Error saving data' });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

 router.get('/dietPlan', async (req, res) => {
    try {
        const dietPlan = await getDietPlan(); // Assuming this function fetches the diet plan
        console.log('Diet Plan:', dietPlan); // Log the diet plan for debugging
        res.status(200).json(dietPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching diet plan' });
    }

    



 })


  



export default router;