<template>
  <div class="fixed-page">
    <!-- 头部海报 -->
    <img
      :src="getImgUrl(activityConfig.activityTopWeb || '')"
      alt=""
      srcset=""
      style="width: 100%"
    />
    <div class="newbie-activity-container">
      <div>
        <p class="subtitle" v-if="!isLogin" @click="showLoginDialog">
          {{ $t('Activity.Newbie.label18') }}
        </p>
        <div class="subtitle" style="line-height: 21px; padding: 4px" v-else-if="isEventActive">
          <p>{{ $t('Activity.Newbie.label1', [qualifications.memberRegisterTime]) }}</p>
          <p>
            {{
              $t('Activity.Newbie.label13', [
                qualifications.isNew
                  ? $t('Activity.Newbie.label14')
                  : $t('Activity.Newbie.label15'),
                qualifications.isQualifications
                  ? $t('Activity.Newbie.label16')
                  : $t('Activity.Newbie.label17')
              ])
            }}
          </p>
        </div>
        <p class="subtitle" v-else>
          {{ $t('Activity.Newbie.label26') }}
        </p>
        <!-- 新手大礼包 -->
        <section class="card" v-if="newbieGiftConfig?.activitySwitch">
          <div class="border-blue">
            <div class="border-blue inner-box">
              <img :src="getImgUrl(newbieGiftConfig.pcPlayImg || '')" class="img1" />
              <article style="margin: -120px 0 25px 350px">
                <p
                  v-for="(line, index) in newbieGiftConfig.activityDesc?.split('\n')"
                  :key="line + index"
                >
                  {{ line }}
                </p>
              </article>
            </div>
          </div>
        </section>
        <!-- 签到大礼包 -->
        <section class="card sign" v-if="signGiftConfig?.activitySwitch">
          <div class="border-blue">
            <div class="border-blue inner-box">
              <img :src="getImgUrl(signGiftConfig.pcPlayImg || '')" class="img1" />
              <div style="margin: -380px 30px 0 330px">
                <p class="amount">
                  {{ $t('Activity.Newbie.label2', [signGiftConfig.achievedDays]) }}
                  <span>
                    {{ signGiftConfig.gifts[0]?.giftAmount?.toLocaleString() }}
                    {{ $t('Activity.Newbie.label25') }}
                  </span>
                  {{ GIFT_TYPE[signGiftConfig.gifts[0]?.giftType] }}
                </p>
                <div class="rate">
                  <template
                    v-for="index in signGiftConfig.achievedDays"
                    :key="'achievedDay' + index"
                  >
                    <div
                      class="days active"
                      v-if="
                        signStatus.length && signStatus.find((e) => e.signIndex === index)?.succeed
                      "
                    >
                      <img src="./img/active.png" alt="" />
                      <p>{{ $t('Activity.Newbie.label3', [index]) }}</p>
                    </div>
                    <div class="days" v-else>
                      <img src="./img/inactive.png" alt="" />
                      <p>{{ $t('Activity.Newbie.label3', [index]) }}</p>
                    </div>
                  </template>
                </div>
                <h3
                  v-html="
                    $t('Activity.Newbie.label4', {
                      day: `<span style='color: #ff9000;'>${signStatus.reduce(
                        (sum, num) => sum + (num.succeed || 0),
                        0
                      )}</span>`
                    })
                  "
                ></h3>
                <div style="display: flex; justify-content: center">
                  <div style="margin-right: 100px">
                    <el-button class="bet-btn" @click="$router.push('/')">
                      {{ $t('Activity.Newbie.label6') }}
                    </el-button>
                    <p
                      class="bet-amount"
                      v-html="
                        $t('Activity.Newbie.label5', {
                          amount: `<span style='color: #ff9000;'>${
                            today?.signBetAmount?.toLocaleString() || 0
                          }</span>`
                        })
                      "
                    ></p>
                  </div>
                  <el-button
                    v-if="isLogin"
                    class="sign-btn"
                    :class="{ disable: !ableToSign }"
                    :disabled="!ableToSign"
                    @click.stop="userSign()"
                  >
                    {{ !ableToSign ? $t('Activity.Newbie.label7') : $t('Activity.Newbie.label8') }}
                  </el-button>
                  <el-button v-else class="sign-btn" @click.stop="showLoginDialog()">
                    {{ $t('Activity.Newbie.label8') }}
                  </el-button>
                </div>
                <article style="margin: 0 0 25px 0">
                  <p
                    v-for="(line, index) in signGiftConfig.activityDesc?.split('\n')"
                    :key="line + index"
                  >
                    {{ line }}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
        <!-- 复活大礼包 -->
        <section class="card" v-if="resurrectionGiftConfig?.activitySwitch">
          <div class="border-blue">
            <div class="border-blue inner-box">
              <img :src="getImgUrl(resurrectionGiftConfig.pcPlayImg || '')" class="img1" />
              <div style="margin: -380px 30px 0 330px">
                <div class="envlope">
                  <div class="left">
                    <p>{{ $t('Activity.Newbie.label9') }}</p>
                    <p class="percentage">×{{ resurrectionGiftConfig.gifts[0]?.profitRate }}%</p>
                    <p>
                      {{
                        $t('Activity.Newbie.label10', [
                          resurrectionGiftConfig.gifts[0]?.giftAmount?.toLocaleString()
                        ])
                      }}
                    </p>
                  </div>
                  <div class="right">
                    <p>{{ $t('Activity.Newbie.label11') }}</p>
                    <p class="total">
                      {{
                        $t('Activity.Newbie.label12', [
                          resurrectionGiftConfig.achievedDays,
                          resurrectionGiftConfig.gifts[0]?.profitAmount?.toLocaleString()
                        ])
                      }}
                    </p>
                    <el-button
                      class="receive-btn"
                      :class="{ disabled: isReceived }"
                      @click.stop="isLogin ? getNewbieResurrectionGift() : showLoginDialog()"
                    >
                      {{
                        isReceived
                          ? $t('Activity.Newbie.resurrection.status1')
                          : $t('Activity.Newbie.resurrection.status0')
                      }}
                    </el-button>
                  </div>
                </div>
                <article style="margin: 0 0 25px 0">
                  <p
                    v-for="(line, index) in resurrectionGiftConfig.activityDesc?.split('\n')"
                    :key="line + index"
                  >
                    {{ line }}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
        <!-- 活动规则 -->
        <section class="card rule">
          <div class="border-blue">
            <div class="border-blue inner-box">
              <div>
                <p class="title">— {{ $t('Activity.Newbie.title4') }} —</p>
                <article>
                  <template
                    v-for="(item, index) in JSON.parse(activityConfig.activityRule || '{}')"
                    :key="item.type + index"
                  >
                    <p v-if="item.type === 1">
                      {{ item.content }}
                    </p>
                    <img
                      :src="getImgUrl(item.appImg || '')"
                      alt=""
                      srcset=""
                      v-else
                      style="width: 100%"
                    />
                  </template>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <CustomizeDialog
    :dialogShow="dialogShow"
    :width="600"
    :title="$t('Activity.Newbie.label19')"
    v-if="dialogShow"
  >
    <div class="dialog-content">{{ message }}</div>
    <div class="footer">
      <template v-if="isLoginDialog">
        <div class="footer-btn cancel" @click="closeDialog">
          {{ $t('Activity.Newbie.Cancel') }}
        </div>
        <div class="footer-btn" @click="onClickConfirm">{{ $t('Activity.Newbie.label24') }}</div>
      </template>
      <template v-else>
        <div class="footer-btn" @click="closeDialog">{{ $t('Activity.Newbie.label20') }}</div>
      </template>
    </div>
  </CustomizeDialog>
