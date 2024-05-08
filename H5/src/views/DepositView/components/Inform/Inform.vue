<template>
  <van-notice-bar
    @click="router.push('/message')"
    left-icon="volume-o"
    mode="link"
    color="#1989fa"
    background="#F5F6F9"
  >
    <template #left-icon>
      <img class="icon" src="./img/trumpet.png" alt="" />
    </template>
    <div class="notice-list" v-if="listData?.content">
      <span class="notice-text" @click.stop="selectNotice(item)">
        {{ listData ? removeHtmlAndSpaces(listData?.content) || '' : '' }}
      </span>
      <span class="notice-text" @click.stop="selectNotice(item)">
        {{ listData ? removeHtmlAndSpaces(listData?.content) || '' : '' }}
      </span>
    </div>
  </van-notice-bar>
  <van-dialog
    v-model:show="showNotice"
    :title="listData.title"
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
</template>

<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'
import { useAnnouncementStore } from '@/stores/announcement'
const announcement = useAnnouncementStore()
import 'vant/es/dialog/style'
import i18n from '@/i18n'

const listData = computed(() => {
  if (announcement.deposAnn.length) {
    return announcement.deposAnn[0]
  } else {
    return ''
  }
})
const router = useRouter()

// 公告

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
  margin-right: 150px;
  display: inline;
}

.van-notice-bar {
  height: 32px;
  width: 100%;
  padding: 0 5px 0 5px;
  // border: 1px solid red;
  // padding-top: 5px;
  img {
    width: 16px;
    height: 16px;
    // left: -6px;
  }
}
.notice-text {
  color: #333;

  font-size: 13px;
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
