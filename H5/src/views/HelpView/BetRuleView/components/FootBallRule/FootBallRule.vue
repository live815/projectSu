<template>
  <div>
    <div class="sub-opt-contianer">
      <van-tabs v-model:active="active">
        <van-tab :title="item.LeftTitle" v-for="(item, index) in SoccerRule()" :key="index">
          <div class="current-opt">
            {{ item.LeftTitle }}
          </div>
          <div class="rule-list">
            <van-collapse v-model="activeNum">
              <van-collapse-item
                v-for="(seitem, index) in item.RightTitle"
                :key="index"
                :title="seitem.rightTitle"
                :name="index"
              >
                <div class="haode">
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
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { SoccerRule } from '@/views/HelpView/BetRuleView/components/SoccerRule.js'
const active = ref(0)
const activeNum = ref(['1'])
</script>

<style lang="scss" scoped>
.sub-opt-contianer {
  width: 345px;
  margin-top: 15px;
  border-radius: 6px;

  :deep() {
    .van-tabs--line .van-tabs__wrap {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .van-tabs__nav {
      width: 100%;
      height: 100%;
      gap: 0 !important;
      justify-content: flex-start !important;
      flex-wrap: wrap;
      background: #fff;
      padding: 15px 15px 8px 15px;
    }
    .van-tab {
      min-width: 74px;
      height: 24px;
      border-radius: 90px;
      background: #f7f7f7;
      color: #666;
      text-align: center;

      font-size: 12px;
      font-weight: 400;
      line-height: 28px;
      margin: 0 8px 8px 0;
    }
    .van-tabs__line {
      height: 0 !important;
    }
    .van-tab--active {
      border: 0.5px solid #ff5000;
      color: var(--2, #ff5000);
      background: #fff5f0;
    }
  }
}
.current-opt {
  margin: 15px 0 7px 0;
  color: #111;

  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}
.rule-list {
  .haode {
    color: #666;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    word-break: break-all;
  }
}
.text-content {
  color: #666;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  word-break: break-all;
  .title,
  h5 {
    margin: 20px 0 0 0;
    color: #111;

    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
  }
}
.text-content .title:first-child {
  margin-top: 0;
}
table {
  margin: 0 auto;
  width: 300px;
  border: 1px solid #666;
  border-collapse: collapse;
}
th,
td {
  text-align: center;
  border: 1px solid #666;
}
:deep() {
  .van-collapse-item {
    margin-bottom: 10px;
    border: none;
  }
  .van-cell {
    border-radius: 6px;
    border: none;
  }
}
</style>
