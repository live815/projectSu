<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item :label="$t('system.DepartName')" prop="deptName">
        <el-input
          v-model="queryParams.deptName"
          :placeholder="$t('system.tip11')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('system.status')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('system.DepartmentStatus')"
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
          v-hasPermi="['system:dept:add']"
          >{{ $t("system.add") }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll">{{
          $t("system.tip12")
        }}</el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="deptList"
      row-key="deptId"
      :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="deptName"
        :label="$t('system.DepartName')"
        width="260"
      ></el-table-column>
      <el-table-column
        prop="orderNum"
        :label="$t('system.sort')"
        width="200"
      ></el-table-column>
      <el-table-column prop="status" :label="$t('system.status')" width="100">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.creationtime')"
        align="center"
        prop="createTime"
        width="300"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          :label="$t('system.dataEncryption')"
          align="center"
          prop="dataSafetyItem"
          width="500"
      >
        <template #default="scope">
          <span>{{ dataSafetyItemName(scope.row.dataSafetyItem) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.operate')"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dept:edit']"
            >{{ $t("system.edit") }}</el-button
          >
          <el-button
            link
            type="primary"
            v-if="scope.row.status == 0"
            icon="Plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:dept:add']"
            >{{ $t("system.add") }}</el-button
          >
          <el-button
            v-if="scope.row.parentId != 0"
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dept:remove']"
            >{{ $t("system.delete") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form ref="deptRef" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24" v-if="form.parentId !== 0">
            <el-form-item :label="$t('system.Highoffice')" prop="parentId">
              <el-tree-select
                v-model="form.parentId"
                :data="deptOptions"
                :props="{
                  value: 'deptId',
                  label: 'deptName',
                  children: 'children',
                }"
                value-key="deptId"
                :placeholder="$t('system.tip13')"
                check-strictly
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.DepartName')" prop="deptName">
              <el-input
                v-model="form.deptName"
                :placeholder="$t('system.tip11')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.ShowSort')" prop="orderNum">
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.principal')" prop="leader">
              <el-input
                v-model="form.leader"
                :placeholder="$t('system.tip14')"
                maxlength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.contactNumber')" prop="phone">
              <el-input
                v-model="form.phone"
                :placeholder="$t('system.tip15')"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.email')" prop="email">
              <el-input
                v-model="form.email"
                :placeholder="$t('system.tip16')"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.DepartmentStatus')">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.value"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('system.dataEncryption')" prop="dataSafetyItem">
              <el-checkbox-group v-model="form.dataSafetyItem">
                <el-checkbox label="手机号" />
                <el-checkbox label="银行卡" />
                <el-checkbox label="姓名" />
                <el-checkbox label="虚拟币地址" />
                <el-checkbox label="开户地址" />
                <el-checkbox label="邮箱" />
                <el-checkbox label="微信号" />
                <el-checkbox label="QQ" />
                <el-checkbox label="手机验证码" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
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

<script setup name="Dept">
import {
  listDept,
  getDept,
  delDept,
  addDept,
  updateDept,
  listDeptExcludeChild,
} from "@/api/system/dept";
import {numberToFont, dataSafetyItemName, fontToNumber} from "@/utils";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const deptList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const deptOptions = ref([]);
const isExpandAll = ref(true);
const refreshTable = ref(true);

const data = reactive({
  form: {},
  queryParams: {
    deptName: undefined,
    status: undefined,
  },
  rules: {
    parentId: [
      {
        required: true,
        message: i18n.global.t("system.tip17"),
        trigger: "blur",
      },
    ],
    deptName: [
      {
        required: true,
        message: i18n.global.t("system.tip18"),
        trigger: "blur",
      },
    ],
    orderNum: [
      {
        required: true,
        message: i18n.global.t("system.tip19"),
        trigger: "blur",
      },
    ],
    email: [
      {
        type: "email",
        message: i18n.global.t("system.tip20"),
        trigger: ["blur", "change"],
      },
    ],
    phone: [
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: i18n.global.t("system.tip21"),
        trigger: "blur",
      },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询部门列表 */
function getList() {
  loading.value = true;
  listDept(queryParams.value).then((response) => {
    deptList.value = proxy.handleTree(response || [], "deptId");
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
    deptId: undefined,
    parentId: undefined,
    deptName: undefined,
    orderNum: 0,
    leader: undefined,
    phone: undefined,
    email: undefined,
    status: "0",
    dataSafetyItem: [],
  };
  proxy.resetForm("deptRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
/** 新增按钮操作 */
function handleAdd(row) {
  reset();
  listDept().then((response) => {
    deptOptions.value = proxy.handleTree(response || [], "deptId");
  });
  if (row != undefined) {
    form.value.parentId = row.deptId;
  }
  open.value = true;
  title.value = i18n.global.t("system.Adddepart");
}
/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  listDeptExcludeChild(row.deptId).then((response) => {
    deptOptions.value = proxy.handleTree(response, "deptId");
  });
  getDept(row.deptId).then((response) => {
    let dataSafetyItem_res = response.dataSafetyItem;
    let dataSafetyItem = [];
    numberToFont(dataSafetyItem_res, dataSafetyItem);
    delete response.dataSafety;
    form.value = response;
    form.value.dataSafetyItem = dataSafetyItem;
    open.value = true;
    title.value = i18n.global.t("system.editPart");
  });
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["deptRef"].validate((valid) => {
    if (valid) {
      let dataSafetyItem = [];
      fontToNumber(form.value.dataSafetyItem, dataSafetyItem);
      form.value.dataSafetyItem = dataSafetyItem;
      if (form.value.deptId != undefined) {
        updateDept(form.value).then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t("system.SuccessfulModif"));
          open.value = false;
          getList();
        });
      } else {
        addDept(form.value).then((response) => {
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
  proxy.$modal
    .confirm(i18n.global.t("system.tip217", { num: row.deptName }))

    .then(function () {
      return delDept(row.deptId);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("system.successfuldele"));
    })
    .catch(() => {});
}

getList();
</script>
