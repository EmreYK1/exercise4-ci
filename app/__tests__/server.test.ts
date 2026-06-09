import { createServer } from '../server';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
  counter: {
    create: jest.fn(),
    count: jest.fn(),
  },
} as unknown as PrismaClient;

describe('GET /ping', () => {
  const server = createServer(mockPrisma);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with the current counter count', async () => {
    (mockPrisma.counter.create as jest.Mock).mockResolvedValue({});
    (mockPrisma.counter.count as jest.Mock).mockResolvedValue(3);

    const response = await server.inject({
      method: 'GET',
      url: '/ping',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ count: 3 });
  });

  it('should return 500 if the database throws an error', async () => {
    (mockPrisma.counter.create as jest.Mock).mockRejectedValue(
      new Error('DB connection failed'),
    );

    const response = await server.inject({
      method: 'GET',
      url: '/ping',
    });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: 'DB connection failed' });
  });
});
