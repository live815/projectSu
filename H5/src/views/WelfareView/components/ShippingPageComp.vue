<template>
  <div>
    <van-popup
      v-model:show="ShowShipping"
      closeable
      position="bottom"
      @click-overlay="onClickOverlay"
      round
    >
      <div class="main-outter">
        <div class="header-Text-box">
          <div class="header-Text">{{ $t('Wletter.tip58') }}</div>
        </div>
        <div class="mid-box">
          <div class="select-main-outter">
            <van-radio-group v-model="currentChecked" class="check-box">
              <van-radio
                :name="item.id"
                v-for="item in addressInfo"
                :key="item.id"
                class="check-box-selection"
              >
                <template #icon="props">
                  <img
                    height="18"
                    width="18"
                    class="img-icon"
                    :src="props.checked ? activeIconPath : inactiveIconPath"
                  />
                </template>
                <div class="first-row">
                  <span class="span-text name-text">{{ item.name }}</span>
                  <span class="span-text">{{ item.phoneNum }}</span>
                  <div class="default-icon" v-show="item.id === defaultNum">
                    {{ $t('Wletter.default') }}
                  </div>
                </div>

                <div class="span-text-grey">{{ item.country }}</div>
                <div class="span-text-grey">{{ item.address }}</div>
              </van-radio>
            </van-radio-group>
          </div>
        </div>

        <div class="footer">
          <VButton class="btn-left" @click="onClickCloseIcon"> {{ $t('Wletter.cancel') }}</VButton>
          <VButton class="btn-right">{{ $t('Wletter.sure') }}</VButton>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import activeIconPath from '../img/checked.png'
import i18n from '@/i18n'

import inactiveIconPath from '@/views/WelfareView/img/check.png'
const props = defineProps({
  ShowShipping: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:ShowShipping'])

const ShowShipping = computed({
  get() {
    return props.ShowShipping
  },
  set(value) {
    console.log(value)
    emit('update:ShowShipping', value)
  }
})

const currentChecked = ref(1)

const addressInfo = ref([
  {
    id: 1,
    name: i18n.global.t('Wletter.name1'),
    phoneNum: '182****1111',
    country: i18n.global.t('Wletter.country'),
    address: i18n.global.t('Wletter.address1'),
    default: true
  },
  {
    id: 2,
    name: i18n.global.t('Wletter.name1'),
    phoneNum: '182****1111',
    country: i18n.global.t('Wletter.country'),
    address: i18n.global.t('Wletter.address1'),
    default: false
  },
  {
    id: 3,
    name: i18n.global.t('Wletter.name2'),
    phoneNum: '182****1111',
    country: i18n.global.t('Wletter.country'),
    address: i18n.global.t('Wletter.address1'),
    default: false
  }
])

const defaultNum = computed(() => {
  const defaultAddress = addressInfo.value.find((address) => address.default)
  return defaultAddress ? defaultAddress.id : 1
})

// 点击弹出框的遮罩层触发
function onClickOverlay() {}
// 点击取消按钮
function onClickCloseIcon() {
  ShowShipping.value = false
}
</script>

<style lang="scss" scoped>
$btn-width: 160px;
$btn-height: 44px;
.name-text {
  width: 55px;
}
.first-row {
  height: 18px;
  display: flex;
  align-items: center;
}
.main-outter {
  height: 561px;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  background: #fff;

  .header-Text-box {
    position: relative;
    height: 72px;
    width: 100%;

    .header-Text {
      padding: 25px 0px 0px 25px;
      color: #111;

      font-size: 19px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px;
    }
  }

  .mid-box {
    width: 375px;
    height: 405px;
    flex-shrink: 0;
    background: #f7f7f7;
    .select-main-outter {
      position: relative;
      padding-top: 15px;
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      background: #f7f7f7;

      .check-box-selection {
        position: relative;
        margin: 0px 0 15px 15px;
        padding-left: 15px;
        width: 345px;
        height: 90px;
        flex-shrink: 0;
        border-radius: 10px;
        background: #fff;

        .default-icon {
          position: relative;
          display: flex;
          left: 10px;
          // padding-top: 2px;
          justify-content: center;
          align-items: center;
          width: 36px;
          border-radius: 60px;
          background: var(--2, #ff5000);
          color: #fff;

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }

        .span-text {
          color: #000;

          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }

        .span-text-grey {
          color: #999;

          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 84px;

    .btn-left {
      float: left;
      width: $btn-width;
      height: 44px;
      margin: 20px 0px 15px 15px;
      flex-shrink: 0;
      color: #ff5000;
      border-radius: 6px;
      border: 0.5px solid #ff5000;
      background: #fff;
    }

    .btn-right {
      float: left;
      width: $btn-width;
      height: 44px;
      margin: 20px 0px 15px 25px;
      flex-shrink: 0;
      border-radius: 6px;
      background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
    }
  }
}
</style>
