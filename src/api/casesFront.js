import request from './json-request'

export default {
  findFrontOne(id) {
    return request({
      url: 'front/article/treatmentCase/' + id,
      method: 'GET'
    })
  },
  queryPage(page) {
    return request({
      url: 'front/article/treatmentCase/page',
      method: 'POST',
      data: page
    })
  }
}
