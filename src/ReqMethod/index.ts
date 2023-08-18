import axios, {AxiosResponse} from "axios";
import {PromiseData} from "../@types/ResType";
import {IData} from "../index";
import "reflect-metadata";
import { PartialConfig} from "../@types/Config";

export const baseUrl = (BASE_URL:PartialConfig["baseUrl"]) :  PropertyDecorator =>{
    return(target, propertyKey)=>{
        Reflect.defineMetadata('BASE_URL', BASE_URL, target)
        // console.log("PropertyDecorator");
    }
}
const headers = (headers:PartialConfig['headers']) :PropertyDecorator =>{
    return (target, propertyKey)=>{
        Reflect.defineMetadata('headers', headers, target)
    }
}
const getMetaData = (key:string,target:Object)=>{
    return Reflect.getMetadata(key, target)
}
export const Get = (url:string) :MethodDecorator =>{
    return (target, propertyKey, descriptor:PropertyDescriptor) =>{
        const originalMethod = descriptor.value;
         descriptor.value = async (...args: any[]) => {
            const response:AxiosResponse<IData<number>,any>= await axios.get(getMetaData('BASE_URL',target)+url);
            return originalMethod(response.data)
        }
    }
}

export const Post = (url:string,params:Record<string, any>,body:Record<any, any> | any,headers:Record<string, string>) :MethodDecorator=>{
    return (target:any, propertyKey, descriptor:PropertyDescriptor) =>{
        // const originalMethod = descriptor.value;
        // descriptor.value = async (...args: any[]) => {
        //     const response:AxiosResponse = await axios.post(url,body,{params,headers});
        //     return originalMethod!.call(this, response.data, ...args);
        // };
    }
}

const Param  = ():ParameterDecorator=>{
    return (target:any)=>{

    }

}

const myDecorator  = (): MethodDecorator=>{
    return (target:any,propertyKey)=>{
        // Reflect.defineMetadata('BASE_URL', "http://117.50.184.140/", target)
        console.log(Reflect.getMetadata("BASE_URL", target));
        // console.log("MethodDecorator");
    }
}
const classD = ():ClassDecorator =>{
    return (target)=>{
        // console.log(Reflect.getMetadata("BASE_URL", target.prototype.header));
        // console.log( target.prototype.header)
    }
}

const param = ():ParameterDecorator=>{
    return (target)=>{
       // console.log(Reflect.getMetadata("BASE_URL", target));
        // console.log("ParameterDecorator")
    }
}
@classD()
class MyClass {
    // @baseUrl("http://117.50.184.140/")
    //  BASE_URL :string|undefined
    // @baseUrl("http://117.50.184.140/")
    // @headers({
    //     "Content-Type": "application/x-www-form-urlencoded"
    // })
    // config


    // @myDecorator()
    // myMethod(@param() param:any) {
    //     // 方法体
    // }
}

