<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.AnchorName')" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('live.dynamictime1')">
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
          v-hasPermi="['presenter:dynamics:list']"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
        <div class="btn-box">
          <el-button
            v-hasPermi="['presenter:dynamics:add']"
            icon="Plus"
            @click="editInfo()"
            >{{ $t("live.addNewnews") }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.AnchorName1')"
        prop="nickName"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.DynamicReleaseTime')"
        align="center"
        prop="createTime"
      >
        <template #default="scope">
          <span v-if="scope.row.createTime">{{ scope.row.createTime }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.dynamicContent')"
        prop="content"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.dynamicpicture')"
        prop="imageUrl"
        :show-overflow-tooltip="true"
        align="center"
        width="460px"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="scope.row.imageUrl == ''" style="text-align: center">
              --
            </div>
            <div class="imgBox" v-else>
              <div v-for="item in scope.row.imageUrl">
                <img :src="getImgUrl(item)" :alt="$t('live.Nopicturesyet')" />
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Numberdynamiclikes')"
        prop="likeNum"
        :show-overflow-tooltip="true"
        align="center"
        width="120px"
      />

      <el-table-column :label="$t('live.operate')" align="center" width="260">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['presenter:dynamics:delete']"
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
    <AddDialog v-model:open="open" v-if="open" @onrefresh="getList" />
  </div>
</template>
<script setup name="Anchornew">
import { getAnchornewList, delAnchornewList } from "@/api/live/anchornew.js";
import AddDialog from "./components/AddDialog.vue";
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
const isFirstLoad = ref(true);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
});
const { queryParams } = toRefs(data);

onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
/** 查询标签列表 */
function getList() {
  loading.value = true;
  return getAnchornewList(queryParams.value)
    .then((response) => {
      response.rows.map((item) => {
        item.imageUrl = item.imageUrl.split(",");
      });
      tableData.value = response.rows;
      total.value = response.total;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
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
function editInfo() {
  open.value = true;
}
/** 删除按钮操作 */
function handleDelete(id) {
  proxy.$modal
    .confirm(i18n.global.t("live.tip65"))
    .then(function () {
      return delAnchornewList(id);
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
  margin-left: 16px;
  :deep(.el-button) {
    background-color: #234360;
    color: #fff;
  }
}
.stadimgBox {
  .imgBox {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      margin-right: 5px;
      width: 40px;
      height: 40px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
