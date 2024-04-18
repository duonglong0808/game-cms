import axios, { AxiosInstance } from 'axios';

export class BaseAxios {
  private request: AxiosInstance;

  constructor() {
    const accessToken = localStorage.getItem('access_token');
    this.request = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*',
      },
      timeout: 10000,
    });
  }

  async post(url: string, data: any, config?: any) {
    try {
      const response = await this.request.post(url, data, config);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async get(url: string, config?: any) {
    try {
      const response = await this.request.get(url, config);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async patch(url: string, data: string, config?: any) {
    try {
      const response = await this.request.post(url, data, config);
      return response.data;
    } catch (error) {
      return false;
    }
  }
}
