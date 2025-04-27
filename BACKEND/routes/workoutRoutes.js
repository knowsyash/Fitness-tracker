import express from 'express';

const router = express.Router();

// GET all workouts
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Get all workouts route' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET workout by ID
router.get('/:id', async (req, res) => {
  try {
    res.json({ message: `Get workout with ID: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new workout
router.post('/', async (req, res) => {
  try {
    res.status(201).json({ message: 'Create new workout route', data: req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update workout
router.put('/:id', async (req, res) => {
  try {
    res.json({ message: `Update workout with ID: ${req.params.id}`, data: req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE workout
router.delete('/:id', async (req, res) => {
  try {
    res.json({ message: `Delete workout with ID: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;