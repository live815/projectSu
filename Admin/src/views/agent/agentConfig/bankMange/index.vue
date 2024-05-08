<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.bankName')">
        <el-input
          v-model="queryParams.bankName"
          :placeholder="$t('agent.pleaseInput')"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.bankIDQuote')">
        <el-input
          v-model="queryParams.id"
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
          @click="addBankInformation(null)"
          >{{ $t("agent.add") }}</el-button
        >
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
      <el-table-column prop="id" :label="$t('agent.bankID')" width="220" />
      <el-table-column
        prop="bankName"
        :label="$t('agent.bankNameNoQuote')"
        width="220"
      />
      <el-table-column prop="status" :label="$t('agent.status')" width="220">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @click="changeSwitch(row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        :label="$t('agent.remarkNoQuote')"
        width="220"
      />
      <el-table-column
        prop="updateBy"
        :label="$t('agent.lastUpdateBy')"
        width="220"
      />
      <el-table-column prop="updateTime" :label="$t('agent.lastUpdateTime')" />
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
      v-model="bankInformationPopup"
      :title="
        materialLine
          ? $t('agent.addBankInformation')
          : $t('agent.editBankInformation')
      "
      width="800px"
      @close="handleClose"
      :center="true"
    >
      <AddAndEditBankManagement
        v-if="bankInformationPopup"
        :opRow="opRowitem"
        @submitBtn="submitBtn"
      ></AddAndEditBankManagement>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ref, onMounted, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import AddAndEditBankManagement from "./AddAndEditBankManagement.vue";
import {
  queryBankManagementApi,
  deleteBankManagementApi,
  bankManagementStatusApi,
} from "@/api/agent/bankManagement.js";

const { proxy } = getCurrentInstance();
const queryParams = ref({
  bankName: "",
  id: "",
  pageNum: 1,
  pageSize: 10,
  tenantId: 0,
});
const total = ref(5);
const loading = ref(false);
const opRowitem = ref({});
//查询
function handleQuery() {
  bankManagementList();
}
//重置
function resetQuery() {
  queryParams.value.bankName = "";
  queryParams.value.id = "";
  bankManagementList();
}
//新增弹窗
const materialLine = ref(false);
const bankInformationPopup = ref(false);
const addBankInformation = () => {
  bankInformationPopup.value = !bankInformationPopup.value;
  opRowitem.value = {};
};
// 新增编辑弹窗确认
const submitBtn = () => {
  bankInformationPopup.value = false;
  materialLine.value = false;
  bankManagementList();
};
// 编辑传参
const editMain = (row) => {
  opRowitem.value = row;
  bankInformationPopup.value = true;
};
//关闭弹窗清空数据
const handleClose = () => {
  bankInformationPopup.value = false;
};
//开关
function changeSwitch(row) {
  proxy.$modal
    .confirms(
      i18n.global.t("agent.areYouSureChangeSwitchStatus"),
      i18n.global.t("agent.tips")
    )
    .then(() => {
      bankManagementStatusApi({
        id: row.id,
        status: row.status,
      }).then((res) => {
        bankManagementList();
        proxy.$modal.msgSuccess(i18n.global.t("agent.statusChangeSuccess"));
      });
    })
    .catch(() => {
      row.status = row.status === "0" ? "1" : "0";
    });
}
// 删除
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("agent.isDeleteData"))
    .then(() => {
      deleteBankManagementApi(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.deleteSuccessfully"),
        });
        // getCount();
        bankManagementList();
      });
    })
    .catch(() => {});
};
const tableData = ref([]);
// 列表
const bankManagementList = async () => {
  try {
    let res = await queryBankManagementApi(queryParams.value);
    tableData.value = res.rows;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
// 分页
function getList() {
  loading.value = true;
  queryBankManagementApi(queryParams.value)
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
  bankManagementList();
});
</script>

<style lang="scss" scoped></style>
