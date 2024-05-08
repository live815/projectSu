<template>
  <div class="animation-dialog app-container" v-loading="loading">
    <el-dialog
      v-model="dialogVisible"
      width="70%"
      :title="param === 'PM_SPORTS' ?  $t('live.PMdata') : $t('live.dawnData')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        label-width=""
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item
              :label="$t('live.event')"
              prop="leagueName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.leagueName"
                :placeholder="$t('live.pleaseEnter')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
           <el-col :span="6">
            <el-form-item
              :label="$t('live.EventID2')"
              prop="targetLeagueId"
              class="full-width"
            >
              <el-input
                v-model="queryParams.targetLeagueId"
                :placeholder="$t('live.pleaseEnter')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('live.sportsType')" prop="sportsType">
              <el-select
                v-model="queryParams.sportsType"
                :placeholder="$t('live.pleaseChose')"
                clearable
              >
                <el-option
                  v-for="dict in pm_sports_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('live.hometeam')"
              prop="mainName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.mainName"
                :placeholder="$t('live.pleaseEnter')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('live.awayteam')"
              prop="cusName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.cusName"
                :placeholder="$t('live.pleaseEnter')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('live.Matchtime')">
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
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('live.correlatime')">
              <el-date-picker
                v-model="dateRangetwo"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetimerange"
                range-separator="-"
                :start-placeholder="$t('live.begintime')"
                :end-placeholder="$t('live.endtime')"
                @change="handleChangeTwo"
                :default-time="defaultTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">{{
                $t("live.Inquire")
              }}</el-button>
              <el-button icon="Refresh" @click="resetQuery">{{
                $t("live.reset")
              }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 表格数据 -->
      <el-table :data="roleList">
        <el-table-column
          :label="$t('live.EventID')"
          prop="targetLeagueId"
          :show-overflow-tooltip="true"
          align="center"
          width="120px"
        />
        <el-table-column
          :label="$t('live.Kickofftime')"
          prop="gameTime"
          :show-overflow-tooltip="true"
          align="center"
          width="200px"
        />
        <el-table-column
          :label="$t('live.event')"
          prop="leagueName"
          :show-overflow-tooltip="true"
          align="center"
          width="180px"
        >
          <template #default="scope">
            <div  v-if="scope.row.leagueName">
              {{ scope.row.leagueName }}
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.hometeam')"
          prop="mainName"
          :show-overflow-tooltip="true"
          align="center"
          width="150px"
        >
          <template #default="scope">
            <div v-if="scope.row.mainName">
              {{ scope.row.mainName }}
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('live.awayteam')"
          prop="cusName"
          align="center"
          :show-overflow-tooltip="true"
          width="160px"
        >
          <template #default="scope">
            <div v-if="scope.row.cusName">{{ scope.row.cusName }}</div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.sportsType1')"
          prop="sportsTypeName"
          align="center"
          :show-overflow-tooltip="true"
          width="130px"
        >
          <template #default="scope">
            <div v-if="scope.row.sportsTypeName">
              {{ scope.row.sportsTypeName }}
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.correlatime1')"
          prop="relationTime"
          align="center"
          :show-overflow-tooltip="true"
          width="180px"
        >
          <template #default="scope">
            <div v-if="scope.row.relationTime">
              {{ scope.row.relationTime }}
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.videoSource')"
          prop=""
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="{ row }">
            <div v-if="row.liveUrl || row.liveM3u8 || row.liveFlv" class="checkBox" @click="openAnimationDia(row)">
              {{  param === 'PM_SPORTS' ? $t("live.PMvideosource") :  $t("live.dawnVideosource") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('live.operate')" align="center" width="120">
          <template #default="scope">
            <div>
              <el-button
                size="small"
                type="primary"
                v-if="!scope.row.hasRelation"
                @click="changeStatus(scope.row, 'sure')"
              >
                {{ $t("live.DetermineAssociat") }}</el-button
              >
              <el-button
                size="small"
                type="danger"
                v-if="scope.row.hasRelation"
                @click="changeStatus(scope.row, 'lift')"
                >{{ $t("live.Disassociate") }}</el-button
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
    </el-dialog>
    <AnimationDialog
      v-model:openAnimation="openAnimation"
      v-model:cloneRow="cloneRow"
      :videoType="videoType"
      v-if="openAnimation"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import { getPmList, assoCiatMap } from "@/api/live/scheduleplan.js";
import AnimationDialog from "./AnimationDialog.vue";
import { defaultTime } from "@/utils/config";
import i18n from "@/i18n";

const props = defineProps(["open", "leagueId",'param']);
const emit = defineEmits(["update:open", "onreFrash"]);
const { proxy } = getCurrentInstance();
const { pm_game_status, pm_video_status, pm_sports_type } = proxy.useDict(
  "pm_game_status",
  "pm_video_status",
  "pm_sports_type"
);
const total = ref(0);
const roleList = ref([]);
const loading = ref(true);
const openAnimation = ref(false);
const dateRange = ref([]);
const dateRangetwo = ref([]);
const videoType = computed(()=>{
  return props.param === 'PM_SPORTS' ? 'PM' :  i18n.global.t("live.dawn")
})
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const data = reactive({
  cloneRow: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fbLeagueId: props.leagueId,
    resourceCode: props.param
  },
});
const { queryParams, cloneRow } = toRefs(data);

getList();
/** 查询角色列表 */
function getList() {
  loading.value = true;
  getPmList(queryParams.value)
    .then((response) => {
      roleList.value = response.list || [];
      total.value = response.total;
      loading.value = false;
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false;
    });
}
function goVideo(url) {
  const newPageUrl = `/player?src=${url}`; // 替换为Vue组件的路由路径
  if (url.includes("m3u8") || url.includes("flv")) {
    window.open(newPageUrl, "_blank");
  } else {
    window.open(url);
  }
}

// 点击PM视频源
function openAnimationDia(row) {
  // const obj = {};
  // obj.liveUrl = row.liveUrl;
  // obj.liveFlv = row.liveFlv;
  // obj.liveM3u8 = row.liveM3u8;
  // obj.animationUrl = row.animationUrl;
  // obj.animationFlv = row.animationFlv;
  // obj.animationM3u8 = row.animationM3u8;

  cloneRow.value = JSON.parse(JSON.stringify(row));
  openAnimation.value = true;
}
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.gameTimeStart = "";
    queryParams.value.gameTimeEnd = "";
  } else {
    queryParams.value.gameTimeStart = dateRange.value[0];
    queryParams.value.gameTimeEnd = dateRange.value[1];
  }
}
function handleChangeTwo() {
  if (
    (dateRangetwo.value && !dateRangetwo.value.length) ||
    dateRangetwo.value == null
  ) {
    queryParams.value.relationStartTime = "";
    queryParams.value.relationEndTime = "";
  } else {
    queryParams.value.relationStartTime = dateRangetwo.value[0];
    queryParams.value.relationEndTime = dateRangetwo.value[1];
  }
}

