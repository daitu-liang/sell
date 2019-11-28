/**
 * 解析url参数
 * ?id=123&a=b
 * @return Object {id:12334,a=b}
 */
export function urlParse () {
  const url = window.location.search
  console.log('url=' + url)
  const obj = {}
  const reg = /[?&][^?&]+=[^?&]]+/g
  const arr = url.match(reg)
  // ['?id=123454','&a=b']
  console.log('arr', arr)
  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=') // 先分割取到id=123454，之后用=号分开
      const key = decodeURIComponent(tempArr[0])
      const val = decodeURIComponent(tempArr[1])
      console.log('key', key + '=' + val)
      obj[key] = val
    })
  }
  console.log('obj', obj)
  return obj
  // return { id: 123123 }
}
