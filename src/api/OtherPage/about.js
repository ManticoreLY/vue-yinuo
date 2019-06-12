// import request from '../json-request'
import crud from '../crud'
import request from '../json-request'

export default {
  ...crud('api/about/about'),
  findFrontOne() {
    return request({
      url: 'api/about/about/one',
      method: 'GET'
    })
  }
}
