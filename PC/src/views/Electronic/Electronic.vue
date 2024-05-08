<template>
  <div class="outter-box-ele Electronicview">
    <div class="main-box">
      <div class="header">
        <!-- 游戏类型 -->
        <div class="gameList">
          <div  @click="usePlayGame(item, router)" class="btn" :class=" route.params.id == item.id ? 'active' : ''" v-for="(item, index) in useData"  :key="index">{{ item.lobbyName }}</div>
        </div>
        <!-- 电子类型 -->
        <div class="subgameList" >
          <div
            :class="item.value == gameType ? 'btn active' : 'btn'"
            v-for="(item, index) in gameTypeList"
            :key="index"
            @click="changeGameType(item.value)"
            :title="item.label"
          >
            {{ item.label }}
          </div>
        
          <!-- 线路选择 -->
          <Selector :lineSelectData="lineType"></Selector>
          <div class="search-box">
            <input
              class="searh-input"
              v-model="searchText"
              type="text"
              :placeholder="$t('Electronic.EnterSearchContent')"
            />
            <img class="search-icon" src="./img/search.png" width="14" height="14" alt=""  />
          </div>
        </div>
      </div>
      <div class="game-box">
          <MiniGame
          v-for="(item, key) in filtedGameList" 
          :key="key"
          :game="item"
          :itemKey="key"
        ></MiniGame>        
        <div class="empty-box" v-show="showNodata">
          <img src="./img/empty.png" width="237" height="180" />
          <p class="empty-text">{{$t('Electronic.NoGameYet')}}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import i18n from '@/i18n'
import Selector from './components/Selector.vue'
import MiniGame from './components/MiniGame.vue'
import eventBus from '@/utils/eventBus'
import { useRouter } from 'vue-router'
const router = useRouter()
import { usePlayGame } from '@/hooks/usePlayGame.js'
import { getSubGameListApi } from '@/api/game.js'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
import { useSlotGameStore } from '@/stores/slotGame'
const slotGameStore = useSlotGameStore()
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
const route = useRoute()
const gameList = ref([])
const gameType = ref(0)
const gameTypeList = ref([
  {
    label: i18n.global.t('Electronic.All'),
    value: 0
  },
  { label: i18n.global.t('Electronic.Collect'), value:100  },
  {
    label: i18n.global.t('Electronic.VideoSlotMachine'),
    value: 1
  },
  {
    label: i18n.global.t('Electronic.ClassicSlotMachine'),
    value: 2
  },
  {
    label: i18n.global.t('Electronic.ScratchOff'),
    value: 3
  },
  {
    label: i18n.global.t('Electronic.PokerGame'),
    value: 4
  },
  {
    label: i18n.global.t('Electronic.ArcadeGames'),
    value: 5
  }
])

const lineType = ref([
  { type: 0, name: i18n.global.t('Electronic.AllLine')},
  { type: 1, name: i18n.global.t('Electronic.TwentyLine') },
  { type: 2, name: i18n.global.t('Electronic.FiftyLine') },
  { type: 3, name: i18n.global.t('Electronic.NolimitLine') }
])
const filterList = ref()
const searchText = ref('')
const line = ref()
const useData = computed(()=>{
  if (appStore.gameTypeList) {
    let temp = appStore.gameTypeList.filter((item) => {
      return item.id == 1001104
    })
    return temp[0]?.gameList.length ? temp[0].gameList : []
  }else {
    return []
  }
})
function changeGameType(n) {
  gameType.value = n
}

