<!--<template>-->
<!--  <div class="right-box">-->
<!--    <div class="header">{{ $t('Components.RetrievePassword') }}</div>-->

<!--      <div class="container">-->
<!--        <div class="auto-create">-->
<!--          <p class="title">自动生成</p>-->
<!--          <div class="phone-box">-->
<!--            <div class="random-account">-->
<!--              {{ randomAccount }}-->
<!--              <span @click="handleRefresh"></span>-->
<!--            </div>-->
<!--            <img class="icon" src="./img/refresh.png" width="16" height="16" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="edit-create">-->
<!--          <p class="title">选择自填账号</p>-->
<!--          <div class="phone-box">-->
<!--            <input-->
<!--              class="phone-input edit-account"-->
<!--              ref="editAccountBox"-->
<!--              v-model="editAccount"-->
<!--              placeholder="输入6-12个字母及数字组成的账号"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="btn-small-row">-->
<!--        <div class="btn-small">{{ $t('Components.Previous') }}</div>-->
<!--        <div class="btn-small">{{ $t('Components.finish') }}</div>-->
<!--      </div>-->
<!--      <div class="register-tips">不填写自填账号默认选择自动生成账号</div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from 'vue'-->

<!--const randomAccount = ref('')-->
<!--const editAccount = ref('')-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.right-box {-->
<!--  width: 442px;-->
<!--  height: 100%;-->
<!--  padding: 0 56px 0 56px;-->
<!--  .btn-row {-->
<!--    display: flex;-->
<!--    width: 100%;-->
<!--    height: 95px;-->
<!--    padding-top: 55px;-->
<!--    .btn-box {-->
<!--      display: flex;-->
<!--      margin-right: 30px;-->
<!--      height: 40px;-->
<!--      padding: 10px 20px 10px 20px;-->
<!--      justify-content: center;-->
<!--      align-items: center;-->
<!--      flex-shrink: 0;-->
<!--      color: var(&#45;&#45;40, rgba(255, 255, 255, 0.4));-->
<!--      -->
<!--      font-size: 16px;-->
<!--      font-weight: 400;-->
<!--    }-->
<!--    .active {-->
<!--      border-radius: 200px;-->
<!--      background: var(&#45;&#45;unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));-->
<!--      color: #fff !important;-->
<!--    }-->
<!--    .btn-box:hover {-->
<!--      cursor: pointer;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
