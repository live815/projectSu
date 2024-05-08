<template>
  <!-- 右侧弹出 -->
  <div style="width: 339px">
    <van-popup
      class="popup-box"
      v-model:show="onComputedShow"
      position="right"
      closeable
      @click-close-icon="onClickCloseIcon"
    >
      <div class="popup-top">{{ $t('Transactrecord.filter') }}</div>
      <div class="popup-min">
        <div class="popup-min-title">{{ $t('Transactrecord.Fundtype') }}</div>
        <div class="popup-min-list">
          <div
            class="popup-min-list-item"
            v-for="(item, index) in dataType"
            :class="{ active: selectedTab === index }"
            :key="item.id"
            @click="changeTab(index, item)"
          >
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="popup-min">
        <div class="popup-min-title">{{ $t('Transactrecord.Fundingstatus') }}</div>
        <div class="popup-min-list">
          <div
            class="popup-min-list-item"
            v-for="(item, index) in dataStatus"
            :class="{ active: selectedStatusTab === index }"
            :key="item.id"
            @click="changeStatusTab(index, item)"
          >
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <div class="popup-footer-left" @click="onClickReset">
          {{ $t('Transactrecord.reset') }}
        </div>
        <div class="popup-footer-right" @click="onClickConfirm">
          {{ $t('Transactrecord.sure') }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import i18n from '@/i18n'

const emit = defineEmits(['update:show', 'changeStatus'])

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const onComputedShow = computed({
  get() {
    return props.show
  },
  set(val) {
    emit('update:show', val)
  }
})

// 默认高亮第一个
const selectedTab = ref(0)
// 交易类型
const orderType = ref('')

// 资金类型
const dataType = reactive([
  {
    id: '',
    title: i18n.global.t('Transactrecord.all')
  },
  {
    id: '1',
    title: i18n.global.t('Transactrecord.topup')
  },
  {
    id: '2',
    title: i18n.global.t('Transactrecord.withdraw')
  },
  {
    id: '5',
    title: i18n.global.t('Transactrecord.rebate')
  },
  {
    id: '3',
    title: i18n.global.t('Transactrecord.transfer')
  },
  {
    id: '6',
    title: i18n.global.t('Transactrecord.dividend')
  },
  {
    id: '7',
    title: i18n.global.t('Transactrecord.Systemadjust')
  },
  {
    id: '8',
    title: i18n.global.t('Transactrecord.livestream')
  }
])
// 资金类型切换
const changeTab = (index, item) => {
  orderType.value = item.id
  selectedTab.value = index
}

const selectedStatusTab = ref(0)
// 资金状态
const dataStatus = reactive([
  {
    id: 1,
    title: i18n.global.t('Transactrecord.all')
  },
  {
    id: 2,
    title: i18n.global.t('Transactrecord.success')
  },
  {
    id: 3,
    title: i18n.global.t('Transactrecord.Process')
  },
  {
    id: 4,
    title: i18n.global.t('Transactrecord.fail')
  }
])
const orderStatus = ref('')

// 资金状态切换
const changeStatusTab = (index, item) => {
  selectedStatusTab.value = index
  switch (item.id) {
    case 1:
      return (orderStatus.value = '')
    case 2:
      return (orderStatus.value = 1)
    case 3:
      return (orderStatus.value = 0)
    case 4:
      return (orderStatus.value = 2)
  }
}

// 关闭
const onClickCloseIcon = () => {
  emit('update:show')
}

// 重置
const onClickReset = () => {
  selectedTab.value = 0
  selectedStatusTab.value = 0
  orderType.value = ''
  orderStatus.value = ''
  emit('changeStatus', selectedTab.value, orderStatus.value, orderType.value)
}

// 确定
const onClickConfirm = () => {
  emit('changeStatus', selectedTab.value, orderStatus.value, orderType.value)
  selectedTab.value = 0
  selectedStatusTab.value = 0
  orderType.value = ''
}
</script>
<style lang="scss" scoped>
.popup-box {
  position: relative;
  overflow: hidden;
}
:deep().van-popup {
  width: 339px;
  height: 100%;
}
.popup-top {
  color: #111;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  margin: 20px 0 0 15px;
}
.popup-min {
  width: 100%;
  margin-top: 20px;
  padding-left: 15px;
  padding-right: 14px;
  .popup-min-title {
    color: #111;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .popup-min-list {
    display: flex;
    flex-wrap: wrap;
    .popup-min-list-item {
      min-width: 95px;
      height: 36px;
      flex-shrink: 0;
      border-radius: 90px;
      background: #f7f7f7;
      text-align: center;
      line-height: 36px;
      margin: 5px 3.8px 5px 3.8px;
      padding: 0 15px;
    }
    .active {
      border: 0.5px solid #ff5000;
      background: #fff5f0;
    }
  }
}

.popup-footer {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  width: 309px;
  height: 44px;
  .popup-footer-left {
    width: 154px;
    height: 44px;
    color: #ff5000;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    line-height: 44px;
    border: 0.5px solid #ff5000;
    border-radius: 6px 0px 0px 6px;
  }
  .popup-footer-right {
    width: 154px;
    height: 44px;
    font-size: 15px;
    border-radius: 0px 6px 6px 0px;
    background: linear-gradient(90deg, #ff9000 16%, #ff5000 87.23%);
    font-weight: 600;
    color: #fff;
    text-align: center;
    line-height: 44px;
  }
}
</style>
