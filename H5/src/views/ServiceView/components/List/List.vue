<template>
  <div class="outter-main Listview">
    <div @click="select(item)" class="item" v-for="(item, idx) in list" :key="item.id">
      <div class="tab-service-content">
        <span class="title-index">{{ idx + 1 }}</span>
        <span class="title">{{ item.tabName }}</span>
      </div>
      <div class="is-link" v-if="list.length > 3">
        <IcoArrowRight />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFBStore } from '@/stores/fb'
import { useRouter } from 'vue-router'

const fbStore = useFBStore()
const router = useRouter()
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const select = (item) => {
  fbStore.serviceId = item.id
  router.push({
    name: 'service-detail',
    query: {
      tabId: fbStore.tabId,
      id: item.id
    }
  })
}
</script>

<style lang="scss" scoped>
.Listview {
  // border-top: 1px solid #eee;
  // font-family: Arial;
  .item {
    height: 54px;
    margin-right: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    .tab-service-content {
      .title {
        font-size: 14px;
        color: #000;
      }
      .title-index {
        color: #999;
        margin-right: 12px;
        font-size: 18px;
      }
    }
    .is-link {
      margin-left: 10px;

      svg {
        transform: scale(1.2);
        fill: #999;
      }
    }
  }
}
</style>
