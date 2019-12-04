/* service 接口服务 */

import Axios from "axios"
import KOCReturn from '../utils/koc-common-return'
import UtilsCommon from '../utils/common'
import Stort from '../store/user'
import StoreConst from '../store/const'

const ConfigCommon = process.env.ConfigCommon

const APIService = {
  Instance: null,
  Request: (method, url, data, config) => {
    return KOCReturn.Promise(() => {
      switch (method) {
        case 'get': return APIService.Instance.get(url, config || data)
        case 'post': return APIService.Instance.post(url, data, config)
        default:
          return KOCReturn.Value({
            hasError: true,
            message: 'method error'
          })
      }
    })
  },
  RequestGet: (url, config) => {
    return APIService.Request('get', url, null, config)
  },
  RequestPost: (url, config) => {
    return APIService.Request('post', url, data, config)
  },
}

APIService.Instance = Axios.create({
  baseURL: ConfigCommon.APIRoot,
  timeout: 30000
})
// https request 拦截
APIService.Instance.interceptors.request.use(
  config => {
    Store.commit(StoreConst.Common.Mutation.LoadingAPI)
    const jsonWebToken = UtilsCommon.Cookie.jsonWebToken.Get()
    if (jsonWebToken) {
      config.headers.Authorization = `jwt ${jsonWebToken}`
    }
    return config
  },
  err => {
    Store.dispatch(StoreConst.Common.Action.LoadingAPI_End)
    return Promise.reject(err)
  }
)

APIService.Instance.interceptors.response.use(
  async response => {
    Store.dispatch(StoreConst.Common.Action.LoadingAPI_End)
    if (response.status !== 200 )
    return Promise.reject(new Error('status:' + response.status + ',statusText:' + response.statusText))

  }
)


