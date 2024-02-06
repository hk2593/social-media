const { text } = require("body-parser");
const mongoose=require("mongoose");


const comentSchema=new mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
     },
     postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
     },
     comment:{
        type:String,
        req:true,
     }

},{timestamps:true});

const Comment=mongoose.model("Comment",comentSchema);
module.exports=Comment;