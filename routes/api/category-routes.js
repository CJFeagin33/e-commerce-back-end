const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
  try {
    const categories = await Category.findAll({include: [Product]});
    if (!categories) {
      return res.status(400).json({message: 'failed to find categories'});
    };
    res.status(200).json(categories);
  } catch (err) {res.status(500).json(err)};
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      where: {id: req.params.id},
      include: [Product],
    })
    if(!category) {
      return res.status(400).json({message: 'failed to find category'});
    }
    res.status(200).json(category);
  } catch (err) {res.status(500).json(err)};
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    if(!newCategory) {
      return res.status(400).json({message: 'failed to create new category'});
    }
    res.status(200).json(newCategory);
} catch (err) {res.status(500).json(err)};
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if (!updateCategory) {
      return res.status(404).json({message: 'failed to update category with this id'});
    }
    res.status(200).json(updateCategory);
  } catch (err) {res.status(500).json(err)};
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteCategory) {
      return res.status(404).json({message: 'No category found with this id'});
    }
    res.status(200).json(deleteCategory);
  } catch (err) {res.status(500).json(err)}
});

module.exports = router;
