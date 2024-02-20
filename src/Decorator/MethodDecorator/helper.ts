import {getMetaData} from "../../util";
import {PARAM_INDEX, PARAM_PROPERTY} from "../../constant";
// 获取url中params的占位符数组
const parseParam = (url:string)=>{
    const regex = /:(\w+)/g;
    const matches = [];
    let match;

    while ((match = regex.exec(url)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}
// 如果有数据，则根据args获取param的数据，然后替换url占位符数据
const replaceUrl = (url:string,params:string[],args:any[],target:any,propertyKey:any)=>{
    if(params.length){
        params.forEach(p=>{
            const param  = getMetaData(PARAM_PROPERTY+p,target,propertyKey)
            const paramIndex = getMetaData(PARAM_INDEX+p,target,propertyKey)
            url = url.replace(`:${p}`,args[paramIndex])
        })
    }
    return url
}
export {parseParam,replaceUrl}
