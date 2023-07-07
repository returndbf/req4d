import {Get} from "./ReqMethod";
import {IData} from "./index";

export interface attr {
    url:string
}
export class Base {
    private  config :attr

    constructor(config:attr) {
        this.config= config
    }
    set setConfig (config:attr){
        this.config = config
    }
    get getConfig(){
       return this.config
    }
}

// const base = new Base({url:"http://117.50.184.140:8844/user/queryReward"});
// console.log(base);
// console.log(base.getConfig);

class Test extends Base{
    @Get<IData<number>>("/user/queryReward")
    private getReward (data){
        return data
    }

}


const test = new Test({url:"http://117.50.184.140:8844/user/queryReward"});



