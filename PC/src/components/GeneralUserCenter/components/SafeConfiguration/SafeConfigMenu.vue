<template>
  <div>
    <div class="safe-config-container">
      <div class="safe-config">
        <div class="safe-config-icon">
          <img src="./img/phone_binding.png" />
        </div>
        <div class="safe-config-text">
          <div class="big-text">{{ $t('GeneralUserCenter.BindMobilePhoneNumber') }}</div>
          <div class="small-text">
            {{
              user.userInfo.mobile
                ? maskPhoneNumber(user.userInfo.mobile)
                : $t('GeneralUserCenter.BindingTips_1')
            }}
          </div>
        </div>
        <div v-if="user.userInfo.mobile" class="safe-config-btn">
          {{ $t('GeneralUserCenter.Bound') }}
        </div>
        <div v-else class="safe-config-btn color" @click.stop="showLog(1)">
          {{ $t('GeneralUserCenter.GoToBinding') }}
        </div>
      </div>
      <div class="safe-config">
        <div class="safe-config-icon">
          <img src="./img/email_binding.png" />
        </div>
        <div class="safe-config-text">
          <div class="big-text">{{ $t('GeneralUserCenter.BindEmail') }}</div>
          <div class="small-text">
            {{ user.userInfo.email ? user.userInfo.email : $t('GeneralUserCenter.BindingTips_2') }}
          </div>
        </div>
        <div v-if="user.userInfo.email" class="safe-config-btn">
          {{ $t('GeneralUserCenter.Bound') }}
        </div>
        <div v-else class="safe-config-btn color" @click.stop="showLog(2)">
          {{ $t('GeneralUserCenter.GoToBinding') }}
        </div>
      </div>
      <!-- 绑定银行卡 -->
      <div class="safe-config">
        <div class="safe-config-icon">
          <img src="./img/bank_card.png" />
        </div>
        <div class="safe-config-text">
          <div class="big-text">
            {{ $t('GeneralUserCenter.BindBankCard') }}/{{
              $t('GeneralUserCenter.WithdrawalAddress')
            }}
          </div>
          <div class="small-text">{{ $t('GeneralUserCenter.BindingTips_3') }}</div>
        </div>
        <template v-if="props.isPersonal">
          <div
            v-if="!user.userInfo.bankCardCount"
            class="safe-config-btn color"
            @click="onClickGoRouter"
          >
            {{ $t('GeneralUserCenter.GoToBinding') }}
          </div>
          <div v-else class="safe-config-btn non-color" @click="onClickGoRouter">
            {{ cardNumber }}{{ $t('GeneralUserCenter.Piece') }}
          </div>
        </template>
        <template v-else>
          <div
            v-if="!user.userInfo.bankCardCount"
            class="safe-config-btn color"
            @click.stop="handleGetCurrentPages(2)"
          >
            {{ $t('GeneralUserCenter.GoToBinding') }}
          </div>
          <div v-else class="safe-config-btn non-color" @click.stop="handleGetCurrentPages(2)">
            {{ cardNumber }}{{ $t('GeneralUserCenter.Piece') }}
          </div>
        </template>
      </div>
      <!-- 修改登录密码 -->
      <div class="safe-config">
        <div class="safe-config-icon">
          <img src="./img/reset_pw.png" />
        </div>
        <div class="safe-config-text">
          <div class="big-text">{{ $t('GeneralUserCenter.ChangeLoginPassword') }}</div>
          <div class="small-text">{{ $t('GeneralUserCenter.Notice_1') }}</div>
        </div>
        <div class="safe-config-btn non-color" @click.stop="showLog(3)">
          {{ $t('GeneralUserCenter.Revise') }}
        </div>
      </div>
      <!-- 我的收货地址 -->
      <div class="safe-config">
        <div class="safe-config-icon">
          <img src="./img/adress.png" />
        </div>
        <div class="safe-config-text">
          <div class="big-text">{{ $t('GeneralUserCenter.MyShippingAddress') }}</div>
          <div class="small-text">{{ $t('GeneralUserCenter.Notice_2') }}</div>
        </div>
        <div class="safe-config-btn non-color" @click.stop="showLog(4)">
          {{ $t('GeneralUserCenter.Add') }}
        </div>
      </div>
      <!-- 识别码 -->
      <div class="safe-config">
        <div class="safe-config-icon">
          <img src="./img/identification.png" />
        </div>
        <div class="safe-config-text">
          <div class="big-text">{{ $t('GeneralUserCenter.identityCode') }}</div>
          <div class="small-text">
            {{ user.userInfo.identityCode }}
          </div>
        </div>
        <div class="safe-config-btn color" @click.stop="onClickRefresh">
          {{ $t('GeneralUserCenter.refresh') }}
        </div>
      </div>
    </div>
    <!-- 绑定手机号 -->
    <CustomizeDialog
      :dialogShow="logCode == 1"
      :width="490"
      :title="$t('GeneralUserCenter.BindMobilePhoneNumber')"
      v-if="logCode == 1"
      @closeBtn="closeBtn"
      :alignCenter="true"
    >
      <div class="margin-left">
        <el-form label-width="80px" labelPosition="left">
          <div class="Kind-tips">{{ $t('GeneralUserCenter.Notice_3') }}</div>
          <div class="phone-box">
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
                  :maxlength="getPhoneInputLength(currentCountry.countryCode)"
                />
                <div class="phoneSelector">
                  <PhoneSelector ref="phoneseletor" @getAreaCode="getAreaCode"></PhoneSelector>
                </div>
              </div>
            </div>
            <div class="phone-count">
              <div class="phone-count-left">{{ $t('GeneralUserCenter.VerificationCode') }}:</div>
              <div class="phone-code-right">
                <input
                  class="phone-input"
                  type="text"
                  :placeholder="$t('GeneralUserCenter.EnterVerificationCode')"
                  v-model="verificationCode"
                />
                <div class="line"></div>
                <div class="code" v-if="countdown > 0">
                  {{ $t('GeneralUserCenter.AfterSeconds', { countdown }) }}
                </div>
                <div class="code" @click="onSendCode" v-else>
                  {{ $t('GeneralUserCenter.GetVerificationCode') }}
                </div>
              </div>
            </div>
          </div>
          <el-form-item>
            <div class="add-to" :class="{ 'add-to-btn': isIphone }" @click="onFromIphone">
              {{ $t('GeneralUserCenter.Submit') }}
            </div>
          </el-form-item>
        </el-form>
      </div>
    </CustomizeDialog>
    <!-- 绑定邮箱弹窗 -->
    <CustomizeDialog
      :dialogShow="logCode == 2"
      :width="490"
      :title="$t('GeneralUserCenter.BindEmail')"
      v-if="logCode == 2"
      @closeBtn="closeBtn"
      :alignCenter="true"
    >
      <el-form label-width="100px" :model="emailInfo" :rules="rules" labelPosition="left">
        <el-form-item :label="$t('GeneralUserCenter.Email')" prop="email">
          <el-input
            v-model.trim="emailInfo.email"
            :placeholder="$t('GeneralUserCenter.EnterYourEmail')"
            style="
              width: 330px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('GeneralUserCenter.EmailVerificationCode')">
          <el-input
            v-model="emailInfo.emailCode"
            :placeholder="$t('GeneralUserCenter.EnterVerificationCode')"
            style="
              width: 330px;
              border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
              border-radius: 6px;
            "
          >
            <template #append
              ><span class="captcha" v-if="countMailDown > 0">
                {{ $t('GeneralUserCenter.EmailAfterSeconds', { countMailDown }) }}</span
              >
              <span class="captcha" @click="startMailCode" v-else>
                {{ $t('GeneralUserCenter.GetVerificationCode') }}</span
              >
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="add-to" :class="{ 'add-to-btn': isEmail }" @click="onClickAddEmail">
            {{ $t('GeneralUserCenter.Submit') }}
          </div>
        </el-form-item>
      </el-form>
    </CustomizeDialog>
    <!-- 修改登录密码弹窗 -->
    <CustomizeDialog
      :dialogShow="logCode == 3"
      :width="490"
      :title="$t('GeneralUserCenter.ChangePassword')"
      v-if="logCode == 3"
      @closeBtn="closeBtn"
      :alignCenter="true"
    >
      <div class="change-password">
        <el-form
          label-min-width="90px"
          :model="passwordInfo"
          :rules="rules"
          class="stylelabel"
          labelPosition="top"
        >
      
          <template v-if="user.userInfo.passwordFlag">
           
            <el-form-item :label="$t('GeneralUserCenter.EnterOldPassword')" prop="oldPassword">
             
              <el-input
                v-model.trim="passwordInfo.oldPassword"
                :placeholder="$t('GeneralUserCenter.placeholder_1')"
                :type="isShowPassword.passwordOne ? 'text' : 'password'"
                :minlength="8"
                :maxlength="20"
                style="
                  width: 380px;
                  border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
                  border-radius: 6px;
                "
              >
                <template #suffix>
                  <div>
                    <ShowPassWord
                      :isShow="isShowPassword.passwordOne"
                      @click="handleShowpassWord('passwordOne')"
                    ></ShowPassWord>
                  </div>
                </template>
              </el-input>
             
            </el-form-item>
          </template>
          <el-form-item
            class="stylelabel"
            :label="$t('GeneralUserCenter.EnterNewPassword')"
            prop="newPassword"
          >
            <el-input
              v-model.trim="passwordInfo.newPassword"
              :placeholder="$t('GeneralUserCenter.placeholder_2')"
              :type="isShowPassword.passwordTwo ? 'text' : 'password'"
              :minlength="8"
              :maxlength="20"
              style="
                width: 380px;
                border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
                border-radius: 6px;
              "
            >
              <template #suffix>
                <div>
                  <ShowPassWord
                    :isShow="isShowPassword.passwordTwo"
                    @click="handleShowpassWord('passwordTwo')"
                  ></ShowPassWord>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="add-to" :class="{ 'add-to-btn': isPwd }" @click="onClickAdd">
              {{ $t('GeneralUserCenter.Sure') }}
            </div>
          </el-form-item>
      
        </el-form>
      </div>
    </CustomizeDialog>
    <!-- 收货地址 -->
    <CustomizeDialog
      :dialogShow="logCode == 4"
      :width="490"
      :title="$t('GeneralUserCenter.MyShippingAddress')"
      v-if="logCode == 4"
      @closeBtn="closeBtn"
      :alignCenter="true"
    >
      <MyAddress v-if="logCode == 4" />
    </CustomizeDialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, onBeforeUnmount, reactive } from 'vue'
