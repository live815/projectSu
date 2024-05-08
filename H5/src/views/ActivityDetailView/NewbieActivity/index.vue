<template>
  <div class="main-container Newbieactivity">
    <!-- 头部海报 -->
    <img :src="getImg(activityConfig.activityTopApp || '')" class="header-image" alt="" srcset="" />
    <div class="newbie-activity-container">
      <div v-if="loading" class="loading-box">
        <van-loading vertical>{{ $t('common.loading') }}</van-loading>
      </div>
      <p class="subtitle" v-if="!isLogin && !token" @click="dialog2.showPopup()">
        {{ $t('Activity.Newbie.label18') }}
      </p>
      <div class="subtitle" style="line-height: 21px; padding: 4px" v-else-if="isEventActive">
        <p>{{ $t('Activity.Newbie.label1', [qualifications.memberRegisterTime]) }}</p>
        <p>
          {{
            $t('Activity.Newbie.label13', [
              qualifications.isNew ? $t('Activity.Newbie.label14') : $t('Activity.Newbie.label15'),
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
        <div>
          <img :src="getImg(newbieGiftConfig?.appPlayImg || '')" class="img1" />
          <article>
            <p
              v-for="(line, index) in newbieGiftConfig.activityDesc.split('\n')"
              :key="line + index"
            >
              {{ line }}
            </p>
          </article>
        </div>
      </section>
      <!-- 签到大礼包 -->
      <section class="card sign" v-if="signGiftConfig?.activitySwitch">
        <div>
          <img :src="getImg(signGiftConfig?.appPlayImg || '')" class="img1" />
          <p class="amount">
            {{ $t('Activity.Newbie.label2', [signGiftConfig.achievedDays]) }}
            <span
              >{{ signGiftConfig.gifts[0]?.giftAmount?.toLocaleString()
              }}{{ $t('Activity.Newbie.label25') }}</span
            >
            {{ GIFT_TYPE[signGiftConfig.gifts[0]?.giftType] }}
          </p>
          <div class="rate">
            <template v-for="index in signGiftConfig.achievedDays" :key="'achievedDay' + index">
              <div
                class="days active"
                v-if="signStatus.length && signStatus.find((e) => e.signIndex === index)?.succeed"
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
          <van-button class="sign-btn" @click="homePageRedirect">
            {{ $t('Activity.Newbie.label6') }}
          </van-button>
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
          <van-button
            v-if="isLogin || token"
            class="sign-btn"
            :class="{ disable: !ableToSign }"
            :disabled="!ableToSign"
            @click.stop="userSign()"
          >
            {{ !ableToSign ? $t('Activity.Newbie.label7') : $t('Activity.Newbie.label8') }}
          </van-button>
          <van-button v-else class="sign-btn" @click.stop="dialog2.showPopup()">
            {{ $t('Activity.Newbie.label8') }}
          </van-button>
          <article>
            <p v-for="(line, index) in signGiftConfig.activityDesc.split('\n')" :key="line + index">
              {{ line }}
            </p>
          </article>
        </div>
      </section>
      <!-- 复活大礼包 -->
      <section class="card" v-if="resurrectionGiftConfig?.activitySwitch">
        <div>
          <img :src="getImg(resurrectionGiftConfig?.appPlayImg || '')" class="img1" />
          <div class="envlope">
            <div class="left" :class="i18n.locale.value">
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
            <div class="right" :class="i18n.locale.value">
              <p>{{ $t('Activity.Newbie.label11') }}</p>
              <p class="total">
                {{
                  $t('Activity.Newbie.label12', [
                    resurrectionGiftConfig.achievedDays,
                    resurrectionGiftConfig.gifts[0]?.profitAmount?.toLocaleString()
                  ])
                }}
              </p>
              <van-button
                class="receive-btn"
                :class="{ disabled: isReceived }"
                @click="isLogin || token ? getNewbieResurrectionGift() : dialog2.showPopup()"
              >
                {{
                  isReceived
                    ? $t('Activity.Newbie.resurrection.status1')
                    : $t('Activity.Newbie.resurrection.status0')
                }}
              </van-button>
            </div>
          </div>
          <article>
            <p
              v-for="(line, index) in resurrectionGiftConfig.activityDesc.split('\n')"
              :key="line + index"
            >
              {{ line }}
            </p>
          </article>
        </div>
      </section>
      <!-- 活动规则 -->
      <section class="card rule">
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
              <img :src="getImg(item.appImg || '')" alt="" srcset="" v-else style="width: 100%" />
            </template>
          </article>
        </div>
      </section>
    </div>
  </div>
  <Dialog
    ref="dialog"
    class="dialog"
    :title="$t('Activity.Newbie.label19')"
    :butText="$t('Activity.Newbie.label20')"
    height="180"
    width="315"
  >
    <template v-slot:content>
      <p style="text-align: center">{{ message }}</p>
    </template>
  </Dialog>
  <Dialog2
    ref="dialog2"
    class="dialog"
    :title="$t('Activity.Newbie.label19')"
    :butText="$t('Activity.Newbie.label24')"
    :cancelbtn="$t('Activity.Newbie.Cancel')"
    height="180"
    width="315"
  >
    <template v-slot:content> {{ $t('Activity.Newbie.label21') }} </template>
  </Dialog2>
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
import Dialog from '@/components/Dialog/Dialog'
import Dialog2 from './Dialog'
import { getImg } from '@/utils'
import { watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useMobileEvent } from '@/hooks/useMobileEvent'
const { homePageRedirect, token } = useMobileEvent()

const i18n = useI18n()
const GIFT_TYPE = {
  1: i18n.t('Activity.Newbie.gift.type1'),
  2: i18n.t('Activity.Newbie.gift.type2'),
  3: i18n.t('Activity.Newbie.gift.type3'),
  4: i18n.t('Activity.Newbie.gift.type4'),
  5: i18n.t('Activity.Newbie.gift.type5')
}

const dialog = ref(null)
const dialog2 = ref(null)
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
  try {
    loading.value = true
    const res = await getNewbieDetail({ activityId: route.query.activityId })
    activityConfig.value = res.data.activityConfig
    // 新手大礼包
    const newbieGiftConf = res.data.configs.filter((e) => e.giftType === 1)
    newbieGiftConfig.value = newbieGiftConf[newbieGiftConf.length - 1]
    // 签到大礼包
    const signGiftConf = res.data.configs.filter((e) => e.giftType === 2)
    signGiftConfig.value = signGiftConf[signGiftConf.length - 1]
    // 复活大礼包
    const resurrectionGiftConf = res.data.configs.filter((e) => e.giftType === 3)
    resurrectionGiftConfig.value = resurrectionGiftConf[resurrectionGiftConf.length - 1]

    if (isLogin || token) {
      const { data } = await getNewbieQualifications({ activityId: route.query.activityId })
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

const message = ref('')

// 用户签到
const userSign = async () => {
  const res = await getNewbieSign({ activityId: route.query.activityId })
  if (res.code === 200) {
    message.value = i18n.t('Activity.Newbie.label22')
    dialog.value.showPopup()
    await getSignGiftDetail()
  }
}
// 领取复活大礼包
const getNewbieResurrectionGift = async () => {
  const res = await getNewbieResurrectionReceive({ activityId: route.query.activityId })
  if (res.code === 200) {
    message.value = i18n.t('Activity.Newbie.label23')
    dialog.value.showPopup()
    await getResurrectionGiftDetail()
  }
}
</script>

<style lang="scss" scoped>
.header-image {
  width: 100%;
}

.Newbieactivity {
  background-color: #4b95da;
  min-height: 100vh;
  .newbie-activity-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0;
    background-size: 100% auto;
    padding: 0px 16px 16px 16px;
    background-repeat: no-repeat;
    margin-top: -400px;

    .subtitle {
      height: 100%;
      background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
      border-radius: 90px;
      // margin: 0 40px;
      margin-top: -15px;
      color: #fff;
      text-align: center;

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px;
    }

    .card {
      border-radius: 10px;
      background: #fff;
      padding: 6px;

      > div {
        border-radius: 8px;
        border: 1px solid #4d95da;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 12px 12px 12px;

        h1 {
          margin-top: -1px;
          border-radius: 0px 0px 90px 90px;
          border: 1px solid #4d95da;
          background: linear-gradient(92deg, #bc98f6 13.98%, #60a3fa 68.45%);
          min-width: 180px;
          line-height: 40px;
          color: #fff;
          text-align: center;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);

          font-size: 20px;
          font-style: normal;
          font-weight: 600;
          padding: 0 30px;
        }

        .img1 {
          margin-top: -1px;
          width: 330px;
        }

        article {
          text-align: left;
          color: #333;

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 21px;
          width: 100%;
        }
      }

      &.sign {
        p.amount {
          font-size: 14px;
          margin: 10px 0;
          span {
            color: #ff5000;

            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 30px;
          }
        }
        .rate {
          border-radius: 90px;
          background: #e2e9f1;
          box-shadow: 0px 4px 4px 0px rgba(8, 25, 41, 0.1) inset;
          height: 28px;
          width: calc(100% + 10px);
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;

          .days {
            font-size: 12px;
            img {
              width: 28px;
              height: 28px;
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
          margin: 14px 0;
          span {
            color: #ff9000;
          }
        }

        .bet-btn,
        .sign-btn {
          border-radius: 6px;
          background: var(---1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
          width: 100%;
          color: #fff;

          font-size: 16px;
          font-weight: 600;
          line-height: 21px; /* 131.25% */
          border: none;
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

          font-size: 20px;
          font-style: normal;
          font-weight: bold;
          line-height: 36px;
          margin: 14px 0 0 0;
        }

        article p {
          // 会员在指定赛事比赛开始前24小时内满足存款≥500元并于指定场馆（V体育、FB体育、DB体育）投注指定赛事即可，本场赛事的总负盈利可获得最高100%的本金返还，按照VIP等级的不同最高返还1888元。
          color: #333333;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          word-wrap: break-word;
          margin-bottom: 10px;
        }
      }

      .envlope {
        background-image: url(./img/envlope.png);
        height: 80px;
        width: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 14px 0 20px 0;
        display: flex;
        justify-content: space-between;
        .left {
          width: 130px;
          padding: 10px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          &.vi p {
            font-size: 10px;
          }

          p {
            color: #666;
            font-size: 12px;
            font-weight: 400;
            &.percentage {
              color: var(-----, #f35f1b);
              font-size: 20px;
              font-weight: 600;
              line-height: 30px; /* 150% */
            }
          }
        }
        .right {
          flex-grow: 1;
          padding: 5px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          &.vi p {
            font-size: 7.4px;
          }
          p {
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            line-height: 18px; /* 150% */

            &.total {
              display: flex;
              align-items: center;
              font-weight: normal;
              justify-content: center;
            }
          }
          .receive-btn {
            border-radius: 90px;
            background: linear-gradient(180deg, #fdfaeb 0%, #f2e18b 100%);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
            min-width: 84px;
            height: 28px;
            flex-shrink: 0;
            color: var(-----, #f35f1b);
            font-size: 13px;
            font-weight: 600;
            line-height: 28px; /* 161.538% */
            border: none;
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
