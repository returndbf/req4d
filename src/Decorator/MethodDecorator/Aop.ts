import {AFTER_AOP, BEFORE_AOP, USE_AFTER_AOP, USE_BEFORE_AOP} from "../../constant";
import {GetConfig, LoginFnParams, ReqAopType, ReqReturnType} from "../../@types/ReqType";
import {getMetaData} from "../../util";
import axios, {Axios} from "axios";
import {AxiosInstance} from "axios/index";
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

export  const  aopRunWithReq = async (url:string,target: Object,propertyKey:string|symbol) =>{
    let beforeCb, afterCb = null
    if (getMetaData(USE_BEFORE_AOP, target, propertyKey)) {
        beforeCb = getMetaData(BEFORE_AOP, target, propertyKey);
    }
    if (getMetaData(USE_AFTER_AOP, target, propertyKey)) {
        afterCb = getMetaData(AFTER_AOP, target, propertyKey);
    }
    beforeCb && beforeCb()
    //const baseUrl = getMetaData('baseUrl', target) || getMetaData('config',target).baseURL;
    // 获取方法装饰器的参数
    const params = getMetaData('params', target,propertyKey);
    // 获取reqComponent方法装饰器的axiosInstance
    const axiosInstance = getMetaData('axiosInstance', target)
    const response = await axiosInstance.get(url,{params});
    if (afterCb && afterCb.length) {
        afterCb && afterCb(response.data)
    } else {
        afterCb && afterCb()
    }
    return response.data
}

export const runReq = async (url:string,target: Object,propertyKey:string|symbol) =>{
    const params = getMetaData('params', target,propertyKey);
    // 获取reqComponent方法装饰器的axiosInstance
    const axiosInstance:AxiosInstance = getMetaData('axiosInstance', target)
    const response = await axiosInstance.get(url,{params});
    return response.data
}
