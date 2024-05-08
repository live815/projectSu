<!--推广域名管理-->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.promoteDomainName')" :name="0">
        <div v-if="activeName == 0">
          <el-form :model="queryParams" :inline="true">
            <el-form-item
              :label="$t('agent.agentAccountQuote')"
              prop="agentName"
            >
              <el-input
                v-model="queryParams.agentName"
                :placeholder="$t('agent.pleaseEnterAgentAccount')"
              />
            </el-form-item>
            <el-form-item :label="$t('agent.domainNameQuot')" prop="domainName">
              <el-input
                v-model="queryParams.domainName"
                :placeholder="$t('agent.pleaseEnterDomainName')"
              />
            </el-form-item>
            <el-form-item :label="$t('agent.domainNameType')" prop="">
              <el-select
                v-model="queryParams.domainType"
                clearable
                :placeholder="$t('agent.pleaseEnterDomainNameType')"
              >
                <el-option
                  v-for="item in domainTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('agent.statusQuote')" prop="">
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
              <el-button
                type="warning"
                icon="Plus"
                @click="addNewMaterial(null)"
                >{{ $t("agent.add") }}</el-button
              >
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
              prop="agentName"
              :label="$t('agent.agentAccount')"
              width="180"
            />
            <el-table-column
              prop="domainName"
              :label="$t('agent.domainName')"
              width="180"
            >
              <template #default="{ row }">
                <el-button type="primary" plain @click="toshowPreview(row)">{{
                  $t("agent.viewDomainNameDetails")
                }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="domainType"
              :label="$t('agent.domainNameTypeQuot')"
              width="180"
            >
              <template #default="scope">
                <span v-if="scope.row.domainType == 0">{{
                  $t("agent.pcLandingPage")
                }}</span>
                <span v-if="scope.row.domainType == 1">{{
                  $t("agent.h5LandingPage")
                }}</span>
                <span v-if="scope.row.domainType == 2">{{
                  $t("agent.commonDomainName")
                }}</span>
                <span v-if="scope.row.domainType == 3"
                  >{{ $t("agent.exclusiveDomainName") }}
                </span>
                <span v-if="scope.row.domainType == 4"
                  >{{ $t("agent.h5PromotionDomainName") }}
                </span>
                <span v-if="scope.row.domainType == 5"
                  >{{ $t("agent.alternateDomainName") }}
                </span>
                <span v-if="scope.row.domainType == 6"
                  >{{ $t("agent.pcProxyLink") }}
                </span>
                <span v-if="scope.row.domainType == 7"
                  >{{ $t("agent.h5ProxyLink") }}
                </span>
                <span v-if="scope.row.domainType == 8"
                  >{{ $t("agent.fullSiteAppAgentLink") }}
                </span>
                <span v-if="scope.row.domainType == 9"
                  >{{ $t("agent.sportsAppAgentLink") }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="appDownloadUrl"
              :label="$t('agent.appDownloadAddress')"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              :label="$t('agent.status')"
              width="180"
            >
              <template #default="{ row }">
                <el-switch
                  v-model="row.status"
                  :active-value="1"
                  :inactive-value="0"
                  @click="changeSwitch(row)"
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
              width="350"
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
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.shortDomainName')" :name="1">
        <shortUrl v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.domainNamePool')" :name="2">
        <DomainNamePool v-if="activeName == 2" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      v-model="promotionalMaterials"
      :title="
        materialLine ? $t('agent.addDomainName') : $t('agent.editDomainName')
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

    <el-dialog
      v-model="domainNameContent"
      :title="$t('agent.domainNamedetails')"
      width="700px"
      :center="true"
    >
      <DomainNameDetails :previewContent="previewContent" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import AddAndEdit from "./AddAndEdit.vue";
import DomainNameDetails from "./DomainNameDetails.vue";
import {
  domainManagementApi,
  domainNameStatusApi,
  deleteDomainNameApi,
} from "@/api/agent/promotionConfig/promotionConfig.js";
import shortUrl from "./shortUrl.vue";
import DomainNamePool from "./DomainNamePool.vue";
import i18n from "@/i18n";
const activeName = ref(0);
const { proxy } = getCurrentInstance();
const queryParams = ref({
  agentName: null,
  domainName: "",
  domainType: null,
  pageNum: 1,
  pageSize: 10,
  status: "",
  tenantId: "",
  createBy: "",
  createTime: "",
});
const total = ref(5);
const opRowitem = ref({});
const loading = ref(false);
const domainTypeList = ref([
  {
    value: "",
    label: i18n.global.t("agent.all"),
  },
  {
    value: 0,
    label: i18n.global.t("agent.pcLandingPage"),
  },
  {
    value: 1,
    label: i18n.global.t("agent.h5LandingPage"),
  },
  {
    value: 2,
    label: i18n.global.t("agent.commonDomainName"),
  },
  {
    value: 3,
    label: i18n.global.t("agent.exclusiveDomainName"),
  },
  {
    value: 4,
    label: i18n.global.t("agent.h5PromotionDomainName"),
  },
  {
    value: 5,
    label: i18n.global.t("agent.alternateDomainName"),
  },
  {
    value: 6,
    label: i18n.global.t("agent.pcProxyLink"),
  },
  {
    value: 7,
    label: i18n.global.t("agent.h5ProxyLink"),
  },
  {
    value: 8,
    label: i18n.global.t("agent.fullSiteAppAgentLink"),
  },
  {
    value: 9,
    label: i18n.global.t("agent.sportsAppAgentLink"),
  },
]);
//{{$t('agent.search')}}
function handleQuery() {
  domainManagementList();
}
//{{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.agentName = "";
  queryParams.value.domainName = "";
  queryParams.value.domainType = "";
  queryParams.value.status = "";
  domainManagementList();
}
//新增弹窗
const materialLine = ref(false);
const promotionalMaterials = ref(false);
const addNewMaterial = () => {
  promotionalMaterials.value = !promotionalMaterials.value;
  opRowitem.value = {};
};
// 新增编辑弹窗确认
const submitBtn = () => {
  promotionalMaterials.value = false;
  materialLine.value = false;
  domainManagementList();
};
// 编辑传参
const editMain = (row) => {
  opRowitem.value = row;
  promotionalMaterials.value = true;
};
//域名内容详情
const domainNameContent = ref(false);
const previewContent = ref();
const toshowPreview = (item) => {
  previewContent.value = item;
  domainNameContent.value = !domainNameContent.value;
};
//关闭弹窗清空数据
const handleClose = () => {
  promotionalMaterials.value = false;
};
//开关
function changeSwitch(row) {
  proxy.$modal
    .confirms(i18n.global.t("agent.switchPrompt"), i18n.global.t("agent.tips"))
    .then(() => {
      domainNameStatusApi({
        id: row.id,
        status: row.status,
      }).then((res) => {
        domainManagementList();
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
      deleteDomainNameApi(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.deleteSuccessfully"),
        });
        // getCount();
        domainManagementList();
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
//表格数据
const tableData = ref([]);
// 列表
const domainManagementList = async () => {
  try {
    let res = await domainManagementApi(queryParams.value);
    tableData.value = res.rows;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
// 分页
function getList() {
  loading.value = true;
  domainManagementApi(queryParams.value)
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
  domainManagementList();
});
</script>

<style lang="scss" scoped></style>