import { getImg, maskPhoneNumber } from '@/utils'
import { ElMessage } from 'element-plus'
import ShowPassWord from '@/components/icons/ShowPassWord.vue'
import MyAddress from '../ShippingPage/MyAddress.vue'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import PhoneSelector from '@/components/PhoneSelector/index.vue'
import { getBindMobile, getBindEmail, getUpdatePassword } from '@/api/bindInfo'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSendCode } from '@/hooks/useSendCode'
import { useCaptcha } from '@/hooks/useCaptcha'
const { sendCode, sendEmailCode, getPhoneInputLength } = useSendCode()
const { initCaptcha, isloading } = useCaptcha()
import { getRegByPhoneCode } from '@/utils/regCountry'
import Reg from '@/utils/reg'
import { getUserRefreshIdentityCode } from '@/api/user.js'

const user = useUserStore()
const router = useRouter()
const props = defineProps({
  isPersonal: {
    type: Boolean,
    default: false
  }
})
//定时器
let fetchPriceTimer = null
// 初始化请求
const loading = ref(false)

const emit = defineEmits(['getCurrentPage'])
const logCode = ref(0)
const isShowPassword = ref({
  passwordOne: false,
  passwordTwo: false
})
const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(currentCountry.value.phoneCode)
})
// 手机号
const phoneNumber = ref('')
const phoneseletor = ref(null)
// 图形验证
// 当前国家
const currentCountry = ref({})

