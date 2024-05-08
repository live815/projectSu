<template>
  <div class="" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.anchor1')" prop="presenterName">
        <el-input
          v-model="queryParams.presenterName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 220px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Livebroadcastroomname1')" prop="roomTitle">
        <el-input
          v-model="queryParams.roomTitle"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 220px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Livebroadcastroomtype1')" prop="roomStyle">
        <el-select
          v-model="queryParams.roomStyle"
          :placeholder="$t('live.pleaseChose')"
          clearable
          style="width: 220px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        :label="$t('live.Associatleagues1')"
        prop="associatedLeague"
      >
        <el-input
          v-model="queryParams.associatedLeague"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 220px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Relatcompetit1')" prop="associatedContest">
        <el-input
          v-model="queryParams.associatedContest"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 200px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Livestatus1')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('live.pleaseChose')"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('live.Starttime1')">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('live.begintime')"
          :end-placeholder="$t('live.endtime')"
          @change="handleChange"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
          v-hasPermi="['live:stream:list']"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.serialNumber')"
        prop="sortNum"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.Livestatus')"
        prop="status"
        align="center"
      >
        <template #default="scope">
          <div class="disable smallbtn" v-if="scope.row.status == 1">
            {{ $t("live.Reservat") }}
          </div>
          <div class="start smallbtn" v-if="scope.row.status == 2">
            {{ $t("live.Livebroadcast") }}
          </div>
          <div class="disable smallbtn" v-if="scope.row.status == 3">
            {{ $t("live.Forcdownload") }}
          </div>
          <div class="disable smallbtn" v-if="scope.row.status == 4">
            {{ $t("live.LivebroadcastEnd") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Weights')"
        prop="weight"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.anchor')"
        prop="presenterName"
        :show-overflow-tooltip="true"
        align="center"
        width="150"
      />

      <el-table-column
        :label="$t('live.Livebroadcastroomtype')"
        prop="roomStyle"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      >
        <template #default="scope">
          <div v-if="scope.row.roomStyle == '0'">
            {{ $t("live.all") }}
          </div>
          <div v-if="scope.row.roomStyle == '1'">{{ $t("live.soccer") }}</div>
          <div v-if="scope.row.roomStyle == '2'">{{ $t("live.Gaming") }}</div>
          <div v-if="scope.row.roomStyle == '3'">
            {{ $t("live.basketball") }}
          </div>
          <div v-if="scope.row.roomStyle == '4'">
            {{ $t("live.entertainment") }}
          </div>
          <div v-if="scope.row.roomStyle == '5'">
            {{ $t("live.satellitelivebroad") }}
          </div>
          <div v-if="scope.row.roomStyle == '6'">
            {{ $t("live.other") }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('live.Livebroadcastroomname')"
        prop="roomTitle"
        :show-overflow-tooltip="true"
        align="center"
        width="150"
      >
        <template #default="scope">
          <span class="checkBox">{{ scope.row.roomTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('live.Associatleagues')"
        align="center"
        prop="associatedLeague"
        width="150"
      >
      </el-table-column>

      <el-table-column
        :label="$t('live.Relatcompetit')"
        prop="associatedContest"
        align="center"
        width="150"
      >
        <template #default="scope">
          <span v-if="scope.row.associatedContest">{{
            scope.row.associatedContest
          }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Starttime')"
        align="center"
        prop="playStartTime"
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.playStartTime">{{
            parseTime(scope.row.playStartTime)
          }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.enteringNumber')"
        prop="enterNum"
        align="center"
      />
      <el-table-column
        :label="$t('live.viewNumber')"
        prop="viewNum"
        align="center"
      />
      <el-table-column :label="$t('live.heat')" prop="heat" align="center" />
      <el-table-column
        :label="$t('live.reservatNumber')"
        prop="reserveNum"
        align="center"
      />
      <el-table-column
        :label="$t('live.Paywatch')"
        prop="payTotalAmount"
        align="center"
      />
      <el-table-column :label="$t('live.operate')" align="center" width="260">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['live:stream:down']"
              v-if="scope.row.status == 2"
              @click="changeStatus(scope.row, 'down')"
              >{{ $t("live.Forcdownload") }}</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['live:stream:delete']"
              @click="changeStatus(scope.row, 'del')"
              v-if="scope.row.status == 1"
              >{{ $t("live.Deleteappoint") }}</el-button
            >
            <el-button
              size="small"
              type="success"
              v-hasPermi="['live:stream:edit']"
              @click="changeWeight(scope.row)"
              >{{ $t("live.Changeweight") }}</el-button
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
    />
    <el-dialog
      v-model="dialogVisible"
      :title="$t('live.Changeweight')"
      width="30%"
      align-center
      :before-close="cancel"
    >
      <el-form :model="form" ref="queryRef" :inline="true" :rules="rules">
        <el-row>
          <el-col>
            <el-form-item
              :label="$t('live.Weightwo')"
              prop="weight"
              class="full-width"
            >
              <el-input v-model="form.weight" class="full-width"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t("live.cancel") }}</el-button>
          <el-button type="primary" @click="submit">
            {{ $t("live.sure") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  getStreamList,
  deleteStreamList,
  updateStreamList,
  downStreamList,
} from "@/api/live/stream.js";
import { defaultTime } from "@/utils/config";
import i18n from "@/i18n";
import { onMounted } from "vue";
const dateRange = ref([]);
const { proxy } = getCurrentInstance();
const showSearch = ref(true);
const dialogVisible = ref(false);

const options = [
  {
    value: "0",
    label: i18n.global.t("live.all"),
  },
  {
    value: "1",
    label: i18n.global.t("live.soccer"),
  },
  {
    value: "2",
    label: i18n.global.t("live.Gaming"),
  },
  {
    value: "3",
    label: i18n.global.t("live.basketball"),
  },
  {
    value: "4",
    label: i18n.global.t("live.entertainment"),
  },
  {
    value: "5",
    label: i18n.global.t("live.satellitelivebroad"),
  },
  {
    value: "6",
    label: i18n.global.t("live.other"),
  },
];

const options2 = [
  {
    value: "1",
    label: i18n.global.t("live.Reservat"),
  },
  {
    value: "2",
    label: i18n.global.t("live.Livebroadcast"),
  },
];

const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const isFirstLoad = ref(true);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
  rules: {
    roleKey: [
      {
        required: true,
        message: i18n.global.t("live.tip48"),
        trigger: "blur",
      },
    ],
  },
});
const { queryParams, form, rules } = toRefs(data);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
/** 查询角色列表 */
function getList() {
  loading.value = true;
  return getStreamList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
      console.log(res, "111");
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false;
    });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  dateRange.value = [];
  handleChange();
  handleQuery();
}
// 时间选择处理
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
/** 下播 */
function changeStatus(row, icon) {
  if (icon == "down") {
    proxy.$modal
      .confirm(i18n.global.t("live.tip49"))
      .then(function () {
        return downStreamList({ currentRoomCode: row.roomCode, id: row.id });
      })
      .then(() => {
        getList();
        proxy.$modal.msgSuccess(i18n.global.t("live.tip50"));
      })
      .catch(() => {});
  } else if (icon == "del") {
    proxy.$modal
      .confirm(i18n.global.t("live.tip51"))
      .then(function () {
        return deleteStreamList(row.id);
      })
      .then(() => {
        getList();
        proxy.$modal.msgSuccess(i18n.global.t("live.tip52"));
      })
      .catch(() => {});
  }
}
// 更改权重
function changeWeight(row) {
  form.value = JSON.parse(JSON.stringify(row));
  dialogVisible.value = true;
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  const obj = toRaw(form.value);
  updateStreamList({ weight: obj.weight, id: obj.id }).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("live.tip53"));
    dialogVisible.value = false;
    handleQuery();
  });
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  white-space: pre-wrap;
}
.checkBox {
  color: #6290ff;
}
.smallbtn {
  width: 60px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
}
.start {
  background-color: #18a8ff;
}
.disable {
  background-color: #ff5018;
}
.el-form--inline .el-form-item {
  margin-right: 20px;
}
</style>
