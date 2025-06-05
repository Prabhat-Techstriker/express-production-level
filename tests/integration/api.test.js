import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app.js';
import { User } from '../../src/models/user.model.js';

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL_TEST);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: 'test@test.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.token).toBeDefined();
    });
  });

  // Add more test cases for other endpoints
});