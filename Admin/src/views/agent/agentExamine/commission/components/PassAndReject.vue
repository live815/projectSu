<!-- 佣金{{$t('agent.review')}} 通过与拒绝弹窗-->
<template>
  <div>
    <el-form
      ref="formRef"
      :model="queryParams"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item
        :label="$t('agent.remark')"
        prop="firstReviewMark"
        v-if="rowItems.status == 1"
      >
        <el-input
          v-model="queryParams.firstReviewMark"
          :rows="8"
          type="textarea"
          :placeholder="$t('agent.pleaseInput')"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.remark')" prop="secondReviewMark" v-else>
        <el-input
          v-model="queryParams.secondReviewMark"
          :rows="8"
          type="textarea"
          :placeholder="$t('agent.pleaseInput')"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="">
        <el-button @click="confirmAndClose">{{ $t("agent.cancel") }}</el-button>
        <el-button type="primary" @click="onClickCheck(val)">{{
          $t("agent.ensure")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, ref, onMounted, getCurrentInstance } from "vue";
import {
  commissionFirstTrialApi,
  commissionSecondReviewApi,
} from "@/api/agent/commission.js";
import useUserStore from "@/store/modules/user";
const formRef = ref(null);
const user = useUserStore();
const queryParams = ref({
  id: null,
  passOrRejectionFlag: null,
  firstReviewMark: "",
});
const props = defineProps(["rowItems", "passOrReject"]);
const emit = defineEmits(["changeStatus", "closeDialog"]);
const { proxy } = getCurrentInstance();

//校验
const rules = ref({
  firstReviewMark: [
    {
      required: true,
      message: `${i18n.global.t("agent.reviewRemarkCannotBeEmpty")}`,
      trigger: "blur",
    },
  ],
  secondReviewMark: [
    {
      required: true,
      message: `${i18n.global.t("agent.reviewRemarkCannotBeEmpty")}`,
      trigger: "blur",
    },
  ],
});
const rowItem = computed(() => props.rowItems);
// {{$t('agent.review')}}
const onClickCheck = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      submit();
    } else {
      proxy.$modal.msgError(
        `${i18n.global.t("agent.reviewRemarkCannotBeEmpty")}`
      );
      return;
    }
  });
};
const submit = () => {
  queryParams.value.id = props.rowItems.id;
  if (rowItem.value.status == 1) {
    if (props.passOrReject == 1) {
      queryParams.value.passOrRejectionFlag = 2;
      commissionFirstTrialApi(queryParams.value).then(() => {
        proxy.$modal.msgSuccess(`${i18n.global.t("agent.reviewRefuse")}`);
        emit("changeStatus", props.rowItems.status);
      });
    } else {
      queryParams.value.passOrRejectionFlag = 3;
      commissionFirstTrialApi(queryParams.value).then(() => {
        proxy.$modal.msgSuccess(`${i18n.global.t("agent.reviewPass")}`);
        emit("changeStatus", props.rowItems.status);
      });
    }
  } else if (rowItem.value.status == 3) {
    if (props.passOrReject == 1) {
      queryParams.value.passOrRejectionFlag = 4;
      commissionSecondReviewApi(queryParams.value).then(() => {
        proxy.$modal.msgSuccess(`${i18n.global.t("agent.reviewRefuse")}`);
        emit("changeStatus", props.rowItems.status);
      });
    } else {
      queryParams.value.passOrRejectionFlag = 5;
      commissionSecondReviewApi(queryParams.value).then(() => {
        proxy.$modal.msgSuccess(`${i18n.global.t("agent.reviewPass")}`);
        emit("changeStatus", props.rowItems.status);
      });
    }
  }
};
//取消
const confirmAndClose = () => {
  emit("closeDialog");
};
onMounted(() => {});
</script>

<style lang="scss" scoped></style>
