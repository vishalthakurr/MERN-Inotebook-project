 require("./db");
const express = require('express')
 
const app = express()
const port = 3000

app.use(express.json()) // for middle ware to req for json

// avaliable routes

app.use('/api/auth',require('./routes/auth'))
app.use("/api/notes",require("./routes/notes.js"))

// app.get('/', (req, res) => {
//   res.send('Hello vishal!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

