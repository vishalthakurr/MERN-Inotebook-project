const mongoose = require("mongoose");
const mongoUri ="//localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectmongoo =  ()=>{

    mongoose.connect(mongoUri,()=>{
        console.log("connection sucessfull");
    })
}

module.exports=  connectmongoo;