import i18n from "@/i18n";
export  function getDateTime(){
  // 获取当前日期时间
const now = new Date();
//获取当前时间的ISO 8601格式字符串
const nowISO = now.toISOString();
 // 格式化 ISO 8601 格式字符串为指定格式
 function formatDateTime(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 获取1小时内的日期时间
const oneHourLater = formatDateTime(new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString());

// 获取3小时内的日期时间
const threeHoursLater = formatDateTime(new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString());

// 获取12小时内的日期时间
const twelveHoursLater = formatDateTime(new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString());

// 获取今天的日期时间（当天的00:00:00）
const todayStart = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).toISOString());

const todayEnd = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString());

// 获取昨天的日期时间（昨天的00:00:00）
const yesterdayStart = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0).toISOString());

const yesterdayEnd = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59).toISOString());

// 获取本周的日期时间（本周的00:00:00，周一为一周的开始）
const thisWeekStart = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay(), 0, 0, 0).toISOString());

const thisWeekEnd = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 6, 23, 59, 59).toISOString());

// 获取上周的日期时间（上周的00:00:00，周一为一周的开始）
const lastWeekStart = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 7, 0, 0, 0).toISOString());

const lastWeekEnd = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 1, 23, 59, 59).toISOString());

// 将日期时间对象存储为包含起始时间和结束时间的对象数组
const timeRanges = [
  { label:i18n.global.t("funds.oneHours"),beginTime: oneHourLater,endTime: formatDateTime(now) },
  { label:i18n.global.t("funds.threeHours"),beginTime: threeHoursLater,endTime: formatDateTime(now) },
  { label:i18n.global.t("funds.twelveHours"),beginTime: twelveHoursLater,endTime: formatDateTime(now) },
  { label:i18n.global.t("funds.today"),beginTime: todayStart, endTime: todayEnd },
  { label:i18n.global.t("funds.yesterday"),beginTime: yesterdayStart, endTime: yesterdayEnd },
  { label:i18n.global.t("funds.thisWeekend"),beginTime: thisWeekStart, endTime: formatDateTime(now) },
  { label:i18n.global.t("funds.lastWeenkend"),beginTime: lastWeekStart, endTime: lastWeekEnd },
];
return timeRanges
}