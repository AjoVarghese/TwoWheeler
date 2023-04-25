// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const cors = require('cors')
// const session = require('express-session')
// const {v4:uuidv4} = require('uuid')
// require('dotenv').config()
// const mongoose = require('mongoose')
// const socket = require('socket.io')

// var userRouter = require('./routes/User/user');
// var  adminRouter = require('./routes/Admin/admin');

// var app = express();

// //mongodb
// mongoose.connect(
//   "mongodb+srv://ajo:ajo123@cluster0.sbqdgbs.mongodb.net/?retryWrites=true&w=majority"
// ).then((data)=>{
//   console.log("CONNECTED");
// })


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// //cacheControl
// app.use(function(req, res, next) {
//   if (!req.user) {
//       res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//       res.header('Expires', '-1');
//       res.header('Pragma', 'no-cache');
//   }
//   next();
// });

// //session
// app.use(session({
//   secret : uuidv4(),
//   resave : false,
//   saveUninitialized : true,
//   cookie : {maxAge : 6000000000}
// }))


// //cors
// const corsOptions = {
//   origin : "http://localhost:3000",
//   credentials : true,
//   optioSuccessStatus : 200
// }
// app.use(cors(corsOptions))

// app.use('/api/user', userRouter);
// app.use('/api/admin', adminRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// const PORT = process.env.PORT || 3001

// const server =  app.listen(PORT, (req, res) => {
//   console.log(`server is runnig http://localhost:${PORT}/`);
// })


// const io = socket(server,{
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// })

// global.onlineUsers = new Map()

// io.on("connection",(socket)=>{
//   global.chatSocket = socket
//   socket.on("add-user",(userId)=>{
//     onlineUsers.set(userId,socket.id)
//   })

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-receive", data.message);
//       socket.emit("msg-sent", data.message); // emit message back to sender's socket
//     }
//   });

// })

// module.exports = app;




var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const session = require('express-session')
const {v4:uuidv4} = require('uuid')
require('dotenv').config()
const mongoose = require('mongoose')
const socket = require('socket.io')

var userRouter = require('./routes/User/user');
var  adminRouter = require('./routes/Admin/admin');

var app = express();

//mongodb
mongoose.connect(
  "mongodb+srv://ajo:ajo123@cluster0.sbqdgbs.mongodb.net/?retryWrites=true&w=majority"
).then((data)=>{
  console.log("CONNECTED");
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cacheControl
app.use(function(req, res, next) {
  if (!req.user) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
  }
  next();
});

//session
app.use(session({
  secret : uuidv4(),
  resave : false,
  saveUninitialized : true,
  cookie : {maxAge : 6000000000}
}))


//cors
const corsOptions = {
  origin : "http://localhost:3000",
  credentials : true,
  optioSuccessStatus : 200
}
app.use(cors(corsOptions))

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 3001

const server =  app.listen(PORT, (req, res) => {
  console.log(`server is runnig http://localhost:${PORT}/`);
})


const io = socket(5000,{
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
})

global.onlineUsers = new Map()

io.on("connection",(socket)=>{
  console.log("USER CONNECTED: ", socket.id)
  global.chatSocket = socket
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id)
  })

  socket.on("send-msg", (data) => {
    console.log("THIS IS THE MESSAGE SENNT FTOM FROM REACT TO SOCET",data.message);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
      socket.emit("msg-sent", data.message); // emit message back to sender's socket
    }
  });

})

module.exports = app;
