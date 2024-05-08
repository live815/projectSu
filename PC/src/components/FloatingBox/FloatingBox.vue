<template>
  <div class="float-container">
    <div
      @mousedown="startDrag"
      class="drag_container"
      draggable="true"
      :style="`top:${elTop}px;left:${elLeft}px;`"
    >
      <div class="float-container-wraper" v-if="show">
        <div class="select-box" @click="openDeposit">
          <ChrageBox />{{ $t('Components.Deposit') }}
        </div>
        <div class="select-box" @mouseover="isServicePop = true" @mouseleave="isServicePop = false">
          <CustomerService />{{ $t('Components.CustomerService') }}
          <CSChannels :isServicePop="isServicePop" style="top: 0; left: -120px" />
        </div>
        <!-- <div class="select-box"><img src="./img/phonecall.svg" />{{ $t('Components.CallBack') }}</div> -->
        <div class="select-box">
          <el-popover :width="150" placement="left" trigger="click" effect="dark">
            <template #reference>
              <div>
                <QrcodeSVG />
                <p>{{ $t('Components.MobileTerminal') }}</p>
              </div>
            </template>
            <!-- 气泡内容 -->
            <div class="qrcode-wrapper">
              <QrCode size="120" :link="downloadLink" />
              <LogoIcon class="logo" />
            </div>
            <!-- <template v-if="!user.isLogin">
              <div class="mask"></div>
              <button class="login" @click="login">{{ $t('Components.GoToLogin') }}</button>
            </template> -->
          </el-popover>
        </div>
        <div class="select-box" @click="handlePush">
          <Investment />{{ $t('Components.JointVentureInvestment') }}
        </div>
        <!-- <div class="foldbtn" @click="showIcon">
          <el-icon><ArrowRightBold /></el-icon>
        </div> -->
      </div>
      <div class="hide" v-else @click="showIcon">
        <div class="foldbtn">
          <el-icon><ArrowLeftBold /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { downloadLink } from '@/utils/config'
import { useUserStore } from '@/stores/user.js'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal.js'
import ChrageBox from './icon/ChrageBox.vue'
import CustomerService from './icon/CustomerService.vue'
import Investment from './icon/Investment.vue'
import QrcodeSVG from './icon/QrcodeSVG.vue'
import { useRouter } from 'vue-router'
import CSChannels from './../CSChannels'

const router = useRouter()
const user = useUserStore()
const mainConfig = useChargeAndWithdrawal()
// 鼠标放上去客服弹窗
const isServicePop = ref(false)
const show = ref(true)
const applyTransition = ref(false)
// let isDragging = false
// 悬浮框初始坐标定位
// const startClientX = ref(0)
// const startClientY = ref(0)
const elTop = ref(0)
const elLeft = ref(0)
function handlePush() {
  router.push('/VentureInvest')
}

function showIcon() {
  show.value = !show.value
}

// 打开充值
const openDeposit = () => {
  if (!user.userInfo.userName) {
    ElMessage(i18n.global.t('DepositWithdraw.NoticeTips_10'))
  } else {
    // 是否绑定手机号或者银行卡
    mainConfig.currentShow = 1
    const params = {
      isOpen: true
    }
    eventBus.emit('showCharge', params)
  }
}

// const dragStart = (e) => {
//   startClientX.value = e.clientX
//   startClientY.value = e.clientY
// }
//
// const dragEnd = (e) => {
//   let x = e.clientX - startClientX.value
//   let y = e.clientY - startClientY.value
//   elLeft.value += x
//   elTop.value += y
// }

const startDrag = (e) => {
  e.preventDefault()
  applyTransition.value = false
  const initialX = e.clientX - elLeft.value
  const initialY = e.clientY - elTop.value
  const handleMouseMove = (e) => {
    elTop.value = e.clientY - initialY
    elLeft.value = e.clientX - initialX
    // isDragging = true
  }
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    applyTransition.value = true
    // isDragging = false
  }
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}
</script>

<style lang="scss" scoped>
.float-container {
  position: fixed;
  right: 20px;
  top: 100px;
  z-index: 5000;
  display: flex;
  width: 64px;
  padding: 4px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  // transtion: all 0.2s;
  flex-shrink: 0;
  border-radius: 6px;
  .float-container-wraper {
    background: #232949;
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.08), 0 16px 24px 2px rgba(0, 0, 0, 0.04),
      0 6px 30px 5px rgba(0, 0, 0, 0.05);
    color: var(--60, rgba(255, 255, 255, 0.6));
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    .select-box {
      position: relative;
      display: flex;
      width: 56px;
      min-height: 56px;
      padding: 8px 0;
      // border:1px solid red;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      svg {
        fill: #fff;
      }
    }
    .foldbtn {
      height: 30px;
      width: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        color: var(--unnamed, #f35f1b);
        background: #323c6f;
      }
    }

    .select-box:hover {
      color: var(--unnamed, #f35f1b);
      background: #323c6f;
      svg {
        fill: #f35f1b !important;
      }
    }
  }
  .hide {
    margin-top: 225px;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #232949;
    position: absolute;
    right: 0;
    &:hover {
      color: var(--unnamed, #f35f1b);
      background: #323c6f;
    }
  }
  .qrcode-wrapper {
    padding: 0 10px;
    display: flex;
    justify-content: center;
  }
}
.float-container:after {
  display: table;
  position: absolute;
  content: '';
  clear: both;
}
.drag_container {
  position: absolute;
  user-select: none;
  z-index: 5000;
  //height: 288px;
  // background: red;
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.9;
  text-align: center;
  line-height: 150px;
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  height: 30px;
  padding: 0 10px;
  border: 1px solid var(--unnamed, #f35f1b);
  border-radius: 30px;
  font-weight: 600;
  background: #f36625;
  color: #fff;
  cursor: pointer;
}

.el-popper.is-dark {
  background: #232949;
  border: 0;
  padding: 16px;
}
.el-popper.is-dark .el-popper__arrow::before {
  background: none;
  background: #232949;
  border: 1px solid #232949;
}
.qrcode-wrapper {
  position: relative;
  .logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 20px;
  }
}
</style>
