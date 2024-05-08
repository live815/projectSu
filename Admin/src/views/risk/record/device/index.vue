<template>
  <div class="risk-record-device-index" v-loading="loading">
    <DeviceLoginPercent />
    <AndroidDevice />
  </div>
</template>

<script setup>
import {
  getCurrentInstance,
  onMounted,
} from "vue";
import { getOrderList } from "@/api/funds/record/index";
import { getVIPList } from "@/api/funds/config/index";
import DeviceLoginPercent from "./components/DeviceLoginPercent.vue";
import  AndroidDevice from "./components/AndroidDevice.vue";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  userName:null, //会员账号
  realName:null, //调整人
  changeBefore:null, //调整前
  changeAfter:null, //调整后
  adjustType:null, //调整类型
  spicyName:null, //策略名称
  statusArr: ["2"],
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const dateRange = ref([]);
const tableData = ref([
  {
    id:11111,
    riskScore:56,
    spicyName:"策略一"
  }
]);
const total = ref(1);
const loading = ref(false);
const open = ref(false);
const id = ref(null);

onMounted(async ()=>{
  await getList();
})
function getList() {
  // loading.value = true;
  // return getOrderList(queryParams.value)
  //   .then((res) => {
  //     loading.value = false;
  //     tableData.value = res.rows || [];
  //     total.value = res.total;
  //   })
  //   .catch(() => {
  //     loading.value = false;
  //   });
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
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
function openDia(row){
  id.value = row.id
  open.value = true
}
</script>

<style lang="scss" scoped>
.risk-record-device-index {
  padding:20px;
}
</style>
