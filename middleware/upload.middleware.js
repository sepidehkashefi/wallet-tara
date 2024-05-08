const multer = require('multer')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __tempUpload)
  },
  filename: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    file.originalname = file.originalname.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    file.filename = file.originalname;
    let newName = `${Date.now()}--${file.originalname}`
    cb(null, newName)
  },
})
const uploadFile = multer({ storage: storage })


module.exports = uploadFile