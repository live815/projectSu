<template>
  <div class="main-container Discount">
    <div class="overall-content">
      <div class="header">
        <div class="header-button">
          <div
            class="btn"
            v-for="(item, index) in btnDate"
            :key="index"
            :class="currentType * 1 === item.value ? 'active' : ''"
            @click="changeType(item.value)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>

      <div class="activities">
        <div class="activities-display">
          <div
            class="first-activity"
            v-for="item in dataList"
            v-if="dataList.length > 0"
            :key="item.id"
            @click="toActive(item)"
          >
            <div class="activities-position">
              <el-image loading="lazy" class="big-img" :src="getImgUrl(item.webUrl)">
                <template #placeholder>
                  <DefaultImg styleObj="height:80px" />
                </template>
                <template #error>
                  <DefaultImg styleObj="height:80px" />
                </template>
              </el-image>
              <div class="event-type">
                <img
                  v-if="!iconImg[item.activityTag - 1].includes('undefined')"
                  :src="iconImg[item.activityTag - 1]"
                />
              </div>
            </div>
            <div class="activities-padding">
              <div class="activities-content">{{ item.title }}</div>
              <div class="activities-time">
                {{ formatTime(item.startTime) || formatTime(item.onTime) }}
                <span v-show="item.endTime">- {{ formatTime(item.endTime) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="empty-box">
            <img src="./img/emptyIcon.png" />
            <p>{{ $t('Discount.NoDataCurrently') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import i18n from '@/i18n'
import { getImgUrl } from '@/utils'
import { promotionStore } from '@/stores/promotion'
import { jumpActivity } from '@/utils/jumpActivity'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const router = useRouter()
const promotion = promotionStore()
const dataList = computed(() => {
  if (promotion.promotionData.eventList) {
    return promotion.promotionData.eventList.filter((item) => {
      return item.activityType == currentType.value || currentType.value == 0
    })
  } else {
    return []
  }
})

// 跳转页面
const toActive = (event) => {
  jumpActivity({ event, router })
}
// 获取数据
onMounted(() => {
  promotion.getAdvertise()
})
//
// 格式化时间
const formatTime = (time) => {
  if (time) {
    let temp = time.split(' ')
    return temp[0].replace(/-/g, '/')
  }
}
// 判断活动类型相应的图标
const changeType = (type) => {
  promotion.getAdvertiseSingle({ type: 2 })
  currentType.value = type
}

// 筛选
const currentType = ref(0)
const btnDate = [
  {
    label: i18n.global.t('Discount.All'),
    value: 0
  },
  {
    label: i18n.global.t('Discount.LimitedTime'),
    value: 1
  },
  {
    label: i18n.global.t('Discount.Newcomer'),
    value: 2
  },
  {
    label: i18n.global.t('Discount.Daily'),
    value: 3
  },
  {
    label: 'VIP',
    value: 4
  }
]

const iconImg = [
  new URL(`./img/${appStore.language}/limit.png`, import.meta.url).href,
  new URL(`./img/${appStore.language}/newplayer.png`, import.meta.url).href,
  new URL(`./img/${appStore.language}/daliy.png`, import.meta.url).href,
  new URL(`./img/${appStore.language}/VIP.png`, import.meta.url).href,
  new URL(`./img/${appStore.language}/sport.png`, import.meta.url).href,
  new URL(`./img/${appStore.language}/hot.png`, import.meta.url).href
]
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .Discount {
    zoom: 0.9;
  }
}
.Discount {
  padding-top: 20px;
  height: 1000px;
  .overall-content {
    min-width: 1320px;
    max-width: 1320px;
    margin: 0 auto;
    background: #272b45;
    height: 100px;
    border-radius: 8px;
    padding-top: 30px;
    .header {
      padding-left: 30px;
      .header-button {
        display: flex;
        .btn {
          color: var(--60, rgba(255, 255, 255, 0.6));

          font-size: 16px;
          font-style: normal;
          min-width: 68px;
          padding: 0 5px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          margin-right: 20px;
          cursor: pointer;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
        }

        .active {
          background: linear-gradient(180deg, #f35d25 0%, #f28225 100%);
          box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1);
          color: #fff;
          border: none;
        }
      }
    }
    .activities {
      background: #272b45;
      border-radius: 8px;

      .activities-display {
        display: flex;
        flex-wrap: wrap;
        margin-top: 60px;
        gap: 25px;
        padding: 40px 38px 40px 38px;

        .first-activity {
          width: 398px;
          height: 226px;
          border-radius: 10px;
          background: #2a3158;
          .activities-position {
            position: relative;
            cursor: pointer;
            .event-type {
              position: absolute;
              top: 10px;
              img {
                height: 22px;
              }
            }
          }
          .activities-padding {
            padding-left: 20px;
            margin-top: 10px;
            .activities-content {
              color: var(--100, #fff);

              font-size: 16px;
              font-weight: 500;
              line-height: 35px;
              cursor: pointer;
            }
            .activities-time {
              color: var(--60, rgba(255, 255, 255, 0.6));

              font-size: 14px;
              font-weight: 400;
              line-height: 20px; /* 200% */
            }
          }
        }
      }
    }
  }
}
.big-img {
  width: 398px;
  height: 140px;
  border-radius: 10px 10px 0 0;
}
.empty-box {
  margin-top: 10px;
  height: 300px;
  width: 100%;
  color: var(--100, #aca8a8);
  text-align: center;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  img {
    width: 237px;
    height: 181px;
  }
}
</style>
