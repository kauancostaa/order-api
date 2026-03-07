module.exports = {
HTTP_STATUS: {
OK: 200,
CREATED: 201,
BAD_REQUEST: 400,
UNAUTHORIZED: 401,
FORBIDDEN: 403,
NOT_FOUND: 404,
CONFLICT: 409,
INTERNAL_SERVER: 500,
},

ERROR_MESSAGES: {
ORDER_NOT_FOUND: 'Order not found',
ORDER_ALREADY_EXISTS: 'Order already exists with this number',
INVALID_ORDER_DATA: 'Invalid order data',
DATABASE_ERROR: 'Database access error',
INTERNAL_ERROR: 'Internal server error',
},

SUCCESS_MESSAGES: {
ORDER_CREATED: 'Order created successfully',
ORDER_UPDATED: 'Order updated successfully',
ORDER_DELETED: 'Order deleted successfully',
},
};
