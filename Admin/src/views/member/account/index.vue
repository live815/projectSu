<template>
  <div class="member-account-change">
    <!-- 会员账户修改审核 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.firstNoReview')" name="1">
        <FirstReview v-if="activeName === '1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.secondNoReview')" name="2">
        <SecondReview v-if="activeName === '2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.overOrderCheck')" name="3">
        <OverOrderCheck v-if="activeName === '3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Account">
import i18n from "@/i18n";
import { onMounted, ref } from "vue";
import FirstReview from "./components/FirstReview.vue";
import SecondReview from "./components/SecondReview.vue";
import OverOrderCheck from "./components/OverOrderCheck.vue";

const activeName = ref("1");
</script>

<style lang="scss" scoped>
.member-account-change {
  padding: 20px;
}
</style>
