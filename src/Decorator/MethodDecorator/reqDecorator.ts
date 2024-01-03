import {getMetaData, paramsObjToStr} from "../../util";
import {
    AFTER_AOP,
    BEFORE_AOP,
    BODY,
    BODY_INDEX, EXTRA_CONFIG,
    QUERY,
    QUERY_INDEX, REQ_METHOD, ReqMethodEnum,
    USE_AFTER_AOP,
    USE_BEFORE_AOP
} from "../../constant";
import axios from "axios";
import {GetConfig, LoginFnParams} from "../../@types/ReqType";
import {aopRunWithReq, runReq} from "./Aop";
import * as path from "path";
const FormData = require('form-data');
const fs = require('fs')

export const Get = (url: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async (...args:any[]) => {
            const paramsIndex = getMetaData(QUERY_INDEX,target,propertyKey)
            console.log(paramsIndex,"paramsindex")
            const params = args[paramsIndex]
            Reflect.defineMetadata(QUERY,params,target,propertyKey)
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
            const dataIndex =  getMetaData(BODY_INDEX,target,propertyKey)
            const data  = args[dataIndex]
            Reflect.defineMetadata(BODY,data,target,propertyKey)
            Reflect.defineMetadata(REQ_METHOD,ReqMethodEnum.POST,target,propertyKey)
            if(getMetaData(USE_BEFORE_AOP,target,propertyKey) || getMetaData(USE_AFTER_AOP,target,propertyKey)){
                return await aopRunWithReq(url,target,propertyKey)
            }else{
                return await runReq(url,target,propertyKey)
            }
        }
    }
}
export const Upload =(url:string): MethodDecorator=>{
    return (target, propertyKey, descriptor:PropertyDescriptor)=>{
        descriptor.value = async (...args:any[])=>{
            const formData = new FormData();

            const filePath = path.join(__dirname, 'pic.png');
            // 添加要上传的文件，假设filePath是本地文件路径
            formData.append('file', fs.createReadStream(filePath), { filename: 'example.jpg' }); // 假设文件名为example.jpg

            // 如果有其他字段需要一并发送，可以添加
            formData.append('metadata', JSON.stringify({ key: 'value' }));

            // 设置请求头（FormData会自动生成正确的Content-Type）
            const config = {
                headers: formData.getHeaders(),
            };
            Reflect.defineMetadata(BODY,formData,target,propertyKey)
            Reflect.defineMetadata(REQ_METHOD,ReqMethodEnum.POST,target,propertyKey)
            Reflect.defineMetadata(EXTRA_CONFIG,config,target,propertyKey)
            return await runReq(url,target,propertyKey)

        }
    }
}

// export const Params = (params: GetConfig['params']): MethodDecorator => {
//     return (target, propertyKey, descriptor) => {
//         if (typeof params === 'object') {
//             Reflect.defineMetadata('params', paramsObjToStr(params), target,propertyKey)
//         } else {
//             Reflect.defineMetadata('params', params, target,propertyKey)
//         }
//     }
// }
// export const Params = (target, propertyKey, index) => {
//     Reflect.defineMetadata('params',)
// }


const Login = (loginData: LoginFnParams): MethodDecorator => {
    return (target, propertyKey, descriptor) => {

    }
}
