const express = require('express')
//route for link to server.js
const router = express.Router()

const multer = require('multer')
//import config multer
const multerConfig = require('../config/multer_config')
//accept keyUpload (photo)
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)
//use data from each model
const db = require('../models')

//get method
//postman CMS_NodeJS http://localhost:1150/product
router.get('/product', async (req, res) => {
    try {
        const result = await db.Products.findAll(
            {
            //sort data desc
            order : [
                ['id', 'DESC']
            ],
            //select some column
            //attributes: ['name','image']
            }      
        );
            
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
});

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