const express        = require('express'),
      bodyParser     = require('body-parser'),
      app            = express(),
      mongoose       = require('mongoose'),
      methodOverride = require('method-override'),
      Dish           = require('./models/dishes'),
      Spot           = require('./models/spot'),
      spotRoutes     = require('./routes/spot'),
      dishRoutes     = require('./routes/dish');


//DB SETUP
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//CONNECTING TO DB
mongoose.connect("mongodb://localhost/cravvyt");

// APP SET UP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/spot',spotRoutes);
app.use('/spot/:id/dishes',dishRoutes);
app.use(methodOverride("_method"));




app.get('/',(req,res)=>{
  res.render('index');
});





app.get('/search/happy-hour',(req,res)=>{
  Restaurant.find({happyHour:true},(err,restaurants)=>{
    if(err){
      console.log(err);
    }else{
      res.render('search',{restaurants:restaurants})
    }
  })
});

app.get('/search/drinks',(req,res)=>{
  Restaurant.find({alcohol:true},(err,restaurants)=>{
    if(err){
      console.log(err);
    }else{
      res.render('search',{restaurants:restaurants})
    }
  })
})


app.post('/restaurant/:id/dish',(req,res)=>{
  const id = req.params.id;
  Dish.create(req.body.dish,(err,newDish)=>{
    if(err){
      console.log(err);
    }else{
      Restaurant.findById(id,(err,foundRestuarnat)=>{
        foundRestuarnat.dishes.push(newDish);
        foundRestuarnat.save((err,data)=>{
          if(err){
            console.log(err);
          }else{
            console.log(data);
            res.redirect('/restaurant/'+id);
          }
        })
      })
    }
  })
});



app.listen(3000,'127.0.0.1',()=>{console.log('server is live');});