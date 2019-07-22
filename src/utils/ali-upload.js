var { randomUUID } = require('./random')
// 初始化Client
// var co = require('co')
var OSS = require('ali-oss')
// var fs = require('fs')
var client = new OSS({
  region: 'oss-ap-southeast-1',
  bucket: 'yinuo-website',
  accessKeyId: 'LTAI5ESIUtw1hgNx',
  accessKeySecret: 'f3xPJBGcEYxEzzB0uoPtE3OhZPK1FZ'
})

var ali_oss = {
  endPoint: 'http://oss-ap-southeast-1.aliyuncs.com/',
  dir: '/'
}

export async function uploadFile(file, success, fail) {
  try {
    var key = ali_oss.dir + randomUUID()
    const result = await client.put(key, file)
    // console.log(result)
    if (result.res.statusCode === 200) {
      success(result)
    } else {
      fail('上传失败')
    }
  } catch (e) {
    console.log(e)
    fail(e)
  }
}
