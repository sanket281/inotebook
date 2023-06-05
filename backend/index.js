const connectToMongo = require('./db');
var express = require('express');
var cors = require('cors')

connectToMongo();

var app = express()
const port = 5000

app.use(cors())
app.use(express.json());  //this middleware is used to send request body

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})