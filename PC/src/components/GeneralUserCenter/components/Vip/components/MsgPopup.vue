<template>
  <div class="msgDialog">
    <el-dialog :title="$t('GeneralUserCenter.KindTips')" v-model="open" :before-close="handleClose">
      <div class="title">
        {{
          onIndexComputed == 1
            ? $t('GeneralUserCenter.Notice_13')
            : $t('GeneralUserCenter.Notice_14')
        }}
      </div>

      <div class="footer">
        <div class="footer-cancel" @click="handleClose" v-if="onIndexComputed != 1">
          {{ $t('GeneralUserCenter.Cancel') }}
        </div>
        <div class="footer-btn" @click="onClickGo">
          {{
            onIndexComputed == 1
              ? $t('GeneralUserCenter.GoCheckItOut')
              : $t('GeneralUserCenter.GoToExchange')
          }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSlidesStore } from '@/stores/vipSlides'
const router = useRouter()
const open = ref(true)
const emit = defineEmits(['submitBtn'])
const slidesStore = useSlidesStore()
const handleClose = () => {
  emit('submitBtn', false)
}

const onIndexComputed = computed(() => {
  return props.index
})

const props = defineProps({
  index: {
    type: Number,
    default: null
  }
})
const onClickGo = () => {
  if (onIndexComputed.value != 1) {
    //  跳转
    router.push('/personal/5')
  }
  emit('submitBtn', false)
}
</script>
<style lang='scss' scoped>
.msgDialog {
  :deep() {
    .el-dialog {
      border-radius: 2px;
      background: #272b45;
      box-shadow: 0px 14px 28px 0px rgba(0, 0, 0, 0.4);
      .el-dialog__header {
        opacity: 0.5;
        background: #3f4671;
        width: 100%;
        .el-dialog__title {
          color: #fff;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
        }
      }
      .title {
        color: var(--100, #fff);

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        letter-spacing: -0.01px;
        height: 86px;
      }
      .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .footer-cancel {
          display: flex;
          width: 60px;
          height: 32px;
          padding: 4px 8px;
          justify-content: center;
          align-items: center;
          text-align: center;
          line-height: 32px;
          gap: 4px;
          border-radius: 4px;
          background: var(--unnamed, #171a2f);
          box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
        }
        .footer-btn {
          margin-left: 15px;
          width: 74px;
          height: 32px;
          color: var(--color-white, #fff);
          text-align: center;
          line-height: 32px;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          letter-spacing: -0.01px;
          border-radius: 4px;
          background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        }
      }
    }
  }
}
</style>