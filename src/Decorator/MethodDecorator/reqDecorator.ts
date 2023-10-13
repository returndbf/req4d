import {getMetaData, paramsObjToStr} from "../../util";
import {AFTERAOP, BEFOREAOP, USEAFTERAOP, USEBEFOREAOP} from "../../constant";
import axios from "axios";
import {GetConfig, LoginFnParams} from "../../@types/ReqType";
import {aopRunWithReq, runReq} from "./Aop";

export const Get = (url: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async () => {
            if(getMetaData(USEBEFOREAOP,target,propertyKey) || getMetaData(USEAFTERAOP,target,propertyKey)){
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


const Login = (loginData: LoginFnParams): MethodDecorator => {
    return (target, propertyKey, descriptor) => {

    }
}
