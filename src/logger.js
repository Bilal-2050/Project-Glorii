const winston = require('winston');
const { createLogger, format, transports } = winston;
const { timestamp, label, combine, simple } = format;

const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'MongoDB' }),
        timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.json(),
    ),
    transports: [
        new winston.transports.File({
            filename: 'logs/log-info.log',
        }),
        new winston.transports.Console({
            format: simple(),
        })

    ],
});


module.exports = logger;