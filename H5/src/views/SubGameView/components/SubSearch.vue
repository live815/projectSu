<template>
  <div class="sub-search">
    <div class="boxSearch">
      <IconArrowLeft @click="goBack" />
      <Search ref="searchRef" class="search" v-model.trim:modelValue="searchName" />
      <div @click="serachBtn">{{ $t('SubgameView.search') }}</div>
    </div>
    <div class="list" v-if="filterList.length > 0">
      <SubList :dataList="filterList" />
    </div>
    <NoResult v-else :noTxt="$t('SubgameView.Nodata')" />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import SubList from './SubList.vue'
import NoResult from './NoResult.vue'
const emit = defineEmits(['seachBtn'])
const props = defineProps({
  showRight: {
    type: Boolean,
    default: true
  },
  dataList: {
    type: Object
  }
})
const searchName = ref('')
const filterList = ref([])
// onMounted(() => {
//   console.log(props.showRight, 'showRight', props.dataList)
// })
// const onSearch = (value) => {
//   if (value) {
//     searchName.value = value
//   } else {
//     filterList.value = []
//   }
// }
const serachBtn = () => {
  //去返回的数量里面查找
  if (searchName.value) {
    filterList.value = props.dataList.filter((item) => item.lobbyName.includes(searchName.value))
  }
}
const goBack = () => {
  emit('seachBtn')
}
</script>

<style lang="scss" scoped>
.sub-search {
  width: 100%;
  height: (var(--app-height));
  background: #f7f7f7;
  @include clearfix();
}
.boxSearch {
  width: 100%;
  height: 52px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}
.list {
  width: calc(100% - 14px);
  margin: 0 6.5px 0 6.5px;
}

.search {
  width: 280px;
  height: 40px;
}
:deep() .search input {
  border-radius: 60px !important;
  background: #fff;
}
</style>
