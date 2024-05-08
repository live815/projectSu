<template>
  <div>
    <el-dropdown trigger="click" @command="handleCommand">
      <div class="selector">{{ activeName }}</div>
      <template #dropdown>
        <el-dropdown-menu popper-class="opt-box" class="selector-opt-box">
          <el-dropdown-item
            v-for="(item, index) in props.lineSelectData"
            :key="index"
            class="selector-opt-item"
            :command="item"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import eventBus from '@/utils/eventBus'
const props = defineProps(['lineSelectData'])
const activeName = ref(i18n.global.t('Electronic.AllLine'))

//选择线路
function handleCommand(command){
  activeName.value = command.name
  eventBus.emit('linetype',command)
}
</script>

<style lang="scss" scoped>
.selector {
  width: 200px;
  height: 40px;
  background-color: pink;
  margin-left: 95px;
  padding: 9px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
  color: var(--100, #fff);
  
  font-size: 16px;
  font-weight: 400;
}
</style>

<style lang="scss">
.el-popper {
  outline: none !important;
  border: none !important;
}
.el-dropdown-menu {
  border-radius: unset !important;
}
.el-popper.is-light .el-popper__arrow::before {
  background-color: #232949!important;
  border: none;
}
.selector-opt-box {
  width: 200px;
  background: #232949!important;
  border: none !important;

  .selector-opt-item {
    height: 48px;
    padding: 7px 20px;
    align-items: center;
    background: #232949!important;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover,.selector-opt-item:hover  {
    background-color: #171a2f !important;
    color: #fff;
  }
  .el-picker__popper.el-popper, .el-popper.is-light{
    background: #1d223c !important;
  }
  .el-dropdown-menu__item{
    color: rgba(255, 255, 255, 0.6);
  }
}
.el-dropdown-menu__item:not(.is-disabled):focus{
  color: rgba(255, 255, 255, 0.6);
}
</style>
