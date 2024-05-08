const MatchDetailView = () => import('@/views/MatchDetailView/MatchDetailView.vue')
const ChampionsMatchView = () => import('@/views/ChampionsMatchView/ChampionsMatchView.vue')

const list = [
  {
    path: '/match-detail/:id',
    name: 'match-detail',
    component: MatchDetailView,
    meta: {
      isShowBetCart: true
    }
  },
  {
    path: '/champions-detail/:id',
    name: 'champions-match-detail',
    component: ChampionsMatchView,
    meta: {
      isShowBetCart: true
    }
  }
]
export default list
