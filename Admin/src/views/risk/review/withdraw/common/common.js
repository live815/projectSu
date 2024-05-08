import i18n from "@/i18n";
export  function getDateTime(){
  // 获取当前日期时间
const now = new Date();

// 获取1小时内的日期时间
const oneHourLater = new Date(now.getTime() - 1 * 60 * 60 * 1000).toLocaleString().replaceAll(/\//ig,'-');

// 获取3小时内的日期时间
const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000).toLocaleString().replaceAll(/\//ig,'-');

// 获取12小时内的日期时间
const twelveHoursLater = new Date(now.getTime() - 12 * 60 * 60 * 1000).toLocaleString().replaceAll(/\//ig,'-');

// 获取今天的日期时间（当天的00:00:00）
const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).toLocaleString().replaceAll(/\//ig,'-');

const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toLocaleString().replaceAll(/\//ig,'-');

// 获取昨天的日期时间（昨天的00:00:00）
const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0).toLocaleString().replaceAll(/\//ig,'-');

const yesterdayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59).toLocaleString().replaceAll(/\//ig,'-');

// 获取本周的日期时间（本周的00:00:00，周一为一周的开始）
const thisWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay(), 0, 0, 0).toLocaleString().replaceAll(/\//ig,'-');

const thisWeekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 6, 23, 59, 59).toLocaleString().replaceAll(/\//ig,'-');

// 获取上周的日期时间（上周的00:00:00，周一为一周的开始）
const lastWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 7, 0, 0, 0).toLocaleString().replaceAll(/\//ig,'-');

const lastWeekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 1, 23, 59, 59).toLocaleString().replaceAll(/\//ig,'-');

// 将日期时间对象存储为包含起始时间和结束时间的对象数组
const timeRanges = [
  // { label:'1小时内',beginTime: oneHourLater,endTime: now.toLocaleString().replaceAll(/\//ig,'-') },
  // { label:'3小时内',beginTime: threeHoursLater,endTime: now.toLocaleString().replaceAll(/\//ig,'-') },
  // { label:'12小时内',beginTime: twelveHoursLater,endTime: now.toLocaleString().replaceAll(/\//ig,'-') },
  { label:i18n.global.t("risk.today"),beginTime: todayStart, endTime: todayEnd, type:'1' },
  { label:i18n.global.t("risk.yesterday"),beginTime: yesterdayStart, endTime: yesterdayEnd, type:'2' },
  { label:i18n.global.t("risk.thisWeekend"),beginTime: thisWeekStart, endTime: now.toLocaleString().replaceAll(/\//ig,'-'), type:'3' },
  { label:i18n.global.t("risk.lastWeekend"),beginTime: lastWeekStart, endTime: lastWeekEnd, type:'4' },
  { label:i18n.global.t("risk.all"),beginTime: null, endTime: null, type:'5' },
  { label:i18n.global.t("risk.lastTime"),beginTime: null, endTime: null, type:'6' },
];
return timeRanges
}