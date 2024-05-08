<template>
    <div class="viewMap-dialog" v-loading="loading">
        <el-dialog v-model="props.viewMapShow" width="50%" title="修改映射" :before-close="cancel"
            :close-on-click-modal="false">
            
        <div>
            <div class="fbDiv">{{ $t('live.Scheduleplan13') }}</div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="leagueName" align="center"  label="联赛" width="260" >
                    <template #default="{ row }">
                        <p>{{ row.leagueName ? row.leagueName : "-" }}</p>
                        <p>{{ row.leagueNameCn ? row.leagueNameCn : "-" }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="leagueId" align="center"  label="赛事id" width="80" />
                <el-table-column prop="sportsTypeName" align="center"  label="赛事类型"  width="80" />
                <el-table-column prop="Name" align="center" label="主队" >
                    <template #default="{ row }">
                        <p>{{ row.mainName ? row.mainName : "-" }}</p>
                        <p>{{ row.mainNameCn ? row.mainNameCn : "-" }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="Name" align="center"  label="客队" >
                    <template #default="{ row }">
                        <p>{{ row.cusName ? row.cusName : "-" }}</p>
                        <p>{{ row.cusNameCn ? row.cusNameCn : "-" }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="gameTime" align="center"  label="比赛开始时间" width="160" />
            </el-table>
        </div>
        <div>
            <div style="display: flex;align-items: center;">
                <div class="pmDiv">{{ $t('live.Scheduleplan14') }}</div>
                <el-button
                size="small"
                type="primary"
                @click="pMBtn('PM_SPORTS')"
                v-if="numType==2"
                >{{$t('live.Scheduleplan11') }}</el-button>
            </div>
            <el-table :data="[pmData]" border style="width: 100%">
                <el-table-column prop="leagueName" align="center" :label="$t('live.Scheduleplan15')"  />
                <el-table-column prop="leagueId" align="center" :label="$t('live.EventID')" />
                <el-table-column prop="sportsTypeName" align="center" :label="$t('live.Scheduleplan2')" />
                <el-table-column prop="mainName" align="center" :label="$t('live.Scheduleplan4')" />
                <el-table-column prop="cusName" align="center" :label="$t('live.Scheduleplan5')" />
                <el-table-column prop="gameTime" align="center" :label="$t('live.Scheduleplan16')" width="160"/>
                <el-table-column prop="liveUrl" align="center" :label="$t('live.Scheduleplan17')" :show-overflow-tooltip="true" width="180"/>
            </el-table>
        </div>
        <div>
        <div style="display: flex; align-items: center">
          <div class="pmDiv">{{ $t('live.dawnVideosource') }}</div>
          <el-button size="small" type="primary" @click="pMBtn('DAWN_SPORTS')" v-if="numType == 2">{{
            $t('live.Scheduleplan11')
          }}</el-button>
        </div>
        <el-table :data="[dawnData]" border style="width: 100%">
          <el-table-column prop="leagueName" align="center" :label="$t('live.Scheduleplan15')" />
          <el-table-column prop="leagueId" align="center" :label="$t('live.EventID')" />
          <el-table-column prop="sportsTypeName" align="center" :label="$t('live.Scheduleplan2')" />
          <el-table-column prop="mainName" align="center" :label="$t('live.Scheduleplan4')" />
          <el-table-column prop="cusName" align="center" :label="$t('live.Scheduleplan5')" />
          <el-table-column
            prop="gameTime"
            align="center"
            :label="$t('live.Scheduleplan16')"
            width="160"
          />
          <el-table-column
            prop="liveFlv"
            align="center"
            :label="$t('live.Scheduleplan17')"
            :show-overflow-tooltip="true"
            width="180"
          >
          <template #default="{ row }">
                <p>{{ row?.liveFlv }}</p>
                <p>{{ row?.liveM3u8}}</p>
            </template>
        </el-table-column>
        </el-table>
      </div>
        <template #footer >
            <span class="dialog-footer">
            <el-button  @click="cancel">{{$t('live.cancel')}}</el-button>
            <el-button v-if="numType==2" type="primary" @click="cancel">{{$t('live.DetermineMapping')}}</el-button>
            </span>
        </template>
        </el-dialog>
    </div>
    <PmDialog  :open="open" :leagueId="leagueId" :param="param" @onreFrash="onreFrash"   v-if="open" />
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import { getMppingDetail } from "@/api/live/scheduleplan.js"
import PmDialog from "./PmDialog.vue";
const props=defineProps({
    viewMapShow:{
        type:Boolean
    },
    leagueIdObj:{
        type:String
    },
    numType:{
        type:String
    }
})
const emit=defineEmits(['closeShow'])
const loading = ref(true);
const tableData =ref([])
const pmData = ref([])
const dawnData = ref()
const param = ref('')
const leagueId=ref()
const open=ref(false)
const cancel=()=>{
    emit('closeShow')
}
onMounted(()=>{
    console.log(props.leagueIdObj)
    let obj=props.leagueIdObj
    tableData.value.push(obj)
    getList();

})
const getList=()=>{
    console.log('123')
    getMppingDetail(props.leagueIdObj.leagueId).then((res)=>{
        loading.value=false
        const { DAWN_SPORTS, PM_SPORTS } = res
        pmData.value = PM_SPORTS
        dawnData.value = DAWN_SPORTS
    })
}
const pMBtn=(a)=>{
    leagueId.value=props.leagueIdObj.leagueId
    open.value=true
    param.value = a
}
const onreFrash=()=>{
    open.value=false
    getList();
}
</script>
  
<style lang="scss" scoped>
.viewMap-dialog{
    .fbDiv{
        margin-bottom: 20px;
    }
    .pmDiv{
        margin: 20px 6px 20px 0;
    }
}
</style>
  