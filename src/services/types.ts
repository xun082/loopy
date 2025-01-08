import { AxiosRequestConfig, AxiosResponse } from 'axios';

type TBeforeRequest = (config: AxiosRequestConfig) => void;

export interface IOptions {
  token?: string;
  beforeRequest?: TBeforeRequest;
  onCustomResponse?: (response: AxiosResponse) => void;
  onPermissionDenied?: (error?: Error) => void;
}

export interface IResponse<T> {
  data: T;
  code: number;
  message: string;
  timestamp: number;
}
