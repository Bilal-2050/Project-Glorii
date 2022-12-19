const winston = require('winston');
const { createLogger, format, transports } = winston;
const { timestamp, prettyPrint, combine, simple } = format;

const logger = createLogger({
    level: 'info',
    format: combine(
        format.json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.File({
            filename:'log info',
            format: simple(),
        }),
        new winston.transports.Console({
            format: simple(),
        })

    ],
});


module.exports = logger;