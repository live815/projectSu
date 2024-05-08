<template>
  <div class="main-container">
    <NavBar :title="$t('Activity.LuckyWheel.Details')" :isShowRight="false" />
    <header>
      <img
        :src="getImgUrl(activityConfig.activityTopWeb || '')"
        alt=""
        srcset=""
        style="width: 100%"
      />
    </header>
    <div class="content">
      <section>
        <ul>
          <li>
            <h3>{{ $t('Fletter.ActivityTime') }}</h3>
            <p>
              {{
                activityConfig.timeType === 2
                  ? $t('GeneralUserCenter.LongtermActivities')
                  : $t('Activity.Rebate.label6', [' ' + activityConfig.endTime])
              }}
            </p>
          </li>
          <li>
            <h3>{{ $t('GeneralUserCenter.ActiveObject') }}</h3>
            <p>{{ $t('Activity.Rebate.label3') }}</p>
          </li>
        </ul>
        <div
          class="card"
          v-for="config in cashbackconfig?.schemaFundsDetails"
          :key="config.inventoryId"
        >
          <section>
            <p class="title">{{ config.nameCn }}</p>
            <div class="amount" v-if="isLogin && config.validAmount && config.cashbackAmount">
              {{
                $t('Activity.Rebate.label7', [
                  CurrencyUnit + config.validAmount?.toLocaleString(),
                  CurrencyUnit + config.cashbackAmount?.toLocaleString()
                ])
              }}
            </div>
          </section>
          <table cellspacing="1">
            <tbody>
              <tr v-for="(item, index) in rotateObj(config.cashBackThresholds)" :key="item + index">
                <td
                  v-for="(item2, index2) in item"
                  :key="item2 + index2"
                  :style="{ width: `calc(100% / ${item.length})` }"
                >
                  {{ item2 }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card rule-card">
          <div>
            <p>
              <span>{{ $t('Fletter.ActivityRules') }}</span>
            </p>
          </div>
          <article>
            <template
              v-for="(item, index) in activityConfig.activityRuleList"
              :key="item.type + index"
            >
              <p v-if="item.type === 1">
                {{ item.content }}
              </p>
              <img :src="getImgUrl(item.appImg)" alt="" srcset="" v-else style="width: 100%" />
            </template>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { getPublicIPAddress } from '@/utils'
import { getActivityDetil, getCashbackConfig } from '@/api/promotion'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getImgUrl } from '@/utils/cache'
import useCurrency from '@/hooks/useCurrency'

const { Currency } = useCurrency()
const CurrencyUnit = computed(() => {
  switch (Currency.value) {
    case 'CNY':
      return '￥'
    case 'VND':
      return '₫'
    case 'USDT':
      return '$'
    case 'USD':
      return '$'
    default:
      return ''
  }
})
const route = useRoute()
const i18n = useI18n()
const user = useUserStore()
const isLogin = user.isLogin
const loading = ref('true') // 加载状态
const activityConfig = ref({ activityTopApp: '' })
const cashbackconfig = ref()

const rotateObj = (table) => [
  [
    i18n.t('Activity.Rebate.label1'),
    ...table.flatMap(
      (e) => `${e['operatorDisplay'] + Number(e['validBetAmount']).toLocaleString()}`
    )
  ],
  [
    i18n.t('Activity.Rebate.label2'),
    ...table.flatMap((e) => `${e['cashbackVal'] + e['cashBackUnit']}`)
  ]
]

onMounted(async () => {
  const { advertiseId, activityId, type } = route.query
  const requestData = { advertiseId, activityId, enterLocation: Number(type), deviceType: 1 }

  try {
    if (!isLogin) {
      await getPublicIPAddress().then((ip) => {
        requestData.memberUserName = ip
        requestData.tenantId = '1'
      })
    }
    const { data } = await getActivityDetil(requestData)
    activityConfig.value = data

    const { data: _cashbackconfig } = await getCashbackConfig({
      activityId: route.query.activityId
    })
    cashbackconfig.value = _cashbackconfig
  } catch (error) {
    console.log('catch中')
    console.log(error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="scss">
div.main-container {
  margin: 0 -20px -20px -5px;

  min-height: 100vh;
  overflow-x: hidden;
  background-color: #ffad3c;
  header img {
    width: 100%;
  }
  .content {
    padding-bottom: 30px;
    position: relative;
    box-sizing: border-box;
    > section {
      margin: -120px auto 0;
      width: 1100px;
      ul {
        display: flex;
        padding-left: 0;
        justify-content: space-between;

        li {
          text-align: center;
          list-style-type: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 545px;

          h3 {
            width: 100%;
            color: #fff;
            font-size: 32px;
            background: linear-gradient(180deg, #ff730a 0%, #ea4d19 100%);
            line-height: 75px;
            position: relative;
            font-weight: bold;

            &::before {
              content: '';
              background-image: url(./img/watermark.png);
              position: absolute;
              width: 100%;
              height: 75px;
              left: 0;
              background-repeat: no-repeat;
              background-size: 80%;
              background-position: center;
            }
          }
          p {
            width: 100%;
            color: #ee5519;
            font-size: 24px;
            background-color: #fff;
            line-height: 84px;
            margin-top: 2px;
          }
        }
      }
      .card {
        margin-top: 20px;
        position: relative;
        background-color: #fff;
        background-image: url(./img/watermark2.png);
        background-repeat: no-repeat;
        background-position: right 30px top 10px;
        background-size: 40%;

        &::after {
          content: '';
          height: 16.062px;
          display: block;
          border-top: 3px solid #ffad3c;
        }

        > section {
          min-height: 85.722px;
          display: flex;
          justify-content: center;
          align-items: start;
          flex-direction: column;
          color: #e43010;
          font-weight: 600;
          padding: 5px 30px 5px 7px;
          font-size: 24px;
          border-bottom: 3px solid #ffad3c;
          .title {
            font-size: 32px;
            display: flex;
            align-items: center;
            font-weight: bold;
          }
          .amount {
            margin-top: 10px;
          }
        }

        table {
          text-align: center;
          width: 1094px;
          margin: 10px auto;
          font-size: 16px;

          td {
            font-weight: 600;
            height: 69.773px;
            color: #c1630c;
            background-color: #ffe9c4;
            &:first-child {
              color: #e43010;
              background-color: #ffbc61;
            }
          }
        }

        article {
          color: #c1630c;
          text-align: justify;
          font-size: 16px;

          padding: 15px 140px 30px 45px;
          p {
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            word-wrap: break-word;
            margin-bottom: 20px;
          }
        }
      }

      .rule-card {
        background-repeat: no-repeat;
        background-position: top 15px right 5px;
        clip-path: polygon(30px 0%, 100% 0, 100% 100%, 0 100%, 0 35px);

        > div {
          padding: 30px 30px 10px 30px;
          p {
            display: flex;
            justify-content: space-between;
            align-items: start;
            span {
              color: #e43010;
              font-size: 48px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
