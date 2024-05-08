<template>
  <div>
    <NavBar :title="$t('setview.Feedback')" />
    <van-cell-group class="cell-box" inset>
      <van-cell
        :title="submitForm.problemType || $t('setview.tip1')"
        is-link
        arrow-direction="down"
        round
        @click="showType"
      />
    </van-cell-group>
    <van-cell-group class="cell-box" inset>
      <van-field
        v-model="submitForm.title"
        :placeholder="$t('setview.tip2')"
        round
        autocomplete="off"
        maxlength="20"
      />
    </van-cell-group>
    <div class="text-box">{{ $t('setview.tip3') }}</div>
    <van-cell-group inset>
      <van-field
        class="input-box"
        v-model="submitForm.content"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        :placeholder="$t('setview.tip4')"
        show-word-limit
      />
    </van-cell-group>
    <div class="upload-box">
      <div class="upper-text">{{ $t('setview.tip5') }}{{ `(${uploadNum}/3)` }}</div>
      <div class="upload">
        <Uploader :maxCount="3" @updateList="updateList">
          <div class="popup-list-img">
            <div class="cross"></div>
          </div>
        </Uploader>
      </div>

      <div class="lower-text">
        {{ $t('setview.tip6') }}
      </div>
    </div>
    <div :class="dataCheck == 4 ? 'btn-box active' : 'btn-box'" @click="toSubmintAdvice">
      {{ $t('setview.Submitfeedback') }}
    </div>
    <TypeSelectPop ref="typeSelectPop" @changeType="changeType"></TypeSelectPop>
  </div>
</template>

<script setup>
import Uploader from './components/Uploader.vue'
import { submitAdvice } from '@/api/announcement.js'
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import TypeSelectPop from './components/TypeSelectPop/TypeSelectPop.vue'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'

const router = useRouter()
const imgSrc = ref('')
// 问题选择弹窗
const typeSelectPop = ref(null)
function showType() {
  typeSelectPop.value.showPopup()
}
// 问题类型
function changeType(type) {
  submitForm.value.problemType = type
}
// 计算文件数量
const uploadNum = computed(() => {
  return fileList.value.length
})

const submitForm = ref({
  content: '',
  dataAddress: '',
  problemType: '',
  source: 'H5',
  title: ''
})
// 内容验证
const dataCheck = computed(() => {
  if (!submitForm.value.problemType) {
    return 1
  }
  if (!submitForm.value.title) {
    return 2
  }
  if (!submitForm.value.content) {
    return 3
  }
  return 4
})
// 上传图片
const fileList = ref([])
const updateList = (list) => {
  fileList.value = list.value
}
//
// 提交
const toSubmintAdvice = () => {
  switch (dataCheck.value) {
    case 1:
      showToast(i18n.global.t('setview.tip1'))
      return
    case 2:
      showToast(i18n.global.t('setview.tip2'))
      return
    case 3:
      showToast(i18n.global.t('setview.tip4'))
      return
    case 4:
      break
  }
  const urlArr = fileList.value.map((obj) => obj.imgUrl)
  submitForm.value.dataAddress = urlArr.join(',')
  // dataCheck()
  submitAdvice(submitForm.value)
    .then((res) => {
      if (res.code == 200) {
        showToast(i18n.global.t('setview.tip7'))
        router.back()
      }
    })
    .catch((rej) => {
      console.log(rej)
    })
}
</script>

<style lang="scss" scoped>
.cross {
  width: 32px;
  height: 2px;
  background: #999;
  border-radius: 40px;
}
.cross::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 32px;
  background: #999;
  border-radius: 40px;
  top: 30%;
  left: 50%;
}
.popup-list-img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: 80px;
  height: 80px;
  background: #f7f7f7;
}
.cell-box {
  width: 345px;
  height: 60px;
  margin: 10px 15px 0 15px;
  padding-top: 10px;
  --van-cell-font-size: 15px;
  --van-cell-border-color: none;
}
.text-box {
  margin: 12px 19px 10px 19px;
  color: #666;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
}
.input-box {
  margin-top: 10px;
  :deep().van-field__control {
    height: 190px !important;
  }
}
.upload-box {
  height: 200px;
  padding: 14px 0 0 15px;
  margin: 15px 15px 0 15px;
  background-color: #fff;
  .upper-text {
    color: #111;

    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
  .upload {
    margin-top: 10px;
  }
  .lower-text {
    padding: 0 15px 0 0;
    color: #666;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
}
.btn-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 325px;
  height: 50px;
  margin: 34px 25px 20px 25px;
  border-radius: 6px;
  background: #dbdbdb;
  color: #fff;
  text-align: center;

  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
}
.btn-box.active {
  background: linear-gradient(90deg, #ff9000 16%, #ff5000 87.23%) !important;
}
</style>
