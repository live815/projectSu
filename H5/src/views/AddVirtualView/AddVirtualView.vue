<template>
  <div class="addVirtual">
    <NavBar :title="$t('AddPage.BindVirtualCurrency')" />
    <HeadlineTitle style="margin-top: 0" :leftTitle="$t('AddPage.OtherName')"></HeadlineTitle>
    <van-cell-group inset>
      <van-field
        class="border-cell"
        v-model="virtualFrom.alias"
        :placeholder="$t('AddPage.AddPageTip5')"
      />
    </van-cell-group>
    <HeadlineTitle :leftTitle="$t('AddPage.VirtualCurrencyAccount')"></HeadlineTitle>
    <van-cell-group inset>
      <van-field
        class="border-cell"
        v-model="virtualFrom.addr"
        right-icon="enlarge"
        :placeholder="$t('AddPage.AddPageTip6')"
      />
    </van-cell-group>
    <HeadlineTitle :leftTitle="$t('AddPage.VirtualCurrencyType')"></HeadlineTitle>
    <VirtualList
      :virtualList="virtualKind"
      :virtualListTab="virtualKindNum"
      @onClickChildTab="virtualKindTab"
    ></VirtualList>
    <HeadlineTitle :leftTitle="$t('AddPage.VirtualCurrencyProtocol')"></HeadlineTitle>
    <VirtualList
      :virtualList="virtualAgreement"
      :virtualListTab="virtualAgreementNum"
      @onClickChildTab="virtualAgreementTab"
    ></VirtualList>
    <!-- 手机号区域 -->
    <div class="bankInfo-iphone" v-if="isIphoneShow">
      <div class="phone-wrapper">
        <div class="country-wrapper">
          <Country v-model="country" />
        </div>
        <CustomInputBorder
          :maxLength="getPhoneInputLength(country.countryCode)"
          :placeholder="$t('AddPage.EnterphoneNumber')"
          v-model="virtualFrom.phone"
          isPhone
          class="bankInfo-iphone-num"
        />
      </div>

      <div class="code-wrapper">
        <CustomInputBorder
          :maxlength="6"
          :placeholder="$t('AddPage.EnterVerificationCode')"
          v-model="virtualFrom.code"
        />
        <SendCode @sendCode="onSendCode" v-model="availableSendCode" />
      </div>
    </div>
    <div class="addBankcard-iphone-text" v-if="isIphoneShow">
      {{ $t('AddPage.AddPageTip7') }}
    </div>

    <div class="addVirtual-footer-btn">
      <DedicatedButton :color="color" @click="onClickAdd">{{
        $t('AddPage.Addto')
      }}</DedicatedButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar/NavBar'
import HeadlineTitle from '@/components/HeadlineTitle/HeadlineTitle'
import VirtualList from './components/VirtualList/VirtualList'
import {
  getCryptocyBindAddr,
  getCryptocyCheckMobile,
  getCryptocyBindWithPhone
} from '@/api/bindInfo'
import { showLoadingToast, closeToast, showToast } from 'vant'
import { useSendCode } from '@/hooks/useSendCode'
import { getRegByPhoneCode } from '@/utils/regCountry'
const { availableSendCode, sendCode, getPhoneInputLength } = useSendCode()
import { useCaptcha } from '@/hooks/useCaptcha'
const { initCaptcha, isloading } = useCaptcha()
import i18n from '@/i18n'
import { useUserStore } from '@/stores/user'
const user = useUserStore()

const country = ref({})
const router = useRouter()
const color = ref('')
const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(country.value?.phoneCode)
})
onMounted(() => {
  getMobile()
})

// 手机号页面是否显示
const isIphoneShow = ref(true)

// 检测是否获取到手机号
const getMobile = () => {
  getCryptocyCheckMobile().then((res) => {
    const { data } = res
    if (data) {
      isIphoneShow.value = false
    }
  })
}

// 获取验证码
const onSendCode = () => {
  if (isloading.value) return
  if (!virtualFrom.phone) {
    return showToast(i18n.global.t('Rletter.enternumber'))
  }
  if (!i18nPhoneReg.value?.test(virtualFrom.phone)) {
    return showToast(i18n.global.t('Lletter.Llettertip13'))
  }
  // 三方图形验证
  initCaptcha(function (validate) {
    isloading.value = false
    sendCode(virtualFrom.phone, 6, country.value.phoneCode, validate, user.userInfo.userName)
  })
}

// 添加表单
const virtualFrom = reactive({
  alias: '', // 别名
  addr: '', // 加密货币地址
  currency: 'USDT', // 加密货币种类
  protocol: '', // 协议
  phone: '', // 手机号
  code: '', // 验证码
  mobileCode: '' // 区号
})

// 种类的高亮
const virtualKindNum = ref(0)

