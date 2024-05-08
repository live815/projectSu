<template>
  <div>
    <NavBar :title="$t('setview.language')" />
    <van-radio-group v-model="appStore.language">
      <van-cell-group inset>
        <van-cell
          v-for="item in langList"
          :key="item.value"
          :title="item.title"
          clickable
          @click="changeLang(item.value)"
        >
          <template #right-icon>
            <van-radio :name="item.value" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { langList, setLanguageAsync } from '@/i18n'
const appStore = useAppStore()
import { inject } from 'vue'
const reload = inject('reload')
function changeLang(lang) {
  setLanguageAsync(lang).then(() => {
    reload() // 刷新App.vue
  })
}
</script>

<style lang="scss" scoped>
* {
  --van-cell-font-size: 15px;
  --van-cell-line-height: 40px;
  --van-cell-border-color: #dddddd;
  margin: 0;
}
</style>
