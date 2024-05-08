<template>
  <div class="my-menu-view">
    <div class="list">
      <div @click="select(item)" class="item" v-for="item in list" :key="item.title">
        <div class="left">
          <img :src="item.icon" alt="" />
          <span class="custom-title">{{ item.title }}</span>
        </div>
        <IcoArrowRight />
      </div>
    </div>
    <div class="list list2">
      <div @click="select(item)" class="item" v-for="item in list2" :key="item.title">
        <div class="left">
          <img :src="item.icon" alt="" />
          <span class="custom-title">{{ item.title }}</span>
        </div>
        <IcoArrowRight />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import people from './img/people.png'
import vip from './img/vip.png'
import love from './img/love.png'
import lock from './img/lock.png'
import mes from './img/mes.png'
import listIcon from './img/list.png'
import setIcon from './img/set.png'
import editIcon from './img/edit.png'
import star from './img/star.png'

const router = useRouter()
const list = [
  {
    title: 'Thông tin cá nhân',
    icon: people,
    path: '/personalDetails'
  },
  {
    title: 'Đặc quyền VIP',
    icon: vip,
    path: '/vip'
  },
  {
    title: 'Ưu đãi',
    icon: love,
    path: '/welfare'
  },
  {
    title: 'Tài trợ',
    icon: star,
    path: '/sponsor'
  }
]

const list2 = [
  {
    title: 'Bảo mật',
    icon: lock,
    path: '/personal-center'
  },
  {
    title: 'Hợp tác kinh doanh',
    icon: mes,
    path: '/business-agent'
  },
  {
    title: 'Hướng dẫn chung',
    icon: listIcon,
    path: '/help'
  },
  {
    title: 'Phản hồi',
    icon: editIcon,
    path: '/settingfeedback'
  },
  {
    title: 'Thiết lập',
    icon: setIcon,
    path: '/settings'
  }
]
const select = (item) => {
  if (item.path) {
    router.push(item.path)
  }
}
</script>

<style lang="scss" scoped>
.my-menu-view {
  height: calc(var(--app-height) - 380px);
  overflow: auto;
  padding-bottom: 40px;
}
.list {
  border-radius: 8px;
  padding: 20px 15px 0;
  background: #fff;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
    .left {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        margin-right: 8px;
      }
      span {
        font-size: 14px;
        color: #000;
      }
    }
    svg {
      transform: scale(1.3);
      fill: #999;
    }
  }
}
.list2 {
  margin-top: 8px;
}
</style>