<template>
  <div class="main-container royalactivity">
    <NavBar
      :title="$route.query.title"
      :isShowRight="false"
      v-if="!isCTYWebApp() && !isIOSPure()"
      ellipsis=""
    />
    <header>
      <img :src="header" />
    </header>
    <div class="content">
      <section>
        <ul>
          <li>
            <h3>{{ $t('Fletter.ActivityTime') }}</h3>
            <p>{{ $t('Iletter.LongtermActivity') }}</p>
          </li>
          <li>
            <h3>{{ $t('Iletter.ActiveObject') }}</h3>
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
            <p>{{ $t('Activity.Royal.label3', { num: '|' }) }}</p>
            <div class="btn"></div>
            <div class="title">
              <table cellspacing="0" :class="appStore.language === 'vi' && 'tableVi'">
                <thead>
                  <tr>
                    <th>{{ $t('Activity.label7') }}</th>
                    <th>{{ $t('Vletter.tip5') }}</th>
                    <th>{{ $t('Activity.Royal.label4') }}</th>
                    <th>{{ $t('Vletter.Relegaturnover') }}</th>
                    <th>{{ $t('Vletter.title6666') }}</th>
                    <th>{{ $t('Vletter.title5555') }}</th>
                    <th>{{ $t('Vletter.title7777') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in appStore.language == 'vi' ? tableVi : table1"
                    :key="item.label1"
                  >
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
        </div>
        <div class="card">
          <p
            class="tag"
            :class="appStore.language === 'vi' && 'tagVi'"
            :style="[`background-image:url(${tagBG})`]"
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
import { isCTYWebApp, isIOSPure } from '@/utils'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const header = new URL(`./img/${appStore.language}/header.png`, import.meta.url).href
const tagBG = new URL(`./img/${appStore.language}/tag.png`, import.meta.url).href

onMounted(() => {
  document.title = '活动详情'
})
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
    label3: '100,00',
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
.royalactivity {
  background-color: #e6f7ff;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #ffa935;
  header img {
    width: 100%;
  }
  .content {
    padding-bottom: 30px;
    background-image: url(./img/container-bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
    box-sizing: border-box;
    > section {
      margin: -60px auto 0;
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
          font-weight: 500;
          width: 113.051px;
          // height: 68px;
          h3 {
            width: 100%;
            color: #fff;
            font-size: 16px;
            background: linear-gradient(180deg, #ff7c13 0%, #eb4e1a 100%);
            height: 50px;
            //  line-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &::before {
              content: '';
              background-image: url(./img/watermark.png);
              position: absolute;
              width: 100%;
              height: 38px;
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
            line-height: 30px;
            margin-top: 2px;
          }
        }
      }
      .card {
        margin-top: 20px;
        position: relative;
        &::after {
          content: '';
          background-image: url(./img/watermark2.png);
          position: absolute;
          width: 100%;
          height: 30px;
          top: 8px;
          right: 5px;
          background-repeat: no-repeat;
          background-position: right;
          z-index: 1;
          background-size: contain;
        }

        .card-content {
          background: #fff;
          width: 100%;
          padding: 50px 15px 15px;
          border-radius: 15px;
          border-top: 5px solid rgb(254, 47, 1);

          > p {
            color: #e43010;
            font-size: 13px;
            font-weight: bold;
            line-height: 20px; /* 187.5% */
          }
        }

        .tag {
          background-image: url(./img/zh-cn/tag.png);
          width: 120px;
          background-size: contain;
          position: absolute;
          top: -8px;
          color: #fff;
          text-align: center;
          line-height: 52px;
          font-size: 20px;
          font-weight: 600;
          background-repeat: no-repeat;
          padding-right: 10px;

          &.tagVi {
            width: 190px;
            font-size: 14px;
            position: absolute;
            z-index: 2;
          }
        }

        article {
          dl {
            margin-left: 15px;
            dt {
              color: #c1630c;
              font-size: 18px;
              font-weight: 600;
              line-height: 15px;
              position: relative;
              display: flex;
              align-items: center;
              margin-bottom: 10px;

              &::before {
                position: absolute;
                content: '';
                background-image: url(./img/point.png);
                width: 4px;
                height: 4px;
                left: -14px;
              }
            }
            dd {
              color: #c1630c;
              font-size: 14px;
              font-weight: 400;
              line-height: 24px;
              word-wrap: break-word;
              margin-bottom: 10px;
            }
          }
        }

        .btn {
          position: relative;
          margin: 14px -15px 0;
          &::before,
          &::after {
            content: '';
            position: absolute;
            height: 40px;
            width: 12px;
            background-size: contain;
            top: 1px;
            left: 0;
            background-image: url(./img/scroll-btn.png);
          }
          &::before {
            transform: rotateY(180deg);
          }
          &::after {
            left: calc(100% - 12px);
          }
        }

        .title {
          overflow-x: auto;
          margin: 15px -15px 0;

          table {
            &.tableVi {
              width: 950px;
            }
            width: 700px;
            color: #c1630c;
            text-align: center;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            th {
              font-size: 14px;
              background: linear-gradient(180deg, #ffa120 0%, #ffb320 100%);
              height: 40px;
              color: #e43010;
            }
            tbody {
              tr {
                &:nth-child(even) td {
                  background: #fffcf5;
                }
                &:nth-child(odd) td {
                  background: #fff;
                }
              }
            }
            td {
              font-size: 14px;
              height: 45px;
              border: 1px solid #ffbd62;
            }
          }
        }
      }
    }
  }
}
</style>
