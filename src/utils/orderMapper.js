class OrderMapper {
static toDatabase(requestBody) {
return {
order_id: requestBody.numeroPedido,
value: requestBody.valorTotal,
creation_date: new Date(requestBody.dataCriacao).toISOString(),
items: requestBody.items.map((item) => ({
product_id: parseInt(item.idItem, 10),
quantity: item.quantidadeItem,
price: item.valorItem,
})),
};
}

static toResponse(order, items) {
return {
numeroPedido: order.order_id,
valorTotal: parseFloat(order.value),
dataCriacao: order.creation_date,
items: items.map((item) => ({
idItem: item.product_id.toString(),
quantidadeItem: item.quantity,
valorItem: parseFloat(item.price),
})),
};
}
}

module.exports = OrderMapper;
