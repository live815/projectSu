<template>
  <div class="SearchBox-view" ref="SearchBoxDiv ">
    <div class="showSearchBox" >
      <div class="showSearchBox-top">
        <el-input
          v-model="searchValue"
          class="w-50 m-2"
          :placeholder="$t('SportsView.SearchLeagueAndTeamName')"
          @keydown="handleKeyPress"
          @blur="handleInputBlur"
          :prefix-icon="Search"
          size="large"
          clearable 
        />
        <div class="line" ></div>
        <div class="closebtn" @click="close">{{$t('SportsView.Close')}}</div>
      </div>
      <div class="showSearchBox-con" >
        <div class="showSearchBox-item serchHistory" v-if="!searchValue">
          <div class="showSearchBox-t serchHistory-top" v-if="searchHistory.length>0">
            <div class="history">{{$t('SportsView.SearchHistory')}}</div>
            <div class="clearHistory showSearchBox-c" @click="clear">{{$t('SportsView.ClearSearchHistory')}}</div>
          </div>
          <div class="serchHistory-con">
            <ul>
              <li v-for="(item,index) of searchHistory" :key="index" >
                <div class="name" @click.stop="chooseHistory(item)">{{ item }}</div>
                <div class="delete" @click.stop="deleteSingle(item)">X</div>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="showSearchBox-item hotSearch" v-if="!searchValue">
          <div class="showSearchBox-t hotSearch-top">
            <div class="hotsearch">{{$t('SportsView.PopularSearches')}}</div>
            <div class="change showSearchBox-c"  @click="changeTeams">{{$t('SportsView.ChangeIt')}}</div>
          </div>
          <div class="hotSearch-con">
            <div class="tname" v-for="(team,index) in displayedTeams" :key="team"  @click="chooseHistory(team,true)">{{index+1}}.{{ team }}</div>
          </div>
        </div>
      </div>

      <div class="searchCon" v-if="searchValue">
        <div class="searchCon-tit">{{$t('SportsView.MatchesFound')}}：<span class="num">{{ fbStore.queryMatchList.length }}</span></div>
        <div class="lists" >
          
          <template v-if="fbStore.queryMatchList.length>0">
            <div class="listcard" v-for="(item,index) of fbStore.queryMatchList" :key="index" @click="togoevent(item)">
              <p><img class="icon" :src="item.lg.lurl || defaultTeamIcon" alt="">{{ item.lg.na }}</p>
              <p v-if="item.mc" class="title"><span>[{{ getMatchStatus(item, fbStore) }}]</span> {{ item.nm }}</p>
              <p>{{ changeDateTime(item.bt) }}</p>
            </div>
          </template>
          <template v-else>
            <div class="nodata">
              <img :src="nodata" alt="">
            </div>
          </template>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { onMounted, ref, onUnmounted} from 'vue'
import { Search } from '@element-plus/icons-vue'
import eventBus from '@/utils/eventBus'
import {  getMatchStatus } from '@/hooks/useSportDict'
import defaultTeamIcon from './img/default-team-logo.png'
import nodata from './img/nodata.png'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const searchValue = ref('')
const searchHistory = ref([]);
const SearchBoxDiv  = ref(null)
// 初始球队数组
const teams = ref([
i18n.global.t('SportsView.Liverpool'), i18n.global.t('SportsView.RealMadrid'), i18n.global.t('SportsView.Kawasaki'), i18n.global.t('SportsView.Arsenal'),
i18n.global.t('SportsView.AFCChampionsLeague'), i18n.global.t('SportsView.EnglishPremierLeague'), i18n.global.t('SportsView.ManchesterCity'),i18n.global.t('SportsView.Juventus'),
i18n.global.t('SportsView.ItalianSuperLeague'),i18n.global.t('SportsView.Barcelona'), i18n.global.t('SportsView.SpanishLeague')
]);
// 初始化显示的球队数量
const teamsToShow = 3;
// 显示球队的数组
const displayedTeams = ref([]);
// 随机打乱数组的函数
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
// 获取随机的球队数组
const getRandomTeams = () => {
  const teamsCopy = [...teams.value];
  shuffleArray(teamsCopy);
  return teamsCopy.slice(0, teamsToShow);
};
// 切换球队的函数
const changeTeams = () => {
  displayedTeams.value = getRandomTeams();
};
onMounted(()=>{
  const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  searchHistory.value = storedSearchHistory || []; // 如果为null，则设置为空数组
  changeTeams();
  document.addEventListener('click', handleClickOutside);
})

// 处理用户按键事件（按下Enter键或空格键）
const handleKeyPress = (event) => {
  let inputValue = searchValue.value.trim()
  if (event.key === 'Enter' || event.key === ' ') {
    if (inputValue !== '' || isNaN(inputValue)) {
       // 确保 searchHistory.value 是一个数组
       searchHistory.value = searchHistory.value || [];
        // 缓存去重
        if(!searchHistory.value.includes(inputValue)){
          // 将输入内容添加到搜索历史
          searchHistory.value.push(inputValue);
          fbStore.searchHistory = searchHistory.value
          // 缓存搜索历史到localStorage
          localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
        }

      getSearchResult(inputValue);
    }
    
  }
};

//关闭按钮
function close(){
  eventBus.emit('showInput',true)
  fbStore.curPage = 'allList'
  fbStore.queryMatchList = []
  fbStore.closeSearch = true
}

