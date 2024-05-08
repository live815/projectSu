<template>
  <div class="main-container Rebateactivity">
    <header>
      <img :src="getImg(activityConfig.activityTopApp || '')" />
    </header>
    <div class="content">
      <section>
        <ul>
          <li>
            <h3>{{ $t('Fletter.ActivityTime') }}</h3>
            <p>
              {{
                activityConfig.timeType === 2
                  ? $t('Iletter.LongtermActivity')
                  : $t('Activity.Rebate.label6', [' ' + activityConfig.endTime])
              }}
            </p>
          </li>
          <li>
            <h3>{{ $t('Iletter.ActiveObject') }}</h3>
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
            <p v-if="isLogin && config.validAmount && config.cashbackAmount">
              {{
                $t('Activity.Rebate.label7', [
                  CurrencyUnit + config.validAmount?.toLocaleString(),
                  CurrencyUnit + config.cashbackAmount?.toLocaleString()
                ])
              }}
            </p>
          </section>
          <table cellspacing="0">
            <thead>
              <tr>
                <th>{{ $t('Activity.Rebate.label1') }}</th>
                <th>{{ $t('Activity.Rebate.label2') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in config.cashBackThresholds" :key="item.inventoryId">
                <td>
                  {{
                    `${item['operatorDisplay'] + Number(item['validBetAmount']).toLocaleString()}`
                  }}
                </td>
                <td>{{ `${item['cashbackVal'] + item['cashBackUnit']}` }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card rule-card">
          <p>{{ $t('Fletter.ActivityRules') }}</p>
          <article class="block block4">
            <template
              v-for="(item, index) in activityConfig.activityRuleList"
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
</template>

<script setup>
import { getImg } from '@/utils'
import { getCashbackConfig } from '@/api/promotion'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
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
const user = useUserStore()
const isLogin = user.isLogin
const cashbackconfig = ref()

defineProps(['activityConfig'])
const loading = ref('true') // 加载状态

onMounted(async () => {
  document.title = '活动详情'

  try {
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
.Rebateactivity {
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #ff9008;
  header img {
    width: 100%;
  }
  .content {
    padding-bottom: 30px;
    position: relative;
    box-sizing: border-box;
    > section {
      margin: -70px auto 0;
      padding: 0 15px;
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
          width: 171px;

          h3 {
            width: 100%;
            color: #fff;
            font-size: 18px;
            background: linear-gradient(180deg, #ff730a 0%, #ea4d19 100%);
            line-height: 41.46px;
            position: relative;
            font-weight: bold;

            &::before {
              content: '';
              background-image: url(./img/watermark.png);
              position: absolute;
              width: 100%;
              height: 41.46px;
              left: 0;
              background-repeat: no-repeat;
              background-size: 80%;
              background-position: center;
            }
          }
          p {
            width: 100%;
            color: #ee5519;
            font-size: 14px;
            background-color: #fff;
            line-height: 46.435px;
            margin-top: 2px;
          }
        }
      }
      .card {
        margin-top: 8px;
        position: relative;
        background-color: #fff;
        background-image: url(./img/watermark2.png);
        background-repeat: no-repeat;
        background-position: right top;
        background-size: 60%;

        > section {
          min-height: 35px;
          display: flex;
          justify-content: center;
          align-items: start;
          flex-direction: column;
          color: #e43010;
          font-weight: 600;
          padding: 5px 5px 5px 7px;

          font-size: 12px;
          p {
            margin-top: 4px;
            &.title {
              margin-top: unset;
              font-size: 16px;
              display: flex;
              align-items: center;
            }
          }
        }

        table {
          text-align: center;
          width: 100%;
          border-top: 1px solid #ffbd62;
          border-left: 1px solid #ffbd62;

          th,
          td {
            border-right: 1px solid #ffbd62;
            border-bottom: 1px solid #ffbd62;
          }
          th {
            font-size: 14px;
            background: #ffebd0;
            height: 40px;
            color: #e43010;
            font-weight: bold;
          }

          td {
            font-size: 14px;
            height: 40px;
            width: 50%;
            &:nth-child(odd) {
              color: #333;
            }
            &:nth-child(even) {
              color: #c1630c;
            }
          }
        }

        article {
          color: #c1630c;
          text-align: justify;
          font-size: 14px;

          padding: 0 10px 30px 10px;
          p {
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;
            word-wrap: break-word;
            margin-bottom: 10px;
          }
        }
      }

      .rule-card {
        background-repeat: no-repeat;
        background-position: top 10px right 5px;
        clip-path: polygon(25px 0%, 100% 0, 100% 100%, 0 100%, 0 30px);

        > p {
          color: #e43010;
          font-size: 20px;
          line-height: 30px; /* 150% */
          font-weight: bold;
          padding: 20px 0 10px 15px;
        }
      }
    }
  }
}
</style>
