const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({include: [Product]});
    if (!tags) {
      return res.status(400).json({message: 'failed to find tags'});
    };
    res.status(200).json(tags);
  } catch (err) {res.status(500).json(err)};
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne({
      where: {id: req.params.id},
      include: [Product],
    })
    if(!tag) {
      return res.status(400).json({message: 'failed to find tag'});
    }
    res.status(200).json(tag);
  } catch (err) {res.status(500).json(err)};
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    if(!newTag) {
      return res.status(400).json({message: 'failed to create new tag'});
    }
    res.status(200).json(newTag);
} catch (err) {res.status(500).json(err)};
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if (!updateTag) {
      return res.status(404).json({message: 'failed to update tag with this id'});
    }
    res.status(200).json(updateTag);
  } catch (err) {res.status(500).json(err)};
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      return res.status(404).json({message: 'No tag found with this id'});
    }
    res.status(200).json(deleteTag);
  } catch (err) {res.status(500).json(err)}
});

module.exports = router;
