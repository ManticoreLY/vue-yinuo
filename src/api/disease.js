// import request from '../json-request'
import crud from './crud'
import request from './json-request'

export default {
  ...crud('api/disease/disease'),
  getFullDisease(id) {
    return request({
      url: 'api/disease/disease/fullDisease/' + id,
      method: 'GET'
    })
  },
  saveFullDisease(disease) {
    return request({
      url: 'api/disease/disease/fullDisease',
      method: 'POST',
      data: disease
    })
  }
}
