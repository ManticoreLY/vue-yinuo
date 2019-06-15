import request from './json-request'

export default {
  queryPage(page) {
    return request({
      url: 'front/channel/channel/page',
      method: 'POST',
      data: page
    })
  },
  findFrontOne(id) {
    return request({
      url: 'front/channel/channel/' + id,
      method: 'GET'
    })
  }
}
