import type {CreateAxiosDefaults} from "axios/index.d.ts";
import axios from "axios";
import {EXTRA_CONFIG} from "../../constant";

export const BaseUrl = (baseUrl: string): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata('baseUrl', baseUrl, target.prototype)
    }
}
type ComponentConfig = CreateAxiosDefaults
export const ReqComponent = (config?:ComponentConfig): ClassDecorator => {
    return (target)=>{
        const axiosInstance = axios.create(config)
        Reflect.defineMetadata('config', config, target.prototype)
        Reflect.defineMetadata('axiosInstance',axiosInstance,target.prototype)
    }
}

