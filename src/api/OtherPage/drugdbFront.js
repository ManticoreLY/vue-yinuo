// import request from '../json-request'
import request from '../json-request'

export default {
  findFrontOne() {
    return request({
      url: 'front/drugDB/drugDb',
      method: 'GET'
    })
  }
}
