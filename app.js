const express        = require('express'),
      bodyParser     = require('body-parser'),
      app            = express(),
      mongoose       = require('mongoose'),
      methodOverride = require('method-override'),
      Dish           = require('./models/dishes'),
      Spot           = require('./models/spot'),
      spotRoutes     = require('./routes/spot'),
      dishRoutes     = require('./routes/dish'),
      options        = require('./data/indexData');

let port = process.env.PORT;
//DB SETUP
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);






if (port == null || port == "") {
 //CONNECTING TO LOCAL DB
 mongoose.connect("mongodb://localhost/cravvyt");
}else{
  //CONNECT TO CLOUD DB
  mongoose.connect("mongodb://edgar:abc123@ds125479.mlab.com:25479/cravyyt");

}


// APP SET UP
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use('/spot',spotRoutes);
app.use('/spot/:id/dishes',dishRoutes);
app.use(methodOverride("_method"));




app.get('/',(req,res)=>{
  const url = req.originalUrl;
  
  res.render('index', { options: options, url: req.originalUrl});
});

app.get('/search',(req,res)=>{
  const query = req.query;
  res.render('search', { qs: query, url: req.originalUrl});
})

app.get('/dishInfo',(req,res)=>{
  res.render('dishInfo', { url: req.originalUrl});
})

app.get('/search/happy-hour',(req,res)=>{
  Restaurant.find({happyHour:true},(err,restaurants)=>{
    if(err){
      console.log(err);
    }else{
      res.render('search', { restaurants: restaurants, url: req.originalUrl})
    }
  })
});

app.get('/search/drinks',(req,res)=>{
  Restaurant.find({alcohol:true},(err,restaurants)=>{
    if(err){
      console.log(err);
    }else{
      res.render('search', { restaurants: restaurants, url: req.originalUrl})
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


//format for dish info 
// app.get('/test',(req,res)=>{
//   Dish.findById('5e66142550d906e6040fab01').populate('spotInfo').exec((err,worked)=>{
//     res.render('test', { data: worked });
//   })
// })


if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
// app.listen(3000,'127.0.0.1',()=>{console.log('server is live');});