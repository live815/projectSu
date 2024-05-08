<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item :label="$t('system.Operattime')" style="width: 450px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('system.beginTime')"
          :end-placeholder="$t('system.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('system.account')" prop="operName">
        <el-input
          v-model="queryParams.operName"
          :placeholder="$t('system.tip40')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('system.DepartName')" prop="deptName">
        <el-tree-select
          class="el-form-item-custom"
          v-model="queryParams.deptName"
          :data="deptOptions"
          :props="{ value: 'label', label: 'label', children: 'children' }"
          value-key="id"
          :placeholder="$t('system.pleaseChoose')"
          check-strictly
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("system.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("system.reset")
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="dataList" v-loading="loading">
      <el-table-column
        :label="$t('system.Operattime')"
        prop="operTime"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('system.Loginaccount')"
        prop="operName"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('system.DepartName')"
        prop="deptName"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('system.PositTitle')"
        prop="postName"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('system.Operatcontent')"
        prop="operContent"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :label="$t('system.operatstatus')"
        prop="status"
        align="center"
      >
        <template #default="scope">
          <el-tag v-if="scope.row.status == 0">{{
            $t("system.success")
          }}</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 1">{{
            $t("system.fail")
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
import { defaultTime, shortcuts } from "@/utils/config";
import { resetEmptyValues } from "@/utils";
import { listOperlog } from "@/api/system/operlog";
import { deptTreeSelect } from "@/api/system/user";

const { proxy } = getCurrentInstance();
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  operName: "",
  deptName: "",
});
const dateRange = ref([]);
const dataList = ref([]);
const loading = ref(false);
const deptOptions = ref([]);
const total = ref(0);
/** 查询日志列表 */
function getList() {
  loading.value = true;
  listOperlog(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (res) => {
      loading.value = false;
      let rows = res.rows || [];
      if (rows && rows.length) {
        // 重置空属性
        rows.forEach((obj) => {
          obj = resetEmptyValues(obj);
        });
      }
      dataList.value = rows;
      total.value = res.total;
    }
  );
}
// 查询部门树
function getDeptTree() {
  deptTreeSelect().then((response) => {
    deptOptions.value = response;
  });
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}

getList();
getDeptTree();
</script>

<style lang="scss" scoped></style>
