<template>
  <div class="soccer-rule">
    <el-tabs class="demo-tabs">
      <el-tab-pane v-for="(item, index) in SoccerRule()" :key="index">
        <template #label>{{ item.LeftTitle }} </template>
        <div v-if="item.RightTitle.length == 1">
          <div class="content-title">{{ item.RightTitle[0].rightTitle }}</div>
          <div class="content-text">
            <div v-for="(thitem, ind) in item.RightTitle[0].Tips" :key="ind">{{ thitem.tips }}</div>
          </div>
        </div>
        <div class="collapse-content" v-else>
          <el-collapse v-model="activeNum">
            <el-collapse-item
              v-for="(seitem, index) in item.RightTitle"
              :key="index"
              :title="seitem.rightTitle"
              :name="index"
            >
              <div class="MatchList-contentwo">
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
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { SoccerRule } from '@/views/SportsView/components/SportTop/SoccerRule.js'
const activeNum = ref(['1'])
</script>
<style lang="scss" scoped>
.soccer-rule {
  :deep() {
    .el-tabs__item {
      min-width: 70px;
      height: 24px;
      line-height: 23px;
      font-size: 12px;
      text-align: center !important;
      border: 1px solid #52556a;
      white-space: nowrap;
      margin-right: 12px;
      border-radius: 90px;
      margin-bottom: 12px;
      color: var(--60, rgba(255, 255, 255, 0.6));
    }
    .el-tabs__item:nth-child(2) {
      padding-left: 15px;
    }
    .el-tabs__item:last-child {
      padding-right: 15px;
    }
    .el-tabs__item.is-active {
      border-color: #f35f1b !important;
      color: #f35f1b;
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
    .el-tabs__active-bar {
      display: none;
    }
    // svg {
    //   display: none;
    // }
    .el-tabs__nav {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      border-radius: 6px;
      background: var(--unnamed, #1d223c);
      padding: 12px 16px 0 16px;
    }
  }
  .content-title {
    margin-bottom: 16px;
    color: var(--100, #fff);
    font-size: 16px;
    font-weight: 500;
  }
  .content-text {
    font-size: 16px;
    line-height: 26px;
    
    white-space: pre-wrap;
  }
  .collapse-content {
    .MatchList-contentwo {
      background: #272b45;
      color: var(--60, rgba(255, 255, 255, 0.6));
      line-height: 26px;
      
      div {
        white-space: pre-wrap;
        padding: 7px 14px 7px 20px;
      }
    }
  }
  .collapse-content :deep() {
    .el-collapse {
      --el-collapse-border-color: none !important;
    }
    .el-collapse-item {
      margin-bottom: 8px;
    }
    .el-collapse-item__header {
      background-color: #1d223c !important;
      color: var(--60, rgba(255, 255, 255, 0.6));
      padding: 7px 14px 7px 20px;
      border: none !important;
    }
    .el-collapse-item__content {
      padding: 0;
    }
    .el-button {
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%)) !important;
    }
  }
}
.slideActive {
  border: 1px solid #f35f1b !important;
  color: #f35f1b;
}
</style>
