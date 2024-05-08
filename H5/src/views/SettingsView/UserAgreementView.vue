<template>
  <div>
    <NavBar :title="title" />
    <div class="text" v-html="mainContent"></div>
  </div>
</template>

<script setup>
import { getTutoriaSublListApi } from '@/api/announcement.js'
import { useRoute } from 'vue-router'
import { Base64 } from 'js-base64'
const route = useRoute()
const mainContent = ref('')
const title = ref('')
onMounted(() => {
  console.log(route.query)
  getTutoriaSublListApi({ tuId: route.query.id }).then((res) => {
    mainContent.value = Base64.decode(res.data[0].tabContent)
    title.value = res.data[0].tabName
    console.log(res.data)
  })
})
</script>

<style lang="scss" scoped>
.text {
  padding: 15px;
  color: #111;

  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  white-space: pre-wrap;
}
.text :deep() {
  img {
    max-width: 100%;
  }
  iframe {
    width: 100%;
    height: auto;
  }
}
</style>
