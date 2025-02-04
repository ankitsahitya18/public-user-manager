import { BaseController } from '../common/base.controller';
import { PublicUser } from '../models';

export class PublicUserController extends BaseController {
	constructor() {
		super(PublicUser);
	}
}
