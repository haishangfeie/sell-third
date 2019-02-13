function formatDate (date, format) {
  if (/(Y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substring(4 - RegExp.$1.length, 4)
    )
  }
  let obj = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    'S+': date.getSeconds()
  }
  for (let key in obj) {
    let reg = new RegExp(`(${key})`)
    let val = obj[key] + ''
    if (reg.test(format)) {
      format = format.replace(
        RegExp.$1,
        `${RegExp.$1.length === 1 ? val : padLeftZero(val)}`
      )
    }
  }
  return format
}
function padLeftZero (str) {
  str = str.toString()
  return ('00' + str).substring(str.length)
}
export default formatDate
