<!-- 银行卡显示 -->
<template>
  <div class="bank-card-information">
    <div class="return">
      <div class="return-width" @click="handledGoBack(0)">
        <div><img src="./img/Frame.png" /></div>
        <div>{{ $t('GeneralUserCenter.WithdrawalBinding') }}</div>
      </div>
    </div>
    <div class="bank-card">
      <template v-for="(item, index) in btnDateComputed" :key="index">
        <div @click="changeFrom(item.value)" :class="showBankCard == item.value ? 'active' : ''">
          {{ item.label }}
        </div>
      </template>
    </div>
    <!-- 银行卡 -->
    <div class="addbackcard" v-if="showBankCard == 0">
      <template v-if="backCardData.length < 10">
        <div class="add-bank-card" @click="handledGoBack(1, '0')">
          <img src="./img/add.png" />
          <div class="title">{{ $t('GeneralUserCenter.AddBankCard') }}</div>
          <div class="text">
            <!-- {{$t('GeneralUserCenter.AddBankCardtTips_1')}}<span style="color: var(--1, #ff9000);">10</span>{{$t('GeneralUserCenter.AddBankCardtTips_2')}} -->
            <div v-html="$t('GeneralUserCenter.AddBankCardtTips_1')"></div>
          </div>
        </div>
      </template>
      <div class="bank-information" v-for="item in backCardData" :key="item.id">
        <div class="bank-name">
          <div class="img"><img :src="getImgUrl(item.icon)" /></div>
          <div>{{ item.bankname }}</div>
        </div>
        <div class="bank-card-number">
          <div>****</div>
          <div>****</div>
          <div>****</div>
          <div>{{ item.cardNo.substr(-4) }}</div>
        </div>
        <div class="bank-delete">
          <div>{{ $t('GeneralUserCenter.DebitCard') }}</div>
          <div @click="onClickDelete(item)" v-if="backCardData.length > 1">
            {{ $t('GeneralUserCenter.Delete') }}
          </div>
        </div>
      </div>
    </div>
    <!-- 虚拟币 -->
    <div class="virtual-currency" v-if="showBankCard == 1">
      <template v-if="virtualCurrencyData.length < 10">
        <div class="add-bank-card" @click="handledGoBack(1, '1')">
          <img src="./img/add.png" />
          <div class="title">{{ $t('GeneralUserCenter.AddWithdrawalAddress') }}</div>
          <div class="text">
            <!-- {{$t('GeneralUserCenter.AddBankCardtTips_1')}}<span>10</span>{{$t('GeneralUserCenter.AddBankCardtTips_3')}} -->
            <div v-html="$t('GeneralUserCenter.AddBankCardtTips_2')"></div>
          </div>
        </div>
      </template>
      <div class="bank-information" v-for="item in virtualCurrencyData" :key="item.id">
        <div class="bank-name">
          <div class="img"><img :src="virtual_icon" /></div>
          <div>{{ item.currency }}</div>
        </div>
        <div class="virtual-currency-number">
          {{ item.addr.substr(0, 6) }}********{{ item.addr.substr(-6) }}
        </div>
        <div class="bank-delete">
          <div>{{ item.protocol }}</div>
          <div @click="onClickDeleteCryptocy(item)">{{ $t('GeneralUserCenter.Delete') }}</div>
        </div>
      </div>
    </div>
    <!-- EBPAY币 -->
    <div class="virtual-currency" v-if="showBankCard == 2">
      <template v-if="EbPayCurrencyData.length < 2">
        <div class="add-bank-card" @click="handledGoBack(1, '2')">
          <img src="./img/add.png" />
          <div class="title">{{ $t('GeneralUserCenter.AddEbPayWithdrawalAddress') }}</div>
          <div class="text">
            <div v-html="$t('GeneralUserCenter.AddBankCardtTips_3')"></div>
          </div>
        </div>
      </template>
      <div class="bank-information" v-for="item in EbPayCurrencyData" :key="item.id">
        <div class="bank-name">
          <div class="img"><img :src="ebPay_icon" /></div>
          <div>{{ item.currency }}</div>
        </div>
        <div class="virtual-currency-number">
          {{ item.addr.substr(0, 6) }}********{{ item.addr.substr(-6) }}
        </div>
        <div class="bank-delete">
          <div>{{ item.protocol }}</div>
          <div @click="onClickDeleteEbCryptocy(item)">{{ $t('GeneralUserCenter.Delete') }}</div>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <div class="pop-up-layer">
      <el-dialog v-model="dialogVisible" :title="$t('GeneralUserCenter.Delete')" width="30%">
        <span>{{ $t('GeneralUserCenter.DeleteTips_1') }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button class="cancel" @click="dialogVisible = false">{{
              $t('GeneralUserCenter.Cancel')
            }}</el-button>
            <el-button class="sure" type="primary" @click="deleteBankItem">
              {{ $t('GeneralUserCenter.Sure') }}
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import i18n from '@/i18n'
import { computed, onMounted, ref, watch } from 'vue'
import { getImgUrl } from '@/utils/cache'
import virtual_icon from './img/virtual_icon.png'
import ebPay_icon from './img/ebpay_icon.png'
import { useUserStore } from '@/stores/user.js'
const user = useUserStore()

import { getBankList, getCryptocyList, getDeleteBank, getCryptocyDelete } from '@/api/bindInfo'

const emit = defineEmits(['goBack'])

onMounted(() => {
  getList()
})
// 银行卡列表
const backCardData = ref([])
// 虚拟币列表
const virtualCurrencyData = ref([])

// EBPay币列表
const EbPayCurrencyData = ref([])

const getList = () => {
  // 获取银行卡列表
  getBankList().then((res) => {
    backCardData.value = res.data || []
  })
}

// 获取虚拟币列表
const getCryptocy = () => {
  getCryptocyList('USDT').then((res) => {
    virtualCurrencyData.value = res.data || []
  })
}

// 获取EB币列表
const getEbCryptocy = () => {
  getCryptocyList('EB').then((res) => {
    EbPayCurrencyData.value = res.data || []
  })
}
// 当前默认显示银行卡
const showBankCard = ref(0)

const handledGoBack = (n, val) => {
  emit('goBack', n, val)
}

const btnDateComputed = computed(() => {
  const site = import.meta.env.VITE_SITE
  const data = [
    {
      label: i18n.global.t('GeneralUserCenter.BankCard'),
      value: 0
    },
    {
      label: i18n.global.t('GeneralUserCenter.VirtualCurrencyAddress'),
      value: 1
    },
    {
      label: i18n.global.t('GeneralUserCenter.EbPayCurrencyAddress'),
      value: 2
    }
  ]
  if (site === 'cn') {
    return data
  }
  const btnDate = [
    {
      label: i18n.global.t('GeneralUserCenter.BankCard'),
      value: 0
    },
    {
      label: i18n.global.t('GeneralUserCenter.VirtualCurrencyAddress'),
      value: 1
    }
  ]
  return btnDate
})
function changeFrom(n) {
  showBankCard.value = n
}

// 删除弹窗
const dialogVisible = ref(false)

// 删除银行卡
const deleteBankItem = () => {
  if (showBankCard.value == 0) {
    getDeleteBank(bankId.value).then((res) => {
      if (res.data) {
        getList()
        user.getUserInfoAction()
      }
    })
  }
  if (showBankCard.value == 1) {
    getCryptocyDelete(cryptocy.value).then((res) => {
      if (res.data) {
        getCryptocy()
        user.getUserInfoAction()
      }
    })
  }
  if (showBankCard.value == 2) {
    getCryptocyDelete(ebCryptocy.value).then((res) => {
      if (res.data) {
        getEbCryptocy()
        user.getUserInfoAction()
      }
    })
  }
  dialogVisible.value = false
}

// 银行卡id
const bankId = ref('')
// 点击银行卡删除
const onClickDelete = (val) => {
  bankId.value = val.id
  dialogVisible.value = true
}
// 虚拟币id
const cryptocy = ref('')
// 点击虚拟币删除
const onClickDeleteCryptocy = (val) => {
  cryptocy.value = val.id
  dialogVisible.value = true
}
// eb币id
const ebCryptocy = ref('')
// 点击删除Eb币
const onClickDeleteEbCryptocy = (val) => {
  ebCryptocy.value = val.id
  dialogVisible.value = true
}

watch(
  () => showBankCard.value,
  (newValue) => {
    if (newValue == 1) {
      getCryptocy()
    } else if (newValue == 2) {
      getEbCryptocy()
    } else {
      getList()
    }
  }
)
</script>
<style lang="scss" scoped>
.return {
  margin-bottom: 30px;
  border-bottom: 1px solid var(--20, rgba(255, 255, 255, 0.2));
  padding-bottom: 20px;
  .return-width {
    display: flex;
    cursor: pointer;
    width: 200px;
    padding-top: 30px;
    div:nth-child(2) {
      color: var(--100, #fff);

      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      margin-left: 10px;
    }
  }
}
.bank-card {
  display: flex;
  div {
    min-width: 104px;
    height: 40px;
    color: #fff;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    margin-right: 30px;
    padding: 0 8px;
    cursor: pointer;
    margin-bottom: 30px;
    border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
  }
  .active {
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    border: none;
  }
}
.addbackcard,
.virtual-currency {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .add-bank-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 295px;
    height: 126px;
    border-radius: 10px;
    padding: 0 8px;
    border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
    background: #232949;
    cursor: pointer;
    img {
      width: 31px;
      height: 30px;
    }

    .title {
      color: var(--100, #fff);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      margin: 15px 0px 10px 0px;
    }
    .text {
      color: var(--60, rgba(255, 255, 255, 0.6));
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
    }
    span {
      color: var(--1, #ff9000);
    }
  }
  .virtual-currency-number {
    margin-left: 22px;
    color: var(--100, #fff);

    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 50px; /* 123.077% */
  }
  .bank-information {
    width: 295px;
    height: 126px;
    border-radius: 10px;
    border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
    background-color: #171a2f;
    .bank-name {
      display: flex;
      margin: 15px 0 0 20px;
      .img {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      div:nth-child(2) {
        color: var(--60, rgba(255, 255, 255, 0.6));
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px; /* 114.286% */
        margin-left: 8px;
      }
    }
    .bank-card-number {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      margin-left: 20px;
      div {
        color: var(--100, #fff);
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 50px; /* 80% */
      }
    }
    .bank-delete {
      display: flex;
      color: var(--60, rgba(255, 255, 255, 0.6));

      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 133.333% */
      div:nth-child(1) {
        width: 100%;
        padding-left: 23px;
      }
      div:nth-child(2) {
        width: 22%;
        text-align: center;
        margin-right: 15px;
        cursor: pointer;
        line-height: 24px;
        border-radius: 2px;
        border: 0.5px solid var(--20, rgba(255, 255, 255, 0.2));
      }
    }
  }
}
.cancel,
.sure {
  border: none;
  background-color: var(--unnamed, #171a2f);
}
:deep() {
  .el-dialog {
    --el-dialog-width: 25% !important;
    --el-dialog-margin-top: 36vh;
    --el-dialog-bg-color: #232949;
    border-radius: 8px;
  }
  .el-dialog__header {
    margin-right: 0;
    background-color: #323c6f;
    border-radius: 8px 8px 0 0;
    padding: 10px 0 10px 20px;
  }
  .el-dialog__headerbtn {
    position: absolute;
    top: -2px;
  }
  .el-dialog__title {
    color: var(--100, #fff);

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 162.5% */
  }
  .el-button {
    color: var(--40, rgba(255, 255, 255, 0.4));

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .el-button:hover {
    background-color: #f35f1b !important;
    border: none;
    color: var(--color-white, #fff) !important;
  }
  .el-dialog__body {
    color: var(--60, rgba(255, 255, 255, 0.6));

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.01px;
  }
}
</style>
