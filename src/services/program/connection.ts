import { BaseService } from '../../common/base.services';

export class ProgramService extends BaseService {
	constructor() {
		super(process.env.PROGRAM_SERVICE_BASE_URL as string);
	}
}
