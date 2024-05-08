<template>
  <div class="vip-rebate-itemdialog">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="titleChange"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        label-position="top"
        :rules="rules"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="" prop="tableData" class="full-width">
              <el-table :data="queryParams.tableData" class="full-width" :empty-text="$t('member.noData')">
                <el-table-column
                  :label="$t('member.lobbyName')"
                  prop="lobbyName"
                  align="center"
                  width="90"
                >
                </el-table-column>
                <el-table-column
                  label="VIP0"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip0`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip0"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP1"
                  prop="vip1"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip1`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip1"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP2"
                  prop="vip2"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip2`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip2"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP3"
                  prop="vip3"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip3`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip3"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP4"
                  prop="vip4"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip4`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip4"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP5"
                  prop="vip5"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip5`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip5"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP6"
                  prop="vip6"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip6`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip6"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP7"
                  prop="vip7"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip7`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip7"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP8"
                  prop="vip8"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip8`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip8"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP9"
                  prop="vip9"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip9`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip9"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP10"
                  prop="vip10"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip10`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip10"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIP11"
                  prop="vip11"
                  align="center"
                  width="170"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.vip11`"
                      :rules="rules.vip0"
                    >
                      <el-input
                        v-model="row.vip11"
                        clearable
                        :placeholder="$t('member.pleaseInput')"
                        :disabled="$index==0"
                      >
                        <template #append>
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('member.cancel') }}</el-button>
          <el-button type="primary" @click="submit"> {{ $t('member.save') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {
  getViprebatefigItemList,
  editViprebatefigItemList,
} from "@/api/member/vip/index";
const props = defineProps(["open", "lobbyCode"]);
const emit = defineEmits(["update:open"]);

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  tableData: [],
});
const rules = ref({
  vip0: [
  // { required: true, message: "请输入返水配置", trigger: "blur" },
  {pattern:/^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,message:i18n.global.t("member.pleaseInputTwoDecimalRangeFromZeroToOneHundred"),trigger:"blur"}],
});

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const titleChange = computed(() => {
  switch (props.lobbyCode) {
    case "SPORTS":
      return i18n.global.t("member.sportTitleConfig");
    case "REAL":
      return i18n.global.t("member.realTitleConfig");
    case "POKER":
      return i18n.global.t("member.boardGamesRatioTitleConfig");
    case "SLOT":
      return i18n.global.t("member.slotRatioTitleConfig");
    case "LOTTERY":
      return i18n.global.t("member.lotteryRatioTitleConfig");
    case "GAMING":
      return i18n.global.t("member.esportsRatioTitleConfig");
    default:
      return i18n.global.t("member.sportTitleConfig");
  }
});

queryConten();
//根据ID查询详情
function queryConten() {
  getViprebatefigItemList(props.lobbyCode).then((res) => {
    queryParams.value.tableData = res || [];
  });
}

function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      editViprebatefigItemList({
        list:queryParams.value.tableData.slice(1)
      }).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
      })
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.vip-rebate-itemdialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-table .cell {
      padding-bottom: 16px;
    }
  }
}
</style>
