<template>
  <div>
    <el-dialog
      class="dialog"
      v-model="showPhoneBinding"
      width="442px"
      align-center
      :show-close="false"
      destroy-on-close
    >
      <div class="outter-box">
        <div class="header">{{ $t('Components.BindMobilePhoneNumber') }}</div>
        <div class="warning">{{ $t('Components.Notice_19') }}</div>
        <div class="phone-box">
          <div class="country-box" @click.stop="showSelect">
            <div class="country-icon">
              <img :src="getImg(currentCountry.icon)" width="20" height="20" />
            </div>
            <div class="phone-select">{{ currentCountry.phoneCode }}</div>
          </div>
          <input
            class="phone-input"
            type="text"
            :placeholder="$t('Components.EnterPhoneNumber')"
            v-model="phoneNum"
          />
        </div>
        <div>
          <PhoneSelector ref="phoneseletor" @getAreaCode="getAreaCode"></PhoneSelector>
        </div>

        <div class="verification">
          <img class="icon" src="@/assets/img/verification.png" width="16" height="16" />
          <input
            class="verification-input"
            type="text"
            :placeholder="$t('Components.EnterVerificationCode')"
            v-model="verificationNum"
          />
          <div class="line"></div>
          <button class="verification-btn">{{ $t('Components.GetVerificationCode') }}</button>
        </div>
        <ButtonV
          class="btn"
          width="100%"
          height="40px"
          :text="$t('Components.BindAndLogIn')"
          :active="active"
        ></ButtonV>
        <div class="contact">
          <span class="contact-text" @click="openCustomerServicePop">{{
            $t('Components.ContactCustomerService')
          }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getImg } from '@/utils'
import { ref, computed } from 'vue'
import PhoneSelector from '@/components/PhoneSelector'
import ButtonV from '@/components/ButtonV'
import { openCustomerServicePop } from '@/utils/customerService'

const showPhoneBinding = ref(false)
const currentCountry = ref({})
const phoneNum = ref('')
const verificationNum = ref('')
const phoneseletor = ref(null)
const active = computed(() => {
  return verificationNum.value && phoneNum.value != false
})
function showSelect() {
  phoneseletor.value.handleShowSelect()
}

function getAreaCode(country) {
  currentCountry.value = country
}
</script>

<style lang="scss" scoped>
.country-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  overflow: hidden;
  img {
    position: relative;
    top: 2px;
  }
}
.outter-box {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 610px;
  padding: 59px 56px 40px 56px;
  .header {
    margin: 0 auto;
    color: var(--60, rgba(255, 255, 255, 0.6));
    
    font-size: 22px;
    font-weight: 400;
  }
  .warning {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 330px;
    height: 32px;
    margin-top: 34px;
    color: var(--unnamed, #e93d3d);
    text-align: center;
    
    font-size: 13px;
    font-weight: 400;
    border-radius: 6px;
    background: #0d1528;
  }
  .phone-box,
  .verification {
    display: flex;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: 72px;
    padding-top: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    .icon {
      position: relative;
      top: 3px;
    }
    .country-box {
      display: flex;
      align-items: center;
      width: 80px;
      height: 20px;
      border-right: 1px solid rgba(238, 238, 238, 0.2);
      .phone-select {
        margin-left: 11px;
        color: var(--100, #fff);
        
        font-size: 14px;
        font-weight: 400;
      }
    }
    .country-box:hover {
      cursor: pointer;
    }
    .phone-input,
    .verification-input {
      width: 180px;
      color: var(--100, #fff);
      
      font-size: 14px;
      font-weight: 400;
      margin-left: 12px;
    }
    .line {
      position: relative;
      top: 5px;
      height: 12px;
      width: 1px;
      background: rgba(255, 255, 255, 0.2);
    }
    .verification-btn {
      margin-left: 12px;
      background-color: transparent;
      border: none;
      color: var(--unnamed, #f35f1b);
      
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;
    }
  }
  .btn {
    margin-top: 40px;
  }
  .contact {
    margin-top: 180px;
    height: 10px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    .contact-text {
      position: relative;
      padding: 0 16px 0 16px;
      top: 1px;
      background-color: var(--unnamed, #232949);
      color: rgba(255, 255, 255, 0.4);
      
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
    }
  }
}
:deep().el-dialog {
  border-radius: 16px;
  background-color: var(--unnamed, #171a2f);
}
:deep().el-dialog__header {
  display: none;
}

:deep().el-dialog__body {
  padding: 0;
}
</style>
