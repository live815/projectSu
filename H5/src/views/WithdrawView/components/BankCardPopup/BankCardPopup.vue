<template>
  <!-- 选择银行卡弹窗 -->
  <div>
    <CPopup ref="BankCardPopupDom" position="bottom">
      <div class="popup-top">
        <div class="popup-top-left" @click="onClickCancel">{{ $t('Wletter.cancel') }}</div>
        <div class="popup-top-min">{{ $t('Wletter.Selectbankcard') }}</div>
        <div
          class="popup-top-right"
          :class="{ activeText: onComptuedisActive }"
          @click="onClickConfirm"
        >
          {{ $t('Wletter.sure') }}
        </div>
      </div>
      <div class="popup-text">{{ listData.length }}/10</div>
      <!-- <van-scroll :height="300"> -->
      <div class="popup-content">
        <div
          class="popup-content-item"
          v-for="(item, index) in listData"
          :key="index"
          :class="{ active: activeIndex === index, 'disabled-color': item.status == 1 }"
          @click="selectBank(item, index)"
        >
          <div class="popup-content-item-left">
            <img class="popup-content-item-left-img" :src="getImg(item.icon)" />
            <div class="popup-content-item-left-title">{{ item.bankname }}</div>
            <div class="popup-content-item-left-text">
              ( {{ $t('Wletter.tailnumber') }}{{ item.cardNo.substr(-4) }})
            </div>
          </div>
          <template v-if="item.status == 1">
            <div class="popup-content-item-disabled">{{ $t('Wletter.disabled') }}</div>
          </template>
          <template v-else>
            <div class="popup-content-item-right" v-if="activeIndex === index">
              <van-icon name="success" style="color: #ff5000" />
            </div>
          </template>
        </div>
        <div class="popup-footer" v-if="listData.length < 10" @click="router.push('/addBankcard')">
          <span>+</span>
          <span>{{ $t('Wletter.Addbankcard') }}</span>
        </div>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import { useRouter } from 'vue-router'
import { getBankList } from '@/api/bindInfo'
import { getImg } from '@/utils'
const router = useRouter()

onMounted(() => {
  getList()
})

// 银行卡列表数据
const listData = ref([])
const getList = () => {
  // 获取银行卡列表
  getBankList().then((res) => {
    listData.value = res.data
  })
}

const emit = defineEmits(['onClickConfirm'])

// 高亮项
const activeIndex = ref(null)
const BankCardPopupDom = ref(null)
// ref子组件声明的方法打开弹窗
const showhide = () => {
  BankCardPopupDom.value.showhide()
}
defineExpose({ showhide })
// 右侧确认按钮是否高亮
const onComptuedisActive = computed(() => {
  if (checkedObj.value.bankname) {
    return true
  }
  return false
})
// 点击当前项的值
const checkedObj = ref({})
// 点击当前项
const selectBank = (item, index) => {
  if (item.status === 1) {
    return // 不执行后续操作
  }
  activeIndex.value = index
  checkedObj.value = { ...item }
}

// 确定按钮
const onClickConfirm = () => {
  BankCardPopupDom.value.showhide()
  emit('onClickConfirm', checkedObj.value)
  checkedObj.value = {}
  activeIndex.value = null
}
// 取消按钮
const onClickCancel = () => {
  checkedObj.value = {}
  activeIndex.value = null
  BankCardPopupDom.value.showhide()
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
  width: 343px;
  height: 220px;

  margin: 10px auto;
  overflow: auto;
  .popup-content-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 343px;
    height: 48px;
    margin: 9px 0;
    border-radius: 8px;
    background: #f9f9f9;
    .disabled-color {
      background-color: #999;
    }

    .popup-content-item-left {
      display: flex;
      align-items: center;
      color: #333;
      margin-left: 16px;
      .popup-content-item-left-img {
        width: 24px;
        height: 24px;
      }
      .popup-content-item-left-title {
        font-size: 16px;
        margin: 0 4px 0 8px;
      }
      .popup-content-item-left-text {
        font-size: 12px;
      }
    }
    .popup-content-item-right {
      // width: 18px;
      // height: 18px;
      margin-right: 30px;
    }
    .popup-content-item-disabled {
      margin-right: 30px;
      color: var(--1, #f53f3f);
      font-size: 14px;
      font-weight: 600;
    }
    .right-img {
      position: absolute;
      right: 0;
      width: 43px;
      height: 43px;
    }
  }

  .popup-content-item:nth-child(1) {
    margin-top: 0;
  }
  .active {
    background: #fff5f0;
  }
}
.popup-footer {
  color: var(--2, #ff5000);
  width: 343px;
  height: 48px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 6px;
  display: flex;
  align-items: center;

  background: #f9f9f9;
  > :first-child {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    padding: 2.5px;
  }
}
</style>
