import axios, {AxiosResponse} from "axios";
import {PromiseData} from "../@types/ResType";
import {IData} from "../index";
import "reflect-metadata";

export const Get = <D>(url:string) :MethodDecorator =>{
    return (target, propertyKey, descriptor:PropertyDescriptor) =>{
        const originalMethod = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            const response:AxiosResponse<D> = await axios.get(url);
            return originalMethod!.call(this, response.data, ...args);
        };
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

class Clazz {
    public static BASE_URL = "http://117.50.184.140/"
    // @Post()
    // public postFn(){
    //
    // }
}

// function myDecorator(target: any) {
//     console.log(target.staticProp); // 访问类的静态属性
// }
const Param  = ():ParameterDecorator=>{
    return (target:any)=>{

    }

}
const baseUrl = (BASE_URL:string) :PropertyDecorator =>{
    return(target, propertyKey)=>{
        Reflect.defineMetadata('BASE_URL', BASE_URL, target)
        // console.log("PropertyDecorator");
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
        console.log(Reflect.getMetadata("BASE_URL", target.prototype));
       // console.log("ClassDecorator")
    }
}

const param = ():ParameterDecorator=>{
    return (target)=>{
        console.log(Reflect.getMetadata("BASE_URL", target));
        // console.log("ParameterDecorator")
    }
}
@classD()
class MyClass {
    @baseUrl("http://117.50.184.140/")
     BASE_URL :string|undefined
    @myDecorator()
    myMethod(@param() param:any) {
        // 方法体
    }
}

