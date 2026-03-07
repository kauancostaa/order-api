const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
host: process.env.DB_HOST,
port: process.env.DB_PORT,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
min: parseInt(process.env.DB_POOL_MIN, 10),
max: parseInt(process.env.DB_POOL_MAX, 10),
idleTimeoutMillis: 30000,
connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
console.error('Unexpected error on idle client', err);
process.exit(-1);
});

const initializeDatabase = async () => {
try {
await pool.query(`
CREATE TABLE IF NOT EXISTS orders (
order_id VARCHAR(50) PRIMARY KEY,
value DECIMAL(10,2) NOT NULL,
creation_date TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
id SERIAL PRIMARY KEY,
order_id VARCHAR(50) REFERENCES orders(order_id) ON DELETE CASCADE,
product_id INTEGER NOT NULL,
quantity INTEGER NOT NULL,
price DECIMAL(10,2) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_items_order_id ON items(order_id);
`);
console.log('Database initialized successfully');
} catch (error) {
console.error('Error initializing database:', error);
throw error;
}
};

module.exports = {
query: (text, params) => pool.query(text, params),
getClient: () => pool.connect(),
initializeDatabase,
};
