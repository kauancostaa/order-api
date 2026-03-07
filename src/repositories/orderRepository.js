const db = require('../config/database');
const OrderMapper = require('../utils/orderMapper');

class OrderRepository {
async create(orderData) {
const client = await db.getClient();

try {
await client.query('BEGIN');

const orderQuery = INSERT INTO orders (order_id, value, creation_date) VALUES ($1, $2, $3) RETURNING *;
const orderValues = [orderData.order_id, orderData.value, orderData.creation_date];
const orderResult = await client.query(orderQuery, orderValues);

for (const item of orderData.items) {
const itemQuery = INSERT INTO items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4);
const itemValues = [orderData.order_id, item.product_id, item.quantity, item.price];
await client.query(itemQuery, itemValues);
}

await client.query('COMMIT');

const items = await this.findItemsByOrderId(orderData.order_id);
return OrderMapper.toResponse(orderResult.rows[0], items);

} catch (error) {
await client.query('ROLLBACK');
throw error;
} finally {
client.release();
}
}

async findById(orderId) {
const orderQuery = 'SELECT * FROM orders WHERE order_id = $1';
const orderResult = await db.query(orderQuery, [orderId]);

if (orderResult.rows.length === 0) {
return null;
}

const items = await this.findItemsByOrderId(orderId);
return OrderMapper.toResponse(orderResult.rows[0], items);
}

async findAll() {
const ordersQuery = 'SELECT * FROM orders ORDER BY creation_date DESC';
const ordersResult = await db.query(ordersQuery);

const orders = [];

for (const order of ordersResult.rows) {
const items = await this.findItemsByOrderId(order.order_id);
orders.push(OrderMapper.toResponse(order, items));
}

return orders;
}

async update(orderId, orderData) {
const client = await db.getClient();

try {
await client.query('BEGIN');

const updateQuery = UPDATE orders SET value = $1, creation_date = $2 WHERE order_id = $3 RETURNING *;
const updateValues = [orderData.value, orderData.creation_date, orderId];
const updateResult = await client.query(updateQuery, updateValues);

if (updateResult.rows.length === 0) {
await client.query('ROLLBACK');
return null;
}

await client.query('DELETE FROM items WHERE order_id = $1', [orderId]);

for (const item of orderData.items) {
const itemQuery = INSERT INTO items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4);
const itemValues = [orderId, item.product_id, item.quantity, item.price];
await client.query(itemQuery, itemValues);
}

await client.query('COMMIT');

const items = await this.findItemsByOrderId(orderId);
return OrderMapper.toResponse(updateResult.rows[0], items);

} catch (error) {
await client.query('ROLLBACK');
throw error;
} finally {
client.release();
}
}

async delete(orderId) {
const query = 'DELETE FROM orders WHERE order_id = $1 RETURNING *';
const result = await db.query(query, [orderId]);
return result.rows[0] || null;
}

async findItemsByOrderId(orderId) {
const query = 'SELECT product_id, quantity, price FROM items WHERE order_id = $1';
const result = await db.query(query, [orderId]);
return result.rows;
}
}

module.exports = new OrderRepository();
