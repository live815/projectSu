<template>
  <div class="main-container">
    <div class="content" :style="[`background-image:url(${header})`]">
      <section>
        <ul>
          <li>
            <h3>{{ $t('Fletter.ActivityTime') }}</h3>
            <p>{{ $t('GeneralUserCenter.LongtermActivities') }}</p>
          </li>
          <li>
            <h3>{{ $t('GeneralUserCenter.ActiveObject') }}</h3>
            <p>{{ $t('Activity.Suggest.label14') }}</p>
          </li>
        </ul>
        <div class="card">
          <p class="tag">{{ $t('Activity.Royal.label6') }}</p>
          <div class="card-content">
            <p>{{ $t('Activity.Suggest.label1') }}</p>
            <p>{{ $t('Activity.Suggest.label2') }}</p>
            <p>{{ $t('Activity.Suggest.label3') }}</p>
            <table cellspacing="1">
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
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const header = new URL(`./img/${appStore.language}/header.png`, import.meta.url).href
</script>

<style scoped lang="scss">
div.main-container {
  margin: 0 -20px -20px -5px;

  background-color: #e6f7ff;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #ffa935;
  .content {
    padding-bottom: 70px;
    background-size: 1720px;
    background-repeat: no-repeat;
    background-position: center top;
    position: relative;
    box-sizing: border-box;
    > section {
      width: 1100px;
      margin: 0 auto;
      padding-top: 580px;
      ul {
        display: flex;
        gap: 40px;
        padding-left: 0;

        li {
          text-align: center;
          list-style-type: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          width: 530px;
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
          background-image: url(./img/tag.png);
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
            dd {
              color: #e43010;
              font-size: 16px;
              font-weight: 600;
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
          font-weight: 600;
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
