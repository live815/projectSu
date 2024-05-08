<template>
  <el-config-provider :locale="locale" v-if="isRouteAlive">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import { useRefresh } from './useRefresh'
import { getElementPlusLanguage } from '@/i18n'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const locale = getElementPlusLanguage(appStore.language)
const { isRouteAlive } = useRefresh()
</script>