// 邮箱信息
const emailInfo = reactive({
  email: '',
  emailCode: ''
})
onMounted(() => {
  startInterval()
})
// 邮箱校验
const isValidedEmail = computed(() => {
  return Reg.emailReg.test(emailInfo.email)
})

// 邮箱输入保存按钮高亮
const isEmail = computed(() => {
  if (emailInfo.email && emailInfo.emailCode) {
    return true
  } else {
    return false
  }
})

// 邮箱验证码
const countMailDown = ref(0)

// 发送邮箱验证码
const startMailCode = () => {
  if (!emailInfo.email) {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.EnterYourEmail')
    })
  }
  if (!Reg.emailReg.test(emailInfo.email)) {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.ValidMailbox')
    })
  }
  sendEmailCode(emailInfo.email, 1, user.userInfo.userName)
  // 发送验证码
  countMailDown.value = 60
  const countdownTimer = setInterval(() => {
    if (countMailDown.value > 0) {
      countMailDown.value--
    } else {
      clearInterval(countdownTimer)
    }
  }, 1000)
}

// 绑定邮箱
const onClickAddEmail = () => {
  if (isValidedEmail.value) {
    if (!emailInfo.emailCode) {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('GeneralUserCenter.EnterVerificationCode')
      })
      return
    }
    const params = {
      email: emailInfo.email,
      emailCode: emailInfo.emailCode
    }
    getBindEmail(params).then((res) => {
      if (res.data) {
        ElMessage({
          type: 'success',
          message: i18n.global.t('GeneralUserCenter.BindingSuccessful')
        })
        user.getUserInfoAction()
        closeBtn()
      }
    })
  } else {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.Notice_4')
    })
  }
}

