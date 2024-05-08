<template>
  <div class="phone-manage">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('member.DistributionTime') + '：'">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('member.beginTime')"
          :end-placeholder="$t('member.endTime')"
          style="width: 365px"
          @change="handleChange"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('member.invitor')" prop="inviteName">
        <el-input
          v-model="queryParams.inviteName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 235px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('member.invitedMember') + '：'" prop="subName">
        <el-input
          v-model="queryParams.subName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 235px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('member.gamePlatform')+ '：'" prop="lobbyCode">
        <el-input
          v-model="queryParams.lobbyCode"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 235px"
        ></el-input>
      </el-form-item>
      <el-form-item class="primary-button">
        <el-button type="primary" @click="handleQuery">{{
          $t("member.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery(queryRef)">{{ $t("risk.reset") }} </el-button>
        <el-button type="primary" icon="download"
          >{{ $t("risk.export") }}
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column
        :label="$t('member.DistributionTime')"
        align="center"
        prop="grantTime"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row['grantTime'] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.DistributionMoney')"
        align="center"
        prop="grantAward"
      >
        <template #default="{ row }">
          <span>{{ row['grantAward'] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.CorrespondingFunctions')"
        align="center"
        prop="cycleTime"
      >
        <template #default="{ row }">
          <span>{{ row['cycleTime'] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitor')"
        align="center"
        prop="inviteName"
      >
        <template #default="{ row }">
          <span>{{ row['inviteName'] ||  "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitedMember')"
        align="center"
        prop="subName"
      >
        <template #default="{ row }">
          <span>{{ row['subName'] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.gamePlatform')"
        align="center"
        prop="lobbyName"
      >
        <template #default="{ row }">
          <span>{{ row['lobbyName'] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.turnoverPercent')"
        align="center"
        prop="betPer"
      >
        <template #default="{ row }">
          <span>{{ row['betPer'] ||  "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
          :label="$t('member.turnoverTotal')"
          align="center"
          prop="betAmount"
      >
        <template #default="{ row }">
          <span>{{ row['betAmount'] || "-" }}</span>
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
import { getCurrentInstance, onMounted, ref } from "vue";
// import i18n from "@/i18n";
import {
  queryBetAwardList,
} from "@/api/member/invite/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const loading = ref(false);
const dateRange = ref([]);

const queryParams = ref({
  dateRange: null,
  inviteName: null,
  subName: null,
  lobbyCode: null,
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const tableData = ref([]);


onMounted(async () => {
  await getList();
});

const getList = () => {
  loading.value = true;
  return queryBetAwardList(queryParams.value).then((res) => {
    loading.value = false;
    tableData.value = res?.["rows"] || [];
    total.value = res?.["total"] || 0;
  });
}

const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

const resetQuery = (queryRef) => {
  if (!queryRef) return;
  reset(queryRef);
  dateRange.value = [];
  handleChange();
  getList();
};

const reset = (queryRef) => {
  queryRef.resetFields();
};

// 选择时间
const handleChange = () => {
  if (
      (dateRange.value && !dateRange.value.length) ||
      dateRange.value === null
  ) {
    queryParams.value.grantTimeStart = null;
    queryParams.value.grantTimeEnd = null;
  } else {
    queryParams.value.grantTimeStart = dateRange.value[0];
    queryParams.value.grantTimeEnd = dateRange.value[1];
  }
};
</script>

<style scoped>
.phone-manage {
  padding: 20px;
}
</style>
