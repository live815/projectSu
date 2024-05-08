<template>
  <div class="profit-device-query">
    <h3 class="h3-title">{{ $t('member.sameDeviceNoQuery') }}</h3>
    <el-table :data="tableDataDeviceQuery" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.deviceType')" prop="deviceType" width="200" align="center">
        <template #default="{ row }">
          <span>{{ row.deviceType || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.deviceNoLoginTimesPercent')" prop="deviceNo" align="center">
        <template #default="{ row }">
          <span class="mr-8" @click="goDetail(row)" style="cursor: pointer;">
            {{row.deviceNo}}({{ row.loginTimes }} / {{ formatDataPercent(row.percent) }} ) 
          </span>
          <span>{{ $t('member.totalNumber',{num:row.total}) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.lastTimeLoginTime')" prop="time" align="center">
        <template #default="{ row }">
          <span>{{ row.time || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.recentlyThreeMonth')" prop="totalTimes" align="center">
        <template #default="{ row }">
          <span>{{ row.totalTimes || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" width="90" align="center">
        <template #default="{row}">
          <span @click="queryIp" style="color:#FF0000;font-size:12px;">查看</span>
          <!-- <el-button type="primary" size="small" @click="queryDevive">{{ $t('member.check') }}</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <h3 class="h3-title">同设备号信息</h3>
    <el-table :data="tableDataDeviceInfo">
      <el-table-column label="会员账号" prop=""></el-table-column>
      <el-table-column label="会员姓名" prop=""></el-table-column>
      <el-table-column label="国籍" prop=""></el-table-column>
      <el-table-column label="上级代理" prop=""></el-table-column>
      <el-table-column label="会员标签" prop=""></el-table-column>
      <el-table-column label="账号状态" prop=""></el-table-column>
      <el-table-column label="是否绑定手机号" prop=""></el-table-column>
      <el-table-column label="注册时间" prop=""></el-table-column>
      <el-table-column label="最后登陆时间" prop=""></el-table-column>
      <el-table-column label="近3个月登录总次数" prop=""></el-table-column>
      <el-table-column label="充值金额" prop=""></el-table-column>
      <el-table-column label="提款金额" prop=""></el-table-column>
      <el-table-column label="账户余额" prop=""></el-table-column>
      <el-table-column label="公司输赢" prop=""></el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    /> -->
    <DeviceOrIpQueryTable
      v-model:open="open"
      :type="type"
      :cloneRow="cloneRow"
      v-if="open"
     />
  </div>
</template>

<script setup>
import { formatDataPercent } from "@/utils";
import DeviceOrIpQueryTable from "./components/DeviceOrIpQueryTable.vue";
const props = defineProps(["activeName","activeProfitInfo","userName"]);

const queryParams = ref({
  pageNum:1,
  pageSize:10
})
const tableDataDeviceQuery = ref([
  {
    deviceType:'Android',
    deviceNo:'Android-593bbe8d8ac78fb2543c1a7c73050f65',
    loginTimes:6,
    percent:60,
    total:9
  }
]);
const tableDataDeviceInfo = ref([]);
const total = ref(0)
const open = ref(false);
const type = ref(null);
const cloneRow = ref(null);

function queryDevive(){

}
function getList(){
  console.log("设备号查询")
}
function goDetail(row){
  type.value = 'device';
  cloneRow.value = row
  open.value = true;
}

watch([()=>props.activeName,()=>props.activeProfitInfo,()=>props.userName],()=>{
  if(props.activeName==='4'&&props.activeProfitInfo==='1'&&props.userName){
    getList()
  }
})
</script>

<style lang="scss" scoped>
.profit-device-query{
  .h3-title{
    font-size:16px;
    font-weight:600;
  }
}
</style>