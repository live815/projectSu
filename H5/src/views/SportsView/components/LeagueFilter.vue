<template>
  <van-tabs v-model:active="activeName" title-active-color="#FF5000" title-inactive-color="#666">
    <van-tab :title="$t('Transactrecord.filter')" :name="0">
      <div class="content">
        <van-checkbox-group v-model="checked" ref="checkboxGroup" class="content-list-checkbox">
          <van-index-bar ref="indexBarRef" :index-list="indexList">
            <template v-for="item in list" :key="item.group">
              <van-index-anchor :index="item.group" style="background: #f7f7f7" />
              <div class="league" v-for="league in item.list" :key="league.id">
                <van-checkbox :name="league.id">
                  <img :src="league.lurl || defaultIcon" alt="" class="league-icon" />
                  <van-cell :title="league.na" />
                </van-checkbox>
                <span class="mt">{{ league.mt }}</span>
              </div>
            </template>
          </van-index-bar>
        </van-checkbox-group>
      </div>
    </van-tab>
    <van-tab :title="$t('SubgameView.search')" :name="1">
      <Search />
    </van-tab>
  </van-tabs>

  <div class="bottom" v-if="!activeName">
    <div class="all-left">
      <van-checkbox @click="toggleAll" :modelValue="isCheckedAll">
        <span class="all-selected">{{ $t('Sportsview.selectall') }}</span>
      </van-checkbox>
      <span @click="toggleSelect">{{ $t('Sportsview.counterelect') }}</span>
    </div>
    <van-button @click="submit" class="btn-ensure"
      >{{ $t('Sportsview.sure') }}({{ checked.length }})</van-button
    >
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useFBStore } from '@/stores/fb'
import { groupBy, map } from 'lodash'
import pinyin from 'js-pinyin'
import defaultIcon from '@/assets/img/default-team-logo.png'
import Search from './Search.vue'
import { setMatchScreening, getMatchScreening } from '@/utils/cache'

const fbStore = useFBStore()
defineExpose({
  scrollTop
})
const emit = defineEmits(['close'])
const indexBarRef = ref(null)
const checkboxGroup = ref([])
const checked = ref([])
const activeName = ref(0)
const isCheckedAll = computed(() => {
  return checked.value.length === fbStore.leagues.length
})
const list = computed(() => {
  let res = fbStore.leagues
  res.forEach((item) => {
    item.group = getFirstLetter(item.na)
  })
  res = groupBy(fbStore.leagues, 'group')
  res = map(res, (list, group) => ({ group, list }))
  res.sort((a, b) => a.group.localeCompare(b.group))
  return res
})
const indexList = computed(() => {
  return list.value.map((o) => o.group)
})

watchEffect(() => {
  const arr = getMatchScreening()
  if (arr && arr !== 'all') {
    checked.value = arr
  } else {
    checked.value = fbStore.leagues.map((item) => item.id)
  }
})
const toggleAll = () => {
  if (isCheckedAll.value) {
    checkboxGroup.value.toggleAll(false)
  } else {
    checkboxGroup.value.toggleAll(true)
  }
}
const toggleSelect = () => {
  checkboxGroup.value.toggleAll()
}

function submit() {
  fbStore.queryMatchListParams.leagueIds = checked.value
  emit('close')
  const arr = isCheckedAll.value ? 'all' : checked.value
  setMatchScreening(arr)
}
function scrollTop() {
  indexBarRef.value?.scrollTo(indexList.value[0])
}

// 提取中文字符串首字母
function getFirstLetter(str) {
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
:deep() {
  .van-tabs__wrap {
    position: relative;
    z-index: 1000;
  }
}
.header {
  text-align: center;
  font-size: 18px;
  color: #111111;
  height: 46px;
  line-height: 46px;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.content {
  height: calc(var(--app-height) - 220px);
  overflow: auto;
  border: 1px solid #fff;
  .league {
    display: flex;
    align-items: center;
    padding-left: 15px;
    justify-content: space-between;
    :deep() {
      .van-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
    .league-icon {
      width: 20px;
      height: 20px;
      margin-left: 4px;
    }
    :deep() .van-cell__title {
      width: 200px;
      @include ellipsis();
    }
    .mt {
      color: var(--color-text-dark);
      width: 80px;
      @include ellipsis();
    }
    .van-cell {
      padding-left: 12px;
    }
  }
  .content-list-checkbox {
    display: flex;
    align-items: center;
  }
  ::v-deep() .van-index-bar__sidebar {
    margin-top: 30px;
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
      font-weight: 400;
      font-size: 11px;
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
        font-size: 13px;
        font-weight: 500;
      }
    }
  }
}
.bottom {
  width: 100%;
  height: 55px;
  padding: 8px 15px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.1);
  .all-left {
    display: flex;
    align-items: center;
  }
  .all-selected {
    margin-left: 9px;
    margin-right: 33px;
  }
  .color-size {
    color: #000;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
  .btn-ensure {
    width: 110px;
    height: 40px;
    border-radius: 90px;
    background: linear-gradient(93deg, #ff9000 0%, #ff5000 100%);
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    border: none;
  }
}
</style>
<style>
/* .van-index-bar__sidebar{
  .van-index-bar__index{
    margin-bottom:5px;
  }
} */
</style>
