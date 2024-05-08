<template>
  <div class="hand-label-list">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('member.keyWord')" prop="labelName" class="full-width">
            <el-input
              v-model="queryParams.labelName"
              :placeholder="$t('member.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-button
            icon="Search"
            type="primary"
            @click="handleQuery"
            >{{ $t('member.search') }}</el-button
          >
          <el-button icon="Refresh" type="primary" @click="reset">{{ $t('member.reset') }}</el-button>
          <el-button
            icon="Plus"
            @click="addLabel"
            v-hasPermi="['member:list:add']"
            class="add-label"
            >{{ $t('member.addLabel') }}</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="handLabelList" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.labelNumber')" align="center" prop="userCount">
        <template #default="scope">
          <!-- <HandLabel :data="scope.row.userCount" :id="scope.row.id" /> -->
          <span class="pointer" @click="openDialog(scope.row)">{{ scope.row.userCount||scope.row.userCount===0 ?scope.row.userCount:'-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.departmentNoQuote')" align="center">
        <template #default="{ row }">
          <span v-if="row.dept==='1'">{{ $t('member.riskControl') }}</span>
          <span v-else-if="row.dept==='2'">{{ $t('member.operations') }}</span>
          <span v-else-if="row.dept==='3'">{{ $t('member.finance') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.labelNameNoQuote')" align="center" prop="labelName">
        <template #default="{ row }">
          <span>{{ row.labelName ? row.labelName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.remarkNoQuote')" align="center" prop="remark">
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.createTime')" align="center" prop="createTime">
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.createBy')" align="center" prop="createBy">
        <template #default="{ row }">
          <span>{{ row.createBy ? row.createBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.departmentSource')" align="center">
        <template #default="{ row }">
          <span>{{ row.deptSource ? row.deptSource : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.status')" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.status==='0'" type="success">{{ $t('member.start') }}</el-tag>
          <el-tag v-if="row.status==='1'" type="danger">{{ $t('member.disable') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center" width="200"> 
        <template #default="{row}">
          <el-button
            type="primary"
            size="small"
            @click="edit(row)"
            >{{ $t('member.edit') }}</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="del(row)"
            >{{ $t('member.delete') }}</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="updateStatus(row)"
            v-if="row.status==='1'"
            >{{ $t('member.starting') }}</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="updateStatus(row)"
            v-else
            >{{ $t('member.disabled') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
    <AddOrEditHandLabelDia
      v-model:open="open"
      :type="type"
      :id="cloneId"
      v-if="open"
      @onrefresh="getList"
    />
    <HandLabel v-model:openDia="openDia" :id="cloneId" v-if="openDia" />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ref } from "vue";
import HandLabel from "../HandLabel.vue";
import { getLabelList,deleteLabel,startOrDisableStatus } from "@/api/member/list/index";
import AddOrEditHandLabelDia from "./AddOrEditHandLabelDia.vue";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  type: 0,
  labelName: null,
  pageNum: 1,
  pageSize: 10,
});
const handLabelList = ref([]);
const total = ref(0);
const open = ref(false);
const type = ref(null);
const cloneId = ref(null);
const openDia = ref(false);
const isFirstLoad = ref(true);

onMounted(async() => {
  if(isFirstLoad.value){
    getList();
    isFirstLoad.value = false
  }
});
//查询手动标签数据
function getList() {
  return getLabelList(queryParams.value).then((res) => {
    handLabelList.value = res.rows || [];
    total.value = res.total || 0;
  });
}
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const reset = () => {
  queryRef.value.resetFields();
};
const addLabel = () => {
  type.value = 'add'
  open.value = true
};
const edit = (row) => {
  cloneId.value = row.id
  type.value = 'edit'
  open.value = true
};
const del = (row) => {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToDelete"), i18n.global.t("risk.tip"))
    .then(() => {
      deleteLabel(row.id).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("member.deleteSuccessfully"));
        getList();
      })
    })
    .catch(() => {
    });
};
function updateStatus(row){
  startOrDisableStatus({
    labelId:row.id,
    status:row.status==='0'?'1':'0'
  }).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
    getList();
  })
}
function openDialog(row){
  cloneId.value = row.id
  openDia.value = true;
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.hand-label-list {
  .add-label {
    background: #006232;
    color: #ffffff;
  }
}
</style>
