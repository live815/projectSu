<template>
  <div class="addressChild-content">
    <NavBar :title="objItem.id ? $t('AddPage.EditShipAddress') : $t('AddPage.AddShipAddress')" />
    <div class="mid-box">
      <div class="form-box">
        <van-form>
          <van-cell-group inset>
            <van-field
              class="address-right-label"
              :label="$t('AddPage.Receiver')"
              :placeholder="$t('AddPage.EnterConsignerName')"
              :border="false"
              v-model="submitData.relName"
            />
            <div class="phone-box">
              <div class="phone-label">{{ $t('AddPage.PhoneNumber') }}</div>
              <div class="phone-menu">
                <van-dropdown-menu class="phone-selection" :overlay="false">
                  <van-dropdown-item v-model="submitData.phoneCode" :options="optionCode" />
                </van-dropdown-menu>
              </div>
              <div class="phone-input">
                <van-field
                  class="van-input address-right-label"
                  type="tel"
                  :placeholder="$t('AddPage.EnterphoneNumber')"
                  :maxlength="getPhoneInputLength(submitData.countryCode)"
                  v-model="submitData.phoneNumber"
                />
              </div>
            </div>
            <!-- <div class="country-box">
              <div class="country-lable">{{ $t('AddPage.ChooseCountry') }}</div>
              <div class="country-right" @click="toggleSelectMenu">
                <template v-if="submitData.phoneCode">
                  <div class="country-right-text">
                    <img class="country-right-img" :src="getImg(submitData.icon)" />
                    <div>{{ submitData.countryCn }}</div>
                  </div>
                </template>
                <div v-else class="country-right-title">
                  {{ $t('AddPage.PleaseChooseCountry') }}
                </div>
                <img class="triangle" :src="subscriptIcon" />
              </div>
            </div> -->

            <van-field
              class="address-right-label"
              :label="$t('AddPage.PostalCode')"
              :placeholder="$t('AddPage.EnterPostalCode')"
              :maxlength="12"
              :minlength="2"
              :border="false"
              v-model="submitData.postalCode"
              @input="handleInput"
            />
            <div class="address-box">
              <div class="address-right">
                <van-field
                  class="address-right-label"
                  v-model="submitData.address"
                  rows="1"
                  autosize
                  :label="$t('AddPage.Address')"
                  type="textarea"
                  :placeholder="$t('AddPage.EnterAddress')"
                />
              </div>
            </div>
            <div class="country-option" v-show="isCountry">
              <div
                class="country-option-item"
                v-for="item in countryList"
                :key="item.id"
                @click="onClickCountry(item)"
              >
                <div class="country-option-items">
                  <div class="country-option-item-left">
                    <img class="img" :src="getImg(item.icon)" />
                    <div>{{ item.countryCn }}</div>
                  </div>
                  <div class="country-option-item-right">{{ item.phoneCode }}</div>
                </div>
                <div class="line"></div>
              </div>
            </div>
          </van-cell-group>
        </van-form>

        <div class="bottom-box">
          <span class="text"> {{ $t('AddPage.SetDefaultAddress') }}</span>
          <span class="switch">
            <van-switch v-model="checked" />
          </span>
        </div>
      </div>
    </div>
    <div class="footer-btn">
      <template v-if="objItem.id">
        <DedicatedButton color="primary" @click="onClickSava">{{
          $t('AddPage.Save')
        }}</DedicatedButton>
        <div class="btn" @click="onClickDelete">{{ $t('AddPage.DeleteAddress') }}</div>
      </template>
      <template v-else>
        <DedicatedButton :color="isColor" @click="onClickAdd">{{
          $t('AddPage.Sure')
        }}</DedicatedButton>
      </template>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useRoute, useRouter } from 'vue-router'
// import subscriptIcon from './img/subscriptIcon.png'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import { getDeleteAddress, getAddressSave, getAddressUpdate } from '@/api/address'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { getImg } from '@/utils'
import { computed, onMounted, watch } from 'vue'
import { showLoadingToast, closeToast, showConfirmDialog } from 'vant'
import { useSendCode } from '@/hooks/useSendCode'
const { getPhoneInputLength } = useSendCode()

const appStore = useAppStore()
const user = useUserStore()

const route = useRoute()
const router = useRouter()
const objItem = ref({})
// 显示国家选择器
const isCountry = ref(false)

// 国家选项的数据
const countryList = ref([])
// 电话区号的选项数据
const optionCode = ref([])

