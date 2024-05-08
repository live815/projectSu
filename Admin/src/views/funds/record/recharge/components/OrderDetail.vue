<template>
  <div class="order-detail-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="$t('funds.orderDetail')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="queryRef">
        <h3>{{ $t('funds.memberInformation') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.userName')" prop="userName">
              <span>{{ form.userName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.vipLevel')" prop="vipLevel">
              <span>{{ form.vipLevel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.financialTierQuote')" prop="financeTierName">
              <span>{{ form.financeTierName||"-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.riskTierQuote')" prop="riskTierName">
              <span>{{ form.riskTierName||"-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.orderInformation') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.orderNoQuote')" prop="orderNo">
              <span>{{ form.orderNo || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.relationOrder')" prop="orderRelno">
              <span>{{ form.orderRelno || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.channelType')" prop="channelTypeName">
              <span>{{ form.channelTypeName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.belongStoreNameQuote')" prop="mchName">
              <span>{{ form.mchName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.orderStatus')" prop="status">
              <!-- <span>{{ form.status ? form.status : "-" }}</span> -->
              <span :class="colorChange(form.status)">{{ switchStatus(list,form.status) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.rechargeTime')" prop="createTime">
              <span>{{ form.createTime || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.rechargeAmount') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.rechargeAmountQuote')" prop="amount">
              <span>{{ formatNumber(form.amount) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.rechargeRateQuote')" prop="rate">
              <span>{{ form.rate || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.usdtNumber')" prop="usdtNum">
              <span>{{ form.usdtNum || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.addPercent')" prop="addPercent">
              <span>{{ form.addPercent ? form.addPercent + "%" : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.addBonus')" prop="addBouns">
              <span>{{ formatNumber(form.addBouns) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.actualAmount')" prop="actualAmt">
              <span>{{ formatNumber(form.actualAmt) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.actualUsdtNumber')" prop="actualUsdtNum">
              <span>{{ form.actualUsdtNum||form.actualUsdtNum===0?form.actualUsdtNum: "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.rechargeInformation') }}</h3>
        <el-row>
          <el-col :span="6" v-if="form.orderType === '0'">
            <el-form-item :label="$t('funds.rechargeNameQuote')" prop="realName">
              <span>{{ form.realName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '0'">
            <el-form-item :label="$t('funds.uploadProvidence')" prop="contactNo">
              <span class="pointer" @click="checkDetail"
                >{{ $t('funds.checkDetails') }}</span
              >
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.walletprotocol')" prop="protocol">
              <span>{{ form.protocol || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3 v-if="form.orderType === '0'">{{$t('funds.C2CDealTime')}}</h3>
        <el-row v-if="form.orderType === '0'">
          <el-col :span="6">
            <el-form-item :label="$t('funds.ensurePaymentTime')" prop="confirmPaymentTimeC2c">
              <span>{{ form.confirmPaymentTimeC2c || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('funds.ensureGetMoneyTime')" prop="confirmReceiptTimeC2c">
              <span>{{ form.confirmReceiptTimeC2c || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <h3>{{ $t('funds.makeUpOrderDetail') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderAmount')" prop="reorderAmt">
              <span>{{ formatNumber(form.reorderAmt) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderAddAmount')" prop="reorderBounsAmt">
              <span>{{ formatNumber(form.reorderBounsAmt) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderApplicant')" prop="reorderApplicant">
              <span>{{ form.reorderApplicant || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderApplicantTime')" prop="reorderApplicantTime">
              <span>{{ form.reorderApplicantTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.reorderApplicantMark')" prop="reorderApplicantMark" class="full-width">
              <div
                class="overflow-container"
                :title="form.reorderApplicantMark"
              >
                {{ form.reorderApplicantMark || "-" }}
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.uploadPicture')" prop="attaches">
              <template v-if="form.attaches && form.attaches.length">
                <!-- <img
                  :src="getImgUrl(form.attaches[0]?.imgUrl)"
                  class="avatar"
                /> -->
                <img v-for="item in form.attaches" :src="getImgUrl(item.imgUrl)" class="avatar mr-4">
              </template>
              <span v-else>{{ $t('funds.noPicture') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderApprover')" prop="reorderApprover">
              <span>{{ form.reorderApprover || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderApprovalTime')" prop="reorderApprovalTime">
              <span>{{ form.reorderApprovalTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderApprovalMark')" prop="reorderApprovalMark">
              <span>{{ form.reorderApprovalMark || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <h3>{{$t('funds.orderLog')}}</h3>
        <el-table :data="tableData" class="order-operlog">
          <el-table-column :label="$t('funds.type')" prop="logTypeName" align="center">
            <template #default="{ row }">
              <span>{{ row.logTypeName || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('funds.operator')" prop="operator" align="center">
            <template #default="{ row }">
              <span>{{ row.operator || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('funds.createTime')" prop="createTime" align="center">
            <template #default="{ row }">
              <span>{{ row.createTime || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('funds.eventContent')" prop="remark" align="center">
            <template #default="{ row }">
              <span>{{ row.remark || "-" }}</span>
              <span @click="checkAddDetail" v-if="row.logType==='2'" class="pointer">{{ $t('funds.attchmentCheckDetail') }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="queryDepositList"
        />
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="cancel"> {{ $t('funds.close') }} </el-button>
        </span>
      </template>
      <AttachmentDetail
        v-model:openAttachment="openAttachment"
        v-if="openAttachment"
        v-model:cloneRow="form"
      />
      <CheckAddOrderAttachment
      v-model:openAddAttachment="openAddAttachment"
      v-if="openAddAttachment"
      v-model:cloneRow="form"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { getOrderInfo, getDepositList } from "@/api/funds/record/index";
import { onMounted } from "vue";
import {switchStatus,colorChange} from "../common"
import AttachmentDetail from "./AttachmentDetail.vue";
import CheckAddOrderAttachment from "./CheckAddOrderAttachment.vue";
import { filterLabel,formatNumber } from "@/utils/index";

const props = defineProps(["open", "cloneRow", "list"]);
const emit = defineEmits(["update:open"]);
const headers = ref({ Authorization: "Bearer " + getToken() });

const queryRef = ref(null);
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const form = ref({});
const tableData = ref([]);
const total = ref(0);
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
});
const openAttachment = ref(false);
const openAddAttachment = ref(false)

onMounted(async () => {
  await queryOrderInfo();
  await queryDepositList();
});
function queryOrderInfo() {
  return getOrderInfo(props.cloneRow.orderNo).then((res) => {
    form.value = res || {};
  });
}
function queryDepositList() {
  return getDepositList({
    orderNo:props.cloneRow.orderNo,
    ...queryParams.value
  }).then((res) => {
    tableData.value = res.rows || [];
    total.value = res.total;
  });
}
function checkDetail() {
  openAttachment.value = true;
}
function checkAddDetail(){
  openAddAttachment.value = true
}

function cancel() {
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.order-detail-dialog {
  h3 {
    margin: 0;
    border-left: 2px solid #1890ff;
    padding-left: 6px;
    font-size: 13px;
    color: #333333;
    font-weight: 600;
  }
  .overflow-container {
    // width: 100px; /* 设置容器的宽度 */
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
  }
  .order-operlog {
    margin-top: 10px;
  }
  .avatar {
    width: 80px;
  }
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .el-form-item {
      margin-bottom: 0;
    }
    .el-dialog:not(.is-fullscreen) {
      margin-top: 1vh !important;
    }
  }
}
</style>
