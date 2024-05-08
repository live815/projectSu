<template>
  <div>
    <van-popup v-model:show="show" closeable position="bottom" round>
      <div class="popup-title">{{ $t('setview.tip1') }}</div>
      <van-radio-group v-model="checked">
        <van-cell-group inset>
          <van-cell
            :title="$t('setview.financialproblem')"
            clickable
            @click="changeType('1', $t('setview.financialproblem'))"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('setview.Accountproblem')"
            clickable
            @click="changeType('2', $t('setview.Accountproblem'))"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('setview.gameproblem')"
            clickable
            @click="changeType('3', $t('setview.gameproblem'))"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="3" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('setview.activityquestion')"
            clickable
            @click="changeType('4', $t('setview.activityquestion'))"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="4" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('setview.Platformrecommendat')"
            clickable
            @click="changeType('5', $t('setview.Platformrecommendat'))"
            :border="false"
          >
            <template #right-icon>
              <van-radio name="5" />
            </template>
          </van-cell>
          <van-cell
            :title="$t('setview.Complaints')"
            clickable
            @click="changeType('6', $t('setview.Complaints'))"
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
const emit = defineEmits(['changeType'])
const show = ref(false)
const showPopup = () => {
  show.value = true
}

const checked = ref(null)
function changeType(num, type) {
  checked.value = num
  emit('changeType', type)
  show.value = false
}
defineExpose({ showPopup })
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
