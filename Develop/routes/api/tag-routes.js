const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // finds all tags, including associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(tagData);
  }
  catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // finds a single tag by its `id`, includes its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id.' });
      return;
    }
    res.status(200).json(tagData);
  }
  catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  }
  catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id.' });
      return;
    }
    res.status(200).json(tagData);
  }
  catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id.' });
      return;
    }
    res.status(200).json(tagData);
  }
  catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
