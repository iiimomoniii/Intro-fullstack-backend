const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');
const constants = require('../constants/constants');

router.post('/login', async (req, res)=>{
    try {
        const { username, password } = req.body;
        const user = await db.Users.findOne({ where : { username : username}})
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                res.status(201).json({ result : constants.kResultOk, message : JSON.stringify(user)})
            } else {
                res.status(404).json({ result : constants.kResultNok, message : 'password incorrect' })
            }
        } else {
            res.status(404).json({ result : constants.kResultNok, message : 'username not found' })
        }
    } catch (error) {
        res.status(500).json({result : constants.kResultNok, message : error.message });
    }
})

router.post('/register', async (req, res)=>{

    req.body.password = bcrypt.hashSync(req.body.password, 8);

    const data = {
        ...req.body
    }

    try {

        const result = await db.Users.findOne({
            where: {
                'username': req.body.username
            }
        });

        if(!result) {
            const user = await db.Users.create(data);
            res.status(201).json({result : constants.kResultOk, user});
        } else {
            res.status(409).json({ message : 'an existing registered username' })
        }

    } catch (error) {
        res.status(500).json({result : constants.kResultNok, message : error.message });
    }

})

module.exports = router;