//种类数组
const virtualKind = reactive([
  {
    id: 1,
    name: 'USDT',
    icon: new URL('./img/recharge4.png', import.meta.url).href
  }
])

// 种类
const virtualKindTab = (item, index) => {
  virtualKindTab.value = index
}
// 协议的高亮
const virtualAgreementNum = ref(0)

// 协议数组
const virtualAgreement = reactive([
  {
    id: 1,
    name: 'TRC20'
  }
  // {
  //   id: 2,
  //   name: 'ERC20'
  // }
])
virtualFrom.protocol = virtualAgreement[0].name

//协议
const virtualAgreementTab = (item, index) => {
  virtualAgreementNum.value = index
  virtualFrom.protocol = item.name
}

// 添加按钮
const onClickAdd = () => {
  // 是否需要绑定手机号
  if (isIphoneShow.value) {
    if (
      virtualFrom.addr &&
      virtualFrom.alias &&
      virtualFrom.currency &&
      virtualFrom.protocol &&
      virtualFrom.phone &&
      virtualFrom.code
    ) {
      const params = {
        addr: virtualFrom.addr,
        alias: virtualFrom.alias,
        currency: virtualFrom.currency,
        mobile: virtualFrom.phone,
        mobileCode: country.value.phoneCode.replace(/\+/, ''),
        protocol: virtualFrom.protocol,
        smsCode: virtualFrom.code
      }
      showLoadingToast({
        message: i18n.global.t('common.loading'),
        forbidClick: true,
        duration: 0
      })
      getCryptocyBindWithPhone(params)
        .then((res) => {
          const { data } = res
          if (data) {
            router.back()
          }
          closeToast()
        })
        .catch(() => {
          closeToast()
        })
    } else {
      closeToast()
      showToast(i18n.global.t('AddPage.FillCorrectInformat'))
    }
  } else {
    if (virtualFrom.addr && virtualFrom.alias) {
      const params = {
        addr: virtualFrom.addr,
        alias: virtualFrom.alias,
        currency: virtualFrom.currency,
        protocol: virtualFrom.protocol
      }
      showLoadingToast({
        message: i18n.global.t('common.loading'),
        forbidClick: true,
        duration: 0
      })
      getCryptocyBindAddr(params)
        .then((res) => {
          const { data } = res
          if (data) {
            router.push('/bankcard')
          }
          closeToast()
        })
        .catch(() => {
          closeToast()
        })
    } else {
      closeToast()
      showToast(i18n.global.t('AddPage.FillCorrectInformat'))
    }
  }
}

watchEffect(() => {
  // 是否需要绑定手机号
  if (isIphoneShow.value) {
    if (
      virtualFrom.phone &&
      virtualFrom.code &&
      virtualFrom.protocol &&
      virtualFrom.addr &&
      virtualFrom.alias &&
      virtualFrom.currency
    ) {
      color.value = 'primary'
    } else {
      color.value = ''
    }
  } else {
    if (virtualFrom.addr && virtualFrom.alias && virtualFrom.currency && virtualFrom.protocol) {
      color.value = 'primary'
    } else {
      color.value = ''
    }
  }
})
</script>
<style lang="scss" scoped>
.addVirtual {
  position: relative;
  padding: 15px;
  background: #fff;
  .border-cell {
    border-radius: 8px;
    border: 1px solid #eee;
    background: rgba(255, 255, 255, 0);

    font-size: 15px;
  }
  :deep().van-cell-group--inset {
    margin: 0;
  }
  .bankInfo-iphone {
    margin-top: 20px;
    border-radius: 8px;
    border: 1px solid #eee;
    background: rgba(255, 255, 255, 0);
    .phone-wrapper {
      position: relative;
      .country-wrapper {
        position: absolute;
        z-index: 10;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 78px;
      }
      .bankInfo-iphone-num {
        margin: 0;
      }
      :deep().input-group-item .label {
        margin-bottom: 0;
      }

      :deep().input-group-item .input-wrapper input {
        border: none;
        border-bottom: 1px solid #eee;
        border-radius: 0;
      }
    }
    .code-wrapper {
      position: relative;
      .send-code {
        position: absolute;
        right: 20px;
        bottom: 18px;
      }
      :deep().input-group-item .label {
        margin-bottom: 0;
      }
      :deep().input-group-item {
        margin-bottom: 0;
      }
      :deep().input-group-item .input-wrapper input {
        border: none;
      }
    }
  }
  .addBankcard-iphone-text {
    margin-top: 8px;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    color: #999;
  }
  .addVirtual-footer-btn {
    margin-top: 10px;
    // position: absolute;
    // bottom: 50px;
    // left: 50%;
    // transform: translate(-50%);
    // width: 345px;
  }
}
:deep().van-hairline--top-bottom::after {
  border-width: 0; /* 取消::after伪元素的border-width */
}
</style>
