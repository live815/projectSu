<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.agentAccountQuote')" prop="agentName">
        <el-input
          v-model="queryParams.agentName"
          :placeholder="$t('agent.pleaseEnterAgentAccount')"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.domainNameQuot')"
        ><el-input
          v-model="queryParams.domainName"
          :placeholder="$t('agent.pleaseEnterDomainName')"
      /></el-form-item>
      <el-form-item :label="$t('agent.statusQuot')" prop="">
        <el-select
          v-model="queryParams.status"
          clearable
          :placeholder="$t('agent.pleaseSelectAStatus')"
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
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("agent.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("agent.reset")
        }}</el-button>
        <el-button
          type="warning"
          icon="Plus"
          @click="showAddDomainName(null)"
          >{{ $t("agent.add") }}</el-button
        >
        <!-- <el-button type="success" icon="Download" @click="handleExport()">{{
          $t("agent.exportImportTemplate")
        }}</el-button> -->
        <el-button type="info" icon="Upload" @click="isShowImportTemplate()">{{
          $t("agent.import")
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="date"
        :label="$t('agent.handle')"
        width="220"
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
        prop=""
        :label="$t('agent.serialNumber')"
        type="index"
        width="180"
      />
      <el-table-column prop="domainName" :label="$t('agent.domainName')" />
      <el-table-column prop="agentName" :label="$t('agent.useAProxy')" />
      <el-table-column prop="status" :label="$t('agent.status')">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @click="changeSwitch(row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" :label="$t('agent.updateTime')" />
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
      v-model="isShowAddDomainName"
      :title="
        materialLine ? $t('agent.addDomainName') : $t('agent.editDomainName')
      "
      width="32%"
      @close="handleClose"
      :center="true"
    >
      <AddEditDomainName
        v-if="isShowAddDomainName"
        :opRow="opRowitem"
        @submitBtn="submitBtn"
      />
    </el-dialog>
    <el-dialog
      v-model="importTemplate"
      :title="$t('agent.exportImportTemplate')"
      width="40%"
      @close="handleClose"
      :center="true"
    >
      <ExportImportTemplate />
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ref, onMounted, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import AddEditDomainName from "./components/AddEditDomainName.vue";
import ExportImportTemplate from "./components/ExportImportTemplate.vue";
import {
  queryProxyDomainNamePoolApi,
  deleteProxyDomainNamePoolApi,
  proxyDomainNamePoolSwitchApi,
} from "@/api/agent/promotionConfig/promotionConfig.js";

const { proxy } = getCurrentInstance();

const queryParams = ref({
  domainName: "",
  status: "",
  pageNum: 1,
  pageSize: 10,
});
const total = ref(5);
const loading = ref(false);
const opRowitem = ref({});
const tableData = ref([]);
// 代理状态列表
const statusList = ref([
  {
    value: "",
    label: i18n.global.t("agent.all"),
  },
  {
    value: 1,
    label: i18n.global.t("agent.enable"),
  },
  {
    value: 0,
    label: i18n.global.t("agent.disable"),
  },
]);
// 列表
const domainNamePoolManagementList = async () => {
  try {
    let res = await queryProxyDomainNamePoolApi(queryParams.value);
    tableData.value = res.rows;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => {
  domainNamePoolManagementList();
});
//查询
function handleQuery() {
  domainNamePoolManagementList();
}
//重置
function resetQuery() {
  queryParams.value.agentName = "";
  queryParams.value.domainName = "";
  queryParams.value.status = "";
}
// 导入
function importQuery() {}
// 新增弹窗
const materialLine = ref(false);
const isShowAddDomainName = ref(false);
const showAddDomainName = () => {
  isShowAddDomainName.value = !isShowAddDomainName.value;
  opRowitem.value = {};
};
// 新增编辑弹窗确认
const submitBtn = () => {
  isShowAddDomainName.value = false;
  materialLine.value = false;
  domainNamePoolManagementList();
};
// 编辑传参
const editMain = (row) => {
  opRowitem.value = row;
  isShowAddDomainName.value = true;
};
// 导入导出模板弹窗
const importTemplate = ref(false);
const isShowImportTemplate = () => {
  importTemplate.value = !importTemplate.value;
};
//关闭弹窗清空数据
const handleClose = () => {
  isShowAddDomainName.value = false;
};
// 分页
function getList() {
  loading.value = true;
  queryProxyDomainNamePoolApi(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch((err) => {
      loading.value = false;
    });
}
// 删除
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("agent.isDeleteData"))
    .then(() => {
      deleteProxyDomainNamePoolApi(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.deleteSuccessfully"),
        });
        // getCount();
        domainNamePoolManagementList();
      });
    })
    .catch(() => {});
};
//开关
function changeSwitch(row) {
  proxy.$modal
    .confirms(i18n.global.t("agent.switchPrompt"), i18n.global.t("agent.tips"))
    .then(() => {
      proxyDomainNamePoolSwitchApi({
        id: row.id,
        status: row.status,
      }).then((res) => {
        domainNamePoolManagementList();
        proxy.$modal.msgSuccess(i18n.global.t("agent.statusSwitchSuccessful"));
      });
    })
    .catch(() => {
      row.status = row.status == "0" ? 1 : 0;
    });
}
</script>

<style lang="scss" scoped></style>
