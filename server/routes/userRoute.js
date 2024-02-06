const express=require("express");
const verifyToken = require("../middleware/auth");
const { 
    getUser,
    getallUser,
     getOtherUser, 
     followUser, 
     unfollowUser} = require("../controllers/user");
const router=express.Router();

router.get("/",verifyToken,getUser);
router.get("/allUser",verifyToken,getallUser); 
router.get("/:userId",verifyToken,getOtherUser);
router.post("/follow",verifyToken,followUser);

router.delete("/follow",verifyToken,unfollowUser);
module.exports=router;    