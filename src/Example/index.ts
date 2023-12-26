import "reflect-metadata"
import {IData} from "../index";
import {ReqReturnType} from "../@types/ReqType";
import {Get} from "../Decorator/MethodDecorator/reqDecorator";
import {ReqAop} from "../Decorator/MethodDecorator/Aop"
// import {Params} from "../MethodDecorator/reqDecorator";
import {Params} from "../Decorator/ArgumentDecorator/reqParams"
import {BaseUrl, ReqComponent} from "../Decorator/ClassDecorator";
import axios from "axios";
import fs from "fs";
import { parseDocument } from "yaml";

// const testAfter = (responseData: any) => {
//     console.log(responseData.data[0].mission_name)
// }

const file = fs.readFileSync("../extra.yml", "utf8");

const doc = parseDocument(file);
const remoteUrl  = doc.getIn(['reqConfig','remoteUrl']) as string;
// @BaseUrl('http://117.50.184.140:8844')
@ReqComponent({
    baseURL: remoteUrl
})
class Clazz {
    @Get('/user/queryReward')
    async getReward(): ReqReturnType<IData<number>> {

    }

    @Get('/mission/getDayMissions')
    // @ReqAop({beforeCb: testBefore})
    async getDayMissions(@Params params:any): ReqReturnType<IData<any>> {

    }

}
const C = new Clazz()
C.getDayMissions({date:'2023-12-26'}).then((res) => {
    console.log(res);
})






