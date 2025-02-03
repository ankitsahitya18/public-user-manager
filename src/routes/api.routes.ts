import { Router } from 'express';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';

class ApiRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
	}

	/**
	 * Initializes routes dynamically from all `routes.ts` files in parent directories.
	 */
	public async initializeRoutes() {
		const basePath = dirname(__dirname); // Get the parent folder
		const files = this.getFilesRecursively(basePath);

		for (const file of files) {
			if (file.endsWith('routes.ts')) {
				try {
					const module = await import(file);
					if (module.default) {
						this.router.use('/api', module.default);
					}
				} catch (error) {
					console.error(`Failed to load routes from ${file}:`, error);
				}
			}
		}
	}

	/**
	 * Recursively gets all files from the directory and subdirectories.
	 */
	private getFilesRecursively(dir: string): string[] {
		let results: string[] = [];
		const list = readdirSync(dir, { withFileTypes: true });

		for (const file of list) {
			const fullPath = join(dir, file.name);
			if (file.isDirectory()) {
				// Recursively get files from subdirectories
				results = results.concat(this.getFilesRecursively(fullPath));
			} else {
				results.push(fullPath);
			}
		}
		return results;
	}
}

// Create an instance and export it
const apiRoutesInstance = new ApiRoutes();
export default apiRoutesInstance.router;
export const initializeApiRoutes = () => apiRoutesInstance.initializeRoutes();
