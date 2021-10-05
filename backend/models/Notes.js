const mongoose = require("mongoose");



const NotesSchema = new mongoose.Schema({

    user : {
        
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
  
    title :{
        type:String,
        required:true

    },
    description :{
        type:String,
        required:true
        
    },
    tag:{
        type:String,
        default:"grneral"
       
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

module.exports = mongoose.model("note",NotesSchema);