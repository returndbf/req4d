import 'reflect-metadata'
import {BODY_INDEX, FILE_INDEX, QUERY_INDEX} from "../../constant"

// 存储地址栏查询参数数据的下标
export const Query = (target: any, propertyKey: string, index: number) =>{
    Reflect.defineMetadata(QUERY_INDEX,index,target,propertyKey)
}
// 存储请求体数据的下标
export const Body = (target: any, propertyKey: string, index: number) =>{
    Reflect.defineMetadata(BODY_INDEX,index,target,propertyKey)
}
export const File = (target: any, propertyKey: string, index: number) =>{
    Reflect.defineMetadata(FILE_INDEX,index,target,propertyKey)
}

