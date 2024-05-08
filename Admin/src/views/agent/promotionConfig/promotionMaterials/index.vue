<!--推广素材管理-->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.imageCaption')" prop="pictureName">
        <el-input
          v-model="queryParams.pictureName"
          :placeholder="$t('agent.pleaseInputTilte')"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.pictureType')" prop="pictureType">
        <el-select
          v-model="queryParams.pictureType"
          clearable
          :placeholder="$t('agent.pleaseEnterTheType')"
        >
          <el-option
            v-for="item in pictureTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.statusQuot')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('agent.pleaseSelectAStatus')"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="">
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("agent.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("agent.reset")
        }}</el-button>
        <el-button type="warning" icon="Plus" @click="addNewMaterial(null)">{{
          $t("agent.add")
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="date"
        :label="$t('agent.handle')"
        width="180"
        align="center"
      >
        <template #default="scope">
          <el-button type="primary" @click="editMain(scope.row)">{{
            $t("agent.edit")
          }}</el-button>
          <el-button type="danger" @click="delBtn(scope.row.id)">{{
            $t("agent.delete")
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="pictureName"
        :label="$t('agent.pictureName')"
        width="180"
      />
      <el-table-column
        prop="pictureType"
        :label="$t('agent.pictureTypeQuot')"
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.pictureType == 1">{{
            $t("agent.eventPromotion")
          }}</span>
          <span v-if="scope.row.pictureType == 2">{{
            $t("agent.comprehensivePromotion")
          }}</span>
          <span v-if="scope.row.pictureType == 3">{{
            $t("agent.appPromotion")
          }}</span>
          <span v-if="scope.row.pictureType == 4"
            >{{ $t("agent.sponsorshipPromotion") }}
          </span>
          <span v-if="scope.row.pictureType == 5"
            >{{ $t("agent.freePromotion") }}
          </span>
          <span v-if="scope.row.pictureType == 6"
            >{{ $t("agent.promotionActivities") }}
          </span>
          <span v-if="scope.row.pictureType == 7"
            >{{ $t("agent.virtualCurrencyPromotion") }}
          </span>
          <span v-if="scope.row.pictureType == 8"
            >{{ $t("agent.agencyPromotion") }}
          </span>
          <span v-if="scope.row.pictureType == 9"
            >{{ $t("agent.livePromotion") }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pictureUrl"
        :label="$t('agent.picture')"
        width="180"
      >
        <template #default="{ row }">
          <img
            :src="getImgUrl(row.pictureUrl)"
            :alt="$t('agent.failedToLoad')"
            v-if="row.pictureUrl"
            style="width: 80px"
          />
          <span v-else>{{ $t("agent.noPicturesYet") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="$t('agent.status')" width="180">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @click="changeStatus(row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        :label="$t('agent.remarkNoQuote')"
        width="180"
      />
      <el-table-column
        prop="createBy"
        :label="$t('agent.createBy')"
        width="180"
      />
      <el-table-column
        prop="createTime"
        :label="$t('agent.createTime')"
        width="180"
      />
      <el-table-column
        prop="updateBy"
        :label="$t('agent.lastUpdateByQuot')"
        width="180"
      />
      <el-table-column
        prop="updateTime"
        :label="$t('agent.lastUpdateTimeQuot')"
        width="230"
      />
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
      v-model="promotionalMaterials"
      :title="
        materialLine
          ? $t('agent.addPromotionalMaterials')
          : $t('agent.editPromotionalMaterials')
      "
      width="800px"
      @close="handleClose"
      :center="true"
    >
      <AddAndEdit
        v-if="promotionalMaterials"
        :opRow="opRowitem"
        @submitBtn="submitBtn"
      ></AddAndEdit>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { getImgUrl } from "@/utils";
import { ElMessageBox, ElMessage } from "element-plus";
import AddAndEdit from "./AddAndEdit.vue";
import {
  inquireMaterialListApi,
  deleteMaterialApi,
  enableOrDisableApi,
} from "@/api/agent/promotionConfig/promotionConfig.js";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  pictureName: "",
  pictureType: "",
  status: "",
  tenantId: "",
  updateBy: "",
  updateTime: "",
});
const total = ref(5);
const opRowitem = ref({});
const loading = ref(false);
const pictureTypeList = ref([
  {
    value: "",
    label: i18n.global.t("agent.all"),
  },
  {
    value: 1,
    label: i18n.global.t("agent.eventPromotion"),
  },
  {
    value: 2,
    label: i18n.global.t("agent.comprehensivePromotion"),
  },
  {
    value: 3,
    label: i18n.global.t("agent.appPromotion"),
  },
  {
    value: 4,
    label: i18n.global.t("agent.sponsorshipPromotion"),
  },
  {
    value: 5,
    label: i18n.global.t("agent.freePromotion"),
  },
  {
    value: 6,
    label: i18n.global.t("agent.promotionActivities"),
  },
  {
    value: 7,
    label: i18n.global.t("agent.virtualCurrencyPromotion"),
  },
  {
    value: 8,
    label: i18n.global.t("agent.agencyPromotion"),
  },
  {
    value: 9,
    label: i18n.global.t("agent.livePromotion"),
  },
]);
//查询
function handleQuery() {
  promotionalMaterialList();
}
//{{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.pictureName = "";
  queryParams.value.pictureType = "";
  queryParams.value.status = "";
  promotionalMaterialList();
}
//新增弹窗
const materialLine = ref(false);
const promotionalMaterials = ref(false);
const addNewMaterial = () => {
  promotionalMaterials.value = !promotionalMaterials.value;
  opRowitem.value = {};
};
// 编辑传参
const editMain = (row) => {
  opRowitem.value = row;
  promotionalMaterials.value = true;
};
// 新增编辑弹窗确认
const submitBtn = () => {
  promotionalMaterials.value = false;
  materialLine.value = false;
  promotionalMaterialList();
};
//关闭弹窗清空数据
const handleClose = () => {
  promotionalMaterials.value = false;
};
//开关
function changeStatus(row) {
  proxy.$modal
    .confirms(
      i18n.global.t("agent.areYouSureChangeSwitchStatus"),
      i18n.global.t("agent.tips")
    )
    .then(() => {
      enableOrDisableApi({
        id: row.id,
        status: row.status,
      }).then((res) => {
        promotionalMaterialList();
        proxy.$modal.msgSuccess(i18n.global.t("agent.statusSwitchSuccessful"));
      });
    })
    .catch(() => {
      row.status = row.status == "0" ? 1 : 0;
    });
}
// 删除
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t("agent.isDeleteData"))
    .then(() => {
      deleteMaterialApi(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.deleteSuccessfully"),
        });
        promotionalMaterialList();
      });
    })
    .catch(() => {});
};
const statusList = ref([
  {
    value: "",
    label: i18n.global.t("agent.all"),
  },
  {
    value: 0,
    label: i18n.global.t("agent.disable"),
  },
  {
    value: 1,
    label: i18n.global.t("agent.enable"),
  },
]);
// 列表
const promotionalMaterialList = async () => {
  try {
    let res = await inquireMaterialListApi(queryParams.value);
    tableData.value = res.rows;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
//表格数据
const tableData = ref([]);
// 分页
function getList() {
  loading.value = true;
  inquireMaterialListApi(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch((err) => {
      loading.value = false;
    });
}

onMounted(() => {
  promotionalMaterialList();
});
</script>

<style lang="scss" scoped></style>
