import 'reflect-metadata'
import {DATA_INDEX, PARAMS_INDEX} from "../../constant"

// 存储地址栏查询参数数据的下标
export const Params = (target: any, propertyKey: string, index: number) =>{
    console.log(index,"paramsindex")
    Reflect.defineMetadata(PARAMS_INDEX,index,target,propertyKey)
}
// 存储请求体数据的下标
export const Data = (target: any, propertyKey: string, index: number) =>{
    console.log(index,"dataindex")
    Reflect.defineMetadata(DATA_INDEX,index,target,propertyKey)
}

