<template>
  <div class="main-container inviteActivity">
    <header>
      <img :src="header" />
    </header>
    <div class="content">
      <section>
        <ul>
          <li>
            <h3>{{ $t('Fletter.ActivityTime') }}</h3>
            <p>{{ $t('Fletter.Long') }}</p>
          </li>
          <li>
            <h3>{{ $t('Fletter.ActiveObject') }}</h3>
            <p>{{ $t('Fletter.titil_1') }}</p>
          </li>
          <li>
            <h3>{{ $t('Activity.Invite.label1') }}</h3>
            <p>{{ $t('Fletter.all') }}</p>
          </li>
        </ul>
        <div class="card">
          <p class="tag" :class="appStore.language + 'tag1'">{{ $t('Fletter.Activities') }}</p>
          <p v-if="appStore.language == 'vi'" :class="appStore.language + 'tit1'" class="tit1">
            {{ $t('Fletter.title_1') }}
            <span>{{ $t('Fletter.title_2') }}</span>
          </p>
          <div class="table">
            <h4 :class="{ vi: appStore.language == 'vi' }">
              <span>{{ $t('Activity.Invite.label5') }}</span>
            </h4>
            <table cellspacing="0">
              <thead>
                <tr>
                  <th>{{ $t('Activity.Invite.label2') }}</th>
                  <th>{{ $t('Activity.Invite.label3') }}</th>
                  <th>{{ $t('Activity.Invite.label4') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in table1" :key="item.label1">
                  <td v-if="appStore.language == 'zh-cn'">{{ item.label1 }}</td>
                  <td v-else>1-175,000</td>
                  <td>{{ item.label2 }}</td>
                  <td>{{ item.label3 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table">
            <h4 :class="{ vi: appStore.language == 'vi' }">
              <span>{{ $t('Activity.Invite.label6') }}</span>
            </h4>
            <table cellspacing="0">
              <thead>
                <tr>
                  <th>{{ $t('Activity.Invite.label7') }}</th>
                  <th>{{ $t('Activity.Invite.label8') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in table2" :key="item.label1">
                  <td>{{ item.label1 }}</td>
                  <td>{{ item.label2 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table">
            <h4 :class="{ vi: appStore.language == 'vi' }">
              <span>{{ $t('Activity.Invite.label9') }}</span>
            </h4>
            <table cellspacing="0">
              <thead>
                <tr>
                  <th>{{ $t('Activity.Invite.label10') }}</th>
                  <th>{{ $t('Activity.Invite.label11') }}</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="appStore.language == 'zh-cn'">
                  <tr v-for="item in table3" :key="item.label1">
                    <td>{{ item.label1 }}</td>
                    <td>{{ item.label2 }}</td>
                  </tr>
                </template>
                <template v-if="appStore.language == 'vi'">
                  <tr v-for="item in table4" :key="item.label1">
                    <td>{{ item.label1 }}</td>
                    <td>{{ item.label2 }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <p :class="appStore.language + 'tag2'" class="tag">{{ $t('Fletter.ActivityRules') }}</p>
          <article>
            <h1 v-if="appStore.language == 'zh-cn'">{{ $t('GeneralUserCenter.InviteFriends') }}</h1>
            <p v-for="index in 10" :key="`Activity.Invite.rule_` + index">
              {{ $t(`Activity.Invite.rule_${index}`) }}
            </p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const header = new URL(`./img/${appStore.language}/header.png`, import.meta.url).href
const table1 = [
  { label1: '1-50000' + i18n.global.t('Activity.Currency'), label2: '1%', label3: '1%' }
]
const table2 = [
  { label1: i18n.global.t('Activity.Sport'), label2: '0.3%' },
  { label1: i18n.global.t('Activity.Live'), label2: '0.1%' },
  { label1: i18n.global.t('Activity.Poker'), label2: '0.2%' },
  { label1: i18n.global.t('Activity.Electronic'), label2: '0.2%' },
  { label1: i18n.global.t('Activity.Fishing'), label2: '0.2%' },
  { label1: i18n.global.t('Activity.Gaming'), label2: '0.3%' },
  { label1: i18n.global.t('Activity.Lottery'), label2: '0.2%' }
]

const table3 = [
  { label1: 'VIP1', label2: '8' },
  { label1: 'VIP2', label2: '18' },
  { label1: 'VIP3', label2: '58' },
  { label1: 'VIP4', label2: '118' },
  { label1: 'VIP5', label2: '288' },
  { label1: 'VIP6', label2: '588' },
  { label1: 'VIP7', label2: '1188' },
  { label1: 'VIP8', label2: '1888' },
  { label1: 'VIP9', label2: '3888' },
  { label1: 'VIP10', label2: '5888' },
  { label1: 'VIP11', label2: '8888' }
]
const table4 = [
  { label1: 'VIP1', label2: '28' },
  { label1: 'VIP2', label2: '63' },
  { label1: 'VIP3', label2: '203' },
  { label1: 'VIP4', label2: '413' },
  { label1: 'VIP5', label2: '1,008' },
  { label1: 'VIP6', label2: '2,058' },
  { label1: 'VIP7', label2: '4,158' },
  { label1: 'VIP8', label2: '6,608' },
  { label1: 'VIP9', label2: '13,608' },
  { label1: 'VIP10', label2: '20,608' },
  { label1: 'VIP11', label2: '31,108' }
]
</script>

<style scoped lang="scss">
.inviteActivity {
  margin: 0 -20px -20px -5px;
  background-color: #e6f7ff;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #e65909;
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
    top: -10px;
    > section {
      width: 1100px;
      margin: -85px auto 0;
      padding-top: 190px;
      ul {
        display: flex;
        gap: 25px;
        padding-left: 0;

        li {
          width: 350px;
          height: 152px;
          background-image: url(./img/frame.png);
          background-size: contain;
          background-repeat: no-repeat;
          text-align: center;
          list-style-type: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          h3 {
            color: #804e14;
            font-size: 26px;
            font-style: normal;
            font-weight: 500;
            line-height: 30px; /* 115.385% */
          }
          p {
            color: #e65909;
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: 30px; /* 125% */
          }
        }
      }
      .card {
        border-radius: 30px;
        background: #fef5ec;
        margin-top: 90px;
        padding: 50px;
        position: relative;
        .tag {
          background-image: url(img/tag.png);
          width: 296px;
          height: 100px;
          background-size: contain;
          position: absolute;
          top: -25px;
          left: 0;
          color: #fff;
          text-align: center;
          line-height: 80px;
          font-family: 'PingFang SC';
          font-size: 34px;
          font-style: normal;
          font-weight: 600;
        }
        .vitag1 {
          background: url(img/vi/pc-bg-2.png) no-repeat;
          background-size: 100% 100%;
          width: 460px;
          height: 100px;
        }
        .vitag2 {
          background: url(img/vi/pc-bg-2.png) no-repeat;
          background-size: 100% 100%;
          width: 520px;
          height: 100px;
        }
        .vitit1 {
          color: #f40002;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.56px;
          margin-top: 20px;
          span {
            border-left: 1px solid;
            padding-left: 3px;
            height: 14px;
            display: inline-flex;
            align-items: center;
          }
        }
        .vi {
          font-size: 28px;
        }
        article {
          color: #804e14;
          font-weight: 500;
          margin-top: 50px;
          h1 {
            font-size: 20px;
            line-height: 30px;
            font-weight: bold;
          }
          p {
            font-size: 16px;
            line-height: 23px;
            margin-top: 20px;
            &:first-child {
              margin-top: 0;
            }
          }
        }

        .table {
          text-align: center;
          margin-top: 50px;
          &:first-child {
            margin-top: 0;
          }
          h4 {
            display: flex;
            justify-content: center;
            span {
              color: #804e14;
              margin-bottom: 30px;
              font-size: 26px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;

              &::after,
              &::before {
                content: '';
                position: absolute;
                background-image: url(img/title-dec.png);
                width: 137px;
                height: 7px;
              }
              &::before {
                transform: rotateY(180deg);
                left: -180px;
              }
              &::after {
                right: -180px;
              }
            }
            &.vi span {
              &::after,
              &::before {
                background-image: unset;
              }
            }
          }
          table {
            border: 1px solid #edcba6;
            width: 100%;
            color: #804e14;

            font-style: normal;
            font-weight: 500;
            line-height: normal;
            th {
              font-size: 18px;
              border: 1px solid #edcba6;
              background: #ffdab0;
              height: 40px;
            }
            td {
              font-size: 16px;
              border: 1px solid #edcba6;
              height: 40px;
              background: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
