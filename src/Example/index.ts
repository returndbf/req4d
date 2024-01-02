import "reflect-metadata"

import {ReqReturnType} from "../@types/ReqType";
import {Get, Post} from "../Decorator/MethodDecorator/reqDecorator";
import {ReqAop} from "../Decorator/MethodDecorator/Aop"
// import {Params} from "../MethodDecorator/reqDecorator";
import {Data, Params} from "../Decorator/ArgumentDecorator/reqParams"
import {BaseUrl, ReqComponent} from "../Decorator/ClassDecorator";
import axios from "axios";
import fs from "fs";
import { parseDocument } from "yaml";


// const testAfter = (responseData: any) => {
//     console.log(responseData.data[0].mission_name)
// }
export interface IData<T> {
    code: number,
    msg: string,
    data: T
}

export type promiseData<D> = Promise<IData<D>> | undefined | void

// interface IReward {
//     reward: number | undefined
// }
interface IResType {
    reward: number | undefined
}


const file = fs.readFileSync("../extra.yml", "utf8");
const doc = parseDocument(file);
const remoteUrl  = doc.getIn(['reqConfig','remoteUrl']) as string;

@ReqComponent({
    baseURL: remoteUrl
})
class Clazz {
    @Get('/user/queryReward')
    async getReward(): ReqReturnType<IData<number>> {

    }
    @Get('/mission/getDayMissions')
    // @ReqAop({beforeCb: testBefore})
    async getDayMissions(@Data data?:any,@Params params?:Record<string, any>): ReqReturnType<IData<any>> {
    }
    @Post('/cityjson?ie=utf-8')
    async getIp(@Data data?:any):ReqReturnType<any>{

    }
}
const C = new Clazz()
const params = {date:'2023-12-26'}
const data = {date:'2024-01-01'}
C.getDayMissions(data,params).then((res) => {
    console.log(res);
})







