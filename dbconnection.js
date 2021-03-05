const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const winston = require("winston");
const { format } = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "./log/my-logs.log",
      json: true,
      colorize: true,
      format:winston.format.combine( winston.format.json(),winston.format.timestamp(),winston.format.printf(info => `{"message":${info.message},"level":${info.level},"timestamp":${info.timestamp}}`)),
    }),
    new winston.transports.Console({
      level: "warn",
      filename: "./log/debug.log",
      json: false,
      colorize: false,
    }),
  ],
});

mongoose
  .connect(
    `mongodb+srv://varshil:${process.env.DATABASE_PASSWORD}@cluster0.sctgr.mongodb.net/urbanclap?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    logger.info("connected");
    // console.log("Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = mongoose;
