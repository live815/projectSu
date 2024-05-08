<template>
  <div class="boxIM" v-if="iMStatus">
    <div class="imBg" v-if="auchorIMInfo?.imWebImage" :key="auchorIMInfo.id" :style="`background-image: url(${getImgUrl(auchorIMInfo.imWebImage)})`">
      <div style="display: flex;align-items: center;">
        <img class="icon_Back" @click="delShow" src="./img/icon_Back.png" />
        <div class="titleIM">
          {{$t('Components.AnchorIM01')  }}
        </div>
        <img class="icon_download" @click="goLink" src="./img/icon_download.png" />
        <div class="line"></div>
        <div class="iMName">{{ $t('Components.AnchorIM02')}}<p id="anchorID">{{auchorIMInfo?.imNumber}}</p>
        </div>
      </div>
      <div class="copyT"  v-clipboard="auchorIMInfo?.imNumber">{{$t('Components.AnchorIM03')}}</div>
    </div>
  </div>
</template>
<script setup>
import { getAnchorInfo } from '@/api/liveBroadcast'
import { onMounted } from 'vue'
import { useLiveStore } from '@/stores/liveBroadcast'
import { getImgUrl } from "@/utils"
import vClipboard from '@/directives/clipboard'
const liveStore = useLiveStore()
const auchorIMInfo = ref({})
const iMStatus = ref(false)
const emit=defineEmits(['closeShow'])
onMounted(() => {
  getIMList()
})
const getIMList = async () => {
  let presenterId = liveStore.liveRoom.presenterId
  try {
    let res = await getAnchorInfo(presenterId)
    auchorIMInfo.value = res.data
    iMStatus.value = true
    // console.log(auchorIMInfo.value, 'auchorIMInfo.value')
  } catch (e) {
    console.log(e.message)
  }
}
const goLink=()=>{
    window.open(auchorIMInfo.value.imJumpUrl, "_blank");
}
const delShow=()=>{
  iMStatus.value=false
  emit('closeShow')
}
</script>
<style scoped lang="scss">
.boxIM {
  margin-top: 6px;
  position: relative;

  .imBg {
    width: 330px;
    height: 30px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon_Back {
    width: 12px;
    height: 12px;
    cursor: pointer;
  }

  .titleIM {
    color: #002877;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    margin-left: 30px;
  }

  .icon_download {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-left: 10px;
    cursor: pointer;
  }

  .line {
    width: 1px;
    height: 20px;
    background-color: #002877;
    opacity: 0.1;
    margin: 0 7px;
  }

  .iMName {
    color: #002877;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    display: flex;
    align-items: center;

    p {
      color: #0084FE;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
    }
  }

  .copyT {
    min-width: 24px;
    height: 14px;
    border-radius: 3px;
    background: #002877;
    padding: 0 4px;
    color: #FFF;
    text-align: right;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
