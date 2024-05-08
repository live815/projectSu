<!-- 问题分类 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.categoryName')" prop="classifyName">
        <el-input
          v-model="queryParams.classifyName"
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
          @click="newQuestionCategoryPopup(null)"
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
        prop="classifyName"
        :label="$t('agent.categoryNameNoQuote')"
        width="260"
      />
      <el-table-column
        prop="remark"
        :label="$t('agent.remarkNoQuote')"
        width="260"
      >
        <template #default="{ row }">
          {{ row.remark || "-" }}
        </template>
      </el-table-column>
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
          {{ row.updateBy || "-" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        :label="$t('agent.lastUpdateTimeQuot')"
      >
        <template #default="{ row }">
          {{ row.updateTime || "-" }}
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
      v-model="questionCategoryPopup"
      :title="addNewEdits ? $t('agent.addContent') : $t('agent.editContent')"
      width="800px"
      @close="handleClose"
      :center="true"
    >
      <QuestionPopup
        v-if="questionCategoryPopup"
        :opRow="opRowitem"
        @submitBtn="submitBtn"
      ></QuestionPopup>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ref } from "vue";
import { queryCategoryApi, deleteCategoryApi } from "@/api/agent/helpConfig.js";
import QuestionPopup from "./QuestionPopup.vue";
import { ElMessageBox, ElMessage } from "element-plus";

const queryParams = ref({
  classifyName: "",
  updateBy: "",
  pageNum: 1,
  pageSize: 10,
  tenantId: 0,
});
const total = ref(5);
const tableData = ref([]);
const loading = ref(false);
const opRowitem = ref({});
//{{$t('agent.search')}}
function handleQuery() {
  questionCategoryList();
}
//{{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.classifyName = "";
  questionCategoryList();
}
// 新增弹窗
const addNewEdits = ref(false);
const questionCategoryPopup = ref(false);
const newQuestionCategoryPopup = () => {
  questionCategoryPopup.value = !questionCategoryPopup.value;
  opRowitem.value = {};
};
// 新增编辑弹窗确认
const submitBtn = () => {
  questionCategoryPopup.value = false;
  addNewEdits.value = false;
  questionCategoryList();
};
// 编辑传参
const editMain = (row) => {
  opRowitem.value = row;
  questionCategoryPopup.value = true;
};
//关闭弹窗清空数据
const handleClose = () => {
  questionCategoryPopup.value = false;
};
// 删除
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("agent.isDeleteData"))
    .then(() => {
      deleteCategoryApi(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.deleteSuccessfully"),
        });
        // getCount();
        questionCategoryList();
      });
    })
    .catch(() => {});
};
// 列表
const questionCategoryList = async () => {
  try {
    let res = await queryCategoryApi(queryParams.value);
    tableData.value = res.rows;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
// 分页
function getList() {
  loading.value = true;
  queryCategoryApi(queryParams.value)
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
  questionCategoryList();
});
</script>

<style lang="scss" scoped></style>
