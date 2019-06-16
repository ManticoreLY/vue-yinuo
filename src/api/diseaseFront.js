import request from './json-request'
// import crud from './crud'
// import request from './json-request'

export default {
  getFullDisease(id) {
    return request({
      url: 'front/disease/disease/fullDisease/' + id,
      method: 'GET'
    })
  }
}
