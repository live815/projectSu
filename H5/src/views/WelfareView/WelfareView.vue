<template>
  <div class="content top15">
    <NavBar :title="$t('Wletter.Welfarecenter')" v-if="!route.query.token" />
    <div class="header" v-if="welfareType == 1">
      <HeaderBox />
    </div>
    <SelectorBox @updateType="updateType" />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar/NavBar.vue'
import HeaderBox from './components/HeaderBoxComp.vue'
import SelectorBox from './components/SelectorBoxComp.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { query } = route

const welfareType = ref('')
const token = ref('')
const updateType = (n) => {
  welfareType.value = n
}
onMounted(() => {
  token.value = query.token
  console.log('route.query.token', route.query)
})
</script>

<style lang="scss" scoped>
.header {
  margin-top: 15px;
  padding: 0 15px 0 15px;
}
.content {
  background-color: #f7f7f7;
}
:deep(.van-tabs__line) {
  @include tabStyle();
}
</style>
