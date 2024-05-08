<template>
  <div class="virtual-proxy">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item :label="$t('member.virtualProxy')" prop="virtualProxy" class="full-width">
            <el-input
              v-model="queryParams.virtualProxy"
              :placeholder="$t('member.pleaseInput')"
              clearable
              maxlength="16"
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="pl-20">
          <el-button type="primary" @click="handleQuery">{{ $t('member.search') }}</el-button>
          <el-button type="primary" @click="reset">{{ $t('member.reset') }}</el-button>
          <el-button type="danger" @click="add">{{ $t('member.add') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="virtualMemberList" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.virtualMemberNoQuote')" align="left" prop="virtualProxy">
      </el-table-column>
      <el-table-column :label="$t('member.agentNameNoQuote')" align="center" prop="prevProxy">
      </el-table-column>
      <el-table-column :label="$t('member.remarkNoQuote')" align="center" prop="remark">
      </el-table-column>
      <el-table-column :label="$t('member.adder')" align="center" prop="addPerson">
      </el-table-column>
      <el-table-column :label="$t('member.addedTime')" align="center" prop="addTime" width="200">
      </el-table-column>
      <el-table-column :label="$t('member.updater')" align="center" prop="editPerson">
      </el-table-column>
      <el-table-column :label="$t('member.updateTime')" align="center" prop="editTime"  width="200">
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center" width="200">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)" size="small">{{ $t('member.edit') }}</el-button>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const queryRef = ref(null)
const queryParams = ref({
  virtualMember:null,
  virtualProxy:null,
  isTransfer:null,
  pageNum:1,
  pageSize:10
})
const total = ref(0)
const virtualMemberList = ref([
  {prevProxy:'xunianita01',virtualProxy:'xunianita01',remark:'测试虚拟账号报表使用',
  addPerson:'Yifeng',addTime:'2023- 06-18 21:10:14',editPerson:'han168',editTime:'2023- 06-18 21:10:14'}
])

function getList(){
  
}
const handleQuery = ()=>{
  console.log(queryParams.value)
}
const reset = ()=>{
  queryRef.value.resetFields()
}
const add = ()=>{

}
const edit = (row)=>{
  console.log(row)
}
</script>

<style scoped>
.virtual-proxy{

}
.full-width{
  width:100%;
}
.pl-20{
  padding-left:20px;
}
</style>