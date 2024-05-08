<template>
  <div class="app-container">
    <div class="statistics">
      <div class="total-number">
        <div>{{ $t("operation.tip211") }}</div>
        <div>{{ objCount.ipCount }}</div>
      </div>
      <div class="total-number">
        <div>{{ $t("operation.user") }}</div>
        <div>{{ objCount.accountCount }}</div>
      </div>
      <div class="total-number">
        <div>{{ $t("operation.tip212") }}</div>
        <div class="click" @click="toShowAddusers(true)">+</div>
      </div>
      <div class="total-number">
        <div>{{ $t("operation.tip213") }}</div>
        <div class="click" @click="toShowAddWhite(true)">+</div>
      </div>
    </div>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item label="IP :" prop="ipAddress">
        <el-input
          v-model="queryParams.ip"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.user1')" prop="userName">
        <el-input
          v-model="queryParams.account"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("operation.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("operation.reset")
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格内容 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="ip"
        :label="$t('operation.IPAdress2')"
        width="180"
      />
      <el-table-column
        prop="account"
        :label="$t('operation.userPerson')"
        width="180"
      />
      <el-table-column
        prop="remark"
        :label="$t('operation.remark')"
        width="180"
      />
      <el-table-column
        prop="createTime"
        :label="$t('operation.tip215')"
        sortable
        width="180"
      />
      <el-table-column
        prop="expirationTime"
        :label="$t('operation.Expiration')"
        sortable
        width="280"
      />
      <el-table-column
        prop="createBy"
        :label="$t('operation.addaperson')"
        width="180"
      />
      <el-table-column
        prop="status"
        :label="$t('operation.status')"
        width="180"
      >
        <template #default="scope">
          <el-tag type="danger" v-if="scope.row.status == 1">{{
            $t("operation.disabled")
          }}</el-tag>
          <el-tag type="success" v-else>{{ $t("operation.Opening") }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateBy"
        :label="$t('operation.tip198')"
        width="180"
      />
      <el-table-column
        prop="updateTime"
        :label="$t('operation.tip201')"
        sortable
        width="180"
      />
      <el-table-column
        :label="$t('operation.operate')"
        align="center"
        width="220"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            type="success"
            size="small"
            v-if="scope.row.status == '1'"
            @click="disableBtn(scope.row)"
            >{{ $t("operation.turnOn") }}</el-button
          >
          <el-button
            type="danger"
            size="small"
            v-else
            @click="disableBtn(scope.row)"
            >{{ $t("operation.Disable") }}</el-button
          >
          <el-button type="primary" size="small" @click="editMain(scope.row)">{{
            $t("operation.edit")
          }}</el-button>
          <el-button type="danger" size="small" @click="delBtn(scope.row.id)">{{
            $t("operation.delete")
          }}</el-button>
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
  </div>
  <el-dialog
    v-model="showAddWhite"
    width="700px"
    @close="handleClose"
    :title="typeAdd == 1 ? $t('operation.tip213') : $t('operation.tip216')"
    :center="true"
  >
    <showAddWhitelist
      v-if="showAddWhite"
      :opRow="opRow"
      :typeAdd="typeAdd"
      @submitBtn="submitBtn"
    ></showAddWhitelist>
  </el-dialog>
  <el-dialog
    v-model="showAddUsers"
    width="700px"
    @close="handleClose"
    :title="$t('operation.tip212')"
    :center="true"
  >
    <addUsers
      v-if="showAddUsers"
      :opRow="opRow"
      :typeUserAdd="typeUserAdd"
      @submitBtn="submitBtn"
    ></addUsers>
  </el-dialog>
</template>
<script setup>
import { onMounted, ref } from "vue";
import showAddWhitelist from "./showAddWhitelist.vue";
import addUsers from "./addUsers.vue";
import {
  getWhiteListConfig,
  delWhite,
  upWhiteStatus,
  getIpAccountCount,
} from "@/api/operation/resource";
import { ElMessageBox, ElMessage } from "element-plus";
import i18n from "@/i18n";

const queryParams = ref({
  ip: "",
  account: "",
  pageNum: 1,
  pageSize: 10,
});
const objCount = ref({});
const opRow = ref({});
const typeAdd = ref(1);
const total = ref(5);
const tableData = ref([]);
const loading = ref(false);
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getWhiteList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.ip = "";
  queryParams.value.account = "";
  getWhiteList();
}
// 添加使用者
const showAddUsers = ref(false);
const toShowAddusers = (n) => {
  showAddUsers.value = n;
  console.log(showAddUsers.value);
};
const editMain = (row) => {
  typeAdd.value = 2;
  showAddWhite.value = true;
  opRow.value = row;
};
// 添加白名单
const showAddWhite = ref(false);
const toShowAddWhite = (n) => {
  showAddWhite.value = n;
  typeAdd.value = 1;
  console.log(showAddWhite.value);
};
const submitBtn = (type) => {
  console.log("showAddWhite");
  showAddWhite.value = false;
  showAddUsers.value = false;
  if (type == 1) {
    getWhiteList();
    getCount();
  }
};
// 关闭弹窗
const handleClose = () => {
  showAddWhite.value = false;
  showAddUsers.value = false;
};
onMounted(() => {
  getWhiteList();
  getCount();
});
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("operation.tip44"))
    .then(() => {
      delWhite(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("operation.deleteSuccess"),
        });

        getCount();
        getWhiteList();
      });
    })
    .catch(() => {});
};
const disableBtn = (row) => {
  let txt =
    row.status == 0
      ? i18n.global.t("operation.tip119")
      : i18n.global.t("operation.tip118");
  ElMessageBox.confirm(txt)
    .then(() => {
      upWhiteStatus({ id: row.id, status: row.status == 0 ? 1 : 0 }).then(
        () => {
          ElMessage({
            type: "success",
            message: i18n.global.t("operation.operatSuccess"),
          });

          getWhiteList();
        }
      );
    })
    .catch(() => {});
};
const getWhiteList = async () => {
  try {
    let res = await getWhiteListConfig(queryParams.value);
    console.log(res, "ref.data.records");
    tableData.value = res.records;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
const getCount = async () => {
  try {
    let res = await getIpAccountCount();
    objCount.value = res;
  } catch (e) {
    console.log(e);
  }
};
//分页
function getList() {
  loading.value = true;
  getWhiteListConfig(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.records || [];
      total.value = res.total;
    })
    .catch((err) => {
      loading.value = false;
    });
  console.log(tableData.value);
}
</script>

<style lang="scss" scoped>
.statistics {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  .total-number {
    width: 195px;
    height: 67px;
    background-color: #f2f2f2;
    text-align: center;
    font-size: 13px;
    border-radius: 8px;
    div {
      padding-top: 13px;
      line-height: 15px;
    }
    .click {
      cursor: pointer;
    }
  }
}
</style>
