import request from './json-request'

export default {
  queryPage(page) {
    return request({
      url: 'front/article/channel/page',
      method: 'POST',
      data: page
    })
  }
}
