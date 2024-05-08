<template>
  <div class="help-popup">
    <div class="popup-title">{{ $t('Hletter.HletterTip1') }}</div>
    <van-radio-group v-model="currentTutorialIndex">
      <van-cell-group inset>
        <van-cell
          :title="item.tabName"
          clickable
          @click="tochangeIndex(index)"
          :border="false"
          v-for="(item, index) in helpList"
          :key="index"
        >
          <template #icon>
            <img :src="getImg(item.icon)" alt="" width="32" height="32" />
          </template>
          <template #right-icon>
            <van-radio :name="index" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script setup>
import { getImg } from '@/utils'
const props = defineProps({
  helpList: {
    type: Array
  },
  currentTutorialIndex: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['changeIndex', 'toCloseHelpPopup'])

const currentTutorialIndex = computed({
  get: () => props.currentTutorialIndex,
  set: (val) => {
    emit('changeIndex', val)
    emit('toCloseHelpPopup')
  }
})
const tochangeIndex = (index) => {
  currentTutorialIndex.value = index
}
</script>

<style lang="scss" scoped>
:deep() {
  .van-cell__title {
    display: flex;
    align-items: center;
  }
}
.popup-title {
  display: flex;
  align-items: center;
  padding-left: 25px;
  color: #111;
  text-align: center;

  font-size: 19px;
  font-weight: 500;
  line-height: 22px;
  height: 50px;
}
.help-popup :deep() {
  .van-cell__title {
    color: #111;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
}
img {
  margin-right: 11px;
}
</style>
