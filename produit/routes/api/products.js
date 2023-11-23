const express = require('express');
const router = express.Router();
const Item = require('../../models/product'); // Ensure the path to your model is correct

// Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Item.find();
    res.json(products);
  } catch (error) {
    console.error('An error occurred while fetching products:', error);
    res.status(500).json({ error: 'Error retrieving products' });
  }
});

// Fetch a specific product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Item.findById(req.params.id, 'images title price description category'); // Updated property names
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    console.error('An error occurred while fetching the product:', error);
    res.status(500).json({ error: 'Error retrieving the product.' });
  }
});

module.exports = router;