onMounted(async () => {
  await appStore.getCountryCodeList()
})
watchEffect(() => {
  if (appStore.countryList && appStore.countryList.length) {
    // 初始化当前国家
    countryList.value = appStore.countryList
    appStore.countryList.forEach((item) => {
      const params = {
        value: item.phoneCode,
        text: item.phoneCode
      }
      if (!optionCode.value.some((existingItem) => existingItem.value === params.value)) {
        optionCode.value.push(params)
      }
    })
  }
})

// 默认选项的选中状态
const checked = ref(false)

// 上传表单
const submitData = reactive({
  address: '', // 详细地址
  relName: '', // 收货人
  countryCode: '', // 国家编码
  defaultFlag: '', // 默认地址标识 0-是 1-否
  phoneCode: '', // 手机区号
  phoneNumber: '', //手机号码
  postalCode: '', // 邮编
  tenantId: computed(() => user.userInfo.tenantId), // 商户平台id
  userName: computed(() => user.userInfo.userName), // 会员账号
  countryCn: '', // 国家昵称
  icon: '', // 国家图标
  id: ''
})

if (route.query) {
  objItem.value = route.query
  submitData.id = objItem.value.id
  submitData.relName = objItem.value.relName
  submitData.address = objItem.value.address
  submitData.phoneCode = objItem.value.phoneCode
  submitData.phoneNumber = objItem.value.phoneNumber
  submitData.postalCode = objItem.value.postalCode
  submitData.relName = objItem.value.relName
  submitData.defaultFlag = objItem.value.defaultFlag
  submitData.countryCn = objItem.value.countryName
  submitData.icon = objItem.value.countryIcon

  if (submitData.defaultFlag == '0') {
    checked.value = true
  }
}
watch(
  () => submitData.phoneCode,
  (newvalue) => {
    let result = countryList.value.find((item) => item.phoneCode === newvalue)
    submitData.countryCn = result.countryCn
    submitData.icon = result.icon
    submitData.countryCode = result.countryCode
  }
)

watch(
  () => submitData.countryCn,
  (newvalue) => {
    let result = countryList.value.find((item) => item.countryCn === newvalue)
    submitData.phoneCode = result.phoneCode
  }
)

// 邮编输入只能输入数字跟英文
const handleInput = (event) => {
  const value = event.target.value
  // 去除非英文和数字的字符
  const sanitizedValue = value.replace(/[^A-Za-z0-9]/g, '')
  // 更新数据绑定
  submitData.postalCode = sanitizedValue
}

// 确定按钮高亮
const isColor = computed(() => {
  if (
    submitData.address &&
    submitData.relName &&
    submitData.phoneCode &&
    submitData.phoneNumber &&
    submitData.postalCode
  ) {
    return 'primary'
  } else {
    return ''
  }
})

