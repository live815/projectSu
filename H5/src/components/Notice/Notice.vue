<template>
  <div>
    <van-notice-bar left-icon="volume-o" mode="link" color="#1989fa" background="transparent">
      <template #left-icon v-if="isShowIcon">
        <img :src="volumeIcon || volume" />
      </template>
      <div class="notice-list">
        <span class="notice-text" @click.stop="selectNotice">
          {{ listData ? removeHtmlAndSpaces(listData.content) || '' : '' }}
        </span>
        <span class="notice-text" @click.stop="selectNotice">
          {{ listData ? removeHtmlAndSpaces(listData.content) || '' : '' }}
        </span>
      </div>
    </van-notice-bar>
    <van-dialog
      v-model:show="showNotice"
      :title="listData?.title"
      show-cancel-button
      @confirm="toMessage"
    >
      <div class="editor">
        <div class="ql-container">
          <div class="ql-editor">
            <div class="content" v-html="listData.content"></div>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import volume from './img/volumn.png'
defineProps({
  isShowIcon: {
    type: Boolean,
    default: true
  },
  volumeIcon: {
    type: String
  }
})
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'

import 'vant/es/dialog/style'
import { useAnnouncementStore } from '@/stores/announcement'
import i18n from '@/i18n/index'
const announcement = useAnnouncementStore()
const router = useRouter()

const listData = computed(() => {
  if (announcement.normalAnn) return announcement.normalAnn[0]
})

// 公告弹出框
const showNotice = ref(false)
const selectNotice = () => {
  showNotice.value = true
}

//弹出框确认
const toMessage = () => {
  router.push('/message')
}

function removeHtmlAndSpaces(inputString) {
  // 移除HTML标签
  const stringWithoutTags = inputString.replace(/<[^>]*>/g, '')

  // 移除&nbsp;
  const stringWithoutSpaces = stringWithoutTags.replace(/&nbsp;/g, ' ')

  return stringWithoutSpaces.trim() // 去除首尾空格
}
</script>

<style lang="scss" scoped>
span {
  margin-left: 30px;
  margin-right: 90px;
}
.van-notice-bar {
  height: 24px;
  img {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
}
.notice-text {
  color: #666;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}

:deep() .van-icon-arrow {
  display: none;
}
.editor {
  padding: 0 10px;
  .content {
    img {
      max-width: 100%;
    }
  }
}
</style>
