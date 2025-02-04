import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomError, NotFoundError, UnprocessableEntityError } from '../errors';

export abstract class BaseController {
	private readonly prisma: PrismaClient;
	private readonly model: any;

	constructor(model: any) {
		this.prisma = new PrismaClient();
		this.model = model;
	}

	/**
	 * Fetch all records for the model with pagination and filtering.
	 */
	public async index(req: Request, res: Response): Promise<void> {
		try {
			const page = parseInt(req.body.page as string) || 1;
			const limit = parseInt(req.body.limit as string) || 10;
			const skip = (page - 1) * limit;
			const filters = this.getFilters(req);

			const records = await this.model.findMany({
				where: filters,
				skip: skip,
				take: limit,
			});

			const totalRecords = await this.model.count({ where: filters });

			// Serialize BigInt values
			const serializedRecords = this.serializeBigInt(records);

			res.json({
				pagination: {
					page,
					limit,
					totalRecords,
					totalPages: Math.ceil(totalRecords / limit),
				},
				data: serializedRecords,
			});
		} catch (error) {
			this.handleError(error, res);
		}
	}

	/**
	 * Fetch a single record by ID for the model.
	 */
	public async show(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		try {
			const record = await this.model.findUnique({
				where: { id: Number(id) },
			});

			if (!record) {
				throw new NotFoundError(`${this.model.name} with ID ${id} not found`);
			}

			// Serialize BigInt values
			const serializedRecord = this.serializeBigInt(record);

			res.json(serializedRecord);
		} catch (error) {
			this.handleError(error, res);
		}
	}

	/**
	 * Create a new record for the model.
	 */
	public async create(req: Request, res: Response): Promise<void> {
		try {
			const record = await this.model.create({
				data: req.body,
			});

			// Serialize BigInt values
			const serializedRecord = this.serializeBigInt(record);

			res.status(201).json(serializedRecord);
		} catch (error) {
			this.handleError(error, res);
		}
	}

	/**
	 * Update a record for the model.
	 */
	public async update(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		try {
			const record = await this.model.update({
				where: { id: Number(id) },
				data: req?.body,
			});

			if (!record) {
				throw new NotFoundError(`${this.model.name} with ID ${id} not found`);
			}

			// Serialize BigInt values
			const serializedRecord = this.serializeBigInt(record);

			res.json(serializedRecord);
		} catch (error) {
			this.handleError(error, res);
		}
	}

	/**
	 * Delete a record for the model.
	 */
	public async destroy(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		try {
			const record = await this.model.delete({
				where: { id: Number(id) },
			});

			if (!record) {
				throw new NotFoundError(`${this.model.name} with ID ${id} not found`);
			}

			res.status(204).send();
		} catch (error) {
			this.handleError(error, res);
		}
	}

	/**
	 * Handle errors gracefully.
	 */
	private handleError(error: any, res: Response): void {
		if (error instanceof CustomError) {
			res.status(error.statusCode).json(error.json());
		} else {
			const internalError = new UnprocessableEntityError(error.message);
			res.status(internalError.statusCode).json(internalError.json());
		}
	}

	/**
	 * Extract filters from the query parameters.
	 * Override this method in subclasses to customize filter behavior.
	 */
	protected getFilters(req: Request): Record<string, any> {
		const filters: Record<string, any> = {};
		const query = req.body.filterConditions;

		if (!query) {
			return filters;
		}

		Object.keys(query).forEach((key) => {
			filters[key] = query[key];
		});

		return filters;
	}

	/**
	 * Converts BigInt fields to strings only when sending JSON responses.
	 */
	private serializeBigInt(data: any): any {
		if (Array.isArray(data)) {
			return data.map((item) => this.serializeBigInt(item));
		} else if (typeof data === 'object' && data !== null) {
			return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, typeof value === 'bigint' ? Number(value) : value]));
		}
		return data;
	}
}
