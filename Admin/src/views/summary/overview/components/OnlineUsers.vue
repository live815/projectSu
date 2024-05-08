<template>
  <div class="online-users">
    <div class="header">
      <div class="online-user-title">
        <span class="first-title">{{ $t("summary.onlineNumber") }}</span>
        <div :class="{active:currentIndex === 1}" @click="switchEchart(bar)">
          <img src="../img/bar.svg" alt="" class="ml-12 bar-img" />
        </div>
        <div :class="{active:currentIndex === 2}" @click="switchEchart(line)">
          <img src="../img/line.svg" alt="" class="ml-12 line-img" />
        </div>
      </div>
      <div class="time-radio">
        <el-radio-group v-model="radio" @change="timeSelect">
          <el-radio :label="1">{{ $t("summary.today") }}</el-radio>
          <el-radio :label="2">{{ $t("summary.yesterday") }}</el-radio>
          <el-radio :label="3">{{ radioParams.date1 }}</el-radio>
          <el-radio :label="4">{{ radioParams.date2 }}</el-radio>
          <el-radio :label="5">{{ radioParams.date3 }}</el-radio>
        </el-radio-group>
      </div>
      <el-popover
        placement="left"
        :width="300"
        trigger="click"
        :visible="visible"
      >
        <template #reference>
          <div class="time-choose" @click="showPopover">
            <img src="../img/add-time.png" alt="" />
            <span class="ml-8 title">{{ $t("summary.timeOfYourChoice") }}</span>
          </div>
        </template>
        <el-form
          :model="queryParams"
          label-position="left"
          ref="queryRef"
          :rules="rules"
        >
          <el-row>
            <el-col>
              <el-form-item label="日期1:" prop="date1">
                <el-date-picker
                  v-model="queryParams.date1"
                  type="date"
                  placeholder="Pick a day"
                  size="default"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="日期2:" prop="date2">
                <el-date-picker
                  v-model="queryParams.date2"
                  type="date"
                  placeholder="Pick a day"
                  value-format="YYYY-MM-DD"
                  size="default"
                />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="日期3:" prop="date3">
                <el-date-picker
                  v-model="queryParams.date3"
                  type="date"
                  placeholder="Pick a day"
                  size="default"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
            <el-col style="text-align: right;">
              <el-button @click="cancel">取消</el-button>
              <el-button type="primary" @click="submit">确定</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-popover>
    </div>
    <LineEchartsOnline :option="echartData" v-if="currentIndex === 2 && (echartData && echartData.length)" />
    <BarEchartsOnline :option="echartData" v-if="currentIndex === 1 && (echartData && echartData.length)" />
    <el-empty :description="$t('member.noData')" v-if="echartData && echartData.length === 0"></el-empty>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { deepClone } from "@/utils/index";
import { getOnLineCount } from "@/api/summary/index";
import LineEchartsOnline from "./LineEchartsOnline.vue";
import BarEchartsOnline from "./BarEchartsOnline.vue";

const currentIndex = ref(1);
const bar = ref(1);
const line = ref(2);
const radio = ref(1);
const queryRef = ref(null);
const queryParams = ref({
  date1: null,
  date2: null,
  date3: null,
});
const rules = ref({
  date1:[{required:true,message:"请选择日期1",trigger:"change"}],
  date2:[{required:true,message:"请选择日期2",trigger:"change"}],
  date3:[{required:true,message:"请选择日期3",trigger:"change"}]
})
const radioParams = ref({
  date1: getDefaultDate(2),
  date2: getDefaultDate(3),
  date3: getDefaultDate(4),
})
const visible = ref(false);
const echartData = ref([]);

getList();
function getList(){
  console.log(formatTimeRadio(radio.value))
  getOnLineCount({
    reportDay:formatTimeRadio(radio.value)
  }).then(res=>{
    echartData.value = res || [];
  })
  // echartData.value = [Math.random()*100,Math.random()*200,Math.random()*300,Math.random()*100,Math.random()*200,Math.random()*300,Math.random()*100,Math.random()*200,Math.random()*300,Math.random()*100,Math.random()*200,Math.random()*300]
//  return  
}
function formatTimeRadio(data){
  switch (data) {
    case 1:
      return getDefaultDate(0);
    case 2:
      return getDefaultDate(1);
    case 3:
      return radioParams.value.date1;
    case 4:
      return radioParams.value.date2;
    case 5:
      return radioParams.value.date3;
}
}
function timeSelect(val) {
  getList();
}
function switchEchart(val){
  currentIndex.value = val;
}
function showPopover(){
  visible.value = true;
  queryParams.value = deepClone(radioParams.value)
}

function cancel(){
  queryRef.value.resetFields();
  queryParams.value = deepClone(radioParams.value)
}
function submit() {
  queryRef.value.validate(valid=>{
    if(valid){
      radioParams.value =  deepClone(queryParams.value);
      visible.value = false;
    }
  })
}
function getDefaultDate(val) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - val);
  return formatDate(yesterday);
}
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
watch(()=>radioParams.value, (newValues, oldValues) => {
  // console.log("date1 changed:", newValues.date1,oldValues.date1);
  // console.log("date2 changed:", newValues.date2,oldValues.date2);
  // console.log("date3 changed:", newValues.date3,oldValues.date3);
  if(newValues.date1 !== oldValues.date1 && radio.value === 3){
    getList();
  }
  if(newValues.date2 !== oldValues.date2 && radio.value === 4){
    getList();
  }
  if(newValues.date3 !== oldValues.date3 && radio.value === 5){
    getList();
  }
},{
  deep:true
});
</script>

<style lang="scss" scoped>
.online-users {
  margin-top: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .online-user-title {
      display: flex;
      align-items: baseline;
      .first-title{
        color: #333333;
        font-size: 24px;
        font-weight: 600;
      }
      .bar-img {
        width: 52px;
        height: 52px;
      }
      .line-img {
        width: 40px;
        height: 32px;
      }
      .active{
        border-bottom:5px solid blue;
      }
    }
    .time-choose {
      display: flex;
      align-items: center;
      img {
        width: 30px;
      }
      .title {
        color: #333333;
        font-size: 24px;
      }
    }
    
  }
}
</style>