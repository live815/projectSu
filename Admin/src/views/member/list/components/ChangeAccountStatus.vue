<template>
  <!-- 修改账号状态 -->
  <div class="force-success-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="filterTitle"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="top"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="24" v-if="type === 'edit_member_type'">
            <el-form-item :label="$t('member.accountType')" prop="type">
              <el-select
                v-model="queryParams.type"
                :placeholder="$t('member.pleaseSelect')"
                class="full-width"
                clearable
              >
                <el-option
                  v-for="dict in typeList"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_status'">
            <el-form-item :label="$t('member.accountStatusQuote')" prop="statusName">
              <el-select
                v-model="queryParams.statusName"
                :placeholder="$t('member.pleaseSelect')"
                class="full-width"
                clearable
                multiple
                collapse-tags
                collapse-tags-tooltip
                @change="disabledChange"
              >
                <el-option
                  v-for="dict in channelList"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                  :disabled="disabledOption(dict)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_reg_nation'">
            <el-form-item :label="$t('member.registerNation')" prop="regNation">
              <el-input
                v-model="queryParams.regNation"
                :placeholder="$t('member.pleaseInput')"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_vip_level'">
            <el-form-item :label="$t('member.vipLevel')" prop="vipLevel" class="full-width">
              <el-select
                v-model="queryParams.vipLevel"
                :placeholder="$t('member.pleaseSelect')"
                clearable
                class="full-width"
              >
                <el-option
                  v-for="dict in vipLevelList"
                  :key="dict.vipLevel"
                  :label="dict.vipName"
                  :value="dict.vipLevel"
                  :disabled="dict.vipLevel === 0"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_parent_id'">
            <el-form-item :label="$t('member.agentName')" prop="parentName">
              <el-input
                v-model="queryParams.parentName"
                :placeholder="$t('member.pleaseInput')"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_risk_control_tier'">
            <el-form-item
              :label="$t('member.riskTier')"
              prop="riskControlTier"
              class="full-width"
            >
              <el-select
                v-model="queryParams.riskControlTier"
                :placeholder="$t('member.pleaseSelect')"
                clearable
                class="full-width"
              >
                <el-option
                  v-for="dict in riskControlTierList"
                  :key="dict.id"
                  :label="dict.layerName"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_finance_tier'">
            <el-form-item
              :label="$t('member.financeTier')"
              prop="financeTier"
              class="full-width"
            >
              <el-select
                v-model="queryParams.financeTier"
                :placeholder="$t('member.pleaseSelect')"
                clearable
                class="full-width"
              >
                <el-option
                  v-for="dict in financeTierList"
                  :key="dict.id"
                  :label="dict.layerName"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_mobile'">
            <el-form-item :label="$t('member.phoneNumberUser')" prop="mobile" class="country-item">
              <template #label>
                <span>
                  {{ $t('member.phoneNumberUser') }}
                  <el-tooltip :content="$t('member.phoneNumberEdit')" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                </span>
              </template>
              <el-select
                  v-model="queryParams.mobileCode"
                  :placeholder="$t('member.pleaseSelect')"
                  clearable
              >
                <el-option
                    v-for="item in con_Arr"
                    :key="item.id"
                    :label="item.phoneCode"
                    :value="item.phoneCode.replace( /\+/, '' )"
                />
              </el-select>
              <el-input
                v-model="queryParams.mobile"
                :placeholder="$t('system.tip70')"
                clearable
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_email'">
            <el-form-item :label="$t('member.email')" prop="email">
              <el-input
                v-model="queryParams.email"
                :placeholder="$t('member.pleaseInput')"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_nick_name'">
            <el-form-item :label="$t('member.nickName')" prop="nickName">
              <el-input
                v-model="queryParams.nickName"
                :placeholder="$t('member.pleaseInput')"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_birthday'">
            <el-form-item :label="$t('member.birthday')" prop="birthday" class="full-width">
              <!-- <el-input
                v-model="queryParams.birthday"
                :placeholder="$t('member.pleaseInput')"
                clearable
              ></el-input> -->
              <el-date-picker
                v-model="queryParams.birthday"
                type="date"
                :placeholder="$t('member.pleaseSelect')"
                value-format="YYYY-MM-DD"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'edit_member_sex'">
            <el-form-item :label="$t('member.gender')" prop="sex">
              <el-select
                v-model="queryParams.sex"
                :placeholder="$t('member.pleaseSelect')"
                class="full-width"
                clearable
              >
                <el-option
                  v-for="dict in sexList"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'reset_member_pwd'">
            <el-form-item :label="$t('member.resetPassword')" prop="pwd">
              <el-input
                v-model="queryParams.pwd"
                :placeholder="$t('member.pleaseInput')"
                clearable
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!filterAPI">
            <el-form-item :label="$t('member.submitApplyReason')" prop="remark">
              <el-input
                type="textarea"
                v-model="queryParams.remark"
                maxlength="50"
                :placeholder="$t('member.pleaseInput')"
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
          <el-button type="primary" @click="submit">{{ $t('member.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { updateField, updateMemberUserEdit } from "@/api/member/list/index";
import { getVIPList } from "@/api/funds/config/index";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { deepCopy } from "@/utils/index";
import { getCountrycodeList } from "@/api/member/phone";

const props = defineProps(["openStatus", "cloneRow", "type", "mobileCode"]);
const emit = defineEmits(["update:openStatus", "freshfield"]);
const { proxy } = getCurrentInstance();
const queryParams = ref({
  id: null,
  status: null,
  statusName:deepCopy(props.cloneRow.status.split(',')),
  type: deepCopy(props.cloneRow.type),
  regNation: deepCopy(props.cloneRow.regNation),
  vipLevel: deepCopy(props.cloneRow.vipLevel),
  parentName: deepCopy(props.cloneRow.parentName),
  riskControlTier: deepCopy(Number(props.cloneRow.riskControlTier)),
  financeTier: deepCopy(Number(props.cloneRow.financeTier) || ""),
  mobile: deepCopy(props.cloneRow.mobile),
  email: deepCopy(props.cloneRow.email),
  nickName: deepCopy(props.cloneRow.nickName),
  birthday: deepCopy(props.cloneRow.birthday),
  sex: deepCopy(props.cloneRow.sex),
  pwd: "******",
  remark: null,
  mobileCode: null,
});
const queryRef = ref(null);
const vipLevelList = ref([]); //vip等级列表
const financeTierList = ref([]); //财务层级列表
const riskControlTierList = ref([]); //风控层级列表
const con_Arr = ref([]);
const channelList = ref([
  { label: i18n.global.t("member.regular"), value: "0" },
  { label: i18n.global.t("member.loginLock"), value: "1" },
  { label: i18n.global.t("member.rechargeWithdrawLock"), value: "2" },
  { label: i18n.global.t("member.abandonWithdrawLock"), value: "3" },
  { label: i18n.global.t("member.offerLock"), value: "4" },
  { label: i18n.global.t("member.rebateLock"), value: "5" },
  { label: i18n.global.t("member.gameLock"), value: "6" },
]);
const typeList = ref([
  { label: i18n.global.t("member.normal"), value: "0" },
  { label: i18n.global.t("member.excellent"), value: "1" },
  { label: i18n.global.t("member.follow"), value: "2" },
]);
const sexList = ref([
  {
    label: i18n.global.t("member.man"),
    value: "0",
  },
  {
    label: i18n.global.t("member.woman"),
    value: "1",
  },
]);
const rules = ref({
  statusName: [{type:'array', required: true, message: i18n.global.t("member.pleaseSelectStatus"), trigger: "change" }],
  remark: [{ required: true, message: i18n.global.t("member.pleaseInputRemark"), trigger: "blur" }],
  regNation: [
    { required: true, message: i18n.global.t("member.pleaseInputCountryName"), trigger: "blur" },
    { pattern: /^[A-Z]{2}$/, message: i18n.global.t("member.pleaseInputTwoLetters"), trigger: "blur" },
  ],
  mobile: [
    { required: true, message: i18n.global.t("member.pleaseInputPhoneNumber"), trigger: "blur" },
    // {pattern:/^\\d{2,4}\\s\\d{4,12}$/,message:"请输入手机区号(两位)+空格+手机号码长度4-12位的校验", trigger: "blur"}
  ],
  nickName: [
    { required: true, message: i18n.global.t("member.pleaseInputNickname"), trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{4,10}$/,
      message: i18n.global.t("member.pleaseInputFourToTenLettersOrDigtal"),
      trigger: "blur",
    },
  ],
  birthday:[
  { required: true, message: i18n.global.t("member.pleaseSelectBirthday"), trigger: "change" },
  {validator:validateBirthday,trigger:"change"}
  ]
});
const dialogVisible = computed({
  get() {
    return props.openStatus;
  },
  set(val) {
    emit("update:openStatus", val);
  },
});
//控制状态选择的选项置灰操作
const disabledOption = computed(()=>{
  return (dict)=>{
    return queryParams.value.statusName.includes("0") && dict.value !== "0"
  }
})
function disabledChange(val){
  if(val.includes("0")){
    queryParams.value.statusName = ["0"]
  }
}

const filterTitle = computed(() => {
  switch (props.type) {
    case "edit_member_type":
      return i18n.global.t("member.editMemberAccountType");
    case "edit_member_status":
      return i18n.global.t("member.editMemberAccountType");
    case "edit_member_reg_nation":
      return i18n.global.t("member.editMemberRegisterNation");
    case "edit_member_risk_control_tier":
      return i18n.global.t("member.editMemberRiskControlLevel");
    case "edit_member_finance_tier":
      return i18n.global.t("member.editMemberFinanceLevel");
    case "edit_member_vip_level":
      return i18n.global.t("member.editMemberVipLevel");
    case "edit_member_nick_name":
      return i18n.global.t("member.editMemberNickname");
    case "edit_member_parent_id":
      return i18n.global.t("member.editMemberAgentname");
    case "edit_member_email":
      return i18n.global.t("member.editMemberEmail");
    case "edit_member_birthday":
      return i18n.global.t("member.editMemberBirthday");
    case "edit_member_mobile":
      return i18n.global.t("member.editMemberPhone");
    case "edit_member_sex":
      return i18n.global.t("member.editMemberSex");
    case "edit_member_tag":
      return i18n.global.t("member.editMemberTitle");
    case "reset_member_pwd":
      return i18n.global.t("member.editMemberPassword");
    default:
      return i18n.global.t("member.editFields");
  }
});
const filterAPI = computed(()=>{
  return (props.type==='edit_member_finance_tier'||
  props.type==='edit_member_risk_control_tier'||
  props.type==='edit_member_type'||
  props.type==='edit_member_status'||
  // props.type==='edit_member_nick_name'||
  props.type==='edit_member_sex')
})
const isSubmit = computed(()=>{
  // return (queryParams.value.statusName.sort().join()===props.cloneRow.status||
  // queryParams.value.type===props.cloneRow.type||
  // queryParams.value.regNation===props.cloneRow.regNation||
  // queryParams.value.vipLevel===props.cloneRow.vipLevel||
  // queryParams.value.parentName===props.cloneRow.parentName||
  // queryParams.value.riskControlTier==props.cloneRow.riskControlTier||
  // queryParams.value.financeTier==props.cloneRow.financeTier||
  // queryParams.value.mobile===props.cloneRow.mobile||
  // queryParams.value.email===props.cloneRow.email||
  // queryParams.value.nickName===props.cloneRow.nickName||
  // queryParams.value.birthday===props.cloneRow.birthday||
  // queryParams.value.sex===props.cloneRow.sex)
  switch (props.type) {
    case "edit_member_status":
      return queryParams.value.statusName.sort().join()===props.cloneRow.status;
      case "edit_member_type":
      return queryParams.value.type===props.cloneRow.type;
      case "edit_member_reg_nation":
      return queryParams.value.regNation===props.cloneRow.regNation;
      case "edit_member_vip_level":
      return queryParams.value.vipLevel===props.cloneRow.vipLevel;
      case "edit_member_parent_id":
      return queryParams.value.parentName===props.cloneRow.parentName;
      case "edit_member_risk_control_tier":
      return queryParams.value.riskControlTier==props.cloneRow.riskControlTier;
      case "edit_member_finance_tier":
      return queryParams.value.financeTier==props.cloneRow.financeTier;
      case "edit_member_mobile":
      return queryParams.value.mobile===props.cloneRow.mobile;
      case "edit_member_email":
      return queryParams.value.email===props.cloneRow.email;
      case "edit_member_nick_name":
      return queryParams.value.nickName===props.cloneRow.nickName;
      case "edit_member_birthday":
      return queryParams.value.birthday===props.cloneRow.birthday;
      case "edit_member_sex":
      return queryParams.value.sex===props.cloneRow.sex;
  }
});
onMounted(async () => {
  props.type === "edit_member_vip_level" && (await queryVIP());
  props.type === "edit_member_finance_tier" && (await queryTierList());
  props.type === "edit_member_risk_control_tier" &&
    (await queryRiskControlTier());
  getList();
});

watch(() => props.mobileCode, (newVal) => {
  queryParams.value.mobileCode = newVal || ''
}, {
  immediate: true
})

//查询VIP层级
async function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}

//查询财务层级
async function queryTierList() {
  return getRiskFinancalList(1).then((res) => {
    financeTierList.value = res || [];
  });
}

//查询风控层级
async function queryRiskControlTier() {
  return getRiskFinancalList(2).then((res) => {
    riskControlTierList.value = res || [];
  });
}

function filterFieldLabel() {
  switch (props.type) {
    case "edit_member_type":
      return typeList.value.find(
        (item) => queryParams.value.type === item.value
      ).label;
    case "edit_member_status":
      return channelList.value.filter(item=>queryParams.value.statusName.includes(item.value)).map(item=>item.label).join(',');
    case "edit_member_reg_nation":
      return queryParams.value.regNation;
    case "edit_member_risk_control_tier":
      return riskControlTierList.value.find(
        (item) => queryParams.value.riskControlTier === item.id
      ).layerName;
    case "edit_member_finance_tier":
      return financeTierList.value.find(
        (item) => queryParams.value.financeTier === item.id
      ).layerName;
    case "edit_member_vip_level":
      return vipLevelList.value.find(
        (item) => queryParams.value.vipLevel === item.vipLevel
      ).vipName;
    case "edit_member_nick_name":
      return queryParams.value.nickName;
    case "edit_member_parent_id":
      return queryParams.value.parentName;
    case "edit_member_email":
      return queryParams.value.email;
    case "edit_member_birthday":
      return queryParams.value.birthday;
    case "edit_member_mobile":
      return (queryParams.value.mobileCode + '').replace(/\+/, '' ) + ' ' + queryParams.value.mobile;
    case "edit_member_sex":
      return sexList.value.find((item) => queryParams.value.sex === item.value)
        .label;
    case "edit_member_tag":
      return props.cloneRow.optionLabelRespVOList;
    case "reset_member_pwd":
      return queryParams.value.pwd;
    default:
      return i18n.global.t("member.editFields");
  }
}

function filterFieldValue() {
  switch (props.type) {
    case "edit_member_type":
      return queryParams.value.type;
    case "edit_member_status":
      return queryParams.value.statusName.join(',');
    case "edit_member_reg_nation":
      return queryParams.value.regNation;
    case "edit_member_risk_control_tier":
      return queryParams.value.riskControlTier;
    case "edit_member_finance_tier":
      return queryParams.value.financeTier;
    case "edit_member_vip_level":
      return queryParams.value.vipLevel;
    case "edit_member_nick_name":
      return queryParams.value.nickName;
    case "edit_member_parent_id":
      return queryParams.value.parentName;
    case "edit_member_email":
      return queryParams.value.email;
    case "edit_member_birthday":
      return queryParams.value.birthday;
    case "edit_member_mobile":
      return (queryParams.value.mobileCode + '').replace(/\+/, '' )  + ' ' + queryParams.value.mobile;
    case "edit_member_sex":
      return queryParams.value.sex;
    case "edit_member_tag":
      return queryParams.value.optionLabelRespVOList;
    case "reset_member_pwd":
      return queryParams.value.pwd;
    default:
      return i18n.global.t("member.editFields");
  }
}
function filterFormLabel(){
  switch (props.type) {
    case "edit_member_type":
      return {type:queryParams.value.type};
    case "edit_member_status":
      return {status:queryParams.value.statusName.join(',')};
    case "edit_member_risk_control_tier":
      return {riskControlTier:queryParams.value.riskControlTier};
    case "edit_member_finance_tier":
      return {financeTier:queryParams.value.financeTier};
    case "edit_member_nick_name":
      return {nickName:queryParams.value.nickName};
    case "edit_member_sex":
      return {sex:queryParams.value.sex};
    default:
      return {};
  }
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      if(isSubmit.value){
        proxy.$modal.msgWarning(i18n.global.t("member.noChangeAfterSubmit"))
        return
      }
      if (filterAPI.value) {
        const params = filterFormLabel();
        updateMemberUserEdit({
          id:props.cloneRow.id,
          ...params
        }).then((res) => {
          dialogVisible.value = false;

          proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"));
          emit("freshfield");
        })
      } else {
        updateField({
          memberId: props.cloneRow.id,
          fieldKey: props.type,
          fieldValue: filterFieldValue(),
          fieldLabel: filterFieldLabel(),
          remark: queryParams.value.remark,
          userName: props.cloneRow.userName,
        }).then((res) => {
          dialogVisible.value = false;

          proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"));
          emit("freshfield");
        });
      }
    } else {
      return;
    }
  });
}

