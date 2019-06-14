import request from './json-request'

export default {
  findFrontOne(id) {
    return request({
      url: 'front/article/newsArticle/' + id,
      method: 'GET'
    })
  },
  findFrontInfo(id) {
    return request({
      url: 'front/article/newsArticle/info/' + id,
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
