const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(morgan('dev'));
app.use(express.json());


app.use((err,req,res,next) => {
     res.status(err.statusCode).json({
         status:'error',
         message:err.message
     })   
})

module.exports = app; 