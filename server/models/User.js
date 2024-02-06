const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
     fullName:{
        type:String,
        require:true,
     },
     email:{
        type:String,
        require:true,
        unique:true,
     },
     occupation:{
        type:String,
     },
     password:{
        type:String,
        require:true,
     },
     picturePath:{
        type:String,
        default:"",
     },
     followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Reference to the User model
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Reference to the User model
    }],

},{timestamps:true});

const User=mongoose.model("User",userSchema);
module.exports=User;