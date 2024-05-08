<template>
  <div class="auto-label-list">
    <el-form :model="queryParamsAuto" ref="queryRefAuto" :inline="true">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('member.labelName')" prop="labelName" class="full-width">
            <el-input
              v-model="queryParamsAuto.labelName"
              :placeholder="$t('member.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-button
            icon="Search"
            type="primary"
            @click="handleQueryAuto"
            >{{ $t('member.search') }}</el-button
          >
          <el-button icon="Refresh" type="primary" @click="resetAuto">{{ $t('member.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="autoLabelList" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParamsAuto.pageNum - 1) * queryParamsAuto.pageSize +
            scope.$index +
            1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.labelNumber')" align="center" prop="userCount">
        <template #default="scope">
          <!-- <HandLabel :data="scope.row.userCount" :id="scope.row.id" /> -->
          <span class="pointer" @click="openDialog(scope.row)">{{ scope.row.userCount||scope.row.userCount===0 ?scope.row.userCount:'-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.labelNameNoQuote')" align="center" prop="labelName">
      </el-table-column>
      <el-table-column :label="$t('funds.createTime')" align="center" prop="createTime">
        <template #default="{row}">
          <span>{{ row.createTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.status')" align="center" prop="status">
        <template #default="scope">
          <div class="status-start" v-if="scope.row.status === '0'">{{ $t('member.start') }}</div>
          <div class="status-disable" v-else>{{ $t('member.disable') }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="updateStatus(scope.row)"
            v-if="scope.row.status === '1'"
            >{{ $t('member.starting') }}</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="updateStatus(scope.row)"
            v-else
            >{{ $t('member.disabled') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="totalAuto > 0"
      :total="totalAuto"
      v-model:page="queryParamsAuto.pageNum"
      v-model:limit="queryParamsAuto.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
  <HandLabel v-model:openDia="openDia" :id="id" v-if="openDia" />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted, ref } from "vue";
import { getLabelList,startOrDisableStatus } from "@/api/member/list/index";
import HandLabel from "../HandLabel.vue";

const { proxy } = getCurrentInstance();
const queryRefAuto = ref(null);
const queryParamsAuto = ref({
  type: 1,
  labelName: null,
  pageNum: 1,
  pageSize: 10,
});
const autoLabelList = ref([]);
const totalAuto = ref(0);
const openDia = ref(false);
const id = ref(null);
const isFirstLoad = ref(true);

onMounted(async() => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
//查询自动标签数据
function getList() {
  return getLabelList(queryParamsAuto.value).then((res) => {
    autoLabelList.value = res.rows || [];
    totalAuto.value = res.total || 0;
  });
}
const handleQueryAuto = () => {
  queryParamsAuto.value.pageNum = 1;
  getList();
};
const resetAuto = () => {
  queryRefAuto.value.resetFields();
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
  id.value = row.id
  openDia.value = true;
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.auto-label-list {
  .status-start {
    width: 80px;
    height: 26px;
    border: 1px solid rgba(82, 196, 26, 0.5);
    text-align: center;
    margin: 0 auto;
    line-height: 26px;
    color: rgba(82, 196, 26, 0.5);
  }
  .status-disable {
    width: 80px;
    height: 26px;
    border: 1px solid rgba(235, 143, 145, 0.5);
    text-align: center;
    margin: 0 auto;
    line-height: 26px;
    color: rgba(235, 143, 145, 0.5);
  }
}
</style>
