<template>
  <div class="dialog">
    <el-dialog
      :title="i18n.global.t('GeneralUserCenter.VIPDetails')"
      v-model="open"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <div class="dialog-content-item">
          <div class="dialog-content-item-top">
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
            <div class="title">{{ $t('GeneralUserCenter.VIPlevelConditions') }}</div>
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
          </div>
          <div class="dialog-content-item-min">
            <table>
              <tbody>
                <tr v-for="(item, index) in header" :key="index">
                  <th style="width: 120px;">{{ item }}</th>
                  <td
                    v-for="(row, rowIndex) in memberLevelList"
                    :key="rowIndex"
                    :class="{ highlight: rowIndex == props.activeIndex }"
                  >
                    <span v-if="index == 0">VIP{{ row[index] }}</span>
                    <span v-if="index == 1"> {{ row[index] ? row[index] : '-' }}</span>
                    <span v-if="index == 2"> {{ row[index] ? row[index] : '-' }}</span>
                    <span v-if="index == 3"> {{ row[index] ? row[index] : '-' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- <div class="dialog-content-item">
          <div class="dialog-content-item-top">
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
            <div class="title">{{ $t('GeneralUserCenter.WeeklyGiftMoney') }}</div>
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
          </div>
          <div class="dialog-content-item-min">
            <table>
              <tbody>
                <tr v-for="(item, index) in weeklyGift" :key="index">
                  <th>{{ item }}</th>
                  <td
                    v-for="(row, rowIndex) in memberWeekBetList"
                    :key="rowIndex"
                    :class="{ highlight: rowIndex == props.activeIndex }"
                  >
                    <span v-if="index == 0">VIP</span>
                    {{ row[index] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->
        <!-- <div class="dialog-content-item">
          <div class="dialog-content-item-top">
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
            <div class="title">{{ $t('GeneralUserCenter.MonthlyGiftMoney') }}</div>
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
          </div>
          <div class="dialog-content-item-min">
            <table>
              <tbody>
                <tr v-for="(item, index) in lunarGift" :key="index">
                  <th>{{ item }}</th>
                  <td
                    v-for="(row, rowIndex) in memberMonthBetList"
                    :key="rowIndex"
                    :class="{ highlight: rowIndex == props.activeIndex }"
                  >
                    <span v-if="index == 0">VIP</span>
                    {{ row[index] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->
        <!-- <div class="dialog-content-item">
          <div class="dialog-content-item-top">
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
            <div class="title">{{ $t('GeneralUserCenter.VIPrebateRatio') }}</div>
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
          </div>
          <div class="dialog-content-item-min">
            <table>
              <tbody>
                <tr v-for="(item, index) in backwater" :key="index">
                  <th>{{ item }}</th>
                  <td
                    v-for="(row, rowIndex) in memberRebateList"
                    :key="rowIndex"
                    :class="{ highlight: rowIndex == props.activeIndex }"
                  >
                    <span v-if="index == 0">VIP</span>
                    {{ row[index] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->
        <div class="dialog-content-item">
          <div class="dialog-content-item-top">
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
            <div class="title">{{ $t('GeneralUserCenter.VipRights') }}</div>
            <div>
              <IconPrivileges></IconPrivileges>
            </div>
          </div>
          <div class="dialog-content-item-min">
            <table>
              <tbody>
                <tr v-for="(item, index) in rightList" :key="index">
                  <th style="width: 120px;">{{ item }}</th>
                  <td
                    v-for="(row, rowIndex) in memberRightList"
                    :key="rowIndex"
                    :class="{ highlight: rowIndex == props.activeIndex }"
                  >
                    <span v-if="index == 0">VIP{{ row[index] }}</span>
                    <span v-if="index == 1"> {{ row[index] ? row[index] : '-' }}</span>
                    <span v-if="index == 2"> {{ row[index] ? row[index] : '-' }}</span>
                    <span v-if="index == 3"> {{ row[index] ? row[index] : '-' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- <div class="dialog-text">
        {{ $t('GeneralUserCenter.Notice_15')
        }}<span @click="openCustomerServicePop">{{ $t('GeneralUserCenter.OnlineService') }}</span
        >{{ $t('GeneralUserCenter.Consult') }}。
      </div> -->
      <div class="dialog-footer">
        <div class="dialog-footer-top">
          <div>
            <IconPrivileges></IconPrivileges>
          </div>
          <div class="title">{{ $t('GeneralUserCenter.VIPRule') }}</div>
          <div>
            <IconPrivileges></IconPrivileges>
          </div>
        </div>
        <div class="dialog-footer-text">
          <p>{{ $t('GeneralUserCenter.PromotionConditions') }}</p>
          <p>
            {{ $t('GeneralUserCenter.VIPtips_1') }}
          </p>
          <p>{{ $t('GeneralUserCenter.PromotionOrder') }}</p>
          <p>{{ $t('GeneralUserCenter.VIPtips_2') }}</p>
          <p>{{ $t('GeneralUserCenter.RelegationRequirements') }}</p>
          <p>
            {{ $t('GeneralUserCenter.VIPtips_3') }}
          </p>
          <p>{{ $t('GeneralUserCenter.DowngradeCriteria') }}</p>
          <p>
            {{ $t('GeneralUserCenter.VIPtips_4') }}
          </p>
          <p>{{ $t('GeneralUserCenter.WeeklyGifts') }}</p>
          <p>
            {{ $t('GeneralUserCenter.VIPtips_5') }}
          </p>
          <p>{{ $t('GeneralUserCenter.UpgradeGift') }}</p>
          <p>
            {{ $t('GeneralUserCenter.VIPtips_6') }}
          </p>
          <p>{{ $t('GeneralUserCenter.BirthdayGift') }}</p>
          <p>
            {{ $t('GeneralUserCenter.VIPtips_7') }}
          </p>
          <!-- <p>{{ $t('GeneralUserCenter.RebateInstructions') }}</p>
          <p>
            {{ $t('GeneralUserCenter.VIPtips_8') }}
          </p> -->
          <p>{{ $t('GeneralUserCenter.ValidBetDefinition') }}</p>
          <p>
            {{ $t('GeneralUserCenter.VIPtips_9') }}
          </p>
          <p>
            {{ $t('GeneralUserCenter.VIPtips_10') }}
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import IconPrivileges from '@/components/icons/IconPrivileges.vue'
import { getQueryMemberVipDetail } from '@/api/vip'

const emit = defineEmits(['submitBtn'])
import { onMounted } from 'vue'

const props = defineProps({
  activeIndex: {
    type: Number,
    default: null
  }
})

const open = ref(true)
const handleClose = () => {
  emit('submitBtn', false)
}
const header = ref([
  i18n.global.t('GeneralUserCenter.VIPlevel'),
  i18n.global.t('GeneralUserCenter.AccumulatedDeposits'),
  i18n.global.t('GeneralUserCenter.EffectiveFlow'),
  i18n.global.t('GeneralUserCenter.RelegationTurnover')
])
// vip等级条件
const memberLevelList = ref([])
// const weeklyGift = ref([
//   i18n.global.t('GeneralUserCenter.VIPlevel'),
//   i18n.global.t('GeneralUserCenter.WeeklyGiftMoney'),
//   i18n.global.t('GeneralUserCenter.DepositConditions'),
//   i18n.global.t('GeneralUserCenter.FlowConditions')
// ])
// 周礼金
// const memberWeekBetList = ref([])

// const lunarGift = ref([
//   i18n.global.t('GeneralUserCenter.VIPlevel'),
//   i18n.global.t('GeneralUserCenter.MonthlyGiftMoney'),
//   i18n.global.t('GeneralUserCenter.DepositConditions'),
//   i18n.global.t('GeneralUserCenter.FlowConditions')
// ])
// 月礼金
// const memberMonthBetList = ref([])

// const backwater = ref([
//   i18n.global.t('GeneralUserCenter.VIPlevel'),
//   i18n.global.t('GeneralUserCenter.Sport'),
//   i18n.global.t('GeneralUserCenter.Live'),
//   i18n.global.t('GeneralUserCenter.Electronic'),
//   i18n.global.t('GeneralUserCenter.Gaming'),
//   i18n.global.t('GeneralUserCenter.Poker'),
//   i18n.global.t('GeneralUserCenter.Lottery')
// ])

// vip返水比例
// const memberRebateList = ref([])

const rightList = ref([
  i18n.global.t('GeneralUserCenter.VIPlevel'),
  i18n.global.t('GeneralUserCenter.UpgradeGifttwo'),
  i18n.global.t('GeneralUserCenter.BirthdayGiftwo'),
  i18n.global.t('GeneralUserCenter.relegationBonus')
])
const memberRightList = ref([])
onMounted(() => {
  getList()
})
const getList = () => {
  getQueryMemberVipDetail().then((res) => {
    memberLevelList.value = fun(res.data.memberLevelList)
    // memberWeekBetList.value = fun(res.data.memberWeekBetList)
    // memberMonthBetList.value = fun(res.data.memberMonthBetList)
    // memberRebateList.value = fun(res.data.memberRebateList)
    memberRightList.value = fun(res.data.memberRightList)
  })
}
// 转置data数组
const fun = (data) => {
  data.forEach((vipObject) => {
    delete vipObject.vipName
  })
  return data.map((obj) => Object.values(obj))
}
</script>
<style lang='scss' scoped>
:deep() {
  .el-dialog {
    width:1096px ;
    border-radius: 2px;
    background: #272b45;
    box-shadow: 0px 14px 28px 0px rgba(0, 0, 0, 0.4);
    .el-dialog__header {
      opacity: 0.5;
      background: #3f4671;
      width: 100%;
      .el-dialog__title {
        color: #fff;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
      }
    }
    .dialog-content {
      .dialog-content-item {
        .dialog-content-item-top {
          display: flex;
          align-items: center;
          justify-content: center;

          .title {
            color: var(--100, #fff);
            font-size: 16px;
            font-weight: 500;
            margin: 0 25px;
          }
        }
        .dialog-content-item-min {
          margin: 20px 0 30px 0;
          table {
            border-collapse: collapse;

          }
          th {
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-bottom: 1px solid #52556a;
            background: #2d3359;
            color: #fff;
            text-align: center;
            font-size: 12px;
            font-weight: 400;
          }
          td {
            width: 80px;
            height: 50px;
            text-align: center;
            height: 50px;
            background: var(--unnamed, #1d223c);
            color: #fff;
            font-size: 12px;
            font-weight: 400;
          }
          td:nth-child(odd) {
            background: #171a2f;
          }

          td:nth-child(even) {
            background: var(--unnamed, #1d223c);
          }
          .highlight {
            background-image: url(./img/bg.png) !important;
            background-repeat: no-repeat;
            background-size: cover;
            /* 其他样式属性 */
            background-size: 100% 100%;
          }
        }
      }
    }
    .dialog-text {
      color: #fff;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      span {
        color: var(--unnamed, #e93d3d);
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        text-decoration-line: underline;
      }
    }
    .dialog-footer {
      margin-top: 25px;
      overflow: auto;
      .dialog-footer-top {
        display: flex;
        align-items: center;
        justify-content: center;
        .title {
          color: var(--100, #fff);
          font-size: 16px;
          font-weight: 500;
          margin: 0 25px;
        }
      }
      .dialog-footer-text {
        height: 646px;
        color: #fff;

        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
        margin-bottom: 20px;
        p {
          white-space: pre-wrap;
        }
        p:nth-child(even) {
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>