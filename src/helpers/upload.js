const multer = require('multer')
const fs = require('fs')
const path = require('path')
const size = 5000

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'assets/uploads'

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: size,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only image files with extension jpeg/jpg/png are allowed!'), false)
    }
    return cb(null, true)
  }
})

module.exports = upload
