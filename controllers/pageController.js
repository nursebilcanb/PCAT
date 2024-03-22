const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
  res.render('about.ejs');
};

exports.getAddPage = (req, res) => {
  res.render('add.ejs');
};

exports.getEditPage = async (req, res) => {
  const editedPhoto = await Photo.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.render('edit.ejs', {
    photo: editedPhoto,
  });
};
