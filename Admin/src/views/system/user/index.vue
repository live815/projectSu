<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <!-- <el-col :span="4" :xs="24">
        <DeptSearch
          @handleTreeClick="handleTreeClick"
          :deptOptions="deptOptions"
        />
      </el-col> -->
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-form
          :model="queryParams"
          ref="queryRef"
          :inline="true"
          v-show="showSearch"
          label-width="68px"
        >
          <el-form-item :label="$t('system.username')" prop="userName">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('system.tip69')"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item :label="$t('system.Role')" prop="roleId">
            <el-select
              v-model="queryParams.roleId"
              :placeholder="$t('system.pleaseChoose')"
              clearable
              style="width: 240px"
            >
              <el-option
                v-for="dict in roleList"
                :key="dict.roleId"
                :label="dict.roleName"
                :value="dict.roleId"
                :disabled="dict.status != 0"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('system.department')" prop="deptId">
            <el-tree-select
              class="el-form-item-custom"
              v-model="queryParams.deptId"
              :data="deptList"
              :props="{
                value: 'deptId',
                label: 'deptName',
                children: 'children'
              }"
              value-key="id"
              :placeholder="$t('system.pleaseChoose')"
              check-strictly
            />
          </el-form-item>
          <el-form-item :label="$t('system.post')" prop="postId">
            <el-select
              v-model="queryParams.postId"
              :placeholder="$t('system.pleaseChoose')"
              clearable
              style="width: 240px"
            >
              <el-option
                v-for="dict in postList"
                :key="dict.postId"
                :label="dict.postName"
                :value="dict.postId"
                :disabled="dict.status != 0"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('system.Accounttype')" prop="accountType">
            <el-select
              v-model="queryParams.accountType"
              :placeholder="$t('system.pleaseChoose')"
              clearable
              style="width: 240px"
            >
              <!-- <el-option value="" label="全部"> </el-option> -->
              <el-option
                v-for="dict in sys_account_type"
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
              :shortcuts="shortcuts"
            ></el-date-picker>
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
              v-hasPermi="['system:user:add']"
              >{{ $t('system.add') }}</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              plain
              icon="Edit"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['system:user:edit']"
              >{{ $t('system.edit') }}</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <!-- <el-button
              type="info"
              plain
              icon="Upload"
              @click="handleImport"
              v-hasPermi="['system:user:import']"
              >导入</el-button
            > -->
          </el-col>
          <el-col :span="1.5">
            <!-- <el-button
              type="warning"
              plain
              icon="Download"
              @click="handleExport"
              v-hasPermi="['system:user:export']"
              >导出</el-button
            > -->
          </el-col>
          <right-toolbar
            v-model:showSearch="showSearch"
            @queryTable="getList"
            :columns="columns"
          ></right-toolbar>
        </el-row>
        <!-- 表格 -->
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            :label="$t('system.creationtime')"
            align="center"
            prop="createTime"
            v-if="columns[0].visible"
            width="160"
          >
            <template #default="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('system.username')"
            align="center"
            prop="userName"
            v-if="columns[1].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            :label="$t('system.Role')"
            align="center"
            prop="roleName"
            v-if="columns[2].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            :label="$t('system.department')"
            align="center"
            prop="deptName"
            v-if="columns[3].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            :label="$t('system.post')"
            align="center"
            prop="postName"
            v-if="columns[4].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            :label="$t('system.businesscountry')"
            align="center"
            prop="country"
            v-if="columns[5].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            :label="$t('system.changetime')"
            align="center"
            prop="createTime"
            v-if="columns[6].visible"
            width="160"
          >
            <template #default="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('system.Accounttype')"
            align="center"
            width="160"
            v-if="columns[7].visible"
          >
            <template #default="scope">
              <div v-html="getAccountTypeDetail(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('system.Accountstatus')"
            align="center"
            v-if="columns[8].visible"
          >
            <template #default="scope">
              <div v-html="getAccountStatus(scope.row)"></div>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('system.operate')"
            align="center"
            width="500"
            class-name="small-padding fixed-width"
          >
            <template #default="scope">
              <div v-if="scope.row.userId !== adminId">
                <template v-if="Number(scope.row.status) === 4">
                  <el-button
                    type="success"
                    @click="changeStatus(scope.row, -1)"
                    v-hasPermi="['system:user:enable']"
                    >{{ $t('system.Renable') }}</el-button
                  >
                </template>
                <template v-else>
                  <el-button
                    type="warning"
                    @click="changeStatus(scope.row, 4)"
                    v-hasPermi="['system:user:deactivate']"
                    >{{ $t('system.tip102') }}</el-button
                  >
                  <el-button
                    type="primary"
                    @click="handleUpdate(scope.row)"
                    v-hasPermi="['system:user:edit']"
                    >{{ $t('system.edit2') }}</el-button
                  >
                  <el-button
                    type="primary"
                    @click="handleResetPwd(scope.row)"
                    v-hasPermi="['system:user:resetPwd']"
                    >{{ $t('system.resetpassword') }}</el-button
                  >
                  <el-button
                    v-if="Number(scope.row.status) === 1"
                    type="danger"
                    @click="changeStatus(scope.row, 0)"
                    v-hasPermi="['system:user:unlock']"
                    >{{ $t('system.unlock') }}</el-button
                  >
                  <el-button
                    v-else
                    type="warning"
                    @click="changeStatus(scope.row, 1)"
                    v-hasPermi="['system:user:lock']"
                    >{{ $t('system.locking') }}</el-button
                  >
                  <el-button
                    type="success"
                    @click="getResetGoogle(scope.row)"
                    v-hasPermi="['system:user:lock']"
                    >重置谷歌验证</el-button
                  >
                </template>

                <!-- <el-button
                  type="primary"
                  @click="handleAuthRole(scope.row)"
                  v-hasPermi="['system:user:edit']"
                  >分配角色</el-button
                > -->
              </div>
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
      </el-col>
    </el-row>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" v-model="open" width="450px" append-to-body>
      <el-form :model="form" :rules="rules" ref="userRef" label-width="110px">
        <!-- 用户名称 -->
        <el-form-item :label="$t('system.username')" prop="userName">
          <el-input
            class="el-form-item-custom"
            v-model="form.userName"
            :placeholder="$t('system.tip69')"
            maxlength="30"
            minlength="6"
            onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
            :disabled="form.userId !== undefined"
          />
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item
          v-if="form.userId == undefined"
          :label="$t('system.userpassword')"
          prop="password"
        >
          <el-input
            class="el-form-item-custom"
            v-model="form.password"
            :placeholder="$t('system.tip103')"
            type="password"
            onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
            maxlength="20"
            show-password
          />
        </el-form-item>
        <!-- 角色 -->
        <el-form-item :label="$t('system.Role')" prop="roleIds">
          <el-select
            class="el-form-item-custom"
            v-model="form.roleIds"
            :placeholder="$t('system.pleaseChoose')"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
              :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 归属部门 -->
        <el-form-item :label="$t('system.Belongdepart')" prop="deptId">
          <el-tree-select
            class="el-form-item-custom"
            v-model="form.deptId"
            :data="deptList"
            :props="{
              value: 'deptId',
              label: 'deptName',
              children: 'children'
            }"
            value-key="id"
            :placeholder="$t('system.tip104')"
            check-strictly
          />
        </el-form-item>
        <!-- 岗位 -->
        <el-form-item :label="$t('system.post')" prop="postIds">
          <el-select
            class="el-form-item-custom"
            v-model="form.postIds"
            :placeholder="$t('system.pleaseChoose')"
          >
            <el-option
              v-for="item in postOptions"
              :key="item.postId"
              :label="item.postName"
              :value="item.postId"
              :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 账号有效期 -->
        <el-form-item :label="$t('system.tip105')" prop="accountType">
          <el-radio-group v-model="form.accountType">
            <el-radio v-for="dict in sys_account_type" :key="dict.value" :label="dict.value">{{
              dict.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 有效截止时间 -->
        <el-form-item
          v-if="Number(form.accountType) === 1"
          :label="$t('system.tip106')"
          prop="expiredTime"
        >
          <el-date-picker
            style="width: 280px"
            v-model="form.expiredTime"
            type="datetime"
            :placeholder="$t('system.selectperiod')"
            :defaultTime="new Date(2000, 1, 1, 23, 59, 59)"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">{{ $t('system.sure') }}</el-button>
          <el-button @click="cancel">{{ $t('system.cancle') }}</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" v-model="upload.open" width="400px" append-to-body>
      <el-upload
        ref="uploadRef"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          <span v-html="$t('system.tip107')"></span>
        </div>
        <template #tip>
          <div class="el-upload__tip text-center">
            <div class="el-upload__tip">
              <el-checkbox v-model="upload.updateSupport" />{{ $t('system.tip108') }}
            </div>
            <span>{{ $t('system.tip109') }}</span>
            <el-link
              type="primary"
              :underline="false"
              style="font-size: 12px; vertical-align: baseline"
              @click="importTemplate"
              >{{ $t('system.Downloadtemplate') }}</el-link
            >
          </div>
        </template>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFileForm">{{ $t('system.sure') }}</el-button>
          <el-button @click="upload.open = false">{{ $t('system.cancle') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="User">
import { getToken } from '@/utils/auth'
import { defaultTime, shortcuts } from '@/utils/config'
import i18n from '@/i18n'
import {
  changeUserStatus,
  listUser,
  resetUserPwd,
  delUser,
  getUser,
  updateUser,
  addUser,
  deptTreeSelect,
  getResetGoogleApi
} from '@/api/system/user'
import { resetEmptyValues } from '@/utils'
import useQueryConditionList from './hooks/useQueryConditionList'
import { ElMessage, ElMessageBox } from 'element-plus'
const { roleList, deptList, postList } = useQueryConditionList()
const router = useRouter()
const { proxy } = getCurrentInstance()
const { sys_account_type } = proxy.useDict('sys_account_type')
const adminId = 1 // 超级管理员Id
const userList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref('')
const dateRange = ref([])
const deptOptions = ref(undefined)
const initPassword = ref(undefined)
const postOptions = ref([])
const roleOptions = ref([])
/*** 用户导入参数 */
const upload = reactive({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: '',
  // 是否禁用上传
  isUploading: false,
  // 是否更新已经存在的用户数据
  updateSupport: 0,
  // 设置上传的请求头部
  headers: { Authorization: 'Bearer ' + getToken() },
  // 上传的地址
  url: '/system/user/importData'
})
// 列显隐信息
const columns = ref([
  { key: 0, label: i18n.global.t('system.creationtime2'), visible: true },
  { key: 1, label: i18n.global.t('system.username3'), visible: true },
  { key: 2, label: i18n.global.t('system.Role1'), visible: true },
  { key: 3, label: i18n.global.t('system.department1'), visible: true },
  { key: 4, label: i18n.global.t('system.post1'), visible: true },
  { key: 5, label: i18n.global.t('system.businesscountry1'), visible: true },
  { key: 6, label: i18n.global.t('system.changetime1'), visible: true },
  { key: 7, label: i18n.global.t('system.Accounttype1'), visible: true },
  { key: 8, label: i18n.global.t('system.Accountstatus1'), visible: true }
])

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: '',
    roleId: '',
    deptId: '',
    postId: '',
    accountType: '',
    status: ''
  },
  rules: {
    userName: [
      {
        required: true,
        message: i18n.global.t('system.tip110'),
        trigger: 'blur'
      },
      {
        min: 6,
        max: 20,
        message: i18n.global.t('system.tip111'),
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: i18n.global.t('system.tip112'),
        trigger: 'blur'
      },
      {
        min: 6,
        max: 20,
        message: i18n.global.t('system.tip113'),
        trigger: 'blur'
      }
    ],
    roleIds: [
      {
        required: true,
        message: i18n.global.t('system.tip114'),
        trigger: 'blur'
      }
    ],
    deptId: [
      {
        required: true,
        message: i18n.global.t('system.tip115'),
        trigger: 'blur'
      }
    ],
    postIds: [
      {
        required: true,
        message: i18n.global.t('system.tip116'),
        trigger: 'blur'
      }
    ],
    accountType: [
      {
        required: true,
        message: i18n.global.t('system.tip117'),
        trigger: 'blur'
      }
    ],
    expiredTime: [
      {
        required: true,
        message: i18n.global.t('system.tip118'),
        trigger: 'blur'
      }
    ]
  }
})

const { queryParams, form, rules } = toRefs(data)

// 部门树节点被点击回调
function handleTreeClick(deptId) {
  queryParams.value.deptId = deptId
  handleQuery()
}

/** 查询部门下拉树结构 */
function getDeptTree() {
  deptTreeSelect().then((response) => {
    deptOptions.value = response
  })
}
/** 查询用户列表 */
function getList() {
  loading.value = true
  listUser(proxy.addDateRange(queryParams.value, dateRange.value)).then((res) => {
    loading.value = false
    let rows = res.rows || []
    if (rows && rows.length) {
      // 重置空属性
      rows.forEach((obj) => {
        obj = resetEmptyValues(obj)
      })
    }
    userList.value = rows
    total.value = res.total
  })
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = []
  proxy.resetForm('queryRef')
  queryParams.value.deptId = undefined
  proxy.$refs.deptTreeRef.setCurrentKey(null)
  handleQuery()
}
/** 删除按钮操作 */
function handleDelete(row) {
  const userIds = row.userId || ids.value
  proxy.$modal
    .confirm(i18n.global.t('system.tip119', { num: userIds }))
    .then(function () {
      return delUser(userIds)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess(i18n.global.t('system.successfuldele'))
    })
    .catch(() => {})
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    'system/user/export',
    {
      ...queryParams.value
    },
    `user_${new Date().getTime()}.xlsx`
  )
}
/** 用户状态修改  */
function handleStatusChange(row) {
  let text =
    row.status === '0' ? i18n.global.t('system.enable') : i18n.global.t('system.deactivate')
  proxy.$modal
    .confirm(i18n.global.t('system.tip120', { num1: text, num2: row.userName }))

    .then(function () {
      return changeUserStatus(row.userId, row.status)
    })
    .then(() => {
      proxy.$modal.msgSuccess(i18n.global.t('system.tip87', { num: text }))
    })
    .catch(function () {
      row.status = row.status === '0' ? '1' : '0'
    })
}
/** 更多操作 */
function handleCommand(command, row) {
  switch (command) {
    case 'handleResetPwd':
      handleResetPwd(row)
      break
    case 'handleAuthRole':
      handleAuthRole(row)
      break
    default:
      break
  }
}
/** 跳转角色分配 */
function handleAuthRole(row) {
  const userId = row.userId
  router.push('/system/user-auth/role/' + userId)
}
/** 重置密码按钮操作 */
function handleResetPwd(row) {
  proxy
    .$prompt(i18n.global.t('system.tip121', { num: row.userName }), '提示', {
      confirmButtonText: i18n.global.t('system.sure1'),
      cancelButtonText: i18n.global.t('system.cancle'),
      closeOnClickModal: false,
      inputPattern: /^(?!.*[\s\u4e00-\u9fa5]).{6,20}$/,
      inputErrorMessage: i18n.global.t('system.tip122')
    })
    .then(({ value }) => {
      resetUserPwd(row.userId, value).then((response) => {
        proxy.$modal.msgSuccess(i18n.global.t('system.tip123', { num: value }))
      })
    })
    .catch(() => {})
}
// 重置谷歌验证码
const getResetGoogle = (row) => {
  ElMessageBox.confirm('是否重置用户谷歌验证码')
    .then(() => {
      getResetGoogleApi({ userId: row.userId }).then(() => {
        ElMessage({
          type: 'success',
          message: '重置成功'
        })
      })
    })
    .catch(() => {})
}
/** 选择条数  */
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.userId)
  single.value = selection.length != 1
  multiple.value = !selection.length
}
/** 导入按钮操作 */
function handleImport() {
  upload.title = i18n.global.t('system.UserImport')
  upload.open = true
}
/** 下载模板操作 */
function importTemplate() {
  proxy.download('system/user/importTemplate', {}, `user_template_${new Date().getTime()}.xlsx`)
}
/**文件上传中处理 */
const handleFileUploadProgress = (event, file, fileList) => {
  upload.isUploading = true
}
/** 文件上传成功处理 */
const handleFileSuccess = (response, file, fileList) => {
  upload.open = false
  upload.isUploading = false
  proxy.$refs['uploadRef'].handleRemove(file)
  proxy.$alert(
    "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
      response.msg +
      '</div>',
    i18n.global.t('system.Importresults'),
    { dangerouslyUseHTMLString: true }
  )
  getList()
}
/** 提交上传文件 */
function submitFileForm() {
  proxy.$refs['uploadRef'].submit()
}
/** 重置操作表单 */
function reset() {
  form.value = {
    userId: undefined, // 用户id
    userName: undefined, // 用户名
    password: undefined, // 密码
    roleIds: [], // 角色
    deptId: undefined, // 部门id
    postIds: [], // 岗位
    accountType: '0', // 账号类型 0永久 1临时
    expiredTime: '',
    status: '0', // 状态
    phonenumber: undefined,
    email: undefined,
    sex: undefined,
    remark: undefined
  }
  proxy.resetForm('userRef')
}
/** 取消按钮 */
function cancel() {
  open.value = false
  reset()
}
/** 新增按钮操作 */
function handleAdd() {
  reset()
  getUser().then((response) => {
    postOptions.value = response.posts
    roleOptions.value = response.roles
    open.value = true
    title.value = i18n.global.t('system.addUser')
    form.value.password = initPassword.value
  })
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset()
  const userId = row.userId || ids.value.join(',')
  getUser(userId).then((response) => {
    form.value.userId = response.user.userId
    form.value.userName = response.user.userName
    postOptions.value = response.posts
    roleOptions.value = response.roles
    //  多选时需要去掉
    if (response.postIds instanceof Array) {
      form.value.postIds = response.postIds[0]
    }
    if (response.roleIds instanceof Array) {
      form.value.roleIds = response.roleIds[0]
    }
    form.value.deptId = response.user.deptId
    form.value.accountType = response.user.accountType
    form.value.expiredTime = response.user.expiredTime

    open.value = true
    title.value = i18n.global.t('system.Modifyuser')
  })
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs['userRef'].validate((valid) => {
    if (valid) {
      let reqData = JSON.parse(JSON.stringify(form.value))
      // 多选时需要去掉
      if (!(reqData.postIds instanceof Array)) {
        reqData.postIds = [reqData.postIds]
        reqData.roleIds = [reqData.roleIds]
      }
      if (reqData.userId != undefined) {
        updateUser(reqData).then(() => {
          proxy.$modal.msgSuccess(i18n.global.t('system.SuccessfulModif'))
          open.value = false
          getList()
        })
      } else {
        addUser(reqData).then(() => {
          proxy.$modal.msgSuccess(i18n.global.t('system.addSuccessful'))
          open.value = false
          getList()
        })
      }
    }
  })
}

