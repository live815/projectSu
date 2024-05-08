<!-- 支付广告 -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-form
          :model="queryParams"
          ref="queryRef"
          :inline="true"
          v-show="showSearch"
        >
          <el-form-item :label="$t('operation.Adtitle')" prop="userName">
            <el-input
              v-model="queryParams.title"
              :placeholder="$t('operation.tip7')"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item :label="$t('operation.status')" prop="roleId">
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('operation.paleaseChose')"
              clearable
              style="width: 150px"
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('operation.Jumptype')" prop="postId">
            <el-select
              v-model="queryParams.jumpType"
              :placeholder="$t('operation.paleaseChose')"
              clearable
              style="width: 150px"
            >
              <el-option
                v-for="item in jumpList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('operation.Addedtime')" prop="accountType">
            <el-date-picker
              v-model="queryParams.dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('operation.beginTime')"
              :end-placeholder="$t('operation.endTime')"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">{{
              $t("operation.search")
            }}</el-button>
            <el-button icon="Refresh" @click="resetQuery">{{
              $t("operation.reset")
            }}</el-button>
            <el-button type="primary" plain icon="Plus" @click="addCarousel">{{
              $t("operation.add")
            }}</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <right-toolbar
            v-model:showSearch="showSearch"
            @queryTable="getList"
            :columns="columns"
          ></right-toolbar>
        </el-row>

        <!-- 表格 -->
        <el-table
          v-loading="loading"
          :data="carouselList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            :label="$t('operation.weightsort')"
            align="center"
            prop="weight"
            v-if="columns[0].visible"
            width="120"
          >
          </el-table-column>
          <el-table-column
            :label="$t('operation.Adtitle')"
            align="center"
            prop="title"
            v-if="columns[1].visible"
            :show-overflow-tooltip="true"
            width="160"
          />

          <el-table-column
            :label="$t('operation.status')"
            align="center"
            prop="status"
            v-if="columns[2].visible"
          >
            <template #default="scope">
              <el-tag :type="scope.row.status == '1' ? 'success' : 'danger'">
                {{
                  scope.row.status == "1"
                    ? $t("operation.turnOn")
                    : $t("operation.disabled")
                }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operation.APPpictures')"
            align="center"
            prop="appUrl"
            v-if="columns[3].visible"
          >
            <template #default="scope">
              <div class="appImage">
                <div v-if="!scope.row.appUrl" style="text-align: center">
                  {{ $t("operation.Nopictureyet") }}
                </div>
                <img
                  :src="getImgUrl(scope.row.appUrl)"
                  style="width: 80px"
                  v-else
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operation.Webpictures')"
            align="center"
            prop="webUrl"
            v-if="columns[4].visible"
          >
            <template #default="scope">
              <div class="appImage">
                <div v-if="!scope.row.webUrl" style="text-align: center">
                  {{ $t("operation.Nopictureyet") }}
                </div>
                <img
                  :src="getImgUrl(scope.row.webUrl)"
                  style="width: 80px"
                  v-else
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operation.Addedtime')"
            align="center"
            prop="onTime"
            v-if="columns[5].visible"
            :show-overflow-tooltip="true"
            width="160"
          />
          <el-table-column
            :label="$t('operation.Progresstime')"
            align="center"
            prop="startTime"
            v-if="columns[6].visible"
            width="300"
          >
            <template #default="scope">
              <span>{{ scope.row.startTime }}--{{ scope.row.endTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operation.Jumptype')"
            align="center"
            width="160"
            v-if="columns[7].visible"
            prop="jumpType"
          >
            <template #default="scope">
              <div v-if="scope.row.jumpType === 1">
                {{ $t("operation.URL") }}
              </div>
              <div v-if="scope.row.jumpType === 2">
                {{ $t("operation.Nojump") }}
              </div>
              <div v-if="scope.row.jumpType === 3">
                {{ $t("operation.tip2") }}
              </div>
              <div v-if="scope.row.jumpType === 4">
                {{ $t("operation.Venue") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operation.Jumpparameter')"
            align="center"
            v-if="columns[8].visible"
            prop="jumpContent"
            width="200"
          ></el-table-column>

          <el-table-column
            :label="$t('operation.Visitordisplay')"
            align="center"
            prop="vistorShow"
            v-if="columns[2].visible"
          >
            <template #default="scope">
              <el-tag :type="scope.row.vistorShow === 0 ? 'danger' : ''">
                {{
                  scope.row.vistorShow === 0
                    ? $t("operation.Dodisplay")
                    : $t("operation.exhibit")
                }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operation.VIPrestrict')"
            align="center"
            prop="vipLimit"
            v-if="columns[9].visible"
            width="160"
          >
            <template #default="scope">
              <div style="display: flex; flex-wrap: wrap; flex-direction: row">
                <div v-for="item in scope.row.vipLimit.split(',')" :key="item">
                  VIP{{ item }},
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operation.accounttype')"
            align="center"
            prop="memberType"
            v-if="columns[9].visible"
            width="160"
          >
            <template #default="scope">
              <div v-if="scope.row.memberType === 1">
                {{ $t("operation.Allmembers") }}
              </div>
              <el-button
                @click="onClickMemberType(scope.row)"
                type="primary"
                v-if="scope.row.memberType === 2"
              >
                {{ $t("operation.designatmember") }}</el-button
              >
              <div v-if="scope.row.memberType === 3">
                {{ $t("operation.tip3") }}
              </div>
              <el-button
                @click="onClickMemberType(scope.row)"
                type="primary"
                v-if="scope.row.memberType === 4"
                >{{ $t("operation.tip4") }}</el-button
              >
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('operation.founder')"
            align="center"
            prop="createBy"
            v-if="columns[10].visible"
            width="160"
          />
          <el-table-column
            :label="$t('operation.creattime')"
            align="center"
            prop="createTime"
            v-if="columns[11].visible"
            width="160"
          >
            <template #default="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operation.Mostrecentoperat')"
            align="center"
            prop="updateBy"
            v-if="columns[12].visible"
            width="120"
          >
            <template #default="scope">
              <span>{{ scope.row.updateBy }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operation.tip5')"
            align="center"
            prop="updateTime"
            v-if="columns[13].visible"
            width="160"
          >
            <template #default="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('operation.operate')"
            align="center"
            width="220"
            fixed="right"
          >
            <template #default="{ row }">
              <el-button
                :type="row.status == '0' ? 'success' : 'danger'"
                size="small"
                @click="statusItem(row)"
              >
                {{
                  row.status == "0"
                    ? $t("operation.turnOn")
                    : $t("operation.Disable")
                }}
              </el-button>
              <el-button type="primary" size="small" @click="editItem(row)">{{
                $t("operation.edit")
              }}</el-button>
              <el-button type="danger" size="small" @click="deleteItem(row)">{{
                $t("operation.delete")
              }}</el-button>
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
      </el-col>
    </el-row>
    <!-- 修改按钮 -->
    <EditCarousel
      v-if="isShow"
      :title="title"
      :rowItems="rowItems"
      :type="queryParams.type"
      @submitBtn="submitBtn"
      :configId="queryParams.configId"
    />
    <InquiryMemberType
      v-model:open="open"
      :type="type"
      :rowItems="rowItems"
      v-if="open"
    ></InquiryMemberType>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import EditCarousel from "../../components/EditCarousel.vue";
import { defaultTime, shortcuts } from "@/utils/config";
import { getImgUrl } from "@/utils";
import InquiryMemberType from "../../components/InquiryMemberType.vue";
import {
  getAdvertisingntApi,
  getAdvertisingntListApi,
  deleteAdvertisingntApi,
} from "@/api/operation/carousel";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();

const loading = ref(false);
const showSearch = ref(true);
const isShow = ref(false);

const title = ref(i18n.global.t("operation.add"));
const queryRef = ref(null);
const rowItems = ref({});
const open = ref(false);
const type = ref(null);

const statusList = reactive([
  {
    value: "1",
    label: i18n.global.t("operation.Turnedon"),
  },
  {
    value: "0",
    label: i18n.global.t("operation.disabled"),
  },
]);
const jumpList = reactive([
  {
    value: "1",
    label: i18n.global.t("operation.URL"),
  },
  {
    value: "2",
    label: i18n.global.t("operation.Nojump"),
  },
  {
    value: "3",
    label: i18n.global.t("operation.tip2"),
  },
  {
    value: "4",
    label: i18n.global.t("operation.Venue"),
  },
]);

// 列显隐信息
const columns = ref([
  { key: 0, label: i18n.global.t("operation.weightsort1"), visible: true },
  { key: 1, label: i18n.global.t("operation.carouseltitle"), visible: true },
  { key: 2, label: i18n.global.t("operation.status1"), visible: true },
  { key: 3, label: i18n.global.t("operation.APPpictures1"), visible: true },
  { key: 4, label: i18n.global.t("operation.Webpictures1"), visible: true },
  { key: 5, label: i18n.global.t("operation.Addedtime1"), visible: true },
  { key: 6, label: i18n.global.t("operation.dowmtime"), visible: true },
  { key: 7, label: i18n.global.t("operation.Jumptype1"), visible: true },
  { key: 8, label: i18n.global.t("operation.Jumpparameter1"), visible: true },
  { key: 9, label: i18n.global.t("operation.accounttype"), visible: true },
  { key: 10, label: i18n.global.t("operation.founder1"), visible: true },
  { key: 11, label: i18n.global.t("operation.creattime1"), visible: true },
  {
    key: 12,
    label: i18n.global.t("operation.Mostrecentoperat1"),
    visible: true,
  },
  { key: 13, label: i18n.global.t("operation.tip55"), visible: true },
]);
// 表格列表
const carouselList = ref([]);
// 总数
const total = ref(0);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  configId: "",
  onTimeStart: "",
  onTimeEnd: "",
  jumpType: "",
  status: "",
  title: "",
  type: "6",
  accountType: "",
  dateRange: [],
});
const addCarousel = () => {
  title.value = i18n.global.t("operation.add");
  rowItems.value = {};
  isShow.value = true;
};

const multipleSelection = ref([]);
// 全选按钮
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

// 重置
const resetQuery = () => {
  queryParams.pageNum = 1;
  queryParams.pageSize = 10;
  queryParams.configId = "";
  queryParams.onTimeStart = "";
  queryParams.onTimeEnd = "";
  queryParams.jumpType = "";
  queryParams.status = "";
  queryParams.title = "";
  queryParams.type = "6";
  queryParams.accountType = "";
  queryParams.dateRange = [];
  getList();
};

// 搜索
const handleQuery = () => {
  getList();
};

// 修改当前状态
const statusItem = (row) => {
  if (row.status == 1) {
    row.status = 0;
  } else {
    row.status = 1;
  }
  getAdvertisingntListApi({ id: row.id, status: row.status }).then((res) => {
    getList();
  });
};

// 编辑信息
const editItem = (row) => {
  title.value = i18n.global.t("operation.edit");
  rowItems.value = row;
  isShow.value = true;
};

// 删除
const deleteItem = (row) => {
  proxy.$modal
    .confirm(i18n.global.t("operation.tip6"))
    .then(() => {
      deleteAdvertisingntApi(row.id).then(() => {
        proxy.$modal.msgSuccess(i18n.global.t("operation.deleteSuccess"));
        getList();
      });
    })
    .catch(() => {});
};

// 获取表格数据
const getList = async () => {
  const params = {
    jumpType: queryParams.jumpType || "",
    onTimeStart: queryParams.dateRange[0] || "",
    onTimeEnd: queryParams.dateRange[1] || "",
    status: queryParams.status || "",
    pageNum: queryParams.pageNum,
    pageSize: queryParams.pageSize,
    type: queryParams.type,
    title: queryParams.title || "",
  };
  const res = await getAdvertisingntApi(params);
  if (res.rows?.length) {
    carouselList.value = res.rows;
    total.value = res.total;
  } else {
    carouselList.value = [];
    total.value = res.total;
  }
};

const onClickMemberType = (row) => {
  rowItems.value = row;
  open.value = true;
};

const submitBtn = (type) => {
  isShow.value = false;
  if (type == 1) {
    getList();
  }
};
onMounted(() => {
  getList();
});
</script>

<style scoped lang="scss">
.stadimgBox {
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
