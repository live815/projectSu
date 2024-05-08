<template>
  <!-- 充值姓名弹窗 -->
  <CPopup ref="cPopupDom" height="50%" position="bottom">
    <div class="popup-top">
      <div class="popup-top-left" @click="onClickCancel">{{ $t('DepositView.Cancle') }}</div>
      <div class="popup-top-min">{{ $t('DepositView.ChoseName') }}</div>
      <div class="popup-top-right" :class="{ activeText: isActive }" @click="onClickConfirm">
        {{ $t('DepositView.Sure') }}
      </div>
    </div>
    <div class="popup-text">{{ onComputedList.length }}/5</div>
    <div class="popup-content">
      <div
        class="popup-content-item"
        v-for="item in onComputedList"
        :key="item.id"
        :class="{ active: item.highlighted }"
        @click="selectBank(item)"
      >
        <div class="popup-content-item-left">{{ item.name }}</div>
        <div class="popup-content-item-right">
          <van-icon name="delete-o" />
        </div>
        <img :src="icon" class="right-img" v-if="item.highlighted" />
      </div>
    </div>
    <div class="popup-footer" v-if="onComputedList.length < 5" @click="router.push('/addBankcard')">
      <span>+</span>
      <span>{{ $t('DepositView.UsenewName') }}</span>
    </div>
  </CPopup>
</template>

<script setup>
import { computed, ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import icon from './img/icon.png'
import eventBus from '@/utils/eventBus'
import { useRouter } from 'vue-router'
const router = useRouter()

const onComputedList = computed(() => {
  return listData.value
})

const listData = ref([])
const cPopupDom = ref(null)
// ref子组件声明的方法打开弹窗
const showhide = (value) => {
  listData.value = value
  cPopupDom.value.showhide()
}
defineExpose({ showhide })
const isActive = ref(false)
const checkedObj = ref({})
// 点击当前项
const selectBank = (item) => {
  listData.value.forEach((el) => {
    if (el.name == item.name) {
      item.highlighted = true
    } else {
      el.highlighted = false
    }
  })
  if (item.highlighted) {
    isActive.value = true
    checkedObj.value = { ...item }
  } else {
    isActive.value = false
    checkedObj.value = {}
  }
}

// 确定按钮
const onClickConfirm = () => {
  cPopupDom.value.showhide()
  eventBus.emit('username', checkedObj.value)
}
// 取消按钮
const onClickCancel = () => {
  cPopupDom.value.showhide()
}
</script>
<style lang="scss" scoped>
.popup-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-style: normal;
  font-size: 14px;
  margin: 25px 0 31px 0;
  .popup-top-left {
    color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
    margin-left: 16px;
  }
  .popup-top-min {
    color: #111;
    font-size: 18px;
    font-weight: 600;
  }
  .popup-top-right {
    color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
    margin-right: 16px;
  }
  .activeText {
    color: #ff5000;
  }
}
.popup-text {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  margin: 20px 0 8px 16px;
}

.popup-content {
  margin-left: 16px;
  .popup-content-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 343px;
    height: 44px;
    margin: 8px 0;
    border-radius: 8px;
    background: #f9f9f9;

    .popup-content-item-left {
      color: #111;
      font-size: 16px;
      font-weight: 400;
      margin-left: 16px;
    }
    .popup-content-item-right {
      // width: 18px;
      // height: 18px;
      margin-right: 30px;
    }
    .right-img {
      position: absolute;
      right: 0;
      width: 43px;
      height: 43px;
    }
  }
  .active {
    background: #fff5f0;
  }
}
.popup-footer {
  color: var(--2, #ff5000);
  font-size: 16px;
  font-weight: 400;
  margin-left: 16px;
  margin-top: 15px;
  > :first-child {
    width: 20px;
    height: 20px;
    padding: 2.5px;
  }
}
</style>
