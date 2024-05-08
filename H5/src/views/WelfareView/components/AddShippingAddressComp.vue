<template>
  <div>
    <van-popup
      v-model:show="showPage"
      closeable
      position="bottom"
      @click-overlay="onClickOverlay"
      @click-close-icon="onClickCloseIcon"
      round
    >
      <div class="main-outter">
        <div class="header-Text-box">
          <div class="header-Text">{{ $t('Wletter.Newshipaddress') }}</div>
        </div>
        <div class="mid-box">
          <div class="form-box">
            <van-form>
              <van-cell-group inset>
                <van-field
                  :label="$t('Wletter.Receiver')"
                  :placeholder="$t('Wletter.tip52')"
                  :border="false"
                  v-model="submitData.receiverName"
                />
                <div class="phone-box">
                  <div class="phone-label">{{ $t('Wletter.phonenumber') }}</div>
                  <div class="phone-menu">
                    <van-dropdown-menu class="phone-selection" :overlay="false">
                      <van-dropdown-item v-model="submitData.phoneAreaCode" :options="option1" />
                    </van-dropdown-menu>
                  </div>
                  <div class="phone-input">
                    <van-field
                      class="van-input"
                      type="tel"
                      :placeholder="$t('Wletter.tip53')"
                      v-model="submitData.phoneNum"
                    />
                  </div>
                </div>
                <div class="country-box">
                  <div class="country-lable">{{ $t('Wletter.Choosecountry') }}</div>
                  <select class="selection" required v-model="submitData.country">
                    <option value="" disabled selected hidden>
                      {{ $t('Wletter.tip54') }}
                    </option>
                    <option v-for="(item, index) in country" :key="index" :value="item.value">
                      {{ item.value }}
                    </option>
                  </select>
                  <div class="triangle">
                    <svg width="36%" height="36%" viewBox="-50 -50 300 300">
                      <polygon
                        class="triangle1"
                        stroke-linejoin="round"
                        points="0,0 100,125 200,0"
                      />
                    </svg>
                  </div>
                </div>

                <van-field
                  :label="$t('Wletter.postalcode')"
                  :placeholder="$t('Wletter.tip55')"
                  :border="false"
                  v-model="submitData.zipCode"
                />
                <van-field
                  :label="$t('Wletter.Address')"
                  :placeholder="$t('Wletter.tip56')"
                  :border="false"
                  style="margin-bottom: 60px"
                  v-model="submitData.address"
                />
              </van-cell-group>
            </van-form>

            <div class="bottom-box">
              <span class="text"> {{ $t('Wletter.setdefaultaddress') }} </span>
              <span class="switch">
                <van-switch v-model="checked" />
              </span>
            </div>
          </div>
        </div>

        <div class="footer">
          <VButton class="btn-left" @click="onClickCloseIcon">{{ $t('Wletter.cancel') }} </VButton>
          <VButton class="btn-right" @click="toSubmit">{{ $t('Wletter.sure') }} </VButton>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import i18n from '@/i18n'

const props = defineProps({
  showAddPage: {
    type: Boolean,
    default: false
  }
})
// 默认选项的选中状态
const checked = ref(true)
// 电话区号的选项数据
const option1 = [
  { text: '+86', value: '+86' },
  { text: '+852', value: '+852' },
  { text: '+63', value: '+63' }
]
// 国家选项的数据
const country = [
  { text: i18n.global.t('Wletter.China'), value: i18n.global.t('Wletter.China') },
  { text: i18n.global.t('Wletter.Taiwan'), value: i18n.global.t('Wletter.Taiwan') },
  { text: i18n.global.t('Wletter.Malaysia'), value: i18n.global.t('Wletter.Malaysia') }
]

// 上传表单
const submitData = reactive({
  receiverName: '',
  phoneAreaCode: '' || '+86',
  phoneNum: '',
  country: '',
  zipCode: '',
  address: ''
})

const emit = defineEmits(['update:showAddPage'])
const showPage = computed({
  get() {
    return props.showAddPage
  },
  set(value) {
    emit('update:showAddPage', value)
  }
})

// 点击弹出框的遮罩层触发
function onClickOverlay() {}
// 点击取消按钮
function onClickCloseIcon() {
  showPage.value = false
}

function toSubmit() {
  console.log(JSON.stringify(submitData))
}
</script>

<style lang="scss" scoped>
$btn-width: 160px;
$btn-height: 44px;

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
      // margin: 25px 0px 0px 25px;
      padding: 25px 0px 0px 25px;
      color: #111;

      font-size: 19px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px;
    }
  }

  .mid-box {
    position: relative;
    text-align: center;
    padding-top: 15px;
    width: 375px;
    height: 405px;
    flex-shrink: 0;
    background: #f7f7f7;

    .country-box {
      position: relative;
      text-align: left;
      height: 40px;
      width: 100%;
      .country-lable {
        display: inline-block;
        margin: 14px 0 0 15px;

        color: #111;

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
      }
      .selection {
        margin-left: 45px;
        width: 218px;
        height: 40px;
        border: none;
        color: #d7d7d7;
        appearance: none;
        outline: none;

        font-size: 13px;
        font-style: normal;
        font-weight: 400;
      }
      select:valid {
        color: #111;
      }

      .triangle {
        font-family: 'Font Awesome';
        display: inline-block;
        position: absolute;
        top: 45%;
        left: 94%;
        .triangle1 {
          fill: #dbdbdb;
          stroke: #dbdbdb;
          stroke-width: 60;
        }
      }
    }

    .phone-box {
      display: flex;
      align-items: center;
      height: 40px;
      width: 100%;

      .phone-label {
        margin-left: 5px;
        width: 80px;
        color: #111;

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        white-space: nowrap;
      }

      .phone-menu {
        margin-left: 25px;

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

    .bottom-box {
      position: relative;
      margin: 15px 0 0 15px;
      width: 345px;
      height: 50px;
      flex-shrink: 0;
      border-radius: 10px;
      background: #fff;

      .text {
        float: left;
        margin: 14px 0 0 15px;
        color: #111;

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
      }

      .switch {
        float: left;
        margin: 11px 0 0 156px;
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
