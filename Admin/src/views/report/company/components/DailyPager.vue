<template>
  <div class="daily-pager">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-form-item :label="$t('report.paperType')" class="full-width">
            <el-select
                v-model="req"
                @change="toggleOption"
                class="full-width"
            >
              <el-option
                  v-for="item in reqList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('report.parentAnotherNameQuote')" class="full-width">
            <el-input
                v-model="queryParams.proxy"
                :placeholder="$t('report.pleaseInput')"
                clearable
                class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="activeName==='1' || radioData==='2'">
          <el-form-item :label="$t('report.timeRange')" class="full-width">
            <el-date-picker
                v-model="dateRange"
                :type="daterangeType"
                range-separator="-"
                :clearable="false"
                :editable="false"
                @change="handleChange"
                class="full-width"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="full-width">
            <el-button
                type="primary"
                icon="Search"
                @click="handleQuery"
            >{{ $t('report.search') }}</el-button
            >
            <el-button  icon="Refresh" @click="reset">{{ $t('report.reset') }}</el-button>
            <el-button
                icon="download"
                @click="handleExport"
                class="exoport-btn"
            >{{ $t('report.export') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template v-if="activeName==='1'">
      <el-radio-group @change="toggleChart" v-model="radio">
        <el-radio-button label="投注金额" />
        <el-radio-button v-show="req === 0" label="注册人数" />
        <el-radio-button v-show="req === 0" label="首存人数" />
        <el-radio-button label="投注人数" />
        <el-radio-button v-show="req === 0" label="公司输赢" />
        <el-radio-button v-show="req === 1" label="盈利" />
        <el-radio-button label="充值金额" />
        <el-radio-button label="充值人数" />
        <el-radio-button label="充提差" />
      </el-radio-group>
      <div ref="chart" class="chart"></div>
    </template>
    <el-radio-group v-else v-model="radioData" @change="toggleOption" class="radioData">
      <el-radio label="1" size="large">实时数据</el-radio>
      <el-radio label="2" size="large">历史数据</el-radio>
    </el-radio-group>
    <template v-if="activeName==='1' || radioData==='1'">
      <h3>实时数据</h3>
      <el-table :data="realTimeData" stripe :empty-text="$t('report.noData')">
        <TableColumn :activeName="activeName" />
      </el-table>
    </template>
    <template v-if="activeName==='1' || radioData==='2'">
      <h3>历史数据</h3>
      <template v-if="activeName==='1'">
        <ul class="clearfix">
          <li class="fl">充值合计：{{ total.rechargeAmount }}</li>
          <li class="fl">提现合计：{{ total.withdrawAmount }}</li>
          <li class="fl">存提差合计：{{ total.rechargeWithdrawAmount }}</li>
          <li class="fl">存提率%：{{ total.rechargeWithdrawPer }}%</li>
          <li class="fl">ARPPU：{{ arppu }}</li>
        </ul>
        <ul class="clearfix">
          <li class="fl">有效投注额：{{ total.validBetAmount }}</li>
          <li class="fl">派彩总额：{{ total.settleAmount }}</li>
          <li class="fl">公司输赢合计：{{ total.platformWin }}</li>
          <li class="fl">盈余比%：{{ total.windPer }}%</li>
          <li class="fl">投注人数：{{ total.orderCount }}</li>
        </ul>
      </template>
      <el-table :data="historyData" stripe :summary-method="getSummaries" show-summary :empty-text="$t('report.noData')">
        <TableColumn :activeName="activeName" />
      </el-table>
    </template>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from "echarts";
import i18n from "@/i18n";
import { toFixedNew, fix } from "@/utils";
import { getData } from "@/api/report/company";
import TableColumn from "@/views/report/company/components/TableColumn.vue";

const queryRef = ref(null);
const queryParams = ref({
  proxy: null,
  timeBegin: null,
  timeEnd: null,
});
const req = ref(0);
const reqList = ref([
  { label: i18n.global.t("report.dailyPaper"), value: 0 },
  { label: i18n.global.t("report.monthlyPaper"), value: 1 },
]);
const dateRange = ref([]);
const daterangeType = ref("daterange");
const realTimeData = ref([]);
const historyData = ref([]);
const total = ref({});
const radio = ref('投注金额');
const chart = ref(null);
const { activeName } = defineProps(["activeName"]);
const radioData = ref('1');

function toggleOption() {
  if(req.value === 0) {  // 日报
    daterangeType.value = "daterange";
  } else {  // 月报
    daterangeType.value = "monthrange";
  }
  defaultData();
}

function initChart(dateTimeStrArr, yValArr, radio) {
  const myChart = echarts.init(chart.value);
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [radio]
    },
    xAxis: {
      axisLabel: {
        color: '#626262',
        fontSize: 14
      },
      type: 'category',
      boundaryGap: true,
      data: dateTimeStrArr,
      axisLine: {
        lineStyle: {
          color: "#e5e5e5",
          width: 1
        }
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: true
      },
      splitLine: {
        show: true
      },
      minInterval: 1,
    },
    series: [{
      name: radio,
      type: 'bar',
      barGap: 0,
      itemStyle: {
        color: '#409EFF',
        label: {
          show: true
        },
      },
      data: yValArr
    }]
  };
  myChart.setOption(option);
}