// 根据用户输入的内容请求接口数据
function getSearchResult(val){
  const data = {
    oddsType: 1,
    recommend: val
  }
  fbStore.getqueryMatchByRecommend(data)
}
//不够两位数的加0
function formatWithLeadingZero(number) {
  return number < 10 ? `0${number}` : number;
}
//时间转换
function changeDateTime(val){
  const date = new Date(val)
  const month = formatWithLeadingZero(date.getMonth() + 1); // 月份从0开始，所以需要加1
  const day = formatWithLeadingZero(date.getDate());
  const hours = formatWithLeadingZero(date.getHours());
  const minutes = formatWithLeadingZero(date.getMinutes());
  const seconds = formatWithLeadingZero(date.getSeconds());
  const formattedDateTime = `${month}-${day} ${hours}:${minutes}:${seconds}`;
  // console.log(formattedDateTime);
  return formattedDateTime
}
// 清除历史记录
function clear(){
  localStorage.removeItem('searchHistory')
  searchHistory.value = []
  fbStore.searchHistory = []
}
//点击搜索历史里面的选项或者热门搜索的选项
function chooseHistory(val,val2){
  searchValue.value = val
  getSearchResult(val)
  if(val2){
    if(!searchHistory.value.includes(val)){
      // 将输入内容添加到搜索历史
      searchHistory.value.push(val)
      fbStore.searchHistory = searchHistory.value
      // 缓存搜索历史到localStorage
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
    }
  }
}
// 点击搜索结果
async function togoevent(val){
  fbStore.rightList = val
  fbStore.curEvent = val
  fbStore.curEventId = val.id
  fbStore.curPage = 'searchResult'
  await fbStore.getMatchDetail({
    	matchId: val.id
  	})
  eventBus.emit('showInput',true)  
}
// 删除单个搜索历史记录
function deleteSingle(val){
  const storedArray = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const indexToRemove = storedArray.indexOf(val);
  console.log(val,indexToRemove,storedArray)
  // 使用splice方法删除该元素
  if (indexToRemove !== -1) {
    searchHistory.value.splice(indexToRemove, 1);
  } 
}
// 输入框失去焦点发送请求
const handleInputBlur = async () =>{
  if(searchValue.value){
    fbStore.queryMatchList = []
    searchHistory.value.push(searchValue.value)
    try{
      await  getSearchResult(searchValue.value)
    }catch (error) {
      console.error('请求失败:', error);
      // 处理异步请求失败的情况
    }
  }
}
const handleClickOutside = (event) => {
  const SearchBoxDivs = SearchBoxDiv.value
  // console.log(event,SearchBoxDivs,SearchBoxDivs.contains(event.currentTarget))
  if (SearchBoxDivs && !SearchBoxDivs.contains(event.currentTarget)) {
    fbStore.closeSearch = false
    eventBus.emit('showInput',false)
    
  }
}

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
.SearchBox-view{
  .showSearchBox{
    // position: absolute;
    // left: 235px;
    background: #222744;
    // min-height: 800px;
    height: calc(100vh - 139px);
    z-index: 999;
    flex: 1;
    // width: 77%;
    top: 19px;
    .showSearchBox-top{
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 54px;
      background: #171A2F;
      :deep(){
        .el-input{
          flex: 1;
        }
        .el-input__wrapper{
          box-shadow: none;
          background: transparent;
        }
        .el-input--large .el-input__inner{
          color: #fff;
        }
      }
      .closebtn{
        display: flex;
        width: 80px;
        justify-content: center;
        cursor: pointer;
      }
      .line{
        height: 16px;
        width: 1px;
        margin: 0 5px;
        background: var(--20, rgba(255, 255, 255, 0.20));
      }
    }
    .showSearchBox-con{
      .showSearchBox-item{
        display: flex;
        flex-direction: column;
        // height: 40px;
        width: 100%;
        align-items: center;
        color: var(--100, #FFF);
        // min-height: 200px;
        .showSearchBox-t{
          display: flex;
          flex-direction: row;
          height: 40px;
          line-height: 40px;
          width:100%;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.10));
          padding: 0 15px;
          .showSearchBox-c{
            cursor: pointer;
          }
        }
        .hotSearch-con{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: start;
          flex-direction: column;
          .tname{
            padding: 10px 14px;
            width: 100%;
            display: flex;
            justify-content: start;
            cursor: pointer;
          }
        }
        .serchHistory-con{
          width: 100%;
          ul{
            list-style: none;
            width: 100%;
            padding:0px 0px;
            li{
              height: 35px;
              line-height: 35px;
              text-align: left;
              // border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.10));
              padding:0px 20px;
              color: var(--60, rgba(255, 255, 255, 0.60));
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .name{
                width: auto;
                height: 100%;
              }
              .delete{
                width:30px;
                height: 100%;
                text-align: center;
              }
            }
          }
        }
      }
    }
    .searchCon{
      .searchCon-tit{
        display: flex;
        align-items: center;
        padding: 0 15px 0 10px;
        height: 39px;
        // background: #171A2F;
        margin-top: 5px;
        border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.10));
        // background: #222744;
      }
      .lists{
        height: calc(100vh - 90px);
        overflow: scroll;
        scrollbar-width: none;//火狐浏览器 隐藏滚动条
       
        .listcard{
          margin: 5px 0px;
          padding: 5px 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          // background: #171A2F;
          border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.10));
          cursor: pointer;
          p{
            height: 25px;
            line-height: 25px;
          }
          .icon{
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
          .title{
            span{
              color: #f35f1b;
            }
          }
        }
      }
      .nodata{
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          display: block;
          width:155px;
          height: auto;
        }
      }
    }
  }
}
</style>