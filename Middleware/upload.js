var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Public/User')
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + '-' + Date.now())
  }
})

var upload = multer({
  storage: storage
})

module.exports = upload;