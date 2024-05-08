<template>
  <div class="list" ref="listUlRef" @scroll="handleScroll">
    <template v-if="onComputedDataList.length > 0">
      <div class="list-item" v-for="day in onComputedDataList" :key="day.date">
        <div class="list-item-top">
          <div class="list-item-top-title">{{ dayjs(day.date).format(`YYYY-MM-DD`) }}</div>
          <div class="list-item-top-text">
            <div class="list-item-top-text-left">
              {{ $t('Transactrecord.totalrevenue') }}
              {{ day.totalAmount ? toFormatNumber(Number(day.totalAmount)) : 0 }}
            </div>
            <div>
              {{ $t('Transactrecord.Totalbilling') }}
              {{ day.totalActualAmt ? toFormatNumber(Number(day.totalActualAmt)) : 0 }}
            </div>
          </div>
        </div>
        <ul class="list-ul">
          <li
            class="list-ul-li"
            v-for="item in day.items"
            :key="item.orderNo"
            @click="onClickItem(item)"
          >
            <div class="list-ul-li-left">
              <img class="img" :src="imgUrl(item.bizType)" />
              <div class="list-ul-li-left-text">
                <div v-if="item.bizType == 1">{{ $t('Transactrecord.topup') }}</div>
                <div v-if="item.bizType == 2">{{ $t('Transactrecord.withdraw') }}</div>
                <div v-if="item.bizType == 3">{{ $t('Transactrecord.transfer') }}</div>
                <div v-if="item.bizType == 5">{{ $t('Transactrecord.rebate') }}</div>
                <div v-if="item.bizType == 6">{{ $t('Transactrecord.dividend') }}</div>
                <div v-if="item.bizType == 7">{{ $t('Transactrecord.Systemadjust') }}</div>
                <div v-if="item.bizType == 8">{{ $t('Transactrecord.livestream') }}</div>
                <div class="text">{{ item.createTime }}</div>
              </div>
            </div>
            <div class="list-ul-li-right">
              <div class="list-ul-li-right-text">
                <div class="titile">
                  <CurrencyUnit /> <span v-if="item.transactionType == 1">-</span
                  >{{ toFormatNumber(item.amount) }}
                </div>
                <div class="text" v-if="item.orderStatus == 1">
                  {{ $t('Transactrecord.success') }}
                </div>
                <div class="text" v-if="item.orderStatus == 2" style="color: #f53f3f">
                  {{ $t('Transactrecord.fail') }}
                </div>
                <div class="text" v-if="item.orderStatus == 0" style="color: #f53f3f">
                  {{ $t('Transactrecord.Process') }}
                </div>
                <div class="text" v-if="item.orderStatus == 3" style="color: #ff976a">
                  {{ $t('Transactrecord.UnderReview') }}
                </div>
              </div>
              <div>
                <van-icon name="arrow" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div
        class="list-title"
        v-if="financial.getTotal > 10 && financial.getTotal == financial.getDataList.length"
      >
        {{ $t('Transactrecord.nomore') }}
      </div>
    </template>
    <template v-else>
      <div class="list-examine">
        <img class="list-examine-img" :src="examine" />
        <div class="list-examine-title">{{ $t('Transactrecord.tip2') }}</div>
        <div
          v-if="financial.getOrderType == '1'"
          class="list-examine-button"
          @click="router.push('/deposit')"
        >
          {{ $t('Transactrecord.rechargenow') }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import examine from './img/examine.png'
import { useRouter } from 'vue-router'
import { toFormatNumber } from '@/utils'
import dayjs from 'dayjs'
import { useFinancialStore } from '@/stores/financial'
import i18n from '@/i18n'
import { throttle } from 'lodash'

const financial = useFinancialStore()

const router = useRouter()
const orderInfo = reactive({
  endTime: computed(() => financial.getStartTime),
  orderStatus: computed(() => financial.getOrderStatus),
  orderType: computed(() => financial.getOrderType),
  pageNum: computed(() => financial.getPageNum),
  pageSize: 10,
  startTime: computed(() => financial.getEndTime)
})

// 处理出来的值
const onComputedDataList = computed(() => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const grouped = {}
  if (financial.getDataList.length > 0) {
    for (const item of financial.getDataList) {
      const date = new Date(item.orderTime)
      if (date >= thirtyDaysAgo) {
        const formattedDate = date.toLocaleDateString()
        if (!grouped[formattedDate]) {
          grouped[formattedDate] = {
            date: formattedDate,
            totalAmount: 0,
            totalActualAmt: 0,
            items: []
          }
        }
        grouped[formattedDate].items.push(item)
        // 总进账
        if (item.transactionType == 0 && item.orderStatus == '1') {
          grouped[formattedDate].totalAmount += item.amount
        }
        // 总出账
        if (item.transactionType == 1 && item.orderStatus == '1') {
          grouped[formattedDate].totalActualAmt += item.amount
        }
      }
    }
  }
  return Object.values(grouped)
})
// 引入本地图片
const imgUrl = (num) => {
  return new URL(`./img/listImg${num}.png`, import.meta.url).href
}

