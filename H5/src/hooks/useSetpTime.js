import dayjs from 'dayjs'

export function useSetpTime(time,waitPaymentTime,currentTime) {
  // 传入订单的时间转换为时间戳
  const timeStamp = dayjs(time).valueOf()
  // 延后15分钟将时间转换为时间戳
  const extendedTimeStamp = timeStamp + waitPaymentTime * 1000
  // 将当前时间转换为时间戳
  const currentTimeStamp = dayjs(currentTime).valueOf()
  // 判断当前时间是否超过订单延长的十五分钟
  if(currentTimeStamp>extendedTimeStamp) {
     return 0
  }else {
      // 剩余的时间
      const timeRemaining = extendedTimeStamp-currentTimeStamp
      const seconds = Math.floor(timeRemaining / 1000);
      return seconds
  }
}
