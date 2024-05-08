<!-- 体育赛果 -->
<template>
  <div class="sportOutcome">
    <p>{{$t('HelpCenter.SportsResults')}}</p>
    <div class="rule-box">
      <div
        class="box-btn"
        :class="{ active: item.id == current }"
        v-for="item in tabList"
        :key="item.id"
        @click="handleClick(item.id)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="content-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-select
            v-model="formInline.region"
            :placeholder="$t('HelpCenter.SelectSportsType')"
            clearable
            style="width: 230px"
          >
            <el-option :label="$t('HelpCenter.Soccer')" value="zuqiu" />
            <el-option :label="$t('HelpCenter.Basketball')" value="lanqiu" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select
            v-model="formInline.region"
            :placeholder="$t('HelpCenter.SelectLeague')"
            clearable
            style="width: 230px"
          >
            <el-option :label="$t('HelpCenter.u19')" value="zuqiu" />
            <el-option :label="$t('HelpCenter.China2023')" value="lanqiu" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="To"
            :start-placeholder="$t('HelpCenter.StartingTime')"
            :end-placeholder="$t('HelpCenter.EndTime')"
            size="default"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{$t('HelpCenter.Refresh')}}</el-button>
        </el-form-item>
      </el-form>
      <div class="MatchList-wrap" v-if="objList.length !== 0">
        <div class="MatchList-content">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item
              :title="item.name"
              :name="item.id"
              v-for="item in objList"
              :key="item.id"
            >
              <template #title>
                <div class="MatchList-title">
                  <div class="MatchList-name">{{ item.name }}</div>
                  <div class="MatchList-event">
                    <div>{{$t('HelpCenter.TopHalf')}}</div>
                    <div>{{$t('HelpCenter.LowerHalf')}}</div>
                    <div>{{$t('HelpCenter.WholeAudience')}}</div>
                  </div>
                </div>
              </template>
              <div class="MatchList-contentwo">
                <el-collapse v-model="activeNamestwo" @change="handleChangetwo">
                  <el-collapse-item
                    :title="item.name"
                    :name="item.id"
                    v-for="item in objListwo"
                    :key="item.id"
                  >
                    <template #title>
                      <div class="MatchList-title">
                        <div class="MatchList-name second-name">
                          <div class="time-box">{{ item.time }}</div>
                          <div class="team-box">
                            <div>{{ item.teamone }}</div>
                            <div class="img-box"><img :src="item.imgone" /></div>
                          </div>
                          <div style="font-size: 12px">vs</div>
                          <div class="team-box">
                            <div class="img-box"><img :src="item.imgtwo" /></div>
                            <div>{{ item.teamtwo }}</div>
                          </div>
                        </div>
                        <div class="MatchList-event">
                          <div>1-2</div>
                          <div>1-1</div>
                          <div>2-3</div>
                        </div>
                      </div>
                    </template>
                    <div>111111</div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div v-else class="nodata">
        <img :src="noData" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import '@/assets/styles/fromUi.scss'
