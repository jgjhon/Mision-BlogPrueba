const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/user");

router.post("/signup",(req,res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const newUser = new User({
      name : req.body.name,
      email : req.body.email,
      password : hash,
    });
    newUser.save().then(result => {
      console.log(result);
      res.status(201).json({message: "Usuario creado",result: result});
    }).catch(err => {
      console.log(result);
      res.status(500).json({error: err});
    })
  })
});

router.post("/login", (req,res) => {
  let userGet;
  User.findOne({email: req.body.email}).then((user) =>{
    if(!user){
      return res.status(401).json({message: "Email no encontrado"})
    }
    userGet = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then((result) => {
    // console.log(result);
    if(!result){
      return res.status(401).json({message: "Autenticación fallida 1"});
    }
    const token = jwt.sign(
      {email: userGet.email, userId: userGet._id},
      "MisionTic2021_secret_for_MisionBlog",
      {expiresIn: "1h"}
      );
      res.status(200).json({token:token});
  }).catch(err => {
    return res.status(401).json({ message:  "Autenticación fallida 2"})
  });
});

module.exports = router;
