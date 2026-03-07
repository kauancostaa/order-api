const { HTTP_STATUS, ERROR_MESSAGES } = require('../constants');

const errorHandler = (err, req, res, next) => {
console.error([ERROR] ${err.message});
console.error(err.stack);

let statusCode = HTTP_STATUS.INTERNAL_SERVER;
let message = ERROR_MESSAGES.INTERNAL_ERROR;

if (err.message === ERROR_MESSAGES.ORDER_NOT_FOUND) {
statusCode = HTTP_STATUS.NOT_FOUND;
message = err.message;
} else if (err.message === ERROR_MESSAGES.ORDER_ALREADY_EXISTS) {
statusCode = HTTP_STATUS.CONFLICT;
message = err.message;
} else if (err.message === ERROR_MESSAGES.INVALID_ORDER_DATA) {
statusCode = HTTP_STATUS.BAD_REQUEST;
message = err.message;
}

res.status(statusCode).json({
error: message,
timestamp: new Date().toISOString(),
path: req.path,
});
};

module.exports = errorHandler;
