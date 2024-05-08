<template>
  <div>
    <!-- 筛选 -->
    <el-form :inline="true">
      <el-form-item :label="$t('agent.domainNameQuot')">
        <el-input v-model="requestData.domainName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="域名类型：">
        <el-select
          v-model="requestData.domainType"
          class="m-2"
          placeholder="Select"
        >
          <el-option
            v-for="item in domainTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item :label="$t('agent.statusQuot')">
        <el-select
          v-model="requestData.status"
          class="m-2"
          placeholder="Select"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="">
        <el-button type="primary" icon="Search" @click="query">{{
          $t("agent.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("agent.reset")
        }}</el-button>
        <el-button type="warning" icon="Plus" @click="showAdd(false)">{{
          $t("agent.add")
        }}</el-button>
        <el-button type="info" icon="Upload" @click="isShowImportTemplate()">{{
          $t("agent.import")
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="shortUrlList">
      <el-table-column
        prop="date"
        :label="$t('agent.handle')"
        width="180"
        align="center"
      >
        <template #default="{ row }">
          <el-button type="primary" @click="showAdd(true, row)">{{
            $t("agent.edit")
          }}</el-button>
          <el-button type="danger" @click="delBtn(row.id)">{{
            $t("agent.delete")
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="domainName"
        :label="$t('agent.domainName')"
        align="center"
      />
      <!-- <el-table-column prop="domainType" label="域名类型" align="center">
        <template #default="{ row }">
          {{ domainTypeMap[row.domainType] }}
        </template>
      </el-table-column> -->
      <el-table-column prop="status" :label="$t('agent.status')" align="center">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @change="updateStatus(row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        :label="$t('agent.updateTime')"
        align="center"
      />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="requestData.pageNum"
      v-model:limit="requestData.pageSize"
      @pagination="getData"
      style="height: 40px"
    />

    <el-dialog
      v-model="isShowAdd"
      :title="$t('agent.AddEditDomainName')"
      width="30%"
      :before-close="closeAdd"
    >
      <AddShortUrl
        :currentRow="currentRow"
        v-if="isShowAdd"
        @closeAdd="closeAdd"
      />
    </el-dialog>
    <el-dialog
      v-model="importTemplate"
      :title="$t('agent.exportImportTemplate')"
      width="40%"
      @close="handleClose"
      :center="true"
    >
      <ImportShortDomainName @handleClose="handleClose" />
    </el-dialog>
  </div>
</template>

<script setup>
import {
  getShortUrlList,
  delShortUrlApi,
  updateShortUrlStatusApi,
} from "@/api/agent/promotionConfig/promotionConfig.js";
import AddShortUrl from "./components/AddShortUrl.vue";
import ImportShortDomainName from "./components/ImportShortDomainName.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();

const requestData = ref({
  domainName: "",
  domainType: "",
  pageNum: 1,
  pageSize: 10,
  status: "",
});
const resetQuery = () => {
  requestData.value = {
    domainName: "",
    domainType: "",
    pageNum: 1,
    pageSize: 10,
    status: "",
  };
  getData();
};
const query = () => {
  requestData.value.pageNum = 1;
  getData();
};
onMounted(() => {
  getData();
});
const shortUrlList = ref([]);

// 获取数据
const getData = () => {
  getShortUrlList(requestData.value).then((res) => {
    shortUrlList.value = res.rows;
    total.value = res.total;
  });
};
//关闭弹窗清空数据
const handleClose = () => {
  importTemplate.value = false;
};
const total = ref(0);
// 新增弹窗
const isShowAdd = ref(false);
const showAdd = (boolean, val) => {
  isShowAdd.value = true;
  if (boolean) {
    currentRow.value = val;
  } else {
    currentRow.value = false;
  }
};
const closeAdd = () => {
  isShowAdd.value = false;
  getData();
};
// 导入导出模板弹窗
const importTemplate = ref(false);
const isShowImportTemplate = () => {
  importTemplate.value = !importTemplate.value;
};
// 编辑功能
const currentRow = ref(null);

// 开启禁用
const updateStatus = (val) => {
  proxy.$modal
    .confirms(i18n.global.t("agent.switchPrompt"), i18n.global.t("agent.tips"))
    .then(() => {
      let params = {
        id: null,
        status: null,
      };
      params.id = val.id;
      params.status = val.status;
      updateShortUrlStatusApi(params).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.updateSuccessfully"),
        });
      });
    })
    .catch(() => {
      val.status = val.status == "0" ? 1 : 0;
    });
};
// 删除
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("agent.isDeleteData"))
    .then(() => {
      delShortUrlApi(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.deleteSuccessfully"),
        });
        // getCount();
        getData();
      });
    })
    .catch(() => {});
};
// 下拉选项
// const domainTypeList = ref([
//   {
//     label: "全部",
//     value: "",
//   },
//   {
//     label: "QQ域名",
//     value: 0,
//   },
//   {
//     label: "微信域名",
//     value: 1,
//   },
// ]);

const statusList = ref([
  {
    label: i18n.global.t("agent.all"),
    value: "",
  },
  {
    label: i18n.global.t("agent.enable"),
    value: 1,
  },
  {
    label: i18n.global.t("agent.disable"),
    value: 0,
  },
]);
// const domainTypeMap = ref({
//   0: "QQ域名",
//   1: "微信域名",
//   2: "PC域名",
//   3: "H5域名",
//   4: "APP域名",
//   5: "APP下载地址",
// });
</script>

<style lang="scss" {row}d></style>
