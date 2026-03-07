const OrderService = require('../services/orderService');
const { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../constants');

class OrderController {
async create(req, res, next) {
try {
const order = await OrderService.create(req.body);
res.status(HTTP_STATUS.CREATED).json({
message: SUCCESS_MESSAGES.ORDER_CREATED,
data: order,
});
} catch (error) {
next(error);
}
}

async findById(req, res, next) {
try {
const { orderId } = req.params;
const order = await OrderService.findById(orderId);
res.status(HTTP_STATUS.OK).json(order);
} catch (error) {
next(error);
}
}

async findAll(req, res, next) {
try {
const orders = await OrderService.findAll();
res.status(HTTP_STATUS.OK).json(orders);
} catch (error) {
next(error);
}
}

async update(req, res, next) {
try {
const { orderId } = req.params;
const order = await OrderService.update(orderId, req.body);
res.status(HTTP_STATUS.OK).json({
message: SUCCESS_MESSAGES.ORDER_UPDATED,
data: order,
});
} catch (error) {
next(error);
}
}

async delete(req, res, next) {
try {
const { orderId } = req.params;
await OrderService.delete(orderId);
res.status(HTTP_STATUS.OK).json({
message: SUCCESS_MESSAGES.ORDER_DELETED,
});
} catch (error) {
next(error);
}
}
}

module.exports = new OrderController();
