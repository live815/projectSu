<template>
  <div class="country" @click="openDialog" :class="{ 'has-split-line': hasImg && type === 1 }">
    <div class="icon">
      <img v-if="hasImg" :src="getImg(modelValue.icon)" alt="" />
    </div>
    <span v-if="type === 1">{{ modelValue.phoneCode }}</span>
    <span v-else-if="type === 2">{{ modelValue.countryCn }}</span>
  </div>

  <Teleport to="body">
    <van-popup round v-model:show="open" position="bottom" :style="{ height: '60%' }">
      <div class="popup">
        <div class="tit">
          <h2>
            {{ $t('common.select') }}{{ type === 2 ? $t('common.country') : $t('common.areaCode') }}
          </h2>
          <IconClose @click="open = false" class="close" />
        </div>
        <div class="content">
          <Search ref="searchRef" v-model="query" />
          <div class="list-wrapper">
            <div class="list">
              <div
                @click="selectCountry(item)"
                class="item"
                v-for="item in filterList"
                :key="item.countryCode"
              >
                <div class="left">
                  <p><img :src="getImg(item.icon)" alt="" /></p>
                  <span>{{ item.countryCn }}</span>
                </div>
                <p v-if="type === 1" class="code">{{ item.phoneCode }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import IconClose from '@/components/icons/IconClose'
import Search from '@/components/Search/Search'
import { getImg } from '@/utils'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const props = defineProps({
  type: {
    type: Number,
    default: 1 // 1显示区号，2显示国家名称
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Object,
    default: () => ({})
  },
  hasImg: {
    type: Boolean,
    default: true
  }
})
const query = ref('')
const open = ref(false)
const searchRef = ref(null) // 搜索组件
const emit = defineEmits(['update:modelValue'])
if (!appStore.countryList.length) {
  appStore.getCountryCodeList()
}

watchEffect(() => {
  if (appStore.countryList.length) {
    // 初始化当前国家
    setCurrentCountry(appStore.countryList[0])
  }
})

const filterList = computed(() => {
  return appStore.countryList.filter((item) => item.countryCn.includes(query.value))
})

// 选择国家
const selectCountry = (item) => {
  setCurrentCountry(item)
  closeDialog()
}
// 设置当前国家
function setCurrentCountry(item) {
  emit('update:modelValue', item)
}
const closeDialog = () => {
  open.value = false
  clearSearch()
}
const openDialog = () => {
  if (props.disabled) return
  open.value = true
}
// 清空搜索框
const clearSearch = () => {
  searchRef.value.clear()
}
</script>

<style lang="scss" scoped>
.country {
  display: flex;
  align-items: center;
  position: relative;
  // width:100%;
  .icon {
    $size: 26px;
    width: $size;
    height: $size;
    margin-right: 8px;
    img {
      width: 100%;
    }
  }
  span {
    font-size: 15px;
    color: #000;
  }

  &.has-split-line::after {
    content: '';
    position: absolute;
    right: 0;
    top: 4px;
    height: 20px;
    width: 1px;
    background: #eee;
  }
}
.popup {
  padding: 25px;
  .tit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2 {
      font-size: 19px;
      color: #111;
    }
    .close {
      fill: #555;
    }
  }
  .content {
    margin-top: 25px;
    .list-wrapper {
      height: 255px;
      margin-top: 15px;
      overflow-y: auto;
      // border:1px solid red;
    }
    .list {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 25px;
        &:last-child {
          margin-bottom: 0;
        }
        .left {
          display: flex;
          align-items: center;
          img {
            width: 33px;
            height: 33px;
            display: block;
            margin-right: 10px;
          }
        }
        .code {
          font-weight: 600;
          color: #111;
        }
      }
    }
  }
}
</style>
