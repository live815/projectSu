<template>
  <div class="add-edit-deposit-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :title="$t('operation.memberaccount')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-input type="textarea" :autosize="{ minRows: 6 }" v-model="textarea">
      </el-input>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getWelfareConfigApi } from "@/api/operation/welfare";

const props = defineProps(["open", "rowItems"]);
const emit = defineEmits(["update:open"]);

const textarea = ref("");
onMounted(() => {
  getList();
});

const getList = () => {
  getWelfareConfigApi(props.rowItems.id).then((res) => {
    textarea.value = res.join(",");
  });
};
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

const cancel = () => {
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.add-edit-deposit-dialog {
  :deep().el-dialog__title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  :deep().pagination-container .el-pagination {
    right: 25px;
  }
}
</style>
