<template>
  <div class="main-container SelectTab">
    <el-badge
      class="tab-box"
      v-for="(item, index) in tabListData"
      :key="index"
      @click.stop="changeTab(item)"
      :value="announcement.totalUnread"
      :hidden="item.id != 7 || announcement.totalUnread == 0"
    >
      <div>
        <img
          class="tab-boxImg"
          :src="currentTabId == item.id ? item.iconSelectSrc : item.iconSrc"
        />
      </div>
      <span :class="item.id == currentTabId ? 'active' : ''">{{ item.title }}</span>
    </el-badge>
    <!-- <div
      class="tab-box"
      v-for="(item, index) in tabListData"
      :key="index"
      @click.stop="changeTab(item)"
    >
      <div>
        <img
          class="tab-boxImg"
          :src="currentTabId == item.id ? item.iconSelectSrc : item.iconSrc"
        />
      </div>
      <span :class="item.id == currentTabId ? 'active' : ''">{{ item.title }}</span>
    </div> -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { tabListData } from '../generalUserCenter.js'
import { useAnnouncementStore } from '@/stores/announcement'
const announcement = useAnnouncementStore()
const route = useRoute()
const router = useRouter()
onMounted(() => {
  changeTab(tabListData.find((item) => item.id == route.params.id))
})
watch(
  () => route.params,
  (newParams, oldParams) => {
    // console.log(newParams, oldParams)
    if (Object.keys(newParams).length !== 0) {
      const selectedTab = tabListData.find((item) => item.id == newParams.id)
      if (selectedTab) changeTab(selectedTab)
    }
  }
)

const currentTabId = ref(0)
const emit = defineEmits(['handlChangeTab'])

function changeTab(n) {
  currentTabId.value = n.id
  router.push(`/personal/${n.id}`)
  emit('handlChangeTab', n)
}
</script>

<style lang="scss" scoped>
span {
  margin-top: 4px;
  color: var(--60, rgba(255, 255, 255, 0.6));

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.SelectTab {
  display: flex;
  height: 98px;
  min-width: 1320px;
  max-width: 1320px;
  margin-top: 20px;
  border-radius: 8px;
  background: #272b45;
  .tab-box {
    padding-top: 16px;
    flex: 1 0 calc(11%); /* 九等分，间隔为 10px */
    text-align: center;
    cursor: pointer;
  }
  .tab-box:hover {
    background: linear-gradient(0deg, #3b4168 0%, #272b45 100%);
  }
  .tab-box:first-child {
    border-radius: 8px 0 0 8px;
  }
  .tab-box:last-child {
    border-radius: 0 8px 8px 0;
  }
  .tab-boxImg {
    width: 40px;
    height: 40px;
  }
  .active {
    color: #fff !important;
  }
}
:deep() {
  .tab-box {
    .el-badge__content {
      top: 20px;
      right: 70px;
    }
  }
}
</style>
