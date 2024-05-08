<template>
  <div class="code-check">
    <el-form :model="queryParams" ref="queryRef" :inline="true" class="full-width">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item :label="$t('member.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.phoneNumber')" prop="mobile" class="full-width">
            <el-input
              v-model="queryParams.mobile"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.actionType')" prop="actionType" class="full-width">
            <el-select
              v-model="queryParams.actionType"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in sys_mobile_action_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="handleQuery">{{ $t('member.search') }}</el-button>
          <el-button type="primary" @click="reset">{{ $t('member.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="phoneManageList" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
            <template #default="scope">
               <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
            </template>
      </el-table-column>
      <el-table-column :label="$t('member.applyTimeNoQuote')" align="center" prop="createTime" width="160">
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.phoneNumberNoQuote')" align="center" prop="mobile">
        <template #default="{ row }">
          <span>{{ row.mobile ? row.mobile : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.userNameNoQuote')" align="center" prop="userName">
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.actionTypeNoQuote')" align="center" prop="userName">
        <template #default="{ row }">
          <span>{{ filterLabel(sys_mobile_action_type,String(row.actionType)) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.verityCode')" align="center" prop="vercode">
        <template #default="{ row }">
          <span>{{ row.vercode || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.status')" align="center" prop="status">
        <template #default="{ row }">
          <span>{{ row.status === 0 ? $t('member.success') : $t('member.reject') }}</span>
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
import { ref } from 'vue';
import { getVercodeList } from "@/api/member/phone/index";
import { getCurrentInstance } from 'vue';
import { filterLabel } from "@/utils";

const { proxy } = getCurrentInstance();
const {  sys_mobile_action_type } = proxy.useDict("sys_mobile_action_type");//资金调整类型
const queryRef = ref(null)
const queryParams = ref({
  userName:null,
  mobile:null,
  actionType:null,
  pageNum:1,
  pageSize:10
})
const total = ref(0)
const phoneManageList = ref([])
const isFirstLoad = ref(true)

onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
function getList() {
  return getVercodeList(queryParams.value).then((res) => {
    phoneManageList.value = res.records || [];
    total.value = res.total || 0;
  });
}
const handleQuery = ()=>{
  queryParams.value.pageNum = 1;
  getList();
}
const reset = ()=>{
  queryRef.value.resetFields()
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style scoped>
.code-check{
}

</style>