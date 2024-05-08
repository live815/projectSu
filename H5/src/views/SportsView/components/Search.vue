<template>
  <div class="search-view">
    <div class="search-box">
      <Search
        class="search"
        v-model.trim:modelValue="searchName"
        :placeholder="$t('Sportsview.inputName')"
      />
      <div v-if="!searched" class="search-text" @click="search">
        {{ $t('SubgameView.search') }}
      </div>
      <div v-else-if="searched" class="search-text" @click="searchName = ''">
        {{ $t('common.cancel') }}
      </div>
    </div>
    <div v-if="!searched" class="search-history">
      <div class="head">
        <p>{{ $t('Sportsview.searchHist') }}</p>
        <IconDelete @click="delAll" />
      </div>
      <div class="record-box">
        <div v-for="(item, index) in searchHistory" :key="index" class="item" @click="search(item)">
          <iconDate /> <span class="text">{{ item }}</span>
          <van-icon name="cross" @click.stop="removeSearchHistoryItem(item)" />
        </div>
      </div>
    </div>
    <div v-if="list.length" class="list-box">
      <div class="league-box" v-for="(item, index) in matchList" :key="index">
        <div class="head">
          <img :src="item[0].lg.lurl" />
          <p>{{ item[0].lg.na }}</p>
        </div>
        <div
          class="list"
          v-for="(ite, idx) in item"
          :key="idx"
          @click="router.push(`match-detail/${ite.id}`)"
        >
          <img class="logo" :src="ite.ts[0].lurl || defaultIcon" />
          <div class="center">
            <div class="team main">
              <span
                v-for="(text, each) in [...ite.ts[0].na]"
                :key="each"
                :class="{ active: [...searchName].includes(text) }"
                >{{ text }}</span
              >
              <p class="date" v-if="ite.ms === 4">
                {{ getMatchStatus(ite, fbStore).split(' ')[0] }}
              </p>
              <p v-else class="number">
                {{ getTeamScore(ite, 0) || 0 }}
              </p>
            </div>
            <div class="vs">VS</div>
            <div class="team">
              <span
                v-for="(text, each) in [...ite.ts[1].na]"
                :key="each"
                :class="{ active: [...searchName].includes(text) }"
                >{{ text }}</span
              >
              <p class="date" v-if="ite.ms === 4">
                {{ getMatchStatus(ite, fbStore).split(' ')[1] }}
              </p>
              <p v-else class="number">
                {{ getTeamScore(ite, 1) || 0 }}
              </p>
            </div>
          </div>
          <img class="logo" :src="ite.ts[1].lurl || defaultIcon" />
        </div>
      </div>
    </div>
    <NoResult
      v-else-if="!list.length && searchName && searched"
      :noTxt="$t('Sportsview.noMatch')"
      :imgSrc="noData"
      style="margin-top: 150px"
    />
  </div>
</template>

<script setup>
import { searchEvents } from '@/api/fb.js'
import Search from '@/components/Search/Search'
import noData from '@/assets/img/noList.png'
import defaultIcon from '@/assets/img/default-team-logo.png'
import { getMatchStatus, getTeamScore } from '@/hooks/useSportDict'
import { useFBStore } from '@/stores/fb'
import storage from 'good-storage'
import { useRouter } from 'vue-router'

const router = useRouter()
const fbStore = useFBStore()
const searchName = ref('')
const list = ref([])
const updateHistory = ref(0)
const searched = ref(false)

const searchHistory = computed(() => {
  updateHistory.value
  return storage.get('search_history', [])
})
watchEffect(() => {
  if (!searchName.value) {
    list.value = []
    searched.value = false
  }
})
const matchList = computed(() => {
  const groupedBySlid = list.value.reduce((accumulator, currentItem) => {
    // 获取当前项的slid值
    const slid = currentItem.lg.slid

    // 如果累加器中还没有这个slid的分组，则创建一个
    if (!accumulator[slid]) {
      accumulator[slid] = []
    }

    // 将当前项添加到对应slid的分组中
    accumulator[slid].push(currentItem)

    return accumulator
  }, {})
  return groupedBySlid
})
const search = (item) => {
  if (searchName.value || item) {
    searchEvents({
      recommend: searchName.value || item
    }).then((res) => {
      list.value = res
      searched.value = true
      storeSearchHistory(searchName.value || item)
    })
  }
}
const storeSearchHistory = (query) => {
  let searches = storage.get('search_history', [])
  const index = searches.indexOf(query)
  if (index === -1) {
    searches.unshift(query)
    if (searches.length > 10) {
      searches.pop()
    }
  } else {
    searches.splice(index, 1)
    searches.unshift(query)
  }
  storage.set('search_history', searches)
  updateHistory.value++
}
// 删除指定的搜索记录项
const removeSearchHistoryItem = (query) => {
  let searches = storage.get('search_history', [])
  const index = searches.indexOf(query)
  if (index > -1) {
    searches.splice(index, 1) // 移除找到的项
    storage.set('search_history', searches) // 更新存储
    updateHistory.value++
  }
}
const delAll = () => {
  storage.set('search_history', [])
  updateHistory.value++
}
</script>

<style lang="scss" scoped>
.search-view {
  .search-box {
    background: #f7f7f7;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search {
      width: 300px;
      height: 40px;
      border-radius: 60px;
      background: #fff;
    }
    :deep() {
      .search-wrapper input {
        border-radius: 60px;
      }
    }
    .search-text {
      min-width: 45px;
      height: 40px;
      color: #111;
      white-space: nowrap;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
    }
  }
  .list-box {
    height: calc(var(--app-height) - 222px);
    overflow: auto;
    padding-bottom: 20px;
    .league-box {
      width: 345px;
      min-height: 120px;
      border-radius: 10px;
      background-image: url('../img/bg.png');
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
      margin: auto;
      padding: 12px 0 10px 0;
      margin-top: 20px;
      .head {
        height: 34px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding-left: 12px;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        p {
          color: #111;
          font-weight: 500;
        }
      }
      .list {
        width: 325px;
        height: 66px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        border-bottom: 1px solid #eee;
        .logo {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .team {
          @include textToOmit();
          width: 90px;
          color: #999;
          font-size: 12px;
        }

        .main {
          text-align: right;
        }
        .active {
          color: #ff5000;
        }
        .number {
          color: #f53f3f;
          font-size: 15px;
          font-weight: 600;
          margin-top: 6px;
        }
        .date {
          color: #666;
          font-size: 15px;
          font-weight: 600;
          margin-top: 10px;
        }
        .vs {
          color: #666;
          font-size: 12px;
          font-weight: 600;
          margin: -18px 15px 0 15px;
        }
      }
      .list:last-child {
        border-bottom: none;
      }
    }
  }

  .search-history {
    padding: 15px;
    .head {
      display: flex;
      justify-content: space-between;
    }
    .record-box {
      height: calc(var(--app-height) - 280px);
      overflow: auto;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35px;
        border-bottom: 1px solid #f2f5f9;
        margin-top: 15px;
        .text {
          margin-right: auto;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
