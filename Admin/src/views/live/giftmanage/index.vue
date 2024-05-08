<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('live.giftmanage')" name="1">
        <GiftConfigut v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('live.giftproceed')" name="2">
        <GiftIncome v-if="activeName == '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Giftmanage">
import { ref } from "vue";
import GiftConfigut from "./components/GiftConfigut.vue";
import GiftIncome from "./components/GiftIncome.vue";

const activeName = ref("1");
const handleClick = (tab, event) => {
  activeName.value = toRaw(toRaw(tab).props).name;
};
</script>

<style lang="scss"></style>
