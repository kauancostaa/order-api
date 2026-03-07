# Order API

REST API for order management developed with Node.js and PostgreSQL.

## Technologies

- Node.js
- Express
- PostgreSQL
- Joi (validation)
- Helmet (security)
- Rate Limiting

## Requirements

- Node.js 14+
- PostgreSQL 12+
- NPM or Yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/youruser/order-api.git
cd order-api
Install dependencies

bash
npm install
Configure environment variables

bash
cp .env.example .env
# Edit .env with your settings
Create PostgreSQL database

sql
CREATE DATABASE order_db;
Start the application

bash
npm run dev
API Endpoints
Create Order
POST /api/orders

json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
Get Order by ID
GET /api/orders/:orderId

List All Orders
GET /api/orders

Update Order
PUT /api/orders/:orderId

Delete Order
DELETE /api/orders/:orderId

Database Schema
orders
order_id (VARCHAR, PK)

value (DECIMAL)

creation_date (TIMESTAMP)

items
id (SERIAL, PK)

order_id (VARCHAR, FK)

product_id (INTEGER)

quantity (INTEGER)

price (DECIMAL)

HTTP Status Codes
200: Success

201: Created

400: Bad Request

404: Not Found

409: Conflict

500: Internal Server Error

Available Scripts
npm start - Production start

npm run dev - Development with hot-reload

npm test - Run tests

npm run test:watch - Run tests in watch mode

npm run lint - Run linting

npm run lint:fix - Fix linting issues

npm run format - Format code

License
ISC
