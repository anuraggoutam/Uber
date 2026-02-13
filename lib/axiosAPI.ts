import { AxiosRequestConfig } from 'axios';
import { api } from './api';

export const axiosAPI = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.request<T>({
      url,
      ...config,
    });

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong';

    throw new Error(message);
  }
};
