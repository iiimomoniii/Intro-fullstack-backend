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

//get method with param
//postman CMS_NodeJS http://localhost:1150/findbyproductid/1
router.get('/findbyproductid/:id', async (req, res) => {
    try {
        const result = await db.Products.findOne({
            where: {
                'id': req.params.id
            }
        });
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404).json({ message : 'Product not found' })
        }
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
});

//post method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/addproduct
router.post('/addproduct', (req, res) => {

    upload(req, res, async (err) => {
        //condition 
        if (err instanceof multer.MulterError) {
            console.log(`error : ${JSON.stringify(err)}`);
            return res.status(500).json({ message : err });
        } else if (err) {
            console.log(`error : ${JSON.stringify(err)}`);
            return res.status(500).json({ message : err });
        }
        //assign data from req to dataobj
        const data = {
            ...req.body,
            image : req.file ? req.file.filename : undefined
        }

        try {
            const product = await db.Products.create(data);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message : error.message });
        }
    })
})

//put method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/editproduct/23
router.put('/editproduct/:id', async (req, res) => {
    try {
        const result = await db.Products.findOne({
            where: {
                'id': req.params.id
            }
        });
        if(!result){
            return res.status(404).json({ message : 'Product not found' })
        } else {
            updateProduct(req, res, result);
        }
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
})

//updateProduct
function updateProduct (req, res, product) {
    upload(req, res, async (err)=> {
        if (err instanceof multer.MulterError) {
            console.log(`error : ${JSON.stringify(err)}`);
            return res.status(500).json({ message : err });
        } else if (err) {
            console.log(`error : ${JSON.stringify(err)}`);
            return res.status(500).json({ message : err });
        }

        const data = {
            ...req.body,
            image : req.file ? req.file.filename : undefined
        }
        try {
            //[updated] is array of product object
            const [updated] = await db.Products.update(data, {
                where : {
                    id : product.id
                }
            })
            //if update success 
            if(updated){
                const updateProduct = await db.Products.findByPk(product.id)
                res.status(200).json(updateProduct)
            }else{
                throw new Error('Product not found');
            }
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    })
}

//delete method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/editproduct/23
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const deleted = await db.Products.destroy({
            where: {
                'id': req.params.id
            }
        });
        if(!deleted){
            return res.status(404).json({ message : 'Product not found' });
        } else {
            return res.status(204).json({ message : 'Product is deleted' });
        }
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
})

module.exports = router