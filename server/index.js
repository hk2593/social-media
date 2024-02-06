const express=require("express");
const app=express();
const authRoute=require("./routes/authRoutes");
const postRoute=require("./routes/postRoutes.js");
const userRoute=require("./routes/userRoute.js");
const multer=require("multer");
const bodyParser=require("body-parser");
const path=require("path");
const {register}=require("./controllers/auth");
const mongoose=require("mongoose");
const cors=require("cors");
const  verifyToken = require( "./middleware/auth.js");
const {createPost, postComment, getComment, setLike, removeLike}=require("./controllers/post.js");
const {  getUserFollowers } = require("./controllers/user.js");
const User=require("./models/User.js");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  
app.post("/auth/register", upload.single("picture"), register);
app.post("/post",upload.single("picture"),verifyToken,createPost);
app.post("/comment",verifyToken,postComment);
app.post("/setlike",verifyToken,setLike);
app.post("/removelike",verifyToken,removeLike);

app.get("/getUserFollowers",verifyToken,getUserFollowers);
app.get("/getComments",verifyToken,getComment);
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request query parameters
    const regex = new RegExp(query, "i"); // Create a case-insensitive regular expression for searching
    const users = await User.find({ fullName: regex }); // Search for blogs with titles matching the regex

    // Send the search results as JSON
    res.json(users);
  } catch (error) {
    // Handle errors if any
    console.error('Error searching titles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use("/auth",authRoute);
app.use("/post",postRoute);
app.use("/user",userRoute);
mongoose.connect("mongodb://127.0.0.1:27017/mysocial", { maxPoolSize: 100 });
app.listen(4000,()=>{
    console.log("server started at port 4000");
}) 