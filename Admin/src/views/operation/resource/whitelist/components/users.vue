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
        prop="account"
        :label="$t('operation.userPerson')"
        width="220"
      />
      <el-table-column
        prop="remark"
        :label="$t('operation.remark')"
        width="220"
      />
      <el-table-column
        prop="ipCount"
        :label="$t('operation.tip214')"
        width="220"
      />
      <el-table-column
        prop="createBy"
        :label="$t('operation.founder')"
        width="220"
      />
      <el-table-column
        prop="createTime"
        :label="$t('operation.creattime')"
        sortable
        width="280"
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
            @click="disableUserBtn(scope.row)"
            >{{ $t("operation.turnOn") }}</el-button
          >
          <el-button
            type="danger"
            size="small"
            v-else
            @click="disableUserBtn(scope.row)"
            >{{ $t("operation.Disable") }}</el-button
          >
          <el-button type="primary" size="small" @click="editUser(scope.row)">{{
            $t("operation.edit")
          }}</el-button>
          <el-button
            type="danger"
            size="small"
            @click="delUserBtn(scope.row.id)"
            >{{ $t("operation.delete") }}</el-button
          >
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
    :title="$t('operation.tip213')"
  >
    <showAddWhitelist
      v-if="showAddWhite"
      :opRow="opRow"
      :typeAdd="typeAdd"
      @submitBtn="submitBtn"
    >
    </showAddWhitelist>
  </el-dialog>
  <el-dialog
    v-model="showAddUsers"
    width="700px"
    @close="handleClose"
    :title="$t('operation.tip212')"
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
import { ElMessageBox, ElMessage } from "element-plus";
import {
  setwhiteUserList,
  delWhiteUser,
  upWhiteUserStatus,
  getIpAccountCount,
} from "@/api/operation/resource";
import i18n from "@/i18n";

const queryParams = ref({
  account: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10,
});
const objCount = ref({});
const typeUserAdd = ref(1);
const total = ref(5);
const opRow = ref({});
const tableData = ref([]);
const loading = ref(false);
onMounted(() => {
  getUserList();
  getCount();
});
const getUserList = async () => {
  try {
    let res = await setwhiteUserList(queryParams.value);
    console.log(res, "ref.data.records");
    tableData.value = res.records;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
const editUser = (row) => {
  typeUserAdd.value = 2;
  showAddUsers.value = true;
  opRow.value = row;
};
// 添加使用者
const showAddUsers = ref(false);
const toShowAddusers = (n) => {
  showAddUsers.value = n;
  console.log(showAddUsers.value);
};
// 添加白名单
const showAddWhite = ref(false);
const toShowAddWhite = (n) => {
  showAddWhite.value = n;
  console.log(showAddWhite.value);
};
// 关闭弹窗
const handleClose = () => {
  showAddWhite.value = false;
  showAddUsers.value = false;
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getUserList();
};
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.account = "";
  getUserList();
}
//子传父 回调
const submitBtn = (type) => {
  console.log("showAddWhite");
  showAddUsers.value = false;
  showAddWhite.value = false;
  if (type == 1) {
    getUserList();
    getCount();
  }
};
const delUserBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("operation.tip44"))
    .then(() => {
      delWhiteUser(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("operation.deleteSuccess"),
        });
        getCount();
        getUserList();
      });
    })
    .catch(() => {});
};
const disableUserBtn = (row) => {
  let txt =
    row.status == 0
      ? i18n.global.t("operation.tip119")
      : i18n.global.t("operation.tip118");
  ElMessageBox.confirm(txt)
    .then(() => {
      upWhiteUserStatus({ id: row.id, status: row.status == 0 ? 1 : 0 }).then(
        () => {
          ElMessage({
            type: "success",
            message: i18n.global.t("operation.operatSuccess"),
          });
          getUserList();
        }
      );
    })
    .catch(() => {});
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
  setwhiteUserList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.records || [];
      total.value = res.total;
    })
    .catch((err) => {
      loading.value = false;
    });
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
