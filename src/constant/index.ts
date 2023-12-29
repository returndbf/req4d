const AXIOS_INSTANCE = 'axiosInstance'
const USE_AFTER_AOP = 'USE_AFTER_AOP'
const USE_BEFORE_AOP = 'USE_BEFORE_AOP'
const AFTER_AOP = 'AFTER_AOP'
const BEFORE_AOP = 'BEFORE_AOP'

const PARAMS_INDEX = 'paramsIndex'
const PARAMS = 'params'

const DATA_INDEX = 'dataIndex'
const DATA = 'data'

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
    PARAMS_INDEX,
    PARAMS,
    DATA_INDEX,
    DATA,
    REQ_METHOD,
    ReqMethodEnum
}

