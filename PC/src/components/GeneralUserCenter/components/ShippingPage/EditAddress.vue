<template>
  <div class="edit-container" lable-position="left" labelWidth="70px">
    <el-form :model="submitData">
      <el-form-item :label="$t('GeneralUserCenter.Receiver')" labelWidth="120px">
        <el-input v-model="submitData.relName" :placeholder="$t('GeneralUserCenter.Notice_10')" />
      </el-form-item>
      <el-form-item :label="$t('GeneralUserCenter.PhoneNumbers')" labelWidth="120px">
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
            v-model="submitData.phoneNumber"
            @blur="onBlur"
            :maxlength="getPhoneInputLength(currentCountry.countryCode)"
          />
          <div class="phoneSelector">
            <PhoneSelector ref="phoneseletor" @getAreaCode="getAreaCode"></PhoneSelector>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('GeneralUserCenter.PostalCode')" labelWidth="120px">
        <el-input
          v-model="submitData.postalCode"
          :placeholder="$t('GeneralUserCenter.EnterPostalCode')"
          :maxlength="12"
          :minlength="2"
          oninput="value=value.replace(/[^A-Za-z0-9]/g, '')"
        />
      </el-form-item>
      <el-form-item :label="$t('GeneralUserCenter.DetailAddress')" labelWidth="120px">
        <el-input
          v-model="submitData.address"
          autosize
          :placeholder="$t('GeneralUserCenter.EnterDetailAddress')"
        />
      </el-form-item>
      <el-form-item class="labelDefault" :label="$t('GeneralUserCenter.SetAsDefaultAddress')">
        <el-switch v-model="checked" />
      </el-form-item>
    </el-form>
    <div class="footer-btn">
      <div class="footer-btn-left" v-if="props.rowItem.id" @click="onClickDelete">
        {{ $t('GeneralUserCenter.DeleteAddress') }}
      </div>
      <div class="footer-btn-right" @click="onClickAdd">{{ $t('GeneralUserCenter.Sure') }}</div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { onMounted, ref } from 'vue'
import { getImg } from '@/utils'
import PhoneSelector from '@/components/PhoneSelector/index.vue'
import { getDeleteAddress, getAddressSave, getAddressUpdate } from '@/api/address'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { useSendCode } from '@/hooks/useSendCode'
const { getPhoneInputLength } = useSendCode()
const appStore = useAppStore()

const user = useUserStore()
const emit = defineEmits(['childClick'])

const props = defineProps({
  rowItem: {
    type: Object,
    default: () => {}
  }
})
const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(currentCountry.value?.phoneCode)
})
const phoneseletor = ref(null)
// 当前国家
const currentCountry = ref({})

// 点击显示选择器
function showSelect() {
  phoneseletor.value.handleShowSelect()
}

// 点击当前值
function getAreaCode(item) {
  currentCountry.value = item
}

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

onMounted(() => {
  if (props.rowItem) {
    submitData.id = props.rowItem.id
    submitData.relName = props.rowItem.relName
    submitData.address = props.rowItem.address
    submitData.phoneCode = props.rowItem.phoneCode
    submitData.phoneNumber = props.rowItem.phoneNumber
    submitData.postalCode = props.rowItem.postalCode
    submitData.relName = props.rowItem.relName
    submitData.defaultFlag = props.rowItem.defaultFlag
    submitData.countryCn = props.rowItem.countryName
    submitData.icon = props.rowItem.countryIcon
    if (props.rowItem.countryCode) {
      const matchedObjects = appStore.countryList.filter(
        (item) => item.countryCode === props.rowItem.countryCode
      )
      currentCountry.value = matchedObjects[0]
    }
    if (props.rowItem.defaultFlag == '0') {
      checked.value = true
    }
  }
})

// 输入框进行校验
const onBlur = () => {
  if (!i18nPhoneReg.value?.test(submitData.phoneNumber)) {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.formatPhoneNumber')
    })
  }
}

