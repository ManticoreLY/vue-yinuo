import request from './json-request'
export default {
  queryPage(page) {
    return request({
      url: 'front/search/searchWord/page',
      method: 'POST',
      data: page
    })
  }
}
