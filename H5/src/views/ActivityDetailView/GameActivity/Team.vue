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
      <van-button class="bet-btn" @click="matchRedirect(info?.matchId)">
        {{ $t('Activity.Newbie.label6') }}
      </van-button>
    </div>
  </section>
</template>
<script setup>
import { formatTime } from '@/utils'
import { onMounted } from 'vue'
import { getMatchDetail } from '@/api/fb'
import defaultIcon from '@/assets/img/default-team-logo.png'
import { useMobileEvent } from '@/hooks/useMobileEvent'

const { matchRedirect } = useMobileEvent()
const data = ref({ ts: [{}, {}] })
const props = defineProps(['info'])
onMounted(async () => {
  data.value = await getMatchDetail({ matchId: props.info?.matchId })
})
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 35px;
  h3 {
    color: #333333;
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
    word-wrap: break-word;
  }
  p {
    color: #666666;
    font-size: 14px;
    font-weight: 400;
    line-height: 34px;
    word-wrap: break-word;
  }

  .teams {
    background-image: url(./img/team.png);
    height: 52px;
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-between;
    .team {
      padding-left: 20px;
      &:last-child {
        padding-left: 0;
        padding-right: 20px;
      }
      width: 155px;
      display: flex;
      align-items: center;
      color: white;
      > div {
        width: 100px;
        &.img-div {
          width: 35px;
          img {
            width: 20px;
          }
        }
      }
    }
  }

  .bet-btn {
    background-image: url(./img/bet-btn.png);
    border: none;
    height: 30px;
    background-size: cover;
    color: white;
    font-size: 18px;
    background-repeat: no-repeat;
    margin-top: 10px;
    background-position: bottom;
  }
}
</style>
