import axios from "axios";
import useFBStore from "@/store/modules/fb";
import { ElMessage } from "element-plus";
import { useFBCurrency } from '@/hooks/useCurrency'
import i18n from "@/i18n";

const service = axios.create({
  baseURL: import.meta.env.VITE_FB_SPORT_DEFAULT_API,
  headers: {
    "Content-Type": "application/json",
  },
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const fbStore = useFBStore();
    config.data = {
      ...config.data,
      oddsChange: fbStore.settings.oddsChange,
      currencyId: useFBCurrency(),
      languageType: fbStore.languageType,
    };
    return config;
  },
  (error) => {
    // Toast(error.message)
    return Promise.reject(error.message);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    let { data, config } = response;
    const { code, message } = data;
    let reqData = JSON.parse(config.data);
    // 登录状态已失效
    if (code === 14010) {
      ElMessage(i18n.global.t("common.tip8"));
    } else if (code !== 0) {
      // console.log(response)
      if (reqData && !reqData.noNeedResponseMsg) {
        // showToast(message)
        // console.log(message)
        ElMessage(message);
      }
    }
    return (data && data.data) || {};
  },
  (error) => {
    // showToast(error.message)
    return Promise.reject(error.message);
  }
);
export default service;