</template>

<script setup>
import {
  getNewbieDetail,
  getNewbieQualifications,
  getNewbieSignGiftDetail,
  getNewbieResurrectionReceive,
  getNewbieResurrectionStatus,
  getNewbieSign
} from '@/api/newbie'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { getImgUrl } from '@/utils/cache'
import i18n from '@/i18n/index'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import { getActivityDetil } from '@/api/promotion'
import { getPublicIPAddress } from '@/utils'
import { computed, watch } from 'vue'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

const GIFT_TYPE = {
  1: i18n.global.t('Activity.Newbie.gift.type1'),
  2: i18n.global.t('Activity.Newbie.gift.type2'),
  3: i18n.global.t('Activity.Newbie.gift.type3'),
  4: i18n.global.t('Activity.Newbie.gift.type4'),
  5: i18n.global.t('Activity.Newbie.gift.type5')
}

const dialogShow = ref(false)
const user = useUserStore()
const isLogin = user.isLogin
const route = useRoute()

const loading = ref('true') // 加载状态
const activityConfig = ref({})
const newbieGiftConfig = ref({}) //新手大礼包
const signGiftConfig = ref({ gifts: [] }) // 签到大礼包
const resurrectionGiftConfig = ref({ gifts: [] }) // 复活大礼包
const signStatus = ref([{}])
const resurrectionStatus = ref(null)
const qualifications = ref({})
const today = ref({})

