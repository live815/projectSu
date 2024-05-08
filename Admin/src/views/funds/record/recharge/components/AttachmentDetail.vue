<template>
  <div class="attachment-detail-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :title="$t('funds.attchmentDetail')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-position="top">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('funds.paymentBackProvidence')" prop="attachBank">
              <el-upload
                multiple
                :file-list="form.attachBank"
                action="/admin/file/fund/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreviewBank"
                :headers="headers"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogImgBank" :title="$t('funds.preview')" width="400px">
                <img w-full :src="getImgUrl(dialogImageUrl)" alt="Preview Image" class="attachment-img" />
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.bankCardRunning')" prop="attatchBankWater">
              <el-upload
                multiple
                :file-list="form.attatchBankWater"
                action="/admin/file/fund/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :headers="headers"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogImg" :title="$t('funds.preview')" width="400px">
                <img w-full :src="getImgUrl(dialogImageUrl)" alt="Preview Image" style="display: block; max-width: 100%; margin: 0 auto" />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
import { getImgUrl } from '@/utils'
import { getAttachDetail } from "@/api/funds/record/index";
const props = defineProps(["openAttachment","cloneRow"])
const emit = defineEmits(["update:openAttachment"])
const headers = ref({ Authorization: "Bearer " + getToken() });

const dialogVisible = computed({
  get(){
    return props.openAttachment
  },
  set(val){
    emit("update:openAttachment",val)
  }
})
const form = ref({
  attachBank:[],
  attatchBankWater:[]
})
const dialogImg = ref(false)
const dialogImgBank = ref(false)
const dialogImageUrl = ref(null)

queryAttachList()
function queryAttachList(){
  getAttachDetail({
    orderNo:props.cloneRow.orderNo,
    types:[0,1]
  }).then(res=>{
    form.value.attachBank = res.filter(bank=>bank.attachType==='0')||[]
    form.value.attachBank = form.value.attachBank.map(item=>{
      return {
        url:getImgUrl(item.imgUrl),
        name:item.id
      }
    })
    form.value.attatchBankWater = res.filter(bank=>bank.attachType==='1')||[]
    form.value.attatchBankWater = form.value.attatchBankWater.map(item=>{
      return {
        url:getImgUrl(item.imgUrl),
        name:item.id
      }
    })
  })
}
function cancel(){
  dialogVisible.value = false 
}
function handlePictureCardPreviewBank(uploadFile){
  dialogImageUrl.value = uploadFile.url
  dialogImgBank.value = true
}
function handlePictureCardPreview(uploadFile){
  dialogImageUrl.value = uploadFile.url
  dialogImg.value = true
}
</script>

<style lang="scss" scoped>
.attachment-detail-dialog{
  :deep(){
    .el-dialog__title{
      font-weight: 600;
    }
    .el-dialog__body{
      padding-top:0
    }
    .el-upload--picture-card{
      display: none;
    }
    .el-icon--delete{
      display: none;
    }
  }
  .attachment-img{
    display: block; 
    max-width: 100%; 
    margin: 0 auto
  }
  .bank-water{
    display: flex;
  }
  .attach-img{
    width:100px;
  }
}
</style>