var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cons = require('consolidate');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
const {permission} = require('./controllers/userController')
const userRouter = require('./routes/userRoute');
const bookingRouter = require('./routes/bookingRoute');
const categoryRouter = require('./routes/categoryRoute');
const serviceRouter = require('./routes/serviceRoute')

var app = express();

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/user',userRouter);
app.use('/api/vendor',userRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/category',permission, categoryRouter);
app.use('/api/service',permission ,serviceRouter);
// catch 404 and forward to error handler

app.use((err,req,res,next) => {
  res.json({ 
      status:'error',
      statusCode:err.statusCode,
      message:err.message
  })  
  
next(); 
})

module.exports = app;
