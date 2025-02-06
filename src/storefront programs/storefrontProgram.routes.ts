import { StorefrontprogramController } from './storefrontProgram.controller';
import { BaseApiRoutes } from '../common/base.routes';

class PublicUserRoutes extends BaseApiRoutes {
	constructor() {
		super('/storefront-programs');
	}

	protected initializeRoutes(): void {
		const controller = new StorefrontprogramController();
		this.addRestRoutes(controller, {
			index: [],
			show: [],
			create: [],
			update: [],
			destroy: [],
		});
	}
}

export default new PublicUserRoutes().router;
