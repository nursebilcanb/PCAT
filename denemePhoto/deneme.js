// Örnek bir dosya (örneğin, db.js)
const { Sequelize, DataTypes, where } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

// Model tanımlama
const Photo = sequelize.define('Photo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});


const findbyIdandUpdate = async (id)=>{
  const updatedPhoto = await Photo.update({
    title: 'Photo 2 Updated',
    description: 'Photo 2 description updated',
    qty: 100

  } , {where: {id:id}}) ;
  
  console.log(`Id ye gore guncellenen fotograf : ${JSON.stringify(updatedPhoto,null,2)}`);
};

const findbyId = async (id)=>{
  const photo = await Photo.findByPk(id);
  console.log(`Id ye gore bulunan fotograf : ${JSON.stringify(photo,null,2)}`);
}

const savePhoto = async () => {

  const photo3 = Photo.build({
    title:'Photo 4',
    description: 'Photo 4 description',
    qty: 350
  });

  
   await photo3.save().then(()=> {
    console.log(`${photo3.title} basariyla kaydedildi.`);
  }
  ).catch(()=>{
    console.log(`${photo3.title} kaydedilirken hata olustu.`);
  }
  );
};

const  findPhoto = async () =>{
  await sequelize.sync(); // Veritabanını senkronize etmek için
  const photos  = await Photo.findAll();
  console.log(`Bulunan fotograflar: ${JSON.stringify(photos,null,2)}`);
  
}



module.exports = {findbyId,findPhoto, savePhoto, findbyIdandUpdate};

// Örnek bir sorgu
// (async () => {
//   await sequelize.sync(); // Veritabanını senkronize etmek için
//   const newPhoto = await Photo.create({ title:'Photo 1', description:'Photo 1 description', qty: 50 });
//   console.log(newPhoto.toJSON());
// })();