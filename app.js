const express = require('express');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const methodOverride = require('method-override');

const Photo = require('./models/Photo');

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
app.post('/photos', async (req, res) => {
  // await Photo.create({
  //   title: req.body.title,
  //   description: req.body.description,
  //   image:null,
  //   qty:50
  // });
  //console.log(req.files.image);
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads/';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });

    res.redirect('/');
  });
});

app.get('/', async (req, res) => {
  const photos = (await Photo.findAll()).sort(
    (a, b) => b.createdAt - a.createdAt
  );
  res.render('index.ejs', {
    photos: photos,
  });
});
app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  //res.render('photo.ejs');
  const photo = await Photo.findByPk(req.params.id);
  res.render('photo.ejs', {
    photo: photo,
  });
});
app.get('/photos/edit/:id', async (req, res) => {
  const editedPhoto = await Photo.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.render('edit.ejs', {
    photo: editedPhoto,
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({
    where: {
      id: req.params.id,
    },
  });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
});

app.delete('/photos/:id', async (req,res)=>{
  const photo = await Photo.findOne({id:req.params.id});
  let deletedPhoto = __dirname + '/public' + photo.image;
  fs.unlinkSync(deletedPhoto);
  await photo.destroy();
  res.redirect('/');
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
