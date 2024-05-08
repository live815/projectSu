<template>
  <div class="" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.tip126')" prop="planCode">
        <el-input
          v-model="queryParams.planCode"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.expert')" prop="expertName">
        <el-input
          v-model="queryParams.expertName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.sportsType1')" prop="sportsType">
        <el-select
          v-model="queryParams.sportsType"
          multiple
          :placeholder="$t('live.pleaseChose')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="item in video_sports_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('live.event1')" prop="leagueName">
        <el-input
          v-model="queryParams.leagueName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.hometeam1')" prop="mainName">
        <el-input
          v-model="queryParams.mainName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.awayteam1')" prop="cusName">
        <el-input
          v-model="queryParams.cusName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Breaknews1')" prop="planResult">
        <el-select
          v-model="queryParams.planResult"
          clearable
          :placeholder="$t('live.pleaseChose')"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('live.tip127')" prop="status">
        <el-select
          v-model="queryParams.status"
          clearable
          :placeholder="$t('live.pleaseChose')"
          style="width: 240px"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('live.creatTime')">
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
          v-hasPermi="['expert:plan:list']"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
        <el-button
          type="primary"
          icon="Plus"
          v-hasPermi="['expert:plan:add']"
          @click="editInfo({}, 'add')"
          >{{ $t("live.IncreaseRevelat") }}</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.serialNumber')"
        prop="sortNum"
        :show-overflow-tooltip="true"
        align="center"
        width="80px"
      />

      <el-table-column
        :label="$t('live.tip1266')"
        prop="planCode"
        :show-overflow-tooltip="true"
        align="center"
        width="200"
      />

      <el-table-column
        :label="$t('live.expert1')"
        prop="expertName"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.sportsType1')"
        prop="sportsType"
        :show-overflow-tooltip="true"
        align="center"
        width="120"
      >
        <template #default="scope">
          <span class="checkBox">{{
            scope.row.sportsType === 1 ? "足球" : "篮球"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('live.event')"
        prop="leagueName"
        align="center"
        width="180px"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('live.hometeam')"
        prop="mainName"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('live.awayteam')"
        prop="cusName"
        align="center"
        :show-overflow-tooltip="true"
      />
      <!-- <el-table-column :label="$t('live.tip1288')" prop="" align="center" /> -->
      <el-table-column
        :label="$t('live.tip115')"
        prop="betName"
        align="center"
        width="120"
      />
      <el-table-column
        :label="$t('live.tip117')"
        prop="recommendation"
        align="center"
        width="120px"
      >
      </el-table-column>
      <el-table-column
        :label="$t('live.breakheadlines')"
        prop="planTitle"
        align="center"
      />
      <el-table-column
        :label="$t('live.Breakdetails')"
        prop="planDesc"
        align="center"
        width="180"
      >
        <template #default="scope">
          <div class="breakDetail">{{ scope.row.planDesc }}</div></template
        >
      </el-table-column>
      <el-table-column
        :label="$t('live.Breaknews')"
        prop="planResult"
        align="center"
      />
      <el-table-column
        :label="$t('live.breakTime')"
        prop="createTime"
        align="center"
        width="180"
      />
      <el-table-column :label="$t('live.tip127')" prop="status" align="center">
        <template #default="scope">
          <div v-if="scope.row.status == '0'">
            {{ $t("live.Noresultsyet") }}
          </div>
          <div v-if="scope.row.status == '1'">
            {{ $t("live.Theresults") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Numberfollowers')"
        prop="followNum"
        align="center"
      >
        <template #default="scope">
          <span class="text-color" @click="handleClick(scope.row)">{{
            scope.row.followNum
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('live.operate')" align="center" width="150">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="success"
              v-hasPermi="['expert:plan:query']"
              @click="editInfo(scope.row, 'edit')"
              >{{ $t("live.edit") }}</el-button
            >

            <el-button
              size="small"
              type="danger"
              v-hasPermi="['expert:plan:delete']"
              @click="handleDelete(scope.row.id)"
              >{{ $t("live.delete") }}</el-button
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
    <FollowDialog v-model:open="open" v-if="open" :rowData="rowData"></FollowDialog>
    <AddexpertDialog
      ref="expertDialog"
      v-model:opendialog="opendialog"
      v-model:title="title"
      @onchange="onchange"
    ></AddexpertDialog>
    <GameplayDialog
      v-model:gamedialog="gamedialog"
      v-if="gamedialog"
      @closegameDialog="closegameDialog"
      @nextDialog="nextDialog"
    ></GameplayDialog>
    <CreateDialog
      v-model:creatdialog="creatdialog"
      v-if="creatdialog"
      @closeCreate="closeCreate"
      @onrefresh="getList"
    ></CreateDialog>
    <EditDialog
      v-model:editdialog="editdialog"
      v-if="editdialog"
      :ids="id"
      @onrefresh="getList"
      @openGameplay="openGameplay"
    ></EditDialog>
  </div>
</template>
<script setup>
import useFBStore from "@/store/modules/fb";
import { getBreaknewsList, delBreaknewsInfo } from "@/api/live/expertmange";
import FollowDialog from "./components/FollowDialog.vue";
import AddexpertDialog from "./components/AddexpertDialog.vue";
import GameplayDialog from "./components/GameplayDialog.vue";
import EditDialog from "./components/EditDialog.vue";
import CreateDialog from "./components/CreateDialog.vue";
import { defaultTime } from "@/utils/config";
import i18n from "@/i18n";
import { onMounted } from "vue";
const fbStore = useFBStore();
fbStore.getStatistical();
const dateRange = ref([]);
const { proxy } = getCurrentInstance();
const { video_sports_type } = proxy.useDict("video_sports_type");
const expertDialog = ref(null);
const showSearch = ref(true);
const total = ref(0);
const open = ref(false);
const opendialog = ref(false);
const creatdialog = ref(false);
const editdialog = ref(false);
const gamedialog = ref(false);
const loading = ref(true);
const title = ref("");
const rowData = ref()
const options2 = [
  {
    value: "0",
    label: i18n.global.t("live.Noresultsyet"),
  },
  {
    value: "1",
    label: i18n.global.t("live.Theresults"),
  },
];
const options = [
  {
    value: "0",
    label: i18n.global.t("live.red"),
  },
  {
    value: "1",
    label: i18n.global.t("live.black"),
  },
  {
    value: "1",
    label: i18n.global.t("live.go"),
  },
];
const isFirstLoad = ref(true);
const tableData = ref([]);
const id = ref("");
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
});
const { queryParams } = toRefs(data);
onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
/** 查询角色列表 */
function getList() {
  loading.value = true;
  return getBreaknewsList(queryParams.value)
    .then((response) => {
      tableData.value = response.rows;
      total.value = response.total;
      loading.value = false;
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false;
    });
}
// 时间选择器
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleChange();
  handleQuery();
}
// 点击跟单次数跳转
function handleClick(row) {
  open.value = true;
  rowData.value = row
}
// 新增编辑弹窗
function editInfo(row, icon) { 
  if (icon == "edit") {
    id.value = row.id;
    editdialog.value = true;
  } else if (icon == "add") {
    title.value = i18n.global.t("live.AddnewRevelat");
    opendialog.value = true;
  }
}
// 新增打开游戏玩法与赔率
function onchange() {
  opendialog.value = false;
  gamedialog.value = true;
}
// 编辑打开游戏玩法啊与赔率
function openGameplay() {
  gamedialog.value = true;
  // console.log(expertDialog.value.handleCancle(), "000");
  expertDialog.value.init();
}
/** 删除按钮操作 */
function handleDelete(id) {
  proxy.$modal
    .confirm(i18n.global.t("live.tip1271"))
    .then(function () {
      return delBreaknewsInfo(id);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("live.tip35"));
    })
    .catch(() => {});
}

// 推荐玩法赔率返回
function closegameDialog(val) {
  if (val == "cancle") {
    opendialog.value = true;
    gamedialog.value = false;
  } else if (val == "close") {
    gamedialog.value = false;
  }
}
function nextDialog() {
  gamedialog.value = false;
  creatdialog.value = true;
}
// 创建弹窗返回
function closeCreate(val) {
  if (val == "cancle") {
    // creatdialog.value = false;
    gamedialog.value = true;
  } else if (val == "close") {
    creatdialog.value = false;
  }
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
.text-color {
  color: #1890ff;
}
.breakDetail {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
