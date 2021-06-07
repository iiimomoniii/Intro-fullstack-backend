const express = require('express');
const app = express();

const multer = require('multer')
//import config
const multerConfig = require('./config/multer_config')
//accept keyUpload (photo)
var upload = multer(multerConfig.config).single(multerConfig.keyUpload)

//post method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/productUploadImage/1
app.post('/productUploadImage/:id', upload ,(req, res) => {
    console.log(req.body);
})


const PORT = process.env.PORT || 1150

app.listen(PORT, () => {
    const env = `${process.env.NODE_ENV || 'development'}`
    console.log(`App listening on port ${PORT}`);
    console.log(`App listening on port ${env}`);
    console.log(`Press Ctrl+C to quit.`);
})