<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      label-width="90px"
      v-show="showSearch"
    >
      <!-- <el-form-item label="创建时间" style="width: 450px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item
        :label="$t('platform.Administratoraccount')"
        prop="adminName"
      >
        <el-input
          v-model="queryParams.adminName"
          :placeholder="$t('platform.tip')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('platform.PlatformName')" prop="tenantName">
        <el-input
          v-model="queryParams.tenantName"
          :placeholder="$t('platform.tip')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('platform.status')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('platform.characterStatus')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          v-hasPermi="['platform:tenant:query']"
          type="primary"
          icon="Search"
          @click="handleQuery"
          >{{ $t("platform.search") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("platform.reset")
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作按钮组 -->
    <el-row :gutter="10" class="mb8">
      <el-button
        type="primary"
        plain
        icon="Plus"
        @click="handleAdd"
        v-hasPermi="['platform:tenant:add']"
        >{{ $t("platform.add") }}</el-button
      >
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <!-- 表格 -->
    <el-table :data="dataList" v-loading="loading">
      <el-table-column
        :label="$t('platform.creationTime')"
        prop="createTime"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('platform.Platformname')"
        prop="tenantName"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('platform.Platformcode')"
        prop="tenantCode"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('platform.Administratoraccount')"
        prop="adminName"
        align="center"
      ></el-table-column>

      <el-table-column
        :label="$t('platform.status')"
        align="center"
        width="100"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('platform.editTime')"
        prop="updateTime"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('platform.operate')"
        prop="status"
        align="center"
      >
        <template #default="scope">
          <el-button
            @click="handleUpdate(scope.row)"
            type="primary"
            v-hasPermi="['platform:tenant:edit']"
            >{{ $t("platform.edit") }}</el-button
          >
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

    <!-- 添加或修改租户配置对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="tenantRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item
          :label="$t('platform.Administratoraccount')"
          prop="adminName"
        >
          <el-input
            v-model="form.adminName"
            :disabled="!isAdd"
            :placeholder="$t('platform.tip1')"
          />
        </el-form-item>
        <el-form-item
          v-if="isAdd"
          :label="$t('platform.AdministratPassword')"
          prop="password"
        >
          <el-input
            type="password"
            v-model="form.password"
            :placeholder="$t('platform.tip2')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.PlatformName')" prop="tenantName">
          <el-input
            v-model="form.tenantName"
            :placeholder="$t('platform.tip3')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.Platformcode')" prop="tenantCode">
          <el-input
            v-model="form.tenantCode"
            :placeholder="$t('platform.tip4')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.status')">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">{{
            $t("platform.sure")
          }}</el-button>
          <el-button @click="cancel">{{ $t("platform.cancel") }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script name="Tenant" setup>
import { resetEmptyValues } from "@/utils";
import {
  listPlatform,
  updateTenant,
  addTenant,
  changeTenantStatus,
} from "@/api/platform/tenant";
import { computed } from "vue";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  adminName: "",
  ipaddr: "",
});
const isFirstLoad = ref(true);
const showSearch = ref(true);
const dateRange = ref([]);
const dataList = ref([]);
const loading = ref(false);
const total = ref(0);
const open = ref(false);
const operFlag = ref("add");
const form = ref({});
const isAdd = computed(() => {
  return operFlag.value === "add";
});
const title = computed(() => {
  let flag = isAdd.value
    ? i18n.global.t("platform.add")
    : i18n.global.t("platform.edit");
  return flag + "平台";
});
const rules = ref({
  adminName: [
    {
      required: true,
      message: i18n.global.t("platform.tip5"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: i18n.global.t("platform.tip6"),
      trigger: "blur",
    },
  ],
  tenantName: [
    {
      required: true,
      message: i18n.global.t("platform.tip7"),
      trigger: "blur",
    },
  ],
  tenantCode: [
    {
      required: true,
      message: i18n.global.t("platform.tip8"),
      trigger: "blur",
    },
  ],
});

/** 查询租户列表 */
function getList() {
  loading.value = true;
  return listPlatform(proxy.addDateRange(queryParams.value, dateRange.value)).then(
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

/** 添加角色 */
function handleAdd() {
  reset();
  open.value = true;
  operFlag.value = "add";
}

/** 修改角色 */
function handleUpdate(row) {
  reset();
  operFlag.value = "edit";
  open.value = true;
  // 使用数据副本作为弹框数据填充
  form.value = JSON.parse(JSON.stringify(row));
}

// 重置
function reset() {
  form.value = {
    id: "",
    adminName: "",
    password: "",
    tenantName: "",
    tenantCode: "",
    status: "0",
  };
  proxy.resetForm("tenantRef");
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["tenantRef"].validate((valid) => {
    if (valid) {
      if (form.value.id) {
        updateTenant(form.value).then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t("platform.editsuccess"));
          open.value = false;
          getList();
        });
      } else {
        addTenant(form.value).then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t("platform.addsuccess"));
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 状态修改 */
function handleStatusChange(row) {
  let text =
    row.status === "0"
      ? i18n.global.t("platform.enable")
      : i18n.global.t("platform.deactivate");
  proxy.$modal
    .confirm(i18n.global.t("platform.tip9", { a: text, b: row.tenantName }))

    .then(function () {
      return changeTenantStatus(row.id, row.status);
    })
    .then(() => {
      proxy.$modal.msgSuccess(text + i18n.global.t("platform.success"));
    })
    .catch(function () {
      row.status = row.status === "0" ? "1" : "0";
    });
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped></style>
