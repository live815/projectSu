<template>
  <div class="Selector">
    <el-form-item :label="$t('Components.Type')" prop="channelPlatform">
      <el-select v-model="select" class="m-2" :placeholder="$t('Components.PleaseEnter')" :style="{ width: width + 'px' }">
        <el-option
          v-for="item in porps.data"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
const emit = defineEmits(['updateSelectedValue'])
const porps = defineProps({
  label: {
    type: String,
    default: () => {}
  },
  data: {
    type: Object
  },
  width: {
    type: Number,
    default: 148
  },
  placeholder: {
    type: String,
    default: i18n.global.t('Components.PleaseEnter')
  },
  selectedValue: {}
})

const select = computed({
  get: () => {
    return porps.selectedValue
  },
  set: (newValue) => {
    emit('updateSelectedValue', newValue)
  }
})
</script>

<style lang="scss" scoped>
.Selector{
  :deep() {
    .el-input__wrapper {
      background-color: transparent;
      box-shadow: none;
      // border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .el-input__inner {
      color: var(--100, #fff);
      
      font-size: 14px;
      font-style: normal;
    }
    .el-form-item__label {
      color: var(--100, #fff);
      text-align: right;
      
      font-size: 14px;
    }
  }
}

</style>
<style>
.el-date-table td.today .el-date-table-cell__text {
  /* 默认日期时间颜色更改 */
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
  font-weight: 400;
}
.el-picker__popper {
  /* 整体边框去除 */
  --el-datepicker-border-color: none;
}
.el-select__popper.el-popper {
  /* 下拉框颜色样式修改 */
  background: var(--unnamed, #1d223c);
  border: 1px solid #1d223c;
}
.el-select-dropdown__item:hover {
  background: #171a2f;
}
.el-select-dropdown__item {
  /* 字体 */
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
  
  font-size: 14px;
  font-style: normal;
}
.el-popper.is-light .el-popper__arrow::before {
  /* 三角形背景颜色 */
  background: var(--unnamed, #1d223c);
  border: 1px solid #1d223c;
}
.el-picker-panel {
  /* 时间选择器字体颜色 */
  color: var(--60, rgba(255, 255, 255, 0.6));
  
  font-size: 12px;
  background: #171a2f;
}
.el-date-range-picker {
  /* 时间选择器字体颜色 */
  --el-datepicker-active-color: #171a2f;
  --el-datepicker-inrange-hover-bg-color: #171a2f;
  --el-datepicker-inrange-bg-color: #272b45;
  --el-datepicker-inner-border-color: var(--el-disabled-border-color);
  --el-datepicker-hover-text-color: #fff;
  --el-datepicker-off-text-color: var(--20, rgba(255, 255, 255, 0.2));
}
.el-input__inner {
  /* 时间选择器第一排字体颜色 */
  color: var(--60, rgba(255, 255, 255, 0.6));
}
.el-input__wrapper {
  /* 时间选择器第一排背景颜色 */
  background: #171a2f;
  box-shadow: none;
  border: 1px solid #272b45;
}

.el-range-editor.el-input__wrapper:hover {
  box-shadow: none;
}
.el-picker-panel__footer {
  /* 时间选择器底部背景颜色 */
  background: #171a2f;
}
.el-button:hover {
  background: #272b45;
}
.el-date-table th {
  /* 边框颜色修改 */
  border-bottom: 1px solid #272b45;
}
.el-date-range-picker__content.is-left {
  border-right: 1px solid #272b45;
}
.el-date-range-picker__time-header {
  border-bottom: 1px solid #272b45;
}
.el-picker-panel__footer {
  border-top: 1px solid #272b45;
}
</style>
