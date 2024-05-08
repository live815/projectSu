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
          <div class="card-content">
            <div class="dec">
              <div class="bar" style="transform: rotate(180deg)"></div>
              <img src="./img/Star_2.png" class="star" alt="" srcset="" />
              <p class="tag">
                <span>
                  {{ $t('Activity.Royal.label6') }}
                </span>
              </p>
              <img src="./img/Star_2.png" class="star" alt="" srcset="" />
              <div class="bar"></div>
            </div>
            <p>
              使用银行卡、USDT、EBPAY存款，单笔享受0.5%存款优惠。使用银行卡预约提现，单笔最高可享受0.5%取款优惠。
            </p>
            <table cellspacing="1">
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
                  <td>银行卡、USDT、EBPAY</td>
                  <td>0.5%</td>
                  <td>预约银行卡</td>
                  <td>最高0.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="dec">
              <div class="bar" style="transform: rotate(180deg)"></div>
              <img src="./img/Star_2.png" class="star" alt="" srcset="" />
              <p class="tag">
                <span>
                  {{ $t('Activity.Royal.label5') }}
                </span>
              </p>
              <img src="./img/Star_2.png" class="star" alt="" srcset="" />
              <div class="bar"></div>
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
const header = new URL(`./img/header.png`, import.meta.url).href
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
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
    box-sizing: border-box;
    > section {
      width: 1100px;
      margin: -50px auto 0;
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
        background-image: linear-gradient(269deg, #ff7581 0.03%, #ff0101 98.74%);
        padding-top: 8px;
        .card-content {
          background: #fff;
          width: 100%;
          padding: 15px;
          border-radius: 20px;
          > p {
            color: #e43010;
            font-size: 16px;
            font-weight: bold;
            line-height: 30px; /* 187.5% */
            margin-left: 15px;
            text-align: center;
            margin: 5px 0;
          }
          .dec {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            .tag {
              color: #f05919;
              font-size: 48px;
              font-weight: 700;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              span {
                z-index: 1;
                height: 50px;
              }
              &::before {
                content: '';
                position: absolute;
                top: 2px;
                display: block;
                background-image: url(./img/watermark2.png);
                background-size: contain;
                height: 48px;
                width: 500px;
                background-position: center;
                background-repeat: no-repeat;
              }
            }
            .star {
              margin: 5px 12px 0;
              width: 14px;
              z-index: 1;
            }
            .bar {
              width: 32px;
              height: 2px;
              border-radius: 1px;
              background: linear-gradient(90deg, #f05919 0%, #ff616b 100%);
              z-index: 1;
              margin-top: 7px;
            }
          }
        }

        article {
          padding: 0 35px;
          dl {
            margin-left: 15px;
            dt {
              color: #c1630c;
              font-size: 16px;
              font-weight: 400;
              margin-bottom: 20px;
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
                top: 12px;
              }
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
          td {
            font-size: 16px;
            height: 60px;
            background: #fff3e0;
          }
        }
      }
    }
  }
}
</style>
