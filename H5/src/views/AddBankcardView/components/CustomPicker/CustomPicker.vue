<template>
  <van-popup round v-model:show="onComputedVisible" position="bottom" :style="{ height: '420px' }">
    <div class="popup-top">
      <div class="popup-top-left" @click="onClose">{{ $t('AddPage.Cancel') }}</div>
      <div class="popup-top-min">{{ $t('AddPage.SelectOpenaccountBank') }}</div>
      <div
        class="popup-top-right"
        :class="{ activeText: onComputedIsActive }"
        @click="onClickConfirm"
      >
        {{ $t('AddPage.Sure') }}
      </div>
    </div>

    <div class="popup-content">
      <div class="popup-content-search">
        <Search
          ref="searchRef"
          :placeholder="$t('AddPage.EnterbankCardname')"
          v-model="searchName"
        />
      </div>
      <div class="popup-content-list-wrapper">
        <div class="list">
          <div
            class="item"
            v-for="(item, index) in filterList"
            :key="index"
            :class="{ active: highlighted === index }"
            @click="selectBank(item, index)"
          >
            <div class="left">
              <img class="left-img" :src="getImg(item.icon)" />
              <div class="left-title">{{ item.bankName }}</div>
            </div>
            <img class="right" :src="tickIcon" v-if="highlighted === index" />
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import Search from '@/components/Search/Search'
import tickIcon from './img/tickIcon.png'
import { getBankSupport } from '@/api/bindInfo'
import { getImg } from '@/utils'
import _ from 'lodash'
onMounted(() => {
  getBank()
})

// 点击银行卡列表当前高亮
const highlighted = ref(null)

// 银行卡列表
const bankcardList = ref([])
// 获取支持银行卡列表
const getBank = () => {
  getBankSupport().then((res) => {
    bankcardList.value = res.data
  })
}

const emit = defineEmits(['update:visible', 'onConfirm'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})
// 搜索名字值
const searchName = ref('')

// 搜索组件
const searchRef = ref(null)
// 点击获取到列表当前项的数据
const checkedObj = ref({})

// 搜索列表
const filterList = computed(() => {
  return bankcardList.value.filter((item) => item.bankName.includes(searchName.value))
})

// 弹出层显示控制
const onComputedVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  }
})

// 确定按钮高亮
const onComputedIsActive = computed(() => {
  if (checkedObj.value.bankName) {
    return true
  }
  return false
})
// 取消按钮
const onClose = () => {
  clearSearch()
  highlighted.value = null
  checkedObj.value = {}
  emit('update:visible', false)
  emit('onConfirm')
}
// 清空搜索框
const clearSearch = () => {
  searchRef.value.clear()
}

// 点击当前项
const selectBank = (item, index) => {
  highlighted.value = index
  checkedObj.value = item
}

// 确定按钮
const onClickConfirm = () => {
  clearSearch()
  emit('update:visible', false)
  emit('onConfirm', checkedObj.value)
}
watch(searchName, (newVal) => {
  if (!newVal) {
    getBank()
  }
})
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
    font-size: 19px;
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
.popup-content {
  .popup-content-search {
    padding: 0 25px;
  }
  .popup-content-list-wrapper {
    margin-top: 15px;
    padding: 0 15px;
    height: 250px;
    overflow-y: auto;
    .list {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 345px;
        height: 50px;
        border-radius: 6px;
        .left {
          display: flex;
          align-items: center;
          .left-img {
            width: 32px;
            height: 32px;
          }
          .left-title {
            color: #111;
            font-size: 14px;
            font-weight: 400;
            margin-left: 11px;
          }
        }
        .right {
          width: 16px;
          height: 12px;
          margin-right: 19px;
        }
      }
      .active {
        background: #fff5f0;
      }
    }
  }
}
</style>
