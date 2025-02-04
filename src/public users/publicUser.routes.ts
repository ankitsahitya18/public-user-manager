import { PublicUserController } from './publicUser.controller';
import { BaseApiRoutes } from '../common/base.routes';

class PublicUserRoutes extends BaseApiRoutes {
	constructor() {
		super('/public-users');
	}

	protected initializeRoutes(): void {
		const controller = new PublicUserController();
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
