<template>
    <div class="soltBg">
        <el-form
            :model="searchForm" 
            label-min-width="100px"
        >
            <el-form-item :label="$t('AnchorPlay.TeamName')" >
                <el-input v-model="searchForm.teamName" style="width: 220px;" :placeholder="i18n.global.t('AnchorPlay.SelectRelatedEvents')"  />
            </el-form-item>
            <el-form-item :label="$t('AnchorPlay.LeagueName')" style="margin-left: 20px;">
                <el-input v-model="searchForm.leagueName" style="width: 220px;"  :placeholder="i18n.global.t('AnchorPlay.EnterLeagueName')"  />
            </el-form-item>
            <el-form-item class="btnTab">
                <el-button  class="searchBtn"  @click="resettingBtn">{{$t('AnchorPlay.Reset')}}</el-button>
                <el-button  class="resetting"  @click="searchBtn">{{$t('AnchorPlay.Search')}}</el-button>
            </el-form-item>
            <el-form-item :label="$t('AnchorPlay.GameType')" style="margin-left: 20px;">
                <el-radio-group v-model="searchForm.sportsType" style="width: 220px;">
                    <el-radio :label="1">{{$t('AnchorPlay.Football')}}</el-radio>
                    <el-radio :label="3">{{$t('AnchorPlay.Basketball')}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('AnchorPlay.KickOffTime')" >
                <el-date-picker
                    style="width: 360px;"
                    v-model="searchForm.time"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    type="datetimerange"
                    :range-separator="$t('AnchorPlay.To')"
                    :start-placeholder="$t('AnchorPlay.StartingTime')"
                    :end-placeholder="$t('AnchorPlay.EndTime')"
                    :default-time="defaultTime"
                    />
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%" border  :header-cell-style="{ background: '#1D223C' }">
            <el-table-column prop="sportsTypeName" :label="$t('AnchorPlay.GameType')" width="80" />
            <el-table-column prop="leagueNameLocal" :label="$t('AnchorPlay.EventName')" width="200" show-overflow-tooltip />
            <el-table-column prop="mainNameLocal" :label="$t('AnchorPlay.TeamA')" show-overflow-tooltip  />
            <el-table-column prop="cusNameLocal" :label="$t('AnchorPlay.TeamB')"  show-overflow-tooltip  />
            <el-table-column prop="gameTime" :label="$t('AnchorPlay.KickOffTime')"  show-overflow-tooltip width="160">
                <template #default="{ row }">
                    <span>{{row.gameTime}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gameStatus" :label="$t('AnchorPlay.State')"  width="80">
                <template #default="{row}">
                    <span v-show="row.gameStatus==0">{{$t('AnchorPlay.NotStartedYet')}} </span>
                    <span v-show="row.gameStatus==1">{{$t('AnchorPlay.Started')}} </span>
                    <span v-show="row.gameStatus==2">{{$t('AnchorPlay.Over')}} </span>
                    
                </template>
            </el-table-column>
            <el-table-column :label="$t('AnchorPlay.Operate')">
                <template #default="scope">
                    <el-button class="searchBtn" @click="handleEdit(scope.$index, scope.row)">{{$t('AnchorPlay.Sure')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer">
            <Pagination
                v-if="total> 0"
                :current-page="searchForm.page"
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
import {getVideoList} from '@/api/liveBroadcast'
import { onMounted } from 'vue';
import { defaultTime } from "@/utils/config";
const emit=defineEmits(['anchorSubmit'])
const total = ref(0);
const searchForm=ref({
    leagueName:'',
    sportsType:1,
    time:[],
    gameTimeEnd:'',
    gameTimeStart:'',
    page:1,
    pageSize:10,
    teamName:''
})
const tableData =ref([])
// 处理分页参数更新事件
const handleCurrentPageUpdate = (newPage) => {
    searchForm.value.page = newPage;
    getMatchList()
}
const handleEdit=(index,row)=>{
    emit('anchorSubmit',row)
}
const handlePageSizeUpdate = (newSize) => {
    searchForm.value.pageSize = newSize;
    getMatchList()
}
const resettingBtn=()=>{
    searchForm.value.leagueName=''
    searchForm.value.sportsType=1
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
    } else{
        searchForm.value.gameTimeEnd=''
        searchForm.value.gameTimeStart=''
    }
    getMatchList()
}
onMounted(()=>{
    getMatchList()
})
const getMatchList=async ()=>{
    try {
        let res= await getVideoList(searchForm.value)
        if(res.code==200){
            tableData.value=[]
            tableData.value=res.data.list
            total.value=res.data.total
            console.log(total.value,'total.value')
        }else{
            tableData.value=[]
        }
    } catch (e) {
        console.log(e.message)
    }
}
</script>

<style lang="scss" scoped>
.soltBg  :deep(){
    .el-input__wrapper{
     background-color:#232949;
     border:0;
    }
    .el-form-item {
        display: inline-flex;
        vertical-align: middle;
    }
    .el-range-input{
        color: #fff;
    }
    .el-range-separator{
        color:  #999da6;
    }
    .el-table__inner-wrapper,.el-table__header-wrapper,.el-table .el-table__cell,.el-table__row{
        background: #232949;
        color: #fff;
        border: 0;
        --el-table-border-color: none;
    }
    .el-table__cell{
        
        border-bottom: 1px solid rgba(255, 255, 255, 0.20) !important;
    }
    .el-table--border .el-table__inner-wrapper::after, .el-table--border::after, .el-table--border::before, .el-table__inner-wrapper::before {
        content: "";
        position: absolute;
        background-color: rgba(255, 255, 255, 0.20);
        z-index: 3;
    }
    .el-table__body tr:hover>td.el-table__cell{
        background-color:#232949
    }
}
.searchBtn{
    width: 88px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 6px;
    border: 1px solid var(--unnamed, #F35F1B);
    background: #232949;
    color: #F35F1B;
}
.resetting{
    width: 88px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 6px;
    background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
    color: #fff;
    border: 0;
}
 .btnTab  :deep().el-form-item__content{
    margin-left: 80px !important;
}
.soltBg .footer{
    display: flex;
    justify-content: end;
    margin-top: 20px;
}
</style>