import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import hpp from 'hpp';
import { errorHandler } from './middleware/error.middleware.js';
import routes from './routes/index.js';
import logger from './utils/logger.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Compression and security
app.use(compression()); // Compress responses
app.use(hpp()); // Protect against HTTP Parameter Pollution attacks

// Error logging
app.use((err, req, res, next) => {
  logger.error(err.stack);
  next(err);
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date()
  });
});

// Routes
app.use('/api', routes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handling
app.use(errorHandler);

export default app;