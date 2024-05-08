<template>
  <div class="add-or-edit-config-dialog">
    <!-- 黑名单群组调整 -->
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('risk.blackGroupAdjust')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="left"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item :label="$t('risk.adjustTo')" prop="groupId" class="full-width">
              <el-select
                v-model="queryParams.groupId"
                :placeholder="$t('risk.pleaseSelect')"
                class="full-width"
                clearable
                :disabled="type === 'edit'"
              >
                <el-option
                  v-for="dict in blackTypeList"
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
      <el-row>
        <el-col>
            <el-table
              :data="tableData"
              @selection-change="handleSelectionChange"
              :empty-text="$t('risk.noData')"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column :label="$t('risk.type')" prop="type">
                <template #default="{ row }">
                  <span>{{ filterLabel(sys_risk_blacklist_type,row.type) }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('risk.valueNoQuote')" prop="value">
                <template #default="{ row }">
                  <span>{{ row.value || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('risk.group')" prop="groupName">
                <template #default="{ row }">
                  <span>{{ row.groupName || "-" }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col style="border-bottom:1px solid rgb(215,215,215);margin-top:20px;padding-bottom:20px;">
            <span>{{ $t('risk.total') }}</span>
            <span>{{ tableData.length }}{{ $t('risk.aLittledata') }}</span>
          </el-col>
      </el-row>
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
import { getBlackGroupList,getBlackallList,changeBatchBlack } from "@/api/risk/config/index";
import { filterLabel } from "@/utils/index";

const props = defineProps(["openAdjust", "type","sys_risk_blacklist_type"]);
const emit = defineEmits(["update:openAdjust", "onrefreshgroup"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  groupId: null,
  remark: null,
});
const tableData = ref([]);
const selectedIds = ref([]);
const queryRef = ref(null);
const rules = ref({
  groupId: [
    { required: true, message: i18n.global.t("risk.pleaseSelectBlackGroup"), trigger: "change" },
  ],
  remark: [{ required: true, message: i18n.global.t("risk.pleaseInputLevelName"), trigger: "blur" }],
});

const blackTypeList = ref([]);

const dialogVisible = computed({
  get() {
    return props.openAdjust;
  },
  set(val) {
    emit("update:openAdjust", val);
  },
});

onMounted(async ()=>{
  await queryGroupList();
  await queryBlackallList();
})
function queryGroupList(){
  return getBlackGroupList({}).then(res=>{
    blackTypeList.value = res || []
  })
}
function queryBlackallList(){
  return getBlackallList({}).then(res=>{
    tableData.value = res || [];
  })
}

function handleSelectionChange(selection) {
  selectedIds.value = selection.map((item) => item.id);
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      changeBatchBlack({
        ...queryParams.value,
        ids:selectedIds.value
      }).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("risk.operateSuccessfully"));
        cancel();
        emit("onrefreshgroup");
      })
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
      border-top: 1px solid rgb(215, 215, 215);
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
