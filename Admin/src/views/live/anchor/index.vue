<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('live.Anchorlist')" name="1">
        <AnchorList v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('live.Supermanagedaccount')" name="2">
        <SuperAccount v-if="activeName == '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Anchor">
import { ref, toRaw } from "vue";
import AnchorList from "./components/AnchorList.vue";
import SuperAccount from "./components/SuperAccount.vue";

const activeName = ref("1");

</script>

<style lang="scss"></style>
