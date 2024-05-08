<template>
  <NavBar
    :title="$route.query?.title || $t('Activity.ActivityDetail')"
    :isShowRight="false"
    v-if="token === null"
    ellipsis=""
  />
  <component :is="activities[$route.path]" :activityConfig="detailData" />
</template>

<script setup>
import NavBar from '@/components/NavBar/NavBar.vue'
import service from '@/utils/request'
import { getActivityDetil } from '@/api/promotion'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import NewbieActivity from './NewbieActivity'
import GameActivity from './GameActivity'
import FirstChargeActivity from './FirstChargeActivity'
import LuckyWheelActivity from './LuckyWheelActivity'
import RebateActivity from './RebateActivity'
import { getPublicIPAddress } from '@/utils'

const route = useRoute()
const token = computed(() => new URLSearchParams(window.location.search).get('token'))
const user = useUserStore()
const detailData = ref({})

const activities = {
  '/first-charge': FirstChargeActivity,
  '/game-activity': GameActivity,
  '/newbie-activity': NewbieActivity,
  '/luckyWheel': LuckyWheelActivity,
  '/rebate-activity': RebateActivity
}

onMounted(async () => {
  const { advertiseId, activityId, type } = route.query
  const requestData = { advertiseId, activityId, enterLocation: Number(type), deviceType: 4 }

  try {
    if (token.value) service.defaults.headers.common['Authorization'] = token.value

    if (!user.isLogin && !token.value) {
      await getPublicIPAddress().then((ip) => {
        requestData.memberUserName = ip
        requestData.tenantId = '1'
      })
    }
    const { data } = await getActivityDetil(requestData)
    detailData.value = data
  } catch (error) {
    console.log('catch中')
    console.log(error)
  }
})
</script>

<style lang="scss" scoped></style>
