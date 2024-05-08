<template>
  <!-- 选择提币地址弹窗 -->
  <div>
    <CPopup ref="BankCardPopupDom" position="bottom">
      <div class="popup-top">
        <div class="popup-top-left" @click="onClickCancel">{{ $t('Wletter.cancel') }}</div>
        <div class="popup-top-min">{{ $t('Wletter.tip108') }}</div>
        <div
          class="popup-top-right"
          :class="{ activeText: onComptuedisActive }"
          @click="onClickConfirm"
        >
          {{ $t('Wletter.sure') }}
        </div>
      </div>
      <div class="popup-text">
        {{ listData.length }}/{{ props.currentType == 'USDT' ? '10' : '2' }}
      </div>
      <div class="popup-content">
        <div
          class="popup-content-item"
          v-for="(item, index) in listData"
          :key="item.id"
          :class="{ active: activeIndex === index, 'disabled-color': item.status == 1 }"
          @click="selectBank(item, index)"
        >
          <div class="popup-content-item-left">
            <div class="popup-content-item-left-top">
              <div class="name">{{ $t('Wletter.alias') }}{{ item.alias }}</div>
              <div class="agreement">
                {{ $t('Wletter.protocol') }}<span>{{ item.protocol }}</span>
              </div>
            </div>
            <div class="content">{{ item.addr }}</div>
          </div>
          <!-- <div class="popup-content-item-right">
          <van-icon name="delete-o" />
        </div> -->
          <template v-if="item.status == 1">
            <img src="./img/forbidden.png" class="right-disabled" />
          </template>
          <template v-else>
            <img :src="icon" class="right-img" v-if="activeIndex === index" />
          </template>
        </div>
        <template v-if="props.currentType == 'USDT'">
          <div class="popup-footer" v-if="listData.length < 10" @click="router.push('/addVirtual')">
            <span>+</span>
            <span> {{ $t('Wletter.Addvirtualcurrency') }}</span>
          </div>
        </template>
        <template v-else>
          <div class="popup-footer" v-if="listData.length < 2" @click="router.push('/addEbPay')">
            <span>+</span>
            <span> {{ $t('Wletter.AddEbPaycurrency') }}</span>
          </div>
        </template>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import { useRouter } from 'vue-router'
import { getCryptocyList } from '@/api/bindInfo'
import icon from './img/icon.png'
const router = useRouter()
const emit = defineEmits(['onClickConfirm'])

const props = defineProps({
  currentType: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  getList()
})
// 虚拟币数据
const listData = ref([])
const getList = () => {
  // 获取USDT列表
  getCryptocyList(props.currentType).then((res) => {
    if (res.data) {
      listData.value = res.data
    }
  })
}

const BankCardPopupDom = ref(null)
// ref子组件声明的方法打开弹窗
const showhide = () => {
  BankCardPopupDom.value.showhide()
}
defineExpose({ showhide })
// 右侧确认按钮是否高亮
const onComptuedisActive = computed(() => {
  if (checkedObj.value.alias) {
    return true
  }
  return false
})

// 高亮项
const activeIndex = ref(null)
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
  height: 260px;
  width: 343px;
  margin: 10px auto;

  overflow: auto;
  .popup-content-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 343px;
    height: 58px;
    margin: 8px 0;
    border-radius: 8px;
    background: #f9f9f9;
    .disabled-color {
      background-color: #999;
    }

    .popup-content-item-left {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      color: #333;
      width: 100%;
      margin-left: 16px;
      .popup-content-item-left-top {
        display: flex;
        justify-content: space-between;
        color: #111;
        font-size: 12px;
        font-weight: 400;
        .agreement {
          margin-right: 25px;
          span {
            color: var(--333, #333);
            font-weight: 600;
          }
        }
      }
      .content {
        color: #111;
        margin-top: 10px;
        font-size: 12px;
        font-weight: 400;
      }
    }
    .popup-content-item-right {
      width: 16px;
      height: 16px;
      margin-right: 21px;
    }
    .right-img {
      position: absolute;
      right: 0;
      width: 43px;
      height: 43px;
    }
    .right-disabled {
      position: absolute;
      top: 0;
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
  margin: 10px 0;

  background: #f9f9f9;
  > :first-child {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    padding: 2.5px;
  }
}
</style>
