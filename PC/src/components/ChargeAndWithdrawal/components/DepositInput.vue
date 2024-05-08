<template>
  <div class="deposit-input">
    <div v-if="isInputLeft" class="icon-left" :class="{ 'icon-left-img': isInputImg }">
      <CurrencyUnit style="margin-right: 0" />
    </div>
    <input
      class="no-spin-button"
      :value="modelValue"
      @input.stop="onInput"
      @blur.stop="onBlur"
      @focus.stop="onFocus"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :type="types"
      :class="{ 'input-left': isInputLeft, 'input-left-img': isInputImg }"
      autocomplete
    />
    <p v-if="hasErrorTip" class="error-tip">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n/index'

const userStore = useUserStore()
const props = defineProps({
  clearable: {
    type: Boolean,
    default: false
  },
  rule: {
    type: Object,
    default: () => ({})
  },
  hasErrorTip: {
    type: Boolean,
    default: false
  },
  labelWidth: {
    type: Number,
    default: 0
  },
  indent: {
    type: [String, Number],
    default: ''
  },
  isPwd: {
    type: Boolean,
    default: false
  },
  // 是否左侧钱符号
  isInputLeft: {
    type: Boolean,
    default: false
  },
  // 是否左侧图标
  isInputImg: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  verifyCodeIconRight: {
    type: Boolean,
    default: false
  },
  // 当前项的数据
  itemObj: {
    type: Object,
    default: () => ({})
  },
  types: {
    type: String,
    default: 'text'
  }
})
const emit = defineEmits(['update:modelValue'])
const errorMessage = ref('')
const type = ref('text')
const isFocus = ref(false)
const onInput = (e) => {
  // 重置表单验证状态
  errorMessage.value = ''
  // 判断输入是否有空格或者为空
  if (e.target.value.trim() === '') {
    e.target.value = ''
  }
  if (props.isInputLeft) {
    // 判断首位是否为零
    if (e.target.value.length === 1 && e.target.value[0] === '0') {
      e.target.value = ''
    }
    e.target.value = e.target.value.replace(/\./g, '')
    const inputValue = parseFloat(e.target.value)
    if (isNaN(inputValue) || inputValue < 0) {
      errorMessage.value = i18n.global.t('common.tip3')
    } else if (inputValue < props.itemObj.normalMinWd) {
      errorMessage.value = i18n.global.t('common.tip1')
    } else if (inputValue > parseFloat(userStore.balance)) {
      errorMessage.value = i18n.global.t('common.tip2')
    }
  }
  emit('update:modelValue', e.target.value)
}
const onFocus = () => {
  isFocus.value = true
}
const onBlur = (e) => {
  let t = setTimeout(() => {
    isFocus.value = false
    clearTimeout(t)
  })
  verify(e)
}
const verify = (e) => {
  if (!props.isInputLeft) {
    if (!e.target.value) {
      errorMessage.value = props.placeholder
    }
    if (e.target.value.length >= 20) {
      errorMessage.value = i18n.global.t('common.tip4')
    }
  }
}
const clear = () => {
  emit('update:modelValue', '')
  // 重置表单验证状态
  errorMessage.value = ''
}

const toggle = () => {
  if (type.value === 'password') {
    type.value = 'text'
  } else {
    type.value = 'password'
  }
}
if (props.isPwd) {
  type.value = 'password'
}
</script>
<style lang='scss' scoped>
.deposit-input {
  position: relative;
  width: 100%;
  .icon-left,
  .icon-left-img {
    position: absolute;
    top: 23px;
    left: 10px;
    transform: translateY(-50%);
  }
  .icon-left {
    position: absolute;
    top: 23px;
    left: 10px;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    color: var(--gray-9, #999);
  }
  .icon-left-img {
    width: 20px;
    height: 20px;
    background-color: #ff9000;
    margin: 0 14px 0 5px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    color: #fff;
    font-size: 16px;
  }
  input {
    width: 100%;
    font-size: 14px;
    color: #111;
    height: 48px;
    align-items: center;
    border-radius: 8px;
    padding-left: 15px;
    color: #fff;
    caret-color: #fff;
    line-height: 48px;
  }
  .no-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }

  .no-spin-button::-webkit-inner-spin-button,
  .no-spin-button::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .input-left {
    padding-left: 30px;
  }
  .input-left-img {
    padding-left: 50px;
  }
  .error-tip {
    color: var(--color-danger);
    font-size: 12px;
    margin-top: 6px;
    height: 18px;
  }
  .icon-wrapper {
    position: absolute;
    right: 8px;
    top: 6px;
    padding: 10px;
    .icon-clear {
      fill: #999;
    }
    .icon-eye-close,
    .icon-eye-open {
      fill: #bbb;
    }
  }
}
</style>