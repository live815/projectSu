<template>
  <div class="add-or-edit-config-dialog">
    <!-- 新增/编辑黑名单 -->
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="type === 'add' ? $t('risk.addBlack') : $t('risk.editBlack')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="left"
        label-width="98px"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('risk.blackType')" prop="type">
              <el-select
                v-model="queryParams.type"
                :placeholder="$t('risk.pleaseSelect')"
                class="full-width"
                clearable
                :disabled="type === 'edit'"
              >
                <el-option
                  v-for="dict in sys_risk_blacklist_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.value')" prop="value">
              <el-input
                v-model="queryParams.value"
                :placeholder="$t('risk.pleaseInput')"
                clearable
                :disabled="type === 'edit'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.blackGroup')" prop="groupId">
              <el-select
                v-model="queryParams.groupId"
                :placeholder="$t('risk.pleaseSelect')"
                class="full-width"
                clearable
              >
                <el-option
                  v-for="dict in blackGroupList"
                  :key="dict.id"
                  :label="dict.groupName"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.remark')" prop="remark">
              <el-input
                type="textarea"
                v-model="queryParams.remark"
                maxlength="50"
                :placeholder="$t('risk.pleaseInput')"
                show-word-limit
                :rows="5"
              ></el-input>
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
import { getCurrentInstance } from "vue";
import { filterLabel } from "@/utils/index";
import { getBlackGroupList,getBlackInfo,addBlack,editBlack } from "@/api/risk/config/index";

const props = defineProps(["open", "type","sys_risk_blacklist_type","id"]);
const emit = defineEmits(["update:open", "onrefresh"]);
const { proxy } = getCurrentInstance();
const queryParams = ref({
  id: null,
  type: null,
  value: null,
  groupId: null,
  remark: null,
});
const queryRef = ref(null);
const rules = ref({
  type: [
    { required: true, message: i18n.global.t("risk.pleaseSelectBlackType"), trigger: "change" },
  ],
  groupId: [
    { required: true, message: i18n.global.t("risk.pleaseSelectBlackGroup"), trigger: "change" },
  ],
  value: [{ required: true, message: i18n.global.t("risk.pleaseInputLevelName"), trigger: "blur" }],
});

const blackGroupList = ref([]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(async () => {
  await qeuryBlackGroupList()
  props.type === "edit" && (await queryDetail());
});
function queryDetail() {
  return getBlackInfo(props.id).then(res=>{
    queryParams.value = res || {};
  })
}
function qeuryBlackGroupList(){
  return getBlackGroupList({}).then(res=>{
    blackGroupList.value = res || [];
  })
}

function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      if(props.type === 'add'){
        addBlack({
          ...queryParams.value,
          groupName:filterLabel(blackGroupList.value,queryParams.value.groupId)
        }).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("risk.addSuccessfully"));
          emit("onrefresh");

          dialogVisible.value = false;
        })
      }else{
        editBlack({
          ...queryParams.value,
          groupName:filterLabel(blackGroupList.value,queryParams.value.groupId)
        }).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"));
          emit("onrefresh");

          dialogVisible.value = false;
        })
      }
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.add-or-edit-config-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      border-top: 1px solid rgb(215,215,215);
    }
    .el-button {
      width: 140px;
      height: 40px;
      &:first-child {
        color: #8c8c8c;
        border: 1px solid rgba(121, 121, 121, 1);
      }
      &:nth-child(2) {
        background: #1890ff;
      }
    }
  }
}
</style>
