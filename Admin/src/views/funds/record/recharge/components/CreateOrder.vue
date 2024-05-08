<template>
  <div class="create-order-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="$t('funds.createOrder')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="queryParams" ref="queryRef" :rules="rules" label-position="top">
        <h3>{{ $t('funds.orderInformation') }}</h3>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item :label="$t('funds.relationOrder')" prop="orderRelno">
              <el-input v-model="queryParams.orderRelno" @change="queryOrderInfo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.rechargeAmountQuote')" prop="amount">
              <el-input v-model="queryParams.amount" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.userName')" prop="userName">
              <el-input v-model="queryParams.userName" clearable disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.channelType')" prop="channelTypeName">
              <el-input v-model="queryParams.channelTypeName" clearable disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('funds.belongStoreName')" prop="mchName">
              <el-input v-model="queryParams.mchName" clearable disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('funds.createOrderHistoryRecord') }}</h3>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="" prop="tableData"> -->
              <el-table :data="tableData" class="order-operlog" border max-height="350"
              :empty-text="$t('funds.noData')">
                <el-table-column :label="$t('funds.orderNo')" prop="orderNo" align="center">
                  <template #default="{ row }">
                    <span>{{ row.orderNo || "-" }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('funds.userNameNoQuote')" prop="userName" align="center">
                  <template #default="{ row }">
                    <span>{{ row.userName || "-" }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('funds.rechargeAmount')" prop="amount" align="center">
                  <template #default="{ row }">
                    <span>{{ formatNumber(row.amount) }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('funds.channelTypeNoquote')" prop="channelTypeName" align="center">
                  <template #default="{ row }">
                    <span>{{ row.channelTypeName || "-" }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('funds.belongStoreName')" prop="mchName" align="center">
                  <template #default="{ row }">
                    <span>{{ row.mchName || "-" }}</span>
                  </template>
                </el-table-column>
              </el-table>
            <!-- </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item :label="$t('funds.uploadAttachment')" prop="imgUrls">
              <el-upload
                multiple
                :file-list="queryParams.imgUrls"
                action="/admin/file/fund/upload"
                list-type="picture-card"
                :limit="limit"
                :on-exceed="handleExceed"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :headers="headers"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogImg" title="$t('funds.preview')" width="400px">
                <img w-full :src="getImgUrl(dialogImageUrl)" alt="Preview Image" class="create-order-img" />
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('funds.remarkQuote')" prop="createOrderMark">
              <el-input 
                type="textarea" 
                v-model="queryParams.createOrderMark"
                maxlength="200"
                :placeholder="$t('funds.pleaseInput')"
                show-word-limit
                ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="cancel"> {{ $t('funds.cancel') }} </el-button>
          <el-button type="primary" @click="submit"> {{ $t('funds.createOrder') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { getInfoByRelno } from "@/api/funds/record/index";
import { addDepositOrder } from "@/api/funds/record/index";
import { getCurrentInstance } from "vue";
import { formatNumber } from "@/utils/index";
import usePermissionStore from "@/store/modules/permission";

const props = defineProps(["openCreateOrder", "cloneRow"]);
const emit = defineEmits(["update:openCreateOrder","addRefresh"]);
const headers = ref({ Authorization: "Bearer " + getToken() });

const { proxy } = getCurrentInstance()
const queryRef = ref(null)
const dialogVisible = computed({
  get() {
    return props.openCreateOrder;
  },
  set(val) {
    emit("update:openCreateOrder", val);
  },
});
const form = computed({
  get() {
    return props.cloneRow;
  },
});
const queryParams = ref({
  orderRelno:null,
  amount:null,
  userName:null,
  channelTypeName:null,
  mchName:null,
  imgUrls:[],
  createOrderMark:null
})
const limit = ref(5)
const dialogImg = ref(false)
const dialogImageUrl = ref(null)
const rules = ref({
  contactNo:[{required: true, message: i18n.global.t("funds.pleaseInputOrderNo"), trigger: 'blur'}],
  widthdrawMoney:[
    {required: true, message: i18n.global.t("funds.pleaseInputRechargeAmount"), trigger: 'blur'},
    { validator: validateRechargeAmount, trigger: 'blur' }
  ],
  createOrderMark:[{required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: 'blur'}]
})
const tableData = ref([])

function queryOrderInfo(val){
  val&&getInfoByRelno(val).then(res=>{
    if(res){
      queryParams.value.userName = res.userName
      queryParams.value.channelTypeName = res.channelTypeName
      queryParams.value.mchName = res.mchName
      tableData.value = res.subOrders
    }
  })
}
function validateRechargeAmount(rule, value, callback) {
      // 自定义校验逻辑
      if (!value) {
        callback(new Error(i18n.global.t("funds.pleaseInputRechargeAmount")));
      } else if (isNaN(value) || parseFloat(value) <= 0) {
        callback(new Error(i18n.global.t("funds.rechargeAmountMustBeyondZero")));
      } else {
        callback(); // 校验通过
      }
  }
function handleUploadSuccess(res){
  res.data&&queryParams.value.imgUrls.push(res.data)
}
function handleUploadError(err){
  console.log(err,'错误')
}
function handleRemove(uploadFile,uploadFiles){
  //删除的那列列和剩下长度
  console.log(uploadFile,uploadFiles)
}
function handleExceed(){
  proxy.$modal.msgError(i18n.global.t("funds.uploadFileCannotExceed",{num:limit.value}))
};
function handlePictureCardPreview(uploadFile){
  console.log(uploadFile.response,'handlePictureCardPreview',dialogImageUrl.value)
  dialogImageUrl.value = uploadFile.response.data
  dialogImg.value = true
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate(valid=>{
    if(valid){
      console.log(queryParams.value)
      addDepositOrder(queryParams.value).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("funds.addedSuccessfully"))
        dialogVisible.value = false;
        //新增成功之后去刷新充值补单审核未读数
        usePermissionStore().getFundsUnreview();
        emit("addRefresh");
      })
    }else{
      console.log('error')
      return 
    }
  })
}
</script>

<style lang="scss" scoped>
.create-order-dialog {
  h3 {
    margin: 0;
    border-left: 2px solid #1890ff;
    padding-left: 6px;
    font-size:13px;
    color:#333333;
    font-weight: 600;
    &:first-child{
      margin-bottom:10px;
    }
  }
  .overflow-container {
    width: 100px; /* 设置容器的宽度 */
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
  }
  .order-operlog{
    margin:10px 0 30px;
  }
  .avatar-uploader-icon{
    width:105px;
    height:105px;
    text-align:center;
    line-height: 105px;
    border:1px dashed gray;
  }
  .create-order-img{
    display: block; 
    max-width: 100%; 
    margin: 0 auto
  }
  :deep(){
    .el-dialog__title{
      font-weight:600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
</style>
