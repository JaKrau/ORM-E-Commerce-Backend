const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products and their associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [Category, Tag]
    });
    res.status(200).json(productData);
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`, including associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [Category, Tag]
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with that id.' });
      return;
    }
    res.status(200).json(productData);
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body)
    if (req.body.tagIds && req.body.tagIds.length) {
      const arrayProductTagID = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(arrayProductTagID);
    }
    res.status(200).json(productData);
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id
          }
      });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
    res.status(200).json(productData);
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with that id.' });
      return;
    }
    res.status(200).json(productData);
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

module.exports = router;
