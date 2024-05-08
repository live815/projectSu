<template>
  <div class="" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.memberaccount1')" prop="memberName">
        <el-input
          v-model="queryParams.memberName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.tip1012')" prop="sensitiveWord">
        <el-input
          v-model="queryParams.sensitiveWord"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.tip1022')">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('live.begintime')"
          :end-placeholder="$t('live.endtime')"
          :default-time="defaultTime"
          @change="handleChange"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
          v-hasPermi="['shielded:log:list']"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.serialNumber')"
        prop="serialNumber"
        :show-overflow-tooltip="true"
        align="center"
        width="80"
      />

      <el-table-column
        :label="$t('live.memberaccount')"
        prop="memberName"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.Speechcontent')"
        prop="speakContent"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.tip101')"
        prop="sensitiveWord"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.changeContent')"
        prop="shieldedContent"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.speaktime')"
        align="center"
        prop="speakTime"
      >
        <template #default="scope">
          <span>{{ scope.row.speakTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('live.Operator')"
        prop="createBy"
        :show-overflow-tooltip="true"
        width=""
        align="center"
      />
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
import { getSensitList } from "@/api/live/chatroomange";
import { defaultTime } from "@/utils/config";

const dateRange = ref([]);
const { proxy } = getCurrentInstance();
const showSearch = ref(true);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const isFirstLoad = ref(true);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
});
const { queryParams } = toRefs(data);

onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
function getList() {
  loading.value = true;
  return getSensitList(queryParams.value)
    .then((response) => {
      tableData.value = response.rows;
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
    console.log(dateRange.value, "dateRange.value");
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
</style>
