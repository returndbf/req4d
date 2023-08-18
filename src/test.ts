import {baseUrl, Get} from "./ReqMethod";
import {IData} from "./index";
import axios from "axios";

// export interface attr {
//     url:string
// }
// export class Base {
//     private  config :attr
//
//     constructor(config:attr) {
//         this.config= config
//     }
//     set setConfig (config:attr){
//         this.config = config
//     }
//     get getConfig(){
//        return this.config
//     }
// }

// const base = new Base({url:"http://117.50.184.140:8844/user/queryReward"});
// console.log(base);
// console.log(base.getConfig);

// class Test extends Base{
//     @Get<IData<number>>("/user/queryReward")
//     private getReward (data){
//         return data
//     }
//
// }
//
//
// const test = new Test({url:"http://117.50.184.140:8844/user/queryReward"});
interface Data {
    code: number;
    msg: string;
    data: any;
}

class Test{
    @baseUrl("http://117.50.184.140:8844")
    config
    @Get("/user/queryReward")
    async getReward (data:IData<number>) {
        return data
    }

}

const test = new Test();
test.getReward().then(res=>{
    console.log(res)
})






