<template>
  <div class="currency-card-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <template #header>
        <span class="header-title">{{
          type === "add" ? $t('member.addCurrency') : $t('member.editCurrency')
        }}</span>
      </template>
      <el-form :model="queryParams" ref="queryRef" :rules="rules" label-width="128px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
              :label="$t('member.currencyAddr')"
              prop="addr"
              class="full-width"
            >
              <el-input
                v-model="queryParams.addr"
                :placeholder="$t('member.pleaseInput')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.alias')" prop="alias" class="full-width">
              <el-input
                v-model="queryParams.alias"
                :placeholder="$t('member.pleaseInput')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.currencyType')" prop="currency" class="full-width">
              <el-input
                v-model="queryParams.currency"
                :placeholder="$t('member.pleaseInput')"
                clearable
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.protocol')" prop="protocol" class="full-width">
              <el-input
                v-model="queryParams.protocol"
                :placeholder="$t('member.pleaseInput')"
                clearable
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.addrStatus')" prop="status" class="full-width">
              <el-select
                v-model="queryParams.status"
                :placeholder="$t('member.pleaseSelect')"
                clearable
                class="full-width"
              >
                <el-option
                  v-for="item in cardStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('member.userName')"
              prop="userName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.userName"
                :placeholder="$t('member.pleaseInput')"
                clearable
                :disabled="!!userName||type === 'edit'"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('member.cancel') }}</el-button>
          <el-button type="primary" @click="submit"> {{ $t('member.submit') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, getCurrentInstance, onMounted } from "vue";
import { getCryptocyInfo, addCryptocy,editCryptocy } from "@/api/member/bankcard/index";

const props = defineProps(["open", "id","type","userName"]);
const emit = defineEmits(["update:open","onrefresh"]);
const { proxy } = getCurrentInstance()
console.log(props.id,666,props.type)
const queryRef = ref(null)
const queryParams = ref({
  addr:null,
  alias:null,
  currency:'USDT',
  protocol:'TRC20',
  status:null,
  userName:props.userName,
});
const rules = ref({
  addr: [
    {
      required: true,
      message: i18n.global.t("member.pleaseInputVirtualCurrencyAddr"),
      trigger: "blur",
    },
  ],
  remark: [
    { min: 2, max: 50, message: i18n.global.t("member.pleaseInputTwoToFiftyCharacter"), trigger: "blur" },
    { required: true, message: i18n.global.t("member.pleaseInputRemark"), trigger: "blur" },
  ],
});
const cardStatusList = ref([
  { label: i18n.global.t("member.start"), value: 0 },
  { label: i18n.global.t("member.disable"), value: 1 },
]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
onMounted(async ()=>{
  props.type==='edit' && await queryDetailInfo()
})
function queryDetailInfo(){
  return getCryptocyInfo(props.id).then(res=>{
    queryParams.value  = res || {}
  })
}
const cancel = () => {
  dialogVisible.value = false;
};
const submit = () => {
  queryRef.value.validate(valid=>{
    if(valid){
      if(props.type==='edit'){
        editCryptocy(queryParams.value).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"))
          dialogVisible.value = false;
          emit("onrefresh")
        })
      }else{
        addCryptocy(queryParams.value).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("member.addSuccessfully"))
          dialogVisible.value = false;
          emit("onrefresh")
        })
      }
    }else{
      return 
    }
  })
};
</script>

<style lang="scss" scoped>
.currency-card-dialog {
  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
}
</style>
