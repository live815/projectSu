<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.helpCenterContent')" name="1">
        <CentralContent v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.questionCategory')" name="2">
        <QuestionType v-if="activeName == 2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import CentralContent from "./components/CentralContent.vue";
import QuestionType from "./components/QuestionType.vue";

const activeName = ref("1");
</script>

<style lang="scss" scoped>
.member-manage-friend {
  padding: 20px;
}
</style>
