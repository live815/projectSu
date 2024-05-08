<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.labelName')">
        <el-input
          v-model="queryParams.tagName"
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
          @click="addTagConfigurationPopup(null)"
          >{{ $t("agent.add") }}</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      :empty-text="$t('member.noData')"
    >
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
      <el-table-column
        prop="tagName"
        :label="$t('agent.labelNameNoQuote')"
        width="200"
      />
      <el-table-column
        prop="department"
        :label="$t('agent.departmentNoQuote')"
        width="200"
      >
        <template #default="scope">
          <span v-if="scope.row.department == 0">{{
            $t("agent.finance")
          }}</span>
          <span v-if="scope.row.department == 1">{{
            $t("agent.riskControl")
          }}</span>
          <span v-if="scope.row.department == 2">{{
            $t("agent.operations")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="members"
        :label="$t('agent.userNumber')"
        width="200"
      >
        <template #default="{ row }">
          <span
            style="color: #1890ff; cursor: pointer"
            @click="toshowPreview(row)"
            >{{ row.members }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        :label="$t('agent.remarkNoQuote')"
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
        :label="$t('agent.lastUpdateTime')"
        width="200"
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
      v-model="tagConfigurationPopup"
      :title="addNewEdits ? $t('agent.addContent') : $t('agent.editContent')"
      width="800px"
      @close="handleClose"
      :center="true"
    >
      <AddAndEditTags
        v-if="tagConfigurationPopup"
        :opRow="opRowitem"
        @submitBtn="submitBtn"
      ></AddAndEditTags>
    </el-dialog>

    <el-dialog
      v-model="userContent"
      :title="`【${currentTagName}】` + $t('agent.tagsUsingUser')"
      width="700px"
      :center="true"
    >
      <UserCountList v-if="userContent" :previewContent="previewContent" />
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ref } from "vue";
import AddAndEditTags from "./AddAndEditTags.vue";
import UserCountList from "./UserCountList.vue";
import { queryTagApi, deleteTagApi } from "@/api/agent/tagConfig.js";
import { ElMessageBox, ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  tagName: "",
});
const total = ref(5);
const loading = ref(false);
const opRowitem = ref({});
//{{$t('agent.search')}}
function handleQuery() {
  labelDetailsList();
}
//{{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.tagName = "";
}
// 新增弹窗
const addNewEdits = ref(false);
const tagConfigurationPopup = ref(false);
const addTagConfigurationPopup = () => {
  tagConfigurationPopup.value = !tagConfigurationPopup.value;
  opRowitem.value = {};
};
// 新增编辑弹窗确认
const submitBtn = () => {
  tagConfigurationPopup.value = false;
  addNewEdits.value = false;
  labelDetailsList();
};
//用户数详情
const currentTagName = ref("");
const userContent = ref(false);
const previewContent = ref();
const toshowPreview = (item) => {
  if (item.members > 0) {
    currentTagName.value = item.tagName;
    previewContent.value = item;
    userContent.value = !userContent.value;
  } else {
    proxy.$modal.msgWarning(i18n.global.t("agent.haveNoUser"));
  }
};
// 编辑传参
const editMain = (row) => {
  opRowitem.value = row;
  tagConfigurationPopup.value = true;
};
//关闭弹窗清空数据
const handleClose = () => {
  tagConfigurationPopup.value = false;
};
// 删除
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("agent.isDeleteData"))
    .then(() => {
      deleteTagApi(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.deleteSuccessfully"),
        });
        // getCount();
        labelDetailsList();
      });
    })
    .catch(() => {});
};
//表格数据
const tableData = ref([]);
// 列表
const labelDetailsList = async () => {
  try {
    let res = await queryTagApi(queryParams.value);
    tableData.value = res.records;
    tableData.value.forEach((item) => {
      item.id = BigInt(item.id).toString();
    });
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};

// 分页
function getList() {
  loading.value = true;
  queryTagApi(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.records || [];
      total.value = res.total;
    })
    .catch((err) => {
      loading.value = false;
    });
}

onMounted(() => {
  labelDetailsList();
});
</script>

<style lang="scss" scoped></style>
