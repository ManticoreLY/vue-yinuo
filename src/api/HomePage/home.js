import request from '../json-request'
export default {
  banners() {
    const url = '/front/home/banners'
    return request({
      url,
      method: 'GET'
    })
  },
  diseaseColumn() {
    const url = '/front/home/diseaseColumn'
    return request({
      url,
      method: 'GET'
    })
  },
  treatmentCase() {
    const url = '/front/home/treatmentCase'
    return request({
      url,
      method: 'GET'
    })
  },
  newsReport() {
    const url = '/front/home/newsReport'
    return request({
      url,
      method: 'GET'
    })
  },
  medicalNews() {
    const url = '/front/home/medicalNews'
    return request({
      url,
      method: 'GET'
    })
  },
  brands() {
    const url = '/front/home/brands'
    return request({
      url,
      method: 'GET'
    })
  },
  friendLinks() {
    const url = '/front/home/friendLinks'
    return request({
      url,
      method: 'GET'
    })
  },
  footer() {
    const url = '/front/home/footer'
    return request({
      url,
      method: 'GET'
    })
  },
  headerScrollNews() {
    const url = '/front/home/headerScrollNews'
    return request({
      url,
      method: 'GET'
    })
  }
}
