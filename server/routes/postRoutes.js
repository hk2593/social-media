const express=require("express");
const verifyToken = require("../middleware/auth");
const { getallPost, getUserPost } = require("../controllers/post");

const router=express.Router();

router.get("/",verifyToken,getallPost);
router.get("/:userId",verifyToken,getUserPost);

 
module.exports=router; 