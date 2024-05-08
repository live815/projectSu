<template>
  <div class="AllMastersList-views">
    <NavBar :title="$t('AllmastersListview.AllGreatGod')" :isShowRight="false" />

    <div>
      <div class="mastersList">
        <div v-for="(item, index) of mastersList" :key="index" class="personCard">
          <div class="left">
            <img :src="getImg(item.expertAvatar)" />
          </div>
          <div class="mid">
            <div style="display: flex">
              <div class="name" @click="router.push(`/masterDetail/${item.id}`)">
                {{ item?.expertName }}
              </div>
              <div class="right">
                <div
                  class="btn"
                  @click="switchAttention(item)"
                  :class="[item.follow ? 'followed' : ' ']"
                  v-if="!isFollow(item.id) && !item.followed"
                >
                  + {{ $t('AllmastersListview.Focus') }}
                </div>
                <div
                  v-if="isFollow(item.id) || item.followed"
                  class="btn"
                  @click="unsubscribe(item)"
                  :class="[item.follow ? 'followed' : ' ']"
                >
                  {{ $t('AllmastersListview.AlreadyFocus') }}
                </div>
              </div>
            </div>
            <div class="labels">
              <ul>
                <li class="active">
                  {{ $t('AllmastersListview.NearFuture') }}{{ item?.middleRoundCount }}
                </li>
                <li class="tag" v-for="(ite, index) in handleTags(item?.expertTag)" :key="index">
                  {{ ite }}
                </li>
              </ul>
            </div>
            <div class="tip">{{ item.summary }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar/NavBar.vue'
import { useRouter } from 'vue-router'
import { getExpertList, getAttentionList, attentionExpert, cancelExpert } from '@/api/live'
import { getImg } from '@/utils'
import { useUserStore } from '@/stores/user.js'

const router = useRouter()
const mastersList = ref([])
const followedList = ref([])
const user = useUserStore()
const init = () => {
  getExpertList().then((res) => {
    if (res.code === 200) {
      mastersList.value = res.data
    }
  })

  getAttentionList({ memberId: user.userInfo.id }).then((res) => {
    followedList.value = res.data
  })
}
init()

const isFollow = computed(() => {
  return (id) => {
    return followedList.value.some((item) => {
      return item.expertId === id
    })
  }
})

// 关注
const switchAttention = (item) => {
  const param = {
    expertId: item.id,
    memberId: user.userInfo.id
  }
  attentionExpert(param).then((res) => {
    if (res.code === 200) {
      item.followed = true
    }
  })
}
// 取消关注
const unsubscribe = (item) => {
  const param = {
    expertId: item.id,
    memberId: user.userInfo.id
  }
  cancelExpert(param).then((res) => {
    if (res.code === 200) {
      item.followed = false
      init()
    }
  })
}

const handleTags = (string) => {
  return string.split(',')
}
</script>

<style lang="scss" scoped>
.AllMastersList-views {
  .mastersList {
    .personCard {
      display: flex;
      margin: 10px auto;
      background: white;
      padding: 15px;
      justify-content: space-between;
      .left {
        img {
          height: 40px;
          width: 40px;
          margin: 5px auto;
          border-radius: 40px;
          background: url(<path-to-image>), lightgray 50% / cover no-repeat;
        }
      }
      .mid {
        margin-left: 16px;
        margin-right: auto;
        .name {
          color: #111;

          font-size: 13px;
          font-style: normal;
          font-weight: 500;
          line-height: 16px;
          word-spacing: 0;
          letter-spacing: 0;
        }
        ul {
          display: flex;
          height: 20px;
          line-height: 20px;
          white-space: nowrap;
          max-width: 280px;
          overflow-x: auto;
          li {
            color: #ff5000;
            font-size: 12px;
            line-height: 20px;
            height: 20px;
            background: var(--4, #fff5f0);
            border-radius: 20px;
            padding: 0px 3px;
            display: inline-block;
            text-align: center;
            margin-left: 10px;
            padding: 0 10px;
          }
          li:nth-child(1) {
            margin-left: 0px;
          }
          .active {
            background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
            color: white;
          }
        }
        .labels {
          margin: 10px auto 15px;
        }
        .tip {
          color: #666;
          text-align: justify;

          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
        }
      }
      .right {
        position: absolute;
        right: 15px;
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--2, #ff5000);

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          border: 1px solid var(--2, #ff5000);
          border-radius: 20px;
          padding: 0 10px;
          width: auto;
          height: 20px;
          margin: 0 auto;
        }
        .followed {
          background: var(--4, #fff5f0);
          background: var(--4, #fff5f0);
          border-color: transparent;
        }
      }
    }
    .personCard:first-child {
      margin-top: 0px;
    }
  }
}
</style>