function showLog(n) {
  logCode.value = n
}
function closeBtn() {
  logCode.value = 0
}
function handleGetCurrentPages(n) {
  emit('getCurrentPage', n)
}

const passwordInfo = reactive({
  oldPassword: '', // 第一个密码
  newPassword: '' // 第二个密码
})
function handleShowpassWord(n) {
  isShowPassword.value[n] = !isShowPassword.value[n]
}
// 密码匹配
const isValided = computed(() => {
  if (user.userInfo.passwordFlag) {
    return (
      Reg.passwordReg.test(passwordInfo.oldPassword) &&
      Reg.passwordReg.test(passwordInfo.newPassword)
    )
  } else {
    return Reg.passwordReg.test(passwordInfo.newPassword)
  }
})
// 密码输入保存按钮高亮
const isPwd = computed(() => {
  if (user.userInfo.passwordFlag) {
    if (passwordInfo.oldPassword && passwordInfo.newPassword) {
      return true
    } else {
      return false
    }
  } else {
    if (passwordInfo.newPassword) {
      return true
    }
    return false
  }
})

// 密码校验
const rules = reactive({
  oldPassword: [
    { validator: validatePassword, trigger: 'blur' },
    { required: true, message: i18n.global.t('GeneralUserCenter.EnterPassword'), trigger: 'blur' }
  ],
  newPassword: [
    { validator: validatePassword, trigger: 'blur' },
    { required: true, message: i18n.global.t('GeneralUserCenter.EnterPassword'), trigger: 'blur' }
  ],
  email: [
    { validator: validateEmail, trigger: 'blur' },
    { required: true, message: i18n.global.t('GeneralUserCenter.EnterYourEmail'), trigger: 'blur' }
  ]
})

function validateEmail(rule, value, callback) {
  if (!Reg.emailReg.test(value)) {
    callback(new Error(i18n.global.t('GeneralUserCenter.ValidMailbox')))
  } else {
    callback()
  }
}

function validatePassword(rule, value, callback) {
  if (!Reg.passwordReg.test(value)) {
    callback(new Error(i18n.global.t('GeneralUserCenter.PasswordTips_2')))
  } else {
    callback()
  }
}

// 密码保存按钮
const onClickAdd = () => {
  if (isValided.value) {
    const params = {
      oldPassword: passwordInfo.oldPassword,
      newPassword: passwordInfo.newPassword
    }
    isloading.value = true
    getUpdatePassword(params).then((res) => {
      if (res.data) {
        ElMessage.success(i18n.global.t('GeneralUserCenter.Notice_5'))
        isloading.value = false
        user.logOutAction(true)
      }
    })
  } else {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.PasswordTips_4')
    })
  }
}

