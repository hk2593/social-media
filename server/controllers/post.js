const Post=require("../models/Post");
const Comment=require("../models/Comment")

const createPost=async(req,res)=>{
    const {caption} = req.body;
    const postPicturePath = req.file ? req.file.filename : '';
    const newPost=await Post.create({
        caption,
        postPicturePath,
        userId:req._id,
    });
    res.status(200).send(newPost);

}

const getallPost=async(req,res)=>{
    const allPost=await Post.find().populate('userId');
    res.status(200).send(allPost);
}

const getUserPost=async(req,res)=>{
    
    const userPost=await Post.find({userId:req.params.userId}).populate('userId');
    res.status(200).send(userPost);
}

const postComment=async(req,res)=>{
    const comment_personid=req._id;
    const post_id=req.body.id;
    const comment=req.body.comment;
    const createComment=await Comment.create({
        userId:comment_personid,
        postId:post_id,
        comment:comment 
    });
    res.status(200).json(createComment)
}

const getComment=async(req,res)=>{
    const post_id=req.query.id;
    const comments=await Comment.find({postId:post_id}).populate('userId');
    res.status(200).json(comments);
}

const setLike=async(req,res)=>{
    const currentUserId = req._id; 
    const postId = req.body.id; // Access ID directly from req.body
 
    const updatedLikes = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: currentUserId } },
      { new: true }
    );
    res.status(200).json(updatedLikes);
}
const removeLike=async(req,res)=>{
    const currentUserId = req._id; 
    const postId = req.body.id; // Access ID directly from req.body
 
    const updatedLikes = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: currentUserId } },
      { new: true }
    );
    res.status(200).json(updatedLikes);
}
module.exports={createPost,getallPost,getUserPost,postComment,getComment,setLike,removeLike};