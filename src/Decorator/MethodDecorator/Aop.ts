import {USEAFTERAOP, USEBEFOREAOP} from "../../constant";
import {GetConfig, LoginFnParams, ReqAopType, ReqReturnType} from "../../@types/ReqType";
/*
    * 在网络请求前或请求后执行函数，<b style='color:red'>注意</b>：after 回调函数在装饰器内部获取到请求结果后立即执行，而不是等待原函数的Promise
    * @param aop对象 属性为两个函数
 */
export const ReqAop = (aopObj: ReqAopType): MethodDecorator => {
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
