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
        />
      </el-form-item>

      <el-form-item :label="$t('live.Livebroadcastroomname1')" prop="roomTitle">
        <el-input
          v-model="queryParams.roomTitle"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Livebroadcastroomtype1')" prop="roomStyle">
        <el-select
          v-model="queryParams.roomStyle"
          :placeholder="$t('live.pleaseChose')"
          clearable
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
        />
      </el-form-item>

      <el-form-item :label="$t('live.Relatcompetit1')" prop="associatedContest">
        <el-input
          v-model="queryParams.associatedContest"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Livestatus1')" prop="status" clearable>
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('live.pleaseChose')"
          clearable
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
        <el-button
          icon="download"
          @click="handleExport"
          class="download-btn"
          type="primary"
          v-hasPermi="['live:end:export']"
          >{{ $t("live.export") }}</el-button
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
      />
      <el-table-column
        :label="$t('live.Starttime')"
        align="center"
        prop="playStartTime"
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.playStartTime">{{
            scope.row.playStartTime
          }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.endbroadcastTime')"
        align="center"
        prop="shutDownTime"
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.shutDownTime">{{
            scope.row.shutDownTime
          }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.LivebroadcastType')"
        prop="roomStyle"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      >
        <template #default="scope">
          <div v-if="scope.row.roomStyle == '1'">
            {{ $t("live.soccer") }}
          </div>
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
        :label="$t('live.anchor')"
        prop="presenterName"
        :show-overflow-tooltip="true"
        align="center"
        width="150"
      />

      <el-table-column
        :label="$t('live.Livebroadcastroomname')"
        prop="roomTitle"
        align="center"
        width="150"
      />

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
      <el-table-column :label="$t('live.heat')" prop="heat" align="center" />
      <el-table-column
        :label="$t('live.reservatNumber')"
        prop="reserveNum"
        align="center"
      />
      <el-table-column
        :label="$t('live.anchorpushNumber')"
        prop="pushOrder"
        align="center"
        width="100px"
      />
      <el-table-column
        :label="$t('live.tip54')"
        prop="memberShowOrder"
        align="center"
        width="100px"
      />
      <el-table-column :label="$t('live.tip55')" prop="" align="center">
        <template #default="scope">
          <span>{{ scope.row.enterNum==''||undefined||null?'0':scope.row.enterNum }}</span>
          <span>/</span
          >
          <span>{{ scope.row.viewNum==''||undefined||null?'0':scope.row.viewNum }}</span>
         
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.tip56')"
        prop="speakNum"
        align="center"
      />
      <el-table-column :label="$t('live.tip57')" prop="" align="center">
        <template #default="scope">
          <span>{{ scope.row.giveGiftNum==''||undefined||null?'0':scope.row.giveGiftNum }}</span>
          <span>/</span
          >
          <span>{{ scope.row.giveGiftAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('live.tip58')" prop="" align="center">
        <template #default="scope">
          <span>{{ scope.row.showOrderNum==''||undefined||null?'0':scope.row.showOrderNum }}</span>
          <span>/</span>
          <span>{{ scope.row.showOrderAmount==''||undefined||null?'0':scope.row.showOrderAmount }}</span>
         
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.tip59')"
        prop="stadgname"
        align="center"
      >
        <template #default="scope">
          <span>{{ scope.row.followOrderNum==''||undefined||null?'0':scope.row.followOrderNum }}</span>
          <span>/</span
          >
          <span>{{ scope.row.followOrderAmount==''||undefined||null?'0':scope.row.followOrderAmount }}</span>
         
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.tip60')"
        prop=""
        align="center"
        width="100px"
      >
        <template #default="scope">
          <span>{{ scope.row.betView==''||undefined||null?'0':scope.row.betView }}</span>
          <span>/</span
          >
          <span>{{ scope.row.betTotalCount==''||undefined||null?'0':scope.row.betTotalCount }}</span>
         
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('live.tip61')"
        prop=""
        align="center"
        width="100px"
      >
        <template #default="scope">
          <span>{{ scope.row.betTotalNum==''||undefined||null?'0':scope.row.betTotalNum }}</span>
          <span>/</span
          >
          <span>{{ scope.row.betTotalAmount==''||undefined||null?'0':scope.row.betTotalAmount }}</span>
        
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Paywatch')"
        prop="payTotalAmount"
        align="center"
      />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script setup>
import { getEndStreamList } from "@/api/live/stream.js";
import { defaultTime } from "@/utils/config";
import i18n from "@/i18n";
import { onMounted } from "vue";
const dateRange = ref([]);
const { proxy } = getCurrentInstance();

const showSearch = ref(true);
const total = ref(0);
const tableData = ref([]);
const loading = ref(false);
const options2 = [
  {
    value: "3",
    label: i18n.global.t("live.Forcdownload"),
  },
  {
    value: "4",
    label: i18n.global.t("live.LivebroadcastEnd"),
  },
];
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
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
});
const isFirstLoad = ref(true);
const { queryParams } = toRefs(data);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
function getList() {
  loading.value = true;
  return getEndStreamList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
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
// 导出
function handleExport() {
  proxy.download(
    "/system/live/stream/export",
    {...queryParams.value},
    `${i18n.global.t("live.tip62")}${new Date().toLocaleDateString()}.xlsx`
  );
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
</style>
