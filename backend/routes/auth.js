const express = require("express");
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



jwtsect = "vishalthakur1742000"

//create a user  using Post "/api/auth/createuser" . doesn't require auth
router.post('/createuser', [
    body('name', "name is empty").isLength({ min: 5 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', "password- must be altest 5 character").isLength({ min: 5 })
], async (req, res) => {

    //if there are errpr , return bad request and thr error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //  wether the user already exists
    try {

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "already  email exist" })
        }
       
        //password stored to hash
       const salt = await bcrypt.genSalt(10);
        securepass = await bcrypt.hash( req.body.password ,salt);



        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securepass
        })
        
        const data = {user: {
            id: user.id
        }}
        const jwttoken =  jwt.sign(data ,jwtsect)
        console.log(jwttoken );

        user.update() 
        //   .then(user => res.json(user))
        //   .catch(err=>
        //       console.log(err))
        //   res.json({error : "please enter valid data" , message:err.message}))
        res.json({jwttoken})

    }

    catch (e) {
        console.log(e);
        res.status(500).send("somenting went wrong user not created");
    }

})


module.exports = router