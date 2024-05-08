<!-- 提款绑定 -->
<template>
  <div class="add-bank-card">
    <div class="return">
      <div class="return-width" @click="handledGoBack(0)">
        <div><img src="./img/Frame.png" /></div>
        <div>{{ $t('GeneralUserCenter.WithdrawalBinding') }}</div>
      </div>
    </div>
    <div class="bank-card">
      <div
        v-for="(item, index) in btnDate"
        :key="index"
        @click="changeFrom(item.value)"
        :class="showBankCard == item.value ? 'active' : ''"
      >
        {{ item.label }}
      </div>
    </div>
    <!-- 银行卡 -->
    <div class="bank-card-form" v-if="showBankCard == 0 && listData.length < 10">
      <el-form label-width="170px" labelPosition="left" :model="bankInfo" :rules="rules">
        <el-form-item :label="$t('GeneralUserCenter.OwnerName')">
          <el-input
            v-model="bankInfo.cardholder"
            :placeholder="$t('GeneralUserCenter.EnterName')"
            clearable
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
            @input="convertToUpperCase"
          />
        </el-form-item>
        <el-form-item :label="$t('GeneralUserCenter.AccountOpeningBank')">
          <el-select
            v-model="selectedItem"
            clearable
            :placeholder="$t('GeneralUserCenter.SelectBank')"
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
            @change="handleSelectChange"
          >
            <template v-if="bankInfo.selectedOptions.icon" #prefix>
              <img class="bank-card-form-img" :src="getImg(bankInfo.selectedOptions.icon)" />
            </template>
            <el-option
              v-for="item in optionsBankList"
              :key="item.bankCode"
              :label="item.bankName"
              :value="item"
            >
              <div class="bank-card-form-option">
                <img :src="getImg(item.icon)" />
                <div class="title">{{ item.bankName }}</div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('GeneralUserCenter.BankCardNumber')" prop="cardNo">
          <el-input
            v-model="bankInfo.cardNo"
            :placeholder="$t('GeneralUserCenter.EnterBankCardNumber')"
            clearable
            :minlength="getBankCardInputMinLength(currentCountry.countryCode)"
            :maxlength="19"
            type="text"
            @input="handleInputDigitsOnly"
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          />
        </el-form-item>
        <el-form-item :label="$t('GeneralUserCenter.Openingaddress')">
          <el-input
            v-model="bankInfo.accountAddr"
            :placeholder="$t('GeneralUserCenter.EnterOpeningaddress')"
            clearable
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          />
        </el-form-item>
        <div class="phone-box" v-if="isIphoneShow">
          <div class="phone-count">
            <div class="phone-count-left">{{ $t('GeneralUserCenter.PhoneNumber') }}：</div>
            <div class="phone-count-right">
              <div class="country-icon" @click.stop="showSelect">
                <img :src="getImg(currentCountry.icon)" width="20" height="20" />
                <div class="phone-select">{{ currentCountry.phoneCode }}</div>
              </div>

              <div class="line"></div>

              <input
                class="phone-input"
                type="text"
                :placeholder="$t('GeneralUserCenter.EnterPhoneNumber')"
                v-model="phoneNumber"
                :maxLength="getPhoneInputLength(currentCountry.countryCode)"
              />
              <div class="phoneSelector">
                <PhoneSelector ref="phoneseletor" @getAreaCode="getAreaCode"></PhoneSelector>
              </div>
            </div>
          </div>
          <div class="iphone-text">
            {{ $t('GeneralUserCenter.Notice_7') }}
          </div>
          <div class="phone-count">
            <div class="phone-count-left">{{ $t('GeneralUserCenter.VerificationCode') }}:</div>
            <div class="phone-code-right">
              <input
                class="phone-input"
                type="text"
                :placeholder="$t('GeneralUserCenter.EnterVerificationCode')"
                v-model="bankInfo.code"
              />
              <div class="code-right">
                <div class="line"></div>
                <div class="code" v-if="countdown > 0">
                  {{ $t('GeneralUserCenter.AfterSeconds', { countdown }) }}
                </div>
                <div class="code" @click="onSendCode(5)" v-else>
                  {{ $t('GeneralUserCenter.GetVerificationCode') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-form-item>
          <div class="add-to" @click="onClickAddBank">{{ $t('GeneralUserCenter.Add') }}</div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 虚拟币地址 -->
    <div class="virtual-currency-form" v-if="showBankCard == 1">
      <el-form label-width="170px" labelPosition="left">
        <el-form-item :label="$t('GeneralUserCenter.AnotherName')">
          <el-input
            v-model="virtualFrom.alias"
            :placeholder="$t('GeneralUserCenter.Notice_8')"
            clearable
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          />
        </el-form-item>
        <el-form-item :label="$t('GeneralUserCenter.VirtualCurrencyAccount')"
          ><el-input
            v-model="virtualFrom.addr"
            :placeholder="$t('GeneralUserCenter.EnterOrPasteYourWithdrawalAddress')"
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          >
            <!-- <template #append
              ><span class="scan_it"> <img src="./img/scan_it.png" /> </span
            ></template> -->
          </el-input></el-form-item
        >
        <el-form-item :label="$t('GeneralUserCenter.TypesOfVirtualCurrency')">
          <el-input
            v-model="virtualFrom.currency"
            :placeholder="$t('GeneralUserCenter.EnterTheType')"
            disabled
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          />
        </el-form-item>
        <el-form-item :label="$t('GeneralUserCenter.VirtualCurrencyProtocol')">
          <el-radio-group v-model="radio" style="margin-left: 2px">
            <el-radio :label="1">TRC20</el-radio>
            <!-- <el-radio :label="2">ERC20</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <div class="phone-box" v-if="isIphone">
          <div class="phone-count">
            <div class="phone-count-left">{{ $t('GeneralUserCenter.PhoneNumber') }}：</div>
            <div class="phone-count-right">
              <div class="country-icon" @click.stop="showSelect">
                <img :src="getImg(currentCountry.icon)" width="20" height="20" />
                <div class="phone-select">{{ currentCountry.phoneCode }}</div>
              </div>

              <div class="line"></div>

              <input
                class="phone-input"
                type="text"
                :placeholder="$t('GeneralUserCenter.EnterPhoneNumber')"
                v-model="phoneNumber"
                :maxLength="getPhoneInputLength(currentCountry.countryCode)"
              />
              <div class="phoneSelector">
                <PhoneSelector ref="phoneseletor" @getAreaCode="getAreaCode"></PhoneSelector>
              </div>
            </div>
          </div>
          <div class="iphone-text">
            {{ $t('GeneralUserCenter.Notice_7') }}
          </div>
          <div class="phone-count">
            <div class="phone-count-left">{{ $t('GeneralUserCenter.VerificationCode') }}:</div>
            <div class="phone-code-right">
              <input
                class="phone-input"
                type="text"
                :placeholder="$t('GeneralUserCenter.EnterVerificationCode')"
                v-model="virtualFrom.code"
              />
              <div class="code-right">
                <div class="line"></div>
                <div class="code" v-if="countdown > 0">
                  {{ $t('GeneralUserCenter.AfterSeconds', { countdown }) }}
                </div>
                <div class="code" @click="onSendCode(6)" v-else>
                  {{ $t('GeneralUserCenter.GetVerificationCode') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="add-to" @click="onClickAddVirtual">{{ $t('GeneralUserCenter.Add') }}</div>
      </el-form>
    </div>
    <!-- EBPAY地址 -->
    <div class="virtual-currency-form" v-if="showBankCard == 2">
      <el-form label-width="170px" labelPosition="left">
        <el-form-item :label="$t('GeneralUserCenter.AnotherName')">
          <el-input
            v-model="EbPayFrom.alias"
            :placeholder="$t('GeneralUserCenter.Notice_8')"
            clearable
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          />
        </el-form-item>
        <el-form-item :label="$t('GeneralUserCenter.EbPayCurrencyAccount')"
          ><el-input
            v-model="EbPayFrom.addr"
            :placeholder="$t('GeneralUserCenter.EnterOrPasteYourWithdrawalAddress')"
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          >
            <!-- <template #append
              ><span class="scan_it"> <img src="./img/scan_it.png" /> </span
            ></template> -->
          </el-input></el-form-item
        >
        <el-form-item :label="$t('GeneralUserCenter.TypesOfEbPayCurrency')">
          <el-input
            v-model="EbPayFrom.currency"
            :placeholder="$t('GeneralUserCenter.EnterTheType')"
            disabled
            style="
              width: 540px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          />
        </el-form-item>
        <div class="phone-box" v-if="isIphone">
          <div class="phone-count">
            <div class="phone-count-left">{{ $t('GeneralUserCenter.PhoneNumber') }}：</div>
            <div class="phone-count-right">
              <div class="country-icon" @click.stop="showSelect">
                <img :src="getImg(currentCountry.icon)" width="20" height="20" />
                <div class="phone-select">{{ currentCountry.phoneCode }}</div>
              </div>

              <div class="line"></div>

              <input
                class="phone-input"
                type="text"
                :placeholder="$t('GeneralUserCenter.EnterPhoneNumber')"
                v-model="phoneNumber"
                :maxLength="getPhoneInputLength(currentCountry.countryCode)"
              />
              <div class="phoneSelector">
                <PhoneSelector ref="phoneseletor" @getAreaCode="getAreaCode"></PhoneSelector>
              </div>
            </div>
          </div>
          <div class="iphone-text">
            {{ $t('GeneralUserCenter.Notice_7') }}
          </div>
          <div class="phone-count">
            <div class="phone-count-left">{{ $t('GeneralUserCenter.VerificationCode') }}:</div>
            <div class="phone-code-right">
              <input
                class="phone-input"
                type="text"
                :placeholder="$t('GeneralUserCenter.EnterVerificationCode')"
                v-model="EbPayFrom.code"
              />
              <div class="code-right">
                <div class="line"></div>
                <div class="code" v-if="countdown > 0">
                  {{ $t('GeneralUserCenter.AfterSeconds', { countdown }) }}
                </div>
                <div class="code" @click="onSendCode(6)" v-else>
                  {{ $t('GeneralUserCenter.GetVerificationCode') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="add-to" @click="onClickAddEb">{{ $t('GeneralUserCenter.Add') }}</div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import i18n from '@/i18n'
import { getImg } from '@/utils'

import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getCryptocyBindAddr,
  getCryptocyCheckMobile,
  getBankCheckMobile,
  getBindBankCard,
  getBankSupport,
  getBindWithPhone,
  getBankList,
  getCryptocyBindWithPhone
} from '@/api/bindInfo'
import { useUserStore } from '@/stores/user'
import { validateBankCard } from '@/utils/regCountryBankCard.js'
import { useSendCode } from '@/hooks/useSendCode'
import { useCaptcha } from '@/hooks/useCaptcha'
const { sendCode, getPhoneInputLength, getBankCardInputMinLength } = useSendCode()
const { initCaptcha, isloading } = useCaptcha()
import { getRegByPhoneCode } from '@/utils/regCountry'
const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})

const user = useUserStore()

const emit = defineEmits(['getCurrentPage'])
// 为0时显示银行卡
const showBankCard = ref(0)
const selectedItem = ref(null)
const radio = ref(1)

// 添加银行的信息
const bankInfo = reactive({
  cardholder: '', // 姓名
  cardNo: '', // 卡号
  selectedOptions: {
    bankName: '', // 银行卡信息
    icon: '', // 图标
    bankCode: '' // 卡code
  },
  accountAddr: '', // 开户地址
  phone: '', // 手机号
  code: '' // 验证码
})

// 添加虚拟币信息
const virtualFrom = reactive({
  alias: '', // 别名
  addr: '', // 加密货币地址
  currency: 'USDT', // 加密货币种类
  protocol: '', // 协议
  phone: '',
  code: ''
})

// 添加虚拟币信息
const EbPayFrom = reactive({
  alias: '', // 别名
  addr: '', // 加密货币地址
  currency: 'EB', // 加密货币种类
  protocol: 'EB', // 协议
  phone: '',
  code: ''
})
// 手机号是否绑定
const isIphoneShow = ref(false)
// 虚拟币手机号是否绑定
const isIphone = ref(false)

// 银行卡列表数据
const listData = ref([])

onMounted(() => {
  if (props.type == '1') {
    showBankCard.value = 1
  } else if (props.type == '2') {
    showBankCard.value = 2
  } else {
    showBankCard.value = 0
  }
  getList()
  getBank()
  getMobile()
})
const getList = () => {
  getBankList().then((res) => {
    listData.value = res.data || []
  })
}
// 获取银行卡列表
const getBank = () => {
  getBankSupport().then((res) => {
    if (res.data) {
      optionsBankList.value = res.data
    }
  })
}

// 检测是否获取到手机号
const getMobile = () => {
  getBankCheckMobile().then((res) => {
    const { data } = res
    if (!data) {
      isIphoneShow.value = true
    }
  })
  getCryptocyCheckMobile().then((res) => {
    const { data } = res
    if (!data) {
      isIphone.value = true
    }
  })
}
// 当前国家
const currentCountry = ref({})
// 手机号
const phoneNumber = ref('')
// 点击图标弹窗
const phoneseletor = ref(null)

const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(currentCountry.value.phoneCode)
})
// 验证码时间
const countdown = ref(0)

// 支持的银行卡列表
const optionsBankList = ref([])
const btnDate = [
  {
    label: i18n.global.t('GeneralUserCenter.BankCard'),
    value: 0
  },
  {
    label: i18n.global.t('GeneralUserCenter.VirtualCurrencyAddress'),
    value: 1
  },
  {
    label: i18n.global.t('GeneralUserCenter.EbPayCurrencyAddress'),
    value: 2
  }
]
function changeFrom(n) {
  showBankCard.value = n
}
function handledGoBack(n) {
  emit('getCurrentPage', n)
}

// 选择银行卡列表选项
const handleSelectChange = (val) => {
  selectedItem.value = val.bankName
  bankInfo.selectedOptions.bankName = val.bankName
  bankInfo.selectedOptions.icon = val.icon
  bankInfo.selectedOptions.bankCode = val.bankCode
}

// 点击显示选择器
function showSelect() {
  phoneseletor.value.handleShowSelect()
}

// 点击号码区号当前值
function getAreaCode(item) {
  currentCountry.value = item
}

// 验证码
const onSendCode = (actionType) => {
  if (isloading.value) return ElMessage(i18n.global.t('Components.Loading'))
  if (!phoneNumber.value) {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.EnterPhoneNumber')
    })
  }
  if (!i18nPhoneReg.value?.test(phoneNumber.value)) {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.formatPhoneNumber')
    })
  }
  initCaptcha(function (validate) {
    isloading.value = false
    sendCode(phoneNumber.value, actionType, currentCountry.value?.phoneCode, validate)
    // 发送验证码
    countdown.value = 60
    const countdownTimer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--
      } else {
        clearInterval(countdownTimer)
      }
    }, 1000)
  })
}
const validateBankCardRule = (rule, value, callback) => {
  const site = import.meta.env.VITE_SITE
  const errorMessage = validateBankCard(value, site, i18n) // i18n为你的国际化实例
  if (errorMessage) {
    callback(new Error(errorMessage))
  } else {
    callback()
  }
}

