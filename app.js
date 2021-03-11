const express = require('express');
const path = require('path');
//const helmet = require('helmet')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cons = require('consolidate');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const bookingRouter = require('./routes/bookingRoute');
const categoryRouter = require('./routes/categoryRoute');
const serviceRouter = require('./routes/serviceRoute');
const log = require('./utils/log')


var app = express();

// view engine setup
app.engine('html', cons.swig)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname)));
app.use((logger(
  // 'dev',
  { 'stream': log.stream })));
app.use(cors())
//app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('', indexRouter);
// app.use('/admin', indexRouter);
app.use('/users', usersRouter);

app.use(`/api/user`, userRouter);
app.use('/api/vendor', userRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/category', categoryRouter);
app.use('/api/service', serviceRouter);
// catch 404 and forward to error handler

app.use((err, req, res, next) => {
  res.json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  })
  console.log(err.stack)

  next();
})

module.exports = app;
