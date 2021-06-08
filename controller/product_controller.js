const express = require('express')
//route for link to server.js
const router = express.Router()

const multer = require('multer')
//import config multer
const multerConfig = require('../config/multer_config')
//accept keyUpload (photo)
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)

//post method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/productUploadImage/1
router.post('/productUploadImage/:id', (req, res) => {

    upload(req, res, (err) => {
        //condition 
        if (err instanceof multer.MulterError) {
            console.log(`error : ${JSON.stringify(err)}`);
        } else if (err) {
            console.log(`error : ${JSON.stringify(err)}`);
        }
        //condition for check filename 
        const fileName = req.file ? req.file.fieldname : undefined;
        res.send(`POST Product: ${req.params.id}, ${fileName}`);
    })
})

module.exports = router