// 限制输入框只能输入数字
const handleInputDigitsOnly = () => {
  bankInfo.cardNo = bankInfo.cardNo.replace(/\D/g, '')
}

// 限制输入的转换大写
const convertToUpperCase = () => {
  const site = import.meta.env.VITE_SITE
  if (site === 'vietnam') {
    bankInfo.cardholder = bankInfo.cardholder.toUpperCase().replace(/[^A-Z\s]/g, '')
  }
}

// 校验
const rules = reactive({
  cardNo: [
    {
      validator: validateBankCardRule,
      trigger: 'blur'
    }
  ]
})

// 添加银行卡
const onClickAddBank = () => {
  // 是否需要绑定手机号
  if (isIphoneShow.value) {
    if (bankInfo.cardholder && bankInfo.cardNo && phoneNumber.value && bankInfo.code) {
      const params = {
        bankcode: bankInfo.selectedOptions.bankCode,
        bankname: bankInfo.selectedOptions.bankName,
        cardNo: bankInfo.cardNo,
        cardholder: bankInfo.cardholder,
        icon: bankInfo.selectedOptions.icon,
        mobile: phoneNumber.value,
        mobileCode: currentCountry.value.phoneCode.replace(/\+/g, ''),
        smsCode: bankInfo.code,
        accountAddr: bankInfo.accountAddr
      }
      getBindWithPhone(params).then((res) => {
        const { data } = res
        if (data) {
          ElMessage({
            type: 'success',
            message: i18n.global.t('GeneralUserCenter.AddedSuccessfully')
          })
          user.getUserInfoAction()
          emit('getCurrentPage', 2)
        }
      })
    } else {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('GeneralUserCenter.Notice_9')
      })
    }
  } else {
    if (bankInfo.cardholder && bankInfo.cardNo && bankInfo.selectedOptions.bankCode) {
      const params = {
        bankcode: bankInfo.selectedOptions.bankCode,
        bankname: bankInfo.selectedOptions.bankName,
        cardNo: bankInfo.cardNo,
        cardholder: bankInfo.cardholder,
        icon: bankInfo.selectedOptions.icon,
        accountAddr: bankInfo.accountAddr
      }
      getBindBankCard(params).then((res) => {
        const { data } = res
        if (data) {
          ElMessage({
            type: 'success',
            message: i18n.global.t('GeneralUserCenter.AddedSuccessfully')
          })
          user.getUserInfoAction()
          emit('getCurrentPage', 2)
        }
      })
    } else {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('GeneralUserCenter.Notice_9')
      })
    }
  }
}

