<template>
  <div class="main-container InterfaceBox">
    <div class="">
      <el-form :model="searchForm" ref="queryRef" v-show="showSearch" :inline="true" label-width="105px">
        <el-form-item :label="$t('SuperAdminCenter.MuteStatus')">
          <el-select v-model="searchForm.status" class="m-2" :placeholder="$t('SuperAdminCenter.PleaseChoose')" style="width: 148px">
            <el-option v-for="item in banType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SuperAdminCenter.MemberAccount')">
          <el-input v-model="searchForm.userName" class="w-50 m-2" :placeholder="$t('SuperAdminCenter.PleaseEnter')" />
        </el-form-item>
        <el-form-item :label="$t('SuperAdminCenter.BanType')">
          <el-select v-model="searchForm.banType" class="m-2" :placeholder="$t('SuperAdminCenter.PleaseChoose')" style="width: 148px">
            <el-option v-for="item in muteStatus" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SuperAdminCenter.MuteTime')">
          <!-- <TimePicker :timeData="timeData" @updateTimeData="updateTimeData"></TimePicker> -->
          <el-date-picker style="width: 360px" v-model="timeData" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange"
            :range-separator="$t('SuperAdminCenter.To')" :start-placeholder="$t('SuperAdminCenter.StartingTime')" :end-placeholder="$t('SuperAdminCenter.EndTime')" :default-time="defaultTime" />
        </el-form-item>
      </el-form>
      <div class="push-button">
        <div class="button-left">
          <div class="delete-button" @click="batchUntieBtn">{{$t('SuperAdminCenter.UnlockBatches')}}</div>
        </div>
        <div class="button-right">
          <div class="reset-button" @click="handleReset">{{$t('SuperAdminCenter.Reset')}}</div>
          <div class="query-button" @click="handlefilter">{{$t('SuperAdminCenter.Inquire')}}</div>
        </div>
      </div>
      <div class="table-content">
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="30" :selectable="selectable"></el-table-column>
          <el-table-column prop="status" :label="$t('SuperAdminCenter.MuteStatus')" width="150" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status == 1" class="ml-2" effect="dark" type="danger">{{$t('SuperAdminCenter.Banned')}}</el-tag>
              <el-tag v-if="scope.row.status == 0" class="ml-2" effect="dark">{{$t('SuperAdminCenter.BanHasBeenLifted')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="userName" :label="$t('SuperAdminCenter.MemberNickname')" width="150" align="center" />
          <el-table-column prop="content" :label="$t('SuperAdminCenter.SuppressedSpeechContent')" width="380" align="center" />
          <el-table-column prop="duration"  :label="$t('SuperAdminCenter.MuteTimes')" width="120" align="center" />
          <el-table-column prop="banType" :label="$t('SuperAdminCenter.BanType')"  width="120" align="center">
            <template #default="scope">
              <span v-if="scope.row.banType == 1">{{$t('SuperAdminCenter.SystemBan')}}</span>
              <span v-if="scope.row.banType == 2">{{$t('SuperAdminCenter.ManualBan')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="banTime" :label="$t('SuperAdminCenter.MuteTime')" width="200" align="center" />
          <el-table-column prop="untieTime" :label="$t('SuperAdminCenter.UnlockTime')" width="200" align="center" />
          <el-table-column prop="untieBy" :label="$t('SuperAdminCenter.UnbanOperator')"  width="200" align="center" />
          <el-table-column prop="remark" :label="$t('SuperAdminCenter.Remark')" width="100" align="center" />
          <el-table-column label="操作" width="150" align="center" fixed="right">
            <template #default="scope">
              <el-button class="unban" link type="primary" v-if="scope.row.status == 1"
                @click="unProhibition(scope.row.id)">{{$t('SuperAdminCenter.Unban')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <Pagination v-if="total > 0" :current-page="searchForm.pageNum" :page-size="searchForm.pageSize" :total="total"
            @update:current-page="handleCurrentPageUpdate" @update:page-size="handlePageSizeUpdate" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { defaultTime } from "@/utils/config";
import Pagination from '@/components/Pagination/Pagination.vue'
import { getBanLogList, setBatchUntie, setBatchUpdata } from '@/api/liveBroadcast'
import '@/assets/styles/fromUi.scss'
const user = useUserStore()
const searchForm = ref({
  status: '', //禁言状态
  banType: '', //禁言类型
  userName: '',
  beginTime: '',
  endTime: '',
  pageNum: 1,
  pageSize: 10
})
// const loading=ref(true)
const showSearch = ref(true)
const muteStatus = [
  {
    value: '',
    label: i18n.global.t('SuperAdminCenter.All')
  },
  {
    value: 1,
    label: i18n.global.t('SuperAdminCenter.SystemBan')
  },
  {
    value: 2,
    label: i18n.global.t('SuperAdminCenter.ManualBan')
  }
]
const memberAccount = ref('')
const multipleSelection = ref([])
const banType = [
  {
    value: '',
    label:i18n.global.t('SuperAdminCenter.All')
  },
  {
    value: 1,
    label: i18n.global.t('SuperAdminCenter.Banned')
  },
  {
    value: 0,
    label:  i18n.global.t('SuperAdminCenter.BanHasBeenLifted')
  }
]
const timeData = ref([])
// 分页
const tableData = ref([])
const total = ref()
//判断多选是否可以勾选
const selectable = (row) => {
  if (row.status === 0) {
    return false
  } else {
    return true
  }
}
// 表格内容
const handleSelectionChange = (val) => {
  multipleSelection.value = []
  const newArray = val.map((item) => item.id)
  multipleSelection.value = newArray
  // console.log(newArray,'multipleSelection.value',multipleSelection.value)
}
//批量解禁
const batchUntieBtn = async () => {
  if (multipleSelection.value && multipleSelection.value.length > 0) {
    try {
      let res = await setBatchUntie({ ids: multipleSelection.value, untieBy: user.userInfo.userName })
      // console.log(res.code,'batchUntieBtn')
      if (res.code === 200) {
        getList()
      }
    } catch (e) {
      console.log(e)
    }
  }
}

//解封
const unProhibition = (id) => {
  ElMessageBox.confirm(i18n.global.t('SuperAdminCenter.CancelTheBan'), i18n.global.t('SuperAdminCenter.Tips'), {
    confirmButtonText: i18n.global.t('SuperAdminCenter.Sure'),
    cancelButtonText: i18n.global.t('SuperAdminCenter.Cancel'),
    type: 'warning'
  })
    .then(() => {
      try {
        setBatchUpdata({ id: id, status: 0, untieBy: user.userInfo.userName }).then((res) => {
          console.log(res, 'setBatchUpdata')
          if (res.code == 200) {
            ElMessage({
              message: i18n.global.t('SuperAdminCenter.Unlockedsuccessfully'),
              type: 'success'
            })
            getList()
          } else {
            ElMessage.error(res.msg)
          }
        })
      } catch (e) {
        console.log(e.message)
      }
    })
    .catch(() => { })
}
const handleCurrentPageUpdate = (newPage) => {
  searchForm.value.pageNum = newPage
  getList()
}
const handlePageSizeUpdate = (newSize) => {
  searchForm.value.pageSize = newSize
  getList()
}
// 重置功能
const handleReset = () => {
  searchForm.value.status = ''
  searchForm.value.banType = ''
  memberAccount.value = ''
  timeData.value = []
  searchForm.value.beginTime = ''
  searchForm.value.endTime = ''
  searchForm.value.userName = ''
  handlefilter()
}
// 批量解禁

const handlefilter = () => {
  if (timeData.value && timeData.value.length > 0) {
    searchForm.value.beginTime = timeData.value[0]
    searchForm.value.endTime = timeData.value[1]
  } else {
    searchForm.value.beginTime = ''
    searchForm.value.endTime = ''
  }
  getList()
}
onMounted(() => {
  getList()
})
const getList = async () => {
  // loading.value=true
  try {
    let res = await getBanLogList(searchForm.value)
    // loading.value=false
    if (res.data?.records && res.data?.records.length > 0) {
      tableData.value = res.data.records
    } else {
      tableData.value = []
    }
    total.value = res.data.total
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="scss" scoped>
.InterfaceBox {
  min-width: 1320px;
  max-width: 1320px;
  padding-top: 30px;
  margin-top: 20px;
  background: #272b45;
  border-radius: 8px;
  // height: 700px;


  .push-button {
    display: flex;
    padding-top: 13px;

    .delete-button {
      color: var(--unnamed, #f35f1b);
      text-align: center;
      
      font-size: 14px;
      text-align: center;
      width: 88px;
      height: 40px;
      line-height: 40px;
      border: 1px solid var(--unnamed, #f35f1b);
      border-radius: 4px;
      cursor: pointer;
    }

    .delete-button:hover {
      background: rgba(243, 95, 27, 0.1);
    }

    .reset-button:hover {
      background: rgba(243, 95, 27, 0.1);
    }

    .button-left {
      margin-left: 30px;
    }

    .button-right {
      display: flex;
      margin-left: auto;
      margin-right: 16px;

      div {
        color: var(--unnamed, #f35f1b);
        text-align: center;
        width: 88px;
        height: 40px;
        line-height: 40px;
        border: 1px solid var(--unnamed, #f35f1b);
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
      }

      .query-button {
        color: #fff;
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        border: none;
      }

      .query-button:hover {
        background: linear-gradient(90deg, #ffc170 25%, #ff9d70 89.06%);
      }
    }
  }

  .table-content {
    padding-top: 30px;
    width: 1270px;
    margin: 0 auto;
  }

  .unban {
    
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
    border-radius: 4px;
    border: 1px solid var(--unnamed, #409eff);
  }

  .unban:hover {
    border: 1px solid var(--unnamed, #409eff) !important;
  }

  // 分页样式
  .pagination {
    display: flex;
    justify-content: end;
    margin: 20px 24px 20px 0;
    padding-bottom: 20px;
    color: var(--60, rgba(255, 255, 255, 0.6));
  }
}

:deep() {

  // 表格内容hover内容颜色改变
  .el-table__body tr:hover>td.el-table__cell {
    background-color: #171a2f;
  }

  // 表格内容样式
  .el-table tr {
    background-color: #272b45;
    color: var(--100, #fff);
  }

  // 表格头部颜色样式
  .el-table {
    --el-table-border-color: 1px solid rgba(255, 255, 255, 0.2);
    --el-table-header-bg-color: var(--unnamed, #171a2f);
    --el-table-border: 1px solid rgba(255, 255, 255, 0.2);
    --el-table-row-hover-bg-color: none;
    --el-table-bg-color: #272b45;
  }

  // 表格边框
  .el-table__inner-wrapper {
    border: 1px solid;
    // border-bottom: none;
  }

  // 多选框颜色修改
  .el-checkbox__inner {
    background-color: #272b45;
    border-color: rgba(255, 255, 255, 0.4);
  }

  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #f35f1b;
    border-color: #f35f1b;
  }

  // 输入框颜色改变
  .el-input__wrapper {
    background-color: #272b45;
    box-shadow: none;
    border: none;
  }

  // 输入框内容颜色修改
  .el-input__inner {
    color: var(--100, #fff);
    
    font-size: 14px;
    font-style: normal;
    caret-color: var(--100, #fff);
  }

  // 至的颜色修改
  .el-date-editor .el-range-separator {
    color: var(--100, #fff);
    
    font-size: 12px;
    font-style: normal;
  }

  // 时间显示内容颜色修改
  .el-date-editor .el-range-input {
    color: var(--100, #fff);
    
    font-size: 12px;
    font-style: normal;
    caret-color: var(--100, #fff);
  }

  //
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #f35f1b;
    border-color: #f35f1b;
  }

  .el-checkbox__inner:hover {
    border-color: #f35f1b;
  }

  //操作颜色样式
  .el-table__body-wrapper tr td.el-table-fixed-column--right {
    background: #272b45;
  }

  .el-table.is-scrolling-left .el-table-fixed-column--right.is-first-column::before {
    box-shadow: none;
  }

  .el-form--inline .el-form-item {
    margin-right: 10px;
  }

  // label颜色
  .el-form-item__label {
    color: var(--100, #fff);
    text-align: right;
    
    font-size: 14px;
  }

  //分页
  .el-pagination__total,
  .el-pagination__jump {
    color: var(--60, rgba(255, 255, 255, 0.6));
    
    font-size: 14px;
  }
}
</style>

<!-- /* 下拉框背景颜色字体以及边框样式修改 */
<style>
.el-picker__popper {
  /* 整体边框去除 */
  --el-datepicker-border-color: none;
}
.el-select__popper.el-popper {
  /* 下拉框颜色样式修改 */
  background: var(--unnamed, #1d223c);
  border: 1px solid #1d223c;
}
.el-select-dropdown__item:hover {
  background: #171a2f;
}
.el-select-dropdown__item.selected {
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
}
.el-select {
  --el-select-border-color-hover: none;
  --el-select-input-focus-border-color: none;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  /* 鼠标移出颜色改变 */
  background-color: #171a2f;
}
.el-select-dropdown__item {
  /* 字体 */
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
  
  font-size: 14px;
  font-style: normal;
}
.el-popper.is-light .el-popper__arrow::before {
  /* 三角形背景颜色 */
  background: var(--unnamed, #1d223c);
  border: 1px solid #1d223c;
}
.el-picker-panel {
  /* 时间选择器字体颜色 */
  color: var(--60, rgba(255, 255, 255, 0.6));
  
  font-size: 12px;
  background: #171a2f;
}
.el-date-range-picker {
  /* 时间选择器字体颜色 */
  --el-datepicker-active-color: #171a2f;
  --el-datepicker-inrange-hover-bg-color: #272b45;
  --el-datepicker-inrange-bg-color: #272b45;
  --el-datepicker-inner-border-color: var(--el-disabled-border-color);
  --el-datepicker-hover-text-color: #fff;
  --el-datepicker-off-text-color: var(--20, rgba(255, 255, 255, 0.2));
}
.el-input__inner {
  /* 时间选择器第一排字体颜色 */
  color: var(--60, rgba(255, 255, 255, 0.6));
}
.el-input__wrapper {
  /* 时间选择器第一排背景颜色 */
  background: #171a2f;
  box-shadow: none;
  border: 1px solid #272b45;
}
.el-input.is-disabled .el-input__wrapper {
  background: #272b45;
  box-shadow: none;
  border: 1px solid #272b45;
}
.el-range-editor.el-input__wrapper:hover {
  box-shadow: none;
}
.el-picker-panel__footer {
  /* 时间选择器底部背景颜色 */
  background: #171a2f;
}
.el-button.is-text:not(.is-disabled):hover {
  background: #272b45;
}
.el-button.is-text {
  /* 底部清空按钮 */
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
  
  font-size: 14px;
  font-style: normal;
  border: 1px solid #272b45;
}

.el-button.is-plain {
  /* 底部确定按钮 */
  --el-button-hover-text-color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
  --el-button-hover-bg-color: #171a2f;
  border: 1px solid #272b45;
}
.el-button.is-disabled,
.el-button.is-disabled:hover {
  background-color: #171a2f;
}
.el-button {
  --el-button-bg-color: #171a2f;
  border-color: #272b45;
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
  
  font-size: 14px;
  font-style: normal;
}
.el-button:hover {
  background: #272b45;
}
.el-date-table th {
  /* 边框颜色修改 */
  border-bottom: 1px solid #272b45;
}
.el-date-range-picker__content.is-left {
  border-right: 1px solid #272b45;
}
.el-date-range-picker__time-header {
  border-bottom: 1px solid #272b45;
}
.el-picker-panel__footer {
  border-top: 1px solid #272b45;
}
.el-date-table td.today .el-date-table-cell__text {
  /* 默认日期时间颜色更改 */
  color: var(--el-datepicker-hover-text-color);
  font-weight: 400;
}
.el-input {
  /* 时间内部样式修改 */
  --el-input-hover-border-color: none;
  --el-input-clear-hover-color: none;
  --el-input-focus-border-color: none;
}
.el-date-range-picker__time-header {
  display: none;
}

</style> -->
