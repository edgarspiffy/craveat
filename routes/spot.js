const express = require('express');
const router = express.Router({ mergeParams: true });
const Spot = require('../models/spot');
const methodOverride = require('method-override');
router.use(methodOverride("_method"));

//GET INDEX
router.get('/', (req, res) => {
  Spot.find({}, (err, spots) => {
    if (err) {
      console.log(err);
    } else {
      res.render('spot/index', { spots: spots });
    }
  })
});

//GET NEW FORM
router.get('/new', (req, res) => {
  res.render('spot/new');
});

//GET INFO
router.get('/:id', (req, res) => {
  Spot.findById(req.params.id).populate('dishes').exec((err, spot) => {
    if (err) {
      console.log(err);
    } else {
      res.render('spot/info', { info: spot });
    }
  })
});


//GET EDIT
router.get('/:id/edit', (req, res) => {
  Spot.findById(req.params.id, (err, spot) => {
    if (err) {
      console.log(err);
    } else {
      res.render('spot/edit', { info: spot });
    }
  })
})

//POST NEW
router.post('/', (req, res) => {
  Spot.create(req.body.spot, (err, newSpot) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/spot');
    }
  })
});

//PUT EDIT
router.put('/:id', (req, res) => {
  Spot.findOneAndUpdate(req.params.id, req.body.spot, (err, updatedSpot) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/spot/' + req.params.id);
    }
  })
});

//DELETE
router.delete('/:id',(req,res)=>{
  Spot.findByIdAndRemove(req.params.id,(err)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/spot');
    }
  })
});

module.exports = router;