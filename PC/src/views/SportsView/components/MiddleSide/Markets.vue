<template>
  <div class="markets-view">
    <div v-for="(marketsArr, idx) in list" :key="idx" class="markets-wrap" >
      <Column
        :match="match"
        :listing="listing"
        v-for="(column,index) in marketsArr"
        :key="index"
        :column="column"
        :columulength="fbStore.isClickAll?getcurrentlength(marketsArr.length):fbStore.handicaplength"
        :lengths="lengths"
      />
      <!-- {{ columulength }} & {{ marketsArr.length }}&{{ fbStore.handicaplength }} -->
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import Column from './Column.vue'
import { chunk, merge } from 'lodash'
import { getSportMarketType } from '@/hooks/useSportDict'
import { computed } from 'vue'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const props = defineProps({
  match: {
    type: Object,
    default: () => ({})
  }
})
// console.log(props.match,'盘口2')

const lengths = ref(1)
const listing = getSportMarketType(i18n)[props.match.sid] || []
const listingTwo = ref(fbStore.isClickBallType ? getSportMarketType(i18n)[fbStore.queryMatchListParams.sportId] : listing.value)
const currentListing = computed(() => {
  return fbStore.isClickBallType ? listingTwo.value : listing
})

const columulength = ref((fbStore.isClickBallType ? listingTwo.value?.length : listing.length) || 0)

function getcurrentlength(val){
  if(window.innerWidth>1550){
      if(!fbStore.isClickBallType){
        if(columulength.value == val){
          return val
        }
        if(columulength.value > val){
          return columulength.value
        }else{
          return val
        }
      }else{
        // console.log(fbStore.handicaplength,'fbStore.handicaplength')
        return fbStore.handicaplength
      }
  }else{
    return 3
  }
  
}

const list = computed(() => {
  const mg = props.match.mg
  const num = ref(0)
  const res = currentListing.value?.map((o) => {
    let currentObj = mg.find((op) => op.mty === o.mty && op.pe === o.pe)
    if (currentObj) {
      o = merge({}, o, currentObj)
      num.value++
      lengths.value = num.value
    }
    return o
  })
  if(window.innerWidth<1550){
    // res = res.slice(0.3)
    // console.log(123,res.slice(0,3),fbStore.isClickAll,)
    return chunk(res.slice(0,3), 3)
  }else{
    // console.log(res,'res')
    return chunk(res, listing.length)
  }
 
})
watch(
  ()=>fbStore.queryMatchListParams.sportId,
  ()=>{
    if(fbStore.isClickBallType){
      listingTwo.value = getSportMarketType(i18n)[fbStore.queryMatchListParams.sportId]
    }
    // console.log(list.value,'list')
  }
)
</script>

<style lang="scss" scoped>
.markets-view{
  .markets-wrap{
    display: flex;
    flex-direction: row;
    .column-view{
      .column {
        .item {
          height: 25px;
          line-height: 25px;
          border-radius: 4px;
          background: #2A3157;
          margin-bottom: 2px;
          text-align: center;
          font-size: 12px;
          border: 1px solid transparent;
          flex: 1;
          margin-top: 5px;
        }
      }
    }
  }
}
:deep() {
  .van-swipe.padding {
    padding-bottom: 10px;
  }
  .van-swipe__indicators {
    position: absolute;
    bottom: -0px;
  }
  .van-swipe__indicator {
    width: 10px;
    height: 4px;
    border-radius: 2px;
    background: #aaa;
  }
  .van-swipe__indicator--active {
    background: #ff5000;
  }
  .van-swipe-item {
    display: flex;
  }
}
</style>
