import "reflect-metadata"

import {FilesType, FileType, ReqReturnType} from "../@types/ReqType";
import {Download, Get, Post, Upload} from "../Decorator/MethodDecorator/reqDecorator";
import {Body, File, Query} from "../Decorator/ArgumentDecorator/reqParams"
import {BaseUrl, ReqComponent} from "../Decorator/ClassDecorator";
import fs, {ReadStream} from "fs";
import { parseDocument } from "yaml";
import * as path from "path";
import axios from "axios";
const FormData = require('form-data');

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
    baseURL: 'http://127.0.0.1:5173'
})
class Clazz {
    @Get('/user/queryReward')
    async getReward(): ReqReturnType<IData<number>> {

    }
    @Get('/mission/getDayMissions')
    // @ReqAop({beforeCb: testBefore})
    async getDayMissions(@Body data?:any,@Query params?:Record<string, any>): ReqReturnType<IData<any>> {
    }
    @Post('/app/post')
    async getIp(@Body data?:any):ReqReturnType<any>{

    }
    @Upload('/app/upload')
    async upload(@File files: FileType,@Body data?:any):ReqReturnType<any>{

    }
    @Download('/api/categoryDict/download')
    async download(@Body data?:any):ReqReturnType<any>{

    }
}
const C = new Clazz()
const params = {date:'2023-12-26'}
const data = {date:'2024-01-01'}
// C.getDayMissions(data,params).then((res) => {
//     console.log(res);
// })
// C.getIp(data).then(res=>{
//     console.log(res)
// })
// C.upload().then(res=>{
//     console.log(res)
// })
const filePath = path.join(__dirname, 'pic.png');
const value = fs.createReadStream(filePath)
const files = {
    key: 'file1',
    value
};

// C.upload(files,data).then(res=>{
//     console.log(res)
// })

C.download()




