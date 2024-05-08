<template>
  <div class="">
    <el-dialog
      v-model="dialogVisible"
      width="50%"
      :title="$t('live.IncreaseRevelat')"
      center
      @close="handleCancle"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        label-width=""
      >
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item
              :label="$t('live.sportsType')"
              prop="sportsType"
              class="full-width"
            >
              <el-select
                v-model="queryParams.sportsType"
                :placeholder="$t('live.pleaseChose')"
                clearable
              >
                <el-option
                  v-for="item in video_sports_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$t('live.gameStatus')"
              prop="gameStatus"
              class="full-width"
            >
              <el-select
                v-model="queryParams.gameStatus"
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
          </el-col>

          <el-col :span="8">
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
          <el-col :span="8">
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
          <el-col :span="8">
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
          <el-col :span="12">
            <el-form-item :label="$t('live.creatTime')">
              <el-date-picker
                v-model="dateRange"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetimerange"
                range-separator="-"
                :start-placeholder="$t('live.begintime')"
                :end-placeholder="$t('live.endtime')"
                @change="handleChange"
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
      <el-table
        :data="roleList"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column
          :label="$t('live.CompeTime')"
          prop="gameTime"
          align="center"
        >
          <template #default="scope">
            <div v-if="scope.row.gameTime">{{ scope.row.gameTime }}</div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.gameStatus')"
          prop="gameStatus"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template #default="scope">
            <div v-if="scope.row.gameStatus == '0'">
              {{ $t("live.Notstartyet") }}
            </div>
            <div v-if="scope.row.gameStatus == '1'">
              {{ $t("live.matchstart") }}
            </div>
            <div v-if="scope.row.gameStatus == '2'">
              {{ $t("live.matchsend") }}
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.event')"
          align="center"
          prop="leagueName"
          width="180"
        >
          <template #default="scope">
            {{ scope.row.leagueNameLocal }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.hometeam')"
          align="center"
          prop="mainName"
        >
          <template #default="scope">
            {{ scope.row.mainNameLocal }}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('live.awayteam')"
          prop="cusName"
          align="center"
        >
          <template #default="scope">
            <div v-if="scope.row.cusNameLocal">
              {{ scope.row.cusNameLocal }}
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-btn">
        <el-button @click="handleCancle">{{ $t("live.cancel") }}</el-button>
        <el-button v-if="btnShow" type="primary" @click="handleNext">{{
          $t("live.NextStep")
        }}</el-button>
      </div>

      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { getScheduleLit } from "@/api/schedule/list";
import useFBStore from "@/store/modules/fb";
import i18n from "@/i18n";
const fbStore = useFBStore();
const { proxy } = getCurrentInstance();
const { video_sports_type } = proxy.useDict("video_sports_type");
const emit = defineEmits(["update:opendialog", "onchange"]);
const props = defineProps(["opendialog"]);
const loading = ref(true);
const dateRange = ref([]);
const total = ref(0);
const roleList = ref([]);
const btnShow = ref(false);
const dialogVisible = computed({
  get() {
    return props.opendialog;
  },
  set(val) {
    emit("update:opendialog", val);
  },
});

const options2 = ref([
  {
    label: i18n.global.t("live.all"),
    value: "",
  },
  {
    label: i18n.global.t("live.Notstartyet"),
    value: 0,
  },
  {
    label: i18n.global.t("live.matchstart"),
    value: 1,
  },
  {
    label: i18n.global.t("live.matchsend"),
    value: 2,
  },
]);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
});
const { queryParams } = toRefs(data);

getList();
/** 查询角色列表 */
function getList() {
  loading.value = true;
  getScheduleLit(queryParams.value)
    .then((response) => {
      roleList.value = response.rows || [];
      total.value = response.total;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;

  getList();
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
// 选择赛事
function handleCurrentChange(val) {
  if (val) {
    btnShow.value = true;
    Object.assign(fbStore.recommendItem, {
      leagueId: val.gameId,
      sportsType: val.sportsType,
      mainName: val.mainNameLocal,
      cusName: val.cusNameLocal,
      leagueName: val.leagueNameLocal,
      leagueTime: Date.parse(val.gameTime),
    });
  }
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleChange();
  handleQuery();
}
// 取消
function handleCancle() {
  localStorage.removeItem("SetForm");
  dialogVisible.value = false;
}

// 下一步
function handleNext() {
  dialogVisible.value = false;
  emit("onchange");
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  white-space: pre-wrap;
}
.bottom-btn {
  margin-top: 16px;
}
</style>
