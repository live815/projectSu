<template>
  <div class="member-running-detail">
    <!-- 流水校验列表 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.turnoverValidList')" name="1"> 
        <UnvalidateList v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.turnoverValidedList')" name="2"> 
        <ValidateList v-if="activeName==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Running-details">
import UnvalidateList from "./componnts/UnvalidateList.vue";
import ValidateList from "./componnts/ValidateList.vue";

const activeName = ref("1");
</script>

<style lang="scss" scoped>
.member-running-detail {
  padding: 20px;
  padding-bottom: 10px;
}
</style>
