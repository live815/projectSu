<template>
  <!-- 付款凭证弹窗弹窗 -->
  <CPopup ref="CPopupDom" height="580px" position="bottom">
    <div class="popup-top">{{ $t('Rletter.rlettertip22') }}</div>
    <div class="popup-text">{{ $t('Rletter.rlettertip23') }}</div>
    <div class="popup-list">
      <div class="popup-list-text">
        <span class="span">*</span>
        <span>{{ $t('Rletter.rlettertip24') }}</span>
        <span class="popup-list-text-Sample" @click="onClickSample">{{
          $t('Rletter.rlettertip25')
        }}</span>
      </div>
      <div class="popup-list-item">
        <CUploader @updateList="updateList">
          <div class="popup-list-img">
            <div>+</div>
            <div class="popup-list-img-text">{{ $t('Rletter.rlettertip26') }}</div>
          </div>
        </CUploader>
      </div>
    </div>
    <div class="popup-list">
      <div class="popup-list-text">
        <span> {{ $t('Rletter.rlettertip27') }}</span>
        <span class="popup-list-text-Sample" @click="onClickSample">
          {{ $t('Rletter.rlettertip25') }}</span
        >
      </div>
      <div class="popup-list-item">
        <CUploader :max-count="4" :disable-preview="false" @updateList="updateListArr">
          <div class="popup-list-img">
            <div>+</div>
            <div class="popup-list-img-text">{{ $t('Rletter.rlettertip29') }}</div>
          </div>
        </CUploader>
      </div>
    </div>
    <div class="popup-service-text">
      {{ $t('Rletter.rlettertip30') }}<span>{{ $t('Rletter.rlettertip16') }}</span>
    </div>
    <div class="popup-footer">
      <DedicatedButton style="width: 164px" @click="onClickAmount(1)">
        {{ $t('Rletter.cancel') }}</DedicatedButton
      >
      <DedicatedButton style="width: 164px" :color="onComputedColor" @click="onClickAmount(2)">{{
        $t('Rletter.rlettertip31')
      }}</DedicatedButton>
    </div>

    <SampleGraphPopup ref="sampleGraphPopup"></SampleGraphPopup>
  </CPopup>
</template>

<script setup>
import { computed, ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import CUploader from '@/components/CUploader/CUploader'
import SampleGraphPopup from '../SampleGraphPopup/SampleGraphPopup'
import { getBankUpload } from '@/api/recharge'
const emit = defineEmits(['payOrder'])

const props = defineProps({
  orderNo: {
    type: String,
    default: ''
  }
})

const CPopupDom = ref(null)
const showhide = () => {
  CPopupDom.value.showhide()
}
defineExpose({ showhide })

// 定义第一个图片，回执单图片地址
const receiptImg = ref('')

// 收支流水截图地址数组
const flowImgList = ref([])
// 图片传回来的数据
const updateList = (val) => {
  if (val.value.length > 0) {
    receiptImg.value = val.value[0].imgUrl
  } else {
    receiptImg.value = ''
  }
}

// 非必填图片数组
const updateListArr = (val) => {
  flowImgList.value.length = 0
  if (val.value.length > 0) {
    val.value.forEach((item) => {
      flowImgList.value.push(item.imgUrl)
    })
  }
}
// 底部点击按钮
const onClickAmount = (val) => {
  if (val == 1) {
    receiptImg.value = ''
    flowImgList.value.length = 0
    CPopupDom.value.showhide()
  } else {
    const params = {
      flowImgList: flowImgList.value,
      orderNo: props.orderNo,
      receiptImg: receiptImg.value
    }
    getBankUpload(params).then((res) => {
      if (res.code == 200) {
        emit('payOrder', false)
      }
      CPopupDom.value.showhide()
    })
  }
}

const onComputedColor = computed(() => {
  if (receiptImg.value) {
    return 'primary'
  } else {
    return ''
  }
})

const sampleGraphPopup = ref(null)
const onClickSample = () => {
  sampleGraphPopup.value.showhide()
}
</script>
<style lang="scss" scoped>
.popup-top {
  color: var(--gray-1, #111);
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 16px 0;
}

.popup-text {
  width: 343px;
  margin: 0 auto;
  color: #666;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}
.popup-list {
  margin: 24px 0 24px 16px;
  .popup-list-text {
    width: 343px;
    color: var(--gray-1, #111);
    font-size: 15px;
    font-weight: 400;
    line-height: 24px;
    .span {
      color: var(--1, #f53f3f);
    }
    .popup-list-text-Sample {
      color: var(--unnamed, #486bb2);
      margin-left: 4px;
      font-size: 15px;
    }
  }
  .popup-list-item {
    margin: 12px 0;
  }
  .popup-list-img {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    color: #ff5000;
    border: 1px dashed var(--2, #ff5000);
    background: var(--4, #fff5f0);
    font-size: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .popup-list-img-text {
      font-size: 12px;
    }
  }
  .popup-list-imgs {
    width: 80px;
    height: 80px;
    border-radius: 12px;
  }
}
.popup-service-text {
  color: #666;
  text-align: center;
  font-size: 12px;
  span {
    color: var(--unnamed, #486bb2);
    margin-left: 5px;
  }
}
.popup-footer {
  display: flex;
  justify-content: space-evenly;
}
</style>
