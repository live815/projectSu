<template>
  <div class="address-content">
    <NavBar :title="$t('AddPage.MyshipAddress')" />
    <div class="address-content-list" v-if="addressInfo.length">
      <div class="address-boxs-item" v-for="item in addressInfo" :key="item.id">
        <div class="address-boxs-left">
          <div>
            <img class="img" v-if="item.defaultFlag == '0'" :src="checked" />
            <img class="img" v-else :src="check" />
          </div>
          <div class="address-boxs-left-title">
            <div class="title-name">
              <div class="span">{{ item.relName }}</div>
              <div>{{ item.phoneNumber.substr(0, 4) }}****{{ item.phoneNumber.substr(-4) }}</div>
              <div class="default-icon" v-if="item.defaultFlag == '0'">
                {{ $t('AddPage.Default') }}
              </div>
            </div>
            <div class="text">
              <span class="span"> {{ item.countryName }}</span
              ><span class="spans">{{ item.postalCode }}</span>
            </div>
            <div class="text">{{ item.address }}</div>
          </div>
        </div>
        <div class="address-boxs-right" @click="onClickPush(item)">
          <van-icon name="edit" size="23" />
        </div>
      </div>
    </div>
    <div class="address-content-img" v-else>
      <img class="img" :src="defaultImg" />
      <div class="title">{{ $t('AddPage.AddPageTip4') }}</div>
    </div>
    <div class="footer-btn" @click="onClickPush()">{{ $t('AddPage.AddShipAddress') }}</div>
  </div>
</template>

<script setup>
import defaultImg from './img/defaultImg.png'
import checked from './img/checked.png'
import check from './img/check.png'
import { useRouter } from 'vue-router'
import { getAddressList, getAddressUpdate } from '@/api/address'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
const user = useUserStore()

const router = useRouter()
const addressInfo = ref([])
onMounted(() => {
  getList()
})

const getList = () => {
  getAddressList().then((res) => {
    addressInfo.value = res.data || []
  })
}

// 默认选项
const defaultFlag = ref('')

const onClickPush = (val) => {
  if (val) {
    router.push({ path: '/addressChild', query: val })
  } else {
    router.push({ path: '/addressChild' })
  }
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
.address-content {
  position: relative;

  .address-content-list {
    width: 345px;
    min-height: 525px;
    max-height: 660px;

    margin: 0 auto;
    overflow: auto;
    .address-boxs-item {
      width: 100%;
      height: 91px;
      display: flex;
      margin: 15px auto;
      align-items: center;
      justify-content: space-between;
      border-radius: 10px;
      background: #fff;
      .address-boxs-left {
        display: flex;
        align-items: center;
        margin-left: 10px;
        .img {
          margin-right: 12px;
          width: 18px;
          height: 18px;
        }
        .address-boxs-left-title {
          position: relative;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          .title-name {
            display: flex;
            align-items: center;
            color: #000;
            font-size: 15px;
            font-weight: 400;

            .span {
              margin-right: 7px;
              width: 70px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .default-icon {
              min-width: 36px;
              height: 18px;
              text-align: center;
              margin-left: 12px;
              border-radius: 60px;
              background: var(--2, #ff5000);
              color: #fff;
              line-height: 18px;
              font-size: 12px;
            }
          }
          .text {
            margin: 8px 0;
            color: #999;
            font-size: 13px;
            display: flex;
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
        margin-right: 10px;
      }
    }
  }
  .address-content-img {
    display: flex;
    align-items: center;
    flex-direction: column;
    .img {
      width: 200px;
      height: 125.644px;
      margin: 120px auto 10px;
    }
    .title {
      width: 168px;
      height: 52px;
      color: #999;
      text-align: center;

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px; /* 185.714% */
    }
  }
  .footer-btn {
    // position: absolute;
    // bottom: 40px;
    // left: 50%;
    // transform: translateX(-50%);
    margin: 30px auto;
    width: 345px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 6px;
    color: #fff;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    background: linear-gradient(90deg, #ff9000 16%, #ff5000 87.23%);
  }
}
</style>
