const express = require('express');
const morgan = require('morgan');
const app = express();

const userRouter = require('./routes/userRoute');
const bookingRouter = require('./routes/bookingRoute');
const vendorRouter = require('./routes/vendorRoute');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/vendor',userRouter);
app.use('/api/booking',vendorRouter)

app.use((err,req,res,next) => {
     res.status(err.statusCode).json({
         status:'error',
         message:err.message
     })   
})

module.exports = app; 