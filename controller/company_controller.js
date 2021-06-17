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
 *     Company:
 *       type: object
 *       required:
 *         - formal_name
 *         - total_employees
 *         - address
 *         - email
 *         - photo
 *         - phone
 *         - updatedAt
 *         - createdAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the company
 *         formal_name:
 *           type: string
 *           description: The company name
 *         total_employees:
 *           type: integer
 *           description: The company total employees
 *         address:
 *           type: string
 *           description: The company address
 *         email:
 *           type: string
 *           description: The company email
 *         photo:
 *           type: string
 *           description: The company photo
 *         phone:
 *           type: string
 *           description: The company phone
 *         updatedAt:
 *           type: string
 *           description: The company updatedAt
 *         createdAt:
 *           type: string
 *           description: The company createdAt
 *       example:
 *         id: 1
 *         formal_name: Openlane
 *         total_employees: 2000
 *         address: 3905 Farland Street Cambridge, MA 02142
 *         email: info@openlane.com
 *         image:
 *         phone: 774-206-4935
 */


 /**
  * @swagger
  * tags:
  *   name: Company
  *   description: The company managing API
  */

/**
 * @swagger
 * /api/company:
 *   get:
 *      summary: Returns all company
 *      tags: [Company]
 *      responses:
 *         '200':
 *           description: The list of the companies
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Company'
 */

//get method
//postman CMS_NodeJS http://localhost:1150/company
router.get('/company', async (req, res) => {
    try {
        const result = await db.Companies.findAll(
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
 * /api/company/{id}:
 *   get:
 *     summary: Returns a single company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *      '200':
 *         description: A single company
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Company'
 *      '500':
 *         description: Some server error
 */

//get method with param
//postman CMS_NodeJS http://localhost:1150/company/1
router.get('/company/:id', async (req, res) => {
    try {
        const result = await db.Companies.findOne({
            where: {
                'id': req.params.id
            }
        });
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404).json({ message : 'Company not found' })
        }
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
});

/**
 * @swagger
 * /api/company:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               formal_name:
 *                 type: string
 *                 required: true
 *               total_employees:
 *                 type: integer
 *                 required: true
 *               address:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               photo:
 *                 type: string
 *                 required: false
 *               phone:
 *                 type: string
 *                 required: true
 *     responses:
 *      '201':
 *         description: The company was successfully created
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Company'
 *      '500':
 *         description: Some server error
 */

//post method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/company
router.post('/company', (req, res) => {

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
            const company = await db.Companies.create(data);
            res.status(201).json(company);
        } catch (error) {
            res.status(500).json({ message : error.message });
        }
    })
})

/**
 * @swagger
 * /api/company/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Company]
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
 *               formal_name:
 *                 type: string
 *                 required: true
 *               total_employees:
 *                 type: integer
 *                 required: true
 *               address:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               photo:
 *                 type: string
 *                 required: false
 *               phone:
 *                 type: string
 *                 required: true
 *     responses:
 *      '201':
 *         description: The company was successfully updated
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Company'
 *      '500':
 *         description: Some server error
 */

//put method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/company/23
router.put('/company/:id', async (req, res) => {
    try {
        const result = await db.Companies.findOne({
            where: {
                'id': req.params.id
            }
        });
        if(!result){
            return res.status(404).json({ message : 'Company not found' })
        } else {
            updateCompany(req, res, result);
        }
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
})

//updateCompany
function updateCompany (req, res, company) {
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
            //[updated] is array of company object
            const [updated] = await db.Companies.update(data, {
                where : {
                    id : company.id
                }
            })
            //if update success 
            if(updated){
                const updateCompany = await db.Companies.findByPk(company.id)
                res.status(200).json(updateCompany)
            }else{
                throw new Error('Company not found');
            }
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    })
}

/**
 * @swagger
 * /api/company/{id}:
 *   delete:
 *     summary: delete a company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *      '204':
 *         description: Company is deleted
 *      '404':
 *         description: Company not found
 *      '500':
 *         description: Some server error
 */

//delete method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/company/23
router.delete('/company/:id', async (req, res) => {
    try {
        const deleted = await db.Companies.destroy({
            where: {
                'id': req.params.id
            }
        });
        if(!deleted){
            return res.status(404).json({ message : 'Company not found' });
        } else {
            return res.status(204).json({ message : 'Company is deleted' });
        }
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
})

module.exports = router