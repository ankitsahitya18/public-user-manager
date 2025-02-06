import { StorefrontService } from './connection';

export class Storefront extends StorefrontService {
	constructor() {
		super();
	}

	async getStorefrontById(storefrontId: string): Promise<any> {
		try {
			const response = await this.get(`/api/storefronts/${storefrontId}`);
			return response?.data;
		} catch (error) {
			throw error;
		}
	}
}
