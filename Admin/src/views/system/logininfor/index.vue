<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item :label="$t('system.loginTime')" style="width: 450px">
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
      <el-form-item :label="$t('system.account')" prop="userName">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('system.tip40')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('system.IPaddress')" prop="ipaddr">
        <el-input
          v-model="queryParams.ipaddr"
          :placeholder="$t('system.tip40')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
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
        :label="$t('system.loginTime')"
        prop="accessTime"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('system.Loginaccount')"
        prop="userName"
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
        :label="$t('system.loginIP')"
        prop="ipaddr"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('system.LoginURL')"
        prop="loginUrl"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('system.Usebrowser')"
        prop="userAgent"
        align="center"
      >
        <template #default="scope">
          <span class="text-ellipsis">{{ scope.row.userAgent }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.Operatcontent')"
        prop="msg"
        align="center"
      >
        <template #default="scope">
          <el-tag :type="scope.row.status == 0 ? '' : 'danger'">{{
            scope.row.msg
          }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作状态" prop="msg" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 0">成功</el-tag>
          <el-tag v-else type="danger">失败</el-tag>
        </template>
      </el-table-column> -->
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
import { listLoginInfor } from "@/api/system/logininfor";
const { proxy } = getCurrentInstance();
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  userName: "",
  ipaddr: "",
});
const dateRange = ref([]);
const dataList = ref([]);
const loading = ref(false);
const total = ref(0);
/** 查询日志列表 */
function getList() {
  loading.value = true;
  listLoginInfor(proxy.addDateRange(queryParams.value, dateRange.value)).then(
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
</script>

<style lang="scss" scoped>
.text-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 指定截断的行数 */
  overflow: hidden;
}
</style>
