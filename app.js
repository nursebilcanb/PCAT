const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

// TEMPLATE ENGINE
app.set('view engine', ejs);

// MIDDLEWARES
app.use(express.static('public'));

// ROUTES
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
