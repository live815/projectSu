<template>
  <div class="hand-label">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="$t('member.labelAddNumber')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-row style="align-items: center" class="mb-20">
        <el-col :span="12">
          <span>{{ $t("member.labelName") }}</span>
          <span>{{ $t("member.largeAmountUserLabel") }}</span>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-button class="export-btn" @click="exportUserLabel">{{
            $t("member.export")
          }}</el-button>
        </el-col>
      </el-row>
      <el-table :data="labelNumList" :empty-text="$t('member.noData')">
        <el-table-column
          prop="userName"
          :label="$t('member.userNameNoQuote')"
          width="200"
          align="center"
        >
          <template #default="{ row }">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span class="mr-16">{{ row.userName }}</span>
              <el-icon
                v-copyText="row.userName"
                v-copyText:callback="copyTextSuccess"
                ><DocumentCopy
              /></el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          :label="$t('member.accountTypeNoQuote')"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <span v-if="row.type === '0'">{{ $t("member.normal") }}</span>
            <span v-else-if="row.type === '1'">{{
              $t("member.excellent")
            }}</span>
            <span v-else-if="row.type === '2'">{{ $t("member.follow") }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberTag"
          :label="$t('member.relationLabel')"
          align="center"
        >
          <template #default="{ row }">
            <span>{{ row.memberTag ? row.memberTag : "-" }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="showAutoPop"
        style="height: 40px"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { getMemberByLabelId } from "@/api/member/list/index";
import { onMounted } from "vue";

const props = defineProps(["data", "id", "openDia"]);
const emit = defineEmits(["update:openDia"]);
const { proxy } = getCurrentInstance();

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const labelNumList = ref([]);

const dialogVisible = computed({
  get() {
    return props.openDia;
  },
  set(val) {
    emit("update:openDia", val);
  },
});
onMounted(() => {
  showAutoPop();
});
const showAutoPop = () => {
  console.log(props.id);
  getMemberByLabelId({
    labelId: props.id,
    ...queryParams.value,
  }).then((res) => {
    labelNumList.value = res.records || [];
    total.value = res.total || 0;
  });
};
function cancel() {
  dialogVisible.value = false;
}
function copyTextSuccess() {
  // proxy.$modal.msgSuccess("复制成功");
}
function exportUserLabel() {
  // proxy.download(
  //   "system/user/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `user_${new Date().getTime()}.xlsx`
  // );
}
</script>

<style lang="scss" scoped>
.hand-label {
  :deep() {
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
</style>
