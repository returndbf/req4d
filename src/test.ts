import {paramsObjToStr} from "./util";

test('',()=>{
    expect(paramsObjToStr({a:1})).toEqual<string>('?a=1')
})