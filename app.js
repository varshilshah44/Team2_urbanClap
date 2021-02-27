const express = require('express');
const morgan = require('morgan');
const app = express();

const userRouter = require('./routes/userRoute');
const bookingRouter = require('./routes/bookingRoute');
const categoryRouter = require('./routes/categoryRoute');
const serviceRouter = require('./routes/serviceRoute')

///////////
const {permission} = require('./controllers/userController')
const categoryController = require('./controllers/categoryController');
///////////

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/vendor',userRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/category',permission, categoryRouter);
app.use('/api/service',permission ,serviceRouter);

app.use((err,req,res,next) => {
     res.status(err.statusCode).json({
         status:'error',
         message:err.message
     })   
})

module.exports = app; 