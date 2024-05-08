import { getUrlParams } from "@/utils";
import { getLocalLanguage, setLocalLanguage } from "@/utils/cache";
import { createI18n } from "vue-i18n";

// 动态设置语言
export async function setLanguageAsync(lang) {
  // 更新语言
  if (i18n.mode === "legacy") {
    i18n.global.locale = lang;
  } else {
    i18n.global.locale.value = lang;
  }
  // 更新本地存储
  setLocalLanguage(lang);
  return Promise.resolve();
}
export function updateVantLanguage(lang) {
  switch (lang) {
    case "zh-cn":
      return Locale.use("zh-CN", zhCN);
    case "vi":
      return Locale.use("vi-VN", viVN);
    case "en":
      return Locale.use("en-US", enUS);
  }
}

// 后端语言标识
export function getBackEndLanguage(lang) {
  switch (lang) {
    case "zh-cn":
      return "zh-CN";
    case "vi":
      return "vi-VI";
    case "en":
      return "en-US";
    default:
      return "en-US";
  }
}

// 计算FB语言
export function getFBLanguage(lang) {
  switch (lang) {
    case "zh-cn":
      return "CMN";
    case "vi":
      return "VIE";
    case "en":
      return "ENG";
    default:
      return "ENG";
  }
}

// 获取message
function getMessages() {
  let messages = {};
  const context = import.meta.globEager("./**/index.js");
  for (const path in context) {
    let reg = /lang\/([\w-_]+)\/index.js/;
    let result = path.match(reg);
    if (result) {
      const lang = result[1];
      messages[lang] = context[path].default;
    }
  }
  console.log(messages)
  return messages;
}
getMessages();

// 语言列表
export const langList = [
  {
    title: "简体中文",
    value: "zh-cn",
    icon: new URL("./icons/china.png", import.meta.url).href,
  },
  {
    title: "English",
    value: "en",
    icon: new URL("./icons/english.png", import.meta.url).href,
  },
  {
    title: "Việt nam",
    value: "vi",
    icon: new URL("./icons/vietnam.png", import.meta.url).href,
  },
  // {
  //   title:'ภาษาไทย',
  //   value:'th',
  // },
];

// 默认语言
export function getDefaultLanguage() {
  const { lang } = getUrlParams();
  // 从url中获取语言
  if (lang) {
    return lang;
  }
  // 获取本地语言
  const localLang = getLocalLanguage();
  if (localLang) {
    return localLang.toLowerCase();
  }
  // 临时使用中文
  return 'zh-cn'
  // 特定国家站使用特定语言
  let site = import.meta.env.VITE_SITE;
  if (site.includes("cn")) {
    // 中国站
    return "zh-cn";
  }
  if (site.includes("vietnam")) {
    // 越南站
    return "vi";
  }
  if (site.includes("thai")) {
    // 泰国站
    return "th";
  }
  if (site.includes("en")) {
    // 国际站
    return "en";
  }

  // 获取浏览器默认语言
  const browserLang = window.navigator.language.toLowerCase();
  const langObj = langList.find((item) => browserLang.includes(item.value));
  if (langObj) {
    return langObj.value;
  }
  return "en"; // 默认使用en
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLanguage(), // 设置默认语言
  fallbackLocale: "en",
  messages: getMessages(),
});

export default i18n;
