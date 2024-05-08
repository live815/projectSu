<template>
  <div class="funds-record-exception">
    <!-- 充值异常记录 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.exceptionRecord')" name="1">
        <ExceptionRecord
          :channelTypeIdList="channelTypeIdList"
          :rechargeTypeList="rechargeTypeList"
          v-if="activeName==='1'"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.exceptionConfig')" name="2">
        <ExceptionConfig
          :channelTypeIdList="channelTypeIdList"
          :rechargeTypeList="rechargeTypeList"
          v-if="activeName==='2'"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Exception-record-cofig">
import { getChannelList, getDpMchinfoList } from "@/api/funds/common";
import ExceptionRecord from "./components/ExceptionRecord.vue";
import ExceptionConfig from "./components/ExceptionConfig.vue";
import { onMounted } from "vue";
const activeName = ref("1");
const channelTypeIdList = ref([]);
const rechargeTypeList = ref([]);

onMounted(async () => {
  await queryChannelList();
  await queryDpMchinfoList();
});
function queryDpMchinfoList() {
  return getDpMchinfoList().then((res) => {
    rechargeTypeList.value = res || [];
  });
}
function queryChannelList() {
  return getChannelList().then((res) => {
    channelTypeIdList.value = res || [];
  });
}
</script>

<style lang="scss" scoped>
.funds-record-exception {
  padding: 20px 20px 10px;
}
</style>
