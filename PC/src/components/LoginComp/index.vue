<template>
  <div>
    <el-dialog
      class="dialog"
      v-model="userStore.LoginDialog.isShowLoginDialog"
      @close="closePopup"
      width="815px"
      align-center
      show-close
      destroy-on-close
    >
      <div class="outter-box">
        <img
          src="@/assets/img/cross.png"
          class="cross"
          width="24"
          height="24"
          @click="closePopup"
        />
        <div class="left-image"></div>
        <LoginPage v-if="currentPage === 'login'"></LoginPage>
        <RegisterPage v-if="currentPage === 'register'"></RegisterPage>
        <ResetPassword v-if="currentPage === 'reset'"></ResetPassword>
        <!--        <CreateAccount v-if="currentPage === 'createAccount'"></CreateAccount>-->
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import LoginPage from './LoginPage.vue'
import RegisterPage from './RegisterPage.vue'
import ResetPassword from './ResetPassword.vue'
// import CreateAccount from './CreateAccount.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const currentPage = computed(() => userStore.LoginDialog.currentPage)
function closePopup() {
  userStore.setLoginDialogAction({
    isShowLoginDialog: false,
    currentPage: ''
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  border-radius: 16px;
  background-color: var(--unnamed, #232949);
}
:deep(.el-dialog__header) {
  display: none;
  .el-dialog .el-dialog__header {
    display: block;
    height: 20px;
  }
}

:deep(.el-dialog__body) {
  padding: 0;
  .el-dialog {
    border-radius: 5px;
  }
  .el-dialog__body {
  }
  .el-dialog .el-dialog__header {
    display: block;
    height: 53px;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn {
      width: 35px;
      height: 51px;
    }
  }
}

.cross {
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
}
.outter-box {
  display: flex;
  height: 610px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;

  .left-image {
    width: 373px;
    height: 100%;
    background-image: url(./img/left-image.jpg);
    background-size: 100% 100%;
  }
}
</style>
