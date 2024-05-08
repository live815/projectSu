<template>
  <div class="main-container">
    <header>
      <img :src="header" />
    </header>
    <div class="content">
      <section>
        <ul>
          <li>
            <h3>{{ $t('Fletter.ActivityTime') }}</h3>
            <p>{{ $t('GeneralUserCenter.LongtermActivities') }}</p>
          </li>
          <li>
            <h3>{{ $t('GeneralUserCenter.ActiveObject') }}</h3>
            <p>{{ $t('Activity.Royal.label7') }}</p>
          </li>
          <li>
            <h3>{{ $t('Activity.Royal.label1') }}</h3>
            <p>{{ $t('Activity.Royal.label8') }}</p>
          </li>
        </ul>
        <div class="card">
          <p class="tag">{{ $t('Activity.Royal.label6') }}</p>
          <div class="card-content">
            <p>{{ $t('Activity.Royal.label2') }}</p>
            <p>{{ $t('Activity.Royal.label3',{num:'|'}) }}</p>
            <table cellspacing="1">
              <thead>
                <tr>
                  <th>{{ $t('Activity.label7') }}</th>
                  <th>{{ $t('GeneralUserCenter.AccumulatedDeposits') }}</th>
                  <th>{{ $t('Activity.Royal.label4') }}</th>
                  <th>{{ $t('GeneralUserCenter.RelegationTurnover') }}</th>
                  <th>{{ $t('GeneralUserCenter.UpgradeGifttwo') }}</th>
                  <th>{{ $t('GeneralUserCenter.relegationBonus') }}</th>
                  <th>{{ $t('GeneralUserCenter.BirthdayGiftwo') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in appStore.language == 'vi' ? tableVi : table1" :key="item.label1">
                  <td>{{ item.label1 }}</td>
                  <td>{{ item.label2 }}</td>
                  <td>{{ item.label3 }}</td>
                  <td>{{ item.label4 }}</td>
                  <td>{{ item.label5 }}</td>
                  <td>{{ item.label6 }}</td>
                  <td>{{ item.label7 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <p
            class="tag"
            :style="[
              `background-image:url(${tagBG})`,
              appStore.language === 'vi' && 'width:570px;top:-8px'
            ]"
          >
            {{ $t('Activity.Royal.label5') }}
          </p>
          <div class="card-content">
            <article>
              <dl>
                <dt>{{ $t('Activity.Royal.rule_title_1') }}</dt>
                <dd>
                  {{ $t('Activity.Royal.rule_1') }}
                </dd>
                <dt>{{ $t('Activity.Royal.rule_title_2') }}</dt>
                <dd>{{ $t('Activity.Royal.rule_2') }}</dd>
                <dt>{{ $t('Activity.Royal.rule_title_3') }}</dt>
                <dd>
                  {{ $t('Activity.Royal.rule_3') }}
                </dd>
                <dt>{{ $t('Activity.Royal.rule_title_4') }}</dt>
                <dd>
                  {{ $t('Activity.Royal.rule_4') }}
                </dd>
                <dt>{{ $t('Activity.Royal.rule_title_5') }}</dt>
                <dd>
                  {{ $t('Activity.Royal.rule_5') }}
                </dd>
                <dt>{{ $t('Activity.Royal.rule_title_6') }}</dt>
                <dd>
                  {{ $t('Activity.Royal.rule_6') }}
                </dd>
                <dt>{{ $t('Activity.Royal.rule_title_7') }}</dt>
                <dd>
                  {{ $t('Activity.Royal.rule_7') }}
                </dd>
                <dt>{{ $t('Activity.Royal.rule_title_8') }}</dt>
                <dd>
                  <p>
                    {{ $t('Activity.Royal.rule_8') }}
                  </p>
                  <p>
                    {{ $t('Activity.Royal.rule_9') }}
                  </p>
                  <p>{{ $t('Activity.Royal.rule_10') }}</p>
                </dd>
                <dd>
                  {{ $t('Activity.Royal.rule_11') }}
                </dd>
                <dd>
                  {{ $t('Activity.Royal.rule_12') }}
                </dd>
              </dl>
            </article>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const header = new URL(`./img/${appStore.language}/header.png`, import.meta.url).href
const tagBG = new URL(`./img/${appStore.language}/tag.png`, import.meta.url).href

const table1 = [
  { label1: 'VIP0', label2: '/', label3: '/', label4: '/', label5: '/', label6: '/', label7: '/' },
  {
    label1: 'VIP1',
    label2: '任意金额',
    label3: '/',
    label4: '/',
    label5: '/',
    label6: '/',
    label7: '/'
  },
  {
    label1: 'VIP2',
    label2: '500',
    label3: '10,000',
    label4: '4,000',
    label5: '28',
    label6: '18',
    label7: '/'
  },
  {
    label1: 'VIP3',
    label2: '1,000',
    label3: '50,000',
    label4: '30,000',
    label5: '88',
    label6: '38',
    label7: '58'
  },
  {
    label1: 'VIP4',
    label2: '10,000',
    label3: '300,000',
    label4: '150,000',
    label5: '188',
    label6: '88',
    label7: '158'
  },
  {
    label1: 'VIP5',
    label2: '50,000',
    label3: '1,500,000',
    label4: '500,000',
    label5: '588',
    label6: '288',
    label7: '258'
  },
  {
    label1: 'VIP6',
    label2: '100,000',
    label3: '5,000,000',
    label4: '1,500,000',
    label5: '1,088',
    label6: '588',
    label7: '588'
  },
  {
    label1: 'VIP7',
    label2: '300,000',
    label3: '10,000,000',
    label4: '3,600,000',
    label5: '1,888',
    label6: '988',
    label7: '888'
  },
  {
    label1: 'VIP8',
    label2: '500,000',
    label3: '30,000,000',
    label4: '9,000,000',
    label5: '5,088',
    label6: '2,888',
    label7: '1,888'
  },
  {
    label1: 'VIP9',
    label2: '1,000,000',
    label3: '80,000,000',
    label4: '25,000,000',
    label5: '10,888',
    label6: '5,888',
    label7: '5,888'
  },
  {
    label1: 'VIP10',
    label2: '1,500,000',
    label3: '200,000,000',
    label4: '80,000,000',
    label5: '38,888',
    label6: '18,888',
    label7: '11,888'
  },
  {
    label1: 'VIP11',
    label2: '2,000,000',
    label3: '588,888,888',
    label4: '200,000,000',
    label5: '88,888',
    label6: '58,888',
    label7: '18,888'
  }
]

const tableVi = [
  { label1: 'VIP0', label2: '/', label3: '/', label4: '/', label5: '/', label6: '/', label7: '/' },
  {
    label1: 'VIP1',
    label2: 'Nạp ≥1',
    label3: '/',
    label4: '/',
    label5: '/',
    label6: '/',
    label7: '/'
  },
  {
    label1: 'VIP2',
    label2: '1,750',
    label3: '35,000',
    label4: '14,000',
    label5: '98',
    label6: '63',
    label7: '/'
  },
  {
    label1: 'VIP3',
    label2: '3,500',
    label3: '175,000',
    label4: '105,000',
    label5: '308',
    label6: '133',
    label7: '203'
  },
  {
    label1: 'VIP4',
    label2: '35,000',
    label3: '1,050,000',
    label4: '525,000',
    label5: '658',
    label6: '308',
    label7: '553'
  },
  {
    label1: 'VIP5',
    label2: '175,000',
    label3: '5,250,000',
    label4: '1,750,000',
    label5: '2,058',
    label6: '1,008',
    label7: '903'
  },
  {
    label1: 'VIP6',
    label2: '350,000',
    label3: '17,500,000',
    label4: '5,250,000',
    label5: '3,808',
    label6: '2,058',
    label7: '2,058'
  },
  {
    label1: 'VIP7',
    label2: '1,050,000',
    label3: '35,000,000',
    label4: '12,600,000',
    label5: '6,608',
    label6: '3,458',
    label7: '3,108'
  },
  {
    label1: 'VIP8',
    label2: '1,750,000',
    label3: '105,000,000',
    label4: '31,500,000',
    label5: '17,808',
    label6: '10,108',
    label7: '6,608'
  },
  {
    label1: 'VIP9',
    label2: '3,500,000',
    label3: '280,000,000',
    label4: '87,500,000',
    label5: '38,108',
    label6: '20,608',
    label7: '20,608'
  },
  {
    label1: 'VIP10',
    label2: '5,250,000',
    label3: '700,000,000',
    label4: '280,000,000',
    label5: '136,108',
    label6: '66,108',
    label7: '41,608'
  },
  {
    label1: 'VIP11',
    label2: '7,000,000',
    label3: '2,061,111,108',
    label4: '700,000,000',
    label5: '311,108',
    label6: '206,108',
    label7: '66,108'
  }
]
</script>

<style scoped lang="scss">
div.main-container {
  margin: 0 -20px -20px -5px;

  background-color: #e6f7ff;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #ffa935;
  header img {
    width: 100%;
  }
  .content {
    padding-bottom: 70px;
    background-image: url(./img/container-bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
    box-sizing: border-box;
    > section {
      width: 1100px;
      margin: -130px auto 0;
      ul {
        display: flex;
        gap: 25px;
        padding-left: 0;

        li {
          text-align: center;
          list-style-type: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          width: 356px;
          h3 {
            width: 100%;
            color: #fff;
            font-size: 32px;
            border-radius: 10px 10px 0px 0px;
            background: linear-gradient(180deg, #ff7c13 0%, #eb4e1a 100%);
            line-height: 75px;
            position: relative;
            &::before {
              content: '';
              background-image: url(./img/watermark.png);
              position: absolute;
              width: 100%;
              height: 75px;
              left: 0;
              background-repeat: no-repeat;
              background-size: 70%;
              background-position: center;
            }
          }
          p {
            width: 100%;
            color: #ee5519;
            font-size: 24px;
            background-color: #fff;
            line-height: 84px;
            border-radius: 0px 0px 10px 10px;
          }
        }
      }
      .card {
        border-radius: 17px 17px 20px 20px;
        margin-top: 35px;
        position: relative;
        background-image: linear-gradient(269deg, #ff3e00 0.03%, #ff0101 98.74%);
        padding-top: 8px;
        &::after {
          content: '';
          background-image: url(./img/watermark2.png);
          position: absolute;
          width: 100%;
          height: 75px;
          top: 15px;
          right: 15px;
          background-repeat: no-repeat;
          background-position: right;
          z-index: 10;
          background-size: contain;
        }

        .card-content {
          background: #fff;
          width: 100%;
          padding: 110px 15px 15px;
          border-radius: 20px;
          > p {
            color: #e43010;
            font-size: 16px;
            font-weight: bold;
            line-height: 30px; /* 187.5% */
            margin-left: 15px;
          }
        }

        .tag {
          background-repeat: no-repeat;
          background-image: url(./img/zh-cn/tag.png);
          width: 272px;
          height: 100px;
          background-size: contain;
          position: absolute;
          top: -9px;
          left: 0;
          color: #fff;
          text-align: center;
          line-height: 100px;
          font-size: 48px;
          font-weight: 600;
        }

        article {
          padding: 0 35px;
          dl {
            margin-left: 15px;
            dt {
              color: #c1630c;
              font-size: 19px;
              font-weight: 600;
              line-height: 25px;
              position: relative;
              display: flex;
              align-items: center;

              &::before {
                position: absolute;
                content: '';
                background-image: url(./img/point.png);
                width: 6px;
                height: 6px;
                left: -20px;
                margin-top: 5px;
              }
            }
            dd {
              color: #c1630c;
              font-size: 16px;
              font-weight: 400;
              margin-bottom: 20px;
              line-height: 25px;
            }
          }
        }

        table {
          width: 100%;
          color: #804e14;
          text-align: center;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          th {
            font-size: 18px;
            background: linear-gradient(180deg, #ffa120 0%, #ffb320 100%);
            height: 60px;
            color: #e43010;
          }
          tbody {
            tr {
              &:nth-child(even) td {
                background: #fff3e0;
              }
              &:nth-child(odd) td {
                background: #fff8ed;
              }
            }
          }
          td {
            font-size: 16px;
            height: 60px;
          }
        }
      }
    }
  }
}
</style>
