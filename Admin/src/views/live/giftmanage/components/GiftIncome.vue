<template>
  <div class="">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.Giftordernumber1')" prop="giftOderCode">
        <el-input
          v-model="queryParams.giftOderCode"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Buymembership1')" prop="memberName">
        <el-input
          v-model="queryParams.memberName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.giftname1')" prop="giftName">
        <el-input
          v-model="queryParams.giftName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Giftanchor1')" prop="presenterName">
        <el-input
          v-model="queryParams.presenterName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item :label="$t('live.Purchasetime1')">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('live.begintime')"
          :end-placeholder="$t('live.endtime')"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
          v-hasPermi="['gift:profit:list']"
          >{{ $t("live.Inquire") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.serialNumber')"
        prop="sortNum"
        :show-overflow-tooltip="true"
        align="center"
        width="80"
      />

      <el-table-column
        :label="$t('live.Giftordernumber')"
        prop="giftOderCode"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.Buymembership')"
        prop="memberName"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.giftname')"
        prop="giftName"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.giftNum')"
        prop="giftNum"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.giftTotalAmount')"
        prop="giftTotalAmount"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.value')"
        prop="payAmount"
        align="center"
      ></el-table-column>

      <el-table-column
        :label="$t('live.giftSVGA')"
        align="center"
        prop="giftBigImage"
        width="120"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div
              v-if="!scope.row.giftBigImage && !scope.row.$index"
              style="text-align: center"
            >
              {{ $t("live.Nopicturesyet") }}
            </div>
            <PlaySvga v-else :svgaUrl="getImgUrl(scope.row.giftBigImage)" />
          </div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('live.Giftanchor')"
        prop="presenterName"
        align="center"
      />

      <el-table-column
        :label="$t('live.Purchasetime')"
        align="center"
        prop="paymentTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.paymentTime) }}</span>
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
import { getGiftIncome } from "@/api/live/gift";
import { getImgUrl } from "@/utils";
import PlaySvga from "@/components/PlaySvga";
import { defaultTime } from "@/utils/config";

const dateRange = ref([]);
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
const showSearch = ref(true);

const tableData = ref([]);
const total = ref(0);
const loading = ref(true);
const isFirstLoad = ref(true);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
  rules: {},
});
const { queryParams, form, rules } = toRefs(data);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
/** 查询角色列表 */
function getList() {
  loading.value = true;
  return getGiftIncome(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      tableData.value = response.rows;
      total.value = response.total;
      loading.value = false;
    }
  );
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  white-space: pre-wrap;
}
.stadimgBox {
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
