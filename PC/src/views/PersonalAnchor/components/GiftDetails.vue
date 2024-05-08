<template>
  <div class="soltBg">
    <el-form :model="searchForm" label-width="100px">
      <el-form-item :label="$t('AnchorPlay.GiftTime')">
        <el-date-picker
          style="width: 360px"
          v-model="time"
          type="datetimerange"
          value-format="YYYY-MM-DD HH:mm:ss"
          :range-separator="$t('AnchorPlay.To')"
          :start-placeholder="$t('AnchorPlay.StartingTime')"
          :end-placeholder="$t('AnchorPlay.EndTime')"
          :default-time="defaultTime"
        />
      </el-form-item>
      <el-form-item class="btnTab">
        <el-button class="searchBtn" @click="resettingBtn">{{$t('AnchorPlay.Reset')}}</el-button>
        <el-button class="resetting" @click="searchBtn">{{$t('AnchorPlay.Search')}}</el-button>
      </el-form-item>
      <el-form-item style="text-align: right; float: right">
        <!-- <div class="txtCount">{{$t('AnchorPlay.Total')}}{{ total }}{{$t('AnchorPlay.PieceTips')}}{{ moneyCount }}</div> -->
        <div class="txtCount">{{$t('AnchorPlay.PieceTips',{total,moneyCount})}}</div>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{ background: '#1D223C' }"
    >
      <el-table-column prop="giftName" :label="$t('AnchorPlay.GiftName')" />
      <el-table-column prop="memberName" :label="$t('AnchorPlay.Nickname')" />
      <el-table-column prop="giftTotalAmount" :label="$t('AnchorPlay.GiftValue')" />
      <el-table-column prop="giveToTime" :label="$t('AnchorPlay.GiftTimes')" />
    </el-table>
    <div class="footer">
      <Pagination
        :current-page="searchForm.pageNum"
        :page-size="searchForm.pageSize"
        :total="total"
        @update:current-page="handleCurrentPageUpdate"
        @update:page-size="handlePageSizeUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import Pagination from '@/components/Pagination/Pagination.vue'
import { getAnchorGiftList, getProfitSum } from '@/api/liveBroadcast'
import { onMounted } from 'vue'
import { defaultTime } from '@/utils/config'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const userInfo = computed(() => {
  return user.userInfo
})
const searchForm = ref({
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
  presenterId: userInfo.value.id
})
const total = ref(0)
const time = ref([])
const tableData = ref([])
onMounted(() => {
  getGameList()
  getMoney()
})
const moneyCount = ref('')
// const moneyCount= computed(() => {
//   return tableData.value.reduce((sum, item) => sum + item.giftTotalAmount, 0);
// })
//列表
const getGameList = async () => {
  try {
    let res = await getAnchorGiftList(searchForm.value)
    tableData.value = res.data.list
    total.value = res.data.total
  } catch (e) {
    console.log(e)
  }
}
const getMoney = async () => {
  try {
    let res = await getProfitSum(searchForm.value)
    moneyCount.value = res.data.totalAmount
  } catch (e) {
    console.log(e)
  }
}
const searchBtn = () => {
  if (time.value) {
    searchForm.value.beginTime = time.value[0]
    searchForm.value.endTime = time.value[1]
  } else {
    searchForm.value.beginTime = null
    searchForm.value.endTime = null
  }
  getGameList()
  getMoney()
}
const resettingBtn = () => {
  searchForm.value.beginTime = null
  searchForm.value.endTime = null
  time.value = []
  getGameList()
  getMoney()
}
// 处理分页参数更新事件
const handleCurrentPageUpdate = (newPage) => {
  console.log(newPage, 'newPage')
  searchForm.value.pageNum = newPage
  getGameList()
  getMoney()
}

const handlePageSizeUpdate = (newSize) => {
  console.log(newSize, 'newSize')
  searchForm.value.pageSize = newSize
  getGameList()
  getMoney()
}
</script>

<style lang="scss" scoped>
.soltBg :deep() {
  .el-input__wrapper {
    background-color: #232949;
    border: 0;
  }
  .el-form-item {
    display: inline-flex;
    vertical-align: middle;
  }
  .el-range-input {
    color: #fff;
  }
  .el-range-separator {
    color: #999da6;
  }
  .el-table__inner-wrapper,
  .el-table__header-wrapper,
  .el-table .el-table__cell,
  .el-table__row {
    background: #232949;
    color: #fff;
    border: 0;
    --el-table-border-color: none;
  }
  .el-form-item__label,
  .el-radio__label,
  .el-input__inner {
    color: #fff;
  }
  .el-table__cell {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
  }
  .el-table--border .el-table__inner-wrapper::after,
  .el-table--border::after,
  .el-table--border::before,
  .el-table__inner-wrapper::before {
    content: '';
    position: absolute;
    background-color: rgba(255, 255, 255, 0.2);
    z-index: 3;
  }
  .el-table__body tr:hover > td.el-table__cell {
    background-color: #232949;
  }
}

.soltBg {
  min-height: 500px;
  padding-top: 30px;
}
.searchBtn {
  width: 88px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid var(--unnamed, #f35f1b);
  background: #232949;
  color: #f35f1b;
}
.resetting {
  width: 88px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  color: #fff;
  border: 0;
}
.btnTab :deep().el-form-item__content {
  margin-left: 80px !important;
}
.soltBg .footer {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
.txtCount {
  color: var(--60, rgba(255, 255, 255, 0.6));
  text-align: center;
  
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 114.286% */
}
</style>
