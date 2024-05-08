<template>
  <div class="withdrawl-record-detail-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="$t('funds.orderDetail')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="queryRef"
        :inline="true"
        label-position="right"
      >
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
              <span>{{ form.financeTierName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.riskTierQuote')" prop="riskTierName">
              <span>{{ form.riskTierName || "-" }}</span>
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
            <el-form-item :label="$t('funds.withdrawlWay')" prop="wdWayType">
              <span>{{ switchWdWayTypeStatus(wdWayTypeList,form.wdWayType) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawType')" prop="wdType">
              <span>{{ switchWdTypeStatus(wdTypeList,form.wdType)}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.orderStatus')" prop="status">
              <span :class="colorChange(form.status)">{{ switchStatus(statusArrList,form.status) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.recieveMoneyTime')" prop="createTime">
              <span>{{ form.createTime||"-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.paymentMethod')" prop="paymentMethod">
              <span>{{ switchpaymentMethodStatus(paymentMethodList,form.paymentMethod) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawalStoreNameQuote')" prop="mchName">
              <span>{{ form.mchName||"-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.withdrawAmount') }}</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawAmountQuote')" prop="amount">
              <span>{{ !isNaN(form.amount) ? form.amount.toFixed(2) : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.rechargeRateQuote')" prop="rate">
              <span>{{ !isNaN(form.rate)? (form.rate):"-"  }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.usdtNumber')" prop="usdtNum">
              <span>{{ !isNaN(form.usdtNum)? (form.usdtNum):"-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reserveLimitHour')" prop="appmentHours">
              <span>{{
                !isNaN(form.appmentHours) ? form.appmentHours + "h" : "-"
              }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.addPercent')" prop="addPercent">
              <span>{{ !isNaN(form.addPercent) ? form.addPercent + "%" : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.addBonus')" prop="addBouns">
              <span>{{ formatNumber(form.addBouns) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.wdFee')" prop="wdFee">
              <span>{{ formatNumber(form.wdFee) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.actualAmount')" prop="actualAmt">
              <span>{{ formatNumber(form.actualAmt) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.orderType === '1'">
            <el-form-item :label="$t('funds.actualUsdtNumberQuote')" prop="actualUsdtNum">
              <span>{{ form.actualUsdtNum||form.actualUsdtNum===0?form.actualUsdtNum: "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.recieveMoneyInformation') }}</h3>
        <el-row v-if="form.orderType === '0'">
          <el-col :span="6">
            <el-form-item :label="$t('funds.recieveMoneyPersonName')" prop="payeeName">
              <span>{{ form.payeeName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.recieveMoneyBank')" prop="payeeBankName">
              <span>{{ form.payeeBankName || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.recieveMoneyCardNo')" prop="payeeCardNo">
              <span>{{ form.payeeCardNo || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.orderType === '1'">
          <el-col :span="6">
            <el-form-item :label="$t('funds.protocol')" prop="tradeProtocol">
              <span>{{ form.tradeProtocol || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.tradeAddr')" prop="tradeAddr">
              <span>{{ form.tradeAddr || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.orderType === '3'">
          <el-col :span="8">
            <el-form-item :label="$t('funds.tradeAddr')" prop="tradeAddr">
              <span>{{ form.tradeAddr || "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.outMoneyDetail') }}</h3>
        <el-row v-if="form.orderType === '0'">
          <el-col :span="6">
            <el-form-item :label="$t('funds.payerName')" prop="payerName">
              <span>{{ form.status==='4'?form.payerName : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.withdrawlPaymentTime')" prop="paymentTime">
              <span>{{ form.status==='4'?form.paymentTime : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.remarkQuote')" prop="paymentMark">
              <span>{{ form.status==='4'?form.paymentMark : "-" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <h3>{{ $t('funds.operationDetail') }}</h3>
        <el-row v-if="form.orderType === '0'">
          <el-col :span="6">
            <el-form-item :label="$t('funds.operTypeQuote')" prop="operType">
              <span>{{ form.operType==='0'?$t('funds.forceSuccess'):form.operType==='1'?$t('funds.paymentReturn'):'-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.returnType')" prop="wdReturnType">
              <span>{{ form.operType==='1'&&form.wdReturnType==='0'?$t('funds.returnAll'):form.operType==='1'&&form.wdReturnType==='1'?$t('funds.returnSome'):'-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.returnAmount')" prop="wdReturnAmt">
              <span>{{ form.operType==='1'&&form.wdReturnType==='1'?form.wdReturnAmt : "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.operApplicant')" prop="operApplicant">
              <span>{{ form.operApplicant || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.applicationTime')" prop="operApplicantTime">
              <span>{{ form.operApplicantTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reorderApplicantMark')" prop="operApplicantMark">
              <span>{{ form.operApplicantMark || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.attachmentScreen')" prop="attaches">
              <el-upload
                multiple
                :file-list="form.attaches"
                action="/admin/file/fund/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreviewRecord"
                :headers="headers"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogImgRecord" :title="$t('funds.preview')" width="400px">
                <img w-full :src="getImgUrl(dialogImageUrl)" alt="Preview Image" class="withdrawl-attachment-img" />
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reviewer')" prop="operApprover">
              <span>{{ form.operApprover || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reviewTime')" prop="operApprovalTime">
              <span>{{ form.operApprovalTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.reviewRemark')" prop="operApprovalMark">
              <span>{{ form.operApprovalMark || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-divider></el-divider>
        </el-row>
      </el-form>
      <h3>{{ $t('funds.orderLog') }}</h3>
      <el-table :data="tableData">
        <el-table-column :label="$t('funds.type')" prop="logTypeName" align="center"></el-table-column>
        <el-table-column :label="$t('funds.operator')" prop="operator" align="center">
          <template #default="{ row }">
            <span>{{ row.operator?row.operator:'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('funds.time')" prop="createTime" align="center"></el-table-column>
        <el-table-column :label="$t('funds.eventContent')" prop="remark"  align="center"></el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="qeuryOrderLogInfo"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="cancel">{{ $t('funds.close') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { getWithdrawlOrderInfo, getOrderLogInfo } from "@/api/funds/record/index";
import { onMounted } from "vue";
import { colorChange,switchStatus,switchWdTypeStatus,switchWdWayTypeStatus,switchpaymentMethodStatus } from "../common"
import { formatNumber } from "@/utils/index";

const props = defineProps(["openDetail", "cloneRow","statusArrList","wdTypeList","wdWayTypeList","paymentMethodList"]);
const emit = defineEmits(["update:openDetail", "threeOrManualfresh"]);
const headers = ref({ Authorization: "Bearer " + getToken() });

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const dialogVisible = computed({
  get() {
    return props.openDetail;
  },
  set(val) {
    emit("update:openDetail", val);
  },
});
const form = ref({});
const dialogImgRecord = ref(false)
const dialogImageUrl = ref(null)
const tableData = ref([])
const total = ref(0)
const queryParams = ref({
  pageNum:1,
  pageSize:10
})

onMounted(async () => {
  await queryDetailInfo();
  await qeuryOrderLogInfo()
});
function queryDetailInfo() {
  return getWithdrawlOrderInfo(props.cloneRow.orderNo).then((res) => {
    form.value = res || {};
    if(form.value.attaches&&form.value.attaches.length){
      form.value.attaches = form.value.attaches.map(item=>{
        return {
          url:getImgUrl(item.imgUrl),
          name:item.id
        }
      })
    }
    console.log(form.value.attaches)
  });
}
function qeuryOrderLogInfo(){
  return getOrderLogInfo({
    orderNo:props.cloneRow.orderNo,
    ...queryParams.value
  }).then(res=>{
    console.log(res)
    tableData.value = res.rows || []
    total.value = res.total
  })
}
function handlePictureCardPreviewRecord(uploadFile){
  dialogImageUrl.value = uploadFile.url
  dialogImgRecord.value = true
}
function cancel() {
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.withdrawl-record-detail-dialog {
  h3 {
    margin: 0;
    border-left: 2px solid #1890ff;
    padding-left: 6px;
    font-size: 13px;
    color: #333333;
    font-weight: 600;
    margin-bottom:5px;
  }
  .overflow-container {
    width: 100px; /* 设置容器的宽度 */
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
  }
  .order-operlog {
    margin-top: 10px;
  }
  .withdrawl-attachment-img{
    display: block; 
    max-width: 100%; 
    margin: 0 auto
  }
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
    .el-upload--picture-card{
      display: none;
    }
    .el-icon--delete{
      display: none;
    }
  }
}
</style>
