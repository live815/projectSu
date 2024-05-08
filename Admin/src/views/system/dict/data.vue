<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item :label="$t('system.DictionaryName')" prop="dictType">
        <el-select v-model="queryParams.dictType" style="width: 200px">
          <el-option
            v-for="item in typeOptions"
            :key="item.dictId"
            :label="item.dictName"
            :value="item.dictType"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('system.dictionaryTag')" prop="dictLabel">
        <el-input
          v-model="queryParams.dictLabel"
          :placeholder="$t('system.tip22')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('system.status')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('system.DataStatus')"
          clearable
          style="width: 200px"
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
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:dict:add']"
          >{{ $t("system.add") }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:dict:edit']"
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
          v-hasPermi="['system:dict:remove']"
          >{{ $t("system.delete") }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:dict:export']"
          >{{ $t("system.export") }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Close" @click="handleClose">{{
          $t("system.close")
        }}</el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        :label="$t('system.dictEncod')"
        align="center"
        prop="dictCode"
      />
      <el-table-column
        :label="$t('system.dictionaryTag')"
        align="center"
        prop="dictLabel"
      >
        <template #default="scope">
          <span
            v-if="scope.row.listClass == '' || scope.row.listClass == 'default'"
            >{{ scope.row.dictLabel }}</span
          >
          <el-tag
            v-else
            :type="scope.row.listClass == 'primary' ? '' : scope.row.listClass"
            >{{ scope.row.dictLabel }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.Dictionarykey')"
        align="center"
        prop="dictValue"
      />
      <el-table-column
        :label="$t('system.DictionarySort')"
        align="center"
        prop="dictSort"
      />
      <el-table-column
        :label="$t('system.status')"
        align="center"
        prop="status"
      >
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.remark')"
        align="center"
        prop="remark"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('system.creationtime')"
        align="center"
        prop="createTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.operate')"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dict:edit']"
            >{{ $t("system.edit") }}</el-button
          >
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dict:remove']"
            >{{ $t("system.delete") }}</el-button
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

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="dataRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('system.dictionaryType')">
          <el-input v-model="form.dictType" :disabled="true" />
        </el-form-item>
        <el-form-item :label="$t('system.datalabel')" prop="dictLabel">
          <el-input
            v-model="form.dictLabel"
            :placeholder="$t('system.tip23')"
          />
        </el-form-item>
        <el-form-item :label="$t('system.Datakeyvalue')" prop="dictValue">
          <el-input
            v-model="form.dictValue"
            :placeholder="$t('system.tip24')"
          />
        </el-form-item>
        <el-form-item :label="$t('system.stylePropert')" prop="cssClass">
          <el-input v-model="form.cssClass" :placeholder="$t('system.tip25')" />
        </el-form-item>
        <el-form-item :label="$t('system.ShowSort')" prop="dictSort">
          <el-input-number
            v-model="form.dictSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item :label="$t('system.echostyle')" prop="listClass">
          <el-select v-model="form.listClass">
            <el-option
              v-for="item in listClassOptions"
              :key="item.value"
              :label="item.label + '(' + item.value + ')'"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('system.status')" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('system.tip26')" prop="isDefault">
          <el-radio-group v-model="form.isDefault">
            <el-radio
              v-for="dict in sys_isDefault_list"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('system.remark')" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :placeholder="$t('system.tip4')"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">{{
            $t("system.sure")
          }}</el-button>
          <el-button @click="cancel">{{ $t("system.cancle") }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Data">
import useDictStore from "@/store/modules/dict";
import {
  optionselect as getDictOptionselect,
  getType,
} from "@/api/system/dict/type";
import {
  listData,
  getData,
  delData,
  addData,
  updateData,
} from "@/api/system/dict/data";
import i18n from "@/i18n";
const sys_isDefault_list = [
  {
    value: "Y",
    label: i18n.global.t("system.yes"),
  },
  {
    value: "N",
    label: i18n.global.t("system.no"),
  },
];
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const dataList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const defaultDictType = ref("");
const typeOptions = ref([]);
const route = useRoute();
// 数据标签回显样式
const listClassOptions = ref([
  { value: "default", label: i18n.global.t("system.default") },
  { value: "primary", label: i18n.global.t("system.main") },
  { value: "success", label: i18n.global.t("system.success") },
  { value: "info", label: i18n.global.t("system.message") },
  { value: "warning", label: i18n.global.t("system.warn") },
  { value: "danger", label: i18n.global.t("system.Danger") },
]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    dictName: undefined,
    dictType: undefined,
    status: undefined,
  },
  rules: {
    dictLabel: [
      {
        required: true,
        message: i18n.global.t("system.tip27"),
        trigger: "blur",
      },
    ],
    dictValue: [
      {
        required: true,
        message: i18n.global.t("system.tip28"),
        trigger: "blur",
      },
    ],
    dictSort: [
      {
        required: true,
        message: i18n.global.t("system.tip29"),
        trigger: "blur",
      },
    ],
    isDefault: [
      {
        required: true,
        message: i18n.global.t("system.tip30"),
        trigger: "blur",
      },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询字典类型详细 */
function getTypes(dictId) {
  getType(dictId).then((response) => {
    queryParams.value.dictType = response.dictType;
    defaultDictType.value = response.dictType;
    getList();
  });
}

/** 查询字典类型列表 */
function getTypeList() {
  getDictOptionselect().then((response) => {
    typeOptions.value = response;
  });
}
/** 查询字典数据列表 */
function getList() {
  loading.value = true;
  listData(queryParams.value).then((response) => {
    dataList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {
    isDefault: "N",
    dictCode: undefined,
    dictLabel: undefined,
    dictValue: undefined,
    cssClass: undefined,
    listClass: "default",
    dictSort: 0,
    status: "0",
    remark: undefined,
  };
  proxy.resetForm("dataRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 返回按钮操作 */
function handleClose() {
  const obj = { path: "/system/dict" };
  proxy.$tab.closeOpenPage(obj);
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  queryParams.value.dictType = defaultDictType;
  handleQuery();
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = i18n.global.t("system.tip31");
  form.value.dictType = queryParams.value.dictType;
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.dictCode);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const dictCode = row.dictCode || ids.value;
  getData(dictCode).then((response) => {
    form.value = response;
    open.value = true;
    title.value = i18n.global.t("system.tip32");
  });
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["dataRef"].validate((valid) => {
    if (valid) {
      if (form.value.dictCode != undefined) {
        updateData(form.value).then((response) => {
          useDictStore().removeDict(queryParams.value.dictType);
          proxy.$modal.msgSuccess(i18n.global.t("system.SuccessfulModif"));
          open.value = false;
          getList();
        });
      } else {
        addData(form.value).then((response) => {
          useDictStore().removeDict(queryParams.value.dictType);
          proxy.$modal.msgSuccess(i18n.global.t("system.addSuccessful"));
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  const dictCodes = row.dictCode || ids.value;
  proxy.$modal
    .confirm(i18n.global.t("system.tip33", { num: dictCodes }))
    .then(function () {
      return delData(dictCodes);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("system.successfuldele"));
      useDictStore().removeDict(queryParams.value.dictType);
    })
    .catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "system/dict/data/export",
    {
      ...queryParams.value,
    },
    `dict_data_${new Date().getTime()}.xlsx`
  );
}

getTypes(route.params && route.params.dictId);
getTypeList();
</script>
