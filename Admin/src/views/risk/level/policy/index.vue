<template>
  <div class="risk-control-management-level-policy" v-loading="loading">
    <!-- 策略配置 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item :label="$t('risk.policyName')" prop="ployName" class="full-width">
            <el-input
              v-model="queryParams.ployName"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('risk.effectLayer')" prop="effectLayerItem" class="full-width">
            <el-select
              v-model="queryParams.effectLayerItem"
              :placeholder="$t('risk.pleaseSelect')"
              clearable
              class="full-width"
              multiple
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in levelTypeList"
                :key="dict.id"
                :label="dict.layerName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('risk.targetLayer')" prop="targetLayerItem" class="full-width">
            <el-select
              v-model="queryParams.targetLayerItem"
              :placeholder="$t('risk.pleaseSelect')"
              clearable
              class="full-width"
              multiple
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in levelTypeList"
                :key="dict.id"
                :label="dict.layerName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{$t('risk.search')}}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{$t('risk.reset')}}</el-button>
            <el-button icon="Plus" @click="addLevel" class="add-btn">{{$t('risk.add')}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('risk.handle')" align="center">
        <template #default="{ row }">
          <el-button @click="editLevel(row)" type="primary" size="small"
            >{{ $t('risk.edit') }}</el-button
          >
          <el-button @click="delLevel(row)" type="danger" size="small"
            >{{ $t('risk.delete') }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.policyNameNoQuote')" prop="ployName" align="center">
        <template #default="{ row }">
          <span>{{ row.ployName ? row.ployName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.effectLayerNoQuote')" prop="effectLayerItem" align="center" width="180">
        <template #default="{ row }">
          <span v-if="row.effectLayerItem&&row.effectLayerItem.length!==0">
            {{ levelTypeList.filter(item=>row.effectLayerItem.includes(item.id)).map(mp=>mp.layerName).join(',') }}
          </span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.targetLayerNoQuote')" prop="targetLayer" align="center" width="180">
        <template #default="{ row }">
          <span>
            {{ filterLabel(levelTypeList,row.targetLayer) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.priority')" prop="priority" align="center">
        <template #default="{ row }">
          <span>{{ row.priority||row.priority===0 ? row.priority : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.remarkNoQuote')" prop="remark" align="center">
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.createBy')" prop="createBy" align="center">
        <template #default="{ row }">
          <span>{{ row.createBy ? row.createBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.creativeTime')" prop="createTime" align="center" width="180">
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.lastUpdateBy')" prop="updateBy" align="center">
        <template #default="{ row }">
          <span>{{ row.updateBy ? row.updateBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.lastUpdateTime')" prop="updateTime" align="center" width="180">
        <template #default="{ row }">
          <span>{{ row.updateTime ? row.updateTime : "-" }}</span>
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
    <AddOrEditDialog 
      v-model:open="open" 
      :type="type" 
      :id="id"
      :levelTypeList="levelTypeList"
      @onrefresh="getList"
      v-if="open"
    />
  </div>
</template>

<script setup name="Policy-config">
import i18n from "@/i18n";
import AddOrEditDialog from "./components/AddOrEditDialog.vue";
import { getCurrentInstance, onMounted } from "vue";
import { getRiskPloyList,delRiskPloy,getRiskFinancalList } from "@/api/risk/level/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  ployName: null, //策略名称
  effectLayerItem: [], // 当前作用层级
  targetLayerItem:[], // 目标作用层级
  pageNum: 1,
  pageSize: 10,
});
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const levelTypeList = ref([]); //作用层级和目标层级传类型0获取下拉
const type = ref(null);
const open = ref(false);
const id = ref(null);
const isFirstLoad = ref(true);

onMounted(async ()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
  await queryLevel();
})
async function queryLevel() {
  return getRiskFinancalList(0).then((res) => {
    levelTypeList.value = res || [];
  });
}
async function getList() {
  loading.value = true;
  return getRiskPloyList(queryParams.value).then(res=>{
    loading.value = false;
    tableData.value = res.records || [];
    total.value = res.total || 0;
  }).catch(()=>{
    loading.value = false;
  })
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
}
function addLevel() {
  type.value = "add";
  open.value = true;
}
function editLevel(row) {
  type.value = "edit";
  open.value = true;
  id.value = row.id;
}
function delLevel(row) {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToDelete"), i18n.global.t("risk.tips"))
    .then(() => {
        delRiskPloy(row.id).then(res=>{
        getList()
        proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"));
      })
    })
    .catch(() => {});
}
function filterLabel(list,type){
  const item = list.find(layer=>layer.id === type);
  return item ? item.layerName:"-" 
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
    await queryLevel();
  }
})
</script>

<style lang="scss" scoped>
.risk-control-management-level-policy {
  padding: 20px;
  .add-btn{
    background: #F59A23;
    color:#FFF;
  }
}
</style>
