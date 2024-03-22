const express = require('express');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');


const app = express();


// TEMPLATE ENGINE
app.set('view engine', ejs);

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));

// ROUTES
app.post('/photos', photoController.createPhoto);
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);


app.get('/photos/edit/:id', pageController.getEditPage);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi..`);
});
