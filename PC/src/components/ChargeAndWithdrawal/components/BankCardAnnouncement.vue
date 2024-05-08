<template>
  <div>
    <CustomizeDialog
      :dialogShow="showBankCardAnnouncement"
      :width="480"
      :title="$t('DepositWithdraw.Announcement')"
      :alignCenter="true"
      @closeBtn="toCloseAnnouncement"
      v-if="showBankCardAnnouncement"
    >
      <div class="body">
        {{  removeHtmlAndSpaces(annText) }}
      </div>
      <div class="btn-box">
        <ButtonV
          :width="'160px'"
          :active="true"
          :text="$t('DepositWithdraw.Isee')"
          @click="toCloseAnnouncement"
          :height="'32px'"
        ></ButtonV>
      </div>
    </CustomizeDialog>
  </div>
</template>

<script setup>
import ButtonV from '@/components/ButtonV'
import { removeHtmlAndSpaces } from '@/utils'
const props = defineProps({
  showBankCardAnnouncement: {
    type: Boolean,
    default: false
  },
  annText: String
})
const emit = defineEmits(['closeAnnouncement'])
const toCloseAnnouncement = () => {
  emit('closeAnnouncement')
}
</script>

<style lang="scss" scoped>
:deep() {
  .el-dialog__header {
    padding: 12px 20px 12px 20px !important;
    margin-right: 0px !important;
    border-radius: 8px 8px 0px 0px !important;
    background: var(--unnamed, #323c6f) !important;
  }
}
.body {
  display: flex;
  padding: 32px 20px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  background: #232949;
  color: var(--100, #fff);

  font-size: 14px;
  line-height: 24px;
}

.footer {
  height: 300px;
  background-color: red;
}

.btn-box {
  display: flex;
  padding: 10px 20px 20px 20px;
  flex-direction: column;
  align-items: center;
}
</style>
