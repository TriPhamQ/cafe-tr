const express = require('express');

const config = require('../config/database');
const Menu = require('../models/menu');

const router = express.Router();

router.post('/add', (req, res) => {
  Menu.addItem(req.body, (err, item) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    }
    else {
      res.json({
        success: true,
        message: "Added item"
      });
    };
  })
});

// Get All
router.get('/getAll', (req, res) => {
  Menu.getAll((err, menu) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    }
    else {
      res.json({
        success: true,
        message: "Got menu",
        menu: menu
      });
    };
  })
});

module.exports = router;