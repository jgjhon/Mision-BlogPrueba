const express = require('express') //forma de importar las cosas en express js

const app = express()
const port = 3000

//forma de definir el get con Express
// req lo que se envia y res la respuesta
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
