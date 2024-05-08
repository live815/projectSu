<template>
  <div class="SportBetRule-view">
    <el-tabs :tab-position="tabPosition" class="demo-tabs" @tab-change="handleTabsChange">
      <el-tab-pane v-for="(item, index) in SportBetRule()" :key="index">
        <template #label>
          <p>{{ item.LeftTitle }}</p>
        </template>
        <div class="con">
          <div v-if="item.LeftTitle === '足球'||item.LeftTitle === 'Bóng đá'">
            <SoccerRule v-if="item.LeftTitle === '足球'||item.LeftTitle === 'Bóng đá'" />
          </div>
          <div v-for="(seitem, inde) in item.RightTitle" :key="inde" v-else>
            <h2 :style="getTitleStyle(seitem.titleFontSize, seitem.textColor, seitem.centerTitle)">
              {{ seitem.rightTitle }}
            </h2>
            <div v-for="(thitem, ind) in seitem.Tips" :key="ind">
              <p>{{ thitem.tips }}</p>
              <table v-if="thitem.TableData">
                <thead v-if="thitem.TableData[0]?.headers">
                  <tr>
                    <td v-for="header in thitem.TableData[0].headers" :key="header">
                      {{ header }}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in thitem.TableData[0].data" :key="row.id">
                    <td v-for="(value, key) in row" :key="key">{{ value }}</td>
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
import { ref } from 'vue'
import { SportBetRule } from './SportBetRule'
import SoccerRule from './SoccerRule.vue'

const tabPosition = ref('left')
// const showTab = ref(false)

//标题文字样式
const getTitleStyle = (fontSize, centerTitle, textColor) => {
  const style = { fontSize }
  if (centerTitle) {
    style.textAlign = 'center'
  }
  if (textColor) {
    style.color = textColor
  }
  return style
}

// const handleTabsChange = (TabPaneName) => {
//   console.log(TabPaneName,'111')
//   if (TabPaneName == 6) {
//     showTab.value = true
//   }
// }
</script>

<style lang="scss" scoped>
.SportBetRule-view {
  height: 95%;
  
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  :deep() {
    .el-tabs--left {
      height: 100%;
    }
    .el-tabs--left .el-tabs__header.is-left {
      height: 100%;
      overflow-y: scroll;
    }
    .el-tabs--left .el-tabs__item.is-left {
      color: var(--60, rgba(255, 255, 255, 0.6));
      overflow-y: scroll;
    }
    .el-tabs__content {
      color: var(--60, rgba(255, 255, 255, 0.6));
      overflow-y: scroll;
      height: 100%;
    }
    .el-tabs__active-bar {
      background-color: #293057;
    }
    .el-tabs__nav-wrap::after {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .el-tabs__item.is-active {
      color: #fff;
      background: #293057;
    }
    .el-tabs__nav-prev,.el-tabs__nav-next{
      display: none;
    }
    .el-tabs--left .el-tabs__nav-wrap.is-left.is-scrollable{
      padding: 0;
      height: 100vh;
      overflow-y: scroll;
    }
    .con {
      margin: 15px 15px;
      height: 100vh;
      overflow-y: scroll;
      h2,
      h3,
      p {
        margin-bottom: 10px;
      }
      h2 {
        font-size: 18px;
        color: white;
      }
      h3 {
        margin-top: 20px;
        font-size: 16px;
      }
      p {
        line-height: 20px;
        font-size: 14px;
      }
      table {
        border: 1px solid white;
        text-align: center;
        border-bottom: none;
        border-right: none;
        margin-bottom: 10px;
       
        td {
          border: 1px solid white;
          padding: 10px 20px;
          border-left: none;
          border-top: none;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
