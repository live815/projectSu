<template>
  <div>
    <div class="mid-box top15">
      <div class="select">
        <div class="select-box onemore">
          <div class="left-title">{{ $t('Wletter.Benefittype') }}</div>
          <div class="left-mask">
            <van-field
              class="van-input"
              readonly
              clickable
              label=""
              :placeholder="welfareTypeName"
              @click="handleClick('bit')"
            />
          </div>
        </div>
        <div class="select-box">
          <div class="left-title">{{ $t('Wletter.Viewtime') }}</div>
          <div class="left-mask">
            <van-field
              class="van-input"
              readonly
              clickable
              label=""
              :placeholder="$t('Wletter.tip62')"
              @click="handleClick('time')"
            />
          </div>
        </div>
      </div>
      <div class="tab-box">
        <van-tabs v-model:active="active" @click-tab="onClickTab">
          <van-tab
            v-for="item in tabList"
            :key="item.value"
            :title="item.title"
            @click="onClickTab(item)"
            :name="item.value"
          >
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <EmptyBox v-show="!welfareListData" />

    <div v-if="welfareListData != null">
      <div v-for="item in welfareListData" :key="item.id">
        <ListItem @receiveWelfare="receiveWelfare" :itemInfo="item" />
      </div>
    </div>

    <BenefitType v-model:showPicker="showPicker" @updateFiler="updateFiler"></BenefitType>
    <TimeDialog v-model:showTime="showTime" @updateTimeStamp="updateTimeStamp"></TimeDialog>
  </div>
</template>

<script setup>
const demo = () => {}
import BenefitType from './BenefittypeComp.vue'
import TimeDialog from './TimeDialogComp.vue'
import ListItem from './ListItemComp'
import EmptyBox from './EmptyBoxComp.vue'
import { ref } from 'vue'
import { getWelfareListApi, receiveWelfareApi } from '@/api/welfare'
import i18n from '@/i18n'

onMounted(() => {
  getWelfareList()
})
const emit = defineEmits(['updateType'])
// 初始化请求
const loading = ref(true)
const formData = ref({
  pageNum: 1,
  pageSize: 30,
  sendTimeEnd: '',
  sendTimeStart: '',
  status: '',
  type: ''
})

// 获取数据
const rowList = ref([])
const getWelfareList = () => {
  console.log(formData.value)
  getWelfareListApi(formData.value)
    .then((res) => {
      if (res.data) {
        rowList.value = res.data.records
        rowList.value.sort((a, b) => {
          return a.status - b.status
        })
      } else {
        rowList.value = []
      }
      loading.value = false
    })
    .catch((rej) => {
      console.log(rej)
    })
}
// 筛选数据
const welfareListData = computed(() => {
  if (rowList.value && rowList.value.length > 0) {
    return rowList.value
  } else {
    return null
  }
})

// 领取福利
const receiveWelfare = (item) => {
  receiveWelfareApi(item.id).then((res) => {
    getWelfareList()
  })
}

const showPicker = ref(false) //福利组件开关
const showTime = ref(false) //时间组件开关
const tabList = ref([
  { value: '', title: i18n.global.t('Wletter.all') },
  { value: '1', title: i18n.global.t('Wletter.Tobecollected') },
  { value: '2', title: i18n.global.t('Wletter.Received') },
  { value: '3', title: i18n.global.t('Wletter.expired') }
])
const active = ref(0)
// 开启福利类型or查看时间选项
function handleClick(icon) {
  if (icon == 'bit') {
    showPicker.value = true
  } else if (icon == 'time') {
    showTime.value = true
  }
}

// 领取状态tab切换
function onClickTab(val) {
  formData.value.status = val.name
  getWelfareList()
}

// BenefitType组件传回福利类型数据接收
const welfareTypeFilter = ref('') //福利类状态码
const welfareName = {
  all: '',
  cash: 1,
  cashRoll: 2,
  deposit: 3,
  journal: 4,
  item: 5
}
const welfareTypeName = computed(() => {
  switch (welfareTypeFilter.value) {
    case welfareName.all:
      return i18n.global.t('Wletter.all')
    case welfareName.cash:
      return i18n.global.t('Wletter.cash')
    case welfareName.cashRoll:
      return i18n.global.t('Wletter.cashcoupons')
    case welfareName.deposit:
      return i18n.global.t('Wletter.depositcoupon')
    case welfareName.journal:
      return i18n.global.t('Wletter.Turnovercoupons')
    case welfareName.item:
      return i18n.global.t('Wletter.physicalobject')
    default:
      return i18n.global.t('Wletter.all')
  }
})
function updateFiler(type) {
  welfareTypeFilter.value = type
  formData.value.type = type
  formData.value.sendTimeStart = ''
  formData.value.sendTimeEnd = ''
  getWelfareList()
  // 传回类型判断是否显示头部统计
  emit('updateType', type)
}

//TimeDialog组件传回时间戳
function updateTimeStamp(start, end) {
  console.log(end)
  formData.value.sendTimeStart = start
  formData.value.sendTimeEnd = end
  getWelfareList()
}
</script>
<style lang="scss" scoped>
.top15 {
  margin-top: 15px;
}

.tab-box {
  @include tabStyle();
  margin-top: 5px;
}

.content {
  @include mobile-padding();

  .mid-box {
    margin-left: 15px;
    width: 345px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #fff;

    .select {
      display: flex;
      background-color: #fff;
      padding: 7px 5px 0 15px;
      border-radius: 10px;
      background: #fff;

      .van-field__right-icon {
        padding: 0;
      }

      .select-box {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: grey;

        .left-title {
          white-space: nowrap;
          color: #666;
          text-align: center;

          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
        }

        .left-mask {
          border-radius: 6px;

          .van-input {
            margin: 0 15px 0 5px;
            padding: 2px 0 0 8px;
            max-width: 94px;
            height: 30px;
            border-radius: 6px;
            border: 1px solid #eee;
            background: #f5f5f5;
            --van-field-placeholder-text-color: #111111;
            font-size: 8px;
          }

          .van-input::after {
            content: '';
            font-family: 'Font Awesome';
            display: inline-block;
            position: absolute;
            top: 11px;
            left: 75px;
            width: 11px;
            height: 9px;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 6px solid #999;
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}
:deep() {
  .van-field__body {
    font-size: 12px;
  }
}
</style>
