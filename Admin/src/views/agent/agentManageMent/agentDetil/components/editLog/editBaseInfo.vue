<template>
  <div class="edit-container">
    <!-- 代理类型 -->
    <agentType
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 13"
    />
    <!-- 账户状态 -->
    <agentStatus
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 0"
    />
    <!-- 代理模式 -->
    <agentMode
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 1"
    />
    <!-- 佣金方案 -->
    <agentCommissionMethod
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 2"
    />

    <!-- 发展人 -->
    <developer
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 3"
    />

    <!-- 维护人 -->
    <agentDefener
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 4"
    />

    <!-- 信用钱包 -->
    <creditWallet
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 5"
    />

    <!-- 姓名 -->
    <agentRealName
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 6"
    />

    <!-- 性别 -->
    <agentSex
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 7"
    />

    <!-- 生日 -->
    <agentBirthday
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 8"
    />

    <!-- 手机号码 -->
    <agentPhone
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 9"
    />

    <!-- 邮箱 -->
    <agentEmail
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 10"
    />

    <!-- 邮箱 -->
    <agentWeChat
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 11"
    />

    <!-- QQ -->
    <agentQQ
      :detailData="detailData"
      @closeDetailEdit="closeDetailEdit"
      v-if="baseInfoType == 12"
    />
  </div>
</template>

<script setup>
import agentType from "./editInfo/agentType.vue";
import agentStatus from "./editInfo/agentStatus.vue";
import agentMode from "./editInfo/agentMode.vue";
import agentCommissionMethod from "./editInfo/agentCommissionMethod.vue";
import developer from "./editInfo/developer.vue";
import agentDefener from "./editInfo/agentDefener.vue";
import creditWallet from "./editInfo/creditWallet.vue";
import agentRealName from "./editInfo/agentRealName.vue";
import agentSex from "./editInfo/agentSex.vue";
import agentEmail from "./editInfo/agentEmail.vue";
import agentWeChat from "./editInfo/agentWeChat.vue";
import agentQQ from "./editInfo/agentQQ.vue";
import agentBirthday from "./editInfo/agentBirthday.vue";
import agentPhone from "./editInfo/agentPhone.vue";
const props = defineProps({ detailData: Object, baseInfoType: Number });
const emit = defineEmits(["closeBaseEdit"]);
const closeDetailEdit = () => {
  emit("closeBaseEdit");
};
</script>

<style lang="scss" scoped>
.edit-container {
  padding: 0 200px;
}
</style>
