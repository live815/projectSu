<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item :label="$t('system.manuname')" prop="menuName">
        <el-input
          v-model="queryParams.menuName"
          :placeholder="$t('system.tip41')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('system.status')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('system.Menustatus')"
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
          $t('system.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('system.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:menu:add']"
          >{{ $t('system.add') }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll">{{
          $t('system.tip12')
        }}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="menuList"
      row-key="menuId"
      :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column :label="$t('system.manuname')" :show-overflow-tooltip="true" width="200">
        <template #default="scope">
          <svg-icon :icon-class="scope.row.icon" style="margin-right:3px"/>
          <span>{{ scope.row.menuName }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('system.menuType')" :show-overflow-tooltip="true" width="100">
        <template #default="scope">
          <span>{{ getMenuTypeText(scope.row.menuType) }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="icon" :label="$t('system.icon')" align="center" width="100">
        <template #default="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
      </el-table-column> -->
      <el-table-column prop="orderNum" :label="$t('system.sort')" width="60"></el-table-column>
      <el-table-column
        prop="perms"
        :label="$t('system.PermissionID')"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="component"
        :label="$t('system.componepath')"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="status" :label="$t('system.status')" width="80">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.creationtime')"
        align="center"
        width="160"
        prop="createTime"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.operate')"
        align="center"
        width="210"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:menu:edit']"
            >{{ $t('system.edit') }}</el-button
          >
          <el-button
            link
            type="primary"
            icon="Plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:menu:add']"
            >{{ $t('system.add') }}</el-button
          >
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:menu:remove']"
            >{{ $t('system.delete') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改菜单对话框 -->
    <el-dialog :title="title" v-model="open" width="680px" append-to-body>
      <el-form ref="menuRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('system.Previousmenu')">
              <el-tree-select
                v-model="form.parentId"
                :data="menuOptions"
                :props="{
                  value: 'menuId',
                  label: 'menuName',
                  children: 'children'
                }"
                value-key="menuId"
                :placeholder="$t('system.tip42')"
                check-strictly
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('system.menuType')" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">{{ $t('system.Tablecontents') }}</el-radio>
                <el-radio label="C">{{ $t('system.menu') }}</el-radio>
                <el-radio label="F">{{ $t('system.button') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="form.menuType != 'F'">
            <el-form-item :label="$t('system.menuicon')" prop="icon">
              <el-popover
                placement="bottom-start"
                :width="540"
                v-model:visible="showChooseIcon"
                trigger="click"
                @show="showSelectIcon"
              >
                <template #reference>
                  <el-input
                    v-model="form.icon"
                    :placeholder="$t('system.tip43')"
                    @blur="showSelectIcon"
                    v-click-outside="hideSelectIcon"
                    readonly
                  >
                    <template #prefix>
                      <svg-icon
                        v-if="form.icon"
                        :icon-class="form.icon"
                        class="el-input__icon"
                        style="height: 32px; width: 16px"
                      />
                      <el-icon v-else style="height: 32px; width: 16px"><search /></el-icon>
                    </template>
                  </el-input>
                </template>
                <icon-select ref="iconSelectRef" @selected="selected" :active-icon="form.icon" />
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.manuname')" prop="menuName">
              <el-input v-model="form.menuName" :placeholder="$t('system.tip41')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.ShowSort')" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != 'F'">
            <el-form-item>
              <template #label>
                <span>
                  <el-tooltip :content="$t('system.tip44')" placement="top">
                    <el-icon><question-filled /></el-icon> </el-tooltip
                  >{{ $t('system.tip45') }}
                </span>
              </template>
              <el-radio-group v-model="form.isFrame">
                <el-radio label="0">{{ $t('system.yes') }}</el-radio>
                <el-radio label="1">{{ $t('system.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != 'F'">
            <el-form-item prop="path">
              <template #label>
                <span>
                  <el-tooltip :content="$t('system.tip46')" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  {{ $t('system.routaddress') }}
                </span>
              </template>
              <el-input v-model="form.path" :placeholder="$t('system.tip47')" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item prop="component">
              <template #label>
                <span>
                  <el-tooltip :content="$t('system.tip48')" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  {{ $t('system.componepath') }}
                </span>
              </template>
              <el-input v-model="form.component" :placeholder="$t('system.tip49')" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != 'M'">
            <el-form-item>
              <el-input v-model="form.perms" :placeholder="$t('system.tip50')" maxlength="100" />
              <template #label>
                <span>
                  <el-tooltip :content="$t('system.tip51', { num: '@' })" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  {{ $t('system.permischaract') }}
                </span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item>
              <el-input v-model="form.query" :placeholder="$t('system.tip52')" maxlength="255" />
              <template #label>
                <span>
                  <el-tooltip
                    :content="$t('system.tip55', { num: '{', num1: '}' })"
                    placement="top"
                  >
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  {{ $t('system.routparameters') }}
                </span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item>
              <template #label>
                <span>
                  <el-tooltip :content="$t('system.tip56')" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  {{ $t('system.tip57') }}
                </span>
              </template>
              <el-radio-group v-model="form.isCache">
                <el-radio label="0"> {{ $t('system.cache') }}</el-radio>
                <el-radio label="1">{{ $t('system.notcache') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != 'F'">
            <el-form-item>
              <template #label>
                <span>
                  <el-tooltip :content="$t('system.tip58')" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  {{ $t('system.Displaystate') }}
                </span>
              </template>
              <el-radio-group v-model="form.visible">
                <el-radio v-for="dict in sys_show_hide" :key="dict.value" :label="dict.value">{{
                  dict.label
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != 'F'">
            <el-form-item>
              <template #label>
                <span>
                  <el-tooltip :content="$t('system.tip59')" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  {{ $t('system.Menustatus') }}
                </span>
              </template>
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
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm"> {{ $t('system.sure') }}</el-button>
          <el-button @click="cancel"> {{ $t('system.cancle') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Menu">
import { addMenu, delMenu, getMenu, listMenu, updateMenu } from '@/api/system/menu'
import SvgIcon from '@/components/SvgIcon'
import IconSelect from '@/components/IconSelect'
import { ClickOutside as vClickOutside } from 'element-plus'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
const { sys_show_hide, sys_normal_disable } = proxy.useDict('sys_show_hide', 'sys_normal_disable')

const menuList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const title = ref('')
const menuOptions = ref([])
const isExpandAll = ref(false)
const refreshTable = ref(true)
const showChooseIcon = ref(false)
const iconSelectRef = ref(null)

const data = reactive({
  form: {},
  queryParams: {
    menuName: undefined,
    visible: undefined
  },
  rules: {
    menuName: [
      {
        required: true,
        message: i18n.global.t('system.tip60'),
        trigger: 'blur'
      }
    ],
    orderNum: [
      {
        required: true,
        message: i18n.global.t('system.tip61'),
        trigger: 'blur'
      }
    ],
    path: [
      {
        required: true,
        message: i18n.global.t('system.tip62'),
        trigger: 'blur'
      }
    ]
  }
})

const { queryParams, form, rules } = toRefs(data)

/** 查询菜单列表 */
function getList() {
  loading.value = true
  listMenu(queryParams.value).then((response) => {
    menuList.value = proxy.handleTree(response, 'menuId')
    loading.value = false
  })
}
/** 查询菜单下拉树结构 */
function getTreeselect() {
  menuOptions.value = []
  listMenu().then((response) => {
    const menu = {
      menuId: 0,
      menuName: i18n.global.t('system.maincategory'),
      children: []
    }
    menu.children = proxy.handleTree(response, 'menuId')
    menuOptions.value.push(menu)
  })
}
/** 取消按钮 */
function cancel() {
  open.value = false
  reset()
}
/** 表单重置 */
function reset() {
  form.value = {
    menuId: undefined,
    parentId: 0,
    menuName: undefined,
    icon: undefined,
    menuType: 'M',
    orderNum: undefined,
    isFrame: '1',
    isCache: '0',
    visible: '0',
    status: '0'
  }
  proxy.resetForm('menuRef')
}
/** 展示下拉图标 */
function showSelectIcon() {
  iconSelectRef.value.reset()
  showChooseIcon.value = true
}
/** 选择图标 */
function selected(name) {
  form.value.icon = name
  showChooseIcon.value = false
}
/** 图标外层点击隐藏下拉列表 */
function hideSelectIcon(event) {
  var elem = event.relatedTarget || event.srcElement || event.target || event.currentTarget
  var className = elem.className
  if (className !== 'el-input__inner') {
    showChooseIcon.value = false
  }
}
/** 搜索按钮操作 */
function handleQuery() {
  getList()
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm('queryRef')
  handleQuery()
}
/** 新增按钮操作 */
function handleAdd(row) {
  reset()
  getTreeselect()
  if (row != null && row.menuId) {
    form.value.parentId = row.menuId
  } else {
    form.value.parentId = 0
  }
  open.value = true
  title.value = i18n.global.t('system.Addmenu')
}
/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}
/** 修改按钮操作 */
async function handleUpdate(row) {
  reset()
  await getTreeselect()
  getMenu(row.menuId).then((response) => {
    form.value = response
    open.value = true
    title.value = i18n.global.t('system.editmenu')
  })
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs['menuRef'].validate((valid) => {
    if (valid) {
      if (form.value.menuId != undefined) {
        updateMenu(form.value).then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t('system.SuccessfulModif'))
          open.value = false
          getList()
        })
      } else {
        addMenu(form.value).then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t('system.addSuccessful'))
          open.value = false
          getList()
        })
      }
    }
  })
}
/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal
    .confirm(i18n.global.t('system.tip217', { num: row.menuName }))
    .then(function () {
      return delMenu(row.menuId)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess(i18n.global.t('system.successfuldele'))
    })
    .catch(() => {})
}

getList()

function getMenuTypeText(menuType) {
  switch (menuType) {
    case 'M':
      return i18n.global.t('system.Tablecontents')
    case 'C':
      return i18n.global.t('system.menu')
    case 'F':
      return i18n.global.t('system.button')
  }
}
</script>
