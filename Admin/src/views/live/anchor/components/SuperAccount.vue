<template>
  <div class="live-super-account" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('live.Supermanagedaccount2')" prop="userName">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('live.pleaseEnter')"
          @keyup.enter="handleQuery"
          style="width: 240px"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('live.AccountName')" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          :placeholder="$t('live.pleaseEnter')"
          @keyup.enter="handleQuery"
          style="width: 240px"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('live.creatTime')">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('live.begintime')"
          :end-placeholder="$t('live.endtime')"
          @change="handleChange"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button
          v-hasPermi="['member:manager:list']"
          type="primary"
          icon="Search"
          @click="handleQuery"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
      </el-form-item>

      <el-form-item class="full-width">
        <div class="btn-box">
          <el-button
            v-hasPermi="['member:manager:add']"
            icon="Plus"
            @click="editInfo({}, 'add')"
            >{{ $t("live.SuperPipeName") }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.Supermanagedaccount')"
        prop="userName"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('live.tip36')"
        prop="nickName"
        align="center"
      />
      <el-table-column
        :label="$t('live.remake')"
        prop="remark"
        align="center"
      />
      <el-table-column
        :label="$t('risk.creativeTime')"
        prop="createTime"
        align="center"
      />

      <el-table-column
        :label="$t('live.status')"
        prop="status"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <div :class="[scope.row.status === '0' ? 'start' : 'disable']">
            {{
              scope.row.status === "0" ? $t("live.Open") : $t("live.disabled")
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.operate')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <el-button
            v-hasPermi="['member:manager:edit']"
            type="primary"
            size="small"
            @click="editInfo(scope.row, 'edit')"
            >{{ $t("live.EditInformation") }}</el-button
          >
          <el-button
            size="small"
            type="success"
            v-hasPermi="['member:manager:edit']"
            v-if="scope.row.status == '1'"
            @click="changeStatus(scope.row)"
            >{{ $t("live.enable") }}</el-button
          >
          <el-button
            size="small"
            type="danger"
            v-hasPermi="['member:manager:edit']"
            v-if="scope.row.status == '0'"
            @click="changeStatus(scope.row)"
            >{{ $t("live.disabled2") }}</el-button
          >
          <el-button
            size="small"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['member:manager:delete']"
            >{{ $t("live.delete") }}</el-button
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
    />
    <SuperDialog
      v-model:open="open"
      :row="form"
      :title="title"
      :addShow="addShow"
      v-if="open"
      @onrefresh="getList"
    />
  </div>
</template>

<script setup>
import {
  getAdminList,
  editAdminList,
  delAdminList,
} from "@/api/live/anchor.js";
import { onMounted, ref } from "vue";
import SuperDialog from "./SuperDialog.vue";
import { defaultTime } from "@/utils/config";
import i18n from "@/i18n";
// const queryRef = ref(null);
const queryParams = ref({
  nickName: null,
  userName: null,
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const loading = ref(false);
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const { proxy } = getCurrentInstance();
const open = ref(false);
const title = ref("");
const form = ref({});
const addShow = ref(true);
const isFirstLoad = ref(true);

// 查询
onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
function getList() {
  loading.value = true;
  return getAdminList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false;
    });
}
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
// 新增编辑
const editInfo = (row, icon) => {
  resetQuery();
  form.value = JSON.parse(JSON.stringify(row));
  if (icon == "edit") {
    title.value = i18n.global.t("live.EditInformation");
    addShow.value = false;
    console.log(form.value, "111");
  } else if (icon == "add") {
    title.value = i18n.global.t("live.SuperPipeName");
    form.value.status = "0";
    addShow.value = true;
  }
  open.value = true;
};
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  proxy.resetForm("queryRef");
  dateRange.value = [];
  handleChange();
  handleQuery();
}
function changeStatus(row) {
  editAdminList({
    id: row.id,
    status: row.status === "0" ? "1" : "0",
  }).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("live.tip33"));
    getList();
  });
}
/** 删除按钮操作 */
function handleDelete(id) {
  proxy.$modal
    .confirm(i18n.global.t("live.tip37"))
    .then(function () {
      return delAdminList(id);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("live.tip35"));
    })
    .catch(() => {});
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.live-super-account {
  .add-btn {
    background: #234360;
    color: #fff;
    margin-bottom: 12px;
  }
}
.start {
  width: 80px;
  height: 20px;
  border: 1px solid rgba(82, 196, 26, 0.5);
  text-align: center;
  margin: 0 auto;
  line-height: 20px;
  color: rgba(82, 196, 26, 0.5);
}
.disable {
  width: 80px;
  height: 20px;
  border: 1px solid rgba(235, 143, 145, 0.5);
  text-align: center;
  margin: 0 auto;
  line-height: 20px;
  color: rgba(235, 143, 145, 0.5);
}
.btn-box {
  :deep(.el-button) {
    background-color: #234360;
    color: #fff;
  }
}
</style>
