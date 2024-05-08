<template>
  <div>
    <el-form :modal="requestData" :rule="rule">
      <div v-if="editCode == 1">
        <el-form-item
          :label="$t('agent.remark')"
          prop="remark"
          label-width="auto"
          label-position="right"
        >
          <el-input
            v-model="requestData.remark"
            :autosize="{ minRows: 3, maxRows: 9 }"
            type="textarea"
            :placeholder="$t('agent.pleaseInputRemark')"
            :maxlength="50"
          />
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item :label="$t('agent.labelName')" prop="depositType">
          <el-select
            class="m-2"
            style="width: 300px"
            v-model="tagData.agentTagId"
            :placeholder="$t('agent.pleaseSelect')"
          >
            <el-option
              :value="item.id"
              :label="item.tagName"
              v-for="item in tagList"
              :key="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('agent.remark')" prop="remark">
          <el-input
            v-model="tagData.remark"
            :autosize="{ minRows: 3, maxRows: 9 }"
            type="textarea"
            :placeholder="$t('agent.pleaseInputRemark')"
            :maxlength="20"
          />
        </el-form-item>
      </div>
    </el-form>

    <div>
      <el-button @click="handleCloseAddRemark">{{
        $t("agent.close")
      }}</el-button>
      <el-button type="primary" @click="submit">{{
        $t("agent.save")
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import {
  addActiveAgentRemarkApi,
  getAgentTagListApi,
  addAgentTagApi,
} from "@/api/agent/agentList.js";
import { useRoute } from "vue-router";
import i18n from "@/i18n";
const route = useRoute();
const { proxy } = getCurrentInstance();
const emit = defineEmits(["closeAddRemark"]);
const props = defineProps({
  agentId: String,
  editCode: Number,
});
onMounted(() => {
  if (props.editCode == 2) {
    getAgentTagListApi().then((res) => {
      tagList.value = res;
    });
  }
});
const requestData = ref({
  agentId: "",
  createBy: "",
  remark: "",
});
const tagList = ref();
const tagData = ref({
  agentId: 0,
  agentTagId: "",
  remark: "",
});
const submit = async () => {
  if (props.editCode == 1) {
    try {
      requestData.value.agentId = route.query.id;
      if (requestData.remark == "") {
        proxy.$modal.msgError(i18n.global.t("agent.remarksCannotBeEmpty"));
        return;
      }
      await addActiveAgentRemarkApi(requestData.value);
      proxy.$modal.msgSuccess(i18n.global.t("agent.noteSavedSuccessfully"));
      handleCloseAddRemark();
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      tagData.value.agentId = route.query.id;
      // if (tagData.value.remark == "") {
      //   proxy.$modal.msgError(i18n.global.t("agent.remarksCannotBeEmpty"));
      //   return;
      // }
      if (tagData.value.agentTagId == "") {
        proxy.$modal.msgError(i18n.global.t("agent.pleaseSelectALabelName"));
        return;
      }
      addAgentTagApi(tagData.value).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("agent.tagAddedSuccessfully"));
        handleCloseAddRemark();
      });
    } catch (err) {
      console.log(err);
    }
  }
};
const handleCloseAddRemark = () => {
  emit("closeAddRemark");
};
const rule = [
  {
    required: true,
    message: i18n.global.t("agent.pleaseInputRemark"),
    trigger: "blur",
  },
];
</script>

<style lang="scss" scoped></style>
