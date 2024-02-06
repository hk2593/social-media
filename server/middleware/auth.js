const JWT=require("jsonwebtoken");
 
const verifyToken=async(req,res,next)=>{
    try{
      // console.log("middelware mai aagya hu game mai");
       let token=req.header("Authorization");
       if(!token){
        return res.status(400).json({msg:"error access denied"});
       }
       if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
      const verified=JWT.verify(token,"harsh");
      req._id=verified.id;
      // console.log(" middelware mai jaara hu game se bahar")
      next();
    }catch(err){
       res.status(500).json({msg:err.message});
    }
};
module.exports=verifyToken; 