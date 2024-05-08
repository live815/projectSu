<template>
  <section>
    <h3>{{ data.nm }}</h3>
    <p>{{ formatTime(data?.bt) }}</p>
    <div class="teams">
      <div class="team">
        <div>{{ data.ts[0].na }}</div>
        <div class="img-div">
          <img :src="data.ts[0].lurl ? data.ts[0].lurl : defaultIcon" alt="" srcset="" />
        </div>
      </div>
      <div class="team">
        <div class="img-div">
          <img :src="data.ts[1].lurl ? data.ts[1].lurl : defaultIcon" alt="" srcset="" />
        </div>
        <div>{{ data.ts[1].na }}</div>
      </div>
    </div>
    <div>
      <el-button class="bet-btn" @click="gotoSportDetail(info)">
        {{ $t('Activity.Newbie.label6') }}
      </el-button>
    </div>
  </section>
</template>

<script setup>
import { formatTime } from '@/utils'
import { onMounted } from 'vue'
import { getMatchDetail } from '@/api/fb'
import defaultIcon from '../img/default-team-logo.png'
import { useRouter } from 'vue-router'
import { useFBStore } from '@/stores/fb'

const router = useRouter()
const fbStore = useFBStore()
const data = ref({ ts: [{}, {}] })
const props = defineProps(['info'])
onMounted(async () => {
  data.value = await getMatchDetail({ matchId: props.info?.matchId })
})

function gotoSportDetail(info) {
  const { matchId: gameId, sportId: sid } = info
  router.push({ path: '/sports', query: { gameId, sid, page: 'active' } })
  fbStore.Median = 1
}
</script>

<style lang="scss" scoped>
section {
  &:nth-child(2),
  &:nth-child(3) {
    margin-top: 40px;
  }
  h3 {
    color: white;
    font-size: 22px;
    font-weight: 400;
    line-height: 30px;
    word-wrap: break-word;
  }
  p {
    color: #ddcd9f;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    word-wrap: break-word;
  }

  .teams {
    background-image: url(../img/team.png);
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-between;
    margin: 0 50px;
    .team {
      padding-left: 30px;
      &:last-child {
        padding-left: 0;
        padding-right: 35px;
      }
      width: 435px;
      display: flex;
      align-items: center;
      color: white;
      > div {
        width: 315px;
        font-size: 22px;
        &.img-div {
          width: 90px;
          img {
            width: 50px;
          }
        }
      }
    }
  }

  .bet-btn {
    background-image: url(../img/bet-btn.png);
    background-position: bottom;
    border: none;
    height: 42px;
    min-width: 135px;
    background-size: cover;
    color: white;
    font-size: 18px;
    background-repeat: no-repeat;
    margin-top: 10px;
  }
}
</style>
