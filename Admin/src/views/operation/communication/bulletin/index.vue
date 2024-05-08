<template>
  <div class="app-container">
    <el-form ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.Announcemtitle')">
        <el-input
          v-model="data.title"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 200px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.logo')">
        <el-select
          v-model="data.logo"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in marks"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.Announcemtype')">
        <el-select
          v-model="data.annType"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in noticeTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.status')">
        <el-select
          v-model="data.status"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in statust"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.founder')" prop="creator">
        <el-input
          v-model="data.createBy"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 200px"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('operation.Mostrecentoperat')"
        prop="recentActions"
      >
        <el-input
          v-model="data.updateBy"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 200px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.accounttype')" prop="accountType">
        <el-select
          v-model="data.accountType"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in accountTypes"
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
          @click="getAnnouncementList()"
          >{{ $t("operation.search") }}</el-button
        >
        <el-button icon="Refresh" @click="reSet()">{{
          $t("operation.reset")
        }}</el-button>
        <el-button icon="Plus" type="warning" @click="swichIsShow(null)">{{
          $t("operation.add")
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格内容 -->
    <el-table :data="filtedAnnouncementList" style="width: 100%">
      <el-table-column
        prop="sortNum"
        :label="$t('operation.weightsort')"
        width="100"
      />
      <el-table-column
        prop="title"
        :label="$t('operation.Announcemtitle')"
        width="180"
      >
        <template #default="{ row }">
          <div class="content-box" v-html="row.title"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        :label="$t('operation.AnnouncemContent')"
        width="220"
      >
        <template #default="{ row }">
          <div class="content-box" v-html="Base64.decode(row.content)"></div>
        </template>
      </el-table-column>
      <el-table-column prop="logo" :label="$t('operation.logo')" width="120">
        <template #default="scope">
          <span v-if="scope.row.logo == 1">{{
            $t("operation.important")
          }}</span>
          <span v-else>{{ $t("operation.none") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="annType"
        :label="$t('operation.Announcemtype')"
        width="120"
      >
        <template #default="scope">
          <span v-if="scope.row.annType == 1">{{ $t("operation.tip31") }}</span>
          <span v-if="scope.row.annType == 0">{{
            $t("operation.GeneralAnnouncem")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="shelvesTime"
        :label="$t('operation.tip32')"
        sortable
        width="180"
      />
      <el-table-column
        prop="downTime"
        :label="$t('operation.tip33')"
        sortable
        width="180"
      />
      <el-table-column
        prop="accountType"
        :label="$t('operation.accounttype')"
        width="150"
      >
        <template #default="scope">
          <span v-if="scope.row.accountType == 0">{{
            $t("operation.Allmembers")
          }}</span>
          <span v-if="scope.row.accountType == 1">{{
            $t("operation.designatmember")
          }}</span>
          <span v-if="scope.row.accountType == 2">{{
            $t("operation.Fullagentline")
          }}</span>
          <span v-if="scope.row.accountType == 3">{{
            $t("operation.tip4")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('operation.status')"
        width="120"
      >
        <template #default="scope">
          <el-tag v-if="scope.row.status === '0'" class="ml-2" type="success">{{
            $t("operation.Opening")
          }}</el-tag>
          <el-tag v-if="scope.row.status === '1'" type="danger">{{
            $t("operation.disabled")
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="createBy"
        :label="$t('operation.founder')"
        width="180"
      />
      <el-table-column
        prop="createTime"
        :label="$t('operation.creattime')"
        sortable
        width="180"
      />
      <el-table-column
        prop="updateBy"
        :label="$t('operation.Mostrecentoperat')"
        width="180"
      />
      <el-table-column
        prop="updateTime"
        :label="$t('operation.tip5')"
        sortable
        width="200"
      />
      <el-table-column
        :label="$t('operation.operate')"
        width="210"
        prop="status"
        fixed="right"
      >
        <template #default="scope">
          <div class="btn-row">
            <el-button
              type="success"
              size="small"
              v-if="scope.row.status === '1'"
              @click="updateAnnouncementStatus(scope.row.id, false)"
              >{{ $t("operation.turnOn") }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              v-else
              @click="updateAnnouncementStatus(scope.row.id, true)"
              >{{ $t("operation.Disable") }}</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="swichIsShow(scope.row.id)"
              >{{ $t("operation.editInfomation") }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleAnnouncement(scope.row.id)"
              >{{ $t("operation.delete") }}</el-button
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
      style="height: 40px"
    />

    <el-dialog
      v-model="isShowAdd"
      :title="$t('operation.NewAnnounce')"
      :before-close="swichIsShow"
      width="1000px"
      :center="true"
    >
      <AddAnnouncement
        v-if="isShowAdd"
        @refreshList="refreshList"
        :editId="editId"
      ></AddAnnouncement>
    </el-dialog>
  </div>
</template>
<script setup>
import { Base64 } from "js-base64";
import { ElMessage, ElMessageBox } from "element-plus";
import useUserStore from "@/store/modules/user";
import AddAnnouncement from "./AddAnnouncement.vue";
import {
  getAnnouncementListApi,
  deleAnnouncementApi,
  updateAnnouncementStatusApi,
} from "@/api/operation/announcement.js";
import { ref } from "vue";
import i18n from "@/i18n";

const user = useUserStore();

const data = ref({
  noticeType: "",
  accountType: "",
  annType: "",
  ascFlag: true,
  createBy: "",
  level: "",
  levelList: [],
  logo: "",
  orderColumn: "",
  pageNum: 1,
  pageSize: 10,
  status: "",
  title: "",
  updateBy: "",
});
// 启用与禁用公告
const updateAnnouncementStatus = async (id, status) => {
  let data = {
    id: id.toString(),
    status: "",
    updateBy: user.name,
  };
  if (status) {
    data.status = 1;
    await updateAnnouncementStatusApi(data);
  } else {
    data.status = 0;
    await updateAnnouncementStatusApi(data);
  }
  getAnnouncementList();
};

//获取公告列表
const announcementList = ref([]);
onMounted(() => {
  getAnnouncementList();
});
const getAnnouncementList = async (pageNum, pageSize) => {
  // 重置分页器
  if (!pageNum) {
    queryParams.value.pageNum = 1;
    data.value.pageNum = 1;
  } else {
    data.value.pageNum = pageNum;
  }
  if (pageSize) {
    data.value.pageSize = pageSize;
  } else {
    data.value.pageSize = queryParams.value.pageSize;
  }

  let res = await getAnnouncementListApi(data.value);
  try {
    announcementList.value = res.records;
    total.value = res.total;
  } catch (e) {}
};

// 筛选公告列表
const filtedAnnouncementList = computed(() => {
  return announcementList.value;
});

// 重置筛选
const reSet = () => {
  for (let key in data.value) {
    data.value[key] = "";
  }
  data.value.levelList = [];
  getAnnouncementList();
};

// 分页器
const total = ref(0);
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
});
const getList = () => {
  getAnnouncementList(queryParams.value.pageNum, queryParams.value.pageSize);
};

// 新增公告弹窗
const isShowAdd = ref(false);
const swichIsShow = (id) => {
  if (id) {
    editId.value = id;
  }
  isShowAdd.value = !isShowAdd.value;
};
// 是否编辑
const editId = ref(null);

// 关闭弹窗重新获取
const refreshList = (refresh = true) => {
  swichIsShow();
  getAnnouncementList();
  editId.value = null;
  // getList();
  // if (refresh) {
  //
  // }
};

// 删除
const deleAnnouncement = async (id) => {
  ElMessageBox.confirm(i18n.global.t("operation.tip44")).then(() => {
    deleAnnouncementApi(id.toString()).then(() => {
      ElMessage({
        type: "success",
        message: i18n.global.t("operation.deleteSuccess"),
      });
      getAnnouncementList();
    });
  });
};
const marks = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: "1",
    label: i18n.global.t("operation.important"),
  },
  {
    value: "0",
    label: i18n.global.t("operation.none"),
  },
];
const noticeTypes = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: "0",
    label: i18n.global.t("operation.GeneralAnnouncem"),
  },
  {
    value: "1",
    label: i18n.global.t("operation.tip31"),
  },
];
const statust = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: "0",
    label: i18n.global.t("operation.Opening"),
  },
  {
    value: "1",
    label: i18n.global.t("operation.disabled"),
  },
];
const accountTypes = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: "0",
    label: i18n.global.t("operation.Allmembers"),
  },
  {
    value: "1",
    label: i18n.global.t("operation.designatmember"),
  },
  {
    value: "2",
    label: i18n.global.t("operation.Fullagentline"),
  },
  {
    value: "3",
    label: i18n.global.t("operation.tip4"),
  },
];
</script>

<style scoped>
.btn-row {
  display: flex;
}
.content-box {
  max-height: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
