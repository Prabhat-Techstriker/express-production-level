# Express Production API

This is a Node.js and Express application designed for production use as an API. It includes a systematic code structure and various functionalities such as authentication, authorization, error handling, and more.

## Features

- **Authentication and Authorization**: Secure routes with middleware.
- **Error Handling**: Centralized error handling middleware.
- **Route Versioning**: Organize routes by version.
- **Service Layer**: Separate business logic from route handling.
- **Validation**: Validate incoming requests with middleware.
- **Utility Functions**: Common response handlers and validators.
- **Modular Structure**: Organized folders for controllers, models, routes, and services.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd express-production-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables.

## Usage

To start the application, run:

```bash
npm start
```

## Testing

To run the tests, use:

```bash
npm test
```

## License

This project is licensed under the MIT License.

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file based on `.env.example`
4. Run development server: `npm run dev`

## API Endpoints

### Auth Routes
- POST /api/v1/auth/register - Register new user
- POST /api/v1/auth/login - Login user

### User Routes
- GET /api/v1/users/profile - Get user profile
- PATCH /api/v1/users/profile - Update profile
- DELETE /api/v1/users/profile - Delete profile

### Product Routes
- POST /api/v1/products - Create product (Admin)
- GET /api/v1/products - Get all products
- GET /api/v1/products/:id - Get single product
- PATCH /api/v1/products/:id - Update product (Admin)
- DELETE /api/v1/products/:id - Delete product (Admin)

### Order Routes
- POST /api/v1/orders - Create order
- GET /api/v1/orders - Get user orders
- GET /api/v1/orders/:id - Get single order
- PATCH /api/v1/orders/:id - Update order status (Admin)

## Security Features
- JWT Authentication
- Request Rate Limiting
- XSS Protection
- Security Headers (Helmet)
- CORS enabled
- Request Sanitization