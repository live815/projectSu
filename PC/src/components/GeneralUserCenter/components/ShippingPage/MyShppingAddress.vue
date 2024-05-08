<template>
  <div class="dilog-container">
    <div class="address-box">
      <el-radio-group v-model="chosenAddress" class="radio-box">
        <div class="opt-box" v-for="item in addressList" :key="item.id">
          <el-radio :label="item.id" size="large" class="opt" fill="#FF9000">
            <div class="address-container">
              <div class="text-box">
                <div class="text big-text">
                  {{ item.name }} <span>{{ item.phoneNum }}</span>
                </div>
                <div class="text">
                  {{ item.region }} <span>{{ item.regionCode }}</span>
                </div>
                <div class="text">{{ item.adress }}</div>
              </div>
            </div>
          </el-radio>
          <img class="edit-btn" src="./img/edit.png" />
        </div>
      </el-radio-group>
    </div>
    <div class="btn-box">
      <ButtonV width="330px" height="40px" :text="$t('GeneralUserCenter.NewShippingAddress')" :active="true"></ButtonV>
    </div>
  </div>
</template>

<script setup>
import ButtonV from '@/components/ButtonV'
const chosenAddress = ref(1)
const addressList = []
</script>

<style lang="scss" scoped>
.dilog-container {
  padding: 0 20px 10px 20px;
  background-color: #232949;
  .text {
    color: var(--60, rgba(255, 255, 255, 0.6));
    
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
  .big-text {
    color: var(--100, #fff);
    
    font-size: 16px;
    font-weight: 500;
  }
  .address-box {
    margin-top: -15px;
    margin-bottom: 24px;

    .radio-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .opt-box {
        position: relative;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        .address-container {
          margin-left: 10px;
        }
        .edit-btn {
          position: absolute;
          right: 0;
          top: 14px;
        }
      }
      .opt {
        width: 360px;
        height: 97px;
      }
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
  }
}

:deep() {
  .el-radio:last-child {
    margin-right: 32px;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: var(--unnamed, #f35f1b);
    background: var(--unnamed, #f35f1b);
  }
}
</style>
