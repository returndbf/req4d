import {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AXIOS_INSTANCE, RES_INTERCEPTOR} from "../../constant";


export const resInterceptor = (onFulfilled: (config: AxiosResponse) => AxiosResponse,onError: (error: any) => any): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata(RES_INTERCEPTOR, onFulfilled, target.prototype)
        const axiosInstance = Reflect.getMetadata(AXIOS_INSTANCE, target) as AxiosInstance
        axiosInstance.interceptors.response.use(onFulfilled,onError)
    }
}
