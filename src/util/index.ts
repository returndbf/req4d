import {GetConfig} from "../@types/ReqType";

export const getMetaData = (key:string,target:Object,propertyKey?:string|symbol)=>{
    if(propertyKey){
        return Reflect.getMetadata(key, target,propertyKey)
    }else{
        return Reflect.getMetadata(key, target)
    }
}
export const paramsObjToStr = (params:GetConfig['params'])=>{
    let paramsStr = '?'
    const paramsArr = Object.entries(params!)
    const len = paramsArr.length
    for (const [index, [k,v]] of Object.entries(paramsArr)) {
        if(len - 1 === Number(index)){
            paramsStr += `${k}=${v}`
        }else{
            paramsStr += `${k}=${v}&`
        }
    }
    return paramsStr
}

const runMainFnWith = ()=>{

}
