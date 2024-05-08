<template>
  <div class="app-container" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('schedule.contestID')" prop="gameId" class="full-width">
            <el-input
              v-model="queryParams.gameId"
              :placeholder="$t('member.pleaseInput')"
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('schedule.contestName')" prop="leagueName" class="full-width">
            <el-input
              v-model="queryParams.leagueName"
              :placeholder="$t('member.pleaseInput')"
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('schedule.leagueId')" prop="leagueId" class="full-width">
            <el-input
              v-model="queryParams.leagueId"
              :placeholder="$t('member.pleaseInput')"
              class="full-width"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('schedule.sportsType')" prop="sportsType" class="full-width">
            <el-select
              v-model="queryParams.sportsType"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in video_sports_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('schedule.mainName')" prop="mainName" class="full-width">
            <el-input
              v-model="queryParams.mainName"
              :placeholder="$t('member.pleaseInput')"
              class="full-width"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('schedule.cusName')" prop="cusName" class="full-width">
            <el-input
              v-model="queryParams.cusName"
              :placeholder="$t('member.pleaseInput')"
              class="full-width"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('schedule.contestStatus')" prop="gameStatus" class="full-width">
            <el-select
              v-model="queryParams.gameStatus"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in gameStatusList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('schedule.contestTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChange"
              class="full-width"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <!-- <el-table-column
        v-for="(column, index) in columnList"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :sortable="column.sortable"
        :show-overflow-tooltip="true"
        :align="column.align"
      >
        <template #default="{row}">
          <span v-if="column.prop==='gameStatus'">22</span>
          <span v-else-if="column.prop==='sportsType'">33</span>
          <span v-else>{{ row[column.prop] }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('schedule.sportsTypeNoQuote')"
        prop="sportsTypeName"
        width="120"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        :label="$t('schedule.contestTimeNoQuote')"
        prop="gameTime"
        align="center"
        :show-overflow-tooltip="true"
        width="180px"
      >
        <template #default="{ row }">
          <span>{{ row.gameTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('schedule.contestStatusNoQuote')"
        prop="gameStatus"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ switchStatus(row.gameStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('schedule.leagueName')"
        prop="leagueNameLocal"
        align="center"
        :show-overflow-tooltip="true"
        width="180px"
      >
        <template #default="{ row }">
          <span>{{ row.leagueNameLocal ? row.leagueNameLocal : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('schedule.leagueIdNoQuote')"
        prop="leagueId"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        :label="$t('schedule.mainNameNoQuote')"
        prop="mainNameLocal"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.mainNameLocal ? row.mainNameLocal : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('schedule.cusNameNoQuote')"
        prop="cusNameLocal"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.cusNameLocal ? row.cusNameLocal : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('schedule.contestIDNoQuote')"
        prop="gameId"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        :label="$t('schedule.videoSource')"
        prop=""
        align="center"
        width="160"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <p
            class="checkBox"
            @click="openAnimationPm(row.pmVideo,'PM')"
            v-if="row.pmVideo&&(row.pmVideo?.liveUrl||row.pmVideo?.liveFlv||row.pmVideo?.liveM3u8||row.pmVideo?.animationUrl||row.pmVideo?.animationFlv||row.pmVideo?.animationM3u8)"
            >{{$t('schedule.PMData')}}</p
          >
           <p
            class="checkBox"
            @click="openAnimationPm(row.dawnVideo,$t('live.dawn'))"
            v-if="row.dawnVideo&&(row.dawnVideo?.liveUrl||row.dawnVideo?.liveFlv||row.dawnVideo?.liveM3u8||row.dawnVideo?.animationUrl||row.dawnVideo?.animationFlv||row.dawnVideo?.animationM3u8)"
            >{{$t('live.dawnData')}}</p
          >

          <p
            class="checkBox"
            @click="openAnimationPm(row.namiVideo,'FB')"
            v-if="row.namiVideo"
            >{{$t('schedule.FBData')}}</p
          >
          <span v-if="!row.namiVideo && !row.pmVideo">-</span>
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

    <AnimationDialog
      v-model:openAnimation="openAnimation"
      v-model:cloneRow="cloneRow"
      :videoType="videoType"
      v-if="openAnimation"
    />
  </div>
</template>

<script setup name="Video">
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getScheduleLit } from "@/api/schedule/list";
import AnimationDialog from "./components/AnimationDialog.vue";
import { defaultTime, shortcuts } from "@/utils/config";

const { proxy } = getCurrentInstance();
const { video_sports_type } = proxy.useDict("video_sports_type");
const queryRef = ref(null);
const queryParams = ref({
  gameId: null,
  leagueName: null,
  leagueId: null,
  sportsType: null,
  mainName: null,
  resourceCode: null,
  cusName: null,
  gameStatus: null,
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const gameStatusList = ref([
  {
    label: i18n.global.t("risk.all"),
    value: "",
  },
  {
    label: i18n.global.t("schedule.gameNotStartYet"),
    value: 0,
  },
  {
    label: i18n.global.t("schedule.gameStart"),
    value: 1,
  },
  {
    label: i18n.global.t("schedule.gameOver"),
    value: 2,
  },
]);
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const cloneRow = ref(null);
const openAnimation = ref(false);
const isFirstLoad = ref(true);
const videoType = ref('')

const switchStatus = (status) => {
  const item = gameStatusList.value.find((item) => item.value === status);
  if (item) return item.label;
  return "-";
};
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
function getList() {
  loading.value = true;
  return getScheduleLit(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch(() => {
      loading.value = false;
    });
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
  handleQuery();
}

function openAnimationPm(row,type) {
  cloneRow.value = JSON.parse(JSON.stringify(row));
  openAnimation.value = true;
  videoType.value = type
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.checkBox {
  color: #1890ff;
}
</style>
