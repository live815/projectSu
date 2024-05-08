<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.founder')" prop="founder">
        <el-input
          v-model="queryParams.createBy"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.MaintTitle')" prop="maintainTitle">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.status2')" prop="status">
        <el-select
          v-model="queryParams.status"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in conditions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.tip198')" prop="lastOperator">
        <el-input
          v-model="queryParams.updateBy"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.creattime2')" prop="">
        <el-date-picker
          v-model="registerTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          @change="handleChange"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.tip199')" prop="">
        <el-date-picker
          v-model="maintenanceTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          @change="handleChange"
          style="width: 380px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.tip200')" prop="">
        <el-date-picker
          v-model="endingTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          @change="handleChange"
          style="width: 380px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.tip201')" prop="">
        <el-date-picker
          v-model="operatingTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          @change="handleChange"
          style="width: 380px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button icon="Plus" type="danger" :opRow="{}" @click="addMain">{{
          $t("operation.add")
        }}</el-button>
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
        prop="createBy"
        :label="$t('operation.founder')"
        width="180"
      />
      <el-table-column
        prop="createTime"
        :label="$t('operation.creattime')"
        sortable
        width="180"
      />
      <el-table-column
        prop="point"
        :label="$t('operation.maintport')"
        width="180"
      >
        <template #default="scope">
          <div class="type-col" v-if="scope.row.point != '0,1,2,3'">
            <span class="type" v-if="scope.row.point.includes('0')">web</span>
            <span class="type" v-if="scope.row.point.includes('1')">H5</span>
            <span class="type" v-if="scope.row.point.includes('2')">{{
              $t("operation.Android")
            }}</span>
            <span class="type" v-if="scope.row.point.includes('3')">ios</span>
          </div>
          <span v-else>{{ $t("operation.all") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        :label="$t('operation.MaintTitle')"
        width="180"
      >
        <template #default="{ row }">
          <div class="content-box" v-html="row.title"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        :label="$t('operation.tip202')"
        width="180"
      >
        <template #default="{ row }">
          <div class="content-box" v-html="row.content"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        :label="$t('operation.tip192')"
        sortable
        width="180"
      />
      <el-table-column
        prop="endTime"
        :label="$t('operation.tip193')"
        sortable
        width="180"
      />
      <el-table-column
        prop="status"
        :label="$t('operation.status')"
        width="180"
      >
        <template #default="scope">
          <el-tag type="warning" v-if="scope.row.status == 0">{{
            $t("operation.tip203")
          }}</el-tag>
          <el-tag type="success" v-if="scope.row.status == 1">{{
            $t("operation.tip204")
          }}</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 2">{{
            $t("operation.tip205")
          }}</el-tag>
          <el-tag type="info" v-if="scope.row.status == 3">{{
            $t("operation.tip206")
          }}</el-tag>
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
          <div v-if="scope.row.status != 0 && scope.row.status != 3">
            <el-button
              type="success"
              size="small"
              v-if="scope.row.status == '2'"
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
            <el-button
              type="primary"
              size="small"
              @click="editMain(scope.row)"
              >{{ $t("operation.edit") }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="delBtn(scope.row.id)"
              >{{ $t("operation.delete") }}</el-button
            >
          </div>
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
    <editMainTain v-if="isShow" @submitBtn="submitBtn" :opRow="opRow" />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { defaultTime, shortcuts } from "@/utils/config";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  getSiteList,
  delSite,
  upWhiteStatus,
  getMaintainStatus,
} from "@/api/operation/resource";
import editMainTain from "./editMainTain.vue";
import i18n from "@/i18n";

const isShow = ref(false);

const select = ref("1");
const queryParams = ref({
  status: "",
  point: "",
  pageNum: 1,
  pageSize: 10,
  createBy: "",
  updateBy: "",
  title: "",
  syncEndTime: "",
  betStartTime: "",
  betEndTime: "",
  payOutStartTime: "",
  payOutEndTime: "",
  syncStartTime: "",
});
const opRow = ref({});
const total = ref(5);
const dateRange = ref([]);
const queryRef = ref();
const tableData = ref([]);
const loading = ref(false);
const conditions = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: 0,
    label: i18n.global.t("operation.tip203"),
  },
  {
    value: 1,
    label: i18n.global.t("operation.tip204"),
  },
  {
    value: 2,
    label: i18n.global.t("operation.tip205"),
  },
  {
    value: 3,
    label: i18n.global.t("operation.tip206"),
  },
];

