<template>
  <div class="lang-box" style="position: relative" ref="buttonRef" v-click-outside="onClickOutside">
    <img class="redFlag" :src="getCurrentLangIcon()" />
    <div class="triangle"></div>
  </div>

  <div class="popover-container">
    <el-popover
      width="180"
      popper-class="country-selector"
      :offset="25"
      ref="popoverRef"
      :virtual-ref="buttonRef"
      trigger="hover"
      virtual-triggering
    >
      <div class="lang-selector-container">
        <div
          @click="changeLang(item.value)"
          class="selector-item"
          v-for="(item, index) in langList"
          :key="index"
        >
          <div class="circle" :style="{ backgroundImage: 'url(' + item.icon + ')' }"></div>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { langList, setLanguageAsync } from '@/i18n'
import { inject } from 'vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const reload = inject('reload')
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
function getCurrentLangIcon() {
  return langList.find((lang) => lang.value === appStore.language)?.icon
}

function changeLang(lang) {
  appStore.language = lang
  setLanguageAsync(lang).then(() => {
    // reload()
    // 重新加载整个页面
  location.reload();
  })
}
</script>

<style lang="scss" scoped>
.lang-box {
  cursor: pointer;
  .triangle {
    position: absolute;
    top: 12px;
    width: 0;
    height: 0;
    right: -12px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgba(255, 255, 255, 0.6);
  }
}
.redFlag {
  width: 30px;
}
.lang-selector-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 4px;
  .selector-item {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding-left: 10px;
    background-color: #171a2f;
    border-radius: 4px;
    color: var(--80, rgba(255, 255, 255, 0.8));
    
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    .circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-size: cover;
    }
  }
  .selector-item:hover {
    background-color: #323c6f;
    color: var(--100, #fff);
  }
}
</style>
<style lang="scss">
.country-selector.el-popover {
  background-color: pink !important;
  border-radius: 4px !important;
  background: #232949 !important;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.23) !important;
  border: none;
  padding: 0 !important;
}
.country-selector .el-popover[x-placement^='bottom'] .popper__arrow::after {
  border-bottom-color: red !important;
}
.country-selector.el-popper.is-light .el-popper__arrow::before {
  /* 三角形背景颜色 */
  background: var(--unnamed, #232949) !important;
  border: 1px solid #232949 !important;
}
</style>
