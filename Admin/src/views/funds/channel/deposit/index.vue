<!-- 入款通道设置 -->
<template>
  <div class="funds-channel-deposit-index" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('funds.storeName')" prop="mchId" class="full-width">
            <el-select
              v-model="queryParams.mchId"
              :placeholder="$t('funds.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in storeList"
                :key="dict.mchId"
                :label="dict.mchName"
                :value="dict.mchId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('funds.channelType')"
            prop="channelTypeId"
            class="full-width"
            clearable
          >
            <el-select
              v-model="queryParams.channelTypeId"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in channelTypelList"
                :key="dict.id"
                :label="dict.channelName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.channelStatus')" prop="status" class="full-width">
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in rechargeTypeList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t("funds.search") }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t("funds.reset") }}</el-button>
            <el-button
              @click="handleAdd"
              class="download-btn"
              v-hasPermi="['fund:mch-channel:add']"
              >{{ $t("funds.add") }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('funds.add')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.handle')" width="80" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="openEditDia(row)"
            v-hasPermi="['fund:mch-channel:query']"
            >{{  $t('funds.edit')}}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.storeNameNoquote')"
        prop="mchName"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.channelTypeNoquote')"
        prop="channelTypeName"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.channelCodeNoQuote')"
        prop="mchChannelCode"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.channelLimitAmountNoQuote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.minPay ? row.minPay : "-" }}</span>
          <span>~</span>
          <span>{{ row.maxPay ? row.maxPay : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.weightsNoQuote')"
        prop="weights"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.applicationSideNoQuote')"
        prop="scopeName"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.channelStatusNoQuote')"
        prop="status"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            active-value="0"
            inactive-value="1"
            @click="changeStatus(row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.remark')"
        prop="remark"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.createInformation')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <div>{{ row.createBy ? row.createBy : "-" }}</div>
          <div>{{ row.createTime ? row.createTime : "-" }}</div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.lastUpdateInformation')"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <div>{{ row.updateBy ? row.updateBy : "-" }}</div>
          <div>{{ row.updateTime ? row.updateTime : "-" }}</div>
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
    <AddOrEditDepositDia
      v-model:open="open"
      :cloneId="cloneId"
      :list="fund_dp_channel_scope"
      :storeList="storeList"
      :type="type"
      v-if="open"
      @onrefresh="getList"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import {
  getListByPage,
  getOptionsList,
  getSelectAll,
  changeChannelStatus,
} from "@/api/funds/channel/index";
import AddOrEditDepositDia from "./components/AddOrEditDepositDia.vue";

const { proxy } = getCurrentInstance();
const { fund_dp_channel_scope } = proxy.useDict("fund_dp_channel_scope");
const queryRef = ref(null);
const queryParams = ref({
  mchId: null,
  channelTypeId: null,
  status: null,
  pageNum: 1,
  pageSize: 10,
});
const storeList = ref([]);
const channelTypelList = ref([]);
const rechargeTypeList = ref([
  {
    label: i18n.global.t("funds.normal"),
    value: 0,
  },
  {
    label: i18n.global.t("funds.stopUsing"),
    value: 1,
  },
]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const type = ref(null);
const cloneId = ref(null);
const isFirstLoad = ref(true);

onMounted(async () => {
  await qeuryChannelType();
  await queryOptionsList();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
async function qeuryChannelType() {
  return getSelectAll().then((res) => {
    channelTypelList.value = res || [];
  });
}
async function queryOptionsList() {
  return getOptionsList().then((res) => {
    storeList.value = res || [];
  });
}
async function getList() {
  loading.value = true;
  return getListByPage(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      tableData.value.forEach((item) => {
        if (item.scope) {
          const strArray = item.scope.split(",");
          // 使用 map() 方法将每个值映射为相应的 label，并使用 join() 方法将它们连接成新的字符串
          item.scopeName = strArray
            .map((value) => {
              const matchingItem = fund_dp_channel_scope.value.find(
                (item) => item.value === value
              );
              return matchingItem ? matchingItem.label : value;
            })
            .join(",");
        }
      });
      total.value = res.total;
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false;
    });
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
}
function changeStatus(row) {
  proxy.$modal
    .confirms(i18n.global.t("funds.areYouSureToUpdateSwicthStatus"), i18n.global.t("funds.tip"))
    .then(() => {
      changeChannelStatus({
        mchChannelId: row.mchChannelId,
        status: row.status,
      }).then((res) => {
        getList();
        proxy.$modal.msgSuccess(i18n.global.t("funds.updateStatusSuccessfully"));
      });
    })
    .catch(() => {
      row.status = row.status === "0" ? "1" : "0";
    });
}
function handleAdd() {
  cloneId.value = null;
  type.value = "add";
  open.value = true;
}
function openEditDia(row) {
  cloneId.value = row.mchChannelId;
  type.value = "edit";
  open.value = true;
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-channel-deposit-index {
  padding: 20px;
  padding-bottom: 10px;
  .download-btn {
    background: #f59a23;
    color: #fff;
  }
}
</style>