const ableToSign = ref(false)
watch(
  () => signStatus.value,
  (val) => {
    const t = val.find((e) => e.isToday === 1)
    today.value = t

    ableToSign.value = val.length && t ? t?.succeed === 0 : true
  },
  { deep: true }
)

const isEventActive = computed(() => {
  if (activityConfig.value.timeType === 1) {
    const { startTime, endTime } = activityConfig.value
    dayjs.extend(isBetween)
    return dayjs().isBetween(startTime, endTime)
  }
  return true
})

onMounted(async () => {
  const { advertiseId, activityId, type } = route.query
  const params = { activityId }
  const requestData = { advertiseId, activityId, enterLocation: Number(type), deviceType: 1 }

  try {
    loading.value = true

    if (!user.isLogin) {
      await getPublicIPAddress().then((ip) => {
        requestData.memberUserName = ip
        requestData.tenantId = '1'
      })
    }
    await getActivityDetil(requestData)

    const { data } = await getNewbieDetail(params)
    activityConfig.value = data.activityConfig
    // 新手大礼包
    const newbieGiftConf = data.configs.filter((e) => e.giftType === 1)
    newbieGiftConfig.value = newbieGiftConf[newbieGiftConf.length - 1]
    // 签到大礼包
    const signGiftConf = data.configs.filter((e) => e.giftType === 2)
    signGiftConfig.value = signGiftConf[signGiftConf.length - 1]
    // 复活大礼包
    const resurrectionGiftConf = data.configs.filter((e) => e.giftType === 3)
    resurrectionGiftConfig.value = resurrectionGiftConf[resurrectionGiftConf.length - 1]

    if (isLogin) {
      const { data } = await getNewbieQualifications(params)
      qualifications.value = data
      // 获取签到状态
      await getSignGiftDetail()
      // 获取签到礼包状态
      await getResurrectionGiftDetail()
    }
  } catch (error) {
    console.log('catch中')
    console.log(error)
  } finally {
    loading.value = false
  }
})

const getSignGiftDetail = async () => {
  if (signGiftConfig.value.activitySwitch) {
    const { data } = await getNewbieSignGiftDetail({ activityId: route.query.activityId })
    signStatus.value = data
  }
}

const isReceived = computed(() => resurrectionStatus.value == 1)
const getResurrectionGiftDetail = async () => {
  if (resurrectionGiftConfig.value.activitySwitch) {
    const { data } = await getNewbieResurrectionStatus({ activityId: route.query.activityId })
    resurrectionStatus.value = data
  }
}

const message = ref(i18n.global.t('Activity.Newbie.label22'))
const isLoginDialog = ref(false)
// 用户签到
const userSign = async () => {
  const res = await getNewbieSign({ activityId: route.query.activityId })
  if (res.code === 200) {
    isLoginDialog.value = false
    message.value = i18n.global.t('Activity.Newbie.label22')
    dialogShow.value = true
    await getSignGiftDetail()
  }
}
// 领取复活大礼包
const getNewbieResurrectionGift = async () => {
  const res = await getNewbieResurrectionReceive({ activityId: route.query.activityId })
  if (res.code === 200) {
    isLoginDialog.value = false
    message.value = i18n.global.t('Activity.Newbie.label23')
    dialogShow.value = true
    await getResurrectionGiftDetail()
  }
}

const showLoginDialog = () => {
  isLoginDialog.value = true
  message.value = i18n.global.t('Activity.Newbie.label18')
  dialogShow.value = true
}

const closeDialog = () => {
  dialogShow.value = false
}

const onClickConfirm = () => {
  dialogShow.value = false
  user.setLoginDialogAction({
    isShowLoginDialog: true,
    currentPage: 'login'
  })
}
</script>

<style lang="scss" scoped>
.dialog-content {
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;

  font-weight: 400;
  line-height: 12px;
  text-align: center;
}

.footer {
  display: flex;
  .footer-btn {
    width: 200px;
    height: 40px;
    border-radius: 4px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    color: #fff;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    line-height: 40px;
    margin: 30px auto 0;
    &.cancel {
      background: transparent;
      color: #f35f1b;
      border: 2px solid #f35f1b;
    }
  }
}

