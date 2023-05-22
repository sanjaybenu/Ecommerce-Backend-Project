const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {

  try{
    const categories = await Category.findAll({include:[{model:Product}]})
    res.status(200).json(categories)
  }
  catch(err){
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try{
    const catId = req.params.id
    const category = await Category.findAll({
      where:{
         id: catId // check
      },
      include:[{model:Product}]})
      if(category.length===0){
        return res.status(404).json({error:`Category id # ${catId} not found`})
      }
    res.status(200).json(category)
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const category = Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    //const categoryId = req.params.id
    const category = await Category.findAll({
      where:{
         id: req.params.id // check
      },
      include:[{model:Product}]
    })
      if(category.length===0){
        return res.status(404).json({error:`Category id not found`})
      }
    
  const catId = req.params.id
  Category.update(req.body,{
    where:{id : catId}
  })
  res.status(200).json({Success:`Category id ${catId} updated`})

}catch(err){
  res.status(500).json({error:'Something went wrong'})
}
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const catId = req.params.id
    const catDeleted = 
    await Category.destroy({
      where:{
         id: catId// check
      }
    })
      if(!catDeleted){
        return res.status(404).json({error:'Category not found'})
      }
    res.status(200).json({Success: `Category id # ${catId} is deleted`})
  }
  catch(err){
    res.status(500).json(err)
  }
  })
  ;

module.exports = router;