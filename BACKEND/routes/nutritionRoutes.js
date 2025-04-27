import express from 'express';

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

  



export default router;