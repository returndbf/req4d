import axios, {AxiosResponse} from "axios";
import {PromiseData} from "../@types/ResType";
import {IData} from "../index";

export const Get = <D>(url:string) :MethodDecorator =>{
    return (target, propertyKey, descriptor:PropertyDescriptor) =>{
        const originalMethod = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            const response:AxiosResponse<D> = await axios.get(url);
            return originalMethod!.call(this, response.data, ...args);
        };
    }
}

