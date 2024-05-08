<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width="68px"
    >
      <el-form-item :label="$t('system.RoleName')" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          :placeholder="$t('system.tip75')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="权限字符" prop="roleKey">
            <el-input
               v-model="queryParams.roleKey"
               placeholder="请输入权限字符"
               clearable
               style="width: 240px"
               @keyup.enter="handleQuery"
            />
         </el-form-item> -->
      <el-form-item :label="$t('system.status')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('system.roleStatus')"
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
      <el-form-item :label="$t('system.creationtime')" style="width: 450px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('system.beginTime')"
          :end-placeholder="$t('system.endTime')"
          :default-time="defaultTime"
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
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:role:add']"
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
          v-hasPermi="['system:role:edit']"
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
          v-hasPermi="['system:role:remove']"
          >{{ $t("system.delete") }}</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:role:export']"
          >导出</el-button
        >
      </el-col> -->
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      :data="roleList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        :label="$t('system.rolenumber')"
        prop="roleId"
        width="120"
        align="center"
      />
      <el-table-column
        :label="$t('system.RoleName')"
        prop="roleName"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <!-- <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" /> -->
      <el-table-column
        :label="$t('system.displayOrder')"
        prop="roleSort"
        width="100"
        align="center"
      />
      <el-table-column :label="$t('system.status')" align="center" width="100">
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
        :label="$t('system.creationtime')"
        align="center"
        prop="createTime"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.operate')"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <div v-if="scope.row.roleId !== superAdminRoleId">
            <el-button
              type="primary"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['system:role:edit']"
              >{{ $t("system.edit") }}</el-button
            >
            <el-button
              type="danger"
              @click="handleDelete(scope.row)"
              v-hasPermi="['system:role:remove']"
              >{{ $t("system.delete") }}</el-button
            >
            <!-- <el-button
              type="primary"
              @click="handleAuthUser(scope.row)"
              v-hasPermi="['system:role:edit']"
              >分配用户</el-button
            >
            <el-button
              type="primary"
              @click="handleDataScope(scope.row)"
              v-hasPermi="['system:role:edit']"
              >数据权限</el-button
            > -->
          </div>
          <!-- <el-tooltip content="数据权限" placement="top" v-if="scope.row.roleId !== superAdminRoleId">
                <el-button link type="primary" icon="CircleCheck" @click="handleDataScope(scope.row)" v-hasPermi="['system:role:edit']"></el-button>
              </el-tooltip> -->
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

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" v-model="open" width="900px" append-to-body>
      <el-form ref="roleRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label="$t('system.RoleName')" prop="roleName">
          <el-input
            v-model="form.roleName"
            :placeholder="$t('system.tip75')"
            style="width: 320px"
          />
        </el-form-item>
        <!-- <el-form-item prop="roleKey">
               <template #label>
                  <span>
                     <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
                        <el-icon><question-filled /></el-icon>
                     </el-tooltip>
                     权限字符
                  </span>
               </template>
               <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
            </el-form-item> -->
        <el-form-item :label="$t('system.Roleorder')" prop="roleSort">
          <el-input-number
            style="width: 320px"
            v-model="form.roleSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item :label="$t('system.status')">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('system.datapermis')">
          <el-radio-group v-model="form.dataScope">
            <el-radio
              v-for="item in dataScopeOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('system.Menupermis')">
          <el-checkbox
            v-model="menuExpand"
            @change="handleCheckedTreeExpand($event, 'menu')"
            >{{ $t("system.tip12") }}</el-checkbox
          >
          <el-checkbox
            v-model="menuNodeAll"
            @change="handleCheckedTreeNodeAll($event, 'menu')"
            >{{ $t("system.tip76") }}</el-checkbox
          >
          <el-checkbox
            v-model="form.menuCheckStrictly"
            @change="handleCheckedTreeConnect($event, 'menu')"
            >{{ $t("system.tip77") }}</el-checkbox
          >
          <el-tree
            class="tree-border my-tree"
            :data="menuOptions"
            show-checkbox
            ref="menuRef"
            node-key="id"
            :check-strictly="!form.menuCheckStrictly"
            :empty-text="$t('system.tip78')"
            :props="{ label: 'label', children: 'children' }"
            :default-expand-all="true"
          ></el-tree>
        </el-form-item>
        <el-form-item :label="$t('system.remark')">
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

    <!-- 分配角色数据权限对话框 -->
    <el-dialog
      :title="title"
      v-model="openDataScope"
      width="500px"
      append-to-body
    >
      <el-form :model="form" label-width="80px">
        <el-form-item :label="$t('system.RoleName')">
          <el-input v-model="form.roleName" :disabled="true" />
        </el-form-item>
        <!-- <el-form-item label="权限字符">
               <el-input v-model="form.roleKey" :disabled="true" />
            </el-form-item> -->
        <el-form-item :label="$t('system.Scopeauthority')">
          <el-select v-model="form.dataScope" @change="dataScopeSelectChange">
            <el-option
              v-for="item in dataScopeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('system.datapermis')"
          v-show="form.dataScope == 2"
        >
          <el-checkbox
            v-model="deptExpand"
            @change="handleCheckedTreeExpand($event, 'dept')"
            >{{ $t("system.tip12") }}</el-checkbox
          >
          <el-checkbox
            v-model="deptNodeAll"
            @change="handleCheckedTreeNodeAll($event, 'dept')"
            >{{ $t("system.tip76") }}</el-checkbox
          >
          <el-checkbox
            v-model="form.deptCheckStrictly"
            @change="handleCheckedTreeConnect($event, 'dept')"
            >{{ $t("system.tip77") }}</el-checkbox
          >
          <el-tree
            class="tree-border"
            :data="deptOptions"
            show-checkbox
            default-expand-all
            ref="deptRef"
            node-key="id"
            :check-strictly="!form.deptCheckStrictly"
            :empty-text="$t('system.tip78')"
            :props="{ label: 'label', children: 'children' }"
          ></el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitDataScope">{{
            $t("system.sure")
          }}</el-button>
          <el-button @click="cancelDataScope">{{
            $t("system.cancle")
          }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Role">
import {
  addRole,
  changeRoleStatus,
  dataScope,
  delRole,
  getRole,
  listRole,
  updateRole,
  deptTreeSelect,
} from "@/api/system/role";
import {
  roleMenuTreeselect,
  treeselect as menuTreeselect,
} from "@/api/system/menu";
import { defaultTime } from "@/utils/config";
import useUserStore from "@/store/modules/user";
import i18n from "@/i18n";
const superAdminRoleId = 1;
const router = useRouter();
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const roleList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const menuOptions = ref([]);
const menuExpand = ref(true);
const menuNodeAll = ref(false);
const deptExpand = ref(true);
const deptNodeAll = ref(false);
const deptOptions = ref([]);
const openDataScope = ref(false);
const menuRef = ref(null);
const deptRef = ref(null);

const userInfo = useUserStore().userInfo;
console.log(userInfo.roles[0].dataScope, "roles");

/** 数据范围选项*/
const dataScopeOptions = ref([]);
if (userInfo.roles[0].dataScope === "1") {
  dataScopeOptions.value = [
    { value: "1", label: i18n.global.t("system.tip79") },
    // { value: "2", label: "自定数据权限" },
    // { value: "3", label: "本部门数据权限" },
    { value: "4", label: i18n.global.t("system.tip80") },
    { value: "5", label: i18n.global.t("system.tip81") },
  ];
} else if (userInfo.roles[0].dataScope === "4") {
  dataScopeOptions.value = [
    // { value: "1", label: "全部数据权限" },
    // { value: "2", label: "自定数据权限" },
    // { value: "3", label: "本部门数据权限" },
    { value: "4", label: i18n.global.t("system.tip80") },
    { value: "5", label: i18n.global.t("system.tip81") },
  ];
} else {
  dataScopeOptions.value = [
    // { value: "1", label: "全部数据权限" },
    // { value: "2", label: "自定数据权限" },
    // { value: "3", label: "本部门数据权限" },
    // { value: "4", label: "本部门及以下数据权限" },
    { value: "5", label: i18n.global.t("system.tip81") },
  ];
}
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    roleName: undefined,
    roleKey: undefined,
    status: undefined,
  },
  rules: {
    roleName: [
      {
        required: true,
        message: i18n.global.t("system.tip82"),
        trigger: "blur",
      },
    ],
    roleKey: [
      {
        required: true,
        message: i18n.global.t("system.tip83"),
        trigger: "blur",
      },
    ],
    roleSort: [
      {
        required: true,
        message: i18n.global.t("system.tip84"),
        trigger: "blur",
      },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询角色列表 */
function getList() {
  loading.value = true;
  listRole(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      roleList.value = response.rows;
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
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}
/** 删除按钮操作 */
function handleDelete(row) {
  const roleIds = row.roleId || ids.value;
  proxy.$modal
    .confirm(i18n.global.t("system.tip85", { num: roleIds }))

    .then(function () {
      return delRole(roleIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("system.successfuldele"));
    })
    .catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "system/role/export",
    {
      ...queryParams.value,
    },
    `role_${new Date().getTime()}.xlsx`
  );
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.roleId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 角色状态修改 */
function handleStatusChange(row) {
  let text =
    row.status === "0"
      ? i18n.global.t("system.enable")
      : i18n.global.t("system.deactivate");
  proxy.$modal
    .confirm(i18n.global.t("system.tip86", { num1: text, num2: row.roleName }))

    .then(function () {
      return changeRoleStatus(row.roleId, row.status);
    })
    .then(() => {
      proxy.$modal.msgSuccess(i18n.global.t("system.tip87", { num: text }));
    })
    .catch(function () {
      row.status = row.status === "0" ? "1" : "0";
    });
}
/** 更多操作 */
function handleCommand(command, row) {
  switch (command) {
    case "handleDataScope":
      handleDataScope(row);
      break;
    case "handleAuthUser":
      handleAuthUser(row);
      break;
    default:
      break;
  }
}
/** 分配用户 */
function handleAuthUser(row) {
  router.push("/system/role-auth/user/" + row.roleId);
}
/** 查询菜单树结构 */
function getMenuTreeselect() {
  menuTreeselect().then((response) => {
    menuOptions.value = response;
  });
}
/** 所有部门节点数据 */
function getDeptAllCheckedKeys() {
  // 目前被选中的部门节点
  let checkedKeys = deptRef.value.getCheckedKeys();
  // 半选中的部门节点
  let halfCheckedKeys = deptRef.value.getHalfCheckedKeys();
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
  return checkedKeys;
}
/** 重置新增的表单以及其他数据  */
function reset() {
  if (menuRef.value != undefined) {
    menuRef.value.setCheckedKeys([]);
  }
  menuExpand.value = true;
  menuNodeAll.value = false;
  deptExpand.value = true;
  deptNodeAll.value = false;
  form.value = {
    roleId: undefined,
    roleName: undefined,
    roleKey: undefined,
    roleSort: 0,
    status: "0",
    menuIds: [],
    deptIds: [],
    menuCheckStrictly: true,
    deptCheckStrictly: true,
    remark: undefined,
    dataScope: userInfo.roles[0].dataScope,
  };
  proxy.resetForm("roleRef");
}
/** 添加角色 */
function handleAdd() {
  reset();
  getMenuTreeselect();
  open.value = true;
  title.value = i18n.global.t("system.Addrole");
}
/** 修改角色 */
function handleUpdate(row) {
  reset();
  const roleId = row.roleId || ids.value;
  const roleMenu = getRoleMenuTreeselect(roleId);
  getRole(roleId).then((response) => {
    form.value = response;
    form.value.roleSort = Number(form.value.roleSort);
    form.value.menuCheckStrictly = true; // 手动归为默认联动
    open.value = true;
    nextTick(() => {
      roleMenu.then((res) => {
        let checkedKeys = res.checkedKeys;
        checkedKeys.forEach((v) => {
          nextTick(() => {
            menuRef.value.setChecked(v, true, false);
          });
        });
      });
    });
    title.value = i18n.global.t("system.editrole");
  });
}
/** 根据角色ID查询菜单树结构 */
function getRoleMenuTreeselect(roleId) {
  return roleMenuTreeselect(roleId).then((response) => {
    menuOptions.value = response.menus;
    return response;
  });
}
/** 根据角色ID查询部门树结构 */
function getDeptTree(roleId) {
  return deptTreeSelect(roleId).then((response) => {
    deptOptions.value = response.depts;
    return response;
  });
}
/** 树权限（展开/折叠）*/
function handleCheckedTreeExpand(value, type) {
  if (type == "menu") {
    let treeList = menuOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      menuRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  } else if (type == "dept") {
    let treeList = deptOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      deptRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  }
}
/** 树权限（全选/全不选） */
function handleCheckedTreeNodeAll(value, type) {
  if (type == "menu") {
    menuRef.value.setCheckedNodes(value ? menuOptions.value : []);
  } else if (type == "dept") {
    deptRef.value.setCheckedNodes(value ? deptOptions.value : []);
  }
}
/** 树权限（父子联动） */
function handleCheckedTreeConnect(value, type) {
  if (type == "menu") {
    form.value.menuCheckStrictly = value ? true : false;
  } else if (type == "dept") {
    form.value.deptCheckStrictly = value ? true : false;
  }
}
/** 所有菜单节点数据 */
function getMenuAllCheckedKeys() {
  // 目前被选中的菜单节点
  let checkedKeys = menuRef.value.getCheckedKeys();
  // 半选中的菜单节点
  let halfCheckedKeys = menuRef.value.getHalfCheckedKeys();
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
  return checkedKeys;
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["roleRef"].validate((valid) => {
    if (valid) {
      if (form.value.roleId != undefined) {
        form.value.menuIds = getMenuAllCheckedKeys();
        updateRole(form.value).then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t("system.SuccessfulModif"));
          open.value = false;
          getList();
        });
      } else {
        form.value.menuIds = getMenuAllCheckedKeys();
        addRole(form.value).then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t("system.addSuccessful"));
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 选择角色权限范围触发 */
function dataScopeSelectChange(value) {
  if (value !== "2") {
    deptRef.value.setCheckedKeys([]);
  }
}
/** 分配数据权限操作 */
function handleDataScope(row) {
  reset();
  const deptTreeSelect = getDeptTree(row.roleId);
  getRole(row.roleId).then((response) => {
    form.value = response;
    openDataScope.value = true;
    nextTick(() => {
      deptTreeSelect.then((res) => {
        nextTick(() => {
          if (deptRef.value) {
            deptRef.value.setCheckedKeys(res.checkedKeys);
          }
        });
      });
    });
    title.value = i18n.global.t("system.tip88");
  });
}
/** 提交按钮（数据权限） */
function submitDataScope() {
  if (form.value.roleId != undefined) {
    form.value.deptIds = getDeptAllCheckedKeys();
    dataScope(form.value).then((response) => {
      proxy.$modal.msgSuccess(i18n.global.t("system.SuccessfulModif"));
      openDataScope.value = false;
      getList();
    });
  }
}
/** 取消按钮（数据权限）*/
function cancelDataScope() {
  openDataScope.value = false;
  reset();
}

getList();
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.my-tree {
  padding: 15px;
  height: 400px;
  overflow: auto;
  & > .el-tree-node {
    margin-bottom: 15px;
  }
}
.my-tree > .el-tree-node > .el-tree-node__children {
  display: flex;
  flex-wrap: wrap;
  & > .el-tree-node {
    padding: 0 10px;
    margin-bottom: 15px;
  }
}
.my-tree > .el-tree-node > .el-tree-node__content {
  border-bottom: 1px solid #e5e6e7;
  margin-bottom: 10px;
  height: 40px;
  .el-tree-node__label {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
