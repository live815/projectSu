<template>
  <div class="" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.sanchor')" prop="eventid">
        <el-input
          v-model="queryParams.eventid"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Livebroadcastroomtype')" prop="">
        <el-select
          v-model="value1"
          multiple
          :placeholder="$t('live.pleaseChose')"
          clearable
          collapse-tags
          collapse-tags-tooltip
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('live.Livebroadcastroomname')" prop="gamename">
        <el-input
          v-model="queryParams.gamename"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Associatleagues')" prop="eventid">
        <el-input
          v-model="queryParams.eventid"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Relatcompetit')" prop="IP">
        <el-input
          v-model="queryParams.IP"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Livestatus')" prop="">
        <el-select
          v-model="value2"
          multiple
          :placeholder="$t('live.pleaseChose')"
          clearable
          collapse-tags
          collapse-tags-tooltip
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('live.Starttime')" prop="">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('live.begintime')"
          :end-placeholder="$t('live.endtime')"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("live.Inquire")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
        <el-button type="primary" icon="Search" @click="">{{
          $t("live.addSatellitebroad")
        }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData">
      <el-table-column
        :label="$t('live.sserialNumber')"
        prop="moduleorder"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.Livestatus')"
        prop="status"
        align="center"
      >
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Weights')"
        prop=""
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.Livebroadcastroomtype')"
        prop="operator"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />

      <el-table-column
        :label="$t('live.Associatleagues')"
        align="center"
        prop=""
      >
      </el-table-column>

      <el-table-column
        :label="$t('live.Relatcompetit')"
        prop="stadgname"
        align="center"
      />
      <el-table-column
        :label="$t('live.Starttime')"
        align="center"
        prop="operatorTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.operatorTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.enteringNumber')"
        prop="stadgname"
        align="center"
      />
      <el-table-column
        :label="$t('live.viewNumber')"
        prop="stadgname"
        align="center"
      />
      <el-table-column :label="$t('live.operate')" align="center" width="260">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['']"
              @click="changeStatus(scope.row)"
              >{{ $t("live.Forcdownload") }}</el-button
            >
            <el-button
              size="small"
              type="success"
              v-hasPermi="['']"
              @click="changeStatus(scope.row)"
              >{{ $t("live.Changeweight") }}</el-button
            >
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
  </div>
</template>
<script setup name="">
import { getEndStreamList } from "@/api/live/stream.js";
import { defaultTime } from "@/utils/config";
import i18n from "@/i18n";
const dateRange = ref([]);
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const showSearch = ref(true);

const value1 = ref([]);
const value2 = ref([]);

const options2 = [
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
];

const tableData = ref([
  {
    moduleorder: "255",
    stadgname: "20",
    stadtype: i18n.global.t("live.sport"),

    activelabel: i18n.global.t("live.tip63"),
    activetext: i18n.global.t("live.tip64"),
    operator: "Yifeng",
    operatorTime: "2023-07-08 17:01:53",
    status: "0",
  },
]);
const total = ref(0);
const loading = ref(false);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
});
const { queryParams } = toRefs(data);

/** 查询角色列表 */
function getList() {
  loading.value = true;
  getEndStreamList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false;
    });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  dateRange.value = [];
  handleChange();
  handleQuery();
}
// 时间选择处理
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.startTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.startTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  white-space: pre-wrap;
}
</style>
