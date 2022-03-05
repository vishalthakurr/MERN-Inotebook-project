const express = require("express");
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");





jwtsect = "vishalthakur1742000"

//Route 1 create a user  using Post "/api/auth/createuser" . doesn't require auth
router.post('/createuser', [
    body('name', "name is empty").isLength({ min:4 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', "password- must be altest 5 character").isLength({ min: 5 })
], async (req, res) => {

    let success= false;

    //if there are errpr , return bad request and thr error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success ,errors: errors.array() });
    }
 
    //  wether the user already exists
    try {

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ success ,serror: "already  email exist" })
        }

        //password stored to hash
        const salt = await bcrypt.genSalt(10);
        securepass = await bcrypt.hash(req.body.password, salt);



        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securepass
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const jwttoken = jwt.sign(data, jwtsect)
        console.log(jwttoken);


        //   .then(user => res.json(user))
        //   .catch(err=>
        //       console.log(err))
        //   res.json({error : "please enter valid data" , message:err.message}))
        success= true;
        res.json({ success,jwttoken })

    }

    catch (e) {
        console.log(e);
        res.status(500).send("somenting went wrong user not created");
    }

})


//Route 2  authenticate a user  using Post "/api/auth/login" . doesn't require auth

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', "password cannot be blank").exists(),
], async (req, res) => {
  let   success = false;
 

    //if there are errpr , return bad request and thr error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (!user) {
            success = false;

            return res.status(400).json({ error: "please try to login with  correct  credentials" });
        }


        const passcomp = await bcrypt.compare(password, user.password);

        if (!passcomp) {
            success = false;
            return res.status(400).json({ success, error: "please try to login with  correct  credentials" });
        }


        // token create for login
        const data = {
            user: {
                id: user.id
            }
        }
        const jwttoken = jwt.sign(data, jwtsect)
        console.log(jwttoken);
        success =true

        res.json({  success ,jwttoken })
    }

    catch (e) {
        console.log(e);
        res.status(500).send("somenting went wrong user not login ");
    }
})

//Route 3  Get user  detail using Post "/api/auth/getuser" . login    required


router.post('/getuser', fetchuser, async (req, res) => {



    try {

        const id = req.user.id;
        const user = await User.findById(id).select("-password")
        res.status(200).send(user)

    } catch (e) {
        console.log(e);
        res.status(500).send("Interval server error ");
    }
}
)

module.exports = router