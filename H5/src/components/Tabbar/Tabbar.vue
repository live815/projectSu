<template>
  <van-tabbar :border="false" class="tabbar-wrapper" route>
    <van-tabbar-item
      v-for="item in tabList"
      :key="item.path"
      :to="item.path"
      :badge="item.badge"
    >
      <!-- 标题 -->
      <span class="label">{{ item.title }} </span>
      <template #icon="props">
        <div
          v-if="!item.isCenter"
          :class="{
            elastic: props.active,
            'vi-icon-box': site === 'vietnam'
          }"
          class="icon-box"
        >
          <img
            :class="{ 'tab-icon': site === 'vietnam' }"
            :src="props.active ? item.activeIcon : item.inactiveIcon"
          />
        </div>
        <!-- 中间的按钮 -->
        <div v-else class="center icon-box">
          <img v-if="!props.active" :src="item.inactiveIcon" />
          <div v-else class="home-ani">
            <div class="dome"></div>
            <div
              class="left-img"
              :class="{
                animated: props.active,
                bounceInLeft: props.active
              }"
            ></div>
            <div
              class="right-img"
              :class="{
                animated: props.active,
                bounceInRight: props.active
              }"
            ></div>
          </div>
        </div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
// import { useRoute } from 'vue-router'
// const route = useRoute()
import { useAnnouncementStore } from '@/stores/announcement'
import { useAppStore } from '@/stores/app'
import i18n from '@/i18n/index'
import { computed } from 'vue'
const appStore = useAppStore()
const announcement = useAnnouncementStore()
const unreadNum = computed(() => announcement.totalUnread)
const site = import.meta.env.VITE_SITE
const listZh = computed(() => {
  let res = [
    {
      title: i18n.global.t('common.promotion'),
      path: '/activity',
      activeIcon: new URL('./img/activity-active.png', import.meta.url).href,
      inactiveIcon: new URL('./img/activity-inactive.png', import.meta.url).href
    },
    {
      title: i18n.global.t('common.home'),
      path: '/',
      inactiveIcon: new URL('./img/home-inactive.png', import.meta.url).href,
      isCenter: true
    },
    {
      title: i18n.global.t('common.live'),
      path: '/live',
      activeIcon: new URL('./img/live-active.png', import.meta.url).href,
      inactiveIcon: new URL('./img/live-inactive.png', import.meta.url).href
    },
    {
      badge: unreadNum.value ? unreadNum.value : null,
      title: i18n.global.t('common.usercenter'),
      path: '/user-center',
      activeIcon: new URL('./img/user-active.png', import.meta.url).href,
      inactiveIcon: new URL('./img/user-inactive.png', import.meta.url).href
    }
    // {
    //   title: '发现',
    //   path: '/discover',
    //   activeIcon: new URL('./img/discover-active.png', import.meta.url).href,
    //   inactiveIcon: new URL('./img/discover-inactive.png', import.meta.url).href
    // },
    // {
    //   title: '注单',
    //   path: '/bet-record',
    //   activeIcon: new URL('./img/bet-record-active.png', import.meta.url).href,
    //   inactiveIcon: new URL('./img/bet-record-inactive.png', import.meta.url).href
    // },
  ]
  const CSport = {
    title: i18n.global.t('common.sportLive'),
    path: '/sports',
    activeIcon: new URL('./img/sports-active.png', import.meta.url).href,
    inactiveIcon: new URL('./img/sports-inactive.png', import.meta.url).href
  }
  if (appStore.isCSportOpen) {
    res.unshift(CSport)
  }
  return res
})

const listVi = computed(() => {
  let res = [
    {
      title: 'Trang Chủ',
      path: '/',
      activeIcon: new URL('./img//vi/home-active.png', import.meta.url).href,
      inactiveIcon: new URL('./img//vi/home-inactive.png', import.meta.url).href
    },
    {
      title: 'Khuyến Mãi', 
      path: '/activity',
      activeIcon: new URL('./img//vi/activity-active.png', import.meta.url).href,
      inactiveIcon: new URL('./img//vi/activity-inactive.png', import.meta.url).href
    },
    {
      title: 'CSKH',
      path: '/service',
      activeIcon: new URL('./img/vi/serve-active.png', import.meta.url).href,
      inactiveIcon: new URL('./img/vi/serve-inactive.png', import.meta.url).href
    },
    {
      badge: unreadNum.value ? unreadNum.value : null,
      title: 'Cá Nhân',
      path: '/user-center',
      activeIcon: new URL('./img/vi/user-active.png', import.meta.url).href,
      inactiveIcon: new URL('./img/vi/user-inactive.png', import.meta.url).href
    }
  ]
  const CSport = {
    title: 'Trong Trận',
    path: '/sports',
    activeIcon: new URL('./img/vi/sports-active.png', import.meta.url).href,
    inactiveIcon: new URL('./img/vi/sports-inactive.png', import.meta.url).href
  }
  if (appStore.isCSportOpen) {
    res.splice(1, 0, CSport)
  }
  return res
})
const tabList = computed(() => {
  switch (site) {
    case 'cn':
      return listZh.value
    case 'vietnam':
      return listVi.value
    default:
      return listZh.value
  }
})
</script>

<style lang="scss" scoped>
.tabbar-wrapper {
  box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 10;
  .label {
    font-size: 12px;
  }
  .active {
    color: #ff5000;
  }
  .icon-box {
    $iconSize: 30px;
    width: $iconSize;
    height: $iconSize;
    img {
      height: 100%;
    }
    &.center {
      $iconBigSize: 58px;
      width: $iconBigSize;
      height: $iconBigSize;
      margin-top: -28px;
    }
    .home-ani {
      // border: 1px solid red;
      height: 58px;
      position: relative;
      .left-img {
        width: 28px;
        height: 30px;
        background: url('./img/home/left.png');
        background-size: cover;
        position: absolute;
        left:5px;
        bottom: 2px;
      }
      .right-img {
        width: 28px;
        height: 30px;
        background: url('./img/home/right.png');
        background-size: cover;
        position: absolute;
        right: 4px;
        bottom: 10px;
      }
      .dome{
        position: absolute;
        top: 10px;
        z-index: -1;
        height: 55px;
        width: 60px;
        border-radius: 50%;
        background: #fff;
      }
    }
    .tab-icon {
      width: 24px;
      height: 24px;
    }
  }
  .vi-icon-box {
    width: 24px;
    height: 24px;
  }
}
</style>