function cancel() {
  dialogVisible.value = false;
  emit("onreFrash");

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
  handleChangeTwo();
  handleQuery();
}
// 关联和解除关联
function changeStatus(row, icon) {
  if (icon == "sure") {
    proxy.$modal
      .confirm(i18n.global.t("live.tip175"))
      .then(function () {
        return assoCiatMap({
          fbLeagueId: props.leagueId,
          targetLeagueId: row.targetLeagueId,
          resourceCode: props.param,
        });
      })
      .then(() => {
        getList();
        emit("onreFrash");
        proxy.$modal.msgSuccess(i18n.global.t("live.Associatsuccess"));
      })
      .catch(() => {});
  } else if (icon == "lift") {
    proxy.$modal
      .confirm(i18n.global.t("live.tip176"))
      .then(function () {
        return assoCiatMap({
          fbLeagueId: props.leagueId,
          targetLeagueId: null,
          resourceCode:props.param,
        });
      })
      .then(() => {
        getList();
        emit("onreFrash");
        proxy.$modal.msgSuccess(i18n.global.t("live.tip177"));
      })
      .catch(() => {});
  }
}
</script>

<style lang="scss" scoped>
.animation-dialog {
  :deep() {
    .el-dialog__body {
      padding-top: 0;
    }
    .el-dialog__title {
      font-weight: 600;
    }
    
  }
}
.checkBox {
  color: #1890ff;
}

</style>
