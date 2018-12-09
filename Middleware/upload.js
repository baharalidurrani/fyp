var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './views/assets/pdf')
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + '-' + Date.now() + '.pdf')
  }
})

var upload = multer({
  storage: storage
})

module.exports = upload;