// import request from '../json-request'
import crud from '../crud'
import request from '../json-request'

export default {
  ...crud('api/medicine/medicines'),
  getFullOne(id) {
    return request({
      url: 'api/medicine/medicines/full/' + id,
      method: 'GET'
    })
  }
}
