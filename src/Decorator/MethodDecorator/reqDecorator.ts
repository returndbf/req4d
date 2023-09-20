import {getMetaData, paramsObjToStr} from "../../util";
import {AFTERAOP, BEFOREAOP, USEAFTERAOP, USEBEFOREAOP} from "../../constant";
import axios from "axios";
import {GetConfig, LoginFnParams} from "../../@types/ReqType";

export const Get = (url: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async () => {
            // 封装一下
            let beforeCb, afterCb = null
            if (getMetaData(USEBEFOREAOP, target, propertyKey)) {
                beforeCb = getMetaData(BEFOREAOP, target, propertyKey);
            }
            if (getMetaData(USEAFTERAOP, target, propertyKey)) {
                afterCb = getMetaData(AFTERAOP, target, propertyKey);
            }
            beforeCb()
            const baseUrl = getMetaData('baseUrl', target);
            const params = getMetaData('params', target);
            const response = await axios.get(baseUrl + url + params);
            if (afterCb.length) {
                afterCb(response.data)
            } else {
                afterCb()
            }
            return response.data
        }
    }
}

export const Params = (params: GetConfig['params']): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
        if (typeof params === 'object') {
            Reflect.defineMetadata('params', paramsObjToStr(params), target)
        } else {
            Reflect.defineMetadata('params', params, target)
        }
    }
}


const Login = (loginData: LoginFnParams): MethodDecorator => {
    return (target, propertyKey, descriptor) => {

    }
}
