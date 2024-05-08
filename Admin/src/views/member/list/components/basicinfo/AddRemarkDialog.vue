<template>
  <!-- 修改账号状态 -->
  <div class="add-remark-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('member.addRemarkInformation')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="top"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('member.remark')" prop="remark">
              <el-input
                type="textarea"
                v-model="queryParams.remark"
                maxlength="50"
                :placeholder="$t('member.pleaseInput')"
                show-word-limit
                :rows="5"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('member.cancel') }}</el-button>
          <el-button type="primary" @click="submit">{{ $t('member.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance } from "vue";
import { addRemarkList } from "@/api/member/list/index";
const props = defineProps(["openStatus", "userName","tenantId"]);
const emit = defineEmits(["update:openStatus", "onrefresh"]);
console.log(props.tenantId,11111)

const { proxy } = getCurrentInstance();
const queryParams = ref({
  remark: null,
});
const queryRef = ref(null);
const rules = ref({
  remark: [
    { required: true, message: i18n.global.t("member.pleaseInputRemark"), trigger: "blur" },
  ]
});
const dialogVisible = computed({
  get() {
    return props.openStatus;
  },
  set(val) {
    emit("update:openStatus", val);
  },
});

function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      addRemarkList({
        userName:props.userName,
        tenantId:props.tenantId,
        ...queryParams.value
      }).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("member.addSuccessfully"))
        dialogVisible.value = false
        emit("onrefresh")
      })
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.add-remark-dialog {
  .avatar-uploader-icon {
    width: 105px;
    height: 105px;
    // text-align:center;
    // line-height: 105px;
    border: 1px dashed gray;
  }
  .rewrite-icon {
    display: flex;
    flex-direction: column;
  }
  .force-success-img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
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
