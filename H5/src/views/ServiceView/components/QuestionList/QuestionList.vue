<template>
  <div>
    <van-tabs
      v-model:active="active"
      swipeable
      line-width="30"
      :ellipsis="false"
      title-active-color="#111"
      title-inactive-color="#999"
      @click-tab="onClickActive"
    >
      <van-tab v-for="item in tutorialList" :key="item.title" :title="item.title" >
        <List :list="getSubList(item.subList)" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import List from '../List/List.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import listData from '../../question-list-data'
import { getTutorialListApi, getTutoriaSublListApi } from '@/api/announcement.js'
import { useFBStore } from '@/stores/fb';
const fbStore = useFBStore()

const emit = defineEmits(['tutorialList', 'update:active'])

// 获取教程列表
const tutorialList = ref([])
const getTutorialList = async function () {
  const res = await getTutorialListApi({ configType: '3' })
  tutorialList.value = res.data

  const subListPromises = tutorialList.value.map(async (item) => {
    const subRes = await getTutoriaSublListApi({ tuId: item.id })
    item.subList = subRes.data
  })

  await Promise.all(subListPromises)
  emit('tutorialList', tutorialList.value)
}

const router = useRouter()
const active = ref(0)

const props = defineProps({
  limit: {
    type: Number,
    default: 0
  }
})
const type = computed(() => {
  return listData[active.value].type
})

const getSubList = computed(() => (list) => {
  if (list) {
    let len = props.limit || list.length
    return list.slice(0, len)
  } else {
    return []
  }
})
const onClickActive = () => {
  fbStore.tabId = active.value
  emit('update:active', active.value)
}
onMounted(() => {
  const route = useRoute()
  const idx = route.params.idx
  active.value = Number(idx)
  getTutorialList()
})

// 导出给父组件调用
defineExpose({
  active
})
watch(
  ()=>active.value,
  ()=>{    
    if(fbStore.serviceId && fbStore.tabId){
      active.value = fbStore.tabId
    }
  },{deep:true}
)
</script>

<style lang="scss" scoped>
.line {
  display: block;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #eeeeee;
}
@include tabStyle();
:deep() {
  .van-tabs__nav {
    margin-left: -12px;
  }
}
</style>
