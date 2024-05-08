<template>
  <div class="label-edit-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('member.updateLabel')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
    <!-- 修改会员标签 -->
      <el-form
        :model="queryParams"
        label-position="top"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('member.labelEdit')" prop="labelName">
              <el-select
                v-model="queryParams.type"
                value-key="id"
                :placeholder="$t('member.pleaseSelect')"
                class="full-width"
                clearable
                multiple
              >
                <el-option
                  v-for="dict in typeList"
                  :key="dict.id"
                  :label="dict.labelName"
                  :value="dict"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('member.submitApplyReason')" prop="remark">
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
import { getCurrentInstance, onMounted } from "vue";
import { updateLabelMember, getLabelSelect,getRelationLabel } from "@/api/member/list/index";

const props = defineProps(["openLabel", "cloneRow","labelType"]);
const emit = defineEmits(["update:openLabel", "freshlabel"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  type:[],
  remark:null
});
const rules = ref({
  status: [{ required: true, message: i18n.global.t("member.pleaseSelectStatus"), trigger: "change" }],
  remark: [{ required: true, message: i18n.global.t("member.pleaseInputApplyReason"), trigger: "blur" }],
});
const queryRef = ref(null);
const typeList = ref([]);

const dialogVisible = computed({
  get() {
    return props.openLabel;
  },
  set(val) {
    emit("update:openLabel", val);
  },
});

onMounted(async () => {
  await queryLabelSelect();
  await queryMemberLabel()
});
function queryLabelSelect() {
  return getLabelSelect().then((res) => {
    typeList.value = res || [];
  });
}
//labelType用于区分是从哪个模块进入标签页面
function queryMemberLabel(){
  return getRelationLabel(props.labelType==='risk'?props.cloneRow.userId:props.cloneRow.id).then(res=>{
    queryParams.value.type = res || [];
  })
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      updateLabelMember({
        memberId: props.labelType==='risk'?props.cloneRow.userId:props.cloneRow.id,
        memberLabelList:queryParams.value.type,
        remark: queryParams.value.remark,
        userName: props.cloneRow.userName,
      }).then((res) => {
        dialogVisible.value = false;

        proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"));
        emit("freshlabel");
      });
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.label-edit-dialog {
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
