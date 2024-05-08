<template>
  <div v-if="list.length" class="champions-list-wrapper">
    <div class="list">
      <van-index-bar ref="indexBarRef" :index-list="indexList">
        <template v-for="item in list" :key="item.group">
          <van-index-anchor :index="item.group" style="background: #f7f7f7" />
          <div class="league" v-for="league in item.list" :key="league.id">
            <img :src="league.lg.lurl || defaultURL" alt="" class="league-icon" />
            <van-cell :title="league.nm" @click="detail(league)" />
            <span class="mt">{{ league.lg.mt }}</span>
          </div>
        </template>
      </van-index-bar>
    </div>
  </div>
  <NoResult style="margin-top: 80px" v-else />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFBStore } from '@/stores/fb'
import { groupBy, map } from 'lodash'
import pinyin from 'js-pinyin'

const fbStore = useFBStore()
const router = useRouter()

const defaultURL = ref(new URL('@/assets/img/default-team-logo.png', import.meta.url).href)
const indexBarRef = ref(null)
const list = computed(() => {
  let res = fbStore.matchList || []
  if (res.length) {
    res.forEach((item) => {
      item.group = getFirstLetter(item.nm)
    })
    res = groupBy(fbStore.matchList, 'group')
    res = map(res, (list, group) => ({ group, list }))
    res.sort((a, b) => a.group.localeCompare(b.group))
  }
  return res
})
const indexList = computed(() => {
  return list.value.map((o) => o.group)
})
console.log(list.value)
function detail(item) {
  router.push(`/champions-detail/${item.id}`)
}
// 提取中文字符串首字母
function getFirstLetter(str) {
  if (!str) return
  const firstChar = str.charAt(0)
  const regExp = /^[A-Za-z]+$/ // 正则表达式匹配字母

  if (regExp.test(firstChar)) {
    return firstChar.toUpperCase()
  } else {
    return pinyin.getFullChars(firstChar).substring(0, 1)
  }
}
</script>

<style lang="scss" scoped>
.champions-list-wrapper {
  .league {
    display: flex;
    align-items: center;
    padding-left: 8px;
    justify-content: space-between;
    background: #fff;
    .league-icon {
      width: 20px;
      height: 20px;
      margin-left: 4px;
    }
    :deep() .van-cell__title {
      width: 300px;
      @include ellipsis();
    }
    // .mt {
    //   color: var(--color-text-dark);
    //   width:80px;
    //   margin-right:20px;
    //   @include ellipsis();
    // }
    .van-cell {
      padding-left: 12px;
    }
  }
  :deep().van-index-bar__sidebar {
    margin-top: 60px;
    .van-index-bar__index {
      margin-bottom: 5px;
    }
    .van-index-bar__index--active {
      width: 20px;
      height: 20px;
      background: #ff5000;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      border-radius: 50%;
      margin-left: 12px;
      position: relative;
      &::after {
        position: absolute;
        top: -5px;
        left: -37px;
        content: attr(data-index);
        width: 32px;
        height: 28px;
        background: url('../img/letter-bg-active.png') center no-repeat;
        background-size: 100%;
        padding: 6px 11px 7px 8px;
      }
    }
  }
}
</style>
