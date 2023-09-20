export const BaseUrl = (baseUrl: string): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata('baseUrl', baseUrl, target.prototype)
    }
}
const ReqComponent = (baseUrl:string,timeout=5000): ClassDecorator => {
    return (target)=>{

    }
}