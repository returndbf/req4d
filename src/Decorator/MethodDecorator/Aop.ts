import {
    AFTER_AOP, AXIOS_INSTANCE,
    BEFORE_AOP,
    BODY,
    QUERY,
    REQ_METHOD,
    ReqMethodEnum,
    USE_AFTER_AOP,
    USE_BEFORE_AOP
} from "../../constant";
import {GetConfig, LoginFnParams, ReqAopType, ReqReturnType} from "../../@types/ReqType";
import {getMetaData} from "../../util";
import axios, {Axios} from "axios";
import {AxiosInstance} from "axios/index";

const getReqMap = (axiosInstance: AxiosInstance, url: string, params?: any, data?: any) => {
    return {
        get: async () => {
            return axiosInstance.get(url, {params})
        },
        post: async () => {
            return axiosInstance.post(url, data, {params})
        },
        put: async () => {
            return axiosInstance.post(url, data, {params})
        },
        delete: async () => {
            return axiosInstance.post(url, data, {params})
        }
    }
}
/*
    * 在网络请求前或请求后执行函数，<b style='color:red'>注意</b>：after 回调函数在装饰器内部获取到请求结果后立即执行，而不是等待原函数的Promise
    * @param aop对象 属性为两个函数
 */
export const ReqAop = (aopObj: ReqAopType): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
        const {afterCb, beforeCb} = aopObj
        if (beforeCb) {
            Reflect.defineMetadata(USE_BEFORE_AOP, true, target, propertyKey);
            Reflect.defineMetadata('BEFORE_AOP', beforeCb, target, propertyKey);
        }
        if (afterCb) {
            Reflect.defineMetadata(USE_AFTER_AOP, true, target, propertyKey);
            Reflect.defineMetadata('AFTER_AOP', afterCb, target, propertyKey);
        }
    }
}

export const aopRunWithReq = async (url: string, target: Object, propertyKey: string | symbol) => {
    let beforeCb, afterCb = null
    if (getMetaData(USE_BEFORE_AOP, target, propertyKey)) {
        beforeCb = getMetaData(BEFORE_AOP, target, propertyKey);
    }
    if (getMetaData(USE_AFTER_AOP, target, propertyKey)) {
        afterCb = getMetaData(AFTER_AOP, target, propertyKey);
    }
    beforeCb && beforeCb()
    // 获取参数装饰器装饰器的params参数
    const params = getMetaData(QUERY, target, propertyKey);
    // 获取参数装饰器装饰器的data参数
    const data = getMetaData(BODY, target, propertyKey)
    const reqMethod: ReqMethodEnum = getMetaData(REQ_METHOD, target, propertyKey);
    // 获取reqComponent方法装饰器的axiosInstance
    const axiosInstance: AxiosInstance = getMetaData(AXIOS_INSTANCE, target)
    // 生成请求对象
    const reqObj = getReqMap(axiosInstance, url, params, data)
    // 调用请求对象对应的方法，因为参数已经提前传递，所以无需再传
    const response = await reqObj[reqMethod]()
    if (afterCb && afterCb.length) {
        afterCb && afterCb(response.data)
    } else {
        afterCb && afterCb()
    }
    return response.data
}
// const reqMap = {
//     get:async(axiosInstance:AxiosInstance,url:string,params:any)=>{
//         return axiosInstance.get(url,{params})
//     }
// }

export const runReq = async (url: string, target: Object, propertyKey: string | symbol) => {
    const params = getMetaData(QUERY, target, propertyKey);
    const data = getMetaData(BODY, target, propertyKey)
    const reqMethod: ReqMethodEnum = getMetaData(REQ_METHOD, target, propertyKey);
    // 获取reqComponent方法装饰器的axiosInstance
    const axiosInstance: AxiosInstance = getMetaData(AXIOS_INSTANCE, target)
    const reqObj = getReqMap(axiosInstance, url, params, data)
    const response = await reqObj[reqMethod]()
    return response.data
}