// 点击当前值
function getAreaCode(item) {
  currentCountry.value = item
}

// 点击显示选择器
function showSelect() {
  phoneseletor.value.handleShowSelect()
}

// 手机号验证码
const verificationCode = ref('')
const countdown = ref(0)

// 验证码
const onSendCode = () => {
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
  initCaptcha(async function (validate) {
    isloading.value = false
    sendCode(phoneNumber.value, 4, currentCountry.value?.phoneCode, validate)
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

// 输入手机号高亮
const isIphone = computed(() => {
  if (phoneNumber.value && verificationCode.value) {
    return true
  } else {
    return false
  }
})

// 提交手机号
const onFromIphone = () => {
  if (!phoneNumber.value || !verificationCode.value) {
    ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.Notice_6')
    })
    return
  }
  const params = {
    mobile: phoneNumber.value,
    mobileCode: currentCountry.value.phoneCode.replace(/\+/, ''),
    smsCode: verificationCode.value
  }
  getBindMobile(params).then((res) => {
    if (res.data) {
      ElMessage({
        type: 'success',
        message: i18n.global.t('GeneralUserCenter.BindingSuccessful')
      })
      user.getUserInfoAction()
      closeBtn()
    }
  })
}

const onClickGoRouter = () => {
  router.push({
    path: `/personal/${6}`
    // query: { number: 2 }
  })
}

// 银行卡虚拟币卡总数
const cardNumber = computed(() => {
  return user.userInfo?.bankCardCount + user.userInfo?.cryptoCount
})

// 刷新识别码
const onClickRefresh = () => {
  loading.value = true
  getUserRefreshIdentityCode()
    .then(() => {
      user.getUserInfoAction()
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
// 每十分钟请求一次识别码
function startInterval(){
  fetchPriceTimer = setInterval(()=>{
    getUserRefreshIdentityCode()
    .then(() => {
      user.getUserInfoAction()
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
  },600000)
}
// 清理定时器
onBeforeUnmount(()=>{
  clearTimeout(fetchPriceTimer)
})
</script>

<style lang="scss" scoped>
.big-text {
  color: var(--100, #fff);

  font-size: 16px;
  line-height: 28px;
}
.small-text {
  color: var(--60, rgba(255, 255, 255, 0.6));

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
}
.safe-config-container {
  margin-top: 6px;
  .safe-config {
    display: flex;
    height: 106px;
    padding-top: 25px;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
    .safe-config-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 54px;
      height: 54px;
      border-radius: 12px;
      background: var(--unnamed, #1d223c);
      img {
        width: 54px;
        height: 54px;
      }
    }
    .safe-config-text {
      margin-left: 24px;
    }
    .safe-config-btn {
      margin-left: auto;
      display: flex;
      width: 104px;
      height: 40px;
      padding: 5px 16px;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
    }
    .color {
      background: var(--unnamed, #ff9000);
      color: #fff;
      text-align: center;

      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.01px;
    }
    .non-color {
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--60, rgba(255, 255, 255, 0.6));
      text-align: center;

      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: -0.01px;
    }
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
  border: 1px solid #ccc;
  cursor: pointer;
  margin-left: 100px;
}
.add-to-btn {
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  border: none;
}
.Kind-tips {
  color: var(--60, rgba(255, 255, 255, 0.6));
  text-align: left;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px;
}
.margin-left {
  margin-left: 20px;
}
.change-password {
  margin-left: 10px;
  .stylelabel {
    white-space: nowrap;
    margin-right: 10px;
  }
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
      margin-left: 10px;
      width: 330px;
      height: 40px;
      border-radius: 6px;
      border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      background: #232848;
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
      margin-left: 35px;
      width: 330px;
      height: 40px;
      border-radius: 6px;
      border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      background: #232848;
      .phone-input {
        margin-left: 10px;
        margin-right: 30px;
      }
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
    background-color: #232848;
  }
  // 输入框颜色改变
  .el-input__wrapper {
    background-color: #232848;
    box-shadow: none;
    border: none;
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
  .el-form-item {
    margin-bottom: 25px;
  }
}
</style>
