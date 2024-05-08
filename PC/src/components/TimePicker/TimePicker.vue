<template>
  <div>
    <el-form-item>
      <el-date-picker
        popper-class="datePickrComp"
        v-model="timePickerData"
        type="datetimerange"
        :range-separator="$t('Components.To')"
        value-format="x"
        :start-placeholder="$t('Components.StartDate')"
        :end-placeholder="$t('Components.EndDate')"
        style="width: 360px; height: 34px"
        :default-time="defaultTime"
        :disabled-date="disabledDate"
      />
    </el-form-item>
  </div>
</template>

<script setup>
import { defaultTime } from "@/utils/config";
import { getDateOffset} from '@/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  timeData: {
    default: () => []
  }
})
const emit = defineEmits(['updateTimeData'])
const minDate = ref(getDateOffset(-30))
const maxDate = ref(new Date())

const timePickerData = computed({
  get: () => {
    return props.timeData.map((timestamp) => {
      const date = new Date(timestamp)
      return date.toString()
    })
  },
  set: (newValue) => {
    let tmp = []
    if (newValue) {
      newValue.forEach((dateString) => {
        tmp.push(dateString)
      })
    }

    emit('updateTimeData', tmp)
  }
})
// 设置时间范围只能选择最近30天以内
const disabledDate = (val) => {
  if(router.currentRoute.value.path !== '/personal/5'){//福利中心不做时间限制
    if(val>maxDate.value.getTime() || val<minDate.value.getTime()){
      return true
    }else{
        return false
    }
  }else{
    return false
  }
}
</script>
<style lang="scss" scoped>
:deep() {
  .el-table__body tr:hover > td.el-table__cell {
    background-color: #171a2f;
  }
  .el-form--inline .el-form-item {
    margin-right: 10px;
  }
  .el-form-item__label {
    color: var(--100, #fff);
    
    font-size: 14px;
    font-style: normal;
  }
  .el-table {
    --el-table-border-color: 1px solid rgba(255, 255, 255, 0.2);
    --el-table-header-bg-color: var(--unnamed, #171a2f);
    --el-table-border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .el-table tr {
    background-color: #272b45;
    color: var(--100, #fff);
  }
  .el-button--info {
    --el-button-hover-border-color: #f35f1b;
    --el-button-bg-color: #272b45;
    background-color: #272b45 !important;
  }
  .el-button:focus,
  .el-button:hover {
    color: #f35f1b;
  }
  .el-input {
    --el-input-bg-color: #272b45;
  }
  .el-input__inner {
    color: var(--100, #fff);
  }
  .el-input__inner:hover {
    box-shadow: none;
  }
  .el-input__wrapper {
    background-color: #272b45;
    // border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: none;
  }
  .el-date-editor .el-range-separator {
    color: var(--100, #fff);
  }
  .el-date-editor .el-range-input {
    color: var(--100, #fff);
  }
  .el-select {
    --el-select-input-focus-border-color: none;
  }
  .el-range-editor.is-active:hover {
    box-shadow: none;
  }
}
.datePickrComp {
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
  .el-select-dropdown__item.selected {
    color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
  }
  .el-select {
    --el-select-border-color-hover: none;
    --el-select-input-focus-border-color: none;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    /* 鼠标移出颜色改变 */
    background-color: #171a2f;
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
    --el-datepicker-inrange-hover-bg-color: #272b45;
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
  .el-input.is-disabled .el-input__wrapper {
    background: #272b45;
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
  .el-button.is-text:not(.is-disabled):hover {
    background: #272b45;
  }
  .el-button.is-text {
    /* 底部清空按钮 */
    color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
    
    font-size: 14px;
    font-style: normal;
    border: 1px solid #272b45;
  }

  .el-button.is-plain {
    /* 底部确定按钮 */
    --el-button-hover-text-color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
    --el-button-hover-bg-color: #171a2f;
    border: 1px solid #272b45;
  }
  .el-button.is-disabled,
  .el-button.is-disabled:hover {
    background-color: #171a2f;
  }
  .el-button {
    --el-button-bg-color: #171a2f;
    border-color: #272b45;
    color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
    
    font-size: 14px;
    font-style: normal;
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
  .el-date-table td.today .el-date-table-cell__text {
    /* 默认日期时间颜色更改 */
    color: var(--el-datepicker-hover-text-color);
    font-weight: 400;
  }
  .el-input {
    /* 时间内部样式修改 */
    --el-input-hover-border-color: none;
    --el-input-clear-hover-color: none;
    --el-input-focus-border-color: none;
  }
  .el-date-range-picker__time-header {
    display: none;
  }
}
</style>
