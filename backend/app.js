const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//password: cCJzlB5KkTf3qvCT
mongoose.connect(
  "mongodb+srv://admin:cCJzlB5KkTf3qvCT@cluster0.fk1cw.mongodb.net/MisionBlog?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => {
    console.log("Estamos conectados a la base de datos");
  }).catch(() =>{
    console.log("Tenemos un problema");
  });

// app.use((req,res,next) =>{
//   res.setHeader("Access-Control-Allow-Origin","*");//el * es porque acepta todas las peticiones
//   res.setHeader(
//     "Access-Control-Allow-Header",
//     "Origin, X-Requested-With, Content-type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

app.get("/api/posts", (req, res) => {
  Post.find().then((postResult) =>{
    res.status(200).json(postResult);
  });
  // const posts = [
  //   {
  //     title:"Primer post",
  //     summary:"Este es un post",
  //     content:"Nuestro primer post desde el servidor",
  //   },
  //   {
  //     title:"Segundo post",
  //     summary:"Este es un post",
  //     content:"Nuestro segundo post desde el servidor",
  //   },
  // ];

});

app.post("/api/posts",(req,res) =>{
  console.log(req.body);
  const postForAdd = new Post({
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
  });
  postForAdd.save().then((createdPost) => {
    res.status(201).json({
      idPostAdded: createdPost._id,
      message: "Post agregado",
    });
  });

});

app.delete("/api/posts/:id", (req, res) => {
    Post.deleteOne({ _id:req.params.id }).then((result) =>{
    console.log(result);
    res.status(200).json({message: "Post Eliminado"});
  });
});

module.exports = app;
