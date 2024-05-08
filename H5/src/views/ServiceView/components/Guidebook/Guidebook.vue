<template>
  <div class="new-education">
    <h3>{{ $t('serviceview.beginnerTutorial') }}</h3>
    <div class="new-edu-content">
      <div
        class="content-item"
        @click="onClickGoTutorial(item)"
        v-for="item in list"
        :key="item.id"
      >
        <img :src="item.src" alt="error" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useRouter } from 'vue-router'

const router = useRouter()

const list = [
  {
    id: '1',
    title: i18n.global.t('serviceview.Depositutorial'),
    src: new URL('./img/store-edu.png', import.meta.url).href
  },
  {
    id: '2',
    title: i18n.global.t('serviceview.Withdrawaltutorial'),
    src: new URL('./img/take-edu.png', import.meta.url).href
  },
  {
    id: '3',
    title: i18n.global.t('serviceview.Bettutorial'),
    src: new URL('./img/bet-edu.png', import.meta.url).href
  },
  {
    id: '4',
    title: i18n.global.t('serviceview.sportsrules'),
    src: new URL('./img/sport-rule.png', import.meta.url).href
  }
]

const onClickGoTutorial = (item) => {
  switch (item.id) {
    case '1':
      return router.push({ path: '/help', query: { activeNames: 0 } })
    case '2':
      return router.push({ path: '/help', query: { activeNames: 1 } })
    case '3':
      return router.push({ path: '/BetRule' })
    case '4':
      return router.push({ path: '/BetRule', query: { activeNames: 1 } })
  }
}
</script>

<style lang="scss" scoped>
.new-education {
  margin-top: 15px;
  padding-top: 17px;
  padding-left: 15px;
  border-radius: 12px;
  background: #fff;
  h3 {
    color: #ff5000;
    font-weight: 600;
  }
  .new-edu-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 15px;
    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr 1fr;
    // gap:10px;
    margin-top: 23px;
    .content-item {
      display: flex;
      flex-direction: column;
      // flex:1;
      justify-content: center;
      align-items: center;
      text-align: center;
      img {
        width: 46px;
      }
      p {
        margin-top: 9px;
        margin-bottom: 14px;
        font-size: 12px;
      }
    }
    // .sport-rule {
    //   width: 40px !important;
    // }
    .content-item:nth-child(4) img {
      width: 40px !important;
    }
  }
}
</style>
