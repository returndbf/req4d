import "reflect-metadata"
import {IData} from "../../index";
import {  ReqReturnType} from "../../@types/ReqType";
import {Get} from "../MethodDecorator/reqDecorator";
import {ReqAop} from "../MethodDecorator/Aop"
import {Params} from "../MethodDecorator/reqDecorator";
import {BaseUrl} from "../ClassDecorator";



const testBefore = () => {
    console.log("ReqAop testBefore")
}
const testAfter = (responseData: any) => {
    console.log(responseData.data[0].mission_name)
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

