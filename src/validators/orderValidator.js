const Joi = require('joi');

const itemSchema = Joi.object({
idItem: Joi.string().required(),
quantidadeItem: Joi.number().integer().min(1).required(),
valorItem: Joi.number().positive().required(),
});

const orderSchema = Joi.object({
numeroPedido: Joi.string().required(),
valorTotal: Joi.number().positive().required(),
dataCriacao: Joi.date().iso().required(),
items: Joi.array().items(itemSchema).min(1).required(),
});

const validateOrder = (data) => {
return orderSchema.validate(data, { abortEarly: false });
};

module.exports = {
validateOrder,
};
