<template>
  <div class="player-limit">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="$t('member.timeRange')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChange"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('member.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('member.phoneNumber')" prop="mobile" class="full-width">
            <el-input
              v-model="queryParams.mobile"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="IP:" prop="ip" class="full-width">
            <el-input
              v-model="queryParams.ip"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('member.deviceNoQuote')" prop="deviceNo" class="full-width">
            <el-input
              v-model="queryParams.deviceNo"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('member.statusQuote')" prop="status" class="full-width">
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('member.type')" prop="type" class="full-width">
            <el-select
              v-model="queryParams.type"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="mb-18">
      <el-button
        type="primary"
        icon="Search"
        @click="handleQuery"
        >{{ $t('member.search') }}</el-button
      >
      <el-button  icon="Refresh" @click="reset">{{ $t('member.reset') }}</el-button>
      <el-button
        icon="download"
        @click="handleExport"
        class="exoport-btn"
        >{{ $t('member.export') }}</el-button
      >
      <el-button type="primary" @click="MultiBlock" :disabled="!multi.length||isLimit">{{ $t('member.batchBlackOpen') }}</el-button>
    </el-row>
    <el-table :data="playerLimitList" @selection-change="handleSelectionChange" :empty-text="$t('member.noData')">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column :label="$t('member.userNameNoQuote')" align="center" prop="userName" width="200">
      </el-table-column>
      <el-table-column :label="$t('member.phoneNumberNoQuote')" align="center" prop="mobile" width="150">
        <template #default="{ row }">
          <span>{{ row.mobile ? row.mobile : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.limitType')" align="center" prop="type" width="200">
        <template #default="{ row }">
          <span>{{ filterLabel(typeList,row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP" align="center" prop="ip" width="150">
        <template #default="{ row }">
          <span>{{ row.ip ? row.ip : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.deviceNo')" align="center" prop="deviceNo" width="200">
        <template #default="{ row }">
          <span>{{ row.deviceNo ? row.deviceNo : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.triggerTime')" align="center" prop="blockTime" width="200">
        <template #default="{ row }">
          <span>{{ row.blockTime ? row.blockTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.releaseTime')" align="center" prop="unblockTime" width="200">
        <template #default="{ row }">
          <span>{{ row.unblockTime ? row.unblockTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.status')" align="center" prop="status">
        <template #default="scope">
          <span>{{ filterLabel(statusList,scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.releasePerson')" align="center" prop="unblockBy" width="150">
        <template #default="{ row }">
          <span>{{ row.unblockBy ? row.unblockBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center">
        <template #default="scope">
          <el-button
            link
            v-if="scope.row.status === 0"
            @click="updateStatus(scope.row)"
            >{{$t('member.releaseLimit')}}</el-button
          >
          <span v-else>-</span>
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
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { onMounted, ref } from "vue";
import { getBlockLogList, updateBlockLogStatus,updateBlockLogStatusBatch } from "@/api/member/list/index";
import { filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();

const queryRef = ref(null);
const queryParams = ref({
  userName: null,
  mobile: null,
  ip: null,
  deviceNo: null,
  status: null,
  type: null,
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const statusList = ref([
  { label: i18n.global.t("member.limiting"), value: 0 },
  { label: i18n.global.t("member.released"), value: 1 },
]);
const typeList = ref([
  { label: i18n.global.t("member.phoneNumberCheckLoginFrequecy"), value: 1 },
  { label: i18n.global.t("member.QRCodeFindPasswordFrequecy"), value: 2 },
]);
const dateRange = ref([]);
const multi = ref([]); //批量选中的数据
const isLimit = ref(false);
const playerLimitList = ref([]);
const isFirstLoad = ref(true);

onMounted(async() => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
const getList = () => {
  return getBlockLogList(queryParams.value).then((res) => {
    playerLimitList.value = res.rows||[];
    total.value = res.total||0;
  });
};
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
// 选择时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
const handleExport = () => {
  console.log("导出");
  // proxy.download(
  //   "system/user/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `玩家限制_${new Date().toLocaleDateString()}.xlsx`
  // );
};
const reset = () => {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
};
function updateStatus(row) {
  updateBlockLogStatus(row.id).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
    getList();
  });
}
function MultiBlock(){
  updateBlockLogStatusBatch(multi.value).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
    getList();
  })
}
function handleSelectionChange(selection){
  multi.value = selection.map(item=>item.id)
  isLimit.value =  selection.some(item=>item.status === 1)
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.player-limit {
  height: 100%;
}
</style>
