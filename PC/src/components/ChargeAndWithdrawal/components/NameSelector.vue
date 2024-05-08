<template>
  <div class="select-box" v-show="showSelect">
    <div class="list">
      <div class="showNum">{{ nameList.length }}/5</div>
      <ul>
        <li @click.stop="handldGetName(item.label)" v-for="(item, index) in nameList" :key="index">
          {{ item.label }}
          <img src="../img/dele_btn.png" />
        </li>
        <li class="add-name" v-show="nameList.length < 5">+{{$t('DepositWithdraw.UseNewName')}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['getRealName'])
const showSelect = ref(false)
const handldGetName = (name) => {
  emit('getRealName', name)
  handleCloseSelect()
}
onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
const handleClickOutside = (event) => {
  if (showSelect.value && !event.target.closest('.select-box')) {
    handleCloseSelect()
  }
}

function handleShowSelect() {
  showSelect.value = true
}
function handleCloseSelect() {
  showSelect.value = false
}

defineExpose({ handleShowSelect })

let nameList = [
  { label: '李易峰', default: false, major: true },
  { label: '蔡徐坤', default: false, major: false },
  { label: '吴亦凡', default: false, major: false },
  { label: '张全蛋', default: false, major: false }
]
</script>

<style lang="scss" scoped>
.select-box {
  position: absolute;
  z-index: 2008;
  width: 660px;
  // height: 305px;
  // padding-top: 16px;
  background: #1d223c;
  box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  .list {
    overflow-y: scroll;
    scrollbar-width: none;//火狐浏览器 隐藏滚动条
    height: 255px;
    .showNum {
      display: flex;
      width: 660px;
      height: 15px;
      padding: 7px 0 0px 20px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      font-size: 12px;
    }
    ul {
      margin-top: 4px;
      padding-left: 0;

      li {
        position: relative;
        display: flex;
        align-items: center;
        list-style: none;
        height: 48px;
        padding: 7px 20px;
        color: var(--60, rgba(255, 255, 255, 0.6));
        
        font-size: 14px;
        line-height: 22px;
        img {
          position: absolute;
          right: 20px;
        }
      }
      li:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      .add-name {
        color: var(--unnamed, #f35f1b);
      }
    }
  }
}
</style>
