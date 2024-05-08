<template>
  <div class="member-detail-profit-analysis">
    <el-tabs v-model="activeProfitInfo" type="card" class="demo-tabs">
      <!-- <el-tab-pane :label="$t('member.sameDeviceNoQuery')" name="1">
        <DeviceQuery
          :activeName="activeName"
          :activeProfitInfo="activeProfitInfo"
          :userName="userName"
        />
      </el-tab-pane> -->
      <el-tab-pane :label="$t('member.sameIPAddressQuery')" name="2">
        <IpQuery
          :activeName="activeName"
          :activeProfitInfo="activeProfitInfo"
          :userName="userName"
        />
      </el-tab-pane>
      <!-- <el-tab-pane :label="$t('member.recentlyAction')" name="3">
        <RecentBehavior
          :activeName="activeName"
          :activeProfitInfo="activeProfitInfo"
          :userName="userName"
        />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script setup>
import DeviceQuery from "./profitanalysis/DeviceQuery.vue";
import IpQuery from "./profitanalysis/IpQuery.vue";
import RecentBehavior from "./profitanalysis/RecentBehavior.vue";
import { watch } from "vue";

const props = defineProps(["activeName", "userName"]);
const activeProfitInfo = ref("2");
</script>

<style lang="scss" scoped>
.member-detail-profit-analysis {
  :deep() {
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      color: #fff;
      background: #383838;
    }
    .el-tabs__header {
      display: flex;
      justify-content: space-between;
    }

    .el-tabs__item {
      flex: 1;
      text-align: center;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      margin-right: 10px; /* 通过调整这个值来设置选项卡之间的间距 */
    }
    .el-tabs--card > .el-tabs__header {
      border-bottom: none;
      .el-tabs__nav {
        border: none;
      }
    }
  }
}
</style>
