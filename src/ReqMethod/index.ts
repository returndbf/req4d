import axios, {AxiosResponse} from "axios";
import {PromiseData} from "../@types/ResType";
import {IData} from "../index";
import "reflect-metadata";
import { PartialConfig} from "../@types/Config";
import {GetConfig} from "../@types/ReqType";

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
         descriptor.value = async (config?:GetConfig):Promise<IData<number>> => {
            const response:AxiosResponse<IData<number>,any>= await axios.get(getMetaData('BASE_URL',target)+url);
            // return originalMethod(response.data)
             return response.data
        }
    }
}

export const Post = (url:string,params:Record<string, any>,body:Record<any, any> | any) :MethodDecorator=>{
    return (target:any, propertyKey, descriptor:PropertyDescriptor) =>{
        // const originalMethod = descriptor.value;
        // descriptor.value = async (...args: any[]) => {
        //     const response:AxiosResponse = await axios.post(url,body,{params,headers});
        //     return originalMethod!.call(this, response.data, ...args);
        // };
    }
}
export const returnData =():ParameterDecorator=>{
    return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) =>{

    }
}
export const afterRun =  (cb:()=>void):(target: any, propertyKey:any, descriptor: PropertyDescriptor) => void=>{
    return (target:any, propertyKey, descriptor:PropertyDescriptor)=>{
        // Reflect.set
        // const originalMethod = descriptor.value;
        //  descriptor.value().then(()=>{
        //      cb()
        //  })

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

const f = ()=>{
    function ReturnNumber(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => {data:string}>) {
        const originalMethod = descriptor.value;
        descriptor.value = function() {
            const result = originalMethod!.apply(this);
            // 在这里使用类型断言来修改返回类型
            return result as {data:string};
        }
    }
    return ReturnNumber
}


class Example {
    @f()
    getValue() {
        return {data:"1"};
    }
}

const example = new Example();
console.log(example.getValue()); // 输出: 10