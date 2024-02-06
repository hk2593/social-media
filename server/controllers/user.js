const User=require("../models/User");
const Post=require("../models/Post");
const getUser= async(req,res)=>{
    
    const allUsers=await User.findById({_id:req._id});
    res.status(200).json(allUsers);
}
const getUserFollowers=async(req,res)=>{
  const allfollowers=await User.findById({_id:req._id}).populate('followers').populate('following');
  res.status(200).json(allfollowers);
}
const getallUser=async(req,res)=>{
    const users=await User.find({ _id: { $ne: req._id } });
    
    res.status(200).json(users);
}

const getOtherUser=async(req,res)=>{
    const getUserPost=await Post.find({userId:req.params.userId}).populate('userId');
    res.status(200).json(getUserPost);
}

const getData=async(req,res)=>{
 
  return res.json("hello from the server");
 
}

// Backend routes  
const followUser = async (req, res) => {
  const currentUserId = req._id; 
  const followId = req.body.id; // Access ID directly from req.body
  console.log(followUser);
  const updatedUser = await User.findByIdAndUpdate(
    currentUserId,
    { $addToSet: { followers: followId } },
    { new: true }
  );
  const updatedUserFollowing=await User.findByIdAndUpdate(
    followId,
    { $addToSet: { following: currentUserId } },
    { new: true }
  )

  res.status(200).json({updatedUser,updatedUserFollowing});
};

const unfollowUser = async (req, res) => {
  const currentUserId = req._id;
  const followId = req.body.id; // Access ID directly from req.body
  
  const updatedUser = await User.findByIdAndUpdate(
    currentUserId,
    { $pull: { followers: followId } },
    { new: true }
  );
  
  const updatedUserFollowing=await User.findByIdAndUpdate(
    followId,
    { $pull: { following: currentUserId } },
    { new: true }
  )

  res.status(200).json({updatedUser,updatedUserFollowing});
};

module.exports={getUser,getallUser,getOtherUser,followUser,unfollowUser,getData,getUserFollowers};
