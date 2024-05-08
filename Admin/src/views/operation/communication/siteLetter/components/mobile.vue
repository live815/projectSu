<template>
  <div class="app-container">
    <el-form :model="form" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.title')" prop="headline">
        <el-input
          v-model="form.title"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 200px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.accounttype')" prop="noticeType">
        <el-select
          v-model="form.accountType"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in accountTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.status')" prop="status">
        <el-select
          v-model="form.status"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in statust"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.founder')" prop="creator">
        <el-input
          v-model="form.createBy"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 200px"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("operation.search")
        }}</el-button>
        <el-button icon="Refresh" @click="reSet">{{
          $t("operation.reset")
        }}</el-button>
        <el-button icon="Plus" type="warning" @click="toShowAdd(true, 1)">{{
          $t("operation.add")
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格内容 -->
    <el-table :data="dataList" style="width: 100%">
      <el-table-column prop="title" :label="$t('operation.title')" width="180">
        <template #default="{ row }">
          <div class="content-box" v-html="row.title"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        :label="$t('operation.content')"
        width="360"
      >
        <template #default="{ row }">
          <div class="content-box" v-html="row.content"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="accountType"
        :label="$t('operation.accounttype')"
        width="180"
      >
        <template #default="scope">
          <div v-if="scope.row.accountType == 0">
            {{ $t("operation.Allmembers") }}
          </div>
          <el-tag v-if="scope.row.accountType == 1">{{
            $t("operation.designatmember")
          }}</el-tag>
          <el-tag v-if="scope.row.accountType == 2">{{
            $t("operation.Fullagentline")
          }}</el-tag>
          <el-tag v-if="scope.row.accountType == 3">{{
            $t("operation.tip4")
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sendTime"
        :label="$t('operation.sendTime')"
        sortable
        width="180"
      />
      <el-table-column
        prop="level"
        :label="$t('operation.tip28')"
        width="180"
      />
      <el-table-column
        prop="status"
        :label="$t('operation.status')"
        width="180"
      >
        <template #default="scope">
          <el-tag class="ml-2" type="success" v-if="scope.row.status == 2">
            {{ $t("operation.sended") }}</el-tag
          >
          <el-tag class="ml-2" type="danger" v-if="scope.row.status == 1">
            {{ $t("operation.sending") }}</el-tag
          >
          <el-tag class="ml-2" type="warning" v-if="scope.row.status == 0">
            {{ $t("operation.Unsent") }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="createBy"
        :label="$t('operation.founder')"
        width="180"
      />
      <el-table-column
        prop="createTime"
        :label="$t('operation.creattime')"
        width="180"
      />
      <el-table-column
        prop="name"
        :label="$t('operation.operate')"
        width="180"
        fixed="right"
        align="center"
      >
        <template #default="scope">
          <el-button
            class="ml-2"
            type="primary"
            size="small"
            @click="toShowView(true, scope.row.id)"
            >{{ $t("operation.Check") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="paginationData.pageNum"
      v-model:limit="paginationData.pageSize"
      @pagination="changePage"
      style="height: 40px"
    />
    <el-dialog v-model="isShowAdd" :title="$t('operation.add')" width="1000px">
      <AddLetter
        v-if="isShowAdd"
        @refreshList="refreshList"
        :letterType="letterType"
      ></AddLetter>
    </el-dialog>
    <el-dialog
      v-model="isShowView"
      :title="$t('operation.Check')"
      width="1000px"
    >
      <ViewLetter :viewLetterId="viewLetterId" v-if="isShowView"></ViewLetter>
    </el-dialog>
  </div>
</template>
<script setup>
import ViewLetter from "./ViewLetter.vue";
import AddLetter from "./AddLetter.vue";
import { ref } from "vue";
import { getLetterListApi } from "@/api/operation/announcement.js";
import { Base64 } from "js-base64";
import i18n from "@/i18n";

const form = ref({
  accountType: "",
  createBy: "",
  gameType: "",
  letType: "1",
  level: "",
  orderColumn: "",
  pageNum: 1,
  pageSize: 10,
  status: "",
  title: "",
});
// 获取列表数据
const dataList = ref([]);
const getList = async (pageNum, pageSize) => {
  if (!pageNum) {
    paginationData.value.pageNum = 1;
    form.value.pageNum = 1;
  } else {
    form.value.pageNum = pageNum;
  }
  if (pageSize) {
    form.value.pageSize = pageSize;
  } else {
    form.value.pageSize = paginationData.value.pageSize;
  }
  getLetterListApi(form.value).then((res) => {
    dataList.value = res.records;
    dataList.value.forEach((item) => {
      item.content = Base64.decode(item.content);
    });
    total.value = res.total;
  });
};
onMounted(() => {
  getList();
});
// 分页器
const paginationData = ref({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(5);
const changePage = () => {
  console.log("分页器");
  // console.log(paginationData.value);
  getList(paginationData.value.pageNum, paginationData.value.pageSize);
};

// 添加弹窗开关
const isShowAdd = ref(false);
const letterType = ref(0);
const toShowAdd = (n, Type) => {
  letterType.value = Type;
  isShowAdd.value = n;
};
// 查看弹窗开关
const viewLetterId = ref(null);
const isShowView = ref(false);
const toShowView = (show, id) => {
  viewLetterId.value = id;
  isShowView.value = show;
  console.log(viewLetterId.value);
};
// 弹窗关闭重新获取数据
const refreshList = () => {
  paginationData.pageNum = 1;
  isShowAdd.value = false;
  getList();
};
// 重置
const reSet = () => {
  form.value = {
    accountType: "",
    createBy: "",
    gameType: "",
    letType: "1",
    level: "",
    orderColumn: "",
    pageNum: 1,
    pageSize: 10,
    status: "",
    title: "",
  };
  getList();
};
/** 搜索按钮操作 */
function handleQuery() {
  paginationData.value.pageNum = 1;
  getList();
}
const statust = [
  {
    value: 0,
    label: i18n.global.t("operation.Unsent"),
  },
  {
    value: 1,
    label: i18n.global.t("operation.sending"),
  },
  {
    value: 2,
    label: i18n.global.t("operation.sended"),
  },
];
const accountTypes = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: 0,
    label: i18n.global.t("operation.Allmembers"),
  },
  {
    value: 1,
    label: i18n.global.t("operation.designatmember"),
  },
  {
    value: 2,
    label: i18n.global.t("operation.Fullagentline"),
  },
  {
    value: 3,
    label: i18n.global.t("operation.tip4"),
  },
];
</script>

<style scoped>
.content-box {
  max-height: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
