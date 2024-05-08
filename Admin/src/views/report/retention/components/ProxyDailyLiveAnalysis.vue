<template>
  <div class="proxy-dailyLive-analysis">
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
    <ul>
      <li><strong>普通活跃：</strong>当天在线时长5分钟算普通活跃</li>
      <li><strong>有效活跃：</strong>累积存款>500或有效流水>1000元算有效活跃</li>
    </ul>
    <h3>时间周期：{{ queryParams.startDate }}</h3>
    <el-table :data="proxyDailyLiveAnalysisList" :empty-text="$t('report.noData')">
      <el-table-column :label="$t('report.parentNameNoQuote')" align="center" prop="parentName" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.u')" align="center" prop="u" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.v')" align="center" prop="v" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.w')" align="center" prop="w" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.x')" align="center" prop="x" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.y')" align="center" prop="y" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.z')" align="center" prop="z" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.aa')" align="center" prop="aa" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.ab')" align="center" prop="ab" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.ac')" align="center" prop="ac" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.ad')" align="center" prop="ad" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.ae')" align="center" prop="ae" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.af')" align="center" prop="af" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.ag')" align="center" prop="ag" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.ah')" align="center" prop="ah" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.ai')" align="center" prop="ai" width="105">
      </el-table-column>
      <el-table-column :label="$t('report.aj')" align="center" prop="aj" width="105">
      </el-table-column>
    </el-table>
    <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
        style="height: 40px"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fix } from "@/utils";
import { getProxyDailyLiveAnalysisList } from "@/api/report/analysismanage/index";

const { proxy } = getCurrentInstance();

const queryRef = ref(null);
const queryParams = ref({
  parentName: null,
  startDate: null,
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const startDate = ref("");
const proxyDailyLiveAnalysisList = ref([]);

function defaultData() {
  const date = new Date();
  const year = date.getFullYear();
  const month = fix(date.getMonth() + 1, 2);
  const day = fix(date.getDate(), 2);
  startDate.value = date;
  queryParams.value.startDate = year + "-" + month + "-" + day;
  getList();
}

onMounted(() => {
  defaultData();
});
const getList = () => {
  getProxyDailyLiveAnalysisList(queryParams.value).then((res) => {
    proxyDailyLiveAnalysisList.value = res?.rows;
    total.value = res?.total;
  });
};
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
// 选择时间
function handleChange() {
  let date = startDate.value;
  const year = date.getFullYear();
  const month = fix(date.getMonth() + 1, 2);
  const day = fix(date.getDate(), 2);
  startDate.value = year + "-" + month + "-" + day;
  queryParams.value.startDate = startDate;
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
  defaultData();
};
</script>

<style lang="scss" scoped>
.proxy-dailyLive-analysis {
  height: 100%;
  ul {
    margin: 0 0 0 -40px;
    li {
      list-style: none;
      line-height: 1.7;
    }
  }
  h3 {
    font-weight: bold;
  }
}
</style>
