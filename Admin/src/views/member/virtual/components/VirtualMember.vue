<template>
  <div class="virtual-member">
    <!-- 新增虚拟会员 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item :label="$t('member.virtualMember')" class="full-width" prop="virtualMember">
            <el-input
              v-model="queryParams.virtualMember"
              :placeholder="$t('member.pleaseInput')"
              clearable
              maxlength="16"
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
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
        <el-col :span="5">
          <el-form-item :label="$t('member.allowedTransferLobbyname')" prop="isTransfer" class="full-width">
            <el-select
              v-model="queryParams.isTransfer"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="2"
            >
              <el-option
                v-for="item in transferList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
      <el-table-column :label="$t('member.virtualMemberNoQuote')" align="center" prop="virtualMember">
      </el-table-column>
      <el-table-column :label="$t('member.virtualProxyNoQuote')" align="center" prop="virtualProxy">
      </el-table-column>
      <el-table-column :label="$t('member.allowedTransferLobbynameNoQuote')" align="center" prop="isTransfer" width="200">
      </el-table-column>
      <el-table-column :label="$t('member.initAmount')" align="center" prop="initBank">
      </el-table-column>
      <el-table-column :label="$t('member.vipLevelNoQuote')" align="center" prop="vipLevel">
      </el-table-column>
      <el-table-column :label="$t('member.nation')" align="center" prop="country">
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
          <el-button type="primary" size="small" @click="edit(scope.row)">{{ $t('member.edit') }}</el-button>
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
const transferList = ref([
  {label:'B体育',value:0},
  {label:'FB体育',value:1},
  {label:'PM体育',value:2},
  {label:'KS捕鱼',value:3},
  {label:'AG真人',value:4}
])
const virtualMemberList = ref([
  {virtualMember:'xunianita01',virtualProxy:'xunianita01',isTransfer:'B体育,FB体育,,PM体育,KS捕鱼,FG电子,IM体育',
  initBank:'初始化金额',vipLevel:'VIP1',country:'中国',remark:'老板测试',addPerson:'Yifeng',addTime:'2023- 06-18 21:10:14',editPerson:'han168',editTime:'2023- 06-18 21:10:14'}
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
.virtual-member{
  
}
/* .full-width{
  width:100%;
}
.pl-20{
  padding-left:20px;
} */
</style>