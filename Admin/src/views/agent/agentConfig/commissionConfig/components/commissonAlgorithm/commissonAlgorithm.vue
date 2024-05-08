<template>
  <div class="math-container">
    <el-table :data="mathList" :row-style="{ height: '60px' }">
      <el-table-column :label="$t('agent.handle')" width="240">
        <template #default="{ row }">
          <el-button type="primary" @click="toShowEdit(row)">{{
            $t("agent.edit")
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="algorithmName"
        :label="$t('agent.algorithmName')"
        width="240"
      />
      <el-table-column
        prop="algorithm"
        :label="$t('agent.commissionAlgotithm')"
        min-width="50%"
      />
    </el-table>

    <el-dialog
      v-model="isShowEdit"
      :title="$t('agent.editAlgorithmName')"
      :before-close="closeEdit"
      width="400px"
    >
      <div v-if="isShowEdit">
        <el-form-item :label="$t('agent.algorithmName')">
          <el-input
            v-model="algorithmName"
            style="width: 230px"
            maxLength="20"
          />
        </el-form-item>
        <div class="btn-row">
          <el-button @click="handleClose">{{ $t("agent.cancel") }}</el-button>
          <el-button type="primary" @click="toEditName">{{
            $t("agent.ensure")
          }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {
  getCommissonMethodListApi,
  editmathMethodApi,
} from "@/api/agent/agentConfig";
const { proxy } = getCurrentInstance();
const mathList = ref([]);
onMounted(() => {
  getData();
});
// 获取数据
const getData = () => {
  getCommissonMethodListApi().then((res) => {
    mathList.value = res;
  });
};

// 编辑算法名称弹窗
const algorithmName = ref("");
const isShowEdit = ref(false);
const currentRow = ref();
const toShowEdit = (row) => {
  currentRow.value = row;
  algorithmName.value = row.algorithmName;
  isShowEdit.value = true;
};
const closeEdit = () => {
  isShowEdit.value = false;
  getData();
};
const handleClose = () => {
  isShowEdit.value = false;
};

const toEditName = async () => {
  if (!algorithmName.value) {
    proxy.$modal.msgError(i18n.global.t("agent.nameCannotBeEmpty"));
    return;
  }
  let isSame = 0;
  mathList.value.forEach((item) => {
    if (item.algorithmName == algorithmName.value) {
      isSame++;
    }
  });
  if (isSame > 1) {
    proxy.$modal.msgError(i18n.global.t("agent.algorithmCannotBeEmpty"));
    return;
  }
  let params = {
    algorithmName: algorithmName.value,
    id: currentRow.value.id,
  };
  await editmathMethodApi(params);
  proxy.$modal.msgSuccess(i18n.global.t("agent.updateSuccessfully"));
  closeEdit();
};
</script>

<style lang="scss" scoped>
.math-container {
  padding-left: 30px;
}
.btn-row {
  display: flex;
  justify-content: end;
}
</style>
