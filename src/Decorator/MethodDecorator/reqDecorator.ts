import {getMetaData, paramsObjToStr} from "../../util";
import {
    AFTER_AOP,
    BEFORE_AOP,
    BODY,
    BODY_INDEX, EXTRA_CONFIG, FILE_INDEX,
    QUERY,
    QUERY_INDEX, REQ_METHOD, ReqMethodEnum,
    USE_AFTER_AOP,
    USE_BEFORE_AOP
} from "../../constant";
import axios from "axios";
import {FilesType, FileType, GetConfig, LoginFnParams} from "../../@types/ReqType";
import {aopRunWithReq, runReq} from "./Aop";
import * as path from "path";
import {AxiosRequestConfig} from "axios/index";

const FormData = require('form-data');
const fs = require('fs')

export const Config = (config:AxiosRequestConfig) : MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(EXTRA_CONFIG,config,target,propertyKey)
    }
}


const parseParam = (url:string)=>{
    const regex = /:(\w+)/g;
    const matches = [];
    let match;

    while ((match = regex.exec(url)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}
export const Get = (url: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            // 解析获取param数组
            const params = parseParam(url)
            // 如果有数据，则根据args获取param的数据，然后替换url占位符数据
            if(params.length){

            }

            const queryIndex = getMetaData(QUERY_INDEX, target, propertyKey)
            const query = args[queryIndex]
            Reflect.defineMetadata(QUERY, query, target, propertyKey)
            Reflect.defineMetadata(REQ_METHOD, ReqMethodEnum.GET, target, propertyKey)
            if (getMetaData(USE_BEFORE_AOP, target, propertyKey) || getMetaData(USE_AFTER_AOP, target, propertyKey)) {
                return await aopRunWithReq(url, target, propertyKey)
            } else {
                return await runReq(url, target, propertyKey)
            }

        }
    }
}
export const Post = (url: string): MethodDecorator => {
    return (target, propertyKey, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const queryIndex = getMetaData(QUERY_INDEX, target, propertyKey)
            const query = args[queryIndex]
            const dataIndex = getMetaData(BODY_INDEX, target, propertyKey)
            const data = args[dataIndex]
            Reflect.defineMetadata(BODY, data, target, propertyKey)
            Reflect.defineMetadata(QUERY, query, target, propertyKey)
            Reflect.defineMetadata(REQ_METHOD, ReqMethodEnum.POST, target, propertyKey)
            if (getMetaData(USE_BEFORE_AOP, target, propertyKey) || getMetaData(USE_AFTER_AOP, target, propertyKey)) {
                return await aopRunWithReq(url, target, propertyKey)
            } else {
                return await runReq(url, target, propertyKey)
            }
        }
    }
}
export const Put = (url: string): MethodDecorator => {
    return (target, propertyKey, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const paramsIndex = getMetaData(QUERY_INDEX, target, propertyKey)
            const params = args[paramsIndex]
            const dataIndex = getMetaData(BODY_INDEX, target, propertyKey)
            const data = args[dataIndex]
            Reflect.defineMetadata(BODY, data, target, propertyKey)
            Reflect.defineMetadata(QUERY, params, target, propertyKey)
            Reflect.defineMetadata(REQ_METHOD, ReqMethodEnum.PUT, target, propertyKey)
            if (getMetaData(USE_BEFORE_AOP, target, propertyKey) || getMetaData(USE_AFTER_AOP, target, propertyKey)) {
                return await aopRunWithReq(url, target, propertyKey)
            } else {
                return await runReq(url, target, propertyKey)
            }
        }
    }
}
export const Upload = (url: string): MethodDecorator => {
    return (target, propertyKey, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const fileIndex = getMetaData(FILE_INDEX, target, propertyKey)
            const bodyIndex = getMetaData(BODY_INDEX, target, propertyKey)
            const files: FilesType = args[fileIndex]
            const formData = new FormData();
            if (Array.isArray(files)) {
                files.forEach((file: FileType) => {
                    formData.append(file.key, file.value)
                })
            } else {
                formData.append(files.key, files.value)
            }
            if(bodyIndex&&args[bodyIndex]){
                Object.entries(args[bodyIndex]).forEach(([key, value]) => {
                    formData.append(key, value)
                })
            }
            const config = {
                headers: formData.getHeaders(),
            };
            const extraConfig = getMetaData(EXTRA_CONFIG, target, propertyKey)
            Reflect.defineMetadata(BODY, formData, target, propertyKey)
            Reflect.defineMetadata(REQ_METHOD, ReqMethodEnum.POST, target, propertyKey)
            Reflect.defineMetadata(EXTRA_CONFIG, {...config,...extraConfig}, target, propertyKey)
            return await runReq(url, target, propertyKey)
        }
    }
}

// export const Download = (url:string):MethodDecorator=>{
//     return (target, propertyKey, descriptor: PropertyDescriptor) => {
//         descriptor.value = async (...args: any[]) => {
//             const config = {
//                 responseType: 'stream',
//                 headers: {
//                     Auth:'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDQ4NzI4NDIsImlkIjoiMSIsImV4cCI6MTcwNDg3NjQ0Mn0.zdy_2PqgVz694qa4dGG_9pspG6WqC-WlhlaYsHRR-8w'
//                 }
//             };
//             Reflect.defineMetadata(REQ_METHOD, ReqMethodEnum.GET, target, propertyKey)
//             Reflect.defineMetadata(EXTRA_CONFIG, config, target, propertyKey)
//             const data = await runReq(url,target,propertyKey)
//             const writeStream = fs.createWriteStream('./file.xlsx');
//             data.pipe(writeStream);
//             writeStream.on('finish', () => {
//                 console.log('文件下载并保存成功');
//             });
//             writeStream.on('error', (err:any) => {
//                 console.error('文件写入失败:', err);
//                 // 清理操作：删除未完整写入的文件（异步版本）
//                 fs.unlink('./file.xlsx')
//                     .catch((unlinkError:any) => console.error('删除失败的文件时出错:', unlinkError));
//             });
//                 // data.data.pipe(fs.createWriteStream('./file.xlsx')) // 保存到项目根目录下的file.txt文件
//                 // .on('finish', () => {
//                 //     console.log('文件下载完成并保存到根目录');
//                 // })
//
//         }
//     }
// }

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
