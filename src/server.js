require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api';

const limiter = rateLimit({
windowMs: parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 900000,
max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
message: 'Too many requests from this IP, please try again later.',
});

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use(API_PREFIX, routes);

app.get('/health', (req, res) => {
res.status(200).json({
status: 'healthy',
timestamp: new Date().toISOString(),
uptime: process.uptime(),
});
});

app.use(errorHandler);

const startServer = async () => {
try {
await initializeDatabase();

app.listen(PORT, () => {
console.log(Server running on port ${PORT});
console.log(API available at http://localhost:${PORT}${API_PREFIX});
console.log(Environment: ${process.env.NODE_ENV});
});
} catch (error) {
console.error('Failed to start server:', error);
process.exit(1);
}
};

process.on('unhandledRejection', (reason, promise) => {
console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
console.error('Uncaught Exception:', error);
process.exit(1);
});

startServer();