// 添加虚拟币
const onClickAddVirtual = () => {
  // 是否需要绑定手机号
  if (isIphone.value) {
    if (
      virtualFrom.addr &&
      virtualFrom.alias &&
      radio.value &&
      phoneNumber.value &&
      virtualFrom.code
    ) {
      if (radio.value == 1) {
        virtualFrom.protocol = 'TRC20'
      } else {
        virtualFrom.protocol = 'ERC20'
      }
      const params = {
        addr: virtualFrom.addr,
        alias: virtualFrom.alias,
        currency: virtualFrom.currency,
        protocol: virtualFrom.protocol,
        mobile: phoneNumber.value,
        mobileCode: currentCountry.value.phoneCode.replace(/\+/g, ''),
        smsCode: virtualFrom.code
      }
      getCryptocyBindWithPhone(params).then((res) => {
        const { data } = res
        if (data) {
          ElMessage({
            type: 'success',
            message: i18n.global.t('GeneralUserCenter.AddedSuccessfully')
          })
          user.getUserInfoAction()
          emit('getCurrentPage', 2)
        }
      })
    } else {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('GeneralUserCenter.Notice_9')
      })
    }
  } else {
    if (virtualFrom.addr && virtualFrom.alias && radio.value) {
      if (radio.value == 1) {
        virtualFrom.protocol = 'TRC20'
      } else {
        virtualFrom.protocol = 'ERC20'
      }
      const params = {
        addr: virtualFrom.addr,
        alias: virtualFrom.alias,
        currency: virtualFrom.currency,
        protocol: virtualFrom.protocol
      }
      getCryptocyBindAddr(params).then((res) => {
        const { data } = res
        if (data) {
          ElMessage({
            type: 'success',
            message: i18n.global.t('GeneralUserCenter.AddedSuccessfully')
          })
          user.getUserInfoAction()
          emit('getCurrentPage', 2)
        }
      })
    } else {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('GeneralUserCenter.Notice_9')
      })
    }
  }
}

