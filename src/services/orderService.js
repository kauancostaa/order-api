const OrderRepository = require('../repositories/orderRepository');
const OrderMapper = require('../utils/orderMapper');
const { validateOrder } = require('../validators/orderValidator');
const { ERROR_MESSAGES } = require('../constants');

class OrderService {
async create(orderData) {
const { error } = validateOrder(orderData);
if (error) {
throw new Error(ERROR_MESSAGES.INVALID_ORDER_DATA);
}

const existingOrder = await OrderRepository.findById(orderData.numeroPedido);
if (existingOrder) {
throw new Error(ERROR_MESSAGES.ORDER_ALREADY_EXISTS);
}

const dbData = OrderMapper.toDatabase(orderData);
return await OrderRepository.create(dbData);
}

async findById(orderId) {
const order = await OrderRepository.findById(orderId);
if (!order) {
throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);
}
return order;
}

async findAll() {
return await OrderRepository.findAll();
}

async update(orderId, orderData) {
const { error } = validateOrder(orderData);
if (error) {
throw new Error(ERROR_MESSAGES.INVALID_ORDER_DATA);
}

const existingOrder = await OrderRepository.findById(orderId);
if (!existingOrder) {
throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);
}

const dbData = OrderMapper.toDatabase(orderData);
return await OrderRepository.update(orderId, dbData);
}

async delete(orderId) {
const deleted = await OrderRepository.delete(orderId);
if (!deleted) {
throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);
}
return deleted;
}
}

module.exports = new OrderService();
