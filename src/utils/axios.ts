import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {SUPERHERO_API_KEY} from '@env';

const API_BASE_URL = `https://superheroapi.com/api/${SUPERHERO_API_KEY}`;
const API_TIMEOUT = '10000';

const parsedTimeout = parseInt(API_TIMEOUT, 10);

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: !isNaN(parsedTimeout) ? parsedTimeout : 10000,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const ApiUtil = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config).then(responseBody),

  post: <T>(url: string, body: any, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, body, config).then(responseBody),
};

export default axiosInstance;
