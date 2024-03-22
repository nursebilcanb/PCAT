const Photo = require('../models/Photo');
const fs = require('fs');


exports.getAllPhotos = async (req, res) => {
  const photos = (await Photo.findAll()).sort(
    (a, b) => b.createdAt - a.createdAt
  );
  res.render('index.ejs', {
    photos: photos,
  });
};

exports.getPhoto = async (req, res) => {
  //console.log(req.params.id);
  //res.render('photo.ejs');
  const photo = await Photo.findByPk(req.params.id);
  res.render('photo.ejs', {
    photo: photo,
  });
};

exports.createPhoto = async (req, res) => {
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
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });

    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({
    where: {
      id: req.params.id,
    },
  });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};


exports.deletePhoto =  async (req,res)=>{
    const photo = await Photo.findByPk(req.params.id);
    let deletedPhoto = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedPhoto);
    await photo.destroy();
    res.redirect('/');
  }