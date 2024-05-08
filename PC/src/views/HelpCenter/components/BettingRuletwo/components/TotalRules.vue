<!-- 全部规则 -->
<template>
  <div class="totalRules">
    <el-tabs class="demo-tabs" type="card">
      <el-tab-pane v-for="(item, index) in SportBetRule()" :key="index">
        <template #label>{{ item.LeftTitle }} </template>
        <div class="tab-content">
          <div v-if="item.LeftTitle === $t('SoccerRule.Pcontent690')">
            <SoccerRule v-if="item.LeftTitle === $t('SoccerRule.Pcontent690')"></SoccerRule>
          </div>
          <div class="collapse-content" v-else>
            <el-collapse v-model="activeNames">
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
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { SportBetRule } from '@/views/SportsView/components/SportTop/SportBetRule.js'
import SoccerRule from './SoccerRule.vue'
const activeNames = ref(['1'])

onMounted(() => {})
</script>

<style lang="scss" scoped>
.totalRules {
  :deep() {
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none !important;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item {
      min-width: 104px;
      border-top: 1px solid #52556a;
      border-bottom: 1px solid #52556a;
      border-left: 0.5px solid #52556a !important;
      border-right: 0.5px solid #52556a !important;
      color: var(--60, rgba(255, 255, 255, 0.6));
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item:nth-child(17) {
      min-width: 200px !important;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
      border-radius: 6px 0px 0px 6px;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
      border-radius: 0px 6px 6px 0px;
    }
    .el-tabs--card > .el-tabs__header {
      border-bottom: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      border-color: #f35f1b !important;
      color: #f35f1b;
    }
  }
  .tab-content {
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
  .tab-card {
    // width: 1000px;
    border-radius: 6px;
    background: var(--unnamed, #1d223c);
    padding: 12px 16px 0 16px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    .tab-box {
      width: 70px;
      height: 24px;
      line-height: 23px;
      font-size: 12px;
      text-align: center;
      border: 1px solid #52556a;
      white-space: nowrap;
      margin-right: 12px;
      border-radius: 90px;
      margin-bottom: 12px;
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
}
.slideActive {
  border: 1px solid #f35f1b !important;
  color: #f35f1b;
}
</style>
