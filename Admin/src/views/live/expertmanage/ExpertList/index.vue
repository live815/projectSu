<template>
  <div class="" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.ExpertName1')" prop="expertName">
        <el-input
          v-model="queryParams.expertName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.status1')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('live.pleaseChose')"
          clearable
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

      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
          v-hasPermi="['expert:info:list']"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
        <el-button
          type="primary"
          icon="Plus"
          v-hasPermi="['expert:info:add']"
          @click="editInfo({}, 'add')"
          >{{ $t("live.Addexperts") }}</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.ExpertName')"
        prop="expertName"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.ExpertAvatar')"
        prop="expertAvatar"
        align="center"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template #default="scope">
          <div class="anchorimgBox">
            <div v-if="!scope.row.expertAvatar" style="text-align: center">
              {{ $t("live.Nopicturesyet") }}
            </div>
            <img
              :src="getImgUrl(scope.row.expertAvatar)"
              :alt="$t('live.Nopicturesyet')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.tip1288')"
        prop="weight"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.Experttag')"
        prop="expertTag"
        :show-overflow-tooltip="true"
        align="center"
        width="180px"
      />

      <el-table-column
        :label="$t('live.tip132')"
        prop="summary"
        align="center"
        width="180px"
      />

      <el-table-column
        :label="$t('live.AllSessions')"
        prop="allRoundCount"
        align="center"
      >
      </el-table-column>

      <el-table-column
        :label="$t('live.tip145')"
        prop="middleRoundCount"
        align="center"
        width="120px"
      />
      <el-table-column :label="$t('live.tip146')" prop="" align="center">
        <template #default="scope">
          <div>红3黑1和0</div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.MonthwinRate')"
        prop="monthWinRate"
        align="center"
      />
      <el-table-column
        :label="$t('live.tip129')"
        prop="actualAttentionNum"
        align="center"
        width="120px"
      />
      <el-table-column
        :label="$t('live.tip130')"
        prop="showAttentionNum"
        align="center"
        width="120px"
      />
      <el-table-column
        :label="$t('live.tip131')"
        prop="recentHitRate"
        align="center"
        width="120px"
      />

      <el-table-column
        :label="$t('live.updateTime')"
        prop="updateTime"
        align="center"
        width="180"
      />

      <el-table-column :label="$t('live.status')" prop="status" align="center">
        <template #default="scope">
          <div v-if="scope.row.status == '0'">{{ $t("live.enable") }}</div>
          <div v-if="scope.row.status == '1'">{{ $t("live.disabled") }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('live.operate')" align="center" width="260">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="success"
              v-hasPermi="['expert:info:edit']"
              @click="editInfo(scope.row, 'edit')"
              >{{ $t("live.edit") }}</el-button
            >
            <el-button
              size="small"
              type="success"
              v-hasPermi="['expert:info:edit']"
              v-if="scope.row.status == '1'"
              @click="changeStatus(scope.row)"
              >{{ $t("live.enable") }}</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['expert:info:edit']"
              v-if="scope.row.status == '0'"
              @click="changeStatus(scope.row)"
              >{{ $t("live.disabled2") }}</el-button
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
    <ExpertDialog
      v-model:open="open"
      :row="form"
      :title="title"
      :showadd="showadd"
      v-if="open"
      @onrefresh="getList"
    ></ExpertDialog>
  </div>
</template>
<script setup>
import { getExpertList, editExpertInfo } from "@/api/live/expertmange";
import ExpertDialog from "./components/ExpertDialog.vue";
import { getImgUrl } from "@/utils";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
const showSearch = ref(true);
const showadd = ref(true);
const total = ref(0);
const title = ref("");
const open = ref(false);
const loading = ref(true);
const options2 = [
  {
    value: "0",
    label: i18n.global.t("live.enable"),
  },
  {
    value: "1",
    label: i18n.global.t("live.disabled"),
  },
];
const isFirstLoad = ref(true);
const tableData = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
});
const { queryParams, form } = toRefs(data);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
/** 查询专家列表 */
function getList() {
  loading.value = true;
  return getExpertList(queryParams.value)
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

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
// 新增编辑弹窗
function editInfo(row, icon) {
  form.value = JSON.parse(JSON.stringify(row));
  if (icon == "edit") {
    showadd.value = false;
    title.value = i18n.global.t("live.EditInformation");
    form.value.status = form.value.status + "";
  } else if (icon == "add") {
    showadd.value = true;
    title.value = i18n.global.t("live.Addexpert");
  }
  open.value = true;
}
// 禁用启用
function changeStatus(row) {
  editExpertInfo({
    id: row.id,
    status: row.status == "0" ? "1" : "0",
  }).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("live.tip33"));
    getList();
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
.anchorimgBox {
  img {
    width: 80px;
    height: 80px;
    border-radius: 80px;
  }
}
</style>
