<template>
  <div class="container">
    <NavBar :isShowRight="false" :title="$t('Lletter.livestream')" />
    <van-tabs class="con" v-model:active="active" animated title-inactive-color="#999999">
      <van-tab :title="$t('Lletter.Alreadybooked')"> </van-tab>
      <van-tab :title="$t('Lletter.all')"> </van-tab>
      <van-tab :title="$t('Lletter.livebroadcast')"> </van-tab>
      <van-tab :title="$t('Lletter.comingsoon')"> </van-tab>
    </van-tabs>
    <div v-if="liveList?.length" class="list-box">
      <List
        v-for="item in liveList"
        :key="item.id"
        :item="item"
        @updatePropData="updateParentData"
      ></List>
    </div>
    <nodata v-else :imgSrc="nodataimg" :noTxt="noTxt" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import List from './components/LiveList/components/list.vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import nodata from '@/components/NoResult/NoResult'
import nodataimg from '@/assets/img/nodata.png'
import { useLiveList } from '@/stores/live'
import { computed } from 'vue'
import i18n from '@/i18n'
const liveStore = useLiveList()
const active = ref(0)
const { query } = useRoute()
active.value = +query.active

// 取消预约后，更新已预约列表
const updateParentData = (id) => {
  liveStore.reservationList = liveStore.reservationList.filter((item) => item.id !== id)
}

const liveList = computed(() => {
  const list = liveStore.liveList
  if (active.value === 0) {
    return liveStore.reservationList
  } else if (active.value === 1) {
    return list
  } else if (active.value === 2) {
    return list?.filter((item) => {
      return item.status === 2
    })
  } else if (active.value === 3) {
    return list?.filter((item) => {
      return item.status !== 2
    })
  } else {
    return list
  }
})
const noTxt = computed(() => {
  if (active.value === 0) {
    return i18n.global.t('Lletter.Llettertip4')
  } else if ([1, 2].includes(active.value)) {
    return i18n.global.t('Lletter.Llettertip5')
  } else if (active.value === 3) {
    return i18n.global.t('Lletter.Llettertip6')
  } else {
    return ''
  }
})
const init = () => {
  if (!liveStore.reservationList?.length) {
    liveStore.getReserveLiveListAction()
  }
  if (!liveStore.liveList.length) {
    liveStore.getLiveListAction()
  }
}
init()
</script>

<style lang="scss" scoped>
@include tabStyle();
.container {
  .box {
    margin-top: 200px;
  }
}
.list-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 15px;
}
</style>
