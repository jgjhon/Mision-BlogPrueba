const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// const Post = require("./models/post");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/files",express.static(path.join("backend/files")));

//password: Qmxbz28Wxvuiu3T
mongoose.connect(
  "mongodb+srv://admin:Qmxbz28Wxvuiu3T@cluster0.fk1cw.mongodb.net/MisionBlog?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
  ).then(() => {
    console.log("Estamos conectados a la base de datos");
  }).catch(() =>{
    console.log("Tenemos un problema");
  });

  app.use("/api/posts",postRoutes);
  app.use("/api/user",userRoutes);

  module.exports = app;

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
