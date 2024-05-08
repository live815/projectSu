<template>
  <div>
    <van-notice-bar scrollable background="#FFF" color="#666" class="marquee-content">
      <template #left-icon>
        <img :src="iconPath" class="img" />
      </template>
      <span v-for="(item, index) in message" :key="index + 'id'">
        {{ $t('friends.CongMembers') }}{{ item['inviteName'] }}{{ $t('friends.inviteSuccess')
        }}{{ item['subName'] }} {{ $t('friends.FirstPrize') }}{{ item['inviteFirstDepAward'] }}
        {{ i18n.global.t('Iletter.moneySite') }}
      </span>
    </van-notice-bar>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, computed } from 'vue'
import { queryHorseRing } from '@/api/user'
import { ERR_OK } from '@/utils/config'
import i18n from '@/i18n'
import { getToken } from '@/utils/cache'

const isLogin = getToken()
const token = computed(() => new URLSearchParams(window.location.search).get('token'))
// import trumpet from './img/trumpet.png'
// import { defineProps } from 'vue'
defineProps(['iconPath'])
const message = ref([])

const getHorseRing = () => {
  if (isLogin || token) {
    queryHorseRing().then((res = []) => {
      if (res?.['code'] === ERR_OK) {
        message.value = res['data'] || []
      }
    })
  }
}

onMounted(() => {
  getHorseRing()
})
</script>

<style lang="scss" scoped>
span {
  margin-left: 50px;
  margin-right: 20px;
}
.marquee-content {
  border-radius: 10px;
  box-shadow: 0 4px 6px 0 rgba(172, 139, 96, 0.1);
}
.marquee-content1 {
  height: 30px !important;
  padding: 0 !important;
  background: var(--gray-f-569, #f5f6f9) !important;
}

.img {
  width: 20px;
  height: 20px;
}
.img2 {
  width: 16px;
  height: 16px;
  margin: 0 8px;
}

.text {
  font-size: 13px;
}
</style>
