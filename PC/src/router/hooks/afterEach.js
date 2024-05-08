import NProgress from "nprogress";
export default async (to) => {
  sendToAnalytics(to.fullPath)
  NProgress.done();
}

// 统计页面访问信息
const sendToAnalytics = (fullPath) => {
}
