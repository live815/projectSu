<template>
  <div class="basic-info-register-info">
    <el-row :gutter="40" class="basic-info-title-row">
      <el-col :span="6" class="basic-info-title-col">
        <span class="col-span-key">{{ $t('member.registerTime') }}</span>
        <span class="col-span-value">{{ queryParams.regTime||"-" }}</span>
      </el-col>
      <el-col :span="6"  class="basic-info-title-col">
        <span class="col-span-key">{{ $t('member.registerIP') }}</span>
        <span class="col-span-value">{{ queryParams.regIp||"-" }}</span>
      </el-col>
      <el-col :span="6" class="basic-info-title-col">
        <span class="col-span-key">{{ $t('member.registerAddress') }}</span>
        <span class="col-span-value">{{ queryParams.regDomain||"-" }}</span>
      </el-col>
      <el-col :span="6" class="basic-info-title-col">
        <span class="col-span-key">{{ $t('member.registerClient') }}</span>
        <span class="col-span-value">{{ filterLabel(clientList,queryParams.regClient) }}</span>
      </el-col>
      <el-col :span="6" class="basic-info-title-col">
        <span class="col-span-key">{{ $t('member.firstDepositTime') }}</span>
        <span class="col-span-value">{{ queryParams.firstDpTime||"-" }}</span>
      </el-col>
      <el-col :span="6" class="basic-info-title-col">
        <span class="col-span-key">{{ $t('member.firstDepositAmount') }}</span>
        <span class="col-span-value">{{ !isNaN(queryParams.firstDpAmount) ? queryParams.firstDpAmount : "-" }}</span>
      </el-col>
      <el-col :span="6" class="basic-info-title-col">
        <span class="col-span-key">{{ $t('member.lastBetTime') }}</span>
        <span class="col-span-value">{{ queryParams.lastBetTime||"-" }}</span>
      </el-col>
      <el-col :span="6" class="basic-info-title-col">
        <span class="col-span-key">{{ $t('member.lastLoginTime') }}</span>
        <span class="col-span-value">{{ queryParams.lastLoginTime||"-" }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { clientList } from "@/utils/config";
import { filterLabel } from "@/utils";

const props = defineProps(["queryParams"]);

</script>

<style lang="scss" scoped>
.basic-info-register-info {
  .basic-info-title-row {
    .basic-info-title-col {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .col-span-key {
        font-size: 14px;
      }
      .col-span-value {
        font-size: 14px;
        margin-left: 12px;
      }
    }
  }
}
</style>
