<template>
  <el-form :model="queryParams" ref="queryRef" :inline="true">
    <el-row :gutter="10">
      <el-col :span="3">
        <el-form-item :label="$t('report.parentName')" prop="parentName" class="full-width">
          <el-input
              v-model="queryParams.parentName"
              :placeholder="$t('report.pleaseInput')"
              clearable
              class="full-width"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('report.time')" class="full-width">
          <el-date-picker
              v-model="startDate"
              format="YYYY-MM-DD"
              type="date"
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
  <el-table :data="distributeList" :empty-text="$t('report.noData')">
    <el-table-column :label="$t('report.index')" type="index" width="50">
    </el-table-column>
    <el-table-column :label="$t('report.area')" align="center" prop="area">
    </el-table-column>
    <el-table-column :label="$t('report.users')" v-if="activeName==='1'" sortable align="center" prop="users">
    </el-table-column>
    <el-table-column :label="$t('report.dptAmt')" v-else sortable align="center" prop="dptAmt">
    </el-table-column>
    <el-table-column :label="$t('report.perCap')" sortable align="center" prop="perCap">
      <template #default="{ row }">
        {{ parseFloat(toFixedNew(row.perCap * 100, 2)) }}%
      </template>
    </el-table-column>
  </el-table>
<!--  <pagination
    v-show="total > 0"
    :total="total"
    v-model:page="queryParams.pageNum"
    v-model:limit="queryParams.pageSize"
    @pagination="getList"
    style="height: 40px"
  />-->
  <div v-if="viteSite === 'cn'" ref="chart" class="chart"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { toFixedNew, fix } from "@/utils";
import { getDistributeList } from "@/api/report/analysismanage/index";
import chinaJSON from "./chinaJSON";
import i18n from "@/i18n";

const { proxy } = getCurrentInstance();
const viteSite = import.meta.env.VITE_SITE;  // 判断是中国站（'cn'）还是越南站（'vietnam'）
const queryRef = ref(null);
const queryParams = ref({
  parentName: null,
  day: null,
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const startDate = ref([]);
const distributeList = ref([]);
const props = defineProps(["activeName"]);
const chart = ref(null);
const title = ref("用户注册人数：");
const apiData = ref([]);
const valueArr = ref([]);

function defaultData() {
  const date = new Date();
  const year = date.getFullYear();
  const month = fix(date.getMonth() + 1, 2);
  const day = fix(date.getDate(), 2);
  startDate.value = date;
  queryParams.value.day = year + "-" + month + "-" + day;
  getList();
}

const getList = () => {
  let url = "/system/oms/report/day/";
  if(props.activeName === "1") {
    title.value = "用户注册人数：";
    url = url + "queryPlayerDistributionList";  // 注册分布接口地址
  } else {
    title.value = "用户充值金额：";
    url = url + "queryDepositDistributionList";  // 充值分布接口地址
  }
  getDistributeList(queryParams.value, url).then((res) => {
    if(!res) {
      res = [];
    }
    distributeList.value = res;
    total.value = res?.total;
    for(const el of res) {
      let value;
      if(props.activeName === "1") {
        value = el.users;
      } else {
        value = el.dptAmt;
      }
      let area = el.area || '';
      switch (area) {
        case "北京" || "上海" || "天津" || "重庆":
          area = area.padEnd(3, '市');
          break;
        case "香港" || "澳门":
          area = area.padEnd(7, '特别行政区');
          break;
        case "新疆":
          area = area.padEnd(8, '维吾尔自治区');
          break;
        case "广西":
          area = area.padEnd(7, '壮族自治区');
          break;
        case "宁夏":
          area = area.padEnd(7, '回族自治区');
          break;
        case "内蒙古":
          area = area.padEnd(6, '自治区');
          break;
        case "西藏":
          area = area.padEnd(5, '自治区');
          break;
        case "黑龙江":
          area = area.padEnd(4, '省');
          break;
        default:
          area = area.padEnd(3, '省');
      }
      apiData.value.push({
        name: area,
        value,
      })
      valueArr.value.push(value);
    }
    if(viteSite === 'cn') {
      initChart();
    }
  });
};

onMounted(() => {
  defaultData();
});

function initChart() {
  // 获取地形JSON
  // const chinaJSON = await fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json").then((res) => res.json());
  const myChart = echarts.init(chart.value);
  let max = Math.max.apply(null, valueArr.value);
  if(max === -Infinity) {
    max = 0;
  }
  // 注入地图
  echarts.registerMap("china", chinaJSON);
  // 获取api数据
  // const apiData = (await import("../../../tool/echarts-demo/components/Echarts/apiData")).default;
  const option = {
    title: {
      text: props.activeName==='1' ? i18n.global.t("report.titleRegister") : i18n.global.t("report.titleRecharge"),
      x: 'center',
      textStyle: {
        fontSize: 24,
        fontWeight: "normal",
      }
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        let { name, seriesName, value } = params;
        let unit;
        if (!value) {
          value = 0;
        }
        if (seriesName === '用户注册人数：') {
          unit = '人';
        } else {
          unit = '元';
        }
        return name + '<br />' + seriesName + value + unit;
      },
    },
    visualMap: {
      top: "middle",
      left: "right",
      min: 0,
      max,
      inRange: {
        color: [
          "#ccc",
          "#f6eeaf",
          "#ecc196",
          "#e1967f",
          "#d3756d",
          "#ca5c5f",
          "#c0444c",
        ],
      },
      text: ["高", "低"],
      calculable: true,
    },
    series: [
      {
        type: "map",
        map: "china", // 引入地图数据
        name: title.value,
        data: apiData.value, // 省份数据
      },
    ],
  };
  myChart.setOption(option);
}

const handleQuery = () => {
  queryParams.value.pageNum = 1;
  apiData.value = [];
  getList();
};
// 选择时间
function handleChange() {
  let date = startDate.value;
  const year = date.getFullYear();
  const month = fix(date.getMonth() + 1, 2);
  const day = fix(date.getDate(), 2);
  startDate.value = year + "-" + month + "-" + day;
  queryParams.value.day = startDate;
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
  apiData.value = [];
  defaultData();
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-bottom: 50px;
  table {
    td {
      width: 30%;
    }
  }
}
.chart {
  width: 100%;
  height: 900px;
}
</style>
