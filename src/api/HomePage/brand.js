// import crud from '../crud'
import request from '../json-request'

export default {
  // ...crud('api/brand/brand')
  queryPage(query) {
    return request({
      url: '/api/brand/brand/page',
      method: 'POST',
      data: query
    })
  },
  update(form) {
    return request({
      url: '/api/brand/brand',
      method: 'PUT',
      data: form
    })
  }
}
