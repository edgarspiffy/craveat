const express = require('express');
const router = express.Router({ mergeParams: true });
const Dish = require('../models/dishes');
const Spot = require('../models/spot');
const methodOverride = require('method-override');
router.use(methodOverride("_method"));


// function formatIngredients(info,data){
//   info = data;
//   info.ingredients = info.ingredients.toLowerCase();
//   info.ingredients = info.ingredients.split(',');
//   return info;
// }

// GET NEW
router.get('/new',(req,res)=>{
  const id = req.params.id;
  res.render('dishes/new', { id, id, url: req.originalUrl });
});

// GET DISH INFO
router.get('/:id2',(req,res)=>{
const id = req.params.id;
const id2 = req.params.id2;
Dish.findById(id2,(err,foundDish)=>{
  res.render('dishes/info', { info: foundDish, id: id, id2: id2, url: req.originalUrl });
  });
});

// GET EDIT 
router.get('/:id2/edit',(req,res)=>{
  const id2 = req.params.id2
  const id = req.params.id;
  Dish.findById(id2,(err,foundDish)=>{
    if(err){
      console.log(err);
    }else{
      res.render('dishes/edit', { dish: foundDish, id: id, url: req.originalUrl });
    }
  });
});

//POST
router.post('/',(req,res)=>{
  const id = req.params.id;
  
  const info = req.body.dish;
  info.ingredients = info.ingredients.toLowerCase();
  info.ingredients = info.ingredients.split(',');
  
  Dish.create(info,(err,newDish)=>{
    if(err){
      console.log(err);
    }else{
      Spot.findById(id,(err,foundSpot)=>{
        if(err){
          console.log(err);
        }else{
          foundSpot.dishes.push(newDish);
          foundSpot.save((err)=>{
            if(err){
              console.log(err);
            }else{
              res.redirect('/spot/'+id);
            }
          })
        }
      })
    }
  })
});

// EDIT
router.put('/:id2',(req,res)=>{
  const id =req.params.id;
  const id2 = req.params.id2
  Dish.findByIdAndUpdate(id2,req.body.dish,(err,updatedDish)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/spot/'+id);
    }
  });
});


// DELETE
router.delete('/:id2',(req,res)=>{
  const id = req.params.id;
  const id2 = req.params.id2;
  Dish.findByIdAndRemove(id2,(err)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/spot/'+id);
    }
  })
})


module.exports = router;