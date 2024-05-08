<template>
  <div class="" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.giftname',{num:':'})" prop="giftName">
        <el-input
          v-model="queryParams.giftName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
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
          v-hasPermi="['gift:info:list']"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
        <el-button
          type="primary"
          icon="Plus"
          @click="editInfo({}, 'add')"
          v-hasPermi="['gift:info:add']"
          >{{ $t("live.Addgift") }}</el-button
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
        width="80"
      />

      <el-table-column
        :label="$t('live.giftname')"
        prop="giftName"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.giftvalue')"
        prop="payAmount"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.giftSVGA')"
        prop="giftBigImage"
        align="center"
        :show-overflow-tooltip="true"
        width="120"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div
              v-if="!scope.row.giftBigImage"
              style="text-align: center"
            >
              {{ $t("live.Nopicturesyet") }}
            </div>
            <PlaySvga v-else :svgaUrl="getImgUrl(scope.row.giftBigImage)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.giftpicture')"
        prop="giftSmallImage"
        align="center"
        :show-overflow-tooltip="true"
        width="100"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.giftSmallImage" style="text-align: center">
              {{ $t("live.Nopicturesyet") }}
            </div>
            <img
              :src="getImgUrl(scope.row.giftSmallImage)"
              :alt="$t('live.Nopicturesyet')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Alternateimage')"
        prop="giftFullScreen"
        align="center"
        :show-overflow-tooltip="true"
        width="100"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.giftFullScreen" style="text-align: center">
              {{ $t("live.Nopicturesyet") }}
            </div>
            <img
              :src="getImgUrl(scope.row.giftFullScreen)"
              :alt="$t('live.Nopicturesyet')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.remake')"
        prop="remark"
        align="center"
      />
      <el-table-column
        :label="$t('live.creatTime1')"
        align="center"
        prop="createTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('live.status')" prop="status" align="center">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('live.operate')" align="center" width="260">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="success"
              v-hasPermi="['gift:info:edit']"
              @click="editInfo(scope.row, 'edit')"
              >{{ $t("live.edit") }}</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['gift:info:delete']"
              @click="handleDelete(scope.row.id)"
              >{{ $t("live.delete") }}</el-button
            >
            <el-button
              size="small"
              type="success"
              v-hasPermi="['gift:info:edit']"
              v-if="scope.row.status == '1'"
              @click="changeStatus(scope.row)"
              >{{ $t("live.enable") }}</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['gift:info:edit']"
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
    <ConfigutDialog
      v-model:open="open"
      :row="form"
      :title="title"
      :showadd="showadd"
      :showedit="showedit"
      v-if="open"
      @onrefresh="getList"
    ></ConfigutDialog>
  </div>
</template>
<script setup>
import PlaySvga from "@/components/PlaySvga";
import { defaultTime } from "@/utils/config";
import ConfigutDialog from "./ConfigutDialog.vue";
import { getGiftList, delGiftList, editGiftList } from "@/api/live/gift";
import { getImgUrl } from "@/utils";
import i18n from "@/i18n";
const dateRange = ref([]);
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
const showSearch = ref(true);
const open = ref(false);
const title = ref("");
const tableData = ref([]);
const total = ref(0);
const loading = ref(true);
const showadd = ref(true);
const showedit = ref(true);
const isFirstLoad = ref(true);

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
/** 查询角色列表 */
function getList() {
  loading.value = true;
  return getGiftList(queryParams.value)
    .then((response) => {
      tableData.value = response.rows || [];
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
/** 搜索按钮操作  */
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
function editInfo(row, icon) {
  form.value = JSON.parse(JSON.stringify(row));
  if (icon == "edit") {
    showadd.value = false;
    showedit.value = true;
    title.value = i18n.global.t("live.EditInformation");
    form.value.status = form.value.status + "";
  } else if (icon == "add") {
    showadd.value = true;
    showedit.value = false;
    title.value = i18n.global.t("live.Addgift");
  }
  open.value = true;
}
/** 删除按钮操作 */
function handleDelete(id) {
  proxy.$modal
    .confirm(i18n.global.t("live.tip155"))
    .then(function () {
      return delGiftList(id);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("live.tip35"));
    })
    .catch(() => {});
}
// 禁用启用
function changeStatus(row) {
  editGiftList({
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
.stadimgBox {
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
