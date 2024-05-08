<template>
  <div class="app-container" id="withdraw-rate-config">
    <div class="title">
      虚拟币提现汇率
      <el-button class="btn" type="primary" @click="updataData">编辑</el-button>
    </div>
    <div>
      <el-table :data="tableData" border>
        <el-table-column prop="date" label="法币" width="180" align="center">
          <template #default="{ row }">
            <span>{{Currency}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="虚拟币" width="180" align="center">
          <template #default="{ row }">
            <span>USDT</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fixedRate"
          label="参考汇率"
          width="180"
          align="center"
        >
          <template #default="{ row }">
            <span>{{ row.referenceRate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="diff" label="偏差值" width="180" align="center">
          <template #default="{ row }">
            <el-input
              v-model="rowData.diff"
              maxLength="8"
              @input="handleInput('diff')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="fixedRate"
          label="固定汇率"
          width="180"
          align="center"
        >
          <template #default="{ row }">
            <el-input v-model="rowData.fixedRate" disabled></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="type" label="使用值" width="180" align="center">
          <template #default>
            <span
              class="switch"
              :class="{ active: rowData.type == 1 }"
              @click="swichType(1)"
              >浮动值</span
            >
            <span
              class="switch"
              :class="{ active: rowData.type == 2 }"
              @click="swichType(2)"
              >固定值</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="updateBy"
          label="最后操作人"
          width="180"
          align="center"
        />
        <el-table-column
          prop="updateTime"
          label="最后操作时间"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
import {
  getWithdrawRateApi,
  updateWithdrawRateApi,
} from "@/api/agent/agentConfig.js";
onMounted(() => {
  getData();
});
// 获取数据处理成数组
const tableData = computed(() => {
  let item = [];
  item.push(rowData.value);
  return item;
});
const rowData = ref({
  diff: 0,
  fixedRate: 0,
  legalCurrency: "",
  referenceRate: 0,
  type: 0,
  virtualCurrency: "",
});
// 获取数据接口
const getData = () => {
  getWithdrawRateApi().then((res) => {
    rowData.value = res;
  });
};
// 切换类型
const swichType = (num) => {
  rowData.value.type = num;
};
// 计算浮动汇率
const floatRate = computed(() => {
  let num = parseFloat(rowData.value.diff) + rowData.value.fixedRate;
  if (isNaN(num)) {
    return "请输入正确的偏差值";
  } else {
    return num;
  }
});
// 提交并更新
const updataData = () => {
  const diffValue = parseFloat(rowData.value.diff);
  const diffRegex = /^[-\d]+(\.[\d]+)?$/;
  if (isNaN(diffValue) || !diffRegex.test(rowData.value.diff)) {
    proxy.$modal.msgError("偏差值只能包含数字、小数点和负号");
    return;
  }
  updateWithdrawRateApi(rowData.value).then((res) => {
    proxy.$modal.msgSuccess(`${i18n.global.t("agent.submittedSuccessfully")}`);
    getData();
  });
};

// 拼音输入时实时更新输入值
// const handleInput = (field) => {
//   rowData.value[field] = rowData.value[field].replace(/^(0+)|[^\d]+/g, "");
// };
</script>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: 600;
}
.btn {
  margin-left: 50px;
}
.switch {
  display: inline-block;
  width: 60px;
  height: 25px;
  border: 1px solid rgb(170, 170, 170);
  cursor: pointer;
}
.active {
  color: #fff;
  background-color: rgb(22, 155, 213);
}
:deep() {
  .el-input__inner {
    text-align: center;
  }
}
</style>
