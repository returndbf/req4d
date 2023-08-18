type ContentType ='application/xml'|'application/json'|'text/plain' | 'text/html' | 'multipart/form-data' | 'application/x-www-form-urlencoded' | string
interface headers {
    [key: string]: string
    'Content-Type': ContentType
    token:string
    Authorization:string
}
type Config = {
    headers:Partial<headers>
    baseUrl:string

}

 export type PartialConfig =  Partial<Config>