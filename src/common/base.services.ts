import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export abstract class BaseService {
	api: any;

	constructor(baseURL: string, headers: Record<string, string> = {}) {
		this.api = axios.create({
			baseURL: baseURL,
			headers: headers,
		});
	}

	// GET method
	protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		try {
			const response = await this.api.get(url, config);
			return response;
		} catch (error) {
			throw error;
		}
	}

	// POST method
	protected async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		try {
			const response = await this.api.post(url, data, config);
			return response;
		} catch (error) {
			throw error;
		}
	}

	// PUT method
	protected async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		try {
			const response = await this.api.put(url, data, config);
			return response;
		} catch (error) {
			throw error;
		}
	}

	// DELETE method
	protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		try {
			const response = await this.api.delete(url, config);
			return response;
		} catch (error) {
			throw error;
		}
	}
}
