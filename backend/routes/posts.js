const express = require("express");
const multer = require("multer");
const Post = require("../models/post");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const MIME_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
}

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    console.log(file);
    const isValid = MIME_TYPES[file.mimetype];
    let error = new Error("El tipo de archivo no es válido");
    if(isValid){
      error = null;
    }
    cb(error,"backend/files");
  }, filename:(req,file,cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPES[file.mimetype];
    cb(null, name+"-"+Date.now()+"."+ext);
  }
})

router.get("", (req, res) => {
  Post.find().then((postResult) =>{
    console.log(postResult);
    res.status(200).json(postResult);
  });

});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then((postResult) =>{
    if (postResult){
      res.status(200).json(postResult);
    }else{
      res.status(404).json({message:"Post no encontrado con el id enviado"});
    }

  });

});

router.post("", checkAuth, multer({storage: storage}).single("image"),(req,res) =>{
  console.log(req.body);
  const url = req.protocol+"://"+req.get("host");
  const postForAdd = new Post({
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
    imageUrl: url+"/files/"+req.file.filename,
    author: req.userData.userId,
  });
  postForAdd.save().then((createdPost) => {
    res.status(201).json({
      idPostAdded: createdPost._id,
      message: "Post agregado",
    });
  });

});

router.delete("/:id", checkAuth, (req, res) => {
    Post.deleteOne({ _id:req.params.id }).then((result) =>{
      if(result.n>0){
        console.log(result);
        res.status(200).json({message: "Post Eliminado"});
      }else{
        res.status(401).json({message: "Autenticación fallida"});
      }

  });
});

router.put("/:id", checkAuth, (req,res) => {
  console.log("Actualizado")
  // console.log(req.body)
  // console.log(req.params.id)
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
  });
  Post.updateOne({_id: req.params.id},post).then((result) =>{
    console.log(result);
    if(result.nModified>0){
      res.status(200).json({message: "Actualización ejecutada"});
    }else{
      res.status(401).json({message: "Autenticación fallida"});
    }

  })
});

module.exports = router;
