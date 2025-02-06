import { createClient, RedisClientType } from 'redis';

class RedisService {
	private client: RedisClientType;

	constructor() {
		this.client = createClient({
			url: `${process.env.REDIS_SERVER}`,
		});

		this.client.on('error', (err) => console.error('Redis Error:', err));

		this.client.connect().catch((err) => console.error('Redis Connection Error:', err));
	}

	// Get data from Redis
	async get<T>(key: string): Promise<T | null> {
		try {
			const data = await this.client.get(key);
			return data ? (JSON.parse(data) as T) : null;
		} catch (err) {
			console.error(`Redis GET Error for key "${key}":`, err);
			return null;
		}
	}

	// Set data in Redis with expiration
	async set<T>(key: string, value: T, ttl: number = Number(process.env.CACHE_TTL) || 300): Promise<boolean> {
		try {
			await this.client.setEx(key, ttl, JSON.stringify(value));
			return true;
		} catch (err) {
			console.error(`Redis SET Error for key "${key}":`, err);
			return false;
		}
	}
}

export default new RedisService();
