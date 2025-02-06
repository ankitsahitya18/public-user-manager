import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { PublicUser } from '../models';
import { Program } from '../services/program/program';
import { Storefront } from '../services/storefront/storefront';
import RedisService from '../cache/redis';

export class PublicUserController extends BaseController {
	private programService: Program;
	private storefrontService: Storefront;

	constructor() {
		super(PublicUser);
		this.programService = new Program();
		this.storefrontService = new Storefront();
	}

	public async storefrontProgramData(req: Request, res: Response): Promise<void> {
		try {
			const { cacheBuster } = req.query;
			const storefrontId = Number(req.params?.storefrontId);
			const cacheKey = `publicUser-v1-${storefrontId}`;

			if (!cacheBuster) {
				const cachedData = await RedisService.get<typeof response>(cacheKey);
				if (cachedData) {
					res.json(cachedData);
					return;
				}
			}

			const storefrontProgram = await this.prisma.storefrontProgram.findFirst({
				where: { storefrontId },
			});

			const [storefront, programs] = await Promise.all([
				this.storefrontService.getStorefrontById(String(storefrontId)),
				this.programService.getAProgramById(String(storefrontProgram?.programId)),
			]);

			const response = { storefront, programs };

			if (!cacheBuster) {
				await RedisService.set(cacheKey, response);
			}

			res.json(response);
		} catch (error) {
			this.handleError(error, res);
		}
	}
}
