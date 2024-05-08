import router from "./router";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { isHttp } from "@/utils/validate";
import { isRelogin } from "@/utils/request";
import useUserStore from "@/store/modules/user";
import useSettingsStore from "@/store/modules/settings";
import usePermissionStore from "@/store/modules/permission";
import { checkPermi } from "@/utils/permission"

NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/register"];

router.beforeEach(async (to, from) => {
  NProgress.start();
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title);
    /* has token*/
    if (to.path === "/login") {
      NProgress.done();
      return { path: "/" };
    } else {
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true;
        // 判断当前用户是否已拉取完user_info信息
        try {
          await useUserStore().getInfo();
          isRelogin.show = false;
          const accessRoutes = await usePermissionStore().generateRoutes();
          // 根据roles权限生成可访问的路由表
          accessRoutes.forEach((route) => {
            if (!isHttp(route.path)) {
              router.addRoute(route); // 动态添加可访问路由表
            }
          });
          checkPermi(['risk:withdrawlOrder:auditCount']) && await usePermissionStore().getRiskUnreview();
          checkPermi(['fund:reviewOrderNumMessage:query']) && await usePermissionStore().getFundsUnreview();
          return { ...to, replace: true }; // hack方法 确保addRoutes已完成
        } catch (err) {
          await useUserStore().logOut();
          ElMessage.error(err);
          return { path: "/" };
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
    } else {
      NProgress.done();
      return `/login?redirect=${to.fullPath}`; // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
