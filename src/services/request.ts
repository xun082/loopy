import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosHeaders,
  InternalAxiosRequestConfig,
  AxiosRequestConfig as BaseAxiosRequestConfig,
} from 'axios';
import axiosRetry from 'axios-retry';

import { IOptions, IResponse } from './types';

import useAuthStore from '@/stores/useAuthStore';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

interface AxiosRequestConfig extends BaseAxiosRequestConfig {
  method?: HTTPMethod;
}

const AUTH_FAILED_CODE = [401, 403];
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
const HTTP_REQUEST_TIMEOUT = 30 * 1000;

class HttpRequest {
  private static instance: HttpRequest;

  private axiosRequestConfig: AxiosRequestConfig = {
    headers: DEFAULT_HEADERS,
    timeout: HTTP_REQUEST_TIMEOUT,
  };

  public options: IOptions = {};

  private constructor() {}

  static getInstance(): HttpRequest {
    if (!this.instance) {
      this.instance = new HttpRequest();
    }

    return this.instance;
  }

  /**
   * 配置全局选项
   */
  public configuration(options: IOptions, requestConfig?: AxiosRequestConfig) {
    this.options = { ...this.options, ...options };

    if (requestConfig) {
      this.axiosRequestConfig = { ...this.axiosRequestConfig, ...requestConfig };
    }
  }

  /**
   * 从本地缓存获取 token
   */
  private getTokenFromStorage(): string {
    try {
      return useAuthStore.getState().accessToken || ''; // 从 localStorage 获取 token
    } catch (error) {
      console.warn('Failed to retrieve token from storage:', error);

      return '';
    }
  }

  /**
   * 创建 Axios 实例并发送请求
   */
  private axiosRequest<T>(requestConfig: AxiosRequestConfig): Promise<AxiosResponse<IResponse<T>>> {
    const axiosInstance: AxiosInstance = Axios.create(this.axiosRequestConfig);

    // 配置重试机制（如果启用）
    if (requestConfig?.data?.axiosRetryConfig) {
      axiosRetry(axiosInstance, {
        retries: 3,
        retryDelay: (retryCount) => retryCount * 1000,
        ...requestConfig.data.axiosRetryConfig,
      });
    }

    // 设置拦截器
    this.setupInterceptors(axiosInstance);

    return axiosInstance(requestConfig);
  }

  /**
   * 发起请求
   */
  public async request<T>(requestConfig: AxiosRequestConfig): Promise<IResponse<T>> {
    const response = await this.axiosRequest<T>(requestConfig);

    return response.data;
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors(instance: AxiosInstance) {
    // 请求拦截器
    instance.interceptors.request.use(
      (config) => this.requestInterceptor(config),
      (error: AxiosError) => {
        console.error(`[Request Error]: ${error.message}`);

        return Promise.reject(error);
      },
    );

    // 响应拦截器
    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => this.handleResponseError(error),
    );
  }

  /**
   * 请求拦截器：从本地缓存获取 token 并添加到 headers
   */
  private requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = this.getTokenFromStorage(); // 动态从本地缓存获取 token

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    // 设置 Authorization Header
    config.headers.set('Authorization', `Bearer ${token}`);

    return config;
  }

  /**
   * 响应错误处理
   */
  private handleResponseError(error: AxiosError) {
    if (Axios.isAxiosError(error)) {
      console.error(`[Response Error]: ${error.message}`);

      // 处理特定错误码
      if (AUTH_FAILED_CODE.includes(error.response?.status || 0)) {
        console.warn(`[Permission Denied]`);
        this.options.onPermissionDenied?.(error);
      }

      // 请求取消逻辑
      if (Axios.isCancel(error)) {
        console.warn(`[Request Canceled]: ${error.message}`);
      }
    } else {
      console.error(`[Unknown Error]: ${error}`);
    }

    return Promise.reject(error);
  }
}

const httpClient = HttpRequest.getInstance();

httpClient.configuration(
  {},
  {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
);

export { httpClient };