// 点击触发下拉菜单
// const toggleSelectMenu = () => {
//   isCountry.value = !isCountry.value
// }
// 点击确定国家
const onClickCountry = (item) => {
  submitData.countryCn = item.countryCn
  submitData.icon = item.icon
  submitData.countryCode = item.countryCode
  isCountry.value = false
}
// 编辑
const onClickSava = () => {
  if (checked.value) {
    submitData.defaultFlag = '0'
  } else {
    submitData.defaultFlag = '1'
  }
  const params = {
    id: submitData.id,
    address: submitData.address,
    countryCode: submitData.countryCode,
    defaultFlag: submitData.defaultFlag,
    phoneCode: submitData.phoneCode,
    phoneNumber: submitData.phoneNumber,
    postalCode: submitData.postalCode,
    relName: submitData.relName,
    tenantId: submitData.tenantId,
    userName: submitData.userName,
    countryName: submitData.countryCn,
    countryIcon: submitData.icon
  }
  showLoadingToast({
    message: i18n.global.t('AddPage.Save'),
    forbidClick: true,
    duration: 0
  })
  getAddressUpdate(params)
    .then((res) => {
      if (res.data) {
        router.back()
      }
      closeToast()
    })
    .catch(() => {
      closeToast()
    })
}
// 删除
const onClickDelete = () => {
  showConfirmDialog({
    title: i18n.global.t('AddPage.KindTips'),
    message: i18n.global.t('AddPage.AddPageTip3')
  })
    .then(() => {
      showLoadingToast({
        message: i18n.global.t('common.loading'),
        forbidClick: true,
        duration: 0
      })
      getDeleteAddress(submitData.id)
        .then((res) => {
          if (res.data) {
            router.back()
          }
          closeToast()
        })
        .catch(() => {
          closeToast()
        })
    })
    .catch(() => {})
}
// 添加
const onClickAdd = () => {
  if (checked.value) {
    submitData.defaultFlag = '0'
  } else {
    submitData.defaultFlag = '1'
  }
  const params = {
    address: submitData.address,
    countryCode: submitData.countryCode,
    defaultFlag: submitData.defaultFlag,
    phoneCode: submitData.phoneCode,
    phoneNumber: submitData.phoneNumber,
    postalCode: submitData.postalCode,
    relName: submitData.relName,
    tenantId: submitData.tenantId,
    userName: submitData.userName,
    countryName: submitData.countryCn,
    countryIcon: submitData.icon
  }
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  getAddressSave(params)
    .then((res) => {
      if (res.data) {
        router.back()
      }
      closeToast()
    })
    .catch(() => {
      closeToast()
    })
}
</script>
<style lang="scss" scoped>
.addressChild-content {
  background: #f7f7f7;

  .mid-box {
    padding-top: 15px;
    width: 375px;
    .form-box {
      position: relative;
      .country-option {
        position: absolute;
        bottom: 0px;
        left: 120px;
        height: 160px;
        width: 230px;
        background-color: #fff;
        z-index: 1;
        overflow: auto;
        .country-option-item {
          .country-option-items {
            display: flex;
            align-items: center;
            height: 30px;
            justify-content: space-between;
            margin: 5px 0;
            .country-option-item-left {
              display: flex;
              align-items: center;
              margin-left: 10px;
              .img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #ff5000;
                margin-right: 10px;
              }
            }
            .country-option-item-right {
              margin-right: 10px;
              font-size: 14px;
            }
          }

          .line {
            width: 180px;
            z-index: 2;
            margin: 0 auto;
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
    // height: 405px;
    .country-box {
      position: relative;
      display: flex;
      align-items: center;
      height: 40px;
      width: 100%;
      .country-lable {
        color: #111;
        font-size: 14px;
        margin-left: 15px;
      }
      .country-right {
        position: relative;
        display: flex;
        align-items: center;
        width: 210px;
        .country-right-title {
          margin-left: 45px;
          color: #d7d7d7;
          font-size: 14px;
          font-weight: 400;
        }
        .country-right-text {
          margin-left: 45px;
          display: flex;
          align-items: center;
          .country-right-img {
            width: 30px;
            height: 20px;
            background-color: red;
            margin-right: 10px;
          }
        }
        .triangle {
          width: 7.918px;
          height: 5.034px;
          position: absolute;
          top: 50%;
          right: -5px;
          transform: translateY(-50%);
        }
      }
    }

    .phone-box {
      display: flex;
      align-items: center;
      height: 40px;
      width: 100%;

      .phone-label {
        margin-left: 15px;
        width: 80px;
        color: #111;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        white-space: nowrap;
      }

      .phone-menu {
        position: relative;
        margin-left: 25px;
        .phone-icon {
          position: absolute;
          top: 18px;
          left: 7%;
          transform: translateX(-50%);
        }

        .phone-selection {
          --van-dropdown-menu-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
          :deep(.van-dropdown-item__content) {
            width: 91% !important;
            margin-left: 16px !important;
          }
        }
      }

      .phone-input {
        position: relative;
        margin-left: 10px;

        .van-input {
          padding-left: 10px;
          background-color: rgba(255, 0, 0, 0);
        }
      }
    }
    .address-box {
      width: 100%;
      .address-lable {
      }
      .address-right-label {
        white-space: nowrap;
      }
    }

    .address-right-label {
      white-space: nowrap;
    }
    .bottom-box {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0 0 15px;
      width: 345px;
      height: 50px;
      border-radius: 10px;
      background: #fff;

      .text {
        margin-left: 15px;
        color: #111;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        white-space: nowrap;
      }

      .switch {
        margin-right: 15px;
      }
    }
  }
  .footer-btn {
    width: 345px;
    margin: 0 auto;
    .btn {
      width: 100%;
      height: 44px;
      border-radius: 6px;
      border: 1px solid var(--2, #ff5000);
      color: var(--2, #ff5000);
      text-align: center;
      font-size: 15px;
      font-weight: 600;
      line-height: 44px;
      margin-top: 20px;
    }
  }
}
</style>
