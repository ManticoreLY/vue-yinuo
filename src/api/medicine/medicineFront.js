// import request from '../json-request'
import request from '../json-request'

export default {
  findFrontOne(id) {
    return request({
      url: 'front/medicine/medicines/' + id,
      method: 'GET'
    })
  },
  queryPage(page) {
    return request({
      url: 'front/medicine/medicines/page',
      method: 'POST',
      data: page
    })
  }
}
