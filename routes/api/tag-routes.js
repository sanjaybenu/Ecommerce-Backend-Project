const router = require('express').Router();
const { Tag, Product, ProductTag} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
 try{ const tags = await Tag.findAll({include:{model:Product, through: ProductTag}})
    res.status(200).json(tags)
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {

  try{
    const tag = await Tag.findAll({
      where:{
         id: req.params.id // check
      },
      include:{model:Product, through: ProductTag}})
      if(tag.length===0){
        return res.status(404).json({error:'Tag not found'})
      }
    res.status(200).json(tag)
  }
  catch(err){
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  const newTag = Tag.create({tag_name : req.body.tag_name})
  res.json({Success: "New Tag Created"})
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagId = req.params.id
    Tag.update(req.body,{
      where:{id : tagId}
    })
    res.status(200).json({Success:`Tag id ${tagId} updated`})
  }catch(err){
    res.status(500).json({error:'Something went wrong'})
  }
  
})

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const tagId = req.params.id
    const tagDeleted = 
    await Tag.destroy({
      where:{
         id: tagId// check
      }
    })
      if(!tagDeleted){
        return res.status(404).json({error:'Category not found'})
      }
    res.status(200).json({Success: `Tag id # ${tagId} is deleted`})
  }
  catch(err){
    res.status(500).json(err)
  }
  })


module.exports = router;
