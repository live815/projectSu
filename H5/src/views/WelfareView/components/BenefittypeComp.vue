<template>
  <div>
    <van-popup v-model:show="showDilog" closeable position="bottom">
      <div class="popup-title">{{ $t('Wletter.tip57') }}</div>
      <van-radio-group v-model="checked">
        <van-cell-group inset>
          <van-cell
            :title="$t('Wletter.all')"
            clickable
            @click="changeType('1', '')"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('Wletter.cashcoupons')"
            clickable
            @click="changeType('2', 2)"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('Wletter.depositcoupon')"
            clickable
            @click="changeType('3', 3)"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="3" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('Wletter.Turnovercoupons')"
            clickable
            @click="changeType('4', 4)"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="4" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('Wletter.cash')"
            clickable
            @click="changeType('5', 1)"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="5" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('Wletter.physicalobject')"
            clickable
            @click="changeType('6', 5)"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="6" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  showPicker: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:showPicker', 'updateFiler'])
const checked = ref('1')
const showDilog = computed({
  get() {
    return props.showPicker
  },
  set(value) {
    emit('update:showPicker', value)
  }
})
function changeType(num, type) {
  checked.value = num
  emit('updateFiler', type)
  emit('update:showPicker', false)
}
</script>
<style lang="scss" scoped>
* {
  --van-cell-line-height: 45px;
  --van-cell-font-size: 14px;
  --van-cell-text-color: #111;
}
.popup-title {
  padding: 18px 0 20px 18px;
  color: #111;

  font-size: 19px;
  font-weight: 500;
  :deep() {
    .van-cell {
      padding-bottom: 45px;
    }
  }
}
</style>
