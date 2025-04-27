import express from 'express';

const router = express.Router();

// GET all nutrition entries
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Get all nutrition entries route' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET nutrition entry by ID
router.get('/:id', async (req, res) => {
  try {
    res.json({ message: `Get nutrition entry with ID: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new nutrition entry
router.post('/', async (req, res) => {
  try {
    res.status(201).json({ message: 'Create new nutrition entry route', data: req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update nutrition entry
router.put('/:id', async (req, res) => {
  try {
    res.json({ message: `Update nutrition entry with ID: ${req.params.id}`, data: req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE nutrition entry
router.delete('/:id', async (req, res) => {
  try {
    res.json({ message: `Delete nutrition entry with ID: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;