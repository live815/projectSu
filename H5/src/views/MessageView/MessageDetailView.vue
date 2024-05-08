<template>
  <div>
    <NavBar :title="$t('Mletter.sitemessage')" :isShowRight="false">
      <template #right>
        <div class="header-right" @click="toShowDeletPopup" v-show="route.query.letType != 3">
          {{ $t('Mletter.edit') }}
        </div>
      </template>
    </NavBar>
    <div class="load-container" v-if="loading"><van-loading type="spinner" /></div>
    <div class="main-container" v-if="!loading">
      <div class="title">
        <div class="logo">
          <img src="./img/cup_logo.png" />
        </div>
        <div class="title-text">{{ letterData.title }}</div>
        <div class="date">{{ letterData.sendTime || letterData.shelvesTime }}</div>
      </div>
      <!-- <div class="content" v-html="letterData.content"></div> -->
      <div class="editor">
        <div class="ql-container">
          <div class="ql-editor">
            <div class="content" v-html="letterData.content"></div>
          </div>
        </div>
      </div>
    </div>
    <DeletPopup ref="deletPopup" @toShowConfirmPopup="toShowConfirmPopup"></DeletPopup>
    <ConfirmPopup ref="confirmPopup" @deleLetter="deleLetter"></ConfirmPopup>
  </div>
</template>

<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { getannounceDetailApi, getLetterDetailApi, readLetterApi } from '@/api/announcement.js'
import NavBar from '@/components/NavBar/NavBar.vue'
import DeletPopup from './components/popup/DeletPopup.vue'
import ConfirmPopup from './components/popup/ConfirmPopup.vue'
import { useRoute, useRouter } from 'vue-router'
import eventBus from '@/utils/eventBus'
import { Base64 } from 'js-base64'

const router = useRouter()
const route = useRoute()
onMounted(() => {
  getLetterDetail()
})
// 初始化数据
const loading = computed(() => {
  if (letterData.value) {
    return false
  } else {
    return true
  }
})
const letterData = ref(null)
// 获取数据
const getLetterDetail = () => {
  if (route.query.isAnn == true) {
    getannounceDetailApi({ id: route.query.id }).then((res) => {
      if (res.code == 200) {
        letterData.value = res.data
        letterData.value.content = Base64.decode(letterData.value.content)
      }
    })
    return
  }
  getLetterDetailApi({ id: route.query.id }).then((res) => {
    if (res.code == 200) {
      letterData.value = res.data
      letterData.value.content = Base64.decode(letterData.value.content)
    }
  })
  readLetterApi({ id: route.query.id })
}
// 底部删除弹窗
const deletPopup = ref(null)
const toShowDeletPopup = () => {
  deletPopup.value.switchShowDeletPopup()
}
// 确认删除弹窗
const confirmPopup = ref(null)
const toShowConfirmPopup = () => {
  confirmPopup.value.switchShowConfirm()
}
// 删除站内信
const deleLetter = () => {
  eventBus.emit('toDeleLetter', route.query.id)
  router.back()
}
</script>

<style lang="scss" scoped>
.load-container {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  position: relative;
  height: 81px;
  padding: 20px 20px 0 65px;
  border-bottom: 0.5px solid #eee;
  color: #111;

  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  .logo {
    position: absolute;
    left: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    img {
      width: 100%;
      height: 100%;
    }
  }

  .date {
    margin-top: 2px;
    color: #999;
    font-size: 13px;
    line-height: 16px;
  }
}
:deep(.content) {
  width: 100%;
  color: #666;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  padding: 15px 15px 0 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: justify;
  text-justify: auto;
  img {
    max-width: 100%;
  }
}
</style>
