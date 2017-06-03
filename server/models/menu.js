const mongoose = require('mongoose');

const config = require('../config/database');

// Menu Schema
const MenuSchema = mongoose.Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  }
});

const Menu = module.exports = mongoose.model('Menu', MenuSchema);

module.exports.getAll = function (callback) {
  Menu.find({}, (err, menu) => {
    if (err) {
      callback(err, null);
    }
    callback(null, menu);
  });
};

module.exports.getItemById = function (id, callback) {
  Menu.findById(id, callback);
};

module.exports.addItem = function (newMenuItem, callback) {
  Menu.create(newMenuItem, (err, item) => {
    if (err) {
      callback(err, null);
    }
    callback(null, item);
  });
};

module.exports.editItem = function (menuItem, callback) {
  Menu.findOne({_id: menuItem._id}, (err, item) => {
    if (err) {
      callback(err, null);
    }
    if (menuItem.image) {
      item.image = menuItem.image;
    }
    if (menuItem.name) {
      item.name = menuItem.name;
    }
    if (menuItem.description) {
      item.description = menuItem.description;
    }
    if (menuItem.price) {
      item.price = menuItem.price;
    }
    item.save();
    callback(null, item);
  });
};

module.exports.deleteItem = function (menuItem, callback) {
  Menu.remove(menuItem, (err, menuItem) => {
    if (err) {
      callback(err, null);
    }
    callback(null, menuItem);
  });
};