// 删除
const onClickDelete = () => {
  ElMessageBox.confirm(
    i18n.global.t('GeneralUserCenter.Notice_11'),
    i18n.global.t('GeneralUserCenter.KindTips'),
    {
      confirmButtonText: i18n.global.t('GeneralUserCenter.Sure'),
      cancelButtonText: i18n.global.t('GeneralUserCenter.Cancel'),
      type: 'warning'
    }
  )
    .then(() => {
      getDeleteAddress(submitData.id)
        .then((res) => {
          if (res) {
            emit('childClick', 1)
            ElMessage({
              type: 'success',
              message: i18n.global.t('GeneralUserCenter.SuccessfullyDeleted')
            })
          }
        })
        .catch(() => {})
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: i18n.global.t('GeneralUserCenter.Undelete')
      })
    })
}

// 确定
const onClickAdd = () => {
  if (!i18nPhoneReg.value?.test(submitData.phoneNumber)) {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.formatPhoneNumber')
    })
  }
  if (!submitData.phoneNumber || !submitData.address || !submitData.relName) {
    return ElMessage({
      type: 'error',
      message: i18n.global.t('GeneralUserCenter.ErrorInformation')
    })
  }
  if (checked.value) {
    submitData.defaultFlag = '0'
  } else {
    submitData.defaultFlag = '1'
  }
  if (submitData.id) {
    const params = {
      id: submitData.id,
      address: submitData.address,
      defaultFlag: submitData.defaultFlag,
      phoneNumber: submitData.phoneNumber,
      postalCode: submitData.postalCode,
      relName: submitData.relName,
      tenantId: submitData.tenantId,
      userName: submitData.userName,
      countryName: currentCountry.value.countryCn,
      countryIcon: currentCountry.value.icon,
      countryCode: currentCountry.value.countryCode,
      phoneCode: currentCountry.value.phoneCode
    }
    getAddressUpdate(params)
      .then((res) => {
        if (res) {
          emit('childClick')
          ElMessage({
            type: 'success',
            message: i18n.global.t('GeneralUserCenter.SuccessfulOperation')
          })
        }
      })
      .catch(() => {})
  } else {
    const params = {
      address: submitData.address,
      defaultFlag: submitData.defaultFlag,
      phoneNumber: submitData.phoneNumber,
      postalCode: submitData.postalCode,
      relName: submitData.relName,
      tenantId: submitData.tenantId,
      userName: submitData.userName,
      countryName: currentCountry.value.countryCn,
      countryIcon: currentCountry.value.icon,
      countryCode: currentCountry.value.countryCode,
      phoneCode: currentCountry.value.phoneCode
    }
    getAddressSave(params)
      .then((res) => {
        if (res) {
          emit('childClick', 1)
          ElMessage({
            type: 'success',
            message: i18n.global.t('GeneralUserCenter.SuccessfulOperation')
          })
        }
      })
      .catch(() => {})
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  padding: 0 30px 0 30px;
  :deep() {
    .el-input__wrapper {
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .el-form-item__content {
      .el-textarea__inner {
        border: 1px solid rgba(255, 255, 255, 0.2);

        background-color: transparent;
      }
    }
  }
}
.phone-count-right {
  position: relative;
  display: flex;
  align-items: center;
  width: 330px;
  height: 34px;
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
  .phoneSelector {
    position: absolute;
    bottom: 0;
  }
}
.labelDefault {
  white-space: nowrap;
}

.footer-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  .footer-btn-left,
  .footer-btn-right {
    width: 104px;
    height: 40px;
    border-radius: 4px;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    text-align: center;
    line-height: 40px;
  }
  .footer-btn-left {
    color: var(--unnamed, #f35f1b);
    border: 1px solid var(--unnamed, #f35f1b);
    margin-right: 16px;
  }
  .footer-btn-right {
    color: #fff;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
}
</style>
