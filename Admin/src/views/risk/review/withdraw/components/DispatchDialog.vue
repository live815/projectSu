<template>
  <div class="dispatch-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('risk.dispatchOrder')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
    <!-- 风控审核领取 -->
      <el-form
        :model="queryParams"
        label-position="top"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('risk.reciever')" prop="riskUserName">
              <el-select
                v-model="queryParams.riskUserName"
                :placeholder="$t('risk.pleaseSelect')"
                class="full-width"
                clearable
              >
                <el-option
                  v-for="dict in riskUserIdList"
                  :key="dict.id"
                  :label="dict.userName"
                  :value="dict.userName"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('risk.cancel') }}</el-button>
          <el-button type="primary" @click="submit">{{ $t('risk.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { dispatchOrder } from "@/api/risk/review/index";
import { getReviewPersonList } from "@/api/risk/config/index";

const props = defineProps(["open", "orderNos","orderNo","dispatchType"]);
const emit = defineEmits(["update:open", "fresh-dispatch"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  riskUserName:null
});
const rules = ref({
  riskUserName: [{ required: true, message: i18n.global.t("risk.pleaseSelectReciever"), trigger: "change" }],
});
const queryRef = ref(null);
const riskUserIdList = ref([]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(() => {
  queryLabelSelect();
});
function queryLabelSelect() {
  getReviewPersonList({
    status:1
  }).then((res) => {
    riskUserIdList.value = res || [];
  });
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  console.log(queryParams.value,props.orderNo,props.orderNos)
  queryRef.value.validate((valid) => {
    if (valid) {
      dispatchOrder({
        ...queryParams.value,
        orderNos:props.dispatchType==='single'?[props.orderNo]:props.orderNos
      }).then((res) => {
        dialogVisible.value = false;

        proxy.$modal.msgSuccess(i18n.global.t("risk.operateSuccessfully"));
        emit("fresh-dispatch");
      });
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.dispatch-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
</style>
