<template>
    <div class="boxAnchor">
        <div class="info">
            <div class="anchor_img">
                <img :src="getImgUrl(user.userInfo.avatar)">
                <div class="sign"><span>{{$t('AnchorPlay.BigAnchor')}}</span></div>
            </div>
            <div class="txtDiv">
                <div class="t1">{{$t('AnchorPlay.Anchor')}}：<p class="nickname">{{user.userInfo.nickName}}</p></div>
                <div class="t2">{{$t('AnchorPlay.NumberOfSubscriptions')}}：{{auchorInfo.subscriptionNum}}</div>
            </div>
            <div class="line"></div>
            <div class="imgList">
                <div v-for="(item,index) in list " :key="index" :class="{active:index==currentImg,tab:true}" @click="tabBtn(index)">
                        <img :src="index==currentImg?item.img1:item.img2" >
                        <div class="title">{{ item.title }}</div>
                </div>
            </div>
        </div>
        <div class="mainAnchor" v-if="currentImg==0">
           
                <div class="btnView">
                    <template v-for="(item,index) in btnList" :key="index">
                        
                        <div  v-if="index==0"  :class="{btn:true,activeBtn:index==currenBtn}" @click="btnAnchor(index)">{{ item }}</div>
                        <el-badge :value="liveStore.countAnchor" class="item"  v-if="index==1" :hidden="liveStore.countAnchor==0">
                            <div   :class="{btn:true,activeBtn:index==currenBtn}" @click="btnAnchor(index)">{{ item }}</div>
                        </el-badge>
                    </template>
                   
                </div>
                <template   v-if="currenBtn==0">
                    <!-- 立即开播  v-if="!liveList"-->
                    <DebutSubmit :title="title" :type="1" @debutClick="debutClick" v-if="!liveList" />
                    <div class="liveStreaming"  v-else>
                        <div style="padding: 0px 0 20px 0;color: #fff;font-size: 18px;">{{$t('AnchorPlay.AlreadyProcess')}}</div>
                        <div style="display: flex;align-items: center;column-gap: 24px;">
                            <div class="btn" @click="golLiveBroadcast" style="border: 1px solid var(--unnamed, #F35F1B);color: var(--unnamed, #F35F1B);">{{$t('AnchorPlay.ToLiveBroadcast')}}</div>
                            <div class="btn activeBtn" @click="stopLive">{{$t('AnchorPlay.StopLivebroadcast')}}</div>
                            
                        </div>
                        <div>
                            <div class="goBtn">
                                <div class="txtDiv">{{$t('AnchorPlay.Serve')}}</div>
                                <div class="copyDivFW">
                                   <div>WHIP</div>
                                </div>
                              
                            </div>
                            <div class="goBtn">
                                <div class="txtDiv">{{$t('AnchorPlay.Server')}}</div>
                                <div style="width: 100%;">
                                    <div class="copyDiv">
                                        <el-input ref="copyInputServer" v-model="serverUrl" readonly :placeholder="$t('AnchorPlay.WaitAddress')" />
                                        <div class="copy" @click="copyServer" >{{$t('AnchorPlay.Copy')}}</div>
                                    </div>
                                </div>
                              
                            </div>
                            <div class="goBtn">
                                <div class="txtDiv">{{$t('AnchorPlay.Token')}}</div>
                                <div style="width: 100%;">
                                    <div class="copyDiv">
                                        <el-input ref="copyInput" v-model="webRTCPullUrl" readonly :placeholder="i18n.global.t('AnchorPlay.WaitAddress')" />
                                        <div class="copy" @click="copyToClipboard" >{{$t('AnchorPlay.Copy')}}</div>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </template>
                <!-- 预约开播 -->
                <Reservation  v-if="currenBtn==1"/>
        </div>

        <div  class="mainAnchor" v-if="currentImg==1">
            <AnchorCenter v-if="currentImg==1" />
        </div>
        <div  class="mainAnchor" v-if="currentImg==2">
            <GiftDetails v-if="currentImg==2" />
        </div>
    </div>
</template>

