

export enum ReqType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}
export interface GetConfig {
    headers?:{
        [key: string]: string
    }
    params?:Record<string, string|number > | string
}

export type ReqReturnType<T> = Promise<T & void>

export interface LoginFnParams{
    data?:Record<string, string|number >
    params?:Record<string, string|number > | string
    authKey:string
    refreshToken?:string
}

export interface ReqAopType{
    beforeCb?:Function
    afterCb?:Function
}
