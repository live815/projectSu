<template>
  <div class="outter">
    <div class="main-container InviteComp" v-if="inviteStatus * 1 === 0">
      <div class="header">
        {{ $t('GeneralUserCenter.InviteFriends') }}
        <div class="marquee"></div>
      </div>
      <div class="reward-box">
        <div class="reward-title">
          <span class="my-reward">{{ $t('GeneralUserCenter.MyReward') }}</span>
          <span class="grand-reward">{{ $t('GeneralUserCenter.CumulativeRewardsIssued') }}：</span>
          <span class="reward-num">
            {{
              toFormatNumber(Number(InviteTotalAward.totalAllAward)
                // Number(
                //   vipConfig['drawBetAward'] + vipConfig['drawDepAward'] + vipConfig['drawVipAward']
                // )
              )
            }}</span
          >
        </div>
        <div class="reward-card-row">
          <div class="reward-card-container">
            <div class="reward-card">
              <div class="card-title">{{ $t('GeneralUserCenter.AwaitingFirstDepositBonus') }}</div>
              <div class="card-num">
                <CurrencyUnit />{{
                  vipConfig['unDrawDepAward']
                    ? toFormatNumber(Number(vipConfig['unDrawDepAward']))
                    : 0
                }}
              </div>
              <div
                class="card-btn"
                :class="vipConfig['unDrawDepAward'] + '' === '0' && 'card-btn-off'"
                @click="
                  !!vipConfig['unDrawDepAward'] && handleReceive(vipConfig['unDrawDepAward'], 1)
                "
              >
                {{ $t('GeneralUserCenter.Receive') }}
              </div>
            </div>
            <div class="reward-record">
              {{ $t('GeneralUserCenter.ReceivedFirstDepositBonus') }}：<span class="record-num">{{
                toFormatNumber(Number(vipConfig['drawDepAward']))
              }}</span>
            </div>
          </div>
          <div class="reward-card-container">
            <div class="reward-card">
              <div class="card-title">{{ $t('GeneralUserCenter.ToReceiveRunningWaterShare') }}</div>
              <div class="card-num">
                <CurrencyUnit />{{
                  vipConfig['unDrawBetAward']
                    ? toFormatNumber(Number(vipConfig['unDrawBetAward']))
                    : 0
                }}
              </div>
              <div
                class="card-btn"
                :class="vipConfig['unDrawBetAward'] + '' === '0' && 'card-btn-off'"
                @click="
                  !!vipConfig['unDrawBetAward'] && handleReceive(vipConfig['unDrawBetAward'], 2)
                "
              >
                {{ $t('GeneralUserCenter.Receive') }}
              </div>
            </div>
            <div class="reward-record">
              {{ $t('GeneralUserCenter.ReceivedRunningWaterShare') }}：<span class="record-num">{{
                toFormatNumber(Number(vipConfig['drawBetAward']))
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="invied-number-box">
        <div class="title-row">
          <span>{{ $t('GeneralUserCenter.Effectivenumberofinvitees') }}</span>
          <span>{{ vipConfig['subCount'] }}{{ $t('GeneralUserCenter.Members') }}</span>
        </div>
        <div class="invite-table-row">
          <div class="table-container">
            <div class="top-label">
              {{ $t('GeneralUserCenter.FriendFirstDepositBonus') }}-{{
                $t('GeneralUserCenter.TodayInvitation')
              }}
            </div>
            <div class="el-table-container">
              <el-table
                ref="tableRef"
                class="table"
                :data="message"
                height="533"
                style="width: 100%; height: 240px; font-size: 12px; --el-table-border-color: none"
                :header-cell-style="{ background: '#1D223C' }"
                @mouseenter.native="mouseEnterRef"
                @mouseleave.native="mouseLeaveRef"
              >
                <el-table-column
                  class="table-item"
                  prop="inviteName"
                  :label="$t('friends.inviter')"
                  align="center"
                />
                <el-table-column
                  class="table-item"
                  prop="subName"
                  :label="$t('friends.invited')"
                  align="center"
                />
                <el-table-column
                  class="table-item"
                  prop="inviteFirstDepAward"
                  :label="$t('GeneralUserCenter.RewardAmount')"
                  align="center"
                />
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <InviteDetailComp :inviteData="inviteData"></InviteDetailComp>
    </div>
    <div class="main-container InviteComp-no-open" v-else>
      <span>{{ $t('friends.inviteAlert') }} ~</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import InviteDetailComp from './InviteDetailComp.vue'
// import { inviteTableData } from '../generalUserCenter'
import { ERR_OK } from '@/utils/config'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { queryHorseRing, queryInviteInfo, drawAward, queryInviteDepConfig,queryInviteInfoTotalAward } from '@/api/user'
import { useRouter } from 'vue-router'
import { toFormatNumber } from '@/utils'

const router = useRouter()
const vipConfig = ref('')
const InviteTotalAward = ref('')
// const inviteLinkUrl = ref('')
const message = ref([])
const num = ref(0)
const tableRef = ref(null)
const inviteStatus = ref()
const inviteData = ref({})
const site = import.meta.env.VITE_SITE
const symbol = computed(() => {
  if (site === 'vietnam') return '‰'
  else return '%'
})
let timer = null

const getInviteInfo = () => {
  queryInviteInfo().then((res) => {
    if (res?.['code'] === ERR_OK) {
      vipConfig.value = res?.data || {}
      // inviteLinkUrl.value = res?.data?.['domainName'] || ''
    }
  })
}

const getHorseRing = () => {
  queryHorseRing().then((res = []) => {
    if (res?.['code'] === ERR_OK) {
      message.value = res['data'] || []
      if (res?.['data'] && !!res?.['data'].length) {
        tableScroll()
      }
    }
  })
}

const handleReceive = (val, type) => {
  const data = { awardAmount: val * 1, type }
  drawAward(data).then((res) => {
    if (res?.['code'] === ERR_OK) {
      ElMessage.success(i18n.global.t('GeneralUserCenter.Notice_13'))
      getInviteInfo()
      getInviteInfoTotalAward()//邀请详情累计发放金额和邀请人数
    } else {
      ElMessage.error(res['msg'])
    }
  })
}
//邀请详情累计发放金额和邀请人数
const getInviteInfoTotalAward = () =>{
  queryInviteInfoTotalAward().then((res) =>{
    if(res.code == 200){
      InviteTotalAward.value = res.data
    }
  })
}

const tableScroll = (stop) => {
  if (stop) {
    return clearInterval(timer)
  }
  const table = tableRef.value.layout.table.refs
  const divData = table.bodyWrapper.firstElementChild.firstElementChild
  timer = setInterval(() => {
    divData.scrollTop += 1
    if (divData.clientHeight + divData.scrollTop === divData.scrollHeight) {
      divData.scrollTop = 0
    }
  }, 100)
}

const mouseEnterRef = () => {
  tableScroll(true)
}

const mouseLeaveRef = () => {
  tableScroll()
}

const getInviteDepConfig = () => {
  queryInviteDepConfig().then((res) => {
    if (res?.['code'] === ERR_OK) {
      inviteStatus.value = res?.['data']?.['status']
      inviteData.value.inviteData = res?.['data']
    }
  })
}
onMounted(() => {
  getInviteDepConfig()
  getInviteInfo()
  getInviteInfoTotalAward()
  getHorseRing()
})

</script>

<style lang="scss" scoped>
* {
}
.outter {
  min-width: 1320px;
  max-width: 1320px;
}
.InviteComp {
  width: 100%;
  margin: 4px 0 0 0;
  padding: 30px 40px 0 40px;
  border-radius: 8px;
  background: #272b45;
  .header {
    display: flex;
    height: 40px;
    justify-items: flex-start;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--100, #fff);

    font-size: 20px;
    font-weight: 500;
    .marquee {
      margin-left: auto;
    }
  }
  .reward-box {
    margin-top: 30px;
    .reward-title {
      .my-reward,
      .grand-reward,
      .reward-num {
        color: var(--100, #fff);
        font-size: 16px;
        font-weight: 400;
      }
      .my-reward {
        margin-right: 12px;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }
      .reward-num {
        color: var(--unnamed, #f35f1b) !important;
      }
    }
    .reward-card-row {
      display: flex;
      margin-top: 16px;
      .reward-card-container {
        display: flex;
        flex-direction: column;
        height: 173px;
        width: 259px;
        margin-right: 24px;
        align-items: center;

        .reward-card {
          width: 100%;
          padding: 20px 20px 16px 20px;
          flex-direction: column;
          border-radius: 8px;
          background: var(--unnamed, #1d223c);
          box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.05);
          .card-title {
            color: var(--60, rgba(255, 255, 255, 0.6));
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            margin-bottom: 16px;
          }
          .card-num {
            text-align: center;
            margin-bottom: 12px;
            color: #ff9000;
            font-size: 26px;
            font-weight: 600;
            line-height: 28px;
            span {
              font-size: 14px;
              line-height: 14px;
            }
          }
          .card-btn {
            display: flex;
            width: 180px;
            height: 36px;
            padding: 10px;
            margin: 0 auto;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
            color: #fff;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            cursor: pointer;
          }
          .card-btn.card-btn-off {
            background: #272b45;
            color: rgba(255, 255, 255, 60%);
            //border: 1px solid rgba(255, 255, 255, 20%);
          }
        }
        .reward-record {
          margin-top: 12px;
          color: var(--60, rgba(255, 255, 255, 0.6));

          font-size: 12px;
          font-weight: 400;
          .record-num {
            color: var(--1, #ff9000) !important;
          }
        }
      }
    }
  }
  .invied-number-box {
    margin-top: 58px;
    .title-row {
      color: var(--100, #fff);

      font-size: 16px;
      .invied-number-title {
        display: inline-block;
        height: 16px;
        padding-right: 12px;
        margin-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }
      .num {
        color: var(--unnamed, #f35f1b) !important;
      }
      .grey-text {
        color: var(--40, rgba(255, 255, 255, 0.4));
      }
    }
    .invite-table-row {
      width: 100%;
      height: 256px;
      margin-top: 20px;
      display: flex;
      gap: 24px;
      //padding-left: 10px;
      //padding-right: 10px;
      .top-label {
        display: flex;
        // min-width: 165px;
        // max-width: 288px;
        width: auto;
        height: 25px;
        padding: 10px 8px;
        align-items: center;
        border-radius: 4px 4px 0 0;
        background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
        color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
        font-size: 14px;
        font-weight: 400;
      }
      .table-container {
        flex: 1 0 calc(33% - 24px);
        width: 100%;
        // height: 100%;
        .el-table-container {
          border-radius: 0 0 6px 6px;
          overflow: hidden;
        }
        .table {
          color: var(--60, rgba(255, 255, 255, 0.6));
          text-align: center;

          font-size: 12px;
          font-weight: 400;
          line-height: 28px;
        }
      }
    }
  }
}
.InviteComp-no-open {
  width: 100%;
  margin: 4px 0 0 0;
  padding: 30px 40px 0 40px;
  border-radius: 8px;
  min-height: 500px;
  background: #272b45;
  position: relative;
  > span {
    //width: 100%;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 25px;
    transform: translate(-50%, -50%);
  }
}
:deep() {
  .el-table--fit {
    background: #171a2f;
  }
  .el-table__cell {
    padding: 7px 0 7px 0;
    line-height: 28px;
    background: #171a2f;
  }
  .el-table__footer-wrapper tbody td.el-table__cell {
    background: var(--unnamed, #1d223c);
    color: var(--60, rgba(255, 255, 255, 0.6));
    text-align: center;

    font-size: 14px;
    line-height: 16px;
  }
  .el-table {
    --el-table-tr-bg-color: var(--unnamed, #1d223c);
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
    background-color: #3b4d67;
  }
}

.lunbo {
  width: 550px;
  padding: 0 8px 0 0;
  box-sizing: border-box;
  height: 64px; //文本区域的高度
  line-height: 64px; //文本的行间距，与高度相同，则表示一行展示
  text-overflow: ellipsis; //超出内容...展示
  word-break: keep-all; //是否折断文本，keep-all表示不折断
  white-space: nowrap; //不换行展示文本
  overflow: hidden; //超出部分隐藏，与text-overflow配合使用
  flex: 1;
}
</style>
