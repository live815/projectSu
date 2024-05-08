<template>
  <div class="SoccerRule-view">
    <el-tabs
      class="demo-tabs"
      @tab-change="handleTabsChange"
    >
      <el-tab-pane v-for="(item, index) in SoccerRule()"
      :key="index" >
      <template #label>{{ item.LeftTitle }} </template>
      <div class="con" ref="scrollBox" :key="index"  >
        <div v-for="(seitem,inde) in item.RightTitle" :key="inde" > 
          <h2  :style="getTitleStyle(seitem.titleFontSize,seitem.textColor,seitem.centerTitle)">{{ seitem.rightTitle }}</h2>
          <div v-for="(thitem,ind) in seitem.Tips" :key="ind">
            <p>{{ thitem.tips }}</p>
            <table v-if="thitem.TableData">
              <thead v-if="thitem.TableData[0]?.headers">
                <tr>
                  <td v-for="header in thitem.TableData[0].headers" :key="header">{{ header }}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in thitem.TableData[0].data" :key="row.id">
                  <td v-for="(value, key) in row" :key="key">{{ value}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import {SoccerRule} from './SoccerRule.js'
console.log(SoccerRule(),'11111')
const typeNum=ref(null)
const scrollBox = ref(null)
//标题文字样式
const getTitleStyle = (fontSize, centerTitle, textColor) => {
  const style = { fontSize };
  if (centerTitle) {
    style.textAlign = 'center';
  }
  if (textColor) {
    style.color = textColor;
  }
  return style;
};
const handleTabsChange = (TabPaneName)=>{
  console.log(TabPaneName,'TabPaneName')
  typeNum.value=TabPaneName
}
onMounted(() => {
  // 在组件挂载后执行滚动操作
  // handleTabsChange();
});
watch(
  () => typeNum.value,
  (newType,oldType) => {
    // console.log(newType,oldType,scrollBox.value)
    if(oldType){
      scrollBox.value[oldType].scrollTop=0
    }
  }
)
</script>

<style lang="scss" scoped>
.SoccerRule-view{
  position: relative;
  width: 100%;
  height: 100vh;
  :deep(){
    .el-tabs{
      position: relative;
      width: 100%;
      height: 100vh;
    }
    .el-tabs__content{
      // top: 40px;
      position: relative;
      // 
      max-height: 630px;
      width: 100%;
      overflow-y: scroll;
    }
    .el-tabs__item{
      color: white;
    }
    .el-tabs--top .el-tabs__item.is-top:last-child{
      padding-left: 20px;
    }
    .el-tabs__header{
      position: relative;
      // width: 100%;
      background: #272B45;
    }
  }
}
</style>