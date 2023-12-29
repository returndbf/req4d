import {getMetaData, paramsObjToStr} from "../../util";
import {
    AFTER_AOP,
    BEFORE_AOP,
    DATA,
    DATA_INDEX,
    PARAMS,
    PARAMS_INDEX, REQ_METHOD, ReqMethodEnum,
    USE_AFTER_AOP,
    USE_BEFORE_AOP
} from "../../constant";
import axios from "axios";
import {GetConfig, LoginFnParams} from "../../@types/ReqType";
import {aopRunWithReq, runReq} from "./Aop";

export const Get = (url: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async (...args:any[]) => {
            const paramsIndex = getMetaData(PARAMS_INDEX,target,propertyKey)
            const params = args[paramsIndex]
            Reflect.defineMetadata(PARAMS,params,target,propertyKey)
            Reflect.defineMetadata(REQ_METHOD,ReqMethodEnum.GET,target,propertyKey)
            if(getMetaData(USE_BEFORE_AOP,target,propertyKey) || getMetaData(USE_AFTER_AOP,target,propertyKey)){
                return await aopRunWithReq(url,target,propertyKey)
            }else{
                return await runReq(url,target,propertyKey)
            }

        }
    }
}
export const Post =(url:string) :MethodDecorator=>{
    return (target, propertyKey, descriptor:PropertyDescriptor)=>{
        descriptor.value = async (...args:any[])=>{
            const dataIndex =  getMetaData(DATA_INDEX,target,propertyKey)
            const data  = args[dataIndex]
            Reflect.defineMetadata(DATA,data,target,propertyKey)
            Reflect.defineMetadata(REQ_METHOD,ReqMethodEnum.POST,target,propertyKey)
            if(getMetaData(USE_BEFORE_AOP,target,propertyKey) || getMetaData(USE_AFTER_AOP,target,propertyKey)){
                return await aopRunWithReq(url,target,propertyKey)
            }else{
                return await runReq(url,target,propertyKey)
            }
        }
    }
}

export const Params = (params: GetConfig['params']): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
        if (typeof params === 'object') {
            Reflect.defineMetadata('params', paramsObjToStr(params), target,propertyKey)
        } else {
            Reflect.defineMetadata('params', params, target,propertyKey)
        }
    }
}
// export const Params = (target, propertyKey, index) => {
//     Reflect.defineMetadata('params',)
// }


const Login = (loginData: LoginFnParams): MethodDecorator => {
    return (target, propertyKey, descriptor) => {

    }
}
