<template>
  <div class="distribute">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('report.registerDistribute')" name="1">
        <Distribute :activeName="activeName" v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('report.rechargeDistribute')" name="2">
        <Distribute :activeName="activeName" v-if="activeName==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Members-distribution">
import Distribute from "@/views/report/distribute/components/Distribute.vue";
import { ref } from "vue";

const activeName = ref('1');
</script>

<style lang="scss" scoped>
.distribute {
  padding: 20px;
}
</style>