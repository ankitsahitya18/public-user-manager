export class Serializer {
	/**
	 * Converts BigInt fields to numbers only when sending JSON responses.
	 */
	public static serializeBigInt(data: any): any {
		if (Array.isArray(data)) {
			return data.map((item) => Serializer.serializeBigInt(item));
		} else if (typeof data === 'object' && data !== null) {
			return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, typeof value === 'bigint' ? Number(value) : value]));
		}
		return data;
	}
}
