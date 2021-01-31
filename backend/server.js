const express = require('express')
const mongoose = require('mongoose')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
const url = 'mongodb+srv://quizy:quizy@cluster0.0pxq2.mongodb.net/todo?retryWrites=true&w=majority'
// const url = 'mongodb://localhost/tododb'
const PORT = process.env.PORT || 3000
var appRoutes = require('./routes/app')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

mongoose.Promise=global.Promise
mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true})
const con = mongoose.connection
con.on('open', () => {
    console.log("database connected");
})

var server = require('http').Server(app);
var io = require('socket.io')(server,
    
    
    {
    cors: {
      origin:'*',
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  }
  
  ); 
  app.set('io',io);
io.on('connection', socket => {
    console.log("new  sockeet connection...");

    socket.emit("test event","hey utsav");
    
});
app.get('/', (req, res) => {
    
    res.send("Hello Utsav from Server")
})



app.use('/', appRoutes)


server.listen(PORT, () => {
    console.log(`Listing onnn port ${PORT}`);
})