// 计算账号类型文本
function getAccountTypeDetail({ accountType, status, expiredTime }) {
  if (Number(accountType) === 1) {
    //  账号状态（0正常 1已锁定 3已失效 4已离职）
    if (Number(status) === 3) {
      return i18n.global.t('system.tip124', { num: expiredTime })
    } else {
      return `
         <p style="color:red">${i18n.global.t('system.tip106')}：</p>
         <p>${expiredTime}</p>
      `
    }
  } else {
    return i18n.global.t('system.tip125')
  }
}
// 账号状态
function getAccountStatus({ status }) {
  //  账号状态（0正常 1已锁定 3已失效 4已离职）
  switch (Number(status)) {
    case 0:
      return `<span style="color:green">${i18n.global.t('system.tip126')}</span>`
    case 1:
      return `<span style="color:red">${i18n.global.t('system.tip127')}</span>`
    case 3:
      return `<span style="color:red">${i18n.global.t('system.tip128')}</span>`
    case 4:
      return `<span style="color:red">${i18n.global.t('system.tip129')}</span>`
    default:
      return `<span style="color:green">${i18n.global.t('system.tip126')}</span>`
  }
}

// 修改账号状态
function changeStatus(row, status) {
  const userIds = row.userName
  const type = status === -1 ? 0 : status
  let title = i18n.global.t('system.tip130')
  let content = ''
  if (status === 4) {
    title = i18n.global.t('system.tip102')
    content = i18n.global.t('system.tip131')
  } else if (status === -1) {
    title = i18n.global.t('system.Renable')
    content = i18n.global.t('system.tip132')
  } else if (status === 1) {
    content = i18n.global.t('system.tip133', { num: userIds })
  } else {
    content = i18n.global.t('system.tip133', { num: userIds })
  }
  proxy.$modal
    .confirms(content, title)
    .then(function () {
      return changeUser(row, type)
    })
    .catch(() => {})
}
const changeUser = (row, status) => {
  changeUserStatus(row.userId, status).then(() => {
    proxy.$modal.msgSuccess(i18n.global.t('system.tip134'))
    row.status = status
    getList()
  })
}

// getDeptTree();
getList()
</script>
<style lang="scss" scoped>
.el-form-item-custom {
  width: 280px !important;
}
</style>
