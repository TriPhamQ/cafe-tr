const mongoose = require('mongoose');
const fs = require('fs');

const config = require('../config/database');

const Menu = require('./menu.js');

// Image Schema
const ImageSchema = mongoose.Schema({
  path: {
    type: String
  }
});

const Image = module.exports = mongoose.model('Image', ImageSchema);

module.exports.getAll = function (callback) {
  Image.find({}, (err, images) => {
    if (err) {
      callback(err, null);
    }
    callback(null, images);
  });
};

module.exports.getItemById = function (id, callback) {
  Image.findById(id, callback);
};

module.exports.addItem = function (newImage, callback) {
  Image.create(newImage, (err, image) => {
    if (err) {
      callback(err, null);
    }
    callback(null, image);
  });
};

module.exports.deleteItem = function (img, callback) {
  Image.remove(img, (err) => {
    if (err) {
      callback(err, null);
    }
    Menu.find({image: img.path}, (err, items) => {
      if (err) {
        return
      }
      else {
        for (var index = 0; index < items.length; index++) {
          items[index].image = 'assets/images/placeholder.png';          
          items[index].save();
        };
      }
    }).then(fs.existsSync('./upload/' + img.path) ? fs.unlink('./upload/' + img.path, (err) => {
      if (err) {
        callback(err, null);
      }
    }) : console.log("No image in folder")).then(callback(null, img));
  })
};
