import { entryGameApi, getGuestModeFBToken } from "@/api/game";
import {
  getMatchList,
  getStatistical,
  getOnSaleLeagues,
  getMatchDetail,
} from "@/api/fb";
import {
  getFBConfig,
  setFBConfig,
  getToken,
  getFollowList,
  setFollowList,
  getSettings,
  setSettings
} from "@/utils/cache";
import { parseURLParams } from "@/utils";
import { C_SPORT_GAME_ID } from "@/utils/config";
import { getFBLanguage } from '@/i18n'
import  useAppStore  from "@/store/modules/app";
const getDefaultQueryParams = () => ({
  current: 1, // 当前页码
  orderBy: 0, // 赛事列表排序方式：0 按开赛时间排序，1 按联赛排序
  size: 50, // 每页大小, 默认50，一页最多50
  isPC: true,
  type: 1, // 赛事分组
  beginTime: null, //查询开始时间戳，13位时间戳
  endTime: null, //查询结束时间戳，13位时间戳
  leagueIds: null, // 联赛id集合，可批量获取多个联赛的赛事及赔率信息
  sportId: 1, // 运动ID
});
const useFBStore = defineStore("fb", {
  state: () => ({
    FBConfig: getFBConfig(), // token, apiBaseUrl
    matchList: [], // 赛事列表
    followList: getFollowList(), // 关注列表
    previousMatchList: [], // 用于上一个赛事列表
    statistical: {}, // 赛事统计
    leagues: [], // 联赛列表
    queryMatchListParams: getDefaultQueryParams(),
    settings: getSettings(),
    matchDetailList: {}, // 赛事详情接口全部数据,
    previousMatchDetailData: {}, // 保存上一个赛事详情数据
    isLoading: false, // 请求接口数据页面获取异步问题
    matchDetaiTabList: [], //赛事详情页玩法分类Tab
    isOperatedMatchListCollapse: false, // 标识用户是否手动操作了比赛列表折叠面板
    matchListIds: [], // 比赛列表id集合
    isOperatedMarketsListCollapse: false, // 标识用户是否手动操作了详情页玩法列表折叠面板
    mgListIdxs: [], // 赛事玩法列表idx集合
    skeletonLoading: false, //赛事详情骨架屏loading
    recommendItem: {}, // 爆料方案，推荐玩法接口入参
  }),
  getters: {
    languageType() {
      const appStore = useAppStore();
      return getFBLanguage(appStore.language);
    },
  },
  actions: {
    setSettings(settings) {
      this.settings = setSettings(settings);
    },
    collect({ sid, id }) {
      if (!this.followList[sid]) {
        this.followList[sid] = [];
      }
      let idx = this.followList[sid].findIndex((matchId) => id === matchId);
      // 如果当前已关注
      if (idx > -1) {
        this.followList[sid].splice(idx, 1);
      } else {
        this.followList[sid].push(id);
      }
      setFollowList(this.followList);
    },
    // 重置查询参数
    resetQueryParams() {
      this.queryMatchListParams = getDefaultQueryParams();
    },
    // 获取FBToken
    getFBToken() {
      const isLogin = getToken();
      if (isLogin) {
        return entryGameApi({
          lobbyId: C_SPORT_GAME_ID,
        }).then((res) => {
          let url = res.data;
          if (url) {
            let { apiSrc, token } = parseURLParams(url);
            this.setFBToken({
              FBToken: token,
              FBBaseURL: apiSrc,
            });
          }
        });
      } else {
        // 获取游客模式token
        return getGuestModeFBToken({
          lobbyId: C_SPORT_GAME_ID,
        }).then((res) => {
          const FBToken = res.data.token;
          const FBBaseURL = res.data.apiServerAddress;
          this.setFBToken({
            FBToken,
            FBBaseURL,
          });
        });
      }
    },
    // 设置FBToken
    setFBToken(FBConfig) {
      // console.log(FBConfig,8888)
      this.FBConfig = setFBConfig(FBConfig);
    },
    // 获取比赛列表
    getMatchList(data) {
      return getMatchList(data).then((res) => {
        let list = res.records || [];
        list.sort((a, b) => a.lg.or - b.lg.or);
        this.matchList = list;
      });
    },
    // 获取赛事统计
    getStatistical() {
      return getStatistical().then((res) => {
        this.statistical = res || {};
      });
    },
    // 查询联赛列表
    getOnSaleLeagues(data) {
      return getOnSaleLeagues(data).then((res) => {
        console.log(res.data);
        this.leagues = res || [];
      });
    },
    // 获取比赛详情数据
    getMatchDetail(data) {
      this.isLoading = true;
      return getMatchDetail(data).then((res) => {
        this.matchDetailList = res || {};
      });
    },
  },
});

export default useFBStore;
