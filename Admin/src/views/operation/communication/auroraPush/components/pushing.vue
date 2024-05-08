<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.Notificattitle')" prop="noticeTitle">
        <el-input
          v-model="queryParams.noticeTitle"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.pushstaff')" prop="pushStaff">
        <el-input
          v-model="queryParams.pushStaff"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.founder')" prop="creator">
        <el-input
          v-model="queryParams.creator"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.Pushevents1')" prop="pushEvents">
        <el-select
          v-model="queryParams.pushEvents"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in pushEvent"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.Pushtype')" prop="pushType">
        <el-select
          v-model="queryParams.pushType"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in pushTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.pushstatus1')" prop="pushStatus">
        <el-select
          v-model="queryParams.pushStatus"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in pushStatu"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.pushTime')" prop="pushTime">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("operation.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("operation.reset")
        }}</el-button>
        <el-button icon="Plus" type="warning">{{
          $t("operation.add")
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格内容 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="creationTime"
        :label="$t('operation.creattime')"
        sortable
        width="180"
      />
      <el-table-column
        prop="pushTime"
        :label="$t('operation.pushTime')"
        sortable
        width="180"
      />
      <el-table-column
        prop="pushEvents"
        :label="$t('operation.Pushevents')"
        width="180"
      />
      <el-table-column
        prop="pushType"
        :label="$t('operation.Pushtype')"
        width="180"
      />
      <el-table-column
        prop="pushStatus"
        :label="$t('operation.pushstatus')"
        width="180"
      />
      <el-table-column
        prop="noticeTitle"
        :label="$t('operation.Notificattitle')"
        width="180"
      />
      <el-table-column
        prop="jumpType"
        :label="$t('operation.Jumptype')"
        width="180"
      />
      <el-table-column
        prop="jumpParameters"
        :label="$t('operation.Jumpparameter')"
        width="180"
      />
      <el-table-column
        prop="noticeContent"
        :label="$t('operation.Notificatcontent')"
        width="180"
      />
      <el-table-column
        prop="accountType"
        :label="$t('operation.accounttype1')"
        width="180"
      />
      <el-table-column
        prop="pushCrowd"
        :label="$t('operation.pushcrowd')"
        width="180"
      />
      <el-table-column
        prop="validLevel"
        :label="$t('operation.tip28')"
        width="180"
      />
      <el-table-column
        prop="founder"
        :label="$t('operation.founder')"
        width="180"
      />
      <el-table-column
        prop="manipulate"
        :label="$t('operation.operate')"
        width="180"
      />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { defaultTime, shortcuts } from "@/utils/config";
import i18n from "@/i18n";

const queryParams = ref({
  noticeTitle: "",
  pushStaff: "",
  creator: "",
  pushEvents: "",
  pushType: "",
  pushStatus: "",
  pageNum: 1,
  pageSize: 10,
});
const total = ref(5);
const getList = () => {};
const dateRange = ref([]);

const pushEvent = [
  {
    value: 0,
    label: i18n.global.t("operation.all"),
  },
  {
    value: 1,
    label: i18n.global.t("operation.Fullend"),
  },
  {
    value: 2,
    label: i18n.global.t("operation.tip29"),
  },
  {
    value: 3,
    label: i18n.global.t("operation.tip30"),
  },
];
const pushTypes = [
  {
    value: 0,
    label: i18n.global.t("operation.all"),
  },
  {
    value: 1,
    label: i18n.global.t("operation.Fullend"),
  },
  {
    value: 2,
    label: i18n.global.t("operation.tip29"),
  },
  {
    value: 3,
    label: i18n.global.t("operation.tip30"),
  },
];
const pushStatu = [
  {
    value: 0,
    label: i18n.global.t("operation.all"),
  },
  {
    value: 1,
    label: i18n.global.t("operation.Fullend"),
  },
  {
    value: 2,
    label: i18n.global.t("operation.tip29"),
  },
  {
    value: 3,
    label: i18n.global.t("operation.tip30"),
  },
];

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  // proxy.resetForm("queryRef");
  // resetQuery();
}

const tableData = [];
</script>

<style scoped></style>