// 点击当前项
const onClickItem = (val) => {
  router.push({ path: '/financialDetailsView', query: val })
}

// 监听滚动
const listUlRef = ref(null)
// 标记是否正在加载下一页数据
let isLoadingNextPage = false
// 组件挂载时绑定滚动事件
onMounted(() => {
  const listUlElement = listUlRef.value
  if (listUlElement) {
    listUlElement.addEventListener('scroll', handleScrollThrottled)
  }
})

// 组件卸载时移除滚动事件
onUnmounted(() => {
  const listUlElement = listUlRef.value
  if (listUlElement) {
    listUlElement.removeEventListener('scroll', handleScrollThrottled)
  }
})

// 滚动事件处理函数
const handleScroll = () => {
  const listUlElement = listUlRef.value
  if (listUlElement) {
    const isScrolledToBottom = listUlElement.scrollHeight - listUlElement.scrollTop
    // 滚动到了底部且当前页面数组不为空
    if (
      isScrolledToBottom &&
      financial.getTotal > financial.getDataList.length &&
      !isLoadingNextPage
    ) {
      // 标记为正在加载下一页数据，避免重复加载
      isLoadingNextPage = true

      financial.changePageNum()
      try {
        // 调用接口获取数据，假设 fetchData 是一个异步函数
        // 调用接口获取数据，假设 fetchData 是一个异步函数
        financial.getList(orderInfo).finally(() => {
          // 数据加载完成后，重置标记
          isLoadingNextPage = false
        })
        // financial.getList(orderInfo)
        // isLoadingNextPage = false
      } catch (error) {
        console.error(i18n.global.t('Transactrecord.tip3'), error)
        // 发生错误时也要重置 isLoadingNextPage 为 false
        isLoadingNextPage = false
      }
    }
  }
}
// 节流滚动处理函数
const handleScrollThrottled = throttle(handleScroll, 500) // 设置时间间隔为200毫秒
</script>
<style lang="scss" scoped>
.list {
  height: calc(var(--app-height) - 141px);
  overflow-y: scroll;
  overflow-anchor: none;
  .list-item {
    // min-height: 100vh;
    // height: calc(var(--app-height) - 141px);
    // overflow-y: scroll;
    // overflow-anchor: none;
    .list-item-top {
      margin-left: 15px;
      height: 70px;
      background: #f7f7f7;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .list-item-top-title {
        color: #111;
        font-size: 14px;
        margin-bottom: 5px;
      }
      .list-item-top-text {
        display: flex;
        color: #999;
        font-size: 12px;
        .list-item-top-text-left {
          margin-right: 15px;
        }
      }
    }
    .list-ul {
      background: #fff;

      .list-ul-li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 62.5px;
        .list-ul-li-left {
          display: flex;
          align-items: center;
          margin-left: 15px;
          .img {
            width: 40px;
            height: 40px;
            margin-right: 12px;
          }
          .list-ul-li-left-text {
            color: #111;
            font-size: 16px;
            .text {
              color: #999;
              font-size: 12px;
              margin-top: 5px;
            }
          }
        }
        .list-ul-li-right {
          display: flex;
          align-items: center;
          margin-right: 15px;
          .list-ul-li-right-text {
            margin-right: 12px;
            .titile {
              color: #000;
              font-family: DIN Alternate;
              font-size: 20px;
              font-weight: 700;
              margin-bottom: 5px;
            }
            .text {
              font-size: 12px;
              color: #00b42a;
              text-align: right;
            }
          }
        }
      }
    }
  }
  .list-title {
    text-align: center;
    font-size: 16px;
    margin: 20px 0;
  }
  .list-examine {
    text-align: center;
    .list-examine-img {
      width: 200px;
      height: 125.644px;
      margin-top: 85px;
    }
    .list-examine-title {
      color: #999;
      margin-bottom: 70px;
      text-align: center;

      font-size: 14px;
    }
    .list-examine-button {
      width: 325px;
      height: 50px;
      text-align: center;
      margin: 0 auto;
      line-height: 50px;
      border-radius: 6px;
      font-size: 15px;
      color: #fff;
      text-align: center;
      background: linear-gradient(90deg, #ff9000 16%, #ff5000 87.23%);
    }
  }
}
</style>
