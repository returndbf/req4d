import "reflect-metadata"
import {PartialConfig} from "../@types/Config";
import {getMetaData, paramsObjToStr} from "../util";
import axios, {AxiosResponse} from "axios";
import {IData} from "../index";
import {GetConfig, LoginFnParams, ReqAop, ReqReturnType} from "../@types/ReqType";
import {AFTERAOP, BEFOREAOP, USEAFTERAOP, USEBEFOREAOP} from "../constant";


const config = (config: PartialConfig): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata('config', config, target.prototype)
    }
}
const BaseUrl = (baseUrl: string): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata('baseUrl', baseUrl, target.prototype)
    }
}

const Get = (url: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async () => {
            // 封装一下
            let beforeCb, afterCb = null
            if (getMetaData(USEBEFOREAOP, target, propertyKey)) {
                beforeCb = getMetaData(BEFOREAOP, target, propertyKey);
            }
            if (getMetaData(USEAFTERAOP, target, propertyKey)) {
                afterCb = getMetaData(AFTERAOP, target, propertyKey);
            }

            beforeCb()
            const baseUrl = getMetaData('baseUrl', target);
            const params = getMetaData('params', target);
            const response = await axios.get(baseUrl + url + params);
            afterCb()
            return response.data
        }
    }
}
const Params = (params: GetConfig['params']): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
        if (typeof params === 'object') {
            Reflect.defineMetadata('params', paramsObjToStr(params), target)
        } else {
            Reflect.defineMetadata('params', params, target)
        }
    }
}

const Login = (loginData: LoginFnParams): MethodDecorator => {
    return (target, propertyKey, descriptor) => {

    }
}
/*
    * 在网络请求前或请求后执行函数，<b style='color:red'>注意</b>：after 回调函数在装饰器内部获取到请求结果后立即执行，而不是等待原函数的Promise
    * @param aop对象 属性为两个函数
 */
const ReqAop = (aopObj: ReqAop): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
        const {afterCb, beforeCb} = aopObj
        if (beforeCb) {
            Reflect.defineMetadata(USEBEFOREAOP, true, target, propertyKey);
            Reflect.defineMetadata('beforeAop', beforeCb, target, propertyKey);
        }
        if (afterCb) {
            Reflect.defineMetadata(USEAFTERAOP, true, target, propertyKey);
            Reflect.defineMetadata('afterAop', afterCb, target, propertyKey);
        }



    }
}

const testBefore = () => {
    console.log("ReqAop testBefore")
}
const testAfter = () => {
    console.log("ReqAop testAfter")
}

@BaseUrl('http://117.50.184.140:8844')
class Clazz {
    @Get('/user/queryReward')
    async getReward(): ReqReturnType<IData<number>> {

    }

    @Params({date: '2023-08-29'})
    @Get('/mission/getDayMissions')
    @ReqAop({beforeCb: testBefore, afterCb: testAfter})
    async getDayMissions(): ReqReturnType<IData<any>> {

    }
}

new Clazz().getDayMissions().then((res) => {
    console.log(res.data);
})

