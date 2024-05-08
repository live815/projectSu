<template>
  <div class="app-container">
    <el-form :model="form" :inline="true">
      <el-form-item label="账号类型">
        <el-select v-model="form.memberType" style="width: 150px">
          <el-option
            v-for="item in accountTypes(i18n)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="会员账号">
        <el-input v-model="form.memberUserName" style="width: 150px" />
      </el-form-item>
      <el-form-item label="派奖状态">
        <el-select v-model="form.status" style="width: 150px">
          <el-option
            v-for="item in receiveStatus(i18n)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Vip等级">
        <el-input v-model="form.memberVipLevel" style="width: 150px" />
      </el-form-item>
      <el-form-item label="活动类别">
        <el-select v-model="form.giveType" style="width: 150px">
          <el-option label="全部" value="" />
          <el-option label="存款-主题抽奖" :value="1" />
          <el-option label="投注-主题抽奖" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="奖品类型">
        <el-select v-model="form.giftType" style="width: 150px">
          <el-option
            v-for="item in prizeType(i18n)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="获取方式">
        <el-select v-model="form.getType" style="width: 150px">
          <el-option label="全部" value="" />
          <el-option label="必中获得" :value="1" />
          <el-option label="概率获得" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="抽奖时间" prop="createTime">
        <el-date-picker
          v-model="drawTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动上架时间" prop="createTime">
        <el-date-picker
          v-model="eventLaunchTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动进行时间" prop="createTime">
        <el-date-picker
          v-model="activityTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="search">{{
          $t("operation.search")
        }}</el-button>
        <el-button icon="Refresh" @click="reset">{{
          $t("operation.reset")
        }}</el-button>
        <el-button
          @click="handleExport"
          icon="download"
          v-hasPermi="['deposit:order:export']"
          type="primary"
          >{{ $t("funds.export") }}</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="memberUserName" label="会员账号" />
      <el-table-column prop="turntableTime" label="抽奖时间" width="170" />
      <el-table-column prop="memberVipLevel" label="Vip等级" />
      <el-table-column label="活动类型">
        <template #default="scope">
          <span>{{ scope.row.giveType === 1 ? "投注" : "存款" }}-主题抽奖</span>
        </template>
      </el-table-column>
      <el-table-column prop="onTime" label="活动上架时间" width="170" />
      <el-table-column prop="startTime" label="活动进行时间" width="170" />
      <el-table-column label="获取方式">
        <template #default="scope">
          <span>{{ scope.row.getType === 1 ? "概率" : "必中" }}-主题抽奖</span>
        </template>
      </el-table-column>
      <el-table-column label="奖品类型">
        <template #default="scope">
          <span>{{ findLabelByValue(scope.row.giftType) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="giftAmount" label="抽中奖品" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <span>{{ findStatusText(scope.row.status) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="form.pageNum"
      v-model:limit="form.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup>
import {
  defaultTime,
  shortcuts,
  accountTypes,
  receiveStatus,
  prizeType,
} from "@/utils/config";
import {
  getTurntableRecordList,
} from "@/api/operation/activeConfiguration.js";
import i18n from "@/i18n";
import { useRoute } from "vue-router";
import { deepCopy } from "@/utils";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const route = useRoute();
const drawTime = ref([]);
const eventLaunchTime = ref([]);
const activityTime = ref([]);
const total = ref(5);
const tableData = ref([]);
const form = ref({
  memberType: "",
  activityId: route.query.id,
  getType: "",
  giftType: "",
  giveType: "",
  memberUserName: "",
  memberVipLevel: "",
  onCreateTimeStart: eventLaunchTime.value[0] || "",
  onCreateTimeEnd: eventLaunchTime.value[1] || "",
  startTime: activityTime.value[0] || "",
  endTime: activityTime.value[1] || "",
  status: "",
  tenantId: "",
  turntableTimeStart: drawTime.value[0] || "",
  turntableTimeEnd: drawTime.value[1] || "",
  type: "",
  pageNum: 1,
  pageSize: 10,
});

const init = async () => {
  const res = await getTurntableRecordList(form.value);
  tableData.value = res.rows;
  total.value = res.total;
};

init();

// 获取奖品类型
const findLabelByValue = (valueToFind) => {
  for (let i = 0; i < prizeType(i18n).length; i++) {
    if (prizeType(i18n)[i].value === valueToFind) {
      return prizeType(i18n)[i].label;
    }
  }
  return "";
};

// 获取状态
const findStatusText = (valueToFind) => {
  for (let i = 0; i < receiveStatus(i18n).length; i++) {
    if (receiveStatus(i18n)[i].value === valueToFind) {
      return receiveStatus(i18n)[i].label;
    }
  }
  return "";
};

const search = async () => {
  form.value.turntableTimeStart = drawTime.value[0];
  form.value.turntableTimeEnd = drawTime.value[1];
  form.value.onCreateTimeStart = eventLaunchTime.value[0];
  form.value.onCreateTimeEnd = eventLaunchTime.value[1];
  form.value.startTime = activityTime.value[0];
  form.value.endTime = activityTime.value[1];

  const res = await getTurntableRecordList(form.value);
  tableData.value = res.rows;
  total.value = res.total
};

const reset = () => {
  form.value = { activityId: route.query.id, pageNum: 1, pageSize: 10 };
  drawTime.value = [];
  eventLaunchTime.value = [];
  activityTime.value = [];
  init();
};

//分页
const getList = async () => {
  const res = await getTurntableRecordList(form.value);
  tableData.value = res.rows || [];
  total.value = res.total;
};

const handleExport = () => {
  proxy.download(
    "/system/activity/reward/record/turntable/export",
    form.value,
    `大转盘获奖记录${new Date().toDateString()}.xlsx`
  );
};
</script>

<style>
</style>