<script setup>
import i18n from '@/i18n'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage,ElMessageBox } from 'element-plus'
import Reservation from './components/Reservation.vue'
import GiftDetails from './components/GiftDetails.vue'
import AnchorCenter from './components/AnchorCenter.vue'
import DebutSubmit from './components/DebutSubmit.vue'
import {getStreamList,getStreamStop,getAnchorInfo} from '@/api/liveBroadcast'
import { useLiveStore } from '@/stores/liveBroadcast'
import '@/assets/styles/fromUi.scss'
import {getImgUrl} from "@/utils/cache";
const user = useUserStore()
const userInfo = computed(() => {
  return user.userInfo
})
const router = useRouter()
const liveStore=useLiveStore()
const currentImg=ref(0)
const currenBtn=ref(0)
const title=i18n.global.t('AnchorPlay.StartImmediately')
const webRTCPullUrl=ref()
const serverUrl=ref('https://webrtcpush.tlivesource.com/webrtc/v2/whip')
const copyInput = ref() 
const copyInputServer = ref()
const list=reactive([
    {
        title:i18n.global.t('AnchorPlay.StartBroadcasting'),
        img1:new URL('../../assets/img/debut01.png', import.meta.url).href,
        img2:new URL('../../assets/img/debut02.png', import.meta.url).href,
    },{
        title:i18n.global.t('AnchorPlay.PersonalCenter'),
        img1:new URL('../../assets/img/thatPerson01.png', import.meta.url).href,
        img2:new URL('../../assets/img/thatPerson02.png', import.meta.url).href,
    },{
        title:i18n.global.t('AnchorPlay.GiftDetails'),
        img1:new URL('../../assets/img/gift01.png', import.meta.url).href,
        img2:new URL('../../assets/img/gift02.png', import.meta.url).href,
    }
])
const auchorInfo=ref({})
const btnList=reactive([i18n.global.t('AnchorPlay.StartImmediately'),i18n.global.t('AnchorPlay.AppointmentBroadcasting')])
const liveList=ref(false)
const btnAnchor=(index)=>{
    currenBtn.value=index
    if(index==0){
        getAnchorList()
        getAnchorInfos()
    }
}
const tabBtn=(index)=>{
    currentImg.value=index
}
onMounted( ()=>{
    getAnchorList()
    getAnchorInfos()
    liveStore.anchorCount(userInfo.value.id)
})
const getAnchorInfos=async ()=>{
    let presenterId=userInfo.value.id
    try {
        let res=await getAnchorInfo(presenterId)
        auchorInfo.value=res.data
    } catch (e) {}
}
const copyToClipboard = () => {
        // 获取输入框的引用
        const input = copyInput.value
        // 选择输入框的内容
        input.select()
        // 尝试执行复制操作
        try {
            const successful = document.execCommand('copy')
            if (successful) {
            ElMessage({
                message: i18n.global.t('AnchorPlay.Copy_1'),
                type: 'success'
            })
            } else {
            ElMessage.error(i18n.global.t('AnchorPlay.Copy_2'))
            }
        } catch (err) {
            ElMessage.error(i18n.global.t('AnchorPlay.Copy_2'))
        }
}
const copyServer=()=>{
    
      // 获取输入框的引用
      const input = copyInputServer.value
        // 选择输入框的内容
        input.select()
        // 尝试执行复制操作
        try {
            const successful = document.execCommand('copy')
            if (successful) {
            ElMessage({
                message: i18n.global.t('AnchorPlay.Copy_1'),
                type: 'success'
            })
            } else {
            ElMessage.error(i18n.global.t('AnchorPlay.Copy_2'))
            }
        } catch (err) {
            ElMessage.error(i18n.global.t('AnchorPlay.Copy_2'))
        }
}
const getAnchorList= async ()=>{
    let presenterId=userInfo.value.id
    try {
        let res=await getStreamList({presenterId:presenterId,page:1,pageSize:10,dataResource:'4'})
        if(res.data.list && res.data.list.length>0){
            liveList.value=res.data.list.find(item => item.status === 2)
            console.log(liveList.value,'liveList.value')
            webRTCPullUrl.value=liveList.value.webrtcPushUrl
            localStorage.setItem('AnchorDebut',JSON.stringify(liveList.value))
        }else{
            liveList.value=false
        }
    } catch (e) {
        console.log(e.message)
    }
}
const golLiveBroadcast= async () => {
    // 使用 window.open 打开新窗口，并在其中跳转到指定的路由路径
    const newWindow = window.open('', '_blank')
    if (newWindow) {
        newWindow.location.href = router.resolve('/anchorPlay').href // 替换为你要跳转的路由路径
    }
}
//停止直播 
const stopLive=()=>{
    ElMessageBox.confirm(i18n.global.t('AnchorPlay.AskQuestion'), i18n.global.t('AnchorPlay.Tips'), {
        confirmButtonText: i18n.global.t('AnchorPlay.Sure'),
        cancelButtonText: i18n.global.t('AnchorPlay.Cancel'),
        type: 'warning'
    }).then(() => {
        getStreamStop({currentRoomCode:liveList.value.roomCode,id:liveList.value.id}).then((res)=>{
            if(res.code==200){
                ElMessage({
                    message: i18n.global.t('AnchorPlay.StopLiveSuccessfully'),
                    type: 'success'
                })
                setTimeout(() => {
                    getAnchorList();
                }, 2000)
            }
        })
    }).catch(() => { });
}
//回掉
const debutClick=()=>{
    getAnchorList()
}
</script>

