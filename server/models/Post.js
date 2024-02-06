const mongoose=require("mongoose");


const postSchema=new mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
     },
     postPicturePath:{
        type:String,
     },
     caption:{
        type:String,
     },
     likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to User model for the ids of persons who like the post
     }]

},{timestamps:true});

const Post=mongoose.model("Post",postSchema);
module.exports=Post;