# sports

项目帮助文档

## 推荐安装工具链

VSCode、Volar、ESLint、prettier、Vue VSCode Snippets

## 自定义配置文件

参考 [Vite 配置](https://vitejs.dev/config/).

## 安装

```sh
npm install
```

### 启动开发模式

```sh
npm run dev
```

### 打包

```sh
npm run build
```

<!-- ### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
``` -->

## 目录说明(待完善)

```sh
|--public # 公共静态目录
|--src # 主目录
   |--api # 接口文件
   |--assets # 全局资源文件
      |--img # 图片
      |--styles # 样式
         |--base.css # 初始样式
         |--custom-vant.scss # vant自定义样式
         |--index.css # 应用全局样式
         |--mixin.scss # 应用全局mixin
         |--var.css # 应用全局变量
   |--components # 公共组件
   |--router # 路由
      |--hooks # 全局守卫
      |--routes # 路由页面配置
      |--index.js # 路由主文件

   |--stores # 状态管理
   |--utils # 工具类
      |--cache.js # 本地缓存
      |--config.js # 全局公共配置
      |--index.js # 工具方法集
      |--reg.js # 正则
      |--registerComponents.js # 全局组件
      |--registerDirectives.js # 全局指令
      |--request.js # 网络请求配置 axios实例
   |--views # 页面
   |--App.vue # 应用根组件
   |--main # 主入口
|--.eslinttrc.cjs # ESLint 配置文件
|--.prettierrc.json # Prettier 配置文件
|--.gitignore # git标识忽略的配置文件
|--index.html # 应用首页入口文件
|--package-lock.json # 自动生成文件 记录依赖包的精准版本号，确保在不同环境与时间点安装的依赖包的版本一致.
|--package.json # 应用依赖包管理文件
|--postcss.config.js #  PostCSS 配置文件
|--README.md # 项目说明文档
|--vite.config.js # vite配置文件
```

## 开发规范说明文档(待完善)

### 分支管理

main: 默认分支 只有大的版本变更才会同步 release 分支代码.  
release: 正式环境分支 线上最新代码.  
test: 测试环境分支.

#### 开发流程

假设一个新成员接到一个爆破 BTC 私钥的新开发任务：  
1.首先他会从 release 分支拉取最新线上代码到本地  
2.然后在 release 分支上创建一个本地分支 feature-blast-btc  
3.本地开发完成后需要把 feature-blast-btc 分支合并到 test 分支并推送到远程 test 分支并发布测试.  
4.经过反复修改测试通过后，再将本地的 feature-blast-btc 分支合并到 release 分支并推送到远程 release 分支.  
5.feature-blast-btc 分支合并到 release 分支后要立刻删除，避免本地分支膨胀杂乱无章.

### 开发规范说明

#### 大纲

1.统一使用 vue3 组合式 api 的风格开发组件  
2.统一使用 scss 开发组件样式，公共样式可以在@/assets/styles/mixin.scss 中定义，全局共享.  
3.使用Vant三方UI组件库  
4.组件、目录文件之间的相互引用路径均使用@符方便管理  
5.命名一定要语义化，使用翻译软件翻译英文命名

#### Vue 组件管理

vue 组件均使用文件夹包裹，如开发一个 Tabbar 组件，则新建文件夹名称 Tabbar，Tabbar 下新建 Tabbar.vue 文件，组件名称与组件文件夹名称要保持一致.

##### 为什么一个组件要新建一个文件夹

这是因为要实现程序的 可维护性、可组合性以及可移植性. 一个完整的组件通常要包含 html、css、js、img.    
\*.vue 单文件组件集合了 html/css/js ，但是组件自身的 img 却只能放在 assets 目录去管理，这样将同一个业务逻辑关注点的资源被拆分到不同的文件夹下管理这既违背了组件化、模块化开发的理念(高内聚低耦合)，也对组件的可维护性、可复用性以及可移植性造成了一定的成本浪费.     
当然有些组件是没有 img 的，为了保持组件风格的统一，组件都以文件夹为单位.

##### 组件命名规范

1.组件名称必须以大写字母开头并使用大驼峰命名（UpperCamelCase）  
2.对于@/views 目录下页面级组件通常可以在组件名称后加 View 稍作区分  
3.js 命名统一使用小驼峰命名（lowerCamelCase）      
4.vue路由配置中的path/name属性值均使用官方推荐的“-”连接符，由于他们都具有唯一性，所以他们的值可以设置为同一值，更简单.

##### 组件拆分与路径管理

1.组件拆分原则为拆分越细越好，上限则为单个组件代码最多不要超过 200 行代码.

2.两个大类文件夹用来存放组件，一个是@/components 文件夹，该文件夹下主要放置应用全局可复用的组件. 第二个是@/views 文件夹，该文件下存放页面级组件，在拆分页面级组件时，如果是可复用组件，则把拆分的组件放在@/components 目录方便其他页面复用，否则在当前页面级组件文件夹下新建 component 文件夹，具体参考 HomeView 页面组件.

#### CSS 规范

1.html 中的 classname 命名使用“-”连接符如：user-center, main-content,country-code-wrapper 等  
2.组件 style 标签中必须加 scoped 属性，十分重要！！！  
3.对于需要自定义第三方插件样式的需求，比如 vant.  
如下是修改 vant 组件样式方法
```sh
<style lang="scss" scoped>
:deep(){
  .van-button{
    background:pink;
  }
}
</style>
```

如果需要修改全局 vant 组件样式，则可直接在@/assets/styles/custom-vant.scss 中修改 vant 定义的 css 变量.  
[具体参考](https://vant-ui.github.io/vant/#/zh-CN/config-provider)

#### 測試權限push