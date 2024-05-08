import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import { getUnAuditCount } from "@/api/risk/review/index"
import { getReviewOrderNumt } from "@/api/funds/review/index"
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
  'permission',
  {
    state: () => ({
      routes: [],
      addRoutes: [],
      defaultRoutes: [],
      topbarRouters: [],
      sidebarRouters: [],
      riskNoAuditNum:0,//风控提现待审核数,
      riskShelveNum:0,//风控提现审核搁置数,
      riskC2CWithdrawNum:0, //
    }),
    actions: {
      setRoutes(routes) {
        this.addRoutes = routes
        this.routes = constantRoutes.concat(routes)
      },
      setDefaultRoutes(routes) {
        this.defaultRoutes = constantRoutes.concat(routes)
      },
      setTopbarRoutes(routes) {
        this.topbarRouters = routes
      },
      setSidebarRouters(routes) {
        this.sidebarRouters = routes
      },
      generateRoutes(roles) {
        return new Promise(resolve => {
          // 向后端请求路由数据
          getRouters().then(data => {
            const sdata = JSON.parse(JSON.stringify(data))
            const rdata = JSON.parse(JSON.stringify(data))
            const defaultData = JSON.parse(JSON.stringify(data))
            const sidebarRoutes = filterAsyncRouter(sdata)
            const rewriteRoutes = filterAsyncRouter(rdata, false, true)
            const defaultRoutes = filterAsyncRouter(defaultData)
            const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
            asyncRoutes.forEach(route => { router.addRoute(route) })
            this.setRoutes(rewriteRoutes)
            this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
            this.setDefaultRoutes(sidebarRoutes)
            this.setTopbarRoutes(defaultRoutes)
            resolve(rewriteRoutes)
          })
        })
      },
      getRiskUnreview(){
        getUnAuditCount().then(res=>{
          //风控管理目录未读数（风控最外层的目录总数）
          setMetaNum(this.sidebarRouters,'/risk-control',res.riskManageTotalNum)
          //风控审核目录未读数
          setMetaNum(this.sidebarRouters,'withdraw-control',res.riskAuditTotalNum)
          //提现风控审核列表未读数（风控审核目录子菜单）
          setMetaNum(this.sidebarRouters,'risk-review',res.riskAuditTotalNum)
          //风控配置目录未读数
          setMetaNum(this.sidebarRouters,'risk-config',res.riskC2CWithdrawNum)
          //风控配置目录下C2C提款搁置设置未读数
          setMetaNum(this.sidebarRouters,'withdrawl-wait-setting',res.riskC2CWithdrawNum)
          //风控提现待审核数
          this.riskNoAuditNum = res.riskNoAuditNum
          //风控提现审核搁置数
          this.riskShelveNum = res.riskShelveNum
          //风控配置C2C提款搁置tab页数
          this.riskC2CWithdrawNum = res.riskC2CWithdrawNum
        })
      },
      getFundsUnreview(){
        getReviewOrderNumt().then(res=>{
          //设置资金管理目录的未读数(一级目录)
          setMetaNum(this.sidebarRouters,'/funds',res.totalReviewOrderNum)
          //设置资金审核目录的未读数(二级目录)
          setMetaNum(this.sidebarRouters,'funds-review',res.totalReviewOrderNum)
          //设置充值补单未审核的未读数
          setMetaNum(this.sidebarRouters,'recharge',res.dpReviewOrderNum)
          //设置财务提款未审核的未读数
          setMetaNum(this.sidebarRouters,'withdraw-review',res.wdReviewOrderNum)
          //设置资金调整未审核的未读数
          setMetaNum(this.sidebarRouters,'adjust',res.adjustmentReviewOrderNum)
        })
      }
    }
  })

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

//设置指定路径的路由meta中添加num参数
function setMetaNum(nodes, path, value) {
  for (const node of nodes) {
    if (node.path === path) {
      if (node && node.meta) {
        node.meta.num = value;
        return true;
      }
      return false;
    }
    if (node.children) {
      if (setMetaNum(node.children, path, value)) {
        return true;
      }
    }
  }
  return false;
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

export default usePermissionStore
