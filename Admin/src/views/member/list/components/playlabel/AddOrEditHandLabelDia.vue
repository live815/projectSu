<template>
  <div class="add-or-edit-hand-label-dia">
    <!-- 新增/编辑手动标签 -->
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="type === 'add' ? $t('member.addLabel') : $t('member.editLabel')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="right"
        label-width="98px"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('member.labelName')" prop="labelName">
              <el-input
                v-model="queryParams.labelName"
                :placeholder="$t('member.pleaseInput')"
                clearable
                maxlength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('member.department')" prop="dept">
              <el-select
                v-model="queryParams.dept"
                :placeholder="$t('member.pleaseSelect')"
                clearable
                class="full-width"
              >
                <el-option
                  v-for="dict in positionList"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
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
import { getDetailLabel, addLabel, editLabel } from "@/api/member/list/index";

const props = defineProps(["open", "type", "id"]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  id: null,
  labelName: null,
  dept: null,
  remark: null,
  type: 0,
});
const queryRef = ref(null);
const rules = ref({
  remark: [{ required: true, message: i18n.global.t("member.pleaseInputRemark"), trigger: "blur" }],
  labelName: [
    { required: true, message: i18n.global.t("member.pleaseInputUsername"), trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5.]+$/,
      message: i18n.global.t("risk.onlyChineseNumberEnglish"),
      trigger: "blur",
    },
  ],
  dept: [
    {
      required: true,
      message: i18n.global.t("member.pleaseSelectDepartment"),
      trigger: "change",
    },
  ],
});
const positionList = ref([
  {
    label: i18n.global.t("member.riskControl"),
    value: '1',
  },
  {
    label: i18n.global.t("member.operations"),
    value: '2',
  },
  {
    label: i18n.global.t("member.finance"),
    value: '3',
  },
]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

props.type === "edit" && queryInfo();
//根据ID查询详情
function queryInfo() {
  getDetailLabel(props.id).then((res) => {
    queryParams.value = res || {};
  });
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      if (props.type === "add") {
        addLabel(queryParams.value).then((res) => {
          dialogVisible.value = false;

          proxy.$modal.msgSuccess(i18n.global.t("member.addSuccessfully"));
          emit("onrefresh");
        });
      } else {
        editLabel(queryParams.value).then((res) => {
          dialogVisible.value = false;

          proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"));
          emit("onrefresh");
        });
      }
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.add-or-edit-hand-label-dia {
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
