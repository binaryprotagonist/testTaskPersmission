var routes = require("express").Router();
var FileCtrls = require("../controllers/FileControllers");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/files')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({storage: storage})

routes.get("/", FileCtrls.get);

routes.get("/show/:id", FileCtrls.show);

routes.post("/", upload.single('file'), FileCtrls.save);

module.exports = routes;