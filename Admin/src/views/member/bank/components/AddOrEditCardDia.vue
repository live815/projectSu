<template>
  <div class="delete-card-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <template #header>
        <span class="header-title">{{
          type === "add" ? $t('member.addBankcard') : $t('member.editBankcard')
        }}</span>
      </template>
      <el-form :model="queryParams" ref="queryRef" :rules="rules" label-width="98px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
              :label="$t('member.accountAddr')"
              prop="accountAddr"
              class="full-width"
            >
              <el-input
                v-model="queryParams.accountAddr"
                :placeholder="$t('member.pleaseInput')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.bankname')" prop="bankCode" class="full-width">
              <el-select
                v-model="queryParams.bankCode"
                :placeholder="$t('member.pleaseSelect')"
                clearable
                class="full-width"
              >
                <el-option
                  v-for="item in bankList"
                  :key="item.bankCode"
                  :label="item.bankName"
                  :value="item.bankCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.bankcardNo')" prop="cardNo" class="full-width">
              <el-input
                v-model="queryParams.cardNo"
                :placeholder="$t('member.pleaseInput')"
                clearable
                :disabled="type === 'edit'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.cardType')" prop="cardType" class="full-width">
              <el-select
                v-model="queryParams.cardType"
                :placeholder="$t('member.pleaseSelect')"
                clearable
                class="full-width"
              >
                <el-option
                  v-for="item in cardTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('member.cardholder')"
              prop="cardholder"
              class="full-width"
            >
              <el-input
                v-model="queryParams.cardholder"
                :placeholder="$t('member.pleaseInput')"
                clearable
                :disabled="type === 'edit'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.cardStatus')" prop="status" class="full-width">
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
          <el-col :span="24" v-if="type === 'edit'">
            <el-form-item :label="$t('funds.remarkQuote')" prop="remark">
              <el-input
                type="textarea"
                v-model="queryParams.remark"
                maxlength="200"
                :placeholder="$t('funds.pleaseInput')"
                show-word-limit
                :rows="5"
              ></el-input>
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
import { getBankcardInfo, addBankcard,editBankcard } from "@/api/member/bankcard/index";
import { getBankList } from "@/api/funds/config/index";

const props = defineProps(["open", "id","type","userName"]);
const emit = defineEmits(["update:open","onrefresh"]);
const { proxy } = getCurrentInstance()
console.log(props.id,666,props.type)
const queryRef = ref(null)
const queryParams = ref({
  accountAddr:null,
  bankCode:null,
  cardNo:null,
  cardType:null,
  cardholder:null,
  status:null,
  userName:props.userName,
  remark:null
});
const rules = ref({
  bankCode: [
    {
      required: true,
      message: i18n.global.t("member.pleaseSelectBankname"),
      trigger: "change",
    },
  ],
  cardNo:[
    {
      required: true,
      message: i18n.global.t("member.pleaseInputBankCardNo"),
      trigger: "blur",
    }
  ],
  cardholder:[
    {
      required: true,
      message: i18n.global.t("member.pleaseInputCardholder"),
      trigger: "blur",
    }
  ],
  remark: [
    { min: 2, max: 50, message: i18n.global.t("member.pleaseInputTwoToFiftyCharacter"), trigger: "blur" },
    { required: true, message: i18n.global.t("member.pleaseInputRemark"), trigger: "blur" },
  ],
});
const cardTypeList = ref([
  { label: i18n.global.t("member.firstTypeCard"), value: "1" },
  { label: i18n.global.t("member.secondTypeCard"), value: "2" },
  { label: i18n.global.t("member.thirdTypeCard"), value: "3" },
  { label: i18n.global.t("member.rememberCard"), value: "4" },
  { label: i18n.global.t("member.unknowStatus"), value: "5" },
  { label: i18n.global.t("member.uncheck"), value: "6" }
]);
const cardStatusList = ref([
  { label: i18n.global.t("member.start"), value: 0 },
  { label: i18n.global.t("member.disable"), value: 1 },
]);
const bankList = ref([]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
onMounted(async ()=>{
  queryBankList();
  props.type==='edit' && await queryDetailInfo()
})
function queryDetailInfo(){
  return getBankcardInfo(props.id).then(res=>{
    queryParams.value  = res || {}
    queryParams.value.bankCode = res.bankcode
  })
}
function queryBankList(){
  getBankList({
    pageNum:1,
    pageSize:1000
  }).then(res=>{
    bankList.value  = res.rows || [];
  })
}
const cancel = () => {
  dialogVisible.value = false;
};
const submit = () => {
  // dialogVisible.value = false;
  // console.log(queryParams.value);
  queryRef.value.validate(valid=>{
    if(valid){
      if(props.type==='edit'){
        editBankcard(queryParams.value).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"))
          dialogVisible.value = false;
          emit("onrefresh")
        })
      }else{
        addBankcard(queryParams.value).then(res=>{
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
.delete-card-dialog {
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
