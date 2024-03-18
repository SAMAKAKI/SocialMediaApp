const express = require('express')
const router = express.Router();
const multer = require('multer');

const uploadDestination = 'uploads';

const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function(req, file, next){
    next(null, file.originalname)
  }
})

const uploads = multer({ storage: storage })

router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use('/like', require('./like'));
router.use('/follow', require('./follow'));

module.exports = router;
