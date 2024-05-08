<template>
  <div class="upload-provide">
    <el-row>
      <el-col>
        <span class="bank-card-title">{{ bankTitle }}</span>
      </el-col>
      <el-col class="mt-20 mb-20">
        <span class="common-title mr-8">{{ switchTitle }}</span>
      </el-col>
      <el-col>
        <el-switch
          v-model="withdrawSwitch"
          active-value="0"
          inactive-value="1"
        ></el-switch>
      </el-col>
      <el-col class="mt-20">
        <span class="bank-card-title"><span>*</span>{{ vipTitle }}</span>
      </el-col>
      <el-col class="mb-20 mt-20" style="display: flex">
        <el-col :span="2" style="padding-top: 9px">
          <span class="common-title mr-8">{{ checkTitle }}</span>
        </el-col>
        <el-col :span="22">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全部</el-checkbox
          >
          <el-checkbox-group
            v-model="vipLevelItem"
            @change="handleSingleChange"
          >
            <el-checkbox
              v-for="item in vipLevelList"
              :label="item.vipLevel"
              :key="item.vipLevel"
            >
              {{ item.vipName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-col>
    </el-row>
    <div class="bank-card-title mt-20 mb-20">{{ unforceTitle }}</div>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="会员账号:" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="导入时间:" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="handleChange"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >查询</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            <el-button icon="Plus" @click="add" class="add-btn"
              >新增</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="mb-16">
      <el-button type="primary" @click="multiDel"  :disabled="isEdit">批量删除</el-button>
      <el-button type="success" @click="multiImport" :disabled="isEdit">批量导入</el-button>
    </el-row>
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员账号" prop="userName" align="center">
        <template #default="{ row }">
          <span>{{ row.userName ? row.userName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" align="center">
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="导入时间" prop="createTime" align="center">
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template #default="{ row }">
          <el-button @click="Del(row)" type="warning" size="small"
            >删除</el-button
          >
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
  </div>
</template>

<script setup>
import { getVIPList } from "@/api/funds/config/index";
import { computed } from "vue";

const bankTitle = ref("银行卡转卡(C2C)上传凭证设置");
const switchTitle = ref("强制上传凭证开启");
const vipTitle = ref("强制上传凭证VIP");
const checkTitle = ref("VIP等级:");
const unforceTitle = ref("非强制上传凭证会员");
const withdrawSwitch = ref("0");
const checkAll = ref(false); //vip多选
const isIndeterminate = ref(true);
const vipLevelList = ref([]);
const vipLevelItem = ref([]); //vip等级选中项
const queryParams = ref({
  userName: null,
  beginTime: null,
  endTime: null,
  pageNum:1,
  pageSize:10
});
const dateRange = ref([]);
const tableData =ref([]);
const total = ref(0);

const isEdit = computed(()=>{
  return tableData.value && tableData.value.length === 0
})

onMounted(async () => {
  await queryVIP();
});
//查询VIP层级
async function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
function handleCheckAllChange(val) {
  vipLevelItem.value = val
    ? vipLevelList.value.map((item) => item.vipLevel)
    : [];
  isIndeterminate.value = false;
}
//拿到数据之后，先调用此方法去回显多选项
function handleSingleChange(value) {
  const checkedVip = value.length;
  checkAll.value = checkedVip === vipLevelList.value.length;
  isIndeterminate.value =
    checkedVip > 0 && checkedVip < vipLevelList.value.length;
}

function getList(){

}
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
}
function add(){

}
function del(row){

}
function multiDel(){

}
function multiImport(){

}
function handleSelectionChange(selection){

}
</script>

<style lang="scss" scoped>
.upload-provide {
  .bank-card-title {
    font-size: 14px;
    color: #333333;
    font-weight: 600;
    & span {
      color: #d9001b;
    }
  }
  .common-title {
    font-size: 13px;
    color: #333333;
  }
  .add-btn{
    color:#FFFFFF;
    background:#009978;
  }
  .multi-del-btn{
    color:#FFFFFF;
    background:#3423F5;
  }
}
</style>
