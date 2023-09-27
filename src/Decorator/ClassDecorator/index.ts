import {CreateAxiosDefaults} from "axios/index";
import axios from "axios";

export const BaseUrl = (baseUrl: string): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata('baseUrl', baseUrl, target.prototype)
    }
}
type ComponentConfig = CreateAxiosDefaults
const ReqComponent = (config?:ComponentConfig): ClassDecorator => {
    return (target)=>{
        const axiosInstance = axios.create(config)
        Reflect.defineMetadata('config', config, target.prototype)
        Reflect.defineMetadata('axiosInstance',axiosInstance,target.prototype)
    }
}