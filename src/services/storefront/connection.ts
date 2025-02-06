import { BaseService } from '../../common/base.services';

export class StorefrontService extends BaseService {
	constructor() {
		super(process.env.STOREFRONT_SERVICE_BASE_URL as string);
	}
}
