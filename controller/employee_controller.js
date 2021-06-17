const express = require('express')
const router = express.Router()

const multer = require('multer')
const multerConfig = require('../config/multer_config')

const upload = multer(multerConfig.config).single(multerConfig.keyUpload)
const db = require('../models')

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - address
 *         - email
 *         - phone
 *         - image
 *         - salary
 *         - updatedAt
 *         - createdAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the employees
 *         first_name:
 *           type: string
 *           description: The employee first_name
 *         last_name:
 *           type: string
 *           description: The employee last_name
 *         address:
 *           type: string
 *           description: The employee address
 *         email:
 *           type: string
 *           description: The employee email
 *         image:
 *           type: string
 *           description: The employee image
 *         salary:
 *           type: decimal
 *           description: The employee salary
 *         phone:
 *           type: string
 *           description: The employee phone
 *         updatedAt:
 *           type: string
 *           description: The employee updatedAt
 *         createdAt:
 *           type: string
 *           description: The employee createdAt
 *       example:
 *         id: 1
 *         first_name: Justinn
 *         last_name: Haddy
 *         address: 1611 Earnhardt Drive Louisville, KY 40202
 *         email: jhaddy0@liveinternet.ru
 *         phone: 502-663-9782
 *         Image:
 *         salary: 10000
 *         updatedAt: 2021-06-16 10:19:24.421 +00:00
 *         createdAt: 2021-06-16 10:19:24.421 +00:00
 */


 /**
  * @swagger
  * tags:
  *   name: Employee
  *   description: The employees managing API
  */

/**
 * @swagger
 * /api/employee:
 *   get:
 *      summary: Returns all employee
 *      tags: [Employee]
 *      responses:
 *         '200':
 *           description: The list of the employees
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Employee'
 */

//get method
//postman CMS_NodeJS http://localhost:1150/employee
router.get('/employee', async (req, res) => {
    try {
        const result = await db.Employees.findAll(
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
 * /api/employee/{id}:
 *   get:
 *     summary: Returns a single employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *      '200':
 *         description: A single employee
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Employee'
 *      '500':
 *         description: Some server error
 */

//get method with param
//postman CMS_NodeJS http://localhost:1150/employee/1
router.get('/employee/:id', async (req, res) => {
    try {
        const result = await db.Employees.findOne({
            where: {
                'id': req.params.id
            }
        });
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404).json({ message : 'Employee not found' })
        }
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
});

/**
 * @swagger
 * /api/employee:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 required: true
 *               last_name:
 *                 type: string
 *                 required: true
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *                 required: true
 *               photo:
 *                 type: file
 *                 required: false
 *               salary:
 *                 type: decimal
 *                 required: true
 *     responses:
 *      '201':
 *         description: The employee was successfully created
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Employee'
 *      '500':
 *         description: Some server error
 */

//post method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/employee
router.post('/employee', (req, res) => {

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
            const employee = await db.Employees.create(data);
            res.status(201).json(employee);
        } catch (error) {
            res.status(500).json({ message : error.message });
        }
    })
})

/**
 * @swagger
 * /api/employee/{id}:
 *   put:
 *     summary: Update a employee
 *     tags: [Employee]
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
 *               first_name:
 *                 type: string
 *                 required: true
 *               last_name:
 *                 type: string
 *                 required: true
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *                 required: true
 *               photo:
 *                 type: file
 *                 required: false
 *               salary:
 *                 type: decimal
 *                 required: true
 *     responses:
 *      '201':
 *         description: The employee was successfully updated
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Employee'
 *      '500':
 *         description: Some server error
 */

//put method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/employee/23
router.put('/employee/:id', async (req, res) => {
    try {
        const result = await db.Employees.findOne({
            where: {
                'id': req.params.id
            }
        });
        if(!result){
            return res.status(404).json({ message : 'Employee not found' })
        } else {
            updateEmployee(req, res, result);
        }
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
})

//updateEmployee
function updateEmployee (req, res, employee) {
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
            //[updated] is array of employee object
            const [updated] = await db.Employees.update(data, {
                where : {
                    id : employee.id
                }
            })
            //if update success 
            if(updated){
                const updateEmployee = await db.Employees.findByPk(employee.id)
                res.status(200).json(updateEmployee)
            }else{
                throw new Error('Employee not found');
            }
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    })
}

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Delete a employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *      '204':
 *         description: Employee is deleted
 *      '404':
 *         description: Employee not found
 *      '500':
 *         description: Some server error
 */

//delete method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/employee/23
router.delete('/employee/:id', async (req, res) => {
    try {
        const deleted = await db.Employees.destroy({
            where: {
                'id': req.params.id
            }
        });
        if(!deleted){
            return res.status(404).json({ message : 'Employee not found' });
        } else {
            return res.status(204).json({ message : 'Employee is deleted' });
        }
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
})

module.exports = router