/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-23 16:42:08
 * @LastEditors: Please set LastEditors
 */
import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import user from './user'
import table from './table'
import article from './article'

const mocks = [  // Mock需要返回的数据 数组
  ...user,
  ...table,
  ...article
]

// 
// 这将导致您的许多第三方库失效(如进度事件)。
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300

  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) { // 如果自定义的xhr为真
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// 模拟服务器
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
