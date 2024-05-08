<!-- vip等级变更记录 -->
<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('member.changeTimeNoQuote')"  class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.changeType')" prop="type" class="full-width">
            <el-select
              v-model="queryParams.type"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item label="变更方式:" prop="chgWay" class="full-width">
            <el-select
              v-model="queryParams.chgWay"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in changeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="4">
          <el-form-item label="变更前:" prop="chgBefore"  class="full-width">
            <el-input
              v-model="queryParams.chgBefore"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="变更后:" prop="chgAfter"  class="full-width">
            <el-input
              v-model="queryParams.chgAfter"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col> -->
        <el-col :span="4">
          <el-form-item :label="$t('member.userName')" prop="userName"  class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.updateByQuote')" prop="createBy"  class="full-width">
            <el-input
              v-model="queryParams.createBy"
              :placeholder="$t('member.pleaseInput')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="Search" @click="handleQuery"
            >{{ $t('member.search') }}</el-button
          >
          <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
      :empty-text="$t('member.noData')"
    >
      <el-table-column
        prop="createTime"
        :label="$t('member.changeTimeNoQuote')"
        sortable
        width="180"
        align="center"
      />
      <el-table-column
        prop="type"
        :label="$t('member.changeTypeNoQuote')"
        width="180"
        align="center"
      >
        <template #default="{row}">
          <span>{{ filterLabel(typeList,row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="chgBefore" :label="$t('member.chgBefore')" align="center">
        <template #default="{row}">
          <span v-if="row.chgBefore||row.chgBefore===0">VIP{{ row.chgBefore }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="chgAfter" :label="$t('member.chgAfter')" align="center">
        <template #default="{row}">
          <span v-if="row.chgAfter||row.chgAfter===0">VIP{{ row.chgAfter }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column> 
      <el-table-column prop="userName" :label="$t('member.userNameNoQuote')" align="center" />
      <el-table-column prop="labels" :label="$t('member.memberLabel')" align="center">
        <template #default="{row}">
          <span>{{ row.labels || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column  :label="$t('member.accountStatus')" align="center" width="200px">
        <template #default="{ row }">
          <div v-if="row.status" style="display:flex;flex-wrap: wrap;justify-content: center;">
            <el-tag v-for="item in row.status.split(',')"
            :type="colorSwitch(item)" style="margin-right:4px;margin-bottom: 4px;">
              {{ statusSwitchToLabel(item) }}
            </el-tag>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" :label="$t('member.updateBy')" align="center">
        <template #default="{row}">
          <span>{{ row.createBy || "-" }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <pagination
    v-show="total > 0"
    :total="total"
    v-model:page="queryParams.pageNum"
    v-model:limit="queryParams.pageSize"
    @pagination="getList"
    style="height: 40px"
  />
</template>

<script setup>
import i18n from "@/i18n";
import { defaultTime, shortcuts } from "@/utils/config";
import { getCurrentInstance, onMounted, ref } from "vue";
import { getViplogList } from "@/api/member/vip/index";
import { filterLabel } from "@/utils/index";
import { statusSwitchToLabel,colorSwitch } from "@/views/member/list/common/common";

const { proxy } = getCurrentInstance()
const dateRange = ref([]);
const typeList = [
  {
    value: 0,
    label: i18n.global.t("member.upgrade"),
  },
  {
    value: 1,
    label: i18n.global.t("member.downGrade"),
  },
];
const queryRef = ref(null)
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  type:null,
  userName:null,
  createBy:null,
  chgBefore:null,
  chgAfter:null,
  // chgWay:null
});
// 表格
const tableData = ref([]);
const total = ref(0);
const isFirstLoad = ref(true);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value =  false;
  }
})
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryRef.value.resetFields()
  dateRange.value = [];
}

function getList() {
  return getViplogList(proxy.addDateRange(queryParams.value, dateRange.value)).then(res=>{
    tableData.value = res.rows || [];
    total.value = res.total || 0;
  })
};
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  .tag-a {
    margin-bottom: 5px;
  }
}

:deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
  height: 60px !important;
}
</style>
