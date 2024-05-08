<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.coverlabel1')" prop="tagName">
        <el-input
          v-model="queryParams.tagName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
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
          v-hasPermi="['cover:tag:list']"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
      </el-form-item>

      <el-row>
        <el-col>
          <el-form-item>
            <div class="btn-box">
              <el-button
                v-hasPermi="['cover:tag:add']"
                icon="Plus"
                @click="editInfo({}, 'add')"
                >{{ $t("live.tip108") }}</el-button
              >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.serialNumber')"
        prop="sortNum"
        :show-overflow-tooltip="true"
        align="center"
        width="80"
      />
      <el-table-column
        :label="$t('live.coverlabel')"
        prop="tagName"
        :show-overflow-tooltip="true"
        align="center"
      />
      <!-- <el-table-column
        :label="'标签分类'"
        prop="tagCode"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template #default="scope">
          <div v-if="scope.row.tagCode == '1'">足球</div>
          <div v-if="scope.row.tagCode == '2'">篮球</div>
          <div v-if="scope.row.tagCode == '3'">充值提现</div>
          <div v-if="scope.row.tagCode == '4'">体育赛事</div>
        </template>
      </el-table-column> -->
      <el-table-column
        :label="$t('live.LabelbackColor')"
        prop="backgroundColor"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.backgroundColor" style="text-align: center">
              {{ $t("live.Nopicturesyet") }}
            </div>
            <img
              :src="getImgUrl(scope.row.backgroundColor)"
              :alt="$t('live.Nopicturesyet')"
              v-else
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('live.creatTime1')"
        align="center"
        prop="createTime"
      >
        <template #default="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('live.operate')" align="center" width="260">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="success"
              v-hasPermi="['cover:tag:edit']"
              @click="editInfo(scope.row, 'edit')"
              >{{ $t("live.edit") }}</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['cover:tag:delete']"
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
    <CoverLabelDialog
      v-model:open="open"
      :row="form"
      :tableData="tableData"
      :title="title"
      :showedit="showedit"
      v-if="open"
      @onrefresh="getList"
    />
  </div>
</template>
<script setup>
import { getCoverlabelList, delCoverlabelList } from "@/api/live/coverlabel.js";
import CoverLabelDialog from "./components/coverLabelDialog.vue";
import { getImgUrl } from "@/utils";
import { defaultTime } from "@/utils/config";
import i18n from "@/i18n";
const dateRange = ref([]);
const { proxy } = getCurrentInstance();
const showSearch = ref(true);
const tableData = ref([]);
const total = ref(0);
const loading = ref(true);
const open = ref(false);
const title = ref("");
const showedit = ref(true);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
});
const isFirstLoad = ref(true);
const { queryParams, form } = toRefs(data);
//
onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
/** 查询标签列表 */
function getList() {
  loading.value = true;
  return getCoverlabelList(queryParams.value).then((response) => {
    tableData.value = response.rows;
    total.value = response.total;
    loading.value = false;
    console.log(tableData.value, "000");
  });
}
function handleChange() {
  if (dateRange._value == null) {
    queryParams.value.beginTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.beginTime = dateRange._value[0];
    queryParams.value.endTime = dateRange._value[1];
  }
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleChange();
  handleQuery();
}
// 编辑新增
function editInfo(row, icon) {
  form.value = JSON.parse(JSON.stringify(row));
  if (icon == "edit") {
    showedit.value = true;
    title.value = i18n.global.t("live.EditInformation");
    // form.value.status = form.value.status + "";
    form.value.tagCode = form.value.tagCode + "";
  } else if (icon == "add") {
    showedit.value = false;
    // form.value.tagCode = "1";
    title.value = i18n.global.t("live.tip108");
  }
  open.value = true;
}
/** 删除按钮操作 */
function handleDelete(id) {
  proxy.$modal
    .confirm(i18n.global.t("live.tip109"))
    .then(function () {
      return delCoverlabelList(id);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("live.tip35"));
    })
    .catch(() => {});
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
.btn-box {
  :deep(.el-button) {
    background-color: #234360;
    color: #fff;
  }
}
.stadimgBox {
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
