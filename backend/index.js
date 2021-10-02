const  connectmongoo = require("./db");
const express = require('express')
 connectmongoo(); 
const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.send('Hello vishal!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

