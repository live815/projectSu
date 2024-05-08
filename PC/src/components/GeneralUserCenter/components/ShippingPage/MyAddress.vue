<template>
  <div class="dilog-container">
    <div class="address-boxs" v-if="addressInfo.length">
      <div class="address-boxs-item" v-for="item in addressInfo" :key="item.id">
        <div class="address-boxs-left">
          <div>
            <img class="img" v-if="item.defaultFlag == '0'" :src="highlightIcon" />
            <img class="img" v-else :src="defaultIcon" />
          </div>
          <div class="address-boxs-left-title">
            <div class="title-name" v-if="item.phoneNumber">
              <div class="span">{{ item.relName }}</div>
              <div>{{ item.phoneNumber.substr(0, 4) }}****{{ item.phoneNumber.substr(-4) }}</div>
              <div class="default-icon" v-if="item.defaultFlag == '0'">
                {{ $t('GeneralUserCenter.Default') }}
              </div>
            </div>
            <div class="text">
              <span class="span"> {{ item.countryName }}</span
              ><span class="spans">{{ item.postalCode }}</span>
            </div>
            <div>{{ item.address }}</div>
          </div>
        </div>
        <img class="address-boxs-right" :src="edit" @click="onClickEdit(item)" />
      </div>
    </div>
    <div class="address-min" v-else>
      <img class="img" :src="groundImg" />
      <div class="text">
        <div>{{ $t('GeneralUserCenter.NoShippingAddressYet') }}</div>
        <div style="white-space: nowrap">{{ $t('GeneralUserCenter.Notice_12') }}</div>
      </div>
    </div>
    <div class="btn-box">
      <ButtonV
        width="330px"
        height="40px"
        :text="$t('GeneralUserCenter.NewShippingAddress')"
        :active="true"
        @click="onClickAddress"
      ></ButtonV>
    </div>
  </div>
  <CustomizeDialog
    :dialogShow="isAddressShow"
    :width="490"
    :title="title"
    v-if="isAddressShow"
    @closeBtn="closeBtn"
    :alignCenter="true"
  >
    <EditAddress @childClick="childClick" :rowItem="rowItem" />
  </CustomizeDialog>
</template>

<script setup>
import i18n from '@/i18n'
import { ref, onMounted } from 'vue'
import groundImg from './img/groundImg.png'
import ButtonV from '@/components/ButtonV'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import EditAddress from './EditAddress.vue'
import edit from './img/edit.png'
import highlightIcon from './img/highlightIcon.png'
import defaultIcon from './img/defaultIcon.png'
import { getAddressList, getAddressUpdate } from '@/api/address'
import { useUserStore } from '@/stores/user'
const user = useUserStore()

const title = ref(i18n.global.t('GeneralUserCenter.NewShippingAddress'))
const isAddressShow = ref(false)
// 返回的地址列表数据
const addressInfo = ref([])
// 点击编辑项的数据
const rowItem = ref({})

// 默认选项
const defaultFlag = ref('')
onMounted(() => {
  getList()
})

const getList = () => {
  getAddressList().then((res) => {
    addressInfo.value = res.data || []
  })
}

// 打开弹窗
const onClickAddress = () => {
  rowItem.value = {}
  isAddressShow.value = true
}

// 打开编辑弹窗
const onClickEdit = (item) => {
  title.value = i18n.global.t('GeneralUserCenter.EditShippingAddress')
  rowItem.value = item
  isAddressShow.value = true
}
const closeBtn = () => {
  isAddressShow.value = false
}

// 子组件点击事件
const childClick = () => {
  isAddressShow.value = false
  getList()
}

// 修改默认
const onClickCut = (item) => {
  defaultFlag.value = item.defaultFlag
  if (defaultFlag.value == '1') {
    defaultFlag.value = '0'
  }
  const params = {
    id: item.id,
    address: item.address,
    defaultFlag: defaultFlag.value,
    phoneNumber: item.phoneNumber,
    postalCode: item.postalCode,
    relName: item.relName,
    tenantId: user.userInfo.tenantId,
    userName: user.userInfo.userName,
    countryName: item.countryCn,
    countryIcon: item.icon,
    countryCode: item.countryCode,
    phoneCode: item.phoneCode
  }
  getAddressUpdate(params)
    .then((res) => {
      if (res) {
        getList()
      }
    })
    .catch(() => {})
}
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
  .address-boxs {
    height: 275px;
    overflow: auto;
    margin-bottom: 10px;
    .address-boxs-item {
      width: 360px;
      height: 91px;
      overflow: auto;
      display: flex;
      margin: 0px auto;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .address-boxs-left {
        display: flex;
        align-items: center;
        .img {
          margin-right: 12px;
          width: 18px;
          height: 18px;
        }
        .address-boxs-left-title {
          position: relative;
          color: var(--60, rgba(255, 255, 255, 0.6));
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          .title-name {
            display: flex;
            align-items: center;
            color: var(--100, #fff);
            font-size: 16px;
            font-weight: 500;
            .span {
              margin-right: 8px;
              width: 70px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .default-icon {
              min-width: 40px;
              height: 18px;
              margin-left: 12px;
              padding: 0 2px;
              border-radius: 60px;
              background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
              color: #fff;

              font-size: 12px;
              text-align: center;
              line-height: 18px;
            }
          }
          .text {
            display: flex;
            margin: 8px 0;
            .span {
              margin-right: 6px;
            }
            .spans {
              width: 100px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .address-boxs-right {
        width: 22px;
        height: 22px;
      }
    }
  }
  .address-min {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .img {
      width: 237px;
      height: 180.548px;
    }
    .text {
      width: 168px;
      height: 52px;
      color: var(--100, #fff);
      text-align: center;

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      margin-bottom: 20px;
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    // margin-top: 30px;
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
