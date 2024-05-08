<template>
  <div class="bottom-link-wrapper">
    <div class="list">
      <div @click="select(item)" class="item" v-for="item in list" :key="item.title">
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
import i18n from '@/i18n'
const router = useRouter()

const list = [
  {
    title: i18n.global.t('UsercenterView.set'),
    icon: new URL('./img/set.png', import.meta.url).href,
    path: '/settings'
  },
  {
    title: i18n.global.t('UsercenterView.Feedback'),
    icon: new URL('./img/option.png', import.meta.url).href,
    path: '/settingfeedback'
  }
]
const select = (item) => {
  if (item.path) {
    router.push(item.path)
  }
}
</script>

<style lang="scss" scoped>
.bottom-link-wrapper {
  background: #fff;
}
.list {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 15px 0;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
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
.cell-group {
  font-size: 14px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  .cell-item {
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
}
.btn-wrapper {
  margin-top: 20px;
}
</style>
