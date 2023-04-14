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
console.log(process.env.CLOUD_NAME);

var userRouter = require('./routes/User/user');
var  adminRouter = require('./routes/Admin/admin');

var app = express();

//mongodb
mongoose.connect(
  "mongodb+srv://ajo:ajo123@cluster0.sbqdgbs.mongodb.net/?retryWrites=true&w=majority"
).then((data)=>{
  console.log("khkjhkjhhj");
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

// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }

// app.configure(function() {
//   app.use(allowCrossDomain);
//   //some other code
// });  

// let mobile="+918129197512"
// let res = mobile.substring(3)
// console.log("res",res);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// const number = 10
// let num1 = number.toString()
// num1 = num1.split("").reverse().join('')
// console.log(num1);
// if(num1 === number.toString()){
//   console.log("yes");
// } else {
//   console.log("No");
// }


const PORT = process.env.PORT || 3001

app.listen(PORT,console.log(`server running on port ${PORT}`))
module.exports = app;
