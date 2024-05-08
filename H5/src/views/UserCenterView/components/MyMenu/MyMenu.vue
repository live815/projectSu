<template>
  <div class="my-menu">
    <div class="list">
      <div @click="selectMenu(item)" class="menu-item" v-for="item in list" :key="item.title">
        <div class="img-box">
          <img :src="item.Imgpath" alt="" />
        </div>
        <p>
          <span>{{ item.title }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import i18n from '@/i18n'

const router = useRouter()
const list = [
  {
    title: i18n.global.t('UsercenterView.betrecord'),
    path: '/user-center-bet-record',
    Imgpath: new URL('./img/touzhu.png', import.meta.url).href
  },
  {
    title: i18n.global.t('UsercenterView.Funddetails'),
    path: '/transaction-record',
    Imgpath: new URL('./img/zijin.png', import.meta.url).href
  },
  {
    title: i18n.global.t('UsercenterView.Welfarecenter'),
    path: '/welfare',
    Imgpath: new URL('./img/fuli.png', import.meta.url).href
  },
  {
    title: i18n.global.t('UsercenterView.Promotions'),
    path: '/activity',
    Imgpath: new URL('./img/youhui.png', import.meta.url).href
  },
  {
    title: i18n.global.t('UsercenterView.BusinessCooperation'),
    path: '/business-agent',
    Imgpath: new URL('./img/shangwu.png', import.meta.url).href
  },
  {
    title: i18n.global.t('UsercenterView.Sponsorshipinformat'),
    path: '/sponsor',
    Imgpath: new URL('./img/zanzhu.png', import.meta.url).href
  },
  {
    title: i18n.global.t('UsercenterView.Commontutorials'),
    path: '/help',
    Imgpath: new URL('./img/jiaocheng.png', import.meta.url).href
  },
  {
    title: i18n.global.t('UsercenterView.Securitycenter'),
    path: '/personal-center',
    Imgpath: new URL('./img/anquan.png', import.meta.url).href
  }
]

const selectMenu = (item) => {
  if (item.path) {
    router.push(item.path)
  }
}
// 引用静态图片
</script>

<style lang="scss" scoped>
.my-menu {
  border-radius: 0 0 8px 8px;
  padding: 15px 0 0;
  background: #fff;
  .list {
    overflow: hidden;
    .menu-item {
      float: left;
      width: 25%;
      text-align: center;
      margin-bottom: 15px;
     
      .img-box {
        img {
          width: auto;
          height: 36px;
          margin-bottom: 6px;
        }
      }
      span {
        font-size: 12px;
        color: #111;
      }
    }
  }
}
</style>
