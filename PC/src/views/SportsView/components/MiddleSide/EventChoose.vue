<template>
  <div class="EventChoose-view" ref="eventChooseDiv">
    <div class="EventChoose-title">
      <div class="title-item">{{$t('SportsView.EventList')}}</div>
      <div class="title-item">
        <!-- <el-radio-group v-model="radio" @change="change">
          <el-radio :label="1" >{{$t('SportsView.SelectAll')}}</el-radio>
          <el-radio :label="0" >{{$t('SportsView.Noselect')}}</el-radio>
        </el-radio-group> -->
        <div class="select">
          <!-- 部分选中 -->
          <unChecked class="checked" v-if="alltempState == 1 " :class="[alltempState == 1?'some':'']" @click.stop="changeType(1)"/>
          <!-- 全选中 -->
          <isChecked v-if="alltempState == 2" class="checked" :class="[alltempState == 2?'all':'']" @click.stop="changeType(2)"/>
          <!-- 不选 -->
          <span v-if="alltempState == 3" class="checkbox" :class="[alltempState == 3?'blank':'']" @click.stop="changeType(3)" ></span>
          <span>{{$t('SportsView.SelectAll')}}</span>
        </div>
        <div class="select">
          <unChecked class="checked" v-if="nottempState == 1 " @click.stop="changeTypenot(1)"/>
          <!-- 全选中 -->
          <isChecked v-if="nottempState == 2" class="checked" @click.stop="changeTypenot(2)"/>
          <!-- 全不选 -->
          <span v-if="nottempState == 3" class="checkbox" @click.stop="changeTypenot(3)" ></span>
          <span>{{$t('SportsView.Noselect')}}</span>
        </div>
      </div>
    </div>

    <div class="EventChoose-con" >
      <div class="EventChoose-list"  v-for="(item,index) of arr" :key="index">
        <el-collapse v-model="active">
          <el-collapse-item :name="item.sportId" v-if="item.list.length > 0">
            <template #title>
              <!-- 部分选中 -->
              <unChecked class="checked" v-if="item.tempState == 1 " @click.stop="changeType(item)"/>
              <!-- 全选中 -->
              <isChecked v-if="item.tempState == 2" class="checked" @click.stop="choosetype(item)"/>
              <!-- 不选 -->
              <span v-if="item.tempState == 3" class="checkbox" @click.stop="choosetype(item)" ></span>
              <span>{{item.title}}</span>
            </template>
            <template v-if="item.list.length > 0">
              <div v-for="(itm,idx) of item.list" :key="idx" class="listitem">
                <isChecked v-if="itm.check" class="checked sechecked" @click.stop="chooseevent(itm,itm.id,item)"/>
                <span class="checkbox" @click.stop="chooseevent(itm,itm.id,item)" v-else></span>
                <span>{{ itm.name }}</span>
              </div>
            </template>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <el-button class="btn" @click="close" :disabled="disablebtn">{{$t('SportsView.Sure')}}</el-button>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ref, watch} from 'vue'
import {  SPORT_IDS } from '@/hooks/useSportDict'
import isChecked from '@/components/icons/isChecked.vue'
import unChecked from '@/components/icons/unChecked.vue'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

