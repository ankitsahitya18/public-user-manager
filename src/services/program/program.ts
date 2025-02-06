import { ProgramService } from './connection';

export class Program extends ProgramService {
	constructor() {
		super();
	}

	async getAProgramById(programId: string): Promise<any> {
		try {
			const response = await this.get(`/api/programs/${programId}`);
			return response?.data;
		} catch (error) {
			throw error;
		}
	}
}
