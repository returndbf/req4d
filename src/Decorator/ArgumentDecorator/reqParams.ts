import 'reflect-metadata'
import {BODY_INDEX, EXTRA_CONFIG, FILE_INDEX, QUERY_INDEX,PARAM_PROPERTY,PARAM_INDEX} from "../../constant"

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

export const Param = (property:string):ParameterDecorator =>{
    return (target, propertyKey, index) =>{
        // Reflect.defineMetadata(PARAM_INDEX,index,target,propertyKey)
        console.log(property,'property')
        // 存储参数名
        Reflect.defineMetadata(PARAM_PROPERTY+property,property,target,propertyKey!)
        // 存储参数下标
        Reflect.defineMetadata(PARAM_INDEX+property,index,target,propertyKey!)
    }

}


