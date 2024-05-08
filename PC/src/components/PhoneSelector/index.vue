<template>
  <div class="select-box" v-show="showSelect">
    <input class="search" v-model="searchText" type="text" :placeholder="$t('Components.Notice_20')" />
    <div class="list">
      <ul>
        <li v-for="(item, index) in filterCountryList" :key="index" @click="changeCode(item)">
          <div class="country-icon" :style="{ backgroundImage: 'url(' + getImg(item.icon) + ')' }"></div>
          <div class="select-text-country" :class="{ left: !props.showCode }">
            {{ item.countryCn }}
          </div>
          <div class="select-text-code" v-show="props.showCode">{{ item.phoneCode }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { getImg } from '@/utils'
import { ref, computed } from 'vue'
const showSelect = ref(false)
const searchText = ref('')
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const emit = defineEmits(['getAreaCode'])
const props = defineProps({
  showCode: {
    type: Boolean,
    default: true
  }
})
if (!appStore.countryList.length) {
  appStore.getCountryCodeList()
}

watchEffect(() => {
  if (appStore.countryList.length) {
    // 初始化当前国家
    emit('getAreaCode', appStore.countryList[0])
  }
})
const filterCountryList = computed(() => {
  let text = searchText.value
  return appStore.countryList.filter((item) => {
    return item.countryCn.includes(text) || item.phoneCode.includes(text)
  })
})
function changeCode(item) {
  emit('getAreaCode', item)
  handleCloseSelect()
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
const handleClickOutside = (event) => {
  if (showSelect.value && !event.target.closest('.select-box')) {
    handleCloseSelect()
  }
}

function handleShowSelect() {
  event.preventDefault()
  showSelect.value = true
}
function handleCloseSelect() {
  showSelect.value = false
}

defineExpose({ handleShowSelect })
</script>

<style lang="scss" scoped>
.left {
  margin-left: 50px !important;
}
.country-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  background-size: cover;

  img {
    position: relative;
  }
}
.select-box {
  position: absolute;
  z-index: 2008;
  width: 248px;
  height: 305px;
  padding-top: 16px;
  background: #1d223c;
  box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  .search {
    width: 216px;
    height: 32px;
    padding-left: 12px;
    margin-left: 16px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--100, #fff);
    
    font-size: 14px;
    font-weight: 400;
  }
  .list {
    overflow-y: scroll;
    scrollbar-width: none;//火狐浏览器 隐藏滚动条
    height: 255px;
    ul {
      margin-top: 4px;
      padding-left: 0;
      li {
        display: flex;
        align-items: center;
        list-style: none;
        height: 40px;
        padding: 12px 0 12px 16px;
        color: var(--60, rgba(255, 255, 255, 0.6));
        
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        .select-text-country {
          text-align: center;
          margin-left: 13px;
          width: 100px;
        }
        .select-text-code {
          margin-left: 30px;
        }
      }
      li:hover {
        background: rgba(255, 255, 255, 0.04);
      }
    }
  }
}
</style>
