<template>
  <div class="eb-coin-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <template #header>
        <span class="header-title">{{
          typeEB === "add" ? $t('member.addEBCoinAddress') : $t('member.editCurrency')
        }}</span>
      </template>
      <el-form :model="queryParams" ref="queryRef" :rules="rules" label-position="top">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
              :label="$t('member.EBPAYAddress')"
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
                :disabled="!!userName"
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
import {  addEBCryptocy } from "@/api/member/bankcard/index";

const props = defineProps(["open", "id","typeEB","userName"]);
console.log(props.userName,111)
const emit = defineEmits(["update:open","onrefresh"]);
const { proxy } = getCurrentInstance()
const queryRef = ref(null)
const queryParams = ref({
  addr:null,
  alias:null,
  currency:'EB币',
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
    {
      pattern: /^eb.{32}$/, // 正则表达式：以 eb 开头，后面跟 32 位字符
      message: '请输入以 eb 开头的 34 位字符',
      trigger: 'blur'
    }
  ],
  alias: [
    { min: 3, max: 10, message: i18n.global.t("member.pleaseInputThreeToTenCharacter"), trigger: "blur" },
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
  props.typeEB==='edit' && await queryDetailInfo()
})
function queryDetailInfo(){
  return getEBCryptocyInfo(props.id).then(res=>{
    queryParams.value  = res || {}
  })
}
const cancel = () => {
  dialogVisible.value = false;
};
const submit = () => {
  queryRef.value.validate(valid=>{
    if(valid){
      if(props.typeEB==='edit'){
        editEBCryptocy(queryParams.value).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"))
          dialogVisible.value = false;
          emit("onrefresh")
        })
      }else{
        addEBCryptocy(queryParams.value).then(res=>{
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
.eb-coin-dialog {
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
