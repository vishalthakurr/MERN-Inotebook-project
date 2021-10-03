const mongoose = require("mongoose");
const mongoUri ="mongodb://localhost:27017/inotebook";

mongoose.connect(mongoUri,{
    // useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify :false
}).then(()=>{
    console.log("connection suceesful");
}).catch((e)=>{
    console.log(e);
})


