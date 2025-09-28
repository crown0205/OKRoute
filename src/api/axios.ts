import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

// 타입 정의
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: boolean;
}

export interface ErrorResponse {
  message: string;
  status?: number;
  data?: any;
}

// axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // 토큰이 필요한 경우 여기서 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 401 에러 처리 (토큰 만료)
    if (error.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        // 리프레시 토큰이 없는 경우 즉시 로그아웃
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(new Error('인증 정보가 없습니다.'));
      }

      try {
        const { data: refreshData } = await axiosInstance.post<{
          token: string;
        }>('/auth/refresh', {
          refreshToken,
        });

        if (!refreshData.token) {
          throw new Error('새로운 토큰을 받지 못했습니다.');
        }

        localStorage.setItem('token', refreshData.token);
        originalRequest.headers.Authorization = `Bearer ${refreshData.token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.clear(); // 모든 인증 관련 데이터 삭제
        window.location.href = '/login';
        return Promise.reject(
          new Error('인증이 만료되었습니다. 다시 로그인해주세요.'),
        );
      }
    }

    console.log('❌', { error });

    // 에러 응답 통일
    return Promise.reject<ErrorResponse>({
      message:
        error.response?.data?.message || '알 수 없는 에러가 발생했습니다.',
      status: error.response?.status,
      data: error.response?.data,
    });
  },
);

// API 메서드 래퍼
export const api = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => axiosInstance.get<T>(url, config),

  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => axiosInstance.post<T>(url, data, config),

  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => axiosInstance.put<T>(url, data, config),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => axiosInstance.delete<T>(url, config),

  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => axiosInstance.patch<T>(url, data, config),
};

// 에러 핸들링 유틸
export const handleApiError = (error: any): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message || '서버 에러가 발생했습니다.';
    console.error('API Error:', message);
    return { message };
  }
  console.error('Unknown Error:', error);
  return { message: '알 수 없는 에러가 발생했습니다.' };
};

export default api;
