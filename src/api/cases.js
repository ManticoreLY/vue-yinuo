// import request from '../json-request'
import crud from './crud'
import request from './json-request'

export default {
  ...crud('api/article/treatmentCase'),
  findFullOne(id) {
    return request({
      url: 'api/article/treatmentCase/fullCase/' + id,
      method: 'GET'
    })
  }

}
