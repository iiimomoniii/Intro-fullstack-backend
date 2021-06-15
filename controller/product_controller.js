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

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - stock
 *         - image
 *         - updatedAt
 *         - createdAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The product name
 *         price:
 *           type: integer
 *           description: The product price
 *         stock:
 *           type: integer
 *           description: The product stock
 *         updatedAt:
 *           type: string
 *           description: The product updatedAt
 *         createdAt:
 *           type: string
 *           description: The product createdAt
 *       example:
 *         id: 1
 *         name: iphone
 *         price: 123456
 *         stock: 999
 *         image: photo-1623749413759
 *         updatedAt: 2021-06-15T09:30:13.765Z
 *         createdAt: 2021-06-15T09:30:13.765Z
 */


 /**
  * @swagger
  * tags:
  *   name: Product
  *   description: The product managing API
  */

/**
 * @swagger
 * /api/product:
 *   get:
 *      summary: Returns all product
 *      tags: [Product]
 *      responses:
 *         '200':
 *           description: The list of the products
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 */

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

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Returns a single product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *      '200':
 *         description: A single product
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Product'
 *      '500':
 *         description: Some server error
 */

//get method with param
//postman CMS_NodeJS http://localhost:1150/product/1
router.get('/product/:id', async (req, res) => {
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

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               stock:
 *                 type: integer
 *                 required: true
 *               price:
 *                 type: integer
 *                 required: true
 *               photo:
 *                 type: file
 *                 required: false
 *     responses:
 *      '201':
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Product'
 *      '500':
 *         description: Some server error
 */

//post method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/product
router.post('/product', (req, res) => {

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

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               stock:
 *                 type: integer
 *                 required: true
 *               price:
 *                 type: integer
 *                 required: true
 *               photo:
 *                 type: file
 *                 required: false
 *     responses:
 *      '201':
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Product'
 *      '500':
 *         description: Some server error
 */

//put method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/product/23
router.put('/product/:id', async (req, res) => {
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

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *      '204':
 *         description: Product is deleted
 *      '404':
 *         description: Product not found
 *      '500':
 *         description: Some server error
 */

//delete method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/editproduct/23
router.delete('/product/:id', async (req, res) => {
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