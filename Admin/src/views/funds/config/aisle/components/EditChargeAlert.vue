<template>
  <div class="edit-charge-alert-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('funds.editChannelType')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        label-position="top"
        :rules="rules"
      >
        <el-row>
          <el-col>
            <el-form-item
              :label="$t('funds.rechargePageTip')"
              prop="dpInitContent"
              class="full-width"
            >
            <Editor v-model ="queryParams.dpInitContent" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('funds.rechargingTip')"
              prop="dpPendingContent"
              class="full-width"
            >
              <Editor v-model ="queryParams.dpPendingContent" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('funds.cancel') }}</el-button>
          <el-button type="primary" @click="submit"> {{ $t('funds.submit') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getContent,addContent } from "@/api/funds/config/index";
import { Base64 } from 'js-base64';
const props = defineProps(["openContent", "cloneId"]);
const emit = defineEmits(["update:openContent"]);

const { proxy } = getCurrentInstance();
const queryRef = ref(null)
const queryParams = ref({
  channelTypeId: null,
  dpInitContent: "",
  dpPendingContent:""
});
const rules = ref({
  dpInitContent: [{ required: true, message: i18n.global.t("funds.pleaseInputRechargePageTip"), trigger: "blur" },
// {validator:validEditor,trigger:'blur'}
],
  dpPendingContent: [{ required: true, message: i18n.global.t("funds.pleaseInputRechargingTip"), trigger: "blur" }]
});

const dialogVisible = computed({
  get() {
    return props.openContent;
  },
  set(val) {
    emit("update:openContent", val);
  },
});

queryConten();
//根据ID查询详情
function queryConten() {
  getContent(props.cloneId).then((res) => {
    queryParams.value = res||{};
    queryParams.value.dpInitContent = queryParams.value.dpInitContent?Base64.decode(queryParams.value.dpInitContent):queryParams.value.dpInitContent
      queryParams.value.dpPendingContent = queryParams.value.dpPendingContent?Base64.decode(queryParams.value.dpPendingContent):queryParams.value.dpPendingContent
      console.log(queryParams.value)
  });
}

function cancel(){
  dialogVisible.value = false;
}
function submit(){
  queryRef.value.validate(valid=>{
    if(valid){
      queryParams.value.dpInitContent = Base64.encode(queryParams.value.dpInitContent)
      queryParams.value.dpPendingContent = Base64.encode(queryParams.value.dpPendingContent)
      addContent(queryParams.value).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
        dialogVisible.value = false;
      })
    }else{
      return 
    }
  })
}
function validEditor(rule,value,callback){
  if ( /^<p>(<br>|<\/p>|<br \/>|<\/p>)<\/p>$/.test(value)) {
    callback(new Error(i18n.global.t("funds.pleaseInputRechargePageTip")));
  } else {
      callback(); // 校验通过
  }
}
</script>

<style lang="scss" scoped>
.edit-charge-alert-dialog{
:deep(){
  .el-dialog__title{
    font-weight: 600;
  }
}
}
</style>