.fixed-page {
  margin: 0 -20px -20px -5px;
  background-color: #4b95da;
  .newbie-activity-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: 100% auto;
    padding: 0px 16px 16px 16px;
    background-repeat: no-repeat;
    margin-top: -48vw;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .subtitle {
      min-width: 670px;
      min-height: 40px;
      background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
      border-radius: 90px;
      color: #fff;
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 40px; /* 150% */
    }

    .card {
      border-radius: 10px;
      background: #fff;
      width: 1080px;
      margin-top: 30px;

      div.border-blue {
        border-radius: 8px;
        border: 1px solid #4d95da;
        text-align: center;
        margin: 6px;
        position: relative;
        h1 {
          margin-top: -1px;
          margin-left: -1px;
          border-radius: 10px 0px 90px 0px;
          border: 1px solid #4d95da;
          background: linear-gradient(92deg, #bc98f6 13.98%, #60a3fa 68.45%);
          min-width: 251px;
          line-height: 66px;
          color: #fff;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
          font-size: 36px;
          font-style: normal;
          font-weight: 600;
          position: absolute;
          padding: 0 30px;
          z-index: 1;
        }

        .inner-box {
          min-height: 360px;
          .img1 {
            margin: -8px 0 0 -8px;
            width: 1080px;
          }

          article {
            text-align: left;
            color: #333;

            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px;
            /* 150% */
          }
        }
      }

      &.sign {
        p.amount {
          font-size: 18px;
          margin: 10px 0;
          span {
            color: #ff5000;

            font-size: 22px;
            font-style: normal;
            font-weight: 600;
            line-height: 30px;
          }
        }
        .rate {
          margin-top: 20px;
          border-radius: 90px;
          background: #e2e9f1;
          box-shadow: 0px 4px 4px 0px rgba(8, 25, 41, 0.1) inset;
          height: 50px;
          width: calc(100% + 10px);
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;

          .days {
            font-size: 14px;
            img {
              height: 50px;
            }
            p {
              margin-top: 6px;
            }

            &.active {
              color: #ff9000;
            }
          }
        }
        h3 {
          margin: 40px 0 20px 0;
          span {
            color: #ff9000;
          }
        }

        .bet-btn,
        .sign-btn {
          border-radius: 6px;
          background: var(---1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
          color: #fff;

          font-size: 16px;
          font-weight: 600;
          line-height: 50px;
          display: inline-block;
          width: 170px;
          height: 50px;
          padding: 0;
          &.disable {
            opacity: 0.5;
          }
        }
        .bet-amount {
          font-size: 14px;
          margin: 14px 0 20px 0;
          span {
            color: #ff9000;
          }
        }

        .sign-btn {
          margin-bottom: 20px;
        }
      }

      &.rule {
        .title {
          color: #333;

          font-size: 36px;
          font-style: normal;
          font-weight: bold;
          line-height: 36px;
          margin: 14px 0 0 0;
        }

        article {
          padding: 40px 24px 50px 24px;
          p {
            color: #333333;
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            word-wrap: break-word;
            margin-bottom: 20px;
          }
        }
      }

      .envlope {
        background-image: url(./img/envlope.png);
        height: 183px;
        width: 700px;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 0 0 20px 0;
        display: flex;
        justify-content: space-between;
        .left {
          width: 300px;
          padding: 9px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            color: #666;
            font-size: 16px;
            font-weight: 400;

            &.percentage {
              color: var(-----, #f35f1b);
              font-size: 60px;
              font-weight: 600;
              line-height: 80px;
            }
          }
        }
        .right {
          flex-grow: 1;
          padding: 9px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            color: #fff;
            font-size: 30px;
            font-weight: 600;

            &.total {
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: normal;
              font-size: 20px;
              line-height: 40px;
              &::after,
              &::before {
                content: '';
                width: 16px;
                height: 2px;
                flex-shrink: 0;
                background: linear-gradient(270deg, rgba(255, 255, 255, 0) 25%, #fff 100%);
                display: inline-block;
                margin: 0 0 0 4px;
              }

              &::before {
                rotate: 180deg;
                margin: 0 4px 0 0;
              }
            }
          }
          .receive-btn {
            border-radius: 90px;
            background: linear-gradient(180deg, #fdfaeb 0%, #f2e18b 100%);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
            min-width: 84px;
            flex-shrink: 0;
            color: var(-----, #f35f1b);
            font-size: 20px;
            font-weight: 600;
            line-height: 44px;
            border: none;
            padding: 0 20px;
            &.disabled {
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
}

.loading-box {
  margin: 20px auto;
}

.arrow {
  top: 8px;
  left: 8px;
  position: absolute;
}
</style>
