<template>
  <div class="ebPayList">
    <template v-if="appStore.language !== 'vi'">
      <List :listData="onComputedebPayList" @delete="onClickDelete" :isEbPay="true"></List>
      <BackAddBtn v-if="onComputedebPayList.length < 2" @click="router.push('/addEbPay')">
        <template #title>{{ $t('BankcardView.AddwithdrawalAddress') }}</template>
        <template #text>{{ $t('BankcardView.virtualViewTip3') }}</template>
      </BackAddBtn>
      <Popup :visible="isPopupVisible">
        <!-- 弹出层的内容 -->
        <div class="popup-text">{{ $t('BankcardView.virtualViewTip2') }}</div>
        <div class="popup-footer">
          <div class="popup-footer-btn" @click="isPopupVisible = false">
            {{ $t('BankcardView.Cancel') }}
          </div>
          <div class="popup-footer-btn" @click="onClickConfirm">{{ $t('BankcardView.Sure') }}</div>
        </div>
      </Popup>
    </template>
    <template v-else>
      <div class="tips">Chưa được hỗ trợ</div>
    </template>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BackAddBtn from '../BackAddBtn/BackAddBtn'
import List from '../List/List'
import Popup from '../Popup/Popup'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const props = defineProps({
  ebPayList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['deleteEbPayItem'])

const onComputedebPayList = computed(() => {
  return props.ebPayList
})

const router = useRouter()
// 默认关闭弹窗
const isPopupVisible = ref(false)

// 传递过来的当前项
const objItem = reactive({})
// 删除按钮
const onClickDelete = (item) => {
  isPopupVisible.value = true
  objItem.value = item
}
const onClickConfirm = () => {
  emit('deleteEbPayItem', objItem.value.id)
  isPopupVisible.value = false
}
</script>
<style lang="scss" scoped>
.ebPayList {
  padding: 15px;
  background-color: #f7f7f7;
  .tips{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 92vw;
    height: 37.333333vw;
    border-radius: 2.666667vw;
    background: #fff;
    font-style: normal;
    font-weight: 400;
  }
}
.popup-text {
  margin: 8px 0 24px;
}
.popup-footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .popup-footer-btn {
    display: flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex: 1 0 0;
    border-radius: 6px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    background: var(--4, #fff5f0);
    color: var(--2, #ff5000);
  }
  .popup-footer-btn:last-child {
    margin-left: 12px;
    color: var(--text-icon-font-wh-1100, #fff);
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  }
}
</style>
