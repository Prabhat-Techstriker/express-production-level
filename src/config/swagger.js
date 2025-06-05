import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Production API',
      version: '1.0.0',
      description: 'A production ready Express API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/v1/*.js'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);