// import request from '../json-request'
import crud from '../crud'
import request from '../json-request'

export default {
  ...crud('api/drugDB/drugDb'),
  findFrontOne() {
    return request({
      url: 'api/drugDB/drugDb/one',
      method: 'GET'
    })
  }
}
