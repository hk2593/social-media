const express=require("express");
const {login}=require("../controllers/auth");
const app=express.Router();

app.post("/login",login);


module.exports=app;