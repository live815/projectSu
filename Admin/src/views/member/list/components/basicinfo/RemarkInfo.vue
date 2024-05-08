<template>
  <div class="basic-info-remark-info">
    <h3 class="h3-title">{{ $t('member.remarkInformation') }}</h3>
    <el-button type="primary" @click="open = true">{{ $t('member.add') }}</el-button>
    <el-table :data="tableData" style="margin-top: 16px;" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.updatedTime')" prop="createTime" align="center">
        <template #default="{row}">
          <span>{{ row.createTime?row.createTime:'-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.remarkInformation')" prop="remark" align="center">
        <template #default="{row}">
          <span>{{ row.remark?row.remark:'-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.remarkUsername')" prop="userName" align="center">
        <template #default="{row}">
          <span>{{ row.userName?row.userName:'-' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    <AddRemarkDialog 
      v-model:openStatus="open"
      :userName="queryParams.userName"
      :tenantId="tenantId"
      v-if="open"
      @onrefresh="getList"/>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { getRemarkList } from "@/api/member/list/index";
import AddRemarkDialog from './AddRemarkDialog.vue';

const props = defineProps(["formData","activeName","tenantId"]);
console.log(props.userName,9999,props.tenantId)

const queryParams = ref({
  userName:props.formData.userName,
  tenantId:props.tenantId,
  pageNum:1,
  pageSize:10
})
const tableData = ref([])
const total = ref(0)
const open = ref(false)

function getList(){
  getRemarkList(queryParams.value).then(res=>{
    tableData.value = res.rows
    total.value = res.total
  })
}

watch([()=>props.formData.userName,()=>props.activeName],()=>{
  queryParams.value.userName = props.formData.userName
  if(props.activeName==='1'&&props.formData.userName){
    getList()
  }
})
</script>

<style lang="scss" scoped>
.basic-info-remark-info{
  .h3-title{
    font-size: 16px;
    font-weight: 600;
  }
}
</style>