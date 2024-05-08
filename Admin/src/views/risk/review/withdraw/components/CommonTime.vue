<template>
  <div class="common-title">
    <el-row class="btn-group">
      <el-col :span="12">
        <el-button
          size="small"
          :class="{ activebtn: currentIndex === index }"
          v-for="(item, index) in btnList"
          :key="item.label"
          @click="handleQuery(item, index)"
          >{{ item.label }}</el-button
        >
      </el-col>
      <el-col :span="12" style="display: flex; align-items: center">
        <div class="time-range">{{ $t('risk.timeRange') }}</div>
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('risk.beginTime')"
          :end-placeholder="$t('risk.endTime')"
          @change="handleChange"
          style="width: 70%"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        >
        </el-date-picker>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getDateTime } from "../common/common.js";
import { defaultTime, shortcuts } from "@/utils/config";

const emit = defineEmits(["query"])
const currentIndex = ref(0);
const btnList = ref(getDateTime());
const dateRange = ref([]);
const queryParams = ref({
  // beginTime: null,
  // endTime: null,
  // type:null
});


onMounted(()=>{
  handleQuery(btnList.value[0],0)
})

function handleQuery(item, index) {
  dateRange.value = []
  currentIndex.value = index;
  // queryParams.value.beginTime = item.beginTime;
  // queryParams.value.endTime = item.endTime;
  queryParams.value.type = item.type;
  delete queryParams.value.beginTime
  delete queryParams.value.endTime
  emit("query",queryParams.value)
}

function handleChange() {
  currentIndex.value = -1;
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.type = '0'
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
    emit("query",queryParams.value)
  }
}
</script>

<style lang="scss" scoped>
.common-title{
  .btn-group {
    margin-bottom: 16px;
    .el-button {
      width: 73px;
    }
    .time-range {
      border: 1px solid rgba(127, 127, 127, 1);
      height: 32px;
      line-height: 32px;
      color: #7f7f7f;
      font-size: 13px;
      padding: 0 4px;
      border-radius: 5px;
      background: #ffffff;
    }
    & .activebtn {
      border: 1px solid red;
      color: #409eff;
    }
  }
}
</style>