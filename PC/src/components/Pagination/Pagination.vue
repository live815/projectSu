<template>
  <div>
    <div class="pagination">
      <el-pagination :small="list.small" :current-page="list.currentPage" :page-sizes="[10, 20, 30, 40,50]"
        layout="total, sizes, prev, pager, next, jumper" :page-size="list.pageSize" :total="props.total" :pager-count="list.pageCount"
        @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
    </div>
  </div>
</template>

<script setup>
import { update } from 'lodash';
import { onMounted, watch } from 'vue'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const list = ref({
  currentPage: 1,
  pageSize: 10,
  total: 10,
  pagerCount:'',
  small:false
})
const props = defineProps(['currentPage', 'pageSize', 'total','pagerCount','small'])
const emits = defineEmits(['update:currentPage', 'update:pageSize'])
// 处理分页切换事件
const handleCurrentChange = (newPage) => {
  list.value.currentPage = newPage
  emits('update:currentPage', newPage)
}
// 处理每页显示条数变化事件
const handleSizeChange = (newSize) => {
  list.value.pageSize = newSize
  emits('update:pageSize', newSize)
}
onMounted(() => {
  list.value.currentPage = props.currentPage
  list.value.pageSize = props.pageSize
  list.value.total = props.total
  list.value.pagerCount = props.pagerCount
  list.value.small = props.small
})
watch(
  ()=>fbStore.current,
  ()=>{
    if(fbStore.current == 1){
      list.value.currentPage = 1
    }
  },{deep:true, immediate: true}
)
</script>

<style lang="scss" scoped>
:deep() {
  .el-select .el-input__wrapper.is-focus {
    box-shadow: none;
  }

  .el-select el-input.is-focus .el-input__wrapper {
    box-shadow: none;
  }

  .el-select {
    --el-select-border-color-hover: 1px solid rgba(255, 255, 255, 0.2);
  }

  .el-pager li {
    color: var(--60, rgba(255, 255, 255, 0.6));
    background-color: #272b45;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .el-pager li.is-active {
    color: #f35f1b;
  }

  .el-pager li:hover {
    color: #f35f1b;
    border: 1px solid #f35f1b;
  }

  .el-pagination button.is-disabled,
  .el-pagination button:disabled {
    background-color: #272b45;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .el-pagination button {
    background-color: #272b45;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--60, rgba(255, 255, 255, 0.6));
  }

  .el-input__wrapper {
    background-color: #272b45;
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .el-pagination {
    --el-pagination-hover-color: #f35f1b;
  }

  .el-pagination.is-background .el-pager li.is-active {
    color: #f35f1b;
    border: 1px solid #f35f1b;
    // background-color: var(--100, #fff);
  }

  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: #272b45;
    color: var(--100, #fff);
  }
}</style>
