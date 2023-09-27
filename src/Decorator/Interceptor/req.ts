import axios, {AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults, InternalAxiosRequestConfig} from 'axios';

// 创建axios实例
const instance = axios.create({
    baseURL: 'https://api.example.com', // 设置请求的baseURL
    timeout: 5000, // 设置请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
    config => {

        // 在请求发送之前做一些处理，例如添加token到请求头
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

export default instance;


export const reqInterceptor = (interceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata("reqInterceptor", interceptor, target.prototype)
        const axiosInstance = Reflect.getMetadata("axiosInstance", target) as AxiosInstance
        axiosInstance.interceptors.request.use(interceptor)
    }
}


reqInterceptor((config) => {

        return config
    }
)