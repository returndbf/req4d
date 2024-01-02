const AXIOS_INSTANCE = 'axiosInstance'
const USE_AFTER_AOP = 'USE_AFTER_AOP'
const USE_BEFORE_AOP = 'USE_BEFORE_AOP'
const AFTER_AOP = 'AFTER_AOP'
const BEFORE_AOP = 'BEFORE_AOP'

const QUERY_INDEX = 'queryIndex'
const QUERY = 'query'

const BODY_INDEX = 'bodyIndex'
const BODY = 'body'

const REQ_METHOD = 'reqMethod'

enum ReqMethodEnum {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}


export {
    AXIOS_INSTANCE,
    USE_BEFORE_AOP,
    USE_AFTER_AOP,
    AFTER_AOP,
    BEFORE_AOP,
    QUERY_INDEX,
    QUERY,
    BODY_INDEX,
    BODY,
    REQ_METHOD,
    ReqMethodEnum
}

