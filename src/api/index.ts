import axios from "axios";

export class HttpService {
	client;

	constructor(baseURL: string, options: object = {}) {
		this.client = axios.create({
		baseURL,
		headers: {
				Accept: 'application/json',
		},
		...options,
		});
	}

	async get(url: string, options: object = {}) {
		const response = await this.client.get(url, options);
		return response;
	}

	async post(url: string, params: object | null = {}, requestParams: object = {}) {
		const response = await this.client.post(url, params, requestParams);
		return response;
	}

	async put(url: string, params: object = {}) {
		const response = await this.client.put(url, params);
		return response;
	}

	async delete(url: string) {
		const response = await this.client.delete(url);
		return response;
	}
}
