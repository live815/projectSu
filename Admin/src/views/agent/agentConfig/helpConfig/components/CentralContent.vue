<!-- 帮助中心内容 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.titleName')">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('agent.pleaseInput')"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("agent.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("agent.reset")
        }}</el-button>
        <el-button
          type="warning"
          icon="Plus"
          @click="addHelpCenterPopup(null)"
          >{{ $t("agent.add") }}</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="date"
        :label="$t('agent.handle')"
        width="200"
        align="center"
      >
        <template #default="scope">
          <el-button type="primary" @click="editMain(scope.row)">{{
            $t("agent.edit")
          }}</el-button>
          <el-button type="danger" @click="delBtn(scope.row.id)">{{
            $t("agent.delete")
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="title" :label="$t('agent.title')" width="240" />
      <el-table-column prop="content" :label="$t('agent.detail')" width="200">
        <template #default="{ row }">
          <el-button type="primary" plain @click="toshowPreview(row)">{{
            $t("agent.checkDetail")
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="classifyName"
        :label="$t('agent.category')"
        width="200"
      />
      <el-table-column
        prop="createBy"
        :label="$t('agent.createBy')"
        width="200"
      />
      <el-table-column
        prop="createTime"
        :label="$t('agent.createTime')"
        width="200"
      />
      <el-table-column
        prop="updateBy"
        :label="$t('agent.lastUpdateBy')"
        width="200"
      >
        <template #default="{ row }">
          <span>{{ row.updateBy || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        :label="$t('agent.lastUpdateTimeQuot')"
        width="330"
      >
        <template #default="{ row }">
          <span>{{ row.updateTime || "-" }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />

    <el-dialog
      v-model="helpCenterPopup"
      :title="addNewEdits ? $t('agent.addContent') : $t('agent.editContent')"
      width="800px"
      @close="handleClose"
      :center="true"
    >
      <HelpCenterPopup
        v-if="helpCenterPopup"
        :opRow="opRowitem"
        @submitBtn="submitBtn"
      ></HelpCenterPopup>
    </el-dialog>

    <el-dialog
      v-model="detailedContent"
      :title="$t('agent.checkDetail')"
      width="700px"
      :center="true"
    >
      <ViewDetails :previewContent="previewContent" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  queryHelpCenterApi,
  deleteHelpCenterApi,
} from "@/api/agent/helpConfig.js";
import HelpCenterPopup from "./HelpCenterPopup.vue";
import ViewDetails from "./ViewDetails.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { Base64 } from "js-base64";
import i18n from "@/i18n";

const queryParams = ref({
  updateBy: "",
  pageNum: 1,
  pageSize: 10,
  tenantId: 0,
  title: "",
});
const total = ref(5);
const loading = ref(false);
const opRowitem = ref({});
//{{$t('agent.search')}}
function handleQuery() {
  helpCenterList();
}
//{{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.title = "";
  helpCenterList();
}
// 新增弹窗
const addNewEdits = ref(false);
const helpCenterPopup = ref(false);
const addHelpCenterPopup = () => {
  helpCenterPopup.value = !helpCenterPopup.value;
  opRowitem.value = {};
};
// 新增编辑弹窗确认
const submitBtn = () => {
  helpCenterPopup.value = false;
  addNewEdits.value = false;
  helpCenterList();
};
//{{$t('agent.check')}}内容详情
const detailedContent = ref(false);
const previewContent = ref();
const toshowPreview = (item) => {
  previewContent.value = item;
  detailedContent.value = !detailedContent.value;
};
// 编辑传参
const editMain = (row) => {
  opRowitem.value = row;
  helpCenterPopup.value = true;
};
//关闭弹窗清空数据
const handleClose = () => {
  helpCenterPopup.value = false;
};
// 删除
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("agent.isDeleteData"))
    .then(() => {
      deleteHelpCenterApi(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.deleteSuccessfully"),
        });
        // getCount();
        helpCenterList();
      });
    })
    .catch(() => {});
};
//表格数据
const tableData = ref([]);
// 列表
const helpCenterList = async () => {
  try {
    let res = await queryHelpCenterApi(queryParams.value);
    tableData.value = res.rows;
    if (Array.isArray(tableData.value)) {
      tableData.value.forEach((item) => {
        item.content = Base64.decode(item.content);
      });
    }

    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
// 分页
function getList() {
  loading.value = true;
  queryHelpCenterApi(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch((err) => {
      loading.value = false;
    });
}

onMounted(() => {
  helpCenterList();
});
</script>

<style lang="scss" scoped></style>
