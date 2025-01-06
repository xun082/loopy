type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 添加 Next.js 相关的类型定义
type NextFetchRequestConfig = {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  cache?: RequestCache;
};

interface Params {
  cacheTime?: number; // 缓存时间，单位为秒。默认强缓存，0为不缓存
  params?: Record<string, any>;
  tags?: string[]; // 添加 Next.js 缓存标签支持
}

interface Props extends Params {
  url: string;
  method: Method;
  mode?: RequestMode; // 添加 mode 属性
  token?: string; // 添加 token 属性
}

type Config = { next: { revalidate: number } } | { cache: 'no-store' } | { cache: 'force-cache' };

interface ApiError extends Error {
  status?: number;
  url?: string;
  data?: any;
}

class Request {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * 请求拦截器
   */
  interceptorsRequest({
    url,
    method,
    params,
    cacheTime,
    mode,
    token,
    tags,
  }: Props & { tags?: string[] }) {
    let queryParams = ''; // url参数
    let requestPayload = ''; // 请求体数据

    // 请求头
    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // 优化 Next.js 缓存配置
    const nextConfig: NextFetchRequestConfig = {
      cache: cacheTime === 0 ? 'no-store' : 'force-cache',
      next: {
        tags,
        revalidate: cacheTime && cacheTime > 0 ? cacheTime : undefined,
      },
    };

    if (method === 'GET' || method === 'DELETE') {
      // fetch 对 GET 请求等，不支持将参数传在 body 上，只能拼接 url
      if (params) {
        queryParams = new URLSearchParams(params).toString();
        url = `${url}?${queryParams}`;
      }
    } else {
      // 非 form-data 传输 JSON 数据格式
      if (
        !['[object FormData]', '[object URLSearchParams]'].includes(
          Object.prototype.toString.call(params),
        )
      ) {
        headers['Content-Type'] = 'application/json';
        requestPayload = JSON.stringify(params);
      }
    }

    return {
      url,
      options: {
        method,
        headers,
        mode, // 添加 mode 属性
        body: method !== 'GET' && method !== 'DELETE' ? requestPayload : undefined,
        ...nextConfig,
      },
    };
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestUrl = res.url;
      const status = res.status;

      if (res.ok) {
        resolve(res.json() as Promise<T>);
      } else {
        res
          .clone()
          .text()
          .then((text) => {
            const error: ApiError = new Error();
            error.status = status;
            error.url = requestUrl;

            try {
              const errorData = JSON.parse(text);
              error.message = errorData.message || '接口错误';
              error.data = errorData;
            } catch {
              error.message = text || '网络请求错误';
            }

            // Next.js 特定错误处理
            switch (status) {
              case 401:
                error.message = '未授权，请重新登录';
                // 使用 Next.js 路由进行重定向
                if (typeof window !== 'undefined') {
                  window.location.href = '/login';
                }
                break;
              case 403:
                error.message = '拒绝访问';
                break;
              case 404:
                error.message = '请求错误，未找到该资源';
                break;
              case 500:
                error.message = '服务器错误';
                break;
              case 502:
                error.message = '网关错误';
                break;
              case 503:
                error.message = '服务不可用';
                break;
              case 504:
                error.message = '网关超时';
                break;
              default:
                error.message = error.message || `连接错误 ${status}`;
            }

            reject(error);
          });
      }
    });
  }

  async httpFactory<T>({
    url = '',
    params = {},
    method,
    mode,
    token,
    tags,
  }: Props & { tags?: string[] }): Promise<T> {
    const req = this.interceptorsRequest({
      url: this.baseURL + url,
      method,
      params: params.params,
      cacheTime: params.cacheTime,
      mode,
      token,
      tags,
    });

    const res = await fetch(req.url, req.options);

    return this.interceptorsResponse<T>(res);
  }

  async request<T>(
    method: Method,
    url: string,
    params?: Params,
    mode?: RequestMode,
    token?: string,
  ): Promise<T> {
    return this.httpFactory<T>({
      url,
      params,
      method,
      mode,
      token,
      tags: params?.tags,
    });
  }

  get<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('GET', url, params, mode, token);
  }

  post<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('POST', url, params, mode, token);
  }

  put<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('PUT', url, params, mode, token);
  }

  delete<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('DELETE', url, params, mode, token);
  }

  patch<T>(url: string, params?: Params, mode?: RequestMode, token?: string): Promise<T> {
    return this.request('PATCH', url, params, mode, token);
  }
}

const request = new Request(process.env.NEXT_PUBLIC_API_URL as string);

export default request;

export interface ApiResponse<T> {
  data: T;
  message: string;
  reason: string;
}

// 添加 Next.js 服务端错误处理工具
export const handleServerError = (error: ApiError) => {
  if (error.status === 401) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // 可以根据需要返回自定义错误页面
  return {
    props: {
      error: {
        statusCode: error.status || 500,
        message: error.message,
      },
    },
  };
};

// 优化错误处理函数，支持开发环境详细日志
export const handleRequest = async <T>(
  requestFn: () => Promise<T>,
  errorCallback?: (error: ApiError) => void,
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    if (error instanceof Error) {
      const apiError = error as ApiError;

      // 开发环境下输出详细错误信息
      if (process.env.NODE_ENV === 'development') {
        console.error('API 请求错误:', {
          message: apiError.message,
          status: apiError.status,
          url: apiError.url,
          data: apiError.data,
        });
      }

      // 执行错误回调
      errorCallback?.(apiError);
    } else {
      console.error('未知错误:', error);
    }
    throw error;
  }
};
