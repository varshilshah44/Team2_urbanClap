const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

mongoose.connect(`mongodb+srv://varshil:${process.env.DATABASE_PASSWORD}@cluster0.sctgr.mongodb.net/urbanclap?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log(err.message);
})

module.exports = mongoose;