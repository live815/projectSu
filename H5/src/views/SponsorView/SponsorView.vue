<template>
  <div :class="{ 'sponsor-content': dataList.length == 0 }">
    <NavBar :title="$t('Sponsort.sponsor')" v-if="!appFlag" />
    <div class="s-list" v-if="dataList.length">
      <div
        @click="selectSponsor(item, index)"
        v-for="(item, index) in dataList"
        :key="item.id"
        class="item"
      >
        <!-- <img :src="getImg(item.appUrl)" alt="" /> -->
        <img :src="item.img" alt="" />
      </div>
    </div>

    <NoResult v-else></NoResult>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useRouter } from 'vue-router'
// import { getSponsorList } from '@/api/sponsor'
import NoResult from '@/components/NoResult/NoResult'
import { getImg } from '@/utils'
import { useAppStore } from '@/stores/app'
import { onMounted } from 'vue'
const appStore = useAppStore()
const appFlag = computed(() => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('app') === 'true'
})

onMounted(() => {
  // getList()
})

// const getList = () => {
//   getSponsorList().then((res) => {
//     dataList.value = res.data || []
//   })
// }
// 图片信息
const dataList = reactive([
  {
    id: 1,
    img: new URL(`./img/${appStore.language}/hd.png`, import.meta.url).href
  }
  // {
  //   id: 2,
  //   img: new URL(`./img/${appStore.language}/uzi.png`, import.meta.url).href
  // }
])
const router = useRouter()

const selectSponsor = (item, index) => {
  const obj = item
  obj.index = index
  obj.appFlag = appFlag
  router.push({ path: '/sponsorDetail', query: obj })
}
</script>

<style lang="scss" scoped>
.sponsor-content {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 纵向居中对齐 */
  height: 100vh; /* 使用视口高度作为容器高度 */
}
.s-list {
  padding: 15px 10px;
  .item {
    width: 355px;
    height: 152px;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
    }
  }
}
</style>