onMounted(() => {
  if(route.params.id && route.params.id.trim()){
    GetElectronicGameList(route.params.id)
  }
})
watch(
  () => route.params.id,
  (id) => {
    if(id && id.trim()){
      GetElectronicGameList(id)
    }
  }
)
// 获取游戏列表
async function GetElectronicGameList(id) {
  let data = { id: id }
  let res = ''
  if(id){
    try {
        res = await getSubGameListApi(data)
        let list = res.data || []
        // 处理线路分类
        list.forEach((game) => {
          game.lineType = getLineType(Number(game.line))
        })
        gameList.value = list
        filterList.value = list

      
    } catch (e) {}
  }
}
function getLineType(line) {
  if (line >= -1 && line <= 20) {
    return 1
  }
  if (line >= 21 && line <= 50) {
    return 2
  }
  if (line >= 51) {
    return 3
  }
}
const filtedGameList = computed(() => {
  const allLines = !line.value // 全部线路类型
  const allSlotName = !gameType.value //全部电子类型
  const isCollectType = gameType.value === 100
  if (isCollectType) {
    // 获取收藏列表
    return gameList.value.filter((game) => slotGameStore.collectIds.includes(game.id))
  } else {
    if (searchText.value) {
      return  gameList.value.filter((item) => item.lobbyName.includes(searchText.value))
    }else{
      return gameList.value.filter(
        (game) =>
          // 线路过滤
          (game.lineType === line.value || allLines) &&
          // 电子类型过滤
          (gameType.value == game.slotType || allSlotName)
      )
    }
  }
})

const showNodata = computed(()=>{
  if(filtedGameList.value.length == 0){
      return true
  }else{
    return false
  }
})

eventBus.on('linetype',(val)=>{
  line.value = val.type
  getLineType(val.type)
})
onUnmounted(() => {
  eventBus.off('linetype')
})
</script>

<style lang="scss" scoped>
@media screen and (max-width:1450px) {
  .outter-box-ele{
    zoom: 0.9;
  }
}
.Electronicview {
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  min-height: 900px;
  .main-box {
    width: 1320px;
    .header {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 130px;
      margin-top: 20px;
      padding: 20px 0 30px 30px;
      background-color: pink;
      border-radius: 8px;
      background: var(--unnamed, #1d223c);
      box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
      .subgameList{
        display: flex;
        flex-direction: row;
      }
      .btn {
        // display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        line-height: 8px;
        margin-right: 16px;
        padding: 16px 16px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        flex-wrap: nowrap;
        white-space: nowrap;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 100%
        );
        box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
        color: var(--60, rgba(255, 255, 255, 0.6));
        
        font-size: 16px;
        font-weight: 400;
        max-width: 114px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
      .btn:nth-child(1),.btn:nth-child(2){
        max-width: 66px;
      }
      .btn:nth-child(5){
        max-width: 82px;
      }
      .btn:hover {
        cursor: pointer;
      }
      .active.btn {
        border: 1px solid #fa882e;
        background: linear-gradient(180deg, #f35d25 0%, #f28225 100%);
        box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
        color: #fff;
        
        font-weight: 500;
        line-height: 8px;
      }
      .search-box {
        display: flex;
        width: 200px;
        height: 40px;
        margin-left: 16px;
        padding: 9px 0 0 12px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 100%
        );
        box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
        .searh-input {
          width: 150px;
          height: 18px;
          color: var(--60, rgba(255, 255, 255, 0.6));
          
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        .search-icon {
          margin: 3px 0 0 6px;
          cursor: pointer;
        }
      }
    }
    .gameList{
      display: flex;
      width: 100%;
      margin-bottom: 10px;
      .btn {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        line-height: 8px;
        margin-right: 16px;
        padding: 16px 16px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        flex-wrap: nowrap;
        white-space: nowrap;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 100%
        );
        box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
        color: var(--60, rgba(255, 255, 255, 0.6));
        
        font-size: 16px;
        font-weight: 400;
        min-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
      // .btn:nth-child(1),.btn:nth-child(2){
      //   max-width: 66px;
      // }
      // .btn:nth-child(5){
      //   max-width: 82px;
      // }
      .btn:hover {
        cursor: pointer;
      }
      .active.btn {
        border: 1px solid #fa882e;
        background: linear-gradient(180deg, #f35d25 0%, #f28225 100%);
        box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
        color: #fff;
        
        font-weight: 500;
        line-height: 8px;
      }
      
    }
    .game-box {
      display: flex;
      width: 100%;
      margin-top: 20px;
      flex-wrap: wrap;
      gap: 30px;
      .empty-box {
        display: flex;
        flex-direction: column;
        height: 69vh;
        width: 100%;
        margin-top: 57px;
        align-items: center;

        .empty-text {
          color: var(--100, #fff);
          text-align: center;
          
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }
      }
    }
  }
}
.footer {
  position: absolute;
  bottom: 0px;
}
</style>
