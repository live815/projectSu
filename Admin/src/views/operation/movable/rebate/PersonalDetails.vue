<template>
  <div>
    <el-form :model="queryParams" ref="uploadRef" :inline="true">
      <el-row :gutter="24" align="middle" justify="space-between">
        <el-col :span="21">
          <el-form-item :label="$t('operation.memberaccount1')">
            <div class="color">
              {{ props.rowItem.userName }}
            </div>
          </el-form-item>
          <el-form-item :label="$t('operation.tip154')"> {{ props.rowItem.amount }}</el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="status">
            <div class="round">
              <span class="slanted-text">
                {{
                  props.rowItem.status === 1
                    ? $t('operation.Alreadyrebate')
                    : props.rowItem.status === 0
                    ? $t('operation.Norebate')
                    : props.rowItem.status
                }}</span
              >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-table :data="data?.rows" style="width: 1150px">
          <el-table-column
            type="index"
            prop="date"
            :label="$t('operation.serialnumber')"
            width="80"
          />
          <el-table-column prop="betTime" :label="$t('operation.BetTime')" width="180" />
          <el-table-column prop="lobbyName" :label="$t('operation.Venue')" width="180" />
          <el-table-column prop="gameName" :label="$t('operation.gameName')" width="180" />
          <el-table-column prop="validBet" :label="$t('operation.runWater')" width="180" />
          <el-table-column prop="rebateRate" :label="$t('operation.tip155')" width="180" />
          <el-table-column prop="rebateAmount" :label="$t('operation.tip156')" width="180" />
          <el-table-column prop="recordTime" :label="$t('operation.tip157')" width="180" />
        </el-table>
      </el-form-item>
      <el-form-item>
        <div class="qq">
          <el-button type="primary" class="botton" @click="confirmAndClose">{{
            $t('operation.sure')
          }}</el-button>
        </div>
      </el-form-item>
    </el-form>
    <pagination
      v-show="data?.total > 0"
      :total="data?.total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { cashbackDetailsApi } from '@/api/operation/activeConfiguration'

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  recordTime: props.rowItem.createTime,
  userId: props.rowItem.userId
})
const total = ref()
const emits = defineEmits(['closeDialog', 'dataPaging'])
const uploadRef = ref(null)
const loading = ref(false)
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  rowItem: {
    type: Object,
    default: () => {}
  }
})

const confirmAndClose = () => {
  emits('closeDialog')
}
//分页
function getList() {
  loading.value = true
  cashbackDetailsApi(queryParams.value)
    .then((res) => {
      emits('dataPaging', res)
      loading.value = false
      total.value = res.total
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
    })
}
// onMounted(() => {
//   getList();
// });
</script>

<style lang="scss" scoped>
.color {
  color: #1890ff;
}
.round {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slanted-text {
  transform: rotate(45deg);
  font-style: italic;
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  color: #333333;
}
.qq {
  margin-top: 20px;
  width: 1150px;
  text-align: center;
}
.botton {
  width: 145px;
  height: 47px;
}
:deep() {
  .pagination-container .el-pagination {
    right: 30px;
    position: absolute;
  }
}
</style>