<style lang="scss" scoped>
@media screen and (max-width:1450px) {
  .boxAnchor{
    zoom: 0.9;
  }
}
.boxAnchor{
    min-width: 1320px;
    max-width: 1320px;
    margin: 30px auto;
    .info{
        width: 1320px;
        height: 128px;
        flex-shrink: 0;
        border-radius: 8px;
        background: #272B45;
        padding: 24px 0;
        display: flex;
        align-items: center;
        .anchor_img{
            margin-left: 40px;
            position: relative;
            .sign{
                width: 87px;
                height: 26px;
                flex-shrink: 0;
                margin-top: -28px;
                margin-left: 2px;
                z-index: 100;
                position: absolute;
                background-image: url('../../assets/img/anchorBg.png');
                background-size: auto 100%;
                background-repeat: no-repeat;
                span{
                    color: #FFF;
                    
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    display: block;
                    text-align: center;
                    width: 91%;
                    // margin-left: 16px;
                    padding-top: 2px;
                }

            }
            img{
                width: 80px;
                height: 80px;
                border-radius: 80px;
                z-index: 1;
                position: relative;
            }
        }
        .txtDiv{
            margin-left: 24px;
            .t1{
                color: var(--100, #FFF);
                
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                display: flex;
                align-items: center;
            }
            .t2{
                color: var(--60, rgba(255, 255, 255, 0.60));
                
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                margin-top: 10px;
            }
        }
        .line{
            width: 1px;
            height: 72px;
            flex-shrink: 0;
            background: rgba(255, 255, 255, 0.10);
            margin: 0 56px;
        }
        .imgList{
            display: flex;
            // column-gap: 56px;
            cursor: pointer;
            .tab{
                width: 128px;
                height: 128px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                    width: 42px;
                    height: 42px;
                }
                .title{
                    color: rgba(255, 255, 255, 0.60);
                    
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    margin-top: 6px;
                }
            }
            .tab:hover{
                background: linear-gradient(0deg, #3b4168 0%, #272b45 100%);
            }
            .active .title{
                color: #FFF;
            }
        }
    }
    .mainAnchor{
        width: 1320px;
        // height: 850px;
        flex-shrink: 0;
        border-radius: 8px;
        background: #272B45;
        margin-top: 20px;
        padding: 0 40px 40px 40px;
    }
    .btnView{
        display: flex;
        column-gap: 24px;
        align-items: center;
        padding: 30px 0;
        
    }
    .btn{
        min-width: 104px;
        height: 40px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.20);
        color:  rgba(255, 255, 255, 0.60);
        
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        cursor: pointer;

    }
    .activeBtn{
        background:  linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%);
        color: #FFF;
        border: 0;
    }
    .liveStreaming{
        min-height: 600px;
    }
    .copy {
        height: 24px;
        flex-shrink: 0;
        border-radius: 60px;
        border: 1px solid #ff9000;
        color: #ff9000;
        
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 157.143% */
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        cursor: pointer;
        padding: 0 10px;
    }
    .nickname{
        max-width: 100px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .goBtn{
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: start;
        margin-top: 20px;
        .txtDiv{
            color: var(--100, #FFF);
            
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px; /* 157.143% */
            width: 100%;
            margin-bottom: 6px;
        }
        .copyDiv{
            display: flex;
            align-items: center;
            width: 70%;
            height: 40px;
            border-radius: 4px;
            border: 1px solid var(--20, rgba(255, 255, 255, 0.20));
            padding-right: 10px;
        }
        .copyDivFW{
            width: 100%;
            div{
                width: 200px;
                height: 40px;
                border-radius: 4px;
                border: 1px solid var(--20, rgba(255, 255, 255, 0.20));
                display: flex;
                align-items: center;
                padding-left: 10px;
                color: var(--100, #FFF);
                
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 16px; /* 114.286% */
            }
        }
    }
  
}
.liveStreaming{
    :deep() .el-input__wrapper{
        background-color: #272b45;
        // box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) !important;
        box-shadow:none !important;  
    }
    :deep() .el-input__inner {
        color: #fff;
    }
}
.mainAnchor{
    :deep() .el-badge__content--danger{
        background-color:#E93D3D;
    }
}
</style>  