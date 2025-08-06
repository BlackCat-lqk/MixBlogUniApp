// 日期格式化
export function _formatTime(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return {
    date: `${year}-${month}-${day}`,
    time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
  }
}
