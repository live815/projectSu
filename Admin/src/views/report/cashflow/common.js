//获取本月的第一天和当天的日期
export function getMonthFirstAndToday(type) {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // 格式化日期为 'yyyy-MM-dd'
  const formattedFirstDay = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfMonth.getDate().toString().padStart(2, '0')}`;
  const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

   if(type === 'first') {
    return formattedFirstDay
   }
   if(type === 'now') {
    return formattedToday
   }
  return [formattedFirstDay, formattedToday];
}