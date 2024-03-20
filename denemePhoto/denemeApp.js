const express = require('express');
const ejs = require('ejs');
const path = require('path');

const {findPhoto,savePhoto, findbyId, findbyIdandUpdate} = require('./denemePhoto/deneme');

const Photo = require('./models/denemePhoto');

const app = express();


// TEMPLATE ENGINE
app.set('view engine', ejs);

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.post('/photos',(req,res)=>{
  res.redirect('/');
});


// **********  DENEME PHOTO  ***********
app.get('/findbyIdandUpdate/:id', async (req,res)=>{
  try {
    const updatedPhoto = await findbyIdandUpdate(req.params.id);
    res.json(updatedPhoto);
  } catch (error) {
    console.log(`Fotograf guncelleme islemi basarisiz oldu. Hata :  ${error}`);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.get('/save', async (req,res)=>{
    try {
      const savedPhoto = await savePhoto();
      res.send(savedPhoto);
    } catch (error) {
      console.log(`Fotograf kaydetme islemi basarisiz oldu. Hata :  ${error}`);
      res.status(500).json({error: 'Internal server error'});
    }
});

app.get('/findbyid/:id', async (req,res)=>{
  try {
    const photo = await findbyId(req.params.id);
    res.json(photo);
  } catch (error) {
    console.error(`Fotograf bulma islemi basarisiz oldu. Hata :  ${error}`);
    res.status(500).json({error: 'Internal server error'});
  }
});


app.get('/findPhoto',async (req,res)=>{
  try {
    const photos = await findPhoto();
    res.json(photos);
  } catch (error) {
    console.error(`Fotograf bulma islemi basarisiz oldu. Hata :  ${error}`);
    res.status(500).json({error: 'Internal server error'});
  }
});
// *********************************** 

app.get('/', (req, res) => {
  res.render('index.ejs');
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
