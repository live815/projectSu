<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item :label="$t('system.tip138')" prop="tableName">
        <el-input
          v-model="queryParams.tableName"
          :placeholder="$t('system.tip144')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('system.tip140')" prop="tableComment">
        <el-input
          v-model="queryParams.tableComment"
          :placeholder="$t('system.tip145')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('system.creationtime')" style="width: 308px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('system.startdate')"
          :end-placeholder="$t('system.enddate')"
        ></el-date-picker>
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Download"
          @click="handleGenTable"
          v-hasPermi="['tool:gen:code']"
          >{{ $t("system.generate") }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="Upload"
          @click="openImportTable"
          v-hasPermi="['tool:gen:import']"
          >{{ $t("system.export") }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleEditTable"
          v-hasPermi="['tool:gen:edit']"
          >{{ $t("system.edit") }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tool:gen:remove']"
          >{{ $t("system.delete") }}</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      ></el-table-column>
      <el-table-column
        :label="$t('system.serialnumber')"
        type="index"
        width="50"
        align="center"
      >
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.tip138')"
        align="center"
        prop="tableName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('system.tip140')"
        align="center"
        prop="tableComment"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('system.entity')"
        align="center"
        prop="className"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('system.creationtime')"
        align="center"
        prop="createTime"
        width="160"
      />
      <el-table-column
        :label="$t('system.updateTime')"
        align="center"
        prop="updateTime"
        width="160"
      />
      <el-table-column
        :label="$t('system.operate')"
        align="center"
        width="330"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-tooltip :content="$t('system.Preview')" placement="top">
            <el-button
              link
              type="primary"
              icon="View"
              @click="handlePreview(scope.row)"
              v-hasPermi="['tool:gen:preview']"
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('system.edit2')" placement="top">
            <el-button
              link
              type="primary"
              icon="Edit"
              @click="handleEditTable(scope.row)"
              v-hasPermi="['tool:gen:edit']"
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('system.delete')" placement="top">
            <el-button
              link
              type="primary"
              icon="Delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['tool:gen:remove']"
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('system.Synchronize')" placement="top">
            <el-button
              link
              type="primary"
              icon="Refresh"
              @click="handleSynchDb(scope.row)"
              v-hasPermi="['tool:gen:edit']"
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('system.Generatecode')" placement="top">
            <el-button
              link
              type="primary"
              icon="Download"
              @click="handleGenTable(scope.row)"
              v-hasPermi="['tool:gen:code']"
            ></el-button>
          </el-tooltip>
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
    <!-- 预览界面 -->
    <el-dialog
      :title="preview.title"
      v-model="preview.open"
      width="80%"
      top="5vh"
      append-to-body
      class="scrollbar"
    >
      <el-tabs v-model="preview.activeName">
        <el-tab-pane
          v-for="(value, key) in preview.data"
          :label="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
          :name="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
          :key="value"
        >
          <el-link
            :underline="false"
            icon="DocumentCopy"
            v-copyText="value"
            v-copyText:callback="copyTextSuccess"
            style="float: right"
            >&nbsp;{{ $t("system.copy") }}</el-link
          >
          <pre>{{ value }}</pre>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <import-table ref="importRef" @ok="handleQuery" />
  </div>
</template>

<script setup name="Gen">
import {
  listTable,
  previewTable,
  delTable,
  genCode,
  synchDb,
} from "@/api/tool/gen";
import router from "@/router";
import importTable from "./importTable";
import i18n from "@/i18n";
const route = useRoute();
const { proxy } = getCurrentInstance();

const tableList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const tableNames = ref([]);
const dateRange = ref([]);
const uniqueId = ref("");

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    tableName: undefined,
    tableComment: undefined,
  },
  preview: {
    open: false,
    title: i18n.global.t("system.tip201"),
    data: {},
    activeName: "domain.java",
  },
});

const { queryParams, preview } = toRefs(data);

onActivated(() => {
  const time = route.query.t;
  if (time != null && time != uniqueId.value) {
    uniqueId.value = time;
    queryParams.value.pageNum = Number(route.query.pageNum);
    dateRange.value = [];
    proxy.resetForm("queryForm");
    getList();
  }
});

/** 查询表集合 */
function getList() {
  loading.value = true;
  listTable(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      tableList.value = response.rows;
      total.value = response.total;
      loading.value = false;
    }
  );
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 生成代码操作 */
function handleGenTable(row) {
  const tbNames = row.tableName || tableNames.value;
  if (tbNames == "") {
    proxy.$modal.msgError(i18n.global.t("system.tip202"));
    return;
  }
  if (row.genType === "1") {
    genCode(row.tableName).then((response) => {
      proxy.$modal.msgSuccess(i18n.global.t("system.tip203") + row.genPath);
    });
  } else {
    proxy.$download.zip(
      "/admin/tool/gen/batchGenCode?tables=" + tbNames,
      "ruoyi.zip"
    );
  }
}
/** 同步数据库操作 */
function handleSynchDb(row) {
  const tableName = row.tableName;
  proxy.$modal
    .confirm(i18n.global.t("system.tip204", { num: tableName }))

    .then(function () {
      return synchDb(tableName);
    })
    .then(() => {
      proxy.$modal.msgSuccess(i18n.global.t("system.Synchronizatsuccess"));
    })
    .catch(() => {});
}
/** 打开导入表弹窗 */
function openImportTable() {
  proxy.$refs["importRef"].show();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}
/** 预览按钮 */
function handlePreview(row) {
  previewTable(row.tableId).then((response) => {
    preview.value.data = response;
    preview.value.open = true;
    preview.value.activeName = "domain.java";
  });
}
/** 复制代码成功 */
function copyTextSuccess() {
  proxy.$modal.msgSuccess(i18n.global.t("system.copysuccess"));
}
// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.tableId);
  tableNames.value = selection.map((item) => item.tableName);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 修改按钮操作 */
function handleEditTable(row) {
  const tableId = row.tableId || ids.value[0];
  router.push({
    path: "/admin/tool/gen-edit/index/" + tableId,
    query: { pageNum: queryParams.value.pageNum },
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  const tableIds = row.tableId || ids.value;
  proxy.$modal
    .confirm(i18n.global.t("system.tip205", { num: tableIds }))
    .then(function () {
      return delTable(tableIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("system.successfuldele"));
    })
    .catch(() => {});
}

getList();
</script>