const getList = () => {
  getCountrycodeList().then((res = []) => {
    con_Arr.value = res.rows || [];
  });
};
function validateBirthday(rule, value, callback) {
  // 获取当前日期
  const now = new Date();
  
  // 将字符串日期转换为日期对象
  const selectedDate = new Date(value);

  // 计算年龄（以年为单位）
  const age = now.getFullYear() - selectedDate.getFullYear();

  // 如果生日还未过，年龄减1
  // if (now.getMonth() < selectedDate.getMonth() || (now.getMonth() === selectedDate.getMonth() && now.getDate() < selectedDate.getDate())) {
  //   age--;
  // }

  // 检查年龄是否小于18岁
  if (age < 18) {
    callback(new Error(i18n.global.t("member.ageMustOboveEighteen")));
  } else {
    callback();
  }
}
</script>

<style lang="scss" scoped>
.force-success-dialog {
  .avatar-uploader-icon {
    width: 105px;
    height: 105px;
    // text-align:center;
    // line-height: 105px;
    border: 1px dashed gray;
  }

  .rewrite-icon {
    display: flex;
    flex-direction: column;
  }

  .force-success-img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }

  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }

    .el-dialog__body {
      padding-top: 0;
    }
  }
}

.country-item {
  .el-form-item__content {
    display: flex;

    .el-select {
      flex: 1;
    }

    .el-input {
      flex: 5;
    }
  }
}
</style>