import { reactive } from 'vue'
import noData from './img/nodata.png'
const value1 = ref('')
const current = ref('1')
const tabList = ref([
  { label:i18n.global.t('HelpCenter.Csports'), id: '1' },
  { label:i18n.global.t('HelpCenter.FBSports'), id: '2' },
  { label: i18n.global.t('HelpCenter.PMSports'), id: '3' }
])
const formInline = reactive({
  user: '',
  region: '',
  date: ''
})
const objList = ref([
  {
    name: i18n.global.t('HelpCenter.ScottishPremierLeague'),
    id: '1'
  },
  {
    name:i18n.global.t('HelpCenter.ScottishPremierLeague1'),
    id: '2'
  },
  {
    name: i18n.global.t('HelpCenter.ScottishPremierLeague2'),
    id: '3'
  }
])
const objListwo = ref([
  {
    time: '07-30 22:00',
    teamone: i18n.global.t('HelpCenter.objListwoteamone_1'),
    imgone: new URL('./img/Ellipse96.png', import.meta.url).href,
    imgtwo: new URL('./img/Ellipse972.png', import.meta.url).href,
    teamtwo: i18n.global.t('HelpCenter.objListwoteamone_2'),
    id: '1.1'
  },
  {
    time: '07-30 22:00',
    teamone: i18n.global.t('HelpCenter.objListwoteamone_1'),
    teamtwo: i18n.global.t('HelpCenter.objListwoteamone_2'),
    imgone: new URL('./img/Ellipse96.png', import.meta.url).href,
    imgtwo: new URL('./img/Ellipse972.png', import.meta.url).href,
    id: '2.1'
  },
  {
    time: '07-30 22:00',
    teamone: i18n.global.t('HelpCenter.objListwoteamone_1'),
    teamtwo: i18n.global.t('HelpCenter.objListwoteamone_2'),
    imgone: new URL('./img/Ellipse96.png', import.meta.url).href,
    imgtwo: new URL('./img/Ellipse972.png', import.meta.url).href,
    id: '3.1'
  },
  {
    time: '07-30 22:00',
    teamone: i18n.global.t('HelpCenter.objListwoteamone_1'),
    teamtwo: i18n.global.t('HelpCenter.objListwoteamone_2'),
    imgone: new URL('./img/Ellipse96.png', import.meta.url).href,
    imgtwo: new URL('./img/Ellipse972.png', import.meta.url).href,
    id: '3.1'
  }
])
const activeNames = ref(['1'])
const activeNamestwo = ref([''])
function handleClick(id) {
  current.value = id
}
function onSubmit() {}
function handleChange(val) {
  console.log(val, '000')
}
function handleChangetwo(val) {
  console.log(val, '111')
}
</script>

<style lang="scss" scoped>
.sportOutcome {
  color: var(--60, rgba(255, 255, 255, 0.6));
  height: 100%;
  p {
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    line-height: normal;
    font-style: normal;
  }
  .rule-box {
    display: flex;
    margin: 30px 0 30px 0;
    .box-btn {
      width: 88px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #52556a;
      border-radius: 6px;
      text-align: center;
      margin-right: 20px;
    }
  }
  .content-box {
    height: 100%;
    .MatchList-wrap {
      .MatchList-content {
        font-size: 14px;
        .MatchList-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .MatchList-name {
            color: #ffffff;
          }
          .second-name {
            display: flex;
            align-items: center;
            color: var(--60, rgba(255, 255, 255, 0.6));
            .time-box {
              margin-right: 32px;
            }
            .team-box {
              display: flex;
              align-items: center;
              .img-box {
                display: flex;
                align-items: center;
                margin: 0 5px 0 12px;
                img {
                  width: 17px;
                  height: 17px;
                }
              }
            }
          }
          .MatchList-event {
            display: flex;
            div {
              margin-right: 42px;
            }
          }
        }

        .MatchList-contentwo:deep() {
          .el-collapse-item__header {
            border: none !important;
            background: none !important;
          }
          .el-collapse-item__content {
            background: #171a2f;
          }
        }
      }
      .MatchList-content:deep() {
        .el-collapse-item__header {
          border: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1)) !important;
          background: #171a2f;
          color: var(--60, rgba(255, 255, 255, 0.6));
          padding: 7px 14px 7px 20px;
        }
        .el-collapse-item__wrap {
          background: none;
        }
        .el-collapse-item__content {
          padding-bottom: 0 !important;
        }
        .el-collapse {
          --el-collapse-border-color: none !important;
        }
      }
    }
  }
}
.sportOutcome :deep() {
  .el-input__wrapper {
    background-color: #272b45;
  }
  .el-button {
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%)) !important;
  }
}
.active {
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%)) !important;
  color: var(--100, #fff) !important;
  border: none;
}
.nodata {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
