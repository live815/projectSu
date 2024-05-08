<template>
  <div class="manage-currency-address">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="$t('member.vitualCurrencyAddress')" prop="addr" class="full-width">
            <el-input
              v-model="queryParams.addr"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('member.protocol')" prop="protocol" class="full-width">
            <el-input
              v-model="queryParams.protocol"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.addrStatus')" prop="status" class="full-width">
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in cardStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.userName')"
            prop="userName"
            class="full-width"
          >
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.lastUpdateBy')" prop="updateBy" class="full-width">
            <el-input
              v-model="queryParams.updateBy"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="$t('member.addTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              class="full-width"
              @change="handleChange"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="member-total">
          <el-form-item :label="$t('member.totalWithdrawAmount')" class="mr-0"></el-form-item>
          <el-form-item label="" prop="totalWdMin" class="width-30 mr-0">
            <el-input
              v-model="queryParams.totalWdMin"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
          <span class="mb-18">-</span>
          <el-form-item label="" prop="totalWdMax" class="width-30 mr-0">
            <el-input
              v-model="queryParams.totalWdMax"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button
            @click="add"
            class="add-btn"
            >{{ $t('member.add') }}</el-button
          >
          <el-button type="primary" @click="handleQuery" icon="Search">{{ $t('member.search') }}</el-button>
          <el-button @click="reset" icon="Refresh">{{ $t('member.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="bankManageList" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('member.currencyAddrNoQuote')"
        align="center"
        prop="addr"
        width="210"
      ></el-table-column>
      <el-table-column
        :label="$t('member.currencyTypeNoQuote')"
        align="center"
        width="160"
        prop="currency"
      ></el-table-column>
      <el-table-column
        :label="$t('member.protocolNoQuote')"
        align="center"
        width="160"
        prop="protocol"
      ></el-table-column>
      <el-table-column
        :label="$t('member.addrStatusNoQuote')"
        align="center"
        prop="status"
        width="110"
      >
        <template #default="scope">
          <div class="status-start" v-if="scope.row.status === 0">{{ $t('member.start') }}</div>
          <div class="status-disable" v-else>{{ $t('member.disable') }}</div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.userNameNoQuote')"
        align="center"
        prop="userName"
        width="160"
      >
      <template #default="{row}">
        <span>{{ row.userName?row.userName:"-" }}</span>
      </template>
    </el-table-column>
      <el-table-column
        :label="$t('member.vipLevelNoQuote')"
        align="center"
        prop="vipLevel"
      ></el-table-column>
      <el-table-column
        :label="$t('member.addTimeNoQuote')"
        align="center"
        prop="createTime"
        width="160"
      >
      <template #default="{ row }">
          <span>{{ row.createTime || "-" }}</span>
        </template>
    </el-table-column>
      <el-table-column
        :label="$t('member.lastWithdrawTime')"
        align="center"
        prop="lastWdTime"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row.lastWdTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.totalWithdrawAmountNoQuote')"
        align="center"
        prop="totalWd"
        width="120"
      >
      <template #default="{ row }">
          <span>{{ formatNumber(row.totalWd) }}</span>
        </template>
    </el-table-column>
      <el-table-column
        :label="$t('member.lastUpdateByNoQuote')"
        align="center"
        prop="updateBy"
        width="100"
      >
        <template #default="{ row }">
          <span>{{ row.updateBy || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.lastUpdateTimeNoQuote')"
        align="center"
        prop="updateTime"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row.updateTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center" width="200">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            v-if="scope.row.status === 0"
            @click="disableCard(scope.row)"
            >{{ $t('member.disabled') }}</el-button
          >
          <el-button
            size="small"
            type="success"
            v-else
            @click="startCard(scope.row)"
            >{{ $t('member.started') }}</el-button
          >
          <el-button
            size="small"
            type="warning"
            @click="delCard(scope.row)"
            >{{ $t('member.delete') }}</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="edit(scope.row)"
            v-if="false"
            >{{ $t('member.edit') }}</el-button
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
      style="height: 40px"
    />
    <StartDisable 
    v-model:openDia="openVirtualStartDialog" 
    v-if="openVirtualStartDialog" 
    :cardId="virtualId"
    :status="statusVirtual" 
    @onfreshstatus="getList" />
    <AddOrEditCardDia 
    v-model:open="openAddEditDialog" 
    v-if="openAddEditDialog"
    :id="cloneId"
    :type="type"
    @onrefresh="getList" />
    <DeleteCurrencyManageDia 
    v-model:openDelete="openDelete"
    v-if="openDelete"
    :delId="delId"
    @onfreshdelete="getList"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted, proxyRefs, ref } from "vue";
import StartDisable from "./StartDisableDialog.vue";
import AddOrEditCardDia from "./AddOrEditCardDia.vue";
import DeleteCurrencyManageDia from "./DeleteCurrencyManageDia.vue";
import { getCryptocyList } from "@/api/member/bankcard/index";
import { formatNumber } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  addr: null,
  protocol: null,
  accountAddr: null,
  cardType: null,
  status: null,
  updateBy: null,
  userName: null,
  totalWdMin: null,
  totalWdMax: null,
  pageNum: 1,
  pageSize: 10,
});
const dateRange = ref([]);
const cardStatusList = ref([
  { label: i18n.global.t("member.start"), value: 0 },
  { label: i18n.global.t("member.disable"), value: 1 },
]);
const bankManageList = ref([]);
const total = ref(0);
const openVirtualStartDialog = ref(false);
const openAddEditDialog = ref(false);
const type = ref(null)
const cloneId = ref(null)
const statusVirtual = ref(null)
const virtualId = ref(null)
const openDelete = ref(null);
const delId = ref(null);
const isFirstLoad = ref(true);

function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}

onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
});
const getList = () => {
  return getCryptocyList(queryParams.value).then((res) => {
    bankManageList.value = res.rows || [];
    total.value = res.total || 0;
  });
};
const add = () => {
  type.value = 'add'
  openAddEditDialog.value = true
};
const edit = (row) => {
  type.value = 'edit'
  cloneId.value = row.id
  openAddEditDialog.value = true
};
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const reset = () => {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
};
const disableCard = (row) => {
  openVirtualStartDialog.value = true;
  statusVirtual.value = row.status
  virtualId.value = row.id
};
const startCard = (row) => {
  openVirtualStartDialog.value = true;
  statusVirtual.value = row.status
  virtualId.value = row.id
};
const delCard = (row) => {
  delId.value = row.id
  openDelete.value = true
};
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.manage-currency-address {
  .mr-0 {
    margin-right: 0;
  }
  .member-total {
    display: flex;
    align-items: center;
  }
  .add-btn {
    background: #a10000;
    color: #ffffff;
  }
  .status-start {
    width: 80px;
    height: 30px;
    border: 1px solid rgba(82, 196, 26, 0.5);
    text-align: center;
    margin: 0 auto;
    line-height: 30px;
    color: rgba(82, 196, 26, 0.5);
  }
  .status-disable {
    width: 80px;
    height: 30px;
    border: 1px solid rgba(235, 143, 145, 0.5);
    text-align: center;
    margin: 0 auto;
    line-height: 30px;
    color: rgba(235, 143, 145, 0.5);
  }
}
</style>
