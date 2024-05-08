<template>
  <div class="main-container royalactivity">
    <NavBar
      :title="$route.query.title"
      :isShowRight="false"
      v-if="!isCTYWebApp() && !isIOSPure()"
      ellipsis=""
    />
    <div class="content" :style="[`background-image:url(${header})`]">
      <section>
        <ul>
          <li>
            <h3>{{ $t('Fletter.ActivityTime') }}</h3>
            <p>{{ $t('Iletter.LongtermActivity') }}</p>
          </li>
          <li>
            <h3>{{ $t('Iletter.ActiveObject') }}</h3>
            <p>{{ $t('Activity.Suggest.label14') }}</p>
          </li>
        </ul>
        <div class="card">
          <p class="tag">{{ $t('Activity.Royal.label6') }}</p>
          <div class="card-content">
            <p>{{ $t('Activity.Suggest.label1') }}</p>
            <p>{{ $t('Activity.Suggest.label2') }}</p>
            <p>{{ $t('Activity.Suggest.label3') }}</p>
            <div class="btn"></div>
            <div class="title">
              <table cellspacing="0">
                <thead>
                  <tr>
                    <th>{{ $t('Activity.Suggest.label4') }}</th>
                    <th>{{ $t('Activity.Suggest.label5') }}</th>
                    <th>{{ $t('Activity.Suggest.label6') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ $t('Activity.Suggest.label7') }}</td>
                    <td>{{ $t('Activity.Suggest.label8') }}</td>
                    <td>{{ $t('Activity.Suggest.label9') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="card">
          <p class="tag">
            {{ $t('Activity.Suggest.label15') }}
          </p>
          <div class="card-content">
            <article>
              <dl>
                <dd>{{ $t('Activity.Suggest.label10') }}</dd>
                <dd>{{ $t('Activity.Suggest.label11') }}</dd>
                <dd>{{ $t('Activity.Suggest.label12') }}</dd>
                <dd>{{ $t('Activity.Suggest.label13') }}</dd>
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

onMounted(() => {
  document.title = '活动详情'
})
</script>

<style scoped lang="scss">
.royalactivity {
  background-color: #e6f7ff;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #ffa935;
  .content {
    padding-bottom: 30px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center top;
    position: relative;
    box-sizing: border-box;
    > section {
      margin: 0px auto;
      padding: 340px 15px 0;
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
          width: 49.6%;
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
          background-image: url(./img/tag.png);
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
        }

        article {
          dl {
            dd {
              color: #e43010;
              font-size: 14px;
              font-weight: 600;
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
          margin: 15px 0;

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

              &:first-child {
                border-top-left-radius: 5px;
              }
              &:last-child {
                border-top-right-radius: 5px;
              }
            }

            td {
              font-size: 14px;
              height: 45px;
              background: #fffcf5;
              border-bottom: 1px solid #ffbd62;
              border-left: 1px solid #ffbd62;
              &:last-child {
                border-right: 1px solid #ffbd62;
                border-bottom-right-radius: 5px;
              }
              &:first-child {
                border-bottom-left-radius: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
