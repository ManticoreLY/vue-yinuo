import request from './json-request'

export default {
  findFrontOne(id) {
    return request({
      url: 'front/article/newsArticle/' + id,
      method: 'GET'
    })
  },
  findFrontInfo(id, type) {
    if (!type) { type = 0 }
    return request({
      url: 'front/article/newsArticle/info/' + id + '/' + type,
      method: 'GET'
    })
  },
  queryPage(page) {
    return request({
      url: 'front/article/newsArticle/page',
      method: 'POST',
      data: page
    })
  }
}
