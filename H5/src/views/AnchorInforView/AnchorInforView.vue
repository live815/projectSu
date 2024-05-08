<!-- 主播信息页面 -->
<template>
  <div class="scroll-box" @scroll="isElementInViewport(avaTab)">
    <div class="content-box">
      <img
        class="background"
        :src="data?.backgroundWall ? getImg(data?.backgroundWall) : defaultBg"
      />

      <NavBar v-show="navBar" :title="data?.nickName" :isShowRight="false" />
      <van-icon name="arrow-left" size="24px" color="#fff" @click="router.back()" />
      <div class="head-card" ref="avaTab">
        <div class="avatar">
          <img
            :src="data?.avatar ? getImg(data?.avatar) : avator"
            @click="showImagePreview([getImg(data?.avatar)])"
          />
        </div>
        <div class="avaname">{{ data?.nickName }}</div>
        <div class="avatext">{{ data?.summary }}</div>
      </div>
      <div class="ava-tab">
        <van-tabs v-model:active="active" swipeable>
          <van-tab v-for="item in list" :key="item.value" :title="item.title">
            <template v-if="item.value == '1'">
              <div class="tab-item">
                <HerDynamic />
              </div>
            </template>
            <template v-if="item.value == '2'">
              <div class="tab-item">
                <HerInformation :personalInfo="data" />
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </div>
      <van-image-preview
        v-model:show="show"
        :images="images"
        @change="onChange"
        :showIndicators="true"
        :showIndex="false"
      >
        <template v-slot:index>{{ $t('AnchorinforView.PageNumber', { num: index + 1 }) }}</template>
      </van-image-preview>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import HerDynamic from './components/HerDynamic.vue'
import HerInformation from './components/HerInformation.vue'
import { getPresenterInfo } from '@/api/live'
import { getImg } from '@/utils'
import { showImagePreview } from 'vant'
import defaultBg from './img/anchor-home-bg.png'
import avator from './img/avator.png'
import i18n from '@/i18n'

const router = useRouter()
const route = useRoute()
const active = ref(0)
const avaTab = ref(null)
const navBar = ref(false)
const list = ref([
  {
    title: i18n.global.t('AnchorinforView.HisDynamic'),
    value: 1
  },
  {
    title: i18n.global.t('AnchorinforView.HisinFormation'),
    value: 2
  }
])
// 图片预览
const show = ref(false)
const index = ref(0)
const images = ref([])
const data = ref({})
getPresenterInfo(route.params.id).then((res) => {
  data.value = res.data
})
const onChange = (newIndex) => {
  index.value = newIndex
}

const isElementInViewport = (element) => {
  // 获取元素的位置信息
  const { top, bottom, left, right } = element.getBoundingClientRect()

  // 获取视窗的尺寸信息
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  // 判断元素是否在视窗内
  const elementInViewport = bottom >= 0 && top <= windowHeight && right >= 0 && left <= windowWidth

  navBar.value = !elementInViewport
}
</script>

<style lang="scss" scoped>
.scroll-box {
  height: 100%;
  overflow: auto;
}
.content-box {
  min-height: var(--app-height);
  padding-top: 116px;
  .background {
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;
  }
  .van-icon-arrow-left {
    position: absolute;
    top: 20px;
    left: 10px;
  }
  .go-back-icon {
    path {
      fill: #fff;
    }
  }
  .head-card {
    position: relative;
    border-radius: 20px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
    background: var(--color-background);
    margin: 10px 12px 12px 12px;
    // 解决上边距重叠的塌陷问题
    padding: 0.5px;
    padding-bottom: 24px;
    .avatar {
      position: absolute;
      top: -30px;
      right: 50%;
      width: 64px;
      height: 64px;
      border-radius: 64px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 64px;
        margin-left: 32px;
      }
    }
    .avaname {
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      margin: 50px 0 12px 0;
      padding: 0 25px;
    }
    .avatext {
      color: #888;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      padding: 0 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

:deep() {
  .van-tabs__wrap {
    height: 44px;
    flex-shrink: 0;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
  .van-tab__text--ellipsis {
    font-weight: 600;
  }
  .van-tabs__line {
    width: 16px;
  }
  .tab-content {
    padding: 0 12px;
  }
}
</style>
