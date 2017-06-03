const express = require('express');
const multer = require('multer');

const config = require('../config/database');
const Images = require('../models/images');

const router = express.Router();

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './upload/images');
	},
	filename: function (req, file, cb) {
		if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
			var err = new Error();
			err.code = 'filetype';
			return cb(err);
		}
		else {
			cb(null, Date.now() + '_' + file.originalname);
		}
	}
});

var upload = multer({
	storage: storage
}).single('file');

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code == 'filetype') {
        res.json({
          success: false,
          message: "File type is invalid. Must be JPEG, JPG or PNG"
        });
      }
      res.json({
        success: false,
        message: "Error uploading file: " + err
      });
    }
    else {
      let newImage = new Images({
        path: "images/" + req.file.filename
      });

      Images.addItem(newImage, (err, image) => {
        if (err) {
          res.json({
            success: false,
            message: "Failed to add new item"
          });
        }
        else {
          res.json({
            success: true,
            message: "Image was uploaded",
            filepath: "images/" + req.file.filename
          });
        };
      })
    }
  })
});

// Get All
router.get('/getAll', (req, res) => {
  Images.getAll((err, images) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    }
    else {
      res.json({
        success: true,
        message: "Got images",
        images: images
      });
    };
  })
});

// Delete Single
router.put('/delete', (req, res) => {
  Images.deleteItem(req.body, (err, image) => {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    }
    else {
      res.json({
        success: true,
        message: "Removed " + image.path
      });
    }
  })
})

module.exports = router;