const express = require('express');
const ejs = require('ejs');
const path = require('path');

const Photo = require('./models/Photo');

const app = express();

// TEMPLATE ENGINE
app.set('view engine', ejs);

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.post('/photos', async (req,res)=>{
  // await Photo.create({
  //   title: req.body.title,
  //   description: req.body.description,
  //   image:null,
  //   qty:50
  // });
  await Photo.create(req.body);
  res.redirect('/');
});

app.get('/', async (req, res) => {
  const photos = await Photo.findAll();
  res.render('index.ejs', {
    photos:photos
  });
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/add', (req, res) => {
  res.render('add.ejs');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi..`);
});
