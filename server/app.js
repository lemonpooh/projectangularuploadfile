const express = require('express')

const multer = require('multer')

const cors = require('cors')

const bodyparser = require('body-parser')

const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname + "/uploads")))

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({ storage: storage }).single('file');

var multipleUpload = multer({storage:storage}).array('multipleFiles')

app.post('/file', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(req.file.path)
        res.json({
            path:req.file.filename
        })
    })
})

app.post('/multiplefiles', (req, res) => {
    multipleUpload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(req.files)

        let img = []

        req.files.forEach(file => {
            img.push(file.filename)
        });

        res.json({
            path:img
        })
        
    })
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})