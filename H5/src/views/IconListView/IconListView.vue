<template>
  <NavBar title="图标列表" />
  <div class="content">
    <!-- <h3>点击图标复制代码</h3> -->
    <div class="list">
      <div v-clipboard="item.code" class="item" v-for="(item, idx) in list" :key="idx">
        <div class="icon">
          <component :is="item.component" />
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>

    <div class="tip">
      <h4>使用说明：</h4>
      <p>1.点击图标复制代码</p>
      <p>2.给图标加classname比如svg-icon</p>
      <div>
        3.给图标定义样式
        <pre>
          .svg-icon{
            fill:red; // 定义图标颜色
            width:20px; // 定义图标宽度
            height:20px; // 定义图标高度
          }
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar/NavBar'
import { ref, markRaw } from 'vue'
import vClipboard from '@/directives/clipboard'
const list = ref([])
const getAllIcons = async () => {
  const context = import.meta.glob('@/components/icons/*.vue')
  const iconsArray = await Promise.all(
    Object.entries(context).map(async ([path, loader]) => {
      const regex = /([^/]*)\.vue$/
      const name = path.match(regex)[1]
      let { default: component } = await loader()
      component = markRaw(component)
      return {
        component,
        name,
        code: `<${name}/>`
      }
    })
  )
  list.value = iconsArray
  console.log(list)
}
getAllIcons()
</script>

<style lang="scss" scoped>
.content {
  @include mobile-padding();
}
h3 {
  margin: 20px auto;
  text-align: center;
  color: var(--color-danger);
}
.list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 定义了三个等宽的列 */
  gap: 10px; /* 定义了网格行和列之间的间距 */
  .item {
    .icon {
      $size: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: $size;
      height: $size;
      margin: 0 auto;
      // border:1px solid red;
    }
    p {
      text-align: center;
      @include ellipsis();
    }
    // icon样式定义
    svg {
      $size: 20px;
      fill: var(--color-primary);
      width: $size;
      height: $size;
    }
  }
}
.tip {
  margin-top: 15px;
  line-height: 1.6;
}
</style>
