<template>
  <div class="virtualList">
    <List :listData="onComputedvirtualList" @delete="onClickDelete"></List>
    <BackAddBtn v-if="onComputedvirtualList.length < 10" @click="router.push('/addVirtual')">
      <template #title>{{ $t('BankcardView.AddwithdrawalAddress') }}</template>
      <template #text>{{ $t('BankcardView.virtualViewTip1') }}</template>
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BackAddBtn from '../BackAddBtn/BackAddBtn'
import List from '../List/List'
import Popup from '../Popup/Popup'

const props = defineProps({
  virtualList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['deleteVirtuaItem'])

const onComputedvirtualList = computed(() => {
  return props.virtualList
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
  emit('deleteVirtuaItem', objItem.value.id)
  isPopupVisible.value = false
}
</script>
<style lang="scss" scoped>
.virtualList {
  padding: 15px;
  background-color: #f7f7f7;
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
