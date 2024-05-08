<template>
  <div class="user-num-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="titleChange"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="right"
        label-width="98px"
        ref="queryRef"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="$t('risk.userName')" prop="memberName">
              <el-input
                v-model="queryParams.memberName"
                :placeholder="$t('risk.pleaseInput')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-button icon="Search" type="primary" @click="handleQuery">查询</el-button>
            <el-button icon="Refresh" @click="reset">{{ $t('member.reset') }}</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" :empty-text="$t('risk.noData')">
        <el-table-column
          prop="memberName"
          :label="$t('risk.userNameNoQuote')"
          align="center"
        />
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
        style="height: 40px"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t("risk.cancel") }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getRiskHierarchyUserNameList } from "@/api/risk/level/index";
import { computed, onMounted } from "vue";

const props = defineProps(["openUser", "title", "id"]);
const emit = defineEmits(["update:openUser"]);
const queryRef = ref(null);
const queryParams = ref({
  memberName: null,
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const tableData = ref([]);
const dialogVisible = computed({
  get() {
    return props.openUser;
  },
  set(val) {
    emit("update:openUser", val);
  },
});
const titleChange = computed(() => {
  return i18n.global.t("risk.financialLevelUsernameOrder",{num:props.title})   
});

onMounted(() => {
  getList();
});
function handleQuery(){
  queryParams.value.pageNum = 1;
  getList();
}
function reset(){
  queryRef.value.resetFields();
}
const getList = () => {
  getRiskHierarchyUserNameList({
    riskLayerId: props.id,
    ...queryParams.value,
  }).then((res) => {
    tableData.value = res.records || [];
    total.value = res.total || 0;
  });
};
function cancel() {
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.user-num-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 400;
      font-size: 22px;
      color: #8c8c8c;
    }
  }
}
</style>
