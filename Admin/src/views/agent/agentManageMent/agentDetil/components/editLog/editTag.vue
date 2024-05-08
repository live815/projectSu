<template>
  <div class="editTag-container">
    <div>
      <el-button type="primary" @click="handleCloseEditTag(1)">{{
        $t("agent.add")
      }}</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tagList" border>
        <el-table-column
          prop="tagName"
          :label="$t('agent.labelNameNoQuote')"
          width="160px"
        />
        <el-table-column
          prop="createTime"
          :label="$t('agent.addTimeNoQuote')"
          width="160px"
        />
        <el-table-column
          prop="createBy"
          :label="$t('agent.addAPersonNoQuote')"
          width="150px"
        />
        <el-table-column prop="remark" :label="$t('agent.remarkQuote')" />
        <el-table-column
          prop="remark"
          :label="$t('agent.handle')"
          width="100px"
        >
          <template #default="{ row }">
            <el-button type="danger" @click="delTage(row)">{{
              $t("agent.delete")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-button @click="handleCloseEditTag(false)">{{
        $t("agent.close")
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ElMessage, ElMessageBox } from "element-plus";
import { delAgentTagApi } from "@/api/agent/agentList.js";
const props = defineProps({
  tagList: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(["closeEditTag", "getTagList"]);

const handleCloseEditTag = (isAdd) => {
  emit("closeEditTag", isAdd);
};

const reGetTagList = () => {
  emit("getTagList");
};
const delTage = async (row) => {
  ElMessageBox.confirm(i18n.global.t("agent.isDeleteData"))
    .then(async () => {
      try {
        await delAgentTagApi(BigInt(row.id).toString());
        reGetTagList();
      } catch (err) {
        console.log(err);
      }
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.editTag-container {
  width: 100%;
}

.table-container {
  margin: 20px 0 20px 0;
}
</style>
