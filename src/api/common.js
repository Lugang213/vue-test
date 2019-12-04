/* 通用接口 */

import APIService from "./service"

export default {
  State: {
    Token: () => {
      return APIService.RequestPost('/state/token', null, {timeout: 5000})
    },
    Data: () => {
      return APIService.RequestPost('/state/data', null, {timeout: 5000})
    }
  },
  AuthPhone: {
    Get: (data) => {
      data = Object.assign({
        Phone: null
      }, data)
      return APIService.RequestPost('/common/authphone/get', data)
    }
  }
}
