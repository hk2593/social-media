const User=require("../models/User");
const JWT=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Post=require("../models/Post")
const register=async (req,res)=>{
  try{
    console.log(req);
    const {
     fullName,email,password,occupation
    }=req.body;
    const picturePath = req.file ? req.file.filename : '';
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser=await User.create({fullName,
        email,
        password: passwordHash,
        occupation,
        picturePath});
     const createPost=await Post.create({userId:newUser._id,postPicturePath:picturePath});
     console.log(createPost)
    res.status(201).json(newUser);
}
catch(err){
    res.status(400).json({error:err.message});
}

}

const login=async(req,res)=>{
    try{
       const {email,password}=req.body;
       let user=await User.findOne({email:email});
       if(!user){
        return res.status(400).json({msg:"user not found"});
       }
       const matched=await bcrypt.compare(password,user.password);
       if(!matched){
        return res.status(400).json({msg:"password is incorrect"});
       }

       const token=JWT.sign({id:user._id},"harsh");
       user.password='';
       console.log(token);
       res.status(200).json({token,user});
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
module.exports={login,register};