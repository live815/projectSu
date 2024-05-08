// 资金明细
import { defineStore } from 'pinia'
import { getListByDate } from '@/api/financialDetails'
import { showLoadingToast, closeToast } from 'vant'
import { getTimeStampByPassDay } from '@/utils'
import dayjs from 'dayjs'
import i18n from '@/i18n/index'

export const useFinancialStore = defineStore('financial', {
  id: 'financial',
  state: () => ({
    orderStatus: '', // 交易订单统一状态：为空-查询全部、处理中（0）、成功（1）、失败（2）
    orderType: '', // 交易订单类型(为空-查询全部、1-充值、2-提现)
    pageNum: 1, // 当前页面
    pageSize: 10, // 每页显示记录数
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    dataList: [], // 列表数据
    total: 0 // 当前数据总数
  }),
  getters: {
    getOrderStatus: (state) => state.orderStatus,
    getOrderType: (state) => state.orderType,
    getStartTime: (state) => state.startTime,
    getEndTime: (state) => state.endTime,
    getDataList: (state) => state.dataList,
    getPageNum: (state) => state.pageNum,
    getTotal: (state) => state.total
  },
  actions: {
    // 改变交易订单状态
    changeOrderStatus(index) {
      this.orderStatus = index
    },
    // 改变交易订单类型
    changeOrderType(index) {
      this.orderType = index
    },
    changePageNum() {
      this.pageNum += 1
    },
    // 重置信息
    changeResets() {
      this.orderType = ''
      this.orderStatus = ''
      this.pageNum = 1
      this.pageSize = 10
      ;(this.startTime = ''), (this.endTime = '')
    },
    // 重置这个数组
    changeResetsDataList() {
      this.dataList = []
      this.pageNum = 1
    },
    // 获取时间间隔时间
    handleSetTime(days) {
      return new Promise((resolve) => {
        const timeData = getTimeStampByPassDay(days)
        this.endTime = dayjs.unix(timeData[0] / 1000).format('YYYY-MM-DD HH:mm:ss')
        this.startTime = dayjs.unix(timeData[1] / 1000).format('YYYY-MM-DD HH:mm:ss')
        resolve()
      })
    },
    // 获取列表数据
    getList(data) {
      showLoadingToast({
        message: i18n.global.t('common.loading'),
        forbidClick: true,
        duration: 0
      })
      return getListByDate(data)
        .then((res) => {
          // 在这里处理数据拼接
          const newData = res.data.rows || [] // 获取新的数据
          this.total = res.data.total
          // 判断是否是第一次获取数据（this.dataList 为空），直接赋值
          if (this.dataList.length === 0) {
            this.dataList = newData
          } else {
            // 如果不是第一次获取数据，则进行拼接
            this.dataList = this.dataList.concat(newData)
          }
          closeToast()
        })
        .catch(() => {
          closeToast()
        })
    }
  }
})
