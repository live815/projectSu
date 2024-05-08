<template>
  <div class="add-edit-deposit-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="50%"
      :title="type === 'edit' ? $t('funds.editChannel') : $t('funds.addChannel')"
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
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item :label="$t('funds.storeName')" prop="mchId" class="full-width">
              <el-select
                v-model="queryParams.mchId"
                :placeholder="$t('funds.pleaseSelect')"
                class="full-width"
                clearable
                :disabled="type === 'edit'"
                @change="mchNameChange"
              >
                <el-option
                  v-for="dict in storeList"
                  :key="dict.mchId"
                  :label="dict.mchName"
                  :value="dict.mchId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
            :label="$t('funds.channelType')"
              prop="channelTypeCode"
              class="full-width"
            >
              <el-select
                v-model="queryParams.channelTypeCode"
                @change="channelTypeChange"
                :placeholder="$t('funds.pleaseSelect')"
                class="full-width"
                clearable
                :disabled="type === 'edit'"
              >
                <el-option
                  v-for="dict in channelTypeList"
                  :key="dict.channelTypeCode"
                  :label="dict.channelTypeName"
                  :value="dict.channelTypeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('funds.channelCode')"
              prop="mchChannelCode"
              class="full-width"
            >
              <el-input
                v-model="queryParams.mchChannelCode"
                clearable
                :placeholder="$t('funds.pleaseInput')"
                class="full-width"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('funds.channelLimitAmount')" class="full-width" required>
              <el-col :span="11">
                <el-form-item label="" prop="minPay" class="full-width">
                  <el-input
                    v-model="queryParams.minPay"
                    clearable
                    :placeholder="$t('funds.pleaseInput')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: center">~</el-col>
              <el-col :span="11">
                <el-form-item label="" prop="maxPay" class="full-width">
                  <el-input
                    v-model="queryParams.maxPay"
                    clearable
                    :placeholder="$t('funds.pleaseInput')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('funds.weights')" prop="weights" class="full-width">
              <el-input
                v-model="queryParams.weights"
                clearable
                :placeholder="$t('funds.pleaseInput')"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('funds.applicationSide')" prop="scopeName" class="full-width">
              <el-checkbox-group v-model="queryParams.scopeName">
                <el-checkbox
                  v-for="item in list"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col v-if="queryParams.channelTypeCode==='USDT'" :span="12">
            <el-form-item :label="$t('funds.supportAgreement')" prop="cryptoProtocolName" class="full-width">
              <el-checkbox-group v-model="queryParams.cryptoProtocolName">
                <el-checkbox
                  v-for="item in cryptoProtocolList"
                  :key="item"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item :label="$t('funds.isC2CChannel')" prop="isC2c" class="full-width">
              <el-radio-group v-model="queryParams.isC2c">
                <el-radio label="1">{{ $t('funds.yes') }}</el-radio>
                <el-radio label="0">{{ $t('funds.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('funds.remarkQuote')" prop="remark" class="full-width">
              <el-input
                v-model="queryParams.remark"
                type="textarea"
                :placeholder="$t('funds.pleaseInputContent')"
                show-word-limit
                maxlength="500"
              ></el-input>
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
import { computed, onMounted, proxyRefs } from "vue";
import { editChannel, getDetail, addChannel } from "@/api/funds/channel/index";

const props = defineProps([
  "open",
  "cloneId",
  "list",
  "type",
  "storeList",
]);
const emit = defineEmits(["update:open", "onrefresh"]);
const { proxy } = getCurrentInstance();
const channelTypeList = ref([])
const queryRef = ref(null);
const queryParams = ref({
  id: null,
  mchId: null,
  channelTypeCode: null,
  mchChannelCode: null,
  minPay: null,
  maxPay: null,
  weights: null,
  scope: null,
  scopeName: [],
  cryptoProtocol:null,
  cryptoProtocolName:[],
  isC2c:null,
  remark: null,
});
const rules = ref({
  mchId: [{ required: true, message: i18n.global.t("funds.pleaseSelectStoreName"), trigger: "change" }],
  channelTypeCode: [
    { required: true, message: i18n.global.t("funds.pleaseSelectChannelType"), trigger: "change" },
  ],
  mchChannelCode: [
    { required: true, message: i18n.global.t("funds.pleaseInputChannelCode"), trigger: "blur" },
  ],
  minPay: [
    { required: true, validator: validateMinMaxValue, trigger: "blur" },
    // {
    //   pattern: /^\d{1,6}$/,
    //   message: i18n.global.t("funds.maxSixPositiveInteger"),
    //   trigger: "blur",
    // },
  ],
  maxPay: [
    { required: true, validator: validateMinMaxValue, trigger: "blur" },
    // {
    //   pattern: /^\d{1,6}$/,
    //   message: i18n.global.t("funds.maxSixPositiveInteger"),
    //   trigger: "blur",
    // },
  ],
  weights: [
    { required: true, message: i18n.global.t("funds.pleaseInputWeights"), trigger: "blur" },
    {
      pattern: /^(0|([1-9]\d{0,1}|1\d{2}|2[0-4]\d|25[0-5]))$/,
      message: i18n.global.t("funds.integerRangeZeroToTwoHundredfivefive"),
      trigger: "blur",
    },
  ],
  scopeName: [
    {
      type: "array",
      required: true,
      message: i18n.global.t("funds.pleaseSelectApplicationSide"),
      trigger: "change",
    },
  ],
  remark: [{ required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: "blur" }],
  isC2c:[{ required: true, message: i18n.global.t("funds.pleaseSelectIsC2C"), trigger: "change" }]
});
const cryptoProtocolList = ref([])

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

props.cloneId && queryInfo();
//根据ID查询详情
function queryInfo() {
  getDetail(props.cloneId).then((res) => {
    if(res){
      res.cryptoProtocolName = res.cryptoProtocol.split(',')
      queryParams.value = res
    }
    queryParams.value.scope &&
      (queryParams.value.scopeName = queryParams.value.scope.split(","));
    // props.cloneId && checkChannelList()
    if(props.cloneId){
      checkChannelList()
      isShowProtocol()
    }
  });
}
//根据商户mchId去查询对应的通道类型列表
function checkChannelList(){
  const item = props.storeList.find(store=>store.mchId === queryParams.value.mchId)
  if(item){
    channelTypeList.value = item.channelTypeList
  }
}
function mchNameChange(val){
if(val){
  checkChannelList()
}
queryParams.value.channelTypeCode = null
}
function channelTypeChange(val){
  isShowProtocol()
}
function isShowProtocol(){
  if(queryParams.value.channelTypeCode==="USDT"){
      const channel = channelTypeList.value.find(channel=>channel.channelTypeCode===queryParams.value.channelTypeCode)
      console.log(channel,channelTypeList.value)
      if(channel){
        cryptoProtocolList.value = channel.cryptoProtocol.split(',')
        queryParams.value.cryptoProtocolName = queryParams.value.cryptoProtocol?queryParams.value.cryptoProtocol.split(','):channel.cryptoProtocol.split(',')
      }
    }
}
const cancel = () => {
  dialogVisible.value = false;
};
const submit = () => {
  queryRef.value.validate((valid) => {
    if (valid) {
      queryParams.value.scope = queryParams.value.scopeName.join(",");
      console.log(queryParams.value.cryptoProtocolName,666)
      queryParams.value.cryptoProtocol = queryParams.value.cryptoProtocolName.join(",");
      if (props.type==='edit') {
        editChannel(queryParams.value).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      } else {
        addChannel(queryParams.value).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("funds.addedSuccessfully"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      }
    } else {
      return;
    }
  });
};
//校验规则
function validateMinMaxValue(rule, value, callback) {
  // 自定义校验逻辑
  if (!value) {
    callback(new Error(i18n.global.t("funds.pleaseInputChannelAreaLimitAmount")));
  } else {
    const minValue = parseFloat(queryParams.value.minPay);
    const maxValue = parseFloat(queryParams.value.maxPay);

    if (!isNaN(minValue) && !isNaN(maxValue) && minValue > maxValue) {
      callback(new Error(i18n.global.t("funds.minValueCannotBeyondMaxvalue")));
    } else {
      callback(); // 校验通过
    }
  }
}
</script>

<style lang="scss" scoped>
.add-edit-deposit-dialog {
  :deep().el-dialog__title {
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
