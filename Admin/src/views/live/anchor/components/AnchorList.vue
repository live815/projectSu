<template>
  <div class="" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('live.AnchorAccount')" prop="userName">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('live.pleaseEnter')"
          @keyup.enter="handleQuery"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('live.AnchorName')" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          :placeholder="$t('live.pleaseEnter')"
          @keyup.enter="handleQuery"
          style="width: 200px"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('live.AnchorStatus')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('live.pleaseChose')"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="dict in statusList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
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
          v-hasPermi="['member:presenter:list']"
          type="primary"
          icon="Search"
          @click="handleQuery"
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
                v-hasPermi="['member:presenter:add']"
                icon="Plus"
                @click="editInfo({}, 'add')"
                >{{ $t("live.tip29") }}</el-button
              >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.AnchorAccount2')"
        prop="userName"
        align="center"
        :show-overflow-tooltip="true"
        width="160"
      />
      <el-table-column
        :label="$t('live.AnchorNickname')"
        prop="nickName"
        align="center"
        width="160"
      />
      <el-table-column
        :label="$t('live.AnchorAvatar')"
        prop="avatar"
        align="center"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template #default="scope">
          <div class="anchorimgBox">
            <div v-if="!scope.row.avatar" style="text-align: center">
              {{ $t("live.Nopicturesyet") }}
            </div>
            <img
              :src="getImgUrl(scope.row.avatar)"
              :alt="$t('live.Nopicturesyet')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.backgroundwall')"
        prop="backgroundWall"
        align="center"
        :show-overflow-tooltip="true"
        width="100"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.backgroundWall" style="text-align: center">
              {{ $t("live.Nopicturesyet") }}
            </div>
            <img
              :src="getImgUrl(scope.row.backgroundWall)"
              :alt="$t('live.Nopicturesyet')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.Anchorintroduct')"
        prop="summary"
        align="center"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template #default="{ row }">
          <span>{{ row.summary }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.personalInformat')"
        prop=""
        align="center"
        :show-overflow-tooltip="true"
        width="180"
      >
        <template #default="{ row }">
          <div>
            <span>{{ $t("live.height") }}:</span><span>{{ row.height }}</span>
          </div>
          <div>
            <span>{{ $t("live.emotionalState") }}:</span
            ><span v-if="row.emotion == '0'">{{ $t("live.private") }}</span>
            <span v-if="row.emotion == '1'">{{ $t("live.single") }}</span>
            <span v-if="row.emotion == '2'">{{ $t("live.Married") }}</span>
          </div>
          <div>
            <span>{{ $t("live.hometown") }}:</span
            ><span>{{ row.address }}</span>
          </div>
          <div>
            <span>{{ $t("live.birthday") }}:</span
            ><span>{{ row.birthday }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.tip31')"
        prop="imNumber"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        :label="$t('live.tip32')"
        prop="imWebImage"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.imWebImage" style="text-align: center">
              {{ $t("live.Nopicturesyet") }}
            </div>
            <img
              :src="getImgUrl(scope.row.imWebImage)"
              :alt="$t('live.Nopicturesyet')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.tip4')"
        prop="imAppImage"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.imAppImage" style="text-align: center">
              {{ $t("live.Nopicturesyet") }}
            </div>
            <img
              :src="getImgUrl(scope.row.imAppImage)"
              :alt="$t('live.Nopicturesyet')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.tip6')"
        prop="imJumpUrl"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        :label="$t('live.creatTime1')"
        prop="createTime"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('live.Numbersubscript')"
        prop="subscriptionNum"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('live.photowall')"
        prop="photoWall"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <span class="checkBox" @click="handleCheck(scope.row)">{{
            $t("live.Check")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.status')"
        prop="status"
        align="center"
        :show-overflow-tooltip="true"
        width="120"
      >
        <template #default="scope">
          <div :class="[scope.row.status == '0' ? 'start' : 'disable']">
            {{
              scope.row.status == "0" ? $t("live.Open") : $t("live.disabled")
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('live.operate')" align="center" width="260">
        <template #default="scope">
          <div>
            <el-button
              v-hasPermi="['member:presenter:edit']"
              type="primary"
              size="small"
              @click="editInfo(scope.row, 'edit')"
              >{{ $t("live.EditInformation") }}</el-button
            >
            <el-button
              size="small"
              type="success"
              v-hasPermi="['member:presenter:edit']"
              v-if="scope.row.status == '1'"
              @click="changeStatus(scope.row)"
              >{{ $t("live.enable") }}</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['member:presenter:edit']"
              v-if="scope.row.status == '0'"
              @click="changeStatus(scope.row)"
              >{{ $t("live.disabled2") }}</el-button
            >
            <el-button
              v-hasPermi="['member:presenter:delete']"
              size="small"
              type="danger"
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

    <el-dialog
      v-model="centerDialogVisible"
      :title="$t('live.photowall')"
      width="30%"
      align-center
    >
      <div class="content">
        <div class="imgBox" v-for="item in imgList" :key="item">
          <img :src="getImgUrl(item)" alt="" />
        </div>
      </div>
    </el-dialog>
    <AnchorDialog
      v-model:open="open"
      :row="form"
      :addShow="addShow"
      :editShow="editShow"
      :title="title"
      v-if="open"
      @onrefresh="getList"
    />
  </div>
</template>

<script setup>
import {
  getAnchorList,
  delAnchorList,
  editAnchorList,
} from "@/api/live/anchor.js";
import AnchorDialog from "./AnchorDialog.vue";
import { getImgUrl } from "@/utils";
import { onMounted, ref, toRaw } from "vue";
import { defaultTime } from "@/utils/config";
import i18n from "@/i18n";
const queryParams = ref({
  nickName: null,
  userName: null,
  status: null,
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const statusList = ref([
  {
    label: i18n.global.t("live.all"),
    value: "",
  },
  {
    label: i18n.global.t("live.turnOn"),
    value: 0,
  },
  {
    label: i18n.global.t("live.disabled"),
    value: 1,
  },
]);
const open = ref(false);
const addShow = ref(true);
const editShow = ref(true);
const title = ref("");
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(1);
const loading = ref(false);
const form = ref({});
const centerDialogVisible = ref(false);
const isFirstLoad = ref(true);
const imgList = ref([]);

// 新增编辑主播账号
const editInfo = (row, icon) => {
  resetQuery();
  const rower = toRaw(row);
  delete rower.createTime;
  form.value = JSON.parse(JSON.stringify(rower));
  if (icon == "edit") {
    title.value = i18n.global.t("live.EditInformation");
    editShow.value = true;
    addShow.value = false;
  } else if (icon == "add") {
    title.value = i18n.global.t("live.tip29");
    form.value.status = "0";
    form.value.emotion = "0";
    addShow.value = true;
    editShow.value = false;
  }
  open.value = true;
};
const { proxy } = getCurrentInstance();

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
function getList() {
  loading.value = true;
  return getAnchorList(queryParams.value)
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
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
function resetQuery() {
  proxy.resetForm("queryRef");
  dateRange.value = [];
  handleChange();
  handleQuery();
}
function changeStatus(row) {
  editAnchorList({
    id: row.id,
    status: row.status == "0" ? "1" : "0",
  }).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("live.tip33"));
    getList();
  });
}
/** 删除按钮操作 */
function handleDelete(id) {
  proxy.$modal
    .confirm(i18n.global.t("live.tip34"))
    .then(function () {
      return delAnchorList(id);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("live.tip35"));
    })
    .catch(() => {});
}
// 查看
function handleCheck(row) {
  centerDialogVisible.value = true;
  imgList.value = toRaw(row).photoWall.split(",");
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.stadimgBox {
  img {
    width: 80px;
    height: 80px;
  }
}
.anchorimgBox {
  img {
    width: 80px;
    height: 80px;
    border-radius: 80px;
  }
}
.checkBox {
  color: #6290ff;
}
.start {
  width: 80px;
  height: 20px;
  border: 1px solid rgba(82, 196, 26, 0.5);
  text-align: center;
  margin: 0 auto;
  line-height: 20px;
  color: rgba(82, 196, 26, 0.5);
}
.disable {
  width: 80px;
  height: 20px;
  border: 1px solid rgba(235, 143, 145, 0.5);
  text-align: center;
  margin: 0 auto;
  line-height: 20px;
  color: rgba(235, 143, 145, 0.5);
}
.content {
  width: 100%;
  display: flex;
  // column-gap: 15px;
  flex-wrap: wrap;
  .imgBox {
    width: calc((100% - 45px) / 4);
    height: 130px;
    margin: 0 15px 15px 0;
    box-sizing: content-box;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .imgBox:nth-child(4n) {
    margin-right: 0;
  }
}
.btn-box {
  :deep(.el-button) {
    background-color: #234360;
    color: #fff;
  }
}
.el-form--inline .el-form-item {
  margin-right: 20px;
}
</style>
