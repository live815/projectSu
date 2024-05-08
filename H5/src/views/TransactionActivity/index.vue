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
          <div class="card-content" style="border-radius: 5px; padding: 15px 1px">
            <div class="dec">
              <img
                src="./img/Rectangle_22615.png"
                style="transform: rotate(180deg)"
                class="bar"
                alt=""
                srcset=""
              />
              <img src="./img/Star_2.png" class="star" alt="" srcset="" />
              <p class="tag">
                <span>
                  {{ $t('Activity.Royal.label6') }}
                </span>
              </p>
              <img src="./img/Star_2.png" class="star" alt="" srcset="" />
              <img src="./img/Rectangle_22615.png" class="bar" alt="" srcset="" />
            </div>
            <p>使用银行卡、USDT、EBPAY存款，单笔享受0.5%存款优惠。</p>
            <p style="margin-bottom: 10px">使用银行卡预约提现，单笔最高可享受0.5%取款优惠。</p>
            <table cellspacing="0" :class="appStore.language === 'vi' && 'tableVi'">
              <thead>
                <tr>
                  <th>存款方式</th>
                  <th>优惠比例</th>
                  <th>取款方式</th>
                  <th>优惠比例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>银行卡、USDT<br />EBPAY</td>
                  <td style="color: #e43010">0.5%</td>
                  <td>预约<br />银行卡</td>
                  <td>最高0.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="dec">
              <img
                src="./img/Rectangle_22616.png"
                style="transform: rotate(180deg)"
                class="bar"
                alt=""
                srcset=""
              />
              <img src="./img/Star_2.png" class="star" alt="" srcset="" />
              <p class="tag">
                <span>
                  {{ $t('Activity.Royal.label5') }}
                </span>
              </p>
              <img src="./img/Star_2.png" class="star" alt="" srcset="" />
              <img src="./img/Rectangle_22616.png" class="bar" alt="" srcset="" />
            </div>
            <article>
              <dl>
                <dt>
                  1.
                  本活动与平台其它活动共享，满足条件即可参加，礼金直接派发至会员账号钱包，礼金5倍有效流水即可提款；
                </dt>
                <dt>
                  2.
                  每个会员仅限使用一个账号参与本次活动（手机号码/电子邮箱/户籍地址/现居地址/银行卡/IP地址/电脑或上网设备以及其他信息相同均视为同一账号），违规不享受该活动；
                </dt>
                <dt>
                  3.
                  此活动为平台提供给真实会员的福利，任何用户或团体以不正常的方式投注、套取活动优惠，平台保留在不通知的情况下冻结账户的权力，并不退还款项；
                </dt>
                <dt>
                  4.
                  V体育平台有权对该活动进行修改、暂停、取消等，无需特别通知，并保留对该活动的最终解释权。
                </dt>
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
const header = new URL(`./img/header.png`, import.meta.url).href

onMounted(() => {
  document.title = '活动详情'
})
</script>

<style scoped lang="scss">
.royalactivity {
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
          h3 {
            width: 100%;
            color: #fff;
            font-size: 16px;
            background: linear-gradient(180deg, #ff7c13 0%, #eb4e1a 100%);
            height: 50px;
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
        .card-content {
          background: #fff;
          width: 100%;
          padding: 15px;
          border-radius: 15px;
          > p {
            color: #e43010;
            font-size: 12.5px;
            font-weight: bold;
            line-height: 17px; /* 187.5% */
          }

          .dec {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            .tag {
              color: #f05919;
              font-size: 20px;
              font-weight: 600;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              span {
                z-index: 1;
              }
              &::before {
                content: '';
                position: absolute;
                top: 2px;
                display: block;
                background-image: url(./img/watermark2.png);
                background-size: contain;
                height: 18px;
                width: 130px;
                background-position: center;
                background-repeat: no-repeat;
              }
            }
            .star {
              margin: 0 12px;
              width: 14px;
              z-index: 1;
            }
            .bar {
              height: 3px;
              z-index: 1;
            }
          }
        }

        article {
          dl {
            margin-left: 15px;
            dt {
              display: flex;
              align-items: center;
              position: relative;
              color: #c1630c;
              font-size: 14px;
              font-weight: 400;
              line-height: 24px;
              margin-bottom: 10px;

              &::before {
                position: absolute;
                content: '';
                background-image: url(./img/point.png);
                background-size: contain;
                width: 4px;
                height: 4px;
                left: -14px;
                top: 10px;
              }
            }
          }
        }

        table {
          width: 100%;
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
          td {
            background: #fffcf5;
            font-size: 14px;
            height: 45px;
            font-weight: 500;
            border-bottom: 1px solid #ffbd62;
            border-left: 1px solid #ffbd62;
            &:last-child {
              border-right: 1px solid #ffbd62;
            }
          }
        }
      }
    }
  }
}
</style>
