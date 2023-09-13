const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // finds all categories include their associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categoryData);
  } 
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // finds one category by its `id` value and includes its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product]
    });
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

module.exports = router;