// const eventChooseDiv = ref(null)
const radio = ref(fbStore.eventChoose)
// const disablebtn = ref(true)
const arr = ref(
  [
    {
      sportId: SPORT_IDS.Soccer,
      title: i18n.global.t('SportsView.Football'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.Basketball,
      title: i18n.global.t('SportsView.Basketball'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.EFootball,
      title: i18n.global.t('SportsView.eFootball'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.EBasketball,
      title: i18n.global.t('SportsView.eBasketball'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.Tennis,
      title: i18n.global.t('SportsView.tennis'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.Baseball,
      title: i18n.global.t('SportsView.baseball'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.Volleyball,
      title: i18n.global.t('SportsView.volleyball'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.Badminton,
      title: i18n.global.t('SportsView.badminton'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.TableTennis,
      title: i18n.global.t('SportsView.pingpong'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.Boxing,
      title: i18n.global.t('SportsView.boxing'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.Snooker,
      title: i18n.global.t('SportsView.snooker'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.AmericanFootball,
      title: i18n.global.t('SportsView.AmercivanFootball'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.Rugby,
      title: i18n.global.t('SportsView.Afootball'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.IceHockey,
      title: i18n.global.t('SportsView.puck'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.BeachVolleyball,
      title: i18n.global.t('SportsView.BeachVolleyball'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    },
    {
      sportId: SPORT_IDS.Handball,
      title: i18n.global.t('SportsView.handball'),
      isExpanded: true,
      tempState:2,
      id:0,
      list:[]
    }
]
)
const alltempState = ref(2)
const nottempState = ref(3)
// 筛选出list不为空的项
const filteredArr = computed(() => arr.value.filter(item => item.list.length > 0))
//默认展开折叠面板的数组
const active = ref(arr.value.map(item => item.sportId));

const oldarr  = ref(fbStore.matchList)

onMounted(()=>{
  const status =  arr.value.every(item => item.list.every(subItem => subItem.check))
  if(status){
    // radio.value = 1
    fbStore.eventChoose = 1
    alltempState.value = 2
  }else{
    // radio.value = 0
    fbStore.eventChoose = 0
    alltempState.value = 1
  }
  // document.addEventListener('click', handleClickOutside);
})
init()
function init(){
  if(oldarr.value && fbStore.previousEventChooseList.length == 0){
      oldarr.value.forEach((item1) => {
        arr.value.forEach((item2, index2) => {
          if (Number(item2.sportId) === Number(item1.sid)) {
            item2.id = item1.id
            const newItem = {
              name: item1.lg.na,
              check: true,
              id:item1.lg.id
            };
            arr.value[index2].list.push(newItem);
          }
          const status = item2.list.find(item=> item.check == false)
          if(status){
            // radio.value = 0
          }
        });
      });
    // 更新active以打开新的折叠面板
    active.value = filteredArr.value.map(item => item.sportId);
    fbStore.EventChooseList = arr.value
  }else{
    arr.value = fbStore.previousEventChooseList
  }
}
// // 点击其他位置关闭赛事筛选页面
// const handleClickOutside = (event) => {
//   const eventChooseDivs = eventChooseDiv.value
//   console.log(eventChooseDivs,!eventChooseDivs.contains(event.target))
//   if(eventChooseDivs && !eventChooseDivs.contains(event.target)){
//     fbStore.eventChooseStatus = false
//   }
// }
// 确定按钮
function close(){
  fbStore.skeletonLoading = true
  fbStore.eventChooseStatus = false
  fbStore.previousEventChooseList = arr.value
  let list = []
  arr.value.forEach((item)=>{
    item.list.forEach((seditem)=>{
      if(seditem.check){
        list.push(seditem.id)
      }
    })
    const status = item.list.find(item=> item.check == false)
    if(status){
      fbStore.eventFilterStatu = true
      // radio.value = 0
      fbStore.eventChoose = 0
    }
  })
  fbStore.queryMatchListParams.leagueIds = list
  // console.log(list,'list',arr.value)
  const status =  arr.value.every(item => item.list.every(subItem => subItem.check))
  if(status){
    fbStore.eventChoose = 1
  }
  let data = []
  //发送请求筛选赛事
  if (fbStore.queryMatchListParams.type == 1) {
    if (fbStore.queryMatchListParams.sportId == 0) {
      data = {
        current: 1,
        isPC: true,
        leagueIds: fbStore.queryMatchListParams.leagueIds,
        orderBy: fbStore.queryMatchListParams.orderBy,
        type: fbStore.queryMatchListParams.sportId
      }
    } else {
      data = {
        current: 1,
        isPC: true,
        leagueIds: fbStore.queryMatchListParams.leagueIds,
        orderBy: fbStore.queryMatchListParams.orderBy,
        sportId: fbStore.queryMatchListParams.sportId,
        type: 1
      }
    }
    fbStore.skeletonLoading = true
    return fbStore.getMatchList(data)
  }else{
    data = {
      current: 1,
      isPC: true,
      leagueIds: fbStore.queryMatchListParams.leagueIds,
      orderBy: fbStore.queryMatchListParams.orderBy,
      sportId: fbStore.queryMatchListParams.sportId,
      type: fbStore.queryMatchListParams.sportId
    }
    fbStore.skeletonLoading = true
    return fbStore.getMatchList(data)
    
  }
}

// 全选
function changeType(val){
  // console.log(val,'全选')
  alltempState.value = 2
  nottempState.value = 3
  arr.value.forEach(item => {
    item.tempState = 2
    item.list.forEach(listItem => {
      listItem.check = true
    });
  });
}
//反选
function changeTypenot(val){
  // console.log(val,'反选')
  if(val == 2){
    nottempState.value = 3
    alltempState.value = 2
  }
  alltempState.value = 3
  nottempState.value = 2
  arr.value.forEach(item => {
    item.list.forEach(listItem => {
      listItem.check = !listItem.check 
    });
    chooseevent(null,null,item)
  });

}
// 选择球类型
function choosetype(val){
  // console.log(val)
  // console.log(nottempState,'nottempState ')
  if(val.tempState == 2){
    val.tempState = 3
    val.list.forEach((item)=>{
      item.check = false
    })
    // radio.value = 0
  }else{
    val.tempState = 2
    val.list.forEach((item)=>{
      item.check = true
    })
  }

 const status =  arr.value.every(item => item.list.every(subItem => subItem.check))
//  const someTrue = val3.list.some(item => item.check === true);
//  console.log(status,'status')
 if(status){
  // radio.value = 1
  fbStore.eventChoose = 1
  alltempState.value = 2
 }else{
  alltempState.value = 1
 }
}

// 选择单个赛事
function chooseevent(val1,val2,val3){
  // console.log(val1,val2,val3)
  console.log(nottempState,'nottempState ')
  nottempState.value = 3

  if(val1){
    val1.check = !val1.check
  }
  const allTrue = val3.list.every(item => item.check === true);
  const allFalse = val3.list.every(item => item.check === false);
  const someTrue = val3.list.some(item => item.check === true);
  // console.log(someTrue,'someTrue',allFalse,'allFalse',allTrue,'allTrue')
  if(allTrue){
    val3.tempState = 2
    const status =  arr.value.every(item => item.list.every(subItem => subItem.check))
    // console.log(status,'status')
    if(status){
      // radio.value = 1
      val3.tempState = 2
      alltempState.value = 2
    }else{
      alltempState.value = 1
    }
  }
  if(allFalse){
    val3.tempState= 3
    nottempState.value = 2
    return
  }
  if(someTrue && !allTrue){
    val3.tempState= 1
    // radio.value = 0
    alltempState.value = 1
    return
  }
}

const disablebtn = computed(()=>{
    // 使用 every 方法检查是否所有元素都未被选中
    return arr.value.every(item => item.list.every(subItem => !subItem.check));
  }
)
watch(
  ()=>alltempState.value,
  ()=>{
    // if(alltempState.value == 1 || alltempState.value == 2){
    //   nottempState.value = 3
    // }
    const status1 =  arr.value.every(item => item.list.every(subItem => subItem.check))
    const status2 =  arr.value.every(item => item.list.every(subItem => !subItem.check))
    // const someTrue = val3.list.some(item => item.check === true);
    // console.log(status1,'status',status2)
    if(status1){
      // radio.value = 1
      alltempState.value = 2
    }
    else if(status2){
      alltempState.value = 3
      nottempState.value == 2
    }
    // else if(someTrue){
    //   alltempState.value = 1
    //   nottempState.value = 3
    // }
    else{
      alltempState.value = 1
    }
  }
)
watch(
  ()=>nottempState.value,
  ()=>{
    // console.log(nottempState.value,'nottempState',alltempState.value)
    if(nottempState.value == 2){
      alltempState.value = 3
    }
  },{deep:true, immediate: true}
)
</script>

<style lang="scss" scoped>
.EventChoose-view{
  height: 100%;
  // overflow: scroll;
  margin-bottom: 40px;
  .EventChoose-title{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    padding: 0 15px;
    .title-item{
      display: flex;
      flex-wrap: nowrap;
      width: 160px;
      justify-content: space-between;
      .choosebox{
        display: flex;
        margin-left: 10px;
        align-items: center;
        p{
          margin: 5px;
        }
      }
      .select{
        display: flex;
        align-items: center;
      }
    }
  }
  .EventChoose-con{
    width: 100%;
    padding: 0 15px;
    margin-bottom: 40px;
    height: 100%;
    overflow: scroll;
    scrollbar-width: none;//火狐浏览器 隐藏滚动条
    height: calc(100vh - 303px);
    .EventChoose-list{
      .blankblock{
        width: 14px;
        height: 14px;
        display: inline-block;
      }
    }
  }
  .btn{
    display: flex;
    width: 296px;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: 200px;
    border: 1px solid #FF9000;
    background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
    color:#fff;
    margin:10px auto;
    // cursor: pointer;
  }
  :deep(){
    .el-radio__label{
      color: var(--60, rgba(255, 255, 255, 0.60));
    }
    .el-collapse{
      border: none;
    }
    .el-collapse-item__arrow{
      rotate: 90deg;
    }
    .el-collapse-item__arrow.is-active{
      rotate: 180deg;
    }
    .el-collapse-item{
      border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.10));
    }
    .el-collapse-item__header{
      background: transparent;
      border-bottom: none;
      color: #fff;
      height: 40px;
      border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.10));
      // border-bottom-color:transparent;
    }
    .el-collapse-item__header.is-active{
      border-bottom-color:var(--unnamed, rgba(255, 255, 255, 0.10));
    }
    .el-collapse-item__wrap{
      background: transparent;
      border-bottom: none;
    }
    .el-collapse-item__content{
      background: transparent;
      color: #fff;
      padding-bottom: 0;
      display: flex;
      align-items: center;
      // justify-content: space-around;
      flex-wrap: wrap;
      margin: 0 auto;
      width: 90%;
    }
    .el-checkbox__label{
      color: var(--60, rgba(255, 255, 255, 0.60));
    }
    .listitem{
      display: flex;
      height:40px;
      align-items: center;
      // margin-right: 55px;
      width:33.3%;
    }
    .checkbox{
      display: inline-block;
      width: 14px;
      height:14px;
      border: 1px solid #F35F1B;
      margin-right: 3px;
      cursor: pointer;
    }
    .checked{
      margin-right: 3px;
      cursor: pointer;
    }
    .el-radio__inner{
      border-radius: 3px;
    }
    .el-radio__input.is-checked .el-radio__inner{
      background: #F35F1B;
      border-color: #F35F1B;
    }
    .el-radio__input.is-checked .el-radio__inner::after{
      content: '✔'; /* 这里是对勾图标的 Unicode 字符，你也可以使用其他图标字体或图像 */
      position: absolute;
      top: 0; /* 调整垂直居中位置 */
      left: 1px; /* 调整水平居中位置 */
      transform: translate(-50%, -50%); /* 使图标居中 */
      font-size: 10px; /* 设置图标大小 */
      color: #fff; /* 设置图标颜色 */
      width: 0;
      height:0;
    }
    .el-button.is-disabled{
      background: #454859;
      border-color: #454859;
    }
  }
}
</style>