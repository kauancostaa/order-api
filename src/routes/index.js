const express = require('express');
const OrderController = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', OrderController.create.bind(OrderController));
router.get('/orders/:orderId', OrderController.findById.bind(OrderController));
router.get('/orders', OrderController.findAll.bind(OrderController));
router.put('/orders/:orderId', OrderController.update.bind(OrderController));
router.delete('/orders/:orderId', OrderController.delete.bind(OrderController));

module.exports = router;
