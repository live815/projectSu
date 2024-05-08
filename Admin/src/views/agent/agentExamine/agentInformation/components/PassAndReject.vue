<!-- 代理信息调整审核 通过与拒绝-->
<template>
  <div>
    <el-form :model="queryParams" :rules="rules">
      <el-form-item :label="$t('agent.remark')" prop="reviewMark">
        <el-input
          v-model="queryParams.reviewMark"
          :rows="8"
          type="textarea"
          :placeholder="$t('agent.pleaseInput')"
          style="width: 100%"
        />
      </el-form-item>

      <div class="button-container">
        <el-form-item>
          <el-button @click="confirmAndClose">{{
            $t("agent.cancel")
          }}</el-button>
          <el-button type="primary" @click="onClickCheck(val)">{{
            $t("agent.ensure")
          }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, ref, onMounted, getCurrentInstance } from "vue";
import { proxyInformationPassedOrRejectedApi } from "@/api/agent/adjustment.js";
import useUserStore from "@/store/modules/user";

const user = useUserStore();

const queryParams = ref({
  reviewMark: "",
});
const props = defineProps(["rowItems", "passOrReject"]);
const emit = defineEmits(["changeStatus", "closeDialog"]);
const { proxy } = getCurrentInstance();
//校验
const rules = ref({
  reviewMark: [
    {
      required: true,
      message: i18n.global.t("agent.reviewRemarkCannotBeEmpty"),
      trigger: "blur",
    },
  ],
});
const rowItem = computed(() => {
  return props.rowItems;
});

const onClickCheck = () => {
  if (!queryParams.value.reviewMark) {
    proxy.$modal.msgWarning(i18n.global.t("agent.reviewRemarkCannotBeEmpty"));
    return;
  }
  if (props.passOrReject == 1) {
    const params = {
      id: rowItem.value.id,
      passOrRejectionFlag: 1,
      review: user.userInfo.userName,
      reviewMark: queryParams.value.reviewMark,
    };
    proxyInformationPassedOrRejectedApi(params).then(() => {
      proxy.$modal.msgSuccess(i18n.global.t("agent.reviewRefuse"));
      emit("changeStatus", true);
    });
  } else {
    const params = {
      id: rowItem.value.id,
      passOrRejectionFlag: 2,
      review: user.userInfo.userName,
      reviewMark: queryParams.value.reviewMark,
    };
    proxyInformationPassedOrRejectedApi(params).then(() => {
      proxy.$modal.msgSuccess(i18n.global.t("agent.reviewPass"));
      emit("changeStatus", true);
    });
  }
};
//取消
const confirmAndClose = () => {
  emit("closeDialog");
};
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
