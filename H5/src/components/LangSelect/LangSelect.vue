<template>
  <van-radio-group v-model="appStore.language" class="language mb-15">
    <van-radio :name="item.value" v-for="item in langList" :key="item.value">
      {{ item.title }}
      <template #icon="props">
        <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
      </template>
    </van-radio>
  </van-radio-group>
</template>

<script setup>
const activeIcon = ref(new URL('@/assets/img/checked.png', import.meta.url).href)
const inactiveIcon = ref(new URL('@/assets/img/unchecked.png', import.meta.url).href)
import { langList, setLanguageAsync } from '@/i18n'
import { useAppStore } from '@/stores/app'
import { inject } from 'vue'
const reload = inject('reload')
const appStore = useAppStore()
watch(
  () => appStore.language,
  (lang) => {
    setLanguageAsync(lang).then(() => {
      reload() // 刷新App.vue
    })
  }
)
</script>

<style lang="scss" scoped>
.language {
  img {
    width: 18px;
  }
  ::v-deep() .van-radio__label {
    color: #111;
    font-size: 14px;
    font-weight: 400;
  }
}
.mb-15 {
  .van-radio {
    margin-bottom: 15px;
  }
}
</style>
