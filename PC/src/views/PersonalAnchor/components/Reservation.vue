<template>
  <div class="soltBg">
    <el-form :model="searchForm" label-width="auto">
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('AnchorPlay.GameType')">
            <el-radio-group v-model="searchForm.roomStyle" @change="roomStyleBtn">
                <el-radio :label="1" >{{$t('AnchorPlay.Football')}}</el-radio>
                <el-radio :label="3" >{{$t('AnchorPlay.Basketball')}}</el-radio>
                <el-radio :label="4" >{{$t('AnchorPlay.Entertainment')}}</el-radio>
                <el-radio :label="6" >{{$t('AnchorPlay.Other')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-button
          @click="addPlayBtn"
          v-show="searchForm.roomStyle == 4 || searchForm.roomStyle == 6"
          class="resetting"
          style="width: 180px; height: 40px; margin-bottom: 20px"
          >{{$t('AnchorPlay.Create')}}</el-button
        >

        <el-col :span="24" v-show="searchForm.roomStyle == 1 || searchForm.roomStyle == 3">
          <el-form-item :label="$t('AnchorPlay.TeamName')">
            <el-input v-model="searchForm.teamName" style="width: 180px" :placeholder="$t('AnchorPlay.EnterTeamName')" />
          </el-form-item>
          <el-form-item :label="$t('AnchorPlay.LeagueName')">
            <el-input v-model="searchForm.associatedLeague" style="width: 180px" :placeholder="$t('AnchorPlay.EnterLeagueName')" />
          </el-form-item>

          <el-form-item :label="$t('AnchorPlay.KickOffTime')">
            <el-date-picker
              style="width: 360px"
              v-model="searchForm.time"
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
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%; position: relative"
      border
      :row-class-name="rowClassName"
      :header-cell-style="{ background: '#1D223C' }"
    >
      <el-table-column prop="roomStyle" :label="$t('AnchorPlay.ChannelType')"  >
        <template #default="scope">
          <span v-if="scope.row.roomStyle==1">{{$t('AnchorPlay.Football')}}</span>
          <span v-else-if="scope.row.roomStyle==3">{{$t('AnchorPlay.Basketball')}}</span>
          <span v-else-if="scope.row.roomStyle==4">{{$t('AnchorPlay.Entertainment')}}</span>
          <span v-else>{{$t('AnchorPlay.Other')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="associatedLeague"
        :label="$t('AnchorPlay.EventName')"
        v-if="searchForm.roomStyle == 1 || searchForm.roomStyle == 3"  width="160" />
      <el-table-column
        prop="mainName"
        :label="$t('AnchorPlay.TeamA')"
        v-if="searchForm.roomStyle == 1 || searchForm.roomStyle == 3"
      />
      <el-table-column
        prop="cusName"
        :label="$t('AnchorPlay.TeamB')"
        v-if="searchForm.roomStyle == 1 || searchForm.roomStyle == 3"
      />
      <el-table-column
        prop="playStartTime"
        :label="$t('AnchorPlay.KickOffTime')"
        v-if="searchForm.roomStyle == 1 || searchForm.roomStyle == 3"
      >
          <template #default="{ row }">
              <span>{{row.gameTime}}</span>
              <!--getTime(row.gameTime) -->
          </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('AnchorPlay.State')"
        v-if="searchForm.roomStyle == 1 || searchForm.roomStyle == 3"
      >
        <template #default="scope">
            <span v-if="scope.row.status==0">{{$t('AnchorPlay.NoReservation')}}</span>
            <span v-else-if="scope.row.status==1">{{$t('AnchorPlay.ReservationInProgress')}}</span>
            <span v-else>{{$t('AnchorPlay.LiveBroadcast')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="roomTitle"
        :label="$t('AnchorPlay.LiveTitle')"
        v-if="searchForm.roomStyle == 4 || searchForm.roomStyle == 6"
      />
      <el-table-column
        prop="viewPayAmount"
        :label="$t('AnchorPlay.BroadcastPermission')"
        v-if="searchForm.roomStyle == 4 || searchForm.roomStyle == 6"
      />
      <el-table-column
        prop="playStartTime"
        :label="$t('AnchorPlay.BookBroadcastTime')"
        v-if="searchForm.roomStyle == 4 || searchForm.roomStyle == 6"
      />
      <el-table-column :label="$t('AnchorPlay.Operate')" width="230" >
        <template #default="scope">
          <el-button class="searchBtn1 reserved" v-if="scope.row.status==0" @click="handleEdit(scope.$index, scope.row)">{{$t('AnchorPlay.AppointmentBroadcasting')}}</el-button>
          <el-button class="searchBtn1" v-if="scope.row.status==1" @click="reservedBtn(scope.$index, scope.row)">{{$t('AnchorPlay.AlreadyScheduled')}}</el-button>
          <el-button class="searchBtn1" v-if="scope.row.status==1" @click="cancelBtn(scope.row)">{{$t('AnchorPlay.CancelAppointment')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <Pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @update:current-page="handleCurrentPageUpdate"
        @update:page-size="handlePageSizeUpdate"
      />
    </div>
  </div>

  <CustomizeDialog
    :dialogShow="dialogShow"
    @closeBtn="closeBtn"
    :title="$t('AnchorPlay.SelectRelatedEvents')"
    v-if="dialogShow"
  >
    <DebutSubmit :title="$t('AnchorPlay.AppointmentBroadcasting')" :type="2" :KickOffTime="KickOffTime" :gameId="gameId" :associatedLeague="associatedLeague" :mainName="mainName" :cusName="cusName" :uid="uid" v-if="dialogShow" @debutClick="debutClick" :resource="searchForm.roomStyle" />
  </CustomizeDialog>
</template>

<script setup>
import i18n from '@/i18n'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import DebutSubmit from './DebutSubmit.vue'
import {getReserveList,getCancel} from '@/api/liveBroadcast'
import { onMounted } from 'vue';
import { defaultTime } from "@/utils/config";
import { useLiveStore } from '@/stores/liveBroadcast'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const userInfo = computed(() => {
  return user.userInfo
})
const liveStore=useLiveStore()
const dialogShow = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(20)
const uid=ref(0)//修改用的
const gameId=ref()//足球 篮球 用的 赛事id
const associatedLeague=ref()//赛事名称
const mainName=ref()//足球 篮球 用的 赛事id
const cusName=ref()//赛事名称
const KickOffTime = ref() // 开赛时间
const searchForm = ref({
  dataResource:4,
  roomStyle: 1,
  time:[],
  gameTimeEnd:'',
  gameTimeStart:'',
  pageNum:1,
  pageSize:10,
  teamName:'',
  presenterId:userInfo.value.id,
  associatedLeague:''
})
const tableData = ref([])
onMounted(()=>{
  getMatchList()
})
//筛选
const roomStyleBtn=(value)=>{
  searchForm.value.roomStyle=value
  getMatchList()
}
const getMatchList=async ()=>{
    try {
        let res= await getReserveList(searchForm.value)
        if(res.code==200){
            tableData.value=[]
            tableData.value=res.data.list
            total.value=res.data.total
        }else{
            tableData.value=[]
        }
    } catch (e) {
        console.log(e.message)
    }
}
const resettingBtn=()=>{
    searchForm.value.associatedLeague=''
    searchForm.value.roomStyle=1
    searchForm.value.gameTimeEnd=''
    searchForm.value.gameTimeStart=''
    searchForm.value.teamName=''
    searchForm.value.time=[]
    getMatchList()
}

const searchBtn=()=>{
  if(searchForm.value.time){
    searchForm.value.gameTimeStart=searchForm.value.time[0]
    searchForm.value.gameTimeEnd=searchForm.value.time[1]
  }else{
    searchForm.value.gameTimeEnd=''
    searchForm.value.gameTimeStart=''
  }
  getMatchList()
}
const closeBtn = (type) => {
  dialogShow.value = type
}
// 处理分页参数更新事件
const handleCurrentPageUpdate = (newPage) => {
  console.log(newPage, 'newPage')
  currentPage.value = newPage
  searchForm.value.pageNum=newPage
  getMatchList()
}
//预约开播
const handleEdit = (index,row) => {
  console.log(row,'row')
  uid.value=0
  dialogShow.value = true
  gameId.value=row.gameId
  associatedLeague.value=row.associatedLeague
  mainName.value=row.mainName
  cusName.value=row.cusName
  KickOffTime.value = row.gameTime
}
//已预约开播 修改 直播间
const reservedBtn=(index,row)=>{
  uid.value=row.id
  dialogShow.value = true
  if(searchForm.roomStyle == 1 || searchForm.roomStyle == 3){
    gameId.value=row.gameId
    associatedLeague.value=row.associatedLeague
    mainName.value=row.mainName
    cusName.value=row.cusName
  }
}
//取消预约
const cancelBtn=async (row)=>{
  ElMessageBox.confirm(i18n.global.t('AnchorPlay.CancelReservation'), i18n.global.t('AnchorPlay.Tips'), {
        confirmButtonText: i18n.global.t('AnchorPlay.Sure'),
        cancelButtonText: i18n.global.t('AnchorPlay.Cancel'),
        type: 'warning'
    }).then(() => {
        try {
         getCancel({id:row.id,roomStyle:row.roomStyle}).then((res)=>{
            if(res.code==200){
              ElMessage({
                  message: i18n.global.t('AnchorPlay.CancelSuccess'),
                  type: 'success'
              })
              getMatchList()
              liveStore.anchorCount(userInfo.value.id)
            }else{
              ElMessage.error(res.msg)
            }
         })
      } catch (e) {
          console.log(e.message)
      }
    }).catch(() => { });
  
}
const addPlayBtn = () => {
  uid.value=0
  dialogShow.value = true
}
const handlePageSizeUpdate = (newSize) => {
  console.log(newSize, 'newSize')
  pageSize.value = newSize
  searchForm.value.pageSize=newPage
  getMatchList()
}
//回掉
const debutClick=()=>{
  uid.value=0
  dialogShow.value=false
  getMatchList()
  liveStore.anchorCount(userInfo.value.id)
}
const rowClassName = ({ row }) => {
  // 检查行数据的id是否等于1，如果是，返回自定义的类名
  if (row.id === 1) {
    return 'red-row' // 自定义的类名
  }
  // 如果不是，返回空字符串
  return ''
}
</script>

<style lang="scss" scoped>
.soltBg :deep() {
  .el-radio__input.is-checked .el-radio__inner{
    border-color: #F35F1B;
    background: #F35F1B;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color: #F35F1B;
  }
  .el-radio__inner {
    background-color: #272b45;
    border: 1px solid #9292bf;
  }
  .el-radio__inner:hover{
    border-color: #F35F1B !important;
  }
  .is-checked .el-radio__inner {
    background-color: #409eff;
    border: 1px solid #9292bf;
  }
  .el-input__wrapper {
    background-color: #232949;
    border:0;
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
  .el-form-item__label,
  .el-radio__label,
  .el-input__inner {
    color: #fff;
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
  .red-row > td.el-table__cell {
    background: rgba(13, 34, 141, 0.6);
    color: white !important;
  }
  .el-form-item__label{
    margin-left: 10px;
  }
  .el-form-item__label-wrap{
    margin-left: 0 !important
  }
  // .red-row::before {
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 0;
  //     height: 0;
  //     border-left: 10px solid transparent; /* 左边边框 */
  //     border-bottom: 10px solid red; /* 底部边框，颜色与背景一致 */
  // }
}

.searchBtn1 {
  min-width: 87px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 2px;
  border: 1px solid var(--unnamed, #f35f1b);
  background: #232949;
  color: #f35f1b;
  margin-bottom: 5px;
}
.reserved{
  color: var(--unnamed, #409EFF);
  border: 1px solid var(--unnamed, #409EFF);
}
.searchBtn{
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
  margin-left: 26px !important;
}
.soltBg .footer {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>
