<template>
  <div class="input-wrapper CustomInputview" :class="{ error: errorMessage }">
    <input
      ref="inputBox"
      :value="modelValue"
      @input.stop="onInput"
      @blur.stop="onBlur"
      @focus.stop="onFocus"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :type="type"
      :oninput="handleOninput"
      :class="{ phone: isPhone }"
      autocomplete
    />
    <p v-if="hasErrorTip" class="error-tip">{{ errorMessage }}</p>
    <div class="icon-wrapper" :class="{ 'verify-code-icon-right': verifyCodeIconRight }">
      <IconClear v-if="isFocus && modelValue && clearable" @click.stop="clear" class="icon-clear" />
      <span v-if="modelValue && isPwd" @click="toggle">
        <IconEyeClose v-show="type === 'password'" class="icon-eye-close" />
        <IconEyeOpen v-show="type === 'text'" class="icon-eye-open" />
      </span>
    </div>
  </div>
</template>

<script setup>
import IconClear from '@/components/icons/IconClear'
import IconEyeClose from '@/components/icons/IconEyeClose'
import IconEyeOpen from '@/components/icons/IconEyeOpen'
import { ref } from 'vue'
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
  isPhone: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  maxLength: {
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
  }
})
const emit = defineEmits([
  'update:modelValue',
  // 'update:focus',
  'update:has-error-tip',
  'checkPhoneNum',
  'handleRegReplace'
])

const errorMessage = ref('')
const type = ref('text')
const isFocus = ref(false)

const onInput = (e) => {
  emit('update:modelValue', e.target.value)
  // 重置表单验证状态
  errorMessage.value = ''
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
  const inputValue = e.target.value
  if (!inputValue) {
    errorMessage.value = props.placeholder
    emit('update:has-error-tip', !inputValue)
  } else if (!props.rule.reg.test(inputValue)) {
    errorMessage.value = props.rule.errorMessage
    emit('update:has-error-tip', !props.rule.reg.test(inputValue))
  } else {
    emit('checkPhoneNum', (n) => (errorMessage.value = n))
  }
}
const clear = () => {
  emit('update:modelValue', '')
  // 重置表单验证状态
  errorMessage.value = ''
  emit('update:has-error-tip', '')
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

const handleOninput = () => {
  emit('handleRegReplace', '')
}
</script>

<style lang="scss" scoped>
.CustomInputview {
  position: relative;
  input {
    width: 100%;
    border: none;
    font-size: 16px;
    color: #111;
    border-bottom: 1px solid #eee;
    padding-bottom: 14px;
    padding-right: 30px;
    &.phone {
      text-indent: 90px;
    }
  }
  .icon-wrapper {
    position: absolute;
    right: 0;
    top: -8px;
    padding: 10px;
    &.verify-code-icon-right {
      right: 93px;
    }
    svg {
      margin-left: 10px;
    }
    .icon-clear {
      fill: #999;
    }
    .icon-eye-close,
    .icon-eye-open {
      fill: #bbb;
    }
  }
  &.error {
    input {
      border-bottom-color: var(--color-danger);
    }
  }
  .error-tip {
    color: var(--color-danger);
    font-size: 12px;
    margin-top: 6px;
    height: 18px;
  }
}
</style>
