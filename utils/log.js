const { createLogger, format, transports } = require('winston');
const log = require('morgan');

// const app = require('../app');
// const { timestamp } = format;

const logger = createLogger({
    transports:
        // [
        new transports.File({
            filename: 'log/server.log',
            format: format.combine(
                format.timestamp({
                    format: 'MMM-DD-YYYY HH:mm:ss'
                }),
                format.json(),
                format.align(),
                format.json(format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
            )
        })
});

// app.use(log('dev'));
// logger.info('ERROR LOGGER!!');
// logger.error('')
module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};
