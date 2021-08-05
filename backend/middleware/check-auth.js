//antes de que la petición se ejecute en el backend se le puede dar una validación
// o tratamiento previo

const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,"MisionTic2021_secret_for_MisionBlog");
    next();
  }catch(error){
    res.status(401).json({message: "Autenticación fallida"});
  }
};