function toggleChart() {
  getList();
}

function defaultData() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const yearMonth = year + "-" + fix(month + 1, 2);
  if(req.value === 0) {  // 日报
    dateRange.value = [new Date(year, month, 1), date];
    const day = fix(dateRange.value[1].getDate(), 2);
    const yearMonthStr = yearMonth + "-";
    queryParams.value.timeBegin = yearMonthStr + "01";
    queryParams.value.timeEnd = yearMonthStr + day;
  } else {  // 月报
    dateRange.value = [new Date(year, 0), date];
    queryParams.value.timeBegin = year + "-01";
    queryParams.value.timeEnd = yearMonth;
  }
  getList();
}

const arppu = computed(() => {
  return parseFloat(toFixedNew(total.value.rechargeAmount / total.value.rechargeCount, 2)) || 0;
})

const toFixed100 = num => parseFloat(toFixedNew(num * 100, 2)) || 0;

const getSummaries = (param) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总计'
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return parseFloat(toFixedNew(prev + curr, 2))
        } else {
          return prev
        }
      }, 0)}`
      if(activeName !== "3") {
        // 转化率（总计）
        sums[4] = toFixed100(sums[3] / sums[2]) + "%";
        // 存提率（总计）
        sums[13] = toFixed100((sums[10] - sums[11]) / sums[10]) + "%";
        // 盈余比例（总计）
        sums[19] = toFixed100(sums[18] / sums[16]) + "%";
      } else {
        sums[1] = '-'
        // 存提率（总计）
        sums[8] = toFixed100((sums[5] - sums[6]) / sums[5]) + "%";
        // 盈余比例（总计）
        sums[14] = toFixed100(sums[13] / sums[11]) + "%";
      }
    } else {
      sums[index] = '-'
    }
  })
  return sums
}

onMounted(() => {
  defaultData();
});

const getList = () => {
  let url_realTime, url_history, dailyPagerType = "";
  const urlPrefix = "/system/report/member/";
  if(activeName === '3') {  // VIP日报
    dailyPagerType = "vip/";
  }
  const url = urlPrefix + dailyPagerType;
  if(req.value === 0) {  // 日报
    url_realTime = url + "queryCompanyCurrDay";
    url_history = url + "queryCompanyDays";
  } else {  // 月报
    url_realTime = url + "queryCompanyCurrMonth";
    url_history = url + "queryCompanyMonths";
  }
  if(activeName === '1' || radioData.value === '1') {
    getData(queryParams.value, url_realTime).then((res) => {
      if(activeName === '3') {
        realTimeData.value = res?.list;
      } else {
        realTimeData.value = [res];
      }
    });
  }
  if(activeName === '1' || radioData.value === '2') {
    getData(queryParams.value, url_history).then((res) => {
      total.value = res?.total;
      historyData.value = res?.list;
      const dateTimeStrArr = [];
      const orderAmountArr = [];
      const regCountArr = [];
      const firstDepCountArr = [];
      const orderCountArr = [];
      const platformWinArr = [];
      const rechargeAmountArr = [];
      const rechargeCountArr = [];
      const rechargeWithdrawAmountArr = [];
      for(const el of historyData.value) {
        dateTimeStrArr.push(el.dateTimeStr);
        orderAmountArr.push(el.orderAmount);
        regCountArr.push(el.regCount);
        firstDepCountArr.push(el.firstDepCount);
        orderCountArr.push(el.orderCount);
        platformWinArr.push(el.platformWin);
        rechargeAmountArr.push(el.rechargeAmount);
        rechargeCountArr.push(el.rechargeCount);
        rechargeWithdrawAmountArr.push(el.rechargeWithdrawAmount);
      }
      if(activeName === '1') {
        switch(radio.value) {
          case "注册人数":
            initChart(dateTimeStrArr, regCountArr, radio.value);
            break;
          case "首存人数":
            initChart(dateTimeStrArr, firstDepCountArr, radio.value);
            break;
          case "投注人数":
            initChart(dateTimeStrArr, orderCountArr, radio.value);
            break;
          case "公司输赢":
            initChart(dateTimeStrArr, platformWinArr, radio.value);
            break;
          case "盈利":
            initChart(dateTimeStrArr, platformWinArr, radio.value);
            break;
          case "充值金额":
            initChart(dateTimeStrArr, rechargeAmountArr, radio.value);
            break;
          case "充值人数":
            initChart(dateTimeStrArr, rechargeCountArr, radio.value);
            break;
          case "充提差":
            initChart(dateTimeStrArr, rechargeWithdrawAmountArr, radio.value);
            break;
          default:
            initChart(dateTimeStrArr, orderAmountArr, radio.value);
        }
      }
    });
  }
};

const handleQuery = () => {
  getList();
};

// 选择时间
function handleChange() {
  let timeBegin = dateRange.value[0];
  let timeEnd = dateRange.value[1];
  const year_s = timeBegin.getFullYear();
  const month_s = fix(timeBegin.getMonth() + 1, 2);
  const year_e = timeEnd.getFullYear();
  const month_e = fix(timeEnd.getMonth() + 1, 2);
  const yearMonth_s = year_s + "-" + month_s;
  const yearMonth_e = year_e + "-" + month_e;
  if(req.value === 0) {  // 日报
    const date_s = fix(timeBegin.getDate(), 2);
    const date_e = fix(timeEnd.getDate(), 2);
    timeBegin = yearMonth_s + "-" + date_s;
    timeEnd = yearMonth_e + "-" + date_e;
  } else {  // 月报
    timeBegin = yearMonth_s;
    timeEnd = yearMonth_e;
  }
  dateRange.value = [timeBegin, timeEnd];
  queryParams.value.timeBegin = timeBegin;
  queryParams.value.timeEnd = timeEnd;
}

const handleExport = () => {
  // proxy.download(
  //   "system/user/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `玩家限制_${new Date().toLocaleDateString()}.xlsx`
  // );
};

const reset = () => {
  queryRef.value.resetFields();
  req.value = 0;
  queryParams.value.proxy = null;
  radioData.value = '1';
  toggleOption();
};
</script>

<style lang="scss" scoped>
.daily-pager {
  .el-radio-group {
    margin-top: 10px;
  }
  .chart {
    width: 100%;
    height: 400px;
  }
  .radioData {
    margin: -10px 0 15px;
    :deep(.el-radio__label) {
      font-size: 16px;
    }
  }
  h3 {
    margin-top: 0;
  }
  .el-table {
    margin-bottom: 40px;
  }
  ul {
    margin-left: -40px;
    li {
      list-style: none;
      font-size: 14px;
      margin-right: 8px;
      padding: 0 8px;
      height: 34px;
      line-height: 32px;
      color: #1890ff;
      background-color: rgba(24, 144, 255, 0.1);
      border: 1px solid rgba(24, 144, 255, 0.2);
      border-radius: 4px;
    }
  }
}
</style>
