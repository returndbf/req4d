import axios from "axios";
import {Get} from "./ReqMethod";


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

class Clazz<D> {
    @Get('http://117.50.184.140:8844/user/queryReward')
    fn(data?: promiseData<D>): promiseData<D> {
        return data;
    }
}


const clazz = new Clazz<IResType>()
// clazz.fn().then(res => {
//      console.log(res);
//  })
// @ts-ignore
// console.log(clazz.fn());
clazz.fn().then(res => {
    console.log(res.data.reward);
})