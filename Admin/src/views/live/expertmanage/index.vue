<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('live.Expertlist')" name="1">
        <ExpertList v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('live.Breaknewsplan')" name="2">
        <BreaknewPlan v-if="activeName == '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Expertmanage">
import { ref } from "vue";
import BreaknewPlan from "./BreaknewPlan/index.vue";
import ExpertList from "./ExpertList/index.vue";

const activeName = ref("1");
const handleClick = (tab, event) => {
  activeName.value = toRaw(toRaw(tab).props).name;
};
</script>

<style lang="scss"></style>
