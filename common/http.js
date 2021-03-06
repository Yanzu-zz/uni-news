export default function $http(options) {
  const {
    url,
    data
  } = options

  const dataObj = {
    user_id: '5f97c53d5fb6630001df960e',
  }

  Object.assign(dataObj, data)

  return new Promise((resolve, reject) => {
    // 调用云函数方法获取数据
    uniCloud.callFunction({
      name: url,
      data: dataObj
    }).then((res) => {
      if (res.result.code === 200) {
        // 成功了就可以执行 .then()
        resolve(res.result)
      } else {
        // 否则 catch 里面见
        reject(res.result)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}
