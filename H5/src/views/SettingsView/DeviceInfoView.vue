<template>
  <div>
    <NavBar :title="$t('setview.DeviceInformation')" />
    <van-cell-group>
      <van-cell
        v-if="userStore.userInfo.userName"
        class="text"
        :title="$t('setview.memberaccount')"
        :value="userStore.userInfo.userName"
      />
      <van-cell class="text" :title="$t('setview.Devicemodel')" :value="model" />
      <van-cell class="text" :title="$t('setview.systemversion')" :value="os" />
      <van-cell class="text" :title="$t('setview.EquipIdenty')" :value="deviceId" />
      <van-cell class="text" :title="$t('setview.LoginIP')" :value="ip" />
      <van-cell class="text" :title="$t('setview.currentversion')" :value="'v' + version" />
      <van-cell class="text" :title="$t('setview.currenttime')" :value="time" />
    </van-cell-group>
    <!-- <div class="btn-box">
      <van-button class="btn" type="primary" block @click="screenshot">一键截图</van-button>
    </div> -->

    <canvas style="display: none" id="screenshotCanvas"></canvas>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
import { getMobSysInfo } from '@/utils/mobileDetect'
import { getDeviceInfo } from '@/utils/mobileDeviceInfo'
import { version } from '@/utils/config'
import { formatTime } from '@/utils'

const { os, model } = getMobSysInfo()
const { deviceId, ip } = getDeviceInfo()
const time = formatTime(new Date())
console.log(navigator.userAgent)
console.log(getMobSysInfo())
console.log(getDeviceInfo())
</script>

<style lang="scss" scoped>
.text {
  --van-cell-line-height: 40px;
  --van-cell-font-size: 15px;
  :deep().van-cell__value {
    min-width: 80%;
  }
}

.btn-box {
  width: 325px;
  height: 50px;
  margin: 70px 25px 0px 25px;
  .btn {
    --van-button-mini-height: 50px;
  }
}
</style>
