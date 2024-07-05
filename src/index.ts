// import {ReqComponent} from "./Decorator/ClassDecorator";
//


export {Get,Post,Put,Upload} from "./Decorator/MethodDecorator/reqDecorator"
export {ReqComponent} from "./Decorator/ClassDecorator/index"
export {Query,Param,Body,File} from "./Decorator/ArgumentDecorator/reqParams"
export {resInterceptor} from './Decorator/Interceptor/resinterceptor'
export {reqInterceptor} from './Decorator/Interceptor/reqinterceptor'
export type * as ReqType from "../src/@types/ReqType.d.ts"