// 添加EB币
const onClickAddEb = () => {
  // 是否需要绑定手机号
  if (isIphone.value) {
    if (EbPayFrom.addr && EbPayFrom.alias && phoneNumber.value && EbPayFrom.code) {
      const params = {
        addr: EbPayFrom.addr,
        alias: EbPayFrom.alias,
        currency: EbPayFrom.currency,
        protocol: EbPayFrom.protocol,
        mobile: phoneNumber.value,
        mobileCode: currentCountry.value.phoneCode.replace(/\+/g, ''),
        smsCode: EbPayFrom.code
      }
      getCryptocyBindWithPhone(params).then((res) => {
        const { data } = res
        if (data) {
          ElMessage({
            type: 'success',
            message: i18n.global.t('GeneralUserCenter.AddedSuccessfully')
          })
          user.getUserInfoAction()
          emit('getCurrentPage', 2)
        }
      })
    } else {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('GeneralUserCenter.Notice_9')
      })
    }
  } else {
    if (EbPayFrom.addr && EbPayFrom.alias) {
      const params = {
        addr: EbPayFrom.addr,
        alias: EbPayFrom.alias,
        currency: EbPayFrom.currency,
        protocol: EbPayFrom.protocol
      }
      getCryptocyBindAddr(params).then((res) => {
        const { data } = res
        if (data) {
          ElMessage({
            type: 'success',
            message: i18n.global.t('GeneralUserCenter.AddedSuccessfully')
          })
          user.getUserInfoAction()
          emit('getCurrentPage', 2)
        }
      })
    } else {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('GeneralUserCenter.Notice_9')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.return {
  margin-bottom: 30px;
  border-bottom: 1px solid var(--20, rgba(255, 255, 255, 0.2));
  padding-bottom: 20px;
  .return-width {
    display: flex;
    cursor: pointer;
    width: 200px;
    padding-top: 30px;
    div:nth-child(2) {
      color: var(--100, #fff);

      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      margin-left: 10px;
    }
  }
}
.bank-card {
  display: flex;
  div {
    min-width: 104px;
    height: 40px;
    color: #fff;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    margin-right: 30px;
    cursor: pointer;
    padding: 0 8px;
    margin-bottom: 30px;
    border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
  }
  .active {
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    border: none;
  }
}
.bank-card-form-img {
  width: 25px;
  height: 25px;
}
.bank-card-form-option {
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
  }
  .title {
    margin-left: 15px;
  }
}
.captcha {
  width: 100px;
  text-align: right;
  border-left: 1px solid var(--20, rgba(255, 255, 255, 0.2));
  line-height: 25px;
  color: var(--unnamed, #f35f1b);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
}
.add-to {
  margin-top: 20px;
  text-align: center;
  width: 104px;
  height: 40px;
  color: #fff;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  border-radius: 4px;
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  cursor: pointer;
}
.scan_it {
  text-align: right;
  width: 40px;
  border-left: 1px solid var(--20, rgba(255, 255, 255, 0.2));
  line-height: 14px;
  cursor: pointer;
}

.phone-box {
  .phone-count {
    display: flex;
    align-items: center;
    color: var(--100, #fff);

    font-size: 14px;
    .phone-count-right {
      position: relative;
      display: flex;
      align-items: center;
      margin-left: 74px;
      width: 540px;
      height: 40px;
      border-radius: 6px;
      border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      background: #272b45;
      .country-icon {
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          margin: 0 6px 0 10px;
          border-radius: 50%;
        }
      }
      .phoneSelector {
        position: absolute;
        bottom: 0;
      }
    }
    .line {
      width: 1px;
      height: 21px;
      flex-shrink: 0;
      background: var(--20, rgba(255, 255, 255, 0.2));
      margin: 0 10px;
    }
    .phone-input {
      color: var(--100, #fff);
      font-size: 14px;
    }
    .phone-code-right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 88px;
      width: 540px;
      height: 40px;
      border-radius: 6px;
      border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      background: #272b45;
      .phone-input {
        margin-left: 10px;
        margin-right: 30px;
      }
      .code-right {
        display: flex;
        align-items: center;
        margin-right: 15px;
        .line {
          width: 1px;
          height: 21px;
          flex-shrink: 0;
          background: var(--20, rgba(255, 255, 255, 0.2));
          margin: 0 10px;
        }
        .code {
          color: var(--unnamed, #f35f1b);

          font-size: 14px;
          width: 80px;
          text-align: center;
        }
      }
    }
  }
  .iphone-text {
    margin-left: 170px;
    margin-top: 5px;
    color: var(--60, rgba(255, 255, 255, 0.6));

    font-size: 12px;
    font-style: normal;
  }
  .phone-count:last-child {
    margin-top: 24px;
  }
}

:deep() {
  .add-footer {
    .el-dialog {
      background: var(--unnamed, #323c6f) !important;
      border-radius: 8px;
      width: 350px;
    }
    .el-dialog__header {
      padding: 12px 20px 12px 20px;
      margin-right: 0 !important;
      // padding-bottom: 20px;
      border-radius: 8px 8px 0 0;
      background: var(--unnamed, #323c6f) !important;
      display: block;
    }
    .el-dialog__title {
      color: var(--100, #fff);

      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 100% */
      opacity: 0.8;
    }
    .el-dialog__headerbtn .el-dialog__close {
      font-size: 26px;
      color: #fff;
      top: -14px;
      svg {
        height: 20px;
        width: 20px;
      }
    }
    .el-dialog__body {
      background: #232949;
      border-radius: 0 0 8px 8px;
    }
  }
  .my-header {
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
    .el-icon {
      cursor: pointer;
      margin-right: 30px;
    }
  }
}
:deep() {
  // 获取验证码
  .el-input-group__append {
    box-shadow: none;
    background-color: #272b45;
  }
  // 输入框颜色改变
  .el-input__wrapper {
    background-color: #272b45;
    box-shadow: none;
  }

  .virtual-currency-form .el-input__wrapper {
    background-color: #272b45;
    box-shadow: none;
  }
  .virtual-currency-form .el-input__inner {
    background-color: #272b45;
  }
  // 输入框内容颜色修改
  .el-input__inner {
    color: var(--100, #fff);

    font-size: 14px;
    font-style: normal;
    caret-color: var(--100, #fff);
  }
  .el-form-item__content {
    flex-wrap: none;
  }
  // 单选框按钮颜色
  .el-radio__input.is-checked .el-radio__inner {
    border-color: var(--unnamed, #f35f1b);
    background: var(--unnamed, #f35f1b);
  }
  .el-radio {
    color: var(--100, #fff);

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    letter-spacing: -0.01px;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: var(--100, #fff);
  }
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep input[type='number'] {
  -moz-appearance: textfield !important;
}
</style>
<style>
.el-select__popper.el-popper {
  /* 下拉框颜色样式修改 */
  background: var(--unnamed, #1d223c);
  border: 1px solid #1d223c;
}
.el-select-dropdown__item:hover {
  background: #171a2f;
}
.el-select-dropdown__item.selected {
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
}
.el-select {
  --el-select-border-color-hover: none;
  --el-select-input-focus-border-color: none;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  /* 鼠标移出颜色改变 */
  background-color: #171a2f;
}
.el-form-item__label {
  /* item颜色 */
  color: var(--100, #fff);
  text-align: right;

  font-size: 14px;
}
</style>
