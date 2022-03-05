 require("./db");
const express = require('express')
const cors = require('cors');
 
const app = express()
const port = 5000

app.use(cors());

app.use(express.json()) // for middle ware to req for json

// avaliable routes

app.use('/api/auth',require('./routes/auth'))
app.use("/api/notes",require("./routes/notes.js"))

app.get('/', (req, res) => {
  res.send('Hello vishal!')
})

app.listen(port, () => {
  console.log(`iNotebook  backend listening at http://localhost:${port}`)
})

