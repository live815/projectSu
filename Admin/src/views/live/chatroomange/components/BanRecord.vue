<template>
  <div class="" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.mutestatus1')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('live.pleaseChose')"
          style="width: 240px"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('live.memberaccount1')" prop="userName">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Nickname1')" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.banType1')" prop="banType">
        <el-select
          v-model="queryParams.banType"
          clearable
          :placeholder="$t('live.pleaseChose')"
          style="width: 240px"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('live.MembeRegistrattime1')">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('live.begintime')"
          :end-placeholder="$t('live.endtime')"
          @change="handleChange"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
          v-hasPermi="['member:banLog:list']"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
        <div class="btn-box">
          <el-button icon="Refresh" @click="handleLeft">{{
            $t("live.Unlockbatches")
          }}</el-button>
        </div>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      :row-key="getRowKeys"
      @selection-change="handleSelectionChange"
      :empty-text="$t('member.noData')"
    >
      <el-table-column
        type="selection"
        width="55"
        :selectable="selectable"
        :reserve-selection="true"
      />
      <el-table-column
        :label="$t('live.mutestatus')"
        prop="status"
        align="center"
        width="120px"
      >
        <template #default="scope">
          <span v-if="scope.row.status == 0">{{ $t("live.liftban") }}</span>
          <span v-if="scope.row.status == 1">{{ $t("live.Banned") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.memberaccount')"
        prop="userName"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column
        :label="$t('live.Nickname')"
        prop="nickName"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column
        :label="$t('live.VIPleveal')"
        prop="vipLevel"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column
        :label="$t('live.MembeRegistrattime')"
        align="center"
        prop="regTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.regTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.bancontent')"
        prop="content"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column
        :label="$t('live.tip70')"
        prop="duration"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column
        :label="$t('live.banType')"
        prop="banType"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      >
        <template #default="scope">
          <div v-if="scope.row.banType == '1'">{{ $t("live.Systemban") }}</div>
          <div v-if="scope.row.banType == '2'">{{ $t("live.Manualban") }}</div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.mutetime')"
        align="center"
        prop="banTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.banTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Unlocktime')"
        align="center"
        prop="untieTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.untieTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Unbanoperator')"
        prop="untieBy"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />

      <el-table-column
        :label="$t('live.Operator')"
        prop="banBy"
        :show-overflow-tooltip="true"
        width="120px"
        align="center"
      />

      <el-table-column
        :label="$t('live.remake')"
        prop="stadtype"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column :label="$t('live.operate')" align="center" width="160px">
        <template #default="scope">
          <el-button
            v-if="scope.row.status == 1"
            size="small"
            type="success"
            @click="changeStatus(scope.row)"
            >{{ $t("live.Unban") }}</el-button
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
  </div>
</template>
<script setup>
import {
  getbanRecordList,
  editbanRecordList,
  leftbanRecordList,
} from "@/api/live/chatroomange.js";
import { defaultTime } from "@/utils/config";
import { onMounted } from "vue";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { formatCurrentTime } from "@/utils/config";
import i18n from "@/i18n";

const dateRange = ref([]);
const { proxy } = getCurrentInstance();

const showSearch = ref(true);
const user = useUserStore();
const options = [
  {
    value: "0",
    label: i18n.global.t("live.Dismissed"),
  },
  {
    value: "1",
    label: i18n.global.t("live.Banned"),
  },
];
const options2 = [
  {
    value: "1",
    label: i18n.global.t("live.Systemban"),
  },
  {
    value: "2",
    label: i18n.global.t("live.Manualban"),
  },
];
const id = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const untieByer = ref("");
const isFirstLoad = ref(true);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
});
const { queryParams, form } = toRefs(data);
onMounted(async() => {
  untieByer.value = user.name;
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
/** 查询角色列表 */
function getList() {
  loading.value = true;
  return getbanRecordList(queryParams.value)
    .then((response) => {
      tableData.value = response.records;
      total.value = response.total;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}
// 时间选择处理
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
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
  handleChange();
  handleQuery();
}
//状态开启和禁用
function changeStatus(row) {
  const now = new Date().getTime();
  editbanRecordList({
    id: row.id,
    status: row.status === 0 ? 1 : 0,
    untieBy: untieByer.value,
    untieTime: formatCurrentTime(),
  }).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("live.Unbansucess"));
    getList();
  });
}
// 批量选择
function handleSelectionChange(val) {
  id.value = [];
  val.map((item) => {
    id.value.push(Number(item.id));
  });
}
// 判断多选框
function selectable(row, index) {
  if (row.status == "0") {
    return false;
  } else {
    return true;
  }
}
// 切换分页时  记住select的状态
function getRowKeys(row) {
  return row.id;
}
// 批量解禁
function handleLeft() {
  if (id.value.length !== 0) {
    proxy.$modal
      .confirm(i18n.global.t("live.tip71"))
      .then(function () {
        return leftbanRecordList({ untieBy: untieByer.value, ids: id.value });
      })
      .then(() => {
        getList();
        proxy.$modal.msgSuccess(i18n.global.t("live.tip72"));
      })
      .catch(() => {});
  } else {
    ElMessage(i18n.global.t("live.tip73"));
  }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  white-space: pre-wrap;
}
.btn-box {
  margin-left: 14px;
  :deep(.el-button) {
    background-color: #234360;
    color: #fff;
  }
}
</style>
