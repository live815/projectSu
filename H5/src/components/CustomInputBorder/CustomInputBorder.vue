<template>
  <div class="input-group-item CustomInputBorderview">
    <p class="label">{{ label }}</p>
    <div class="input-wrapper">
      <input
        @input.stop="input"
        @blur.stop="onBlur"
        @focus.stop="onFocus"
        :value="modelValue"
        :maxLength="maxLength"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{ phone: isPhone }"
      />
      <p v-if="hasErrorTip" class="error-tip">
        {{ errorMessage }}
      </p>
      <div class="icon-wrapper">
        <IconClear v-if="modelValue && clearable" @click.stop="clear" class="icon-clear" />
        <span v-if="modelValue && isPwd" @click="toggle">
          <IconEyeClose v-show="type === 'password'" class="icon-eye-close" />
          <IconEyeOpen v-show="type === 'text'" class="icon-eye-open" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  isEmail: {
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
  }
})
const emit = defineEmits(['update:modelValue'])

const errorMessage = ref('')
const type = ref('text')

const input = (e) => {
  const inputLength = e.target.value.length
  if (props.isPhone) {
    const maxLength = props.maxLength // 如果是 手机号 类型的输入框，最大长度直接设为 11
    if (inputLength > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength) // 截断输入内容为最大长度
    }
  }
  emit('update:modelValue', e.target.value)
}
const clear = () => {
  emit('update:modelValue', '')
  // 重置表单验证状态
  errorMessage.value = ''
}

const isFocus = ref(false)

const onFocus = () => {
  isFocus.value = true
}
const onBlur = (e) => {
  let t = setTimeout(() => {
    isFocus.value = false
    clearTimeout(t)
  })
  if (props.hasErrorTip) {
    verify(e)
  }
}
const verify = (e) => {
  if (!e.target.value) {
    errorMessage.value = props.placeholder
  } else if (!props.rule.reg.test(e.target.value)) {
    errorMessage.value = props.rule.errorMessage
  } else {
    errorMessage.value = ''
  }
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
if (props.isPhone) {
  type.value = 'number'
}
if (props.isEmail) {
  type.value = 'email'
}
</script>

<style lang="scss" scoped>
.CustomInputBorderview {
  margin-bottom: 20px;
  .label {
    font-size: 15px;
    color: #000;
    margin-bottom: 10px;
  }

  .input-wrapper {
    position: relative;
    input {
      border-radius: 6px;
      border: 1px solid #eee;
      background: rgba(217, 217, 217, 0);
      line-height: 50px;
      font-size: 12px;
      text-indent: 1em;
      width: 100%;
      
      &[disabled] {
        background: #f7f7f7;
      }
      &.phone {
        text-indent: calc(90px + 1em);
      }
    }
    .error-tip {
      color: var(--color-danger);
      font-size: 12px;
      margin-top: 6px;
      height: 18px;
    }
    .icon-wrapper {
      position: absolute;
      right: 1em;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      svg {
        margin-left: 8px;
      }
      .icon-clear {
        fill: #999;
      }
      .icon-eye-close,
      .icon-eye-open {
        fill: #bbb;
      }
    }
  }
}
</style>
