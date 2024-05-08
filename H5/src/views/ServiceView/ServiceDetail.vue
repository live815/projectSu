<template>
  <div class="service-detail">
    <div class="load-container" v-if="loading"><van-loading type="spinner" /></div>
    <div class="main-cotainer" v-if="!loading">
      <NavBar :border="true" :title="rowData.tabName" />
      <div class="text-zone" v-html="textData"></div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getTutorialDetailApi } from '@/api/announcement.js'
import { Base64 } from 'js-base64'
const route = useRoute()
onMounted(() => {
  getTutorialDetail()
})
// 加载
const loading = ref(true)

// 获取数据
const rowData = ref()
const getTutorialDetail = () => {
  getTutorialDetailApi({ id: route.query.id }).then((res) => {
    rowData.value = res.data
    loading.value = false
  })
}
//处理数据
const textData = computed(() => {
  return Base64.decode(rowData.value.tabContent)
})
</script>

<style lang="scss" scoped>
.load-container {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.text-zone {
  padding: 15px;
  white-space: pre-wrap;
  line-height: 20px !important;
}
</style>