const disableBtn = (row) => {
  let txt =
    row.status == 0
      ? i18n.global.t("operation.tip119")
      : i18n.global.t("operation.tip118");
  ElMessageBox.confirm(txt)
    .then(() => {
      getMaintainStatus({ id: row.id, status: row.status == 1 ? 2 : 1 }).then(
        () => {
          ElMessage({
            type: "success",
            message: i18n.global.t("operation.operatSuccess"),
          });

          getDataList();
        }
      );
    })
    .catch(() => {});
};
const startime = ref("");
const endtime = ref("");
onMounted(() => {
  getDataList();
});
const editMain = (row) => {
  isShow.value = true;
  opRow.value = row;
};
//选择时间类型
const handleSelect = (val) => {
  dateRange.value = [];
  select.value = val;
};
const submitBtn = (type) => {
  isShow.value = false;
  if (type == 1) {
    getDataList();
  }
};
const addMain = () => {
  isShow.value = true;
  opRow.value = {};
};
//列表
const getDataList = async () => {
  try {
    let res = await getSiteList(queryParams.value);
    // console.log(res, "ref.data.records");
    tableData.value = res.records;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
const handleChange = () => {
  // console.log(queryParams.value.betStartTime, "111");
  if (!dateRange.value) {
    startime.value = "";
    endtime.value = "";
  } else {
    queryParams.value.betStartTime = "";
    queryParams.value.betEndTime = "";
    queryParams.value.payOutStartTime = "";
    queryParams.value.payOutEndTime = "";
    queryParams.value.syncStartTime = "";
    queryParams.value.syncStartTime = "";
    startime.value = dateRange.value[0];
    endtime.value = dateRange.value[1];
    if (select.value === "1") {
      queryParams.value.betStartTime = startime.value;
      queryParams.value.betEndTime = endtime.value;
    }
    if (select.value === "2") {
      queryParams.value.payOutStartTime = startime.value;
      queryParams.value.payOutEndTime = endtime.value;
    }
    if (select.value === "3") {
      queryParams.value.syncStartTime = startime.value;
      queryParams.value.syncEndTime = endtime.value;
    }
  }
  console.log(queryParams.value.betStartTime, "1");
  console.log(queryParams.value.betEndTime, "2");
  console.log(queryParams.value.payOutStartTime, "3");
  console.log(queryParams.value.payOutEndTime, "4");
  console.log(queryParams.value.syncStartTime, "5");
  console.log(queryParams.value.syncStartTime, "6");
};
/** 搜索按钮操作 */
const registerTime = ref([]); //创建时间
const maintenanceTime = ref([]); //维护开始时间
const endingTime = ref([]); // 维护结束时间
const operatingTime = ref([]); //最后操作时间
const handleQuery = () => {
  //创建时间
  if (registerTime.value) {
    queryParams.value.startCreateTime = registerTime.value[0];
    queryParams.value.endCreateTime = registerTime.value[1];
  } else {
    queryParams.value.startCreateTime = null;
    queryParams.value.endCreateTime = null;
  }
  //维护开始时间
  if (maintenanceTime.value) {
    queryParams.value.startMaintainStartTime = maintenanceTime.value[0];
    queryParams.value.endMaintainStartTime = maintenanceTime.value[1];
  } else {
    queryParams.value.startMaintainStartTime = null;
    queryParams.value.endMaintainStartTime = null;
  }
  // 维护结束时间
  if (endingTime.value) {
    queryParams.value.startMaintainEndTime = endingTime.value[0];
    queryParams.value.endMaintainEndTime = endingTime.value[1];
  } else {
    queryParams.value.startMaintainStartTime = null;
    queryParams.value.endMaintainEndTime = null;
  }
  //最后操作时间
  if (operatingTime.value) {
    queryParams.value.startUpdateTime = operatingTime.value[0];
    queryParams.value.endUpdateTime = operatingTime.value[1];
  } else {
    queryParams.value.startUpdateTime = null;
    queryParams.value.endUpdateTime = null;
  }
  getDataList();
};
/** 重置按钮操作 */
const resetQuery = () => {
  queryParams.value.createBy = "";
  queryParams.value.title = "";
  queryParams.value.status = "";
  queryParams.value.updateBy = "";
  queryParams.value.startCreateTime = "";
  queryParams.value.endCreateTime = "";
  queryParams.value.startMaintainStartTime = "";
  queryParams.value.startMaintainEndTime = "";
  queryParams.value.startUpdateTime = "";
  queryParams.value.endUpdateTime = "";
  queryParams.value.endMaintainStartTime = "";
  queryParams.value.endMaintainEndTime = "";
  registerTime.value = [];
  maintenanceTime.value = [];
  operatingTime.value = [];
  endingTime.value = [];
  getDataList();
};
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("operation.tip44"))
    .then(() => {
      delSite(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("operation.deleteSuccess"),
        });
        getDataList();
      });
    })
    .catch(() => {});
};
//分页
function getList() {
  loading.value = true;
  getSiteList(queryParams.value)
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

<style scoped lang="scss">
.type-col .type:last-child::after {
  content: "";
}
.content-box {
  max-height: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.type::after {
  content: ",";
}
.box-head {
  :deep(.el-input-group--append > .el-input__wrapper) {
    display: none !important;
  }
  :deep(.el-input-group__append) {
    padding: 0;
  }
  :deep() .el-input-group--append > .el-input__wrapper,
  .el-input-group--append > .el-input__inner {
    display: none !important;
  }
}
:deep() {
  .el-tag.el-tag--warning {
    --el-tag-bg-color: rgba(236, 128, 128, 0.5);
    --el-tag-text-color: #a54500;
  }
  .el-tag.el-tag--info {
    --el-tag-bg-color: rgba(128, 131, 236, 0.5);
    --el-tag-text-color: #2278f5;
  }
}
</style>
