const express = require("express");
const router = express.Router()
const User = require('../models/User');



//create a user  using Post "/api/auth" . doesn't require auth

router.post('/',(req,res)=>{ 
    const user = User(req.body);
    user.save();
    console.log(req.body);
    res.send(req.body)
})

 
module.exports = router