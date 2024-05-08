<template>
  <div>
    <NavBar :title="$t('setview.aboutus')" />
    <div class="logo-box">
      <!-- <div class="logo">{{ $t('setview.Csports') }}</div> -->
      <img src="./img/Vlogo.png" alt="" />
    </div>
    <van-cell
      class="text"
      v-for="(item, index) in aboutUsData"
      :key="index"
      :title="item.title"
      is-link
      @click="goUserAgreement(item.id)"
    />
    <van-cell
      class="text"
      :title="$t('setview.contactus')"
      is-link
      @click="openCustomerServiceLink"
    />
  </div>
</template>

<script setup>
import { openCustomerServiceLink } from '@/utils/customerService'
import { getTutorialListApi } from '@/api/announcement.js'
import { useRouter } from 'vue-router'
const router = useRouter()
function goUserAgreement(id) {
  router.push({
    path: '/useragreement',
    query: {
      id: id
    }
  })
}
// 获取一级菜单
const aboutUsData = ref([])
onMounted(() => {
  getTutorialListApi({ configType: '2' }).then((res) => {
    aboutUsData.value = res.data
  })
})
</script>

<style lang="scss" scoped>
.logo-box {
  display: flex;
  justify-content: center;
  height: 137px;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #fff;

  img {
    width: 67px;
    height: 92px;
  }
}
.custom-font {
  color: #1f2022;
  font-size: 16px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    border-bottom: 1px solid #eee;
  }
}
.text {
  --van-cell-line-height: 40px;
  --van-cell-font-size: 15px;
}
